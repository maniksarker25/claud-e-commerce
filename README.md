# LUXE — Next.js E-Commerce

A production-grade luxury e-commerce frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### UI/UX
- **Elegant, editorial design** with Cormorant Garamond display + DM Sans body fonts
- **Full dark/light theming** via CSS variables
- Animated hero, marquee, category banners, editorial section
- Smooth hover effects, micro-interactions, and page transitions
- Mobile-first responsive layout

### Pages
- `/` — Homepage (hero, featured products, categories, editorial, testimonials)
- `/shop` — Collection with sidebar filters (category, price), sort, grid toggle
- `/product/[slug]` — Product detail (image gallery, size/color picker, reviews tab)
- `/cart` — Full cart with quantity controls, promo code, order summary
- `/checkout` — Multi-step (Information → Shipping → Payment → Confirmation)
- `/wishlist` — Saved items grid

### Architecture
- **Next.js 14 App Router** with server/client component separation
- **Zustand** with `persist` middleware for cart + wishlist state
- **TypeScript** strict mode throughout
- **Custom hooks**: `useDebounce`, `useIntersectionObserver`, `useLockScroll`, `useClickOutside`
- **Optimized images** via `next/image` with Unsplash remote patterns
- **react-hot-toast** for elegant toast notifications

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/               # App Router pages
│   ├── page.tsx       # Homepage
│   ├── shop/          # Product listing
│   ├── product/[slug] # Product detail
│   ├── cart/          # Shopping cart
│   ├── checkout/      # Multi-step checkout
│   └── wishlist/      # Saved items
├── components/
│   ├── layout/        # Navbar, Footer, AnnouncementBar
│   ├── product/       # ProductCard, ProductGrid
│   ├── cart/          # CartDrawer
│   └── home/          # Hero, CategoryBanner, EditorialBanner, etc.
├── hooks/             # Custom React hooks
├── lib/               # Data, utils
├── store/             # Zustand stores (cart, wishlist)
├── styles/            # Global CSS
└── types/             # TypeScript types
```

## 🎨 Design System

- **Colors**: Warm stone neutrals + brand amber/cognac accent
- **Typography**: Cormorant Garamond (display) + DM Sans (body) + DM Mono (code)
- **Spacing**: Tailwind defaults with generous whitespace
- **Animations**: CSS keyframes + Tailwind `animate-*` utilities

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | React framework, App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Zustand | State management |
| Framer Motion | Animations (ready to use) |
| next/image | Optimized images |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |

## 🔧 Customization

### Add products
Edit `src/lib/data.ts` — the `products` array is the single source of truth.

### Theme colors
Edit `tailwind.config.ts` `brand` color scale + `globals.css` CSS variables.

### Add pages
Create a file under `src/app/` following Next.js App Router conventions.
