# Abhishek Madhu Vidya · Portfolio

React 19 + TypeScript + Vite, styled with Tailwind CSS v4, animated with Motion (Framer Motion) and Lenis smooth scrolling.
Live at https://abhishek007-7.github.io/My_Portfolio/

## Edit content
Everything (bio, jobs, projects, papers, skills) lives in **`src/data.ts`**, so you don't need to touch the components.
- Photos: `public/img/` (`profile.webp`, `about.webp`, `og.jpg` for link previews)
- Résumé: replace `public/Abhishek_Madhu_Vidya-Resume.pdf` (keep the same name, or update `profile.resume` in `data.ts`)

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Deploy (GitHub Pages)
1. Replace the old files in the `My_Portfolio` repo with this project and push to `main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (one-time).
3. Every push to `main` now builds and deploys automatically (see `.github/workflows/deploy.yml`).

## Features
- Interactive neural-network canvas hero that reacts to the cursor
- Letter-by-letter name reveal, rotating roles, 3D-tilt portrait, magnetic buttons
- Bento-grid About with live Melbourne clock, animated counters and a multilingual greeting
- Scroll-drawn experience/education timeline
- Filterable projects with generative animated cover art and detail modals
- Publications, toolkit and certifications
- ⌘K / Ctrl+K command palette (navigate, copy email, open résumé)
- Scroll progress bar, hide-on-scroll nav, full-screen mobile menu, respects `prefers-reduced-motion`
