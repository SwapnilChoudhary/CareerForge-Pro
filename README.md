# CareerForge Pro

<div align="center">

![CareerForge Pro Banner](https://img.shields.io/badge/CareerForge-Pro-6366f1?style=for-the-badge&logoColor=white)

**An AI-powered, ATS-proof resume builder that helps you land more interviews.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-gpt--4o--mini-412991?style=flat-square&logo=openai)](https://openai.com/)
[![Stripe](https://img.shields.io/badge/Stripe-test--mode-635bff?style=flat-square&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Firebase Setup](#firebase-setup)
  - [Stripe Setup](#stripe-setup)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CareerForge Pro is a full-stack SaaS application that combines a live resume builder with AI-powered tools to help job seekers create ATS-optimized resumes. Paste a job description, extract ranked keywords, get an instant ATS match score, rewrite your bullet points using GPT-4o-mini, and export a pixel-perfect PDF — all in one split-screen editor.

> Built as a production-quality MVP using only free-tier services. No credit card required to run locally.

![Editor Screenshot](https://placehold.co/1200x630/0f172a/6366f1?text=CareerForge+Pro+Editor)

---

## Features

| Feature | Description |
|---|---|
| **Live Split-Screen Editor** | Form on the left, real-time resume preview on the right |
| **JD Analyzer** | Paste any job description — GPT-4o-mini extracts ranked keywords by importance and category |
| **ATS Score** | Weighted keyword match score (high/medium/low importance) shown visually |
| **AI Bullet Rewriter** | Rewrites your experience bullets using extracted JD keywords, preserving professional tone |
| **PDF Export** | Puppeteer renders a print-quality A4 PDF server-side |
| **Firebase Auth** | Email/password authentication with protected routes |
| **Resume Dashboard** | Save, load, and delete multiple resumes per user via Firestore |
| **Subscription Tiers** | Free tier (1 resume), Pro tier (unlimited) via Stripe Checkout in test mode |

---

## Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org/) — App Router, Server Components, API Routes
- [TypeScript 5](https://www.typescriptlang.org/) — End-to-end type safety
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) — Accessible, unstyled component primitives
- [lucide-react](https://lucide.dev/) — Icon library

**Backend & Services**
- [Firebase Authentication](https://firebase.google.com/products/auth) — Email/password auth
- [Cloud Firestore](https://firebase.google.com/products/firestore) — NoSQL resume storage
- [OpenAI API](https://platform.openai.com/) — `gpt-4o-mini` for JD parsing and bullet rewriting
- [Stripe](https://stripe.com/) — Subscription management (test mode)
- [Puppeteer](https://pptr.dev/) + [@sparticuz/chromium](https://github.com/Sparticuz/chromium) — Serverless PDF generation

**Deployment**
- [Vercel](https://vercel.com/) — Frontend + serverless API routes

---

## Project Structure

```
careerforge-pro/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Resume dashboard (save/load/delete)
│   │   ├── editor/
│   │   │   └── page.tsx          # Split-screen resume editor
│   │   ├── login/
│   │   │   └── page.tsx          # Auth page (sign in / create account)
│   │   ├── api/
│   │   │   ├── analyze-jd/
│   │   │   │   └── route.ts      # POST — extract JD keywords via OpenAI
│   │   │   ├── rewrite/
│   │   │   │   └── route.ts      # POST — rewrite bullets via OpenAI
│   │   │   ├── generate-pdf/
│   │   │   │   └── route.ts      # POST — generate PDF via Puppeteer
│   │   │   └── stripe-webhook/
│   │   │       └── route.ts      # POST — handle Stripe events
│   │   ├── layout.tsx            # Root layout (AuthProvider + ResumeProvider)
│   │   ├── page.tsx              # Landing page
│   │   └── globals.css
│   ├── components/
│   │   ├── ResumeForm.tsx        # Left panel — resume input form
│   │   ├── ResumePreview.tsx     # Right panel — live preview + PDF download
│   │   ├── JDAnalyzer.tsx        # JD paste, keyword results, AI rewriter
│   │   ├── ATSScore.tsx          # Weighted ATS keyword match score
│   │   ├── Navbar.tsx            # Top nav with user dropdown
│   │   ├── ProtectedRoute.tsx    # Auth guard wrapper
│   │   └── ui/                   # shadcn/ui components
│   ├── context/
│   │   ├── AuthContext.tsx       # Firebase auth state (global)
│   │   └── ResumeContext.tsx     # Resume state + save logic (global)
│   ├── lib/
│   │   ├── firebase.ts           # Firebase app init
│   │   ├── firestore.ts          # Firestore CRUD helpers
│   │   ├── openai.ts             # OpenAI client
│   │   ├── stripe.ts             # Stripe client
│   │   ├── resumeHtml.ts         # HTML template for PDF generation
│   │   └── utils.ts              # cn(), generateId(), formatDate()
│   └── types/
│       └── resume.ts             # ResumeData, Education, Experience, Skill types
├── .env.local                    # Environment variables (not committed)
├── next.config.ts
├── tailwind.config.ts
├── components.json               # shadcn/ui config
└── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js 18+](https://nodejs.org/)
- [npm 9+](https://www.npmjs.com/)
- A [Firebase](https://firebase.google.com/) account (free)
- An [OpenAI](https://platform.openai.com/) account (free $5 credit on signup)
- A [Stripe](https://stripe.com/) account (free, test mode)

> **Windows users:** Make sure your project path contains **no special characters** (no `#`, `&`, `%`, spaces). Use a clean path like `C:\Projects\careerforge-pro`. A `#` in the path causes a null byte bug in Tailwind's PostCSS plugin under Turbopack.

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/careerforge-pro.git
cd careerforge-pro

# 2. Install dependencies
npm install

# 3. Install Puppeteer's bundled Chromium (for local PDF generation)
npx puppeteer browsers install chrome
```

---

### Environment Variables

Create a `.env.local` file in the project root:

```env
# ── OpenAI ─────────────────────────────────────────────────────
OPENAI_API_KEY=sk-...

# ── Firebase (client-side) ─────────────────────────────────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# ── Stripe ─────────────────────────────────────────────────────
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# ── App ────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Never commit `.env.local` to version control.** It is already listed in `.gitignore` by default with `create-next-app`.

---

### Firebase Setup

#### 1. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `careerforge-pro` → disable Google Analytics → **Create project**

#### 2. Enable Email/Password Authentication

1. Left sidebar → **Authentication** → **Get started**
2. **Sign-in method** tab → **Email/Password** → **Enable** → **Save**

#### 3. Create Firestore Database

1. Left sidebar → **Firestore Database** → **Create database**
2. Select **Start in test mode** → **Next** → choose your region → **Done**

#### 4. Set Firestore Security Rules

Go to **Firestore Database** → **Rules** tab and replace the default rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resumes/{resumeId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }
  }
}
```

Click **Publish**.

#### 5. Get your Firebase config

1. **Project Settings** (gear icon) → **Your apps** → click **</>** (Web)
2. Register app as `careerforge-pro`
3. Copy the config values into your `.env.local`

---

### Stripe Setup

#### 1. Create a Stripe account

Sign up at [stripe.com](https://stripe.com) — no business required, test mode works immediately.

#### 2. Create a product and price

1. Stripe Dashboard → **Products** → **Add product**
2. Name: `CareerForge Pro`, Price: `$9.00/month` (recurring)
3. Copy the **Price ID** (starts with `price_`) → add to `.env.local` as `STRIPE_PRO_PRICE_ID`

#### 3. Get API keys

Stripe Dashboard → **Developers** → **API keys**:
- Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Copy **Secret key** → `STRIPE_SECRET_KEY`

#### 4. Set up webhook (local testing)

```bash
# Install Stripe CLI
# Windows: https://github.com/stripe/stripe-cli/releases
# macOS:
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhook events to your local server
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Copy the **webhook signing secret** (starts with `whsec_`) → add to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

---

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

| Route | Description |
|---|---|
| `/` | Landing page |
| `/login` | Sign in / Create account |
| `/editor` | Resume builder (protected) |
| `/dashboard` | Saved resumes (protected) |

---

## Usage

### Building a Resume

1. Navigate to `/editor`
2. Fill in your details in the **Resume Editor** tab — changes appear live in the preview
3. Click **Save** in the preview toolbar to persist to Firestore
4. Click **Download PDF** to export a print-ready A4 PDF

### Analyzing a Job Description

1. In the editor, click the **JD Analyzer** tab
2. Paste the full job description and click **Analyze Job Description**
3. View the extracted keywords tagged by importance (`high` / `medium` / `low`) and category
4. Your **ATS Match Score** updates automatically based on what's already in your resume

### AI Bullet Rewriting

1. Complete the JD analysis first (keywords must be extracted)
2. Under **AI Bullet Rewriter**, click **Rewrite** next to any experience entry
3. Your bullet points are replaced with AI-rewritten versions that naturally incorporate JD keywords

---

## API Routes

All routes are Next.js serverless functions deployed on Vercel.

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/analyze-jd` | Extract keywords from job description | No |
| `POST` | `/api/rewrite` | Rewrite resume bullets with keywords | No |
| `POST` | `/api/generate-pdf` | Generate Puppeteer PDF from resume data | No |
| `POST` | `/api/stripe-webhook` | Handle Stripe subscription events | Stripe signature |

### `POST /api/analyze-jd`

**Request body:**
```json
{
  "jobDescription": "We are looking for a Salesforce Administrator..."
}
```

**Response:**
```json
{
  "keywords": [
    { "term": "Salesforce", "importance": "high", "category": "tool" },
    { "term": "Apex", "importance": "medium", "category": "skill" }
  ],
  "summary": "Salesforce Administrator role focused on CRM configuration and user management."
}
```

### `POST /api/rewrite`

**Request body:**
```json
{
  "bullets": ["Worked on Salesforce projects", "Helped customers"],
  "keywords": ["Salesforce", "CRM", "Apex", "user management"],
  "jobTitle": "Salesforce Administrator"
}
```

**Response:**
```json
{
  "bullets": [
    "Configured Salesforce CRM workflows, reducing manual data entry by [30%]",
    "Managed user provisioning and role hierarchies for [50+] stakeholders"
  ]
}
```

---

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

In your Vercel project dashboard → **Settings** → **Environment Variables**, add all variables from your `.env.local`:

```
OPENAI_API_KEY
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRO_PRICE_ID
NEXT_PUBLIC_APP_URL          ← set this to your Vercel URL
```

### Stripe Webhook (Production)

1. Stripe Dashboard → **Developers** → **Webhooks** → **Add endpoint**
2. URL: `https://your-vercel-url.vercel.app/api/stripe-webhook`
3. Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`
4. Copy the new signing secret → update `STRIPE_WEBHOOK_SECRET` in Vercel env vars

---

## Known Issues

| Issue | Cause | Fix |
|---|---|---|
| Tailwind CSS null byte error on Windows | Project path contains `#` or other special characters | Move project to a clean path like `C:\Projects\careerforge-pro` |
| Puppeteer fails on first PDF generation | Chromium not downloaded | Run `npx puppeteer browsers install chrome` |
| PDF generation times out on Vercel free tier | Vercel hobby plan has 10s function timeout | PDF route sets `maxDuration = 30` — requires Vercel Pro for reliable use |
| Firebase `permission-denied` error | Firestore security rules not published | Re-publish rules in Firebase Console |

---

## Roadmap

- [ ] Google OAuth login
- [ ] Multiple resume templates
- [ ] Cover letter generator
- [ ] Job application tracker
- [ ] Resume version history
- [ ] LinkedIn profile import
- [ ] Dark mode support
- [ ] Mobile-responsive editor

---

## Contributing

Contributions are welcome. Please follow these steps:

```bash
# 1. Fork the repository

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes
git commit -m "feat: add your feature description"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request
```

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages.

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with ❤️ using Next.js, Firebase, OpenAI, and Stripe.

If this project helped you, consider giving it a ⭐ on GitHub.

</div>