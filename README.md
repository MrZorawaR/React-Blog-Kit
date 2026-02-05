# React Blog Kit (Vite / Next Add-on)

A reusable, plug-and-play **blog system with admin dashboard** for React applications built using **Vite or Next.js**.

> This is **not a standalone CMS**.
> React Blog Kit is designed to be integrated into **existing React projects** to quickly add a production-ready **blog + admin panel**.

---

## 🚀 What This Is

React Blog Kit is a **drop-in blog add-on** that provides:

* A **public-facing blog** (listing + article pages)
* A fully functional **admin dashboard** for managing content
* A **headless backend** powered by Supabase

You can plug it into:

* Existing **Vite + React** apps
* Existing **Next.js** apps (Pages or App Router)

No lock-in. No opinionated CMS. Just clean, reusable blog infrastructure.

---

## ✨ Features

### 🌍 Public Blog

* Modern, responsive UI (Tailwind CSS)
* Blog listing with search & filtering
* Individual blog pages with rich content
* Image support, formatted text, and code blocks
* SEO-ready structure (meta tags, Open Graph support)

### 🛠️ Admin Dashboard (`/admin`)

* Secure admin-only routes
* Create, edit, and delete blog posts
* Draft / Publish workflow
* Rich text editor for content writing
* Featured image & inline image support
* Categories and tags management
* SEO fields:

  * Meta title
  * Meta description
  * Keywords
  * Canonical URL

---

## 🧩 Designed as an Add-on

React Blog Kit is intentionally built as a **module**, not a full app.

### You control:

* Authentication strategy
* Layout & branding
* Routing structure
* Deployment platform

### We provide:

* Blog UI
* Admin UI
* Database schema
* Data fetching & caching logic

---

## 🛠️ Tech Stack

* **Frontend**: React 18, Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Data Fetching**: TanStack React Query
* **Backend / Auth / DB**: Supabase
* **Routing**: React Router
* **Notifications**: Sonner

---

## 🏁 Getting Started (Vite)

### Prerequisites

* Node.js v18+
* A Supabase project

### Installation

```bash
git clone <repository-url>
cd react-blog-kit
npm install
```

### Environment Setup

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🗄️ Database Setup (Supabase)

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Open `src/sqlMig.sql`
4. Run the script

This will create:

* `blogs`
* `categories`
* `profiles`

With proper constraints and relationships.

---

## ▶️ Running Locally

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🏗️ Production Build

```bash
npm run build
```

Output will be generated in the `dist/` directory.

---

## 📦 Integrating Into an Existing Project

You can:

* Copy the `pages/blog` and `pages/admin` routes
* Reuse the Supabase schema
* Plug the Query + Auth providers into your app shell

> A detailed **Vite and Next.js integration guide** can be added if needed.

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
├── lib/               # Supabase client & utilities
├── pages/
│   ├── blog/           # Public blog routes
│   └── admin/          # Admin dashboard
├── App.tsx            # Routing & providers
├── main.tsx           # Entry point
├── sqlMig.sql         # Database schema
```

---

## 📜 Scripts

* `npm run dev` – Start development server
* `npm run build` – Build for production
* `npm run preview` – Preview production build
* `npm run lint` – Lint codebase

---

## 🎯 Use Cases

* Add a blog to an existing SaaS product
* Add content marketing pages to a startup site
* Build an internal admin-driven blog system
* Reuse the same blog logic across multiple apps

---

## ⚠️ Important Notes

* This project assumes **Supabase as backend**
* Authentication & authorization should be adapted to your app
* Admin routes must be protected manually

---


## ✨ Final Thought

React Blog Kit exists so you don’t have to rebuild a blog system **every single time**.

Drop it in. Customize it. Ship faster.