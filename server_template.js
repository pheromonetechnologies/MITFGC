// Server template for hosting the AI proxy. DO NOT put your API key here.
// Copy this file to server.js and install dependencies: express, node-fetch, cors, dotenv, express-rate-limit

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

// Basic rate limiter
const limiter = rateLimit({ windowMs: 60*1000, max: 30 });
app.use('/api/', limiter);

const API_KEY = process.env.OPENAI_API_KEY; // set on server only
const MODEL = process.env.AI_MODEL || 'gpt-4o-mini';

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'No message provided' });

    // Simple input length guard
    if (message.length > 3000) return res.status(400).json({ error: 'Message too long' });

    // OPTIONAL: Add moderation / content filtering here before forwarding

    const payload = {
      model: MODEL,
      messages: [{ role: 'user', content: message }],
      max_tokens: 512,
      temperature: 0.7
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(502).json({ error: 'Upstream error', details: text });
    }

    const data = await r.json();
    const assistant = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    return res.json({ reply: assistant || '' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`AI proxy template listening on ${PORT}`));
