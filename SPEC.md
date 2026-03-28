# MITFGC College Website - Master Specification v1.0

**Last Updated:** March 28, 2026  
**Version:** 1.0 (Foundation)  
**Status:** Active – All 3 AIs work from this spec

---

## 1. PROJECT OVERVIEW

### Vision
Build a modern, accessible, mobile-first college website that showcases programs, faculty, and campus culture. The site serves as the primary digital hub for prospective students, current students, parents, and alumni.

### Key Facts
- **Institution:** MIT FGC (College Name)
- **Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, PostgreSQL, Prisma, NextAuth v5
- **Deployment:** Vercel (Serverless)
- **Database:** PostgreSQL with Prisma ORM
- **File Storage:** Vercel Blob Storage (Images, Documents)
- **Admin System:** NextAuth v5 auth → Dashboard for content management

---

## 2. BRAND & DESIGN SYSTEM

### Color Palette (Tailwind Classes)
```
Primary:    #1F2937 (slate-900)    – Dark blue-gray
Secondary:  #3B82F6 (blue-500)     – Bright blue
Accent:     #F59E0B (amber-500)    – Warm amber
Success:    #10B981 (emerald-500)  – Emerald
Danger:     #EF4444 (red-500)      – Red
```

### Typography
- **Headings (H1-H4):** GeistFont (via Next.js `font/next`)
- **Body Text:** System fonts (sans-serif fallback)
- **H1:** 48px/3rem, bold, uppercase on hero
- **H2:** 36px/2.25rem, semi-bold, section titles
- **Body:** 16px/1rem, regular, line-height 1.6

### Layout Constraints
- **Max Width:** 1280px (`max-w-7xl` in Tailwind)
- **Padding:** 16px mobile, 32px tablet+, 48px desktop
- **Grid:** 4 columns mobile, 8 columns tablet, 12 columns desktop

### Accessibility (WCAG 2.1 AA)
- ALL images must have descriptive alt text
- Color contrast ratio: 4.5:1 for normal text
- Interactive elements: min 44px × 44px (touch targets)
- All modals/popups must be keyboard accessible
- Form labels linked via `htmlFor` attribute
- Lighthouse Accessibility score: ≥ 90

---

## 3. PAGE STRUCTURE & INFORMATION ARCHITECTURE

### Public Pages (No Login Required)

#### 1. **Home Page** (`/`)
**Purpose:** First impression, SEO landing, call-to-action funnel

**Sections:**
- Hero Banner (video/image, h1, CTA buttons)
- Why Choose Us (4-6 cards with icons)
- Featured Programs (3-4 program cards with links)
- Stats Bar (Students, Faculty, Placements, etc.)
- Testimonials (3-5 carousel or grid)
- About/Vision-Mission-Values
- FAQ Accordion (5-8 common questions)
- Gallery Preview (latest 6 images)
- Contact CTA Section
- Footer

**Components:**
- `HeroSection.tsx` – Hero with overlay text
- `WhyChooseUs.tsx` – 4-card grid
- `ProgramsSection.tsx` – Featured programs
- `StatsBar.tsx` – Counter display
- `Testimonials.tsx` – Carousel
- `GallerySection.tsx` – Gallery preview
- `Contact.tsx` – CTA block
- `FAQ.tsx` – Accordion

**Acceptance Criteria:**
- [ ] Hero responsive on mobile (text readable)
- [ ] All CTAs link to relevant pages
- [ ] Images load via Vercel Blob or Next Image (optimized)
- [ ] Page loads in < 3 seconds (Lighthouse)
- [ ] Mobile-optimized: no horizontal scroll

---

#### 2. **Programs Page** (`/programs`)
**Purpose:** List all academic programs with filters

**Data Source:** CMS (editable by admin)

**Features:**
- List all programs with filters (Degree, Duration, Category)
- Search by program name
- Detail view for each program
- Links to application

**Acceptance Criteria:**
- [ ] Search highlights matching programs
- [ ] Filters work correctly (AND logic)
- [ ] Program images load quickly
- [ ] Clicking program → `/programs/[slug]` detail page

---

#### 3. **Programs Detail Page** (`/programs/[slug]`)
**Purpose:** Detailed info for one program

