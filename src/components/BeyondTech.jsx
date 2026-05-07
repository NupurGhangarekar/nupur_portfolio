import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, useEffect } from 'react';

const dimensions = [
  { label: 'Debate & Oratory', desc: 'Refining logical reasoning and technical communication through competitive inter-collegiate debates.' },
  { label: 'Philosophy', desc: 'Exploring ethical frameworks and cognitive foundations that inform intelligent system design.' },
  { label: 'Technical Writing', desc: 'Translating complex research data into accessible technical narratives and documentation.' },
  { label: 'Product Strategy', desc: 'Analyzing how technical research can be structured into functional, user-centric software products.' },
  { label: 'Visual Design', desc: 'Developing a balanced aesthetic sense to enhance the clarity and impact of technical presentations.' }
];

export default function BeyondTech() {
  const containerRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], [-120, isMobile ? 40 : 120]);

  return (
    <section 
      id="beyond" 
      ref={containerRef}
      style={{ padding: isMobile ? '8rem 5vw' : '20rem 5vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* Cinematic Horizontal Parallax Text Overlay */}
      {!isMobile && (
        <motion.div 
          style={{
            position: 'absolute', bottom: '12%', left: '0', x: xParallax,
            fontFamily: 'var(--font-serif)', fontSize: '16vw', color: 'rgba(214, 207, 199, 0.015)',
            fontStyle: 'italic', zIndex: 0, pointerEvents: 'none', whiteSpace: 'nowrap'
          }}
        >
          Interests & Focus
        </motion.div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: isMobile ? 'left' : 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="section-tag" style={{ justifyContent: isMobile ? 'flex-start' : 'center', marginBottom: isMobile ? '2.5rem' : '4rem' }}>06 — Perspectives</span>
          <h2 className="heading-xl">Beyond <br /><span className="text-italic" style={{ color: 'var(--accent-beige)' }}>technology.</span></h2>
          <p style={{ 
            fontSize: isMobile ? '1.1rem' : '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '640px', 
            margin: isMobile ? '2.5rem 0 6rem' : '4rem auto 10rem',
            lineHeight: 1.8,
            fontFamily: 'var(--font-sans)',
            opacity: 0.8
          }}>
            I am driven by a curiosity that extends beyond code—exploring the intersections of communication, logic, and human-centric design.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: isMobile ? '3.5rem' : '6vw', 
          textAlign: 'left' 
        }}>
          {dimensions.map((dim, index) => (
            <motion.div
              key={dim.label}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.5, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
              style={{
                borderLeft: '1px solid var(--glass-border)',
                paddingLeft: isMobile ? '1.8rem' : '2.5rem',
                position: 'relative'
              }}
            >
              <motion.div 
                whileHover={isMobile ? {} : { scale: 1.5, backgroundColor: 'var(--accent-lavender)' }}
                style={{ 
                  position: 'absolute', left: '-5px', top: '0', 
                  width: '9px', height: '9px', borderRadius: '50%', 
                  backgroundColor: 'rgba(181, 164, 219, 0.3)',
                  boxShadow: '0 0 12px rgba(181, 164, 219, 0.2)',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
                }} 
              />

              <h3 className="heading-md" style={{ marginBottom: isMobile ? '1rem' : '1.8rem', fontSize: isMobile ? '1.5rem' : '1.7rem', color: 'var(--text-primary)', fontStyle: 'italic', letterSpacing: '-0.01em' }}>{dim.label}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, opacity: 0.8 }}>{dim.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : {}}
          transition={{ duration: 3, delay: 2 }}
          style={{ 
            marginTop: isMobile ? '8rem' : '15rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.6rem', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase',
            color: 'var(--accent-lavender)',
          }}
        >
          Continuous Learning & Exploration
        </motion.div>
      </div>
    </section>
  );
}
