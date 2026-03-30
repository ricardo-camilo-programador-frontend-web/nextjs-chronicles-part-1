# 🌿 Breath Natural — NextJS Chronicles Part 1

[![Netlify Status](https://api.netlify.com/api/v1/badges/d47b2f19-f948-4850-926f-40a3fdf478e8/deploy-status)](https://app.netlify.com/sites/breath-natural-nextjs-chronicles/deploys)

> 🌱 A modern indoor plant showcase and e-commerce application built to master Next.js 15 App Router, TypeScript, and modern frontend patterns.

## 🔗 Links

- 🌍 **Live Preview**: [breath-natural-nextjs-chronicles.netlify.app](https://breath-natural-nextjs-chronicles.netlify.app/)
- 📂 **GitHub**: [ricardo-camilo-programador-frontend-web/nextjs-chronicles-part-1](https://github.com/ricardo-camilo-programador-frontend-web/nextjs-chronicles-part-1)
- 🎨 **Original Design**: [Figma Community](https://www.figma.com/community/file/1341057411255052611) by [@dsingr](https://www.figma.com/@dsingr)
- 🎨 **Contact Page Design**: by [@VictorBravim](https://www.figma.com/@VictorBravim)
- 🌱 **Plant API**: [Trefle — Global Plant Database](https://trefle.io/)

---

## 🎯 About This Project

**Breath Natural** is more than a plant shop — it's a **learning chronicle**. This project captures the journey of mastering Next.js 15 App Router by building a progressively complex application layer by layer, starting from a beautiful Figma design and evolving into a full-featured web application.

Each feature was added to push the boundaries of knowledge — from server and client components to internationalization, state management, form validation, performance optimization, and SEO.

### 🧭 What It Does

| Area | Description |
|------|-------------|
| 🪴 **Plant Showcase** | Browse indoor plants with data from Trefle API, featured sections, testimonials, and beautiful animations |
| 🛒 **E-Commerce** | Shopping cart, checkout flow with address lookup (CEP), payment simulation, and order tracking |
| 👤 **User Dashboard** | Full financial dashboard with wallet, transactions, deposits, withdrawals, loans, virtual cards, referrals, and rewards |
| 🔐 **Authentication** | Login and registration pages (static data) |
| ⚙️ **Admin Panel** | Plant management dashboard with detailed views and pagination |
| 📬 **Contact** | Contact form with validation and ambient sound player |
| 🌍 **Internationalization** | 7 languages with RTL support (English, Portuguese, German, Japanese, Hindi, Arabic, Polish) |

### 📐 Architecture Highlights

- **Next.js 15 App Router** with `[locale]` dynamic segments for i18n
- **3 Layout Systems**: `DefaultLayout` (main site), `PublicLayout` (auth pages), `AdminLayout` (admin panel)
- **Server & Client Components** — proper separation of concerns
- **Zustand Stores** — 7 stores for cart, checkout, customer, payment, orders, countries, and intro modal
- **Form Validation** — react-hook-form + Zod schemas
- **HTTP Client** — Axios-based with cache headers
- **SEO** — Per-page metadata, JSON-LD structured data, Twitter Cards, dynamic sitemap, robots.txt
- **Performance** — Next.js Image optimization, lazy loading, removed unused dependencies

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?logo=next.js) | React framework (App Router) |
| ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) | UI library |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) | Type safety |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss) | Styling |
| ![Zustand](https://img.shields.io/badge/Zustand-5-orange) | State management |
| ![next-intl](https://img.shields.io/badge/next--intl-3.26-blue) | Internationalization |
| ![react-hook-form](https://img.shields.io/badge/react--hook--form-7-EC4899) | Form handling |
| ![Zod](https://img.shields.io/badge/Zod-3-3068B7) | Schema validation |
| ![Embla Carousel](https://img.shields.io/badge/Embla_Carousel-8.5-green) | Carousel component |
| ![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios) | HTTP client |
| ![Trefle API](https://img.shields.io/badge/Trefle_API-Plants-green) | Plant data source |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/            # App Router with locale prefix
│   │   ├── page.tsx         # Home page
│   │   ├── plants/          # Plant catalog
│   │   ├── checkout/        # Checkout flow
│   │   ├── contact/         # Contact page
│   │   ├── orders/          # Order history
│   │   ├── login/           # Authentication
│   │   ├── order/[orderId]/ # Dynamic order details
│   │   └── user/            # User dashboard (16 pages)
│   │       ├── dashboard/
│   │       ├── settings/
│   │       ├── wallet/
│   │       ├── transactions/
│   │       ├── portfolio/
│   │       ├── loan/
│   │       ├── deposit/
│   │       ├── withdraw/
│   │       ├── pay-bill/
│   │       ├── fund-transfer/
│   │       ├── virtual-cards/
│   │       ├── referral/
│   │       ├── rewards/
│   │       ├── dps/
│   │       └── fdr/
│   ├── api/                 # API routes
│   ├── sitemap.ts           # Dynamic sitemap
│   └── layout.tsx           # Root layout
├── blocks/                  # Feature sections & shortcuts
│   ├── sections/            # Page sections (intro, testimonials, etc.)
│   ├── checkout/            # Checkout blocks
│   ├── user/                # User dashboard blocks
│   └── *.tsx                # Shortcuts & modals
├── components/              # Reusable UI components (31 components)
├── store/                   # Zustand state stores (7 stores)
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── schemas/                 # Zod validation schemas
├── services/                # HTTP client & API services
├── static/                  # Static data & constants
├── messages/                # i18n translations (7 languages)
├── layouts/                 # Page layout wrappers
└── config/                  # App configuration
```

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server (with Turbopack)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 🌍 Supported Languages

| Code | Language | Direction |
|------|----------|-----------|
| 🇺🇸 `en` | English | LTR |
| 🇧🇷 `br` | Português (Brasil) | LTR |
| 🇩🇪 `de` | Deutsch | LTR |
| 🇯🇵 `jp` | 日本語 | LTR |
| 🇮🇳 `hi` | हिन्दी | LTR |
| 🇸🇦 `ar` | العربية | **RTL** |
| 🇵🇱 `pl` | Polski | LTR |

---

## 📚 Learning Journey

This project was built to gain hands-on experience with:

- ✅ Next.js 15 App Router architecture (Server & Client Components)
- ✅ TypeScript strict mode and advanced typing
- ✅ Dynamic routing with `[locale]` and `[orderId]` segments
- ✅ Internationalization (i18n) with RTL support
- ✅ State management with Zustand
- ✅ Form validation with react-hook-form + Zod
- ✅ SEO best practices (metadata, JSON-LD, sitemap, robots.txt)
- ✅ Performance optimization (Image component, lazy loading, cache headers)
- ✅ Responsive design and mobile-first approach
- ✅ Code organization and feature-based architecture

---

## 📄 License

MIT © Ricardo Damaceno

---

<p align="center">
Made with 🌿 by <a href="https://github.com/ricardo-camilo-programador-frontend-web">Ricardo Camilo</a>
</p>