**Sections:**
- Program title + hero image
- Duration, fees, eligibility
- Course breakdown / curriculum
- Faculty teaching this program
- Student testimonials
- Application CTA
- Related programs carousel

**Acceptance Criteria:**
- [ ] Page pre-renders statically for performance
- [ ] Faculty links → Faculty profile page
- [ ] No 404 on invalid slug (show 404 page)

---

#### 4. **Faculty Page** (`/faculty`)
**Purpose:** Directory of all faculty with photos & bios

**Features:**
- Grid display (3 columns desktop, 1 col mobile)
- Filter by department
- Search by name
- Clicking faculty → detail page

**Acceptance Criteria:**
- [ ] Photos load quickly (Next Image optimization)
- [ ] Responsive: layout changes at breakpoints
- [ ] Department filter works

---

#### 5. **Faculty Detail Page** (`/faculty/[slug]`)
**Purpose:** Bio, expertise, office hours for one faculty

**Sections:**
- Photo + name
- Title, department, email, phone
- Bio (long-form text)
- Expertise areas (tags)
- Programs taught in (linked)
- Qualifications
- Office hours (if available)

**Acceptance Criteria:**
- [ ] Programs taught link to `/programs/[slug]`
- [ ] Email is clickable `mailto:` link
- [ ] Chair/Head faculty marked with badge

---

#### 6. **Gallery Page** (`/gallery`)
**Purpose:** Photo gallery of campus, events, student life

**Features:**
- Grid of images (lightbox on click)
- Filter by category (Events, Campus, Students, Clubs, etc.)
- Pagination or infinite scroll
- Images managed in admin CMS

**Acceptance Criteria:**
- [ ] Lightbox modal is keyboard accessible
- [ ] Images load lazily
- [ ] Filter works without page reload (client-side)

---

#### 7. **Admissions/Contact Page** (`/contact` or `/admissions`)
**Purpose:** Contact form + inquiry funnel

**Sections:**
- Contact form (Name, Email, Phone, Message, Program Interest)
- Address + map embed
- Phone + email
- Office hours
- FAQs

**Form Validation:**
- Name: required, min 2 characters
- Email: required, valid format
- Phone: optional, valid if provided
- Message: required, min 10 characters

**On Submit:**
- Store in DB (Prisma)
- Send confirmation email to user
- Send admin notification
- Show success message

**Acceptance Criteria:**
- [ ] Form validates before submission
- [ ] CSRF protection (NextAuth)
- [ ] Emails sent reliably
- [ ] No sensitive data in logs

---

#### 8. **About/Info Pages** (`/about`, `/accreditations`, `/placements`, `/vision-mission`)
**Purpose:** Static informational pages

**Editable via:** Admin CMS

**Acceptance Criteria:**
- [ ] Content updates reflected immediately
- [ ] SEO metadata customizable

---

### Admin Pages (Authenticated, Protected)

#### 1. **Admin Login** (`/admin`)
- NextAuth v5 sign-in form
- Email + password (or OAuth)
- "Remember me" option
- Forgot password link

---

#### 2. **Admin Dashboard** (`/admin/dashboard`)
- Overview cards (Users, Content, Inquiries)
- Recent activity feed
- Quick action buttons

---

#### 3. **Content Management** (`/admin/content`)
- **Programs:** Create, read, update, delete programs
- **Faculty:** Add/edit faculty profiles
- **Gallery:** Upload/manage images
- **Settings:** Global site settings (logo, tagline, contact email, etc.)
- **Notices:** Create announcements

---

#### 4. **Inquiries Page** (`/admin/inquiries`)
- Table of contact form submissions
- Search, filter, export
- Mark as resolved
- Reply via email

---

#### 5. **Users** (`/admin/users`)
- Manage admin users
- Roles (super-admin, editor, viewer)
- Deactivate users

---

## 4. DATA MODELS (Prisma Schema)

### Core Entities

