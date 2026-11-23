# Funngro Smart Web Application 🚀

A modern, responsive, and functional web application ecosystem inspired by the Funngro product, transforming the mobile experience into an intelligent, convenient, and professional web platform for **Teenlancers** and **Companies**.

---

## 🌟 Architecture & Key Features

### 1. Dual-Sided Platform with Role-Based Access
- **Teen Portal (`/teen`)**:
  - Energetic, encouraging, and clean user experience.
  - Multi-step registration wizard with parental/guardian consent validation.
  - Smart Project Discovery engine with multi-criteria filtering (Domain, Skills, Budget, Level, Duration) and match percentage scores.
  - Proposal application flow with duplicate prevention.
  - Active assignments dashboard with milestone tracking.
  - Work submission interface (Git repos, Figma URLs, deliverables summary) with revision handling.
  - Transparent earnings dashboard with simulated UPI withdrawal engine & audit trail.
  - Gamified Leaderboard with XP points, achievement badges, and referral system.
  - Monitored teen-to-company messaging with child safety banners.
  - Public/Private shareable student portfolio showcase.

- **Company Portal (`/company`)**:
  - High-performance, data-driven business SaaS dashboard.
  - 5-step Project Creation Wizard with AI Project Description Assistant.
  - Comprehensive candidate application review with Shortlist, Accept, Reject, and Request Info actions.
  - Privacy-safe Talent Discovery directory.
  - Deliverable review workspace with milestone approval and revision request modal.
  - Spending analytics, escrow protection breakdown, and hiring funnel charts with Recharts.

- **Admin Portal (`/admin`)**:
  - Ecosystem moderation, child safety compliance audit, and platform transaction ledger.

- **Public SEO Pages**:
  - Landing (`/`), Teen Landing (`/teen`), Company Landing (`/company`), How It Works (`/how-it-works`), About Us (`/about`), Contact & Support (`/contact`), FAQs (`/faq`), Privacy Policy (`/privacy-policy`), Terms of Service (`/terms`).
  - Pre-configured `sitemap.xml` and `robots.txt` ensuring private user dashboards and sensitive application data are never indexed.

---

## 🔑 Quick Demo Credentials (1-Click Login Available)

You can instantly switch roles using the **top bar demo buttons** or log in via `/auth/login`:

| Role | Email | Password | Preloaded Context |
| :--- | :--- | :--- | :--- |
| **Teenlancer** | `teen@funngro.com` | `teen123` | Aarav Sharma (Class 11), ₹8,200 wallet balance, 2 active projects, 8 completed |
| **Company** | `company@techcorp.com` | `comp123` | Nexus Innovations, 3 active projects, 20 candidate applications, ₹85,000 spend |
| **Admin** | `admin@funngro.com` | `admin123` | System Administrator, platform safety checks, moderation audit logs |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, TanStack Query, React Hook Form, Zod.
- **Design System**: Deep Navy (`#0B1528`), Fresh Green (`#10B981`), Indigo (`#6366F1`), Plus Jakarta Sans typography.
- **Persistence & State**: Reactive local storage service preloaded with 10 teen profiles, 5 company profiles, 15 rich projects, 20 applications, active assignments, notifications, and transactions.

---

## 🚀 Running the Project

The frontend dev server is currently running live:

- **Local URL**: [http://localhost:5173/](http://localhost:5173/)
- **Command**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Production Build Verification**:
  ```bash
  npm run build
  ```
