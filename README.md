# PandaPay Website

Marketing and landing site for PandaPay — a WhatsApp-native, AI-powered gaming payments platform for West African users.

## What PandaPay Is

PandaPay lets users buy gaming gift cards and subscriptions by chatting with an AI assistant on WhatsApp. No app install. No checkout flow. Just a conversation. Payment is accepted in Naira (bank transfer), USDC, or cNGN stablecoin. The AI handles product selection, live pricing, payment verification, and instant code delivery end to end.

## 🚀 Tech Stack

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **React Router 7.13** - Client-side routing
- **Lucide React** - Icon library

## 📁 Project Structure

```
pandapay-frontend/
├── public/
│   ├── panda-icon.svg          # Favicon and brand icon
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── browse/             # Browse catalog images
│   │   ├── explore/            # Explore shop images (Xbox, COD, Roblox)
│   │   ├── satoshi/            # Satoshi font family
│   │   └── solution-icons/     # Solution section icons
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero section with background
│   │   │   ├── Painpoint.tsx   # Pain point section
│   │   │   ├── Solution.tsx    # Solution features section
│   │   │   ├── BrowseCatalog.tsx # Scrolling game catalog
│   │   │   ├── MicroStory.tsx  # Micro story section
│   │   │   ├── Testimonial.tsx # Testimonials section
│   │   │   ├── FAQ.tsx         # FAQ accordion
│   │   │   └── ExploreShop.tsx # Featured products
│   │   ├── Footer.tsx          # Footer with links and social
│   │   └── Navbar.tsx          # Navigation bar
│   ├── pages/
│   │   ├── LandingPage.tsx     # Main landing page
│   │   └── NotFoundPage.tsx    # 404 page
│   ├── App.tsx                 # App router
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles and design tokens
├── index.html                  # HTML template with SEO meta tags
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Orange-red (#CC3500) - CTAs and accents
- **Secondary**: Teal (#27A589) - Supporting elements
- **Neutral**: Dark theme (#0A0A0A background)

### Typography
- **Headings**: Satoshi (custom font)
- **Body**: Inter (Google Fonts)

### Layout
- **Max Width**: 1440px
- **Responsive Padding**: 24px (mobile) → 48px (tablet) → 80px (desktop)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd pandapay-frontend

# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## 📱 Features

### Sections

1. **Hero Section**
   - Full-screen hero with gaming controller background
   - Animated circular "PandaPay" text
   - Social proof (+5000 gamers)
   - CTA button

2. **Pain Point Section**
   - Highlights user challenges
   - Visual storytelling

3. **Solution Section**
   - 4 key features with icons
   - Concentric circles design
   - Responsive layout

4. **Browse Catalog**
   - Horizontal scrolling marquee
   - 100+ digital SKUs
   - Smooth animations

5. **Explore Shop**
   - Featured products (Xbox, COD, Roblox)
   - Grid layout (responsive)
   - "Buy now" CTAs

6. **FAQ Section**
   - Accordion-style questions
   - Two-column layout (desktop)

7. **Footer**
   - Social media links
   - Company and resource links
   - Copyright and legal links

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Optimized for all screen sizes

## 🔧 Configuration

### Vite Config
- React plugin enabled
- Tailwind CSS v4 integration
- Fast HMR (Hot Module Replacement)

### TypeScript
- Strict mode enabled
- Path aliases configured
- Type checking on build

### Tailwind CSS
- Custom design tokens in `@theme`
- Custom animations (marquee, spin)
- Utility-first approach

## 📦 Build Output

Production build generates:
- Optimized JavaScript bundle (~270 KB, 85 KB gzipped)
- Minified CSS (~29 KB, 6 KB gzipped)
- Optimized assets (images, fonts, SVGs)

## 🌐 SEO

The site includes comprehensive SEO meta tags:
- Primary meta tags (title, description, keywords)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Favicon and apple-touch-icon
- Robots meta for indexing

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The build output in `dist/` can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📄 License

All rights reserved © 2025 PandaPay

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

---

Built with ❤️ by the PandaPay team