```prisma
// User (Admin)
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // bcryptjs hashed
  name          String?
  role          Role      @default(EDITOR) // SUPER_ADMIN, EDITOR, VIEWER
  active        Boolean   @default(true)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  SUPER_ADMIN
  EDITOR
  VIEWER
}

// Program
model Program {
  id            String    @id @default(cuid())
  name          String    @unique
  slug          String    @unique
  description   String    @db.Text
  duration      String    // "3 Years", "2 Semesters"
  category      String    // "Undergraduate", "Master's", etc.
  fees          String?   // "Contact for fees"
  eligibility   String    @db.Text
  curriculum    String    @db.Text
  image         String?   // Vercel Blob URL
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  faculty       Faculty[]
}

// Faculty
model Faculty {
  id            String    @id @default(cuid())
  name          String
  slug          String    @unique
  title         String    // "Professor", "Assistant Professor"
  department    String
  email         String    @unique
  phone         String?
  bio           String    @db.Text
  expertise     String?   // JSON array or comma-separated
  image         String?   // Vercel Blob URL
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  programs      Program[]
}

// Gallery Image
model GalleryImage {
  id            String    @id @default(cuid())
  url           String    // Vercel Blob URL
  alt           String
  category      String    // "Events", "Campus", etc.
  createdAt     DateTime  @default(now())
}

// Contact Inquiry
model Inquiry {
  id            String    @id @default(cuid())
  name          String
  email         String
  phone         String?
  message       String    @db.Text
  programInterest String?
  resolved      Boolean   @default(false)
  createdAt     DateTime  @default(now())
}

// Settings
model Setting {
  key           String    @id
  value         String    @db.Text
  // Examples: "siteTitle", "tagline", "contactEmail", etc.
}
```

---

## 5. ACCEPTANCE CRITERIA (QA Checklist)

### Functional
- [ ] All pages load without errors
- [ ] Forms validate and submit correctly
- [ ] Admin CRUD operations work
- [ ] Search & filters functional
- [ ] Links navigate correctly (no 404s)
- [ ] Images load and display properly

### Performance
- [ ] Lighthouse Performance score ≥ 85
- [ ] Lighthouse Accessibility score ≥ 90
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Security
- [ ] No SQL injection vulnerabilities
- [ ] CSRF tokens on all forms
- [ ] Admin routes require authentication
- [ ] Passwords hashed (bcryptjs)
- [ ] No secrets in client-side code

### SEO
- [ ] Meta titles on all pages
- [ ] Meta descriptions customizable
- [ ] Open Graph tags
- [ ] Sitemap.xml generated
- [ ] robots.txt in place

### Accessibility (WCAG 2.1 AA)
- [ ] All images have alt text
- [ ] Color contrast ≥ 4.5:1
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Form labels linked via htmlFor
- [ ] Focus indicators visible

### Mobile & Responsive
- [ ] Works on iPhone 12 (375px width)
- [ ] Works on iPad (768px width)
- [ ] Works on desktop (1280px+)
- [ ] No horizontal scrolling
- [ ] Touch targets ≥ 44px

### Browser Support
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 6. NAMING CONVENTIONS (Binding Contract)

### Component Files
```
src/components/
├── home/
│   ├── HeroSection.tsx         // PascalCase, descriptive
│   ├── WhyChooseUs.tsx
│   └── ...
├── faculty/
│   ├── FacultyCard.tsx
│   └── FacultyGrid.tsx
├── programs/
│   ├── ProgramCard.tsx
│   └── ...
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MobileBottomNav.tsx
├── ui/                         // Shadcn/ui or custom reusables
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
```

### CSS/Styling
- Use Tailwind utility classes (no custom CSS if possible)
- Custom CSS in `/src/app/globals.css` only
- CSS variable naming: `--color-primary`, `--spacing-lg`

### Variables & Functions
```typescript
// camelCase
const userName = "John";
const getPrograms = () => {};

// Constants: UPPER_SNAKE_CASE
const MAX_IMG_SIZE = 5000000; // 5MB
const API_BASE = "https://api.example.com";

// React hooks: camelCase
const [isOpen, setIsOpen] = useState(false);
```

### Routes/URLs
```
Lowercase with hyphens:
/programs
/programs/computer-science
/faculty
/faculty/john-doe
/admin/content/programs
```

