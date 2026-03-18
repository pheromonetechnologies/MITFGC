# MIT College Website - Database Setup Guide

## 🗄️ Database Schema Overview

Your Prisma schema includes:

### Core Models:
- **User** - Authentication and role management (SUPER_ADMIN, ADMIN, EDITOR, VIEWER)
- **Department** - Academic departments (CSE, Electrical, Mechanical, Civil, etc.)
- **Course** - Programs offered (B.Tech, M.Tech, etc.)
- **Faculty** - Teaching staff profiles
- **Event** - College events and activities
- **Notice** - Announcements and notices
- **GalleryImage** - Photo gallery management
- **Page** - Custom content pages
- **ContactSubmission** - Contact form submissions
- **SiteSetting** - Site-wide configuration

### Relationships:
- Departments → Courses (One-to-Many)
- Departments → Faculty (One-to-Many)
- Courses ↔ Faculty (Many-to-Many via CourseFaculty)
- Users → Events/Notices/Pages (One-to-Many as authors)

---

## 🚀 Database Setup Options

### Option 1: Vercel Postgres (Recommended for Production)

**Steps:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Connect to your project
4. Copy the `DATABASE_URL` from environment variables
5. Add to `.env`:
   ```env
   DATABASE_URL="postgres://user:password@host:5432/database"
   ```

**Pricing:** Free tier includes 256 MB storage, 60 hours compute/month

### Option 2: Neon (Serverless Postgres)

**Steps:**
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env`:
   ```env
   DATABASE_URL="postgres://user:password@host.neon.tech/database?sslmode=require"
   ```

**Pricing:** Free tier includes 512 MB storage

### Option 3: Supabase

**Steps:**
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection string
4. Add to `.env`:
   ```env
   DATABASE_URL="postgres://postgres:password@host.supabase.co:5432/postgres"
   ```

**Pricing:** Free tier includes 500 MB storage

### Option 4: Local PostgreSQL

**Steps:**
1. Install PostgreSQL:
   ```bash
   brew install postgresql@15  # macOS
   ```
2. Start service:
   ```bash
   brew services start postgresql@15
   ```
3. Create database:
   ```bash
   createdb mitfgc
   ```
4. Add to `.env`:
   ```env
   DATABASE_URL="postgresql://localhost:5432/mitfgc"
   ```

---

## 📝 Prisma Commands

After setting up your database in `.env`:

### 1. Generate Prisma Client
```bash
npm run db:generate
```

### 2. Push Schema to Database
```bash
npm run db:push
```

### 3. Seed Database with Sample Data
```bash
npm run db:seed
```

This will create:
- 2 users (admin, editor)
- 4 departments
- 5 courses
- 4 faculty members
- 3 events
- 3 notices
- 3 gallery images
- 2 pages

### 4. Open Prisma Studio (Database GUI)
```bash
npm run db:studio
```

---

## 🔐 Default Login Credentials

After seeding:

**Admin User:**
- Email: `admin@mitcollege.edu`
- Password: `admin123`
- Role: SUPER_ADMIN

**Editor User:**
- Email: `editor@mitcollege.edu`
- Password: `editor123`
- Role: EDITOR

**⚠️ Change these in production!**

---

## 🛠️ Troubleshooting

### "Can't reach database server"
- Check if `DATABASE_URL` in `.env` is correct
- Ensure database service is running (if local)
- Check firewall/network settings

### "Schema validation error"
- Run `npx prisma generate` to regenerate client
- Check for syntax errors in `prisma/schema.prisma`

### "Migration failed"
- Try `npx prisma db push --force-reset` (⚠️ deletes all data!)
- Check database permissions

---

## 📊 Database ER Diagram

```
User
├── createdEvents → Event
├── createdNotices → Notice
└── createdPages → Page

Department
├── courses → Course
└── faculty → Faculty

Course
├── department → Department
└── faculty → Faculty (via CourseFaculty)

Faculty
├── department → Department
└── courses → Course (via CourseFaculty)

Event
└── author → User

Notice
└── author → User

Page
└── author → User
```

---

## 🎯 For Viva/Demonstration

**Show:**
1. Prisma Studio with all tables
2. Sample data in each table
3. Relationships between tables
4. Admin login working with seeded credentials

**Explain:**
- Why PostgreSQL? (ACID compliance, relational data, strong typing)
- Why Prisma? (Type-safe queries, migrations, auto-completion)
- Security: Password hashing with bcrypt, role-based access control
- Scalability: Indexed fields, efficient queries, connection pooling

---

## 📚 Next Steps

1. ✅ Database schema created
2. ✅ Prisma client generated
3. ⏳ Setup database (choose option above)
4. ⏳ Seed with sample data
5. ⏳ Build admin dashboard
6. ⏳ Implement authentication
7. ⏳ Deploy to Vercel

---

Need help? Check:
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js + Prisma Guide](https://www.prisma.io/nextjs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
