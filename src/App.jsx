import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ResearchExploration from './components/ResearchExploration';
import LeadershipCommunity from './components/LeadershipCommunity';
import BeyondTech from './components/BeyondTech';
import Contact from './components/Contact';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      
      {/* Cinematic Background Layers */}
      <div className="noise-texture" />
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      
      {/* Scroll Progress Indicator */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <CustomCursor />

      <AnimatePresence mode="wait">
        {loaded && (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Projects />
              <Experience />
              <ResearchExploration />
              <Skills />
              <LeadershipCommunity />
              <BeyondTech />
              <Contact />
            </main>

            <footer style={{ padding: '15rem 5vw 8rem', textAlign: 'center' }}>
              <div style={{ maxWidth: 1400, margin: '0 auto', borderTop: '1px solid var(--glass-border)', paddingTop: '8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.4 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                    © 2026 — Built with Intent
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
                    Mumbai, India
                  </p>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