### API Routes
```
/api/auth/[...nextauth]
/api/programs/route.ts   (GET, POST)
/api/inquiry/route.ts    (POST)
/api/upload/route.ts     (POST)
```

### Database/Prisma
```prisma
// Model names: PascalCase, singular
model Program { }

// Field names: camelCase
model Program {
  programName String
  createdAt   DateTime
}

// Enum names: PascalCase
enum Role {
  SUPER_ADMIN
  EDITOR
}
```

---

## 7. TESTING REQUIREMENTS (Minimum)

### Unit Tests
- Component snapshot tests (React Testing Library)
- Utility function tests (Jest)
- Validation logic tests

### Integration Tests
- Form submission → DB persistence
- Auth flow (login, logout, protected route)
- API routes (programs list, inquiry creation)

### E2E Tests
- Homepage loads, searches work
- Admin CRUD operations
- Contact form submission
- Faculty/Program detail page navigation

### Test File Naming
```
ComponentName.test.tsx
functionName.test.ts
ApiRoute.test.ts
```

---

## 8. DEPLOYMENT & CI/CD

### Build Script
```bash
npm run build
```

### CI Checks (Required to Pass Before Merge)
```bash
npm run lint         # ESLint, TypeScript
npm run build        # Next.js build
npm run test         # Jest tests (if tests exist)
lighthouse          # Performance audit
```

### Deployment to Vercel
- Main branch deploys to production
- Feature branches deploy to preview URLs
- All CI checks must pass before merge

---

## 9. CODING STANDARDS

### TypeScript
- Strict mode enabled (`strict: true` in tsconfig.json)
- No `any` types (except justified cases with comments)
- Export types explicitly

```typescript
// ✅ GOOD
export interface ProgramProps {
  name: string;
  slug: string;
}

export const Program: React.FC<ProgramProps> = ({ name, slug }) => {
  return <div>{name}</div>;
};

// ❌ BAD
export const Program = ({ name, slug }: any) => {
  return <div>{name}</div>;
};
```

### React Components
- Functional components only (no class components)
- Hooks for state management
- Prop drilling minimized (use Context sparingly)
- Memoize expensive renders (`React.memo`)

### File Organization
```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Home
│   ├── layout.tsx
│   ├── globals.css
│   └── [routes]/
├── components/          # Reusable React components
├── lib/                 # Utilities, helpers
├── types/               # TypeScript interfaces/types
├── styles/              # Global CSS (if any)
└── server/              # Server actions, DB queries
```

### Error Handling
- All async operations wrapped in try-catch
- User-friendly error messages
- Logging: console + optional service (e.g., Sentry)

---

## 10. How This Spec Works (For All 3 AIs)

### Claude's Role (Planner)
1. **Input:** "Build the Programs page"
2. **Reference:** This spec (page structure, data models, naming, acceptance criteria)
3. **Output:** Detailed implementation plan with component breakdown, data flow, edge cases
4. **Constraint:** All suggestions must align with tech stack + conventions in this spec

### Gemini's Role (Reviewer)
1. **Input:** Claude's plan
2. **Reference:** This spec (accessibility, mobile, performance requirements)
3. **Output:** Critique with UX/accessibility improvements, flagging violations
4. **Constraint:** All feedback rooted in this spec + WCAG standards

### Copilot's Role (Coder)
1. **Input:** Gemini-reviewed plan
2. **Reference:** This spec (naming, folder structure, TypeScript, components)
3. **Output:** Production-ready code in PR
4. **Constraint:** Code must pass all CI checks (lint, build, tests)

---

## 11. Version History

| Version | Date       | Changes                                  |
|---------|------------|------------------------------------------|
| 1.0     | 2026-03-28 | Initial spec with all pages, data models, + conventions |

---

## 12. Next Steps

1. **Claude:** Review this spec → create detailed implementation plan for v1 (Home + Programs page)
2. **Gemini:** Review Claude's plan → suggest UX/accessibility improvements
3. **Copilot:** Implement reviewed plan in PR `feature/college-site-v1`
4. **Claude or Gemini:** Review PR for bugs/alignment with spec
5. **You (Kiran):** Merge when CI passes + review approved

Good luck! 🚀
