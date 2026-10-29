# LuckyRoof Portland — Roofing Business Web Platform

> **Demonstration Notice**: *LuckyRoof* is a fictional reference company created by **ScaleUp Dynamics** as a fully functional, production-grade demonstration platform for commercial roofing contractors. All branding, service area details, and contact information can be rebranded for any market.

A modern, high-performance roofing company website built to convert first-time visitors into booked inspections. Designed with a strong visual identity, interactive 3D elements, and a structured content flow that earns homeowner trust before a single phone call is made.

---

## What This Platform Demonstrates

- **Cinematic Hero Section** — Full-screen animated entry with clear primary CTA and immediate value framing
- **Interactive 3D Roof Viewer** — Real-time material and style visualisation via Three.js / React Three Fiber
- **Transparent Process Section** — Step-by-step explanation of how the contractor engagement works, from estimate to installation
- **Portfolio & Before/After Gallery** — Visual proof of completed work with high-quality photography
- **Instant Estimator** — Lightweight on-page pricing guide to qualify and engage prospects
- **Testimonials** — Structured social proof with authentic review formatting
- **FAQ** — Pre-emptive objection handling with accordion layout
- **Contact & Lead Capture CTA** — Multi-channel contact section with form, phone, and scheduling prompt
- **Sticky Header with Mobile Navigation** — Fully responsive across all screen sizes

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + TypeScript |
| **3D Rendering** | Three.js + React Three Fiber + Drei |
| **Styling** | Tailwind CSS v3 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Build Tool** | Vite 5 |
| **Database / CRM** | Supabase |

---

## Project Structure

```
src/
├── components/
│   ├── 3d/              # Three.js roof visualiser
│   ├── Hero.tsx         # Animated hero section
│   ├── Header.tsx       # Sticky responsive navigation
│   ├── Services.tsx     # Services overview
│   ├── Process.tsx      # Step-by-step process
│   ├── Portfolio.tsx    # Before/after project gallery
│   ├── WhyUs.tsx        # Trust and differentiators
│   ├── Estimator.tsx    # On-page pricing estimator
│   ├── Testimonials.tsx # Customer reviews
│   ├── FAQ.tsx          # Accordion FAQ
│   ├── ContactCTA.tsx   # Lead capture section
│   └── Footer.tsx       # Site footer
├── config/
│   └── site.ts          # All brand/location config — single source of truth
└── hooks/               # Custom React hooks
```

---

## Contractor Customisation

All brand and market details are controlled from one file — `src/config/site.ts`:

```ts
export const site = {
  name: 'Your Company Name',
  city: 'Your City',
  serviceArea: 'Greater Metro Area',
  phone: '(555) 000-0000',
  email: 'info@yourcompany.com',
  hours: 'Mon–Sat: 7AM–7PM',
  proof: {
    showLicense: true,
    showManufacturerBadges: true,
    showReviewStats: true,
    showProjectStats: true,
    showTestimonials: true,
  },
};
```

One file. No scattered hardcoded values anywhere else.

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Deploying to Vercel

1. Import this repository into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Deploy.

---

## License & Attribution

Designed and engineered by **[ScaleUp Dynamics](https://github.com/scaleup-dynamics)** as a production-grade demonstration platform for commercial roofing contractors. *LuckyRoof* is a fictional trading name used solely for demonstration and client pitch purposes. All rights reserved.
