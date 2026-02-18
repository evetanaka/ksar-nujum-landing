# Ksar Nujum Landing Page

Luxury villas & longevity resort in Marrakech. One-page landing site.

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript

## Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Main page composing sections
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Sticky navigation
│   └── Footer.tsx      # Site footer
├── sections/
│   ├── Hero.tsx        # Full-screen hero
│   ├── Vision.tsx      # Story & philosophy
│   ├── Residences.tsx  # 4 villa collections
│   ├── Experience.tsx  # Amenities grid
│   ├── Longevity.tsx   # Clinic details
│   ├── Gallery.tsx     # Image masonry
│   └── Contact.tsx     # Form & FAQ
└── lib/                # Utilities
```

## Design System

### Colors
- Primary: `#D4AF37` (Gold)
- Secondary: `#1C1C1C` (Deep black)
- Accent: `#8B7355` (Terracotta)
- Background: `#FAF8F5` (Warm off-white)

### Typography
- Headlines: Cormorant Garamond (serif)
- Body: Inter (sans-serif)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Sections

1. **Hero** - Video background, tagline, CTA
2. **Vision** - Storytelling, 3 pillars, location
3. **Residences** - 4 collections with tabs
4. **Experience** - Gastronomy, wellness, lifestyle
5. **Longevity** - 3-level clinic journey
6. **Gallery** - Masonry + masterplan
7. **Contact** - Form, FAQ, map
