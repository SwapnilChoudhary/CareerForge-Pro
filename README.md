# CareerForge Pro (Weeks 1 & 2) — ATS-Proof Resume Generator & Job Matcher

**Product name:** CareerForge Pro  
**Use case:** Upload/edit your resume, paste a target Job Description (JD), extract keywords, optimize bullet points for Applicant Tracking Systems (ATS), and preview an ATS-friendly resume in real time.

This repository contains the **Weeks 1–2** implementation of CareerForge Pro: a React + Redux (Vite) application with a live split-screen resume builder, JD analysis, keyword extraction, ATS scoring, and an AI-assisted bullet-point rewriter with improvement suggestions.

> ✅ **Completed:** Week 1 (Builder Core) + Week 2 (AI Writer & Optimization)  
> 🚧 **Upcoming:** Week 3 (Puppeteer PDF generation + Stripe subscription) + Week 4 (Cover letter generator + Dashboard + polish)

---

## ✨ Features (Weeks 1–2)

### Week 1 — The Builder Core
- **Resume Schema & State Management**: structured data for `Personal`, `Experience`, `Education`, `Skills` (Redux Toolkit + `uuid` IDs).
- **Live Split-Screen UI**: form on the left, pixel-accurate resume preview on the right.
- **Real-Time Updates**: every edit updates the preview instantly.
- **Professional Resume Template**: print-safe CSS for an ATS-friendly layout.

### Week 2 — AI Writer & Optimization (The "Magic" Button)
- **JD Analysis Agent**: paste a job description and automatically extract and categorize keywords (languages, frameworks, tools, soft skills, methodologies).
- **Keywords Display**: color-coded keyword categories + top frequent terms from the JD.
- **ATS Score Calculator**: computes a match score based on how many JD keywords appear in your resume (with found/missing breakdown).
- **AI Rewrite Logic (mock)**: rewrites bullet points to naturally include relevant JD keywords and improve clarity.
- **Suggestions System**: lists which bullet points are missing key terms and offers one-click rewrite previews + apply.
- **Optimize All**: batch rewrite suggestions across all experience bullets.

---

## 🧪 Demo / What to Test

1. **Fill the resume form** (Personal, Experience, Education, Skills).  
   → Watch the **right-side preview** update live.
2. **Paste a Job Description** into the JD textarea and click **“🔍 Analyze Job Description”**.  
   → See categorized keywords + a match score.
3. Click **“📊 Calculate ATS Score”**.  
   → See current ATS score + found/missing keywords.
4. Click **“💡 Get Suggestions”**.  
   → See which bullets need keyword improvements.
5. Click **“🚀 Optimize All”**, review previews, and **“✓ Apply”**.  
   → Bullet points update in the form and preview.

---

## 🧰 Tech Stack

- **Frontend:** React 18 + Vite + Redux Toolkit + React-Redux
- **Styling:** Vanilla CSS (no Tailwind)
- **Utilities:** `uuid` for stable IDs
- **Planned (Weeks 3–4):** Node/Express backend, SQLite/Postgres, Puppeteer (PDF), Stripe (subscriptions), JWT auth

---

