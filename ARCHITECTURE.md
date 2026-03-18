# MIT College Website - Architecture Documentation for Viva

## 📋 Project Overview

**Project Title:** Modern College Website with CMS and Admin Dashboard

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS with custom theme system (4 color palettes)
- **Backend:** Next.js Server Actions, API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth v5 (Auth.js)
- **File Storage:** Vercel Blob Storage
- **Deployment:** Vercel (Serverless)

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                     │
│                                                               │
│  ┌────────────────┐         ┌─────────────────────────┐    │
│  │  Public Pages  │         │   Admin Dashboard        │    │
│  │  - Home        │         │   - Login                │    │
│  │  - Courses     │         │   - CRUD Operations      │    │
│  │  - Faculty     │         │   - File Uploads         │    │
│  │  - Events      │         │   - Content Management   │    │
│  │  - Gallery     │         │   - User Management      │    │
│  │  - Contact     │         └──────────┬───────────────┘    │
│  └────────┬───────┘                    │                     │
│           │                            │                     │
└───────────┼────────────────────────────┼─────────────────────┘
            │         HTTPS/TLS          │
            │                            │
┌───────────▼────────────────────────────▼─────────────────────┐
│                    NEXT.JS APP (Vercel)                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Middleware Layer                     │   │
│  │  - Route Protection                                   │   │
│  │  - Session Validation                                 │   │
│  │  - Role-Based Access Control                          │   │
│  └────────────────────┬─────────────────────────────────┘   │
│                       │                                       │
│  ┌───────────────────▼────────────────────────────────┐     │
│  │               Server Components                     │     │
│  │  - Data Fetching (Direct DB Access)                 │     │
│  │  - Server-Side Rendering                            │     │
│  │  - Static Generation                                │     │
│  └───────────┬─────────────────────────────────────┬──┘     │
│              │                                     │          │
│  ┌───────────▼──────────┐        ┌───────────────▼──────┐  │
│  │   Server Actions     │        │     API Routes       │  │
│  │  - CRUD Operations   │        │  - /api/auth/[...]   │  │
│  │  - Form Handling     │        │  - /api/upload       │  │
│  │  - Validation        │        │  - /api/webhooks     │  │
│  └───────────┬──────────┘        └───────────┬──────────┘  │
│              │                                │              │
└──────────────┼────────────────────────────────┼──────────────┘
               │                                │
┌──────────────▼────────────────────────────────▼──────────────┐
│                    EXTERNAL SERVICES                          │
│                                                               │
│  ┌─────────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  Prisma ORM     │  │  NextAuth v5 │  │ Vercel Blob    │ │
│  │  Client         │  │  Auth System │  │ Storage        │ │
│  └────────┬────────┘  └──────┬───────┘  └───────┬────────┘ │
│           │                  │                    │          │
└───────────┼──────────────────┼────────────────────┼──────────┘
            │                  │                    │
     ┌──────▼──────┐    ┌─────▼───────┐    ┌──────▼─────┐
     │  PostgreSQL │    │   Session   │    │  CDN Files │
     │  Database   │    │   Store     │    │  (Images)  │
     └─────────────┘    └─────────────┘    └────────────┘
