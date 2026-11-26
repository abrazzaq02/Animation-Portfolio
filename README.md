# 🌸 Animation Portfolio — Baby-Pink CS Student Portfolio

A dreamy, fully animated, interactive portfolio for a Computer Science student, built with **React + Vite + Framer Motion**.

## ✨ Highlights

- **Animated student character** (SVG with soft 3D shading) that blinks, breathes, smiles, types on her laptop, walks across the word ribbon and **waves when you hover buttons, cards or scroll to a new section**
- A small helper character in the corner that comments on each section (desktop)
- Letter-by-letter headings, floating letters / numbers / code symbols with parallax, hearts, stars and a sparkle cursor trail
- Moving ribbons with **HELLO · CREATIVE · CODING · CS STUDENT · WELCOME**
- Animated laptop, self-typing code editor, self-typing keyboard, clicking mouse, steaming mug
- Sections: Hero, About (count-up stats), Skills (progress rings), Projects, Education (scroll-drawn timeline), Achievements, Contact (validated form + animated envelope), Footer
- **Projects** with illustrated, animated cover art for every project, a featured **AI** spotlight, category filters (All / AI / Web / Apps) and **working live demos**: AI Study Buddy chat, AI image classifier, calculator, to-do list, student manager
- Responsive for desktop, tablet and mobile; respects `prefers-reduced-motion`

## 🚀 Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## 🎀 Make it yours

All text lives in **`src/data/portfolio.js`** — your name, email, university, social links, skills, projects, education and achievements. Change it there and every section updates.

The contact form validates input and then opens the visitor's email app addressed to `profile.email` (no backend needed).

### Project pictures

Each project's `cover` in `portfolio.js` picks one of the built-in illustrations (`ai-chat`, `ai-vision`, `portfolio`, `students`, `calculator`, `todo`). Set `featured: true` on one project to show it in the big spotlight card.

## 🗂 Structure

```
src/
  data/portfolio.js        ← your content
  context/MoodContext.jsx  ← lets the characters react to hovers & scrolling
  components/
    Girl.jsx               ← the animated character (stand / walk / sit)
    Covers.jsx             ← illustrated project cover pictures (SVG)
    Ambient.jsx            ← floating symbols, loader, scroll bar, sparkles
    Navbar, Hero, WordBand, About, Skills, Projects, Demos,
    Education, Achievements, Contact, Footer
  styles/global.css        ← theme tokens + all styles & keyframes
```
