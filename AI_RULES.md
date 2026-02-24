# AI Integration Rules & Behavior (PHEROMONE)

This document explains how the site decides whether to reply with a stock (canned) answer or forward a request to your hosted AI proxy (so the API key remains server-side).

1) Purpose
- Provide fast, predictable replies for common questions using stock responses.
- Forward non-stock or open-ended queries to your server-side model (you host with your API key).

2) Matching rules (client-side)
- The client checks a prioritized list of cannedResponses (keyword/regex tests).
- If any test matches, the canned reply is returned immediately.
- Matching is case-insensitive; tests are intentionally simple (keywords/regex). Adjust as needed.

3) Forwarding rules (server-side)
- If no canned match, the client POSTs the message to `AI_PROXY_URL` (default `/api/chat`).
- The server should forward this message to the model API using the server-side API key.
- Server should enforce input limits (max length), request rate-limits, and basic sanitization.

4) Privacy and logging
- Do not log full user messages unless necessary. If you must log, warn users and redact PII.
- Keep API keys in environment variables, never in client-side code.

5) Safety and moderation
- Implement a server-side content filter for disallowed content (hate, illegal, sexual, medical/legal advice disclaimers).
- Consider rejecting or sanitizing queries that trigger policy checks before sending to the model.

6) Fallback behavior
- If the server fails or returns an error, the client shows a friendly message: "Sorry, something went wrong contacting the AI service." and suggests email contact.

7) Extending canned responses
- Add entries to `js/chatbot.js` cannedResponses array. Each entry has a `test` (function or regex) and a `reply` string.
- Keep canned replies short and focused; prefer exact wording for sensitive topics.

8) Example flow
- User: "How do I join?"
  - Client finds a canned reply and returns it instantly.
- User: "Help me design a database schema for our project." 
  - No canned match; client forwards to server, server calls model, and returns the model reply to the client.

9) Deployment checklist for server-side host
- Store API key in env variable (e.g., OPENAI_API_KEY).
- Add rate limiting and optional API key/token auth for the site.
- Monitor usage to avoid unexpected costs.

---

If you want, I can: 
- Add more canned rules you specify, or
- Create a small server template (if you plan to host) with simple rate-limiting and auth examples.