```

---

## 🗂️ Module Architecture

### 1. Public Module (User-Facing Website)

**Components:**
- `Header.tsx` - Navigation, logo, responsive menu
- `Footer.tsx` - Links, contact info, copyright
- `CourseCard.tsx` - Course display component
- `EventCard.tsx` - Event listing component
- `FacultyCard.tsx` - Faculty profile card
- `GalleryGrid.tsx` - Photo gallery with lightbox

**Pages:**
- `/` - Homepage (hero, stats, features)
- `/courses` - Course listing with filters
- `/courses/[slug]` - Individual course details
- `/faculty` - Faculty directory
- `/faculty/[slug]` - Faculty profile
- `/events` - Events calendar
- `/gallery` - Photo gallery with categories
- `/notices` - Announcements board
- `/contact` - Contact form
- `/about` - About page

**Features:**
- Server-side rendering for SEO
- Static generation for performance
- Dynamic routing with slugs
- Responsive design (mobile-first)
- Theme switcher (4 color palettes)

### 2. Admin Module (Content Management)

**Layout:**
```
┌─────────────────────────────────────┐
│         Admin Dashboard             │
├────────────┬────────────────────────┤
│            │                        │
│  Sidebar   │    Main Content Area   │
│            │                        │
│  - Home    │  ┌──────────────────┐ │
│  - Courses │  │   Data Tables    │ │
│  - Faculty │  │   Forms          │ │
│  - Events  │  │   Charts         │ │
│  - Gallery │  │   Actions        │ │
│  - Notices │  └──────────────────┘ │
│  - Users   │                        │
│  - Settings│                        │
│            │                        │
│  Logout    │                        │
└────────────┴────────────────────────┘
```

**Components:**
- `Sidebar.tsx` - Navigation menu
- `DataTable.tsx` - Sortable, paginated tables
- `DeleteDialog.tsx` - Confirmation modals
- `ImageUpload.tsx` - Drag-drop file upload
- `RichTextEditor.tsx` - WYSIWYG editor (Tiptap)
- `Form components` - Reusable form fields

**Admin Routes:**
- `/dashboard` - Overview, stats
- `/dashboard/courses` - List, create, edit, delete courses
- `/dashboard/faculty` - Manage faculty profiles
- `/dashboard/events` - Event management
- `/dashboard/gallery` - Image uploads
- `/dashboard/notices` - Announcements
- `/dashboard/users` - User management (SUPER_ADMIN only)
- `/dashboard/settings` - Site configuration

**Role-Based Access:**
- **SUPER_ADMIN:** Full access to everything
- **ADMIN:** Manage content, view users
- **EDITOR:** Create/edit content only
- **VIEWER:** Read-only access

### 3. Authentication Module

**Flow Diagram:**
```
User → Login Page → Enter Credentials
                         ↓
                    NextAuth Handler
                         ↓
                  Verify Password (bcrypt)
                         ↓
                  Create JWT Session
                         ↓
                    Middleware Check
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
        Authorized            Unauthorized
              ↓                     ↓
     Access Dashboard        Redirect to Login
```

**Security Features:**
- Password hashing with bcryptjs (10 rounds)
- JWT-based sessions
- HTTP-only cookies
- CSRF protection (built into Server Actions)
- Role-based access control
- Session timeout (30 days default)

---

## 💾 Data Model Design

### Entity Relationship Diagram

```
┌─────────────┐
│    User     │
│─────────────│
│ id          │──┐
│ email       │  │
│ name        │  │  1:N
│ passwordHash│  │
│ role        │  │
└─────────────┘  │
                 │
     ┌───────────┼───────────┬─────────────┐
     │           │           │             │
     ▼           ▼           ▼             ▼
┌─────────┐ ┌────────┐ ┌─────────┐ ┌──────────┐
│  Event  │ │ Notice │ │  Page   │ │ Role Enum│
└─────────┘ └────────┘ └─────────┘ └──────────┘


┌──────────────┐         ┌──────────────┐
│  Department  │ 1:N     │    Course    │
│──────────────│────────▶│──────────────│
│ id           │         │ id           │
│ name         │         │ title        │
│ slug         │         │ duration     │
│ description  │         │ departmentId │
└──────────────┘         │ published    │
        │                └──────────────┘
        │ 1:N                    │
        │                   N:M  │
        ▼                        ▼
┌──────────────┐         ┌───────────────┐
│   Faculty    │◀───────▶│CourseFaculty  │
│──────────────│         │───────────────│
│ id           │         │ courseId      │
│ name         │         │ facultyId     │
│ designation  │         └───────────────┘
│ departmentId │
└──────────────┘


