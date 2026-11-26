# 🌸 Animation Portfolio — Baby-Pink CS Student Portfolio

A dreamy, fully animated, interactive portfolio for a Computer Science student — a personalised gift for a best friend — built with **React + Vite + GSAP (ScrollTrigger) + Framer Motion**.

## 🎬 40-second showreel

The site opens with a cinematic showreel driven by **one GSAP master timeline** (`src/components/Showreel.jsx`):

| Time | Label | Scene |
|---|---|---|
| 0–4s | `intro` | Giant **PORTFOLIO** mask reveal with reflection, character enters |
| 4–8s | `hello` | "HELLO, I'M" + name + COMPUTER SCIENCE STUDENT, character waves |
| 8–12s | `about` | Glass "A LITTLE ABOUT ME" panel, laptop/books/coffee |
| 12–17s | `skills` | 10 skill cards with counting progress bars |
| 17–23s | `projects` | Project cards with 3D tilt highlights, character walks in |
| 23–27s | `education` | "MY LEARNING JOURNEY" timeline drawing itself |
| 27–32s | `creative` | Character coding, HTML/CSS windows, butterflies, **DREAM BIG** |
| 32–36s | `contact` | "LET'S CONNECT!" envelope opens and releases hearts |
| 36–40s | `outro` | "THANK YOU FOR VISITING!" + signature, fade to sparkles |

Play/pause, a scrubbable progress bar with chapter markers, replay and skip. 16:9 on desktop, a recomposed 9:16 layout on phones. Autoplays only when on screen; respects `prefers-reduced-motion`.
Timings live in `CHAPTERS`, the character's positions in `GIRL_POS` and her actions in `GIRL_ACTING`.

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

All text lives in **`src/data/portfolio.js`** — including the best friend's name for the signature (`dedication.for`), an optional real photo (`profile.photo`), the showreel content (`showreel`) — your name, email, university, social links, skills, projects, education and achievements. Change it there and every section updates.

The contact form validates input. With no setup it opens the visitor's email app addressed to `profile.email`. To receive messages straight in your inbox, create a free form at Formspree or Web3Forms and paste its URL into `contactForm.endpoint` (plus `accessKey` for Web3Forms).

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
