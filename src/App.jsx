import { MotionConfig } from 'framer-motion'
import { MoodProvider } from './context/MoodContext.jsx'
import { FloatingBackground, Loader, ScrollProgress, SparkleTrail } from './components/Ambient.jsx'
import Navbar from './components/Navbar.jsx'
import Showreel from './components/Showreel.jsx'
import Creative from './components/Creative.jsx'
import Outro from './components/Outro.jsx'
import Hero from './components/Hero.jsx'
import WordBand from './components/WordBand.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer, { BackToTop, Companion } from './components/Footer.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MoodProvider>
        <Loader />
        <ScrollProgress />
        <FloatingBackground />
        <SparkleTrail />
        <Navbar />
        <main>
          <Showreel />
          <Hero />
          <WordBand />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Achievements />
          <Creative />
          <Contact />
          <Outro />
        </main>
        <Footer />
        <Companion />
        <BackToTop />
      </MoodProvider>
    </MotionConfig>
  )
}