┌─────────────────┐
│  GalleryImage   │
│─────────────────│
│ id              │
│ imageUrl        │
│ category        │
│ tags[]          │
└─────────────────┘
```

### Key Relationships:
- **Department → Course** (One-to-Many)
- **Department → Faculty** (One-to-Many)
- **Course ↔ Faculty** (Many-to-Many via CourseFaculty)
- **User → Event/Notice/Page** (One-to-Many as author)

---

## 🎯 Technology Justification

### Why Next.js 15?
1. **Server-Side Rendering (SSR)** - Better SEO, faster initial load
2. **Static Site Generation (SSG)** - Pre-rendered pages for performance
3. **App Router** - Modern file-based routing, layouts
4. **Server Components** - Direct database access, reduced JavaScript
5. **Server Actions** - Simplified forms, built-in security
6. **Image Optimization** - Automatic webp conversion, lazy loading
7. **Vercel Integration** - Seamless deployment, edge functions

### Why PostgreSQL + Prisma?
1. **ACID Compliance** - Data integrity, transactions
2. **Relational Data** - Perfect for college structure (departments, courses, faculty)
3. **Type Safety** - Prisma generates TypeScript types
4. **Migrations** - Version-controlled schema changes
5. **Indexing** - Fast queries on frequently accessed data
6. **Foreign Keys** - Enforced data relationships

### Why NextAuth v5?
1. **Open Source** - No vendor lock-in, free forever
2. **Flexible** - Supports multiple providers, custom logic
3. **Secure** - Battle-tested, OWASP compliant
4. **JWT Sessions** - Stateless, scalable
5. **Database Adapters** - Works seamlessly with Prisma

### Why Tailwind CSS?
1. **Utility-First** - Rapid development, less CSS to write
2. **Responsive** - Mobile-first by default
3. **Consistent** - Design system built-in
4. **Performance** - Tree-shaking, small bundle size
5. **Customizable** - Easy theming with CSS variables

---

## ⚙️ Non-Functional Requirements

### 1. Security
- **Authentication:** Secure password hashing (bcrypt), JWT sessions
- **Authorization:** Role-based access control (RBAC)
- **Input Validation:** Zod schemas for all forms
- **SQL Injection:** Prevented by Prisma (parameterized queries)
- **CSRF Protection:** Built into Next.js Server Actions
- **XSS Protection:** React escapes output by default
- **HTTPS:** Enforced on Vercel
- **Rate Limiting:** Protects login, contact forms (Upstash)

### 2. Performance
- **Static Generation:** Pre-rendered pages (courses, faculty)
- **Image Optimization:** Next.js Image component, WebP format
- **Code Splitting:** Automatic by Next.js
- **Lazy Loading:** Images, components load on demand
- **Caching:** ISR (Incremental Static Regeneration), CDN
- **Database Indexes:** Fast queries on slug, published, dates
- **Target Metrics:**
  - First Contentful Paint (FCP): < 1.5s
  - Time to Interactive (TTI): < 3.5s
  - Lighthouse Score: > 90

### 3. Accessibility (WCAG 2.1 AA)
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<footer>`
- **ARIA Labels:** On icon buttons, form controls
- **Keyboard Navigation:** All interactive elements accessible
- **Color Contrast:** Minimum 4.5:1 for text
- **Focus Indicators:** Visible on all focusable elements
- **Alt Text:** All images have descriptive alt attributes
- **Screen Reader:** Tested with VoiceOver/NVDA

### 4. Scalability
- **Serverless Architecture:** Auto-scales with traffic (Vercel)
- **Connection Pooling:** Prisma connection pooling
- **CDN Distribution:** Vercel Edge Network (300+ locations)
- **Database Scaling:** Vertical scaling (upgrade plan)
- **Horizontal Scaling:** Add read replicas (future)
- **Load Testing:** Support up to 10,000 concurrent users

### 5. Maintainability
- **TypeScript:** Type safety, fewer runtime errors
- **Component Architecture:** Reusable, testable components
- **Folder Structure:** Organized by feature/module
- **Environment Variables:** Separate configs for dev/prod
- **Version Control:** Git with meaningful commits
- **Documentation:** Code comments, README files
- **Linting:** ESLint, Prettier for code consistency

---

## 📊 Request Flow Examples

### Example 1: Public User Views Course Page
```
1. User navigates to /courses/btech-computer-science
2. Next.js checks if page is statically generated
3. If yes, serves cached HTML (lightning fast)
4. If no, Server Component fetches from database:
   - Query: prisma.course.findUnique({ where: { slug } })
   - Includes: department, faculty relations
5. Server renders React component to HTML
6. HTML sent to browser
7. React hydrates for interactivity
8. Page displays in < 500ms
```

### Example 2: Admin Creates New Course
```
1. Admin navigates to /dashboard/courses/create
2. Middleware checks session:
   - Valid session? → Continue
   - Invalid session? → Redirect to /login
3. Check role:
   - ADMIN or SUPER_ADMIN? → Allow
   - EDITOR or VIEWER? → Show 403 Forbidden
4. User fills form, clicks "Create"
5. Form submits to Server Action:
   - Validate data with Zod schema
   - Check required fields
   - Sanitize inputs
6. Server Action creates record:
   - prisma.course.create({ data })
7. Revalidate cache:
   - revalidatePath('/courses')
8. Redirect to /dashboard/courses
9. Success toast shown
```

### Example 3: File Upload (Faculty Photo)
```
1. Admin selects image file in upload component
2. Client validates:
   - File type (JPEG, PNG only)
   - File size (< 5 MB)
3. POST to /api/upload
4. Server checks auth
5. Upload to Vercel Blob Storage:
   - put('faculty/photo.jpg', file)
6. Returns public URL:
   - "https://blob.vercel-storage.com/abc123.jpg"
7. URL saved in database:
   - prisma.faculty.update({ data: { image: url } })
8. Image displayed on public site
```

---

## 🚀 Deployment Architecture

### Vercel Platform
```
┌────────────────────────────────────────────────┐
│              Vercel Edge Network               │
│        (300+ Locations Worldwide)              │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │         CDN (Static Assets)              │ │
│  │  - HTML pages                            │ │
│  │  - JavaScript bundles                    │ │
│  │  - CSS stylesheets                       │ │
│  │  - Images (optimized)                    │ │
│  └──────────────────────────────────────────┘ │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │    Serverless Functions                  │ │
│  │  - API routes                            │ │
│  │  - Server Actions                        │ │
│  │  - Middleware                            │ │
│  │  - Auto-scaling                          │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘
                    ↕
┌────────────────────────────────────────────────┐
│         External Services (Global)             │
├────────────────────────────────────────────────┤
│  • Vercel Postgres (Frankfurt/US East)        │
│  • Vercel Blob Storage (CDN)                  │
│  • GitHub (Source Code)                       │
│  • Environment Variables (Encrypted)          │
└────────────────────────────────────────────────┘
```

### CI/CD Pipeline
```
git push origin main
       ↓
GitHub webhook triggers Vercel
       ↓
Vercel builds project:
  - npm install
  - npx prisma generate
  - npm run build
       ↓
Run automated checks:
  - TypeScript compilation
  - Build errors
       ↓
Deploy to production:
  - Upload static assets to CDN
  - Deploy serverless functions
  - Update routes
       ↓
Live in < 2 minutes
       ↓
Automatic rollback if errors detected
```

---

## 🎓 For Viva Presentation

### Key Points to Emphasize:

1. **Modern Architecture:**
   - Serverless, scalable, production-ready
   - Follows industry best practices
   - Used by companies like Netflix, TikTok, Nike

2. **Security First:**
   - Password hashing, JWT sessions
   - Role-based access control
   - Input validation, SQL injection prevention

3. **Performance:**
   - Static generation for speed
   - Image optimization
   - Edge delivery for low latency

4. **User Experience:**
   - Responsive design (mobile, tablet desktop)
  - Accessible (WCAG compliant)
   - 4 customizable themes

5. **Admin Experience:**
   - Easy content management
   - CRUD operations for all entities
   - Image uploads with drag-drop
   - Rich text editor

### Demo Flow:
1. **Public Site:** Show homepage, courses, faculty, events
2. **Theme Switcher:** Toggle between 4 color palettes
3. **Mobile View:** Demonstrate responsive design
4. **Admin Login:** Show authentication
5. **Create Course:** Demonstrate CRUD
6. **Upload Image:** Show file management
7. **Prisma Studio:** Display database structure
8. **Architecture Diagram:** Explain system design

---

## 📚 References & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

**Project Repository:** https://github.com/[your-username]/mitfgc

**Live Demo:** https://mitfgc.vercel.app (after deployment)

**Project Completion Date:** February 2026

**Developed By:** [Your Name] - Final Year Project
