import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function About() {
  const containerRef = useRef(null);
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

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -50 : -120]);
  const opacityEffect = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{ 
        padding: isMobile ? '8rem 5vw' : '20rem 5vw', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Editorial Decorative Element */}
      {!isMobile && (
        <motion.div 
          style={{
            position: 'absolute', top: '15%', right: '5%',
            fontFamily: 'var(--font-serif)', fontSize: '18vw',
            color: 'rgba(255, 255, 251, 0.02)',
            fontStyle: 'italic', pointerEvents: 'none', zIndex: 0,
            y: yParallax
          }}
        >
          Background
        </motion.div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', 
          gap: isMobile ? '4rem' : '12rem', 
          alignItems: 'start' 
        }}>

          {/* Left: Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-tag" style={{ marginBottom: isMobile ? '2.5rem' : '4rem' }}>01 — Professional Profile</span>
            <h2 className="heading-lg" style={{ lineHeight: 0.9 }}>
              Bridging code <br />
              <motion.span 
                style={{ color: 'var(--accent-lavender)' }}
                className="text-italic"
              >
                and clinical 
              </motion.span> <br />
              research.
            </h2>
          </motion.div>

          {/* Right: Grounded Content */}
          <motion.div
            style={{ opacity: isMobile ? 1 : opacityEffect }}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: isMobile ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <p style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: isMobile ? '1.8rem' : '2.4rem', 
              color: 'var(--text-primary)', 
              lineHeight: 1.3, 
              marginBottom: isMobile ? '3rem' : '5rem',
              letterSpacing: '-0.01em',
              fontStyle: 'italic'
            }}>
              "I build technical solutions that respect the complexity of human data while delivering precise, scalable results."
            </p>

            <div style={{ 
              fontFamily: 'var(--font-sans)', 
              color: 'var(--text-secondary)', 
              fontSize: isMobile ? '1.1rem' : '1.2rem', 
              lineHeight: 1.8 
            }}>
              <p style={{ marginBottom: isMobile ? '2rem' : '3rem' }}>
                I am a final-year Information Technology student at VESIT with a minor in Cloud Computing. My work is focused on the intersection of computer vision and clinical observation, particularly in the processing of high-dimensional medical imaging data.
              </p>

              <p style={{ marginBottom: isMobile ? '4rem' : '6rem', opacity: 0.8 }}>
                With a consistent academic record of <span style={{ color: 'var(--accent-lavender)' }}>9.5 CGPA</span>, I have applied my technical foundation to research internships where I developed algorithms for volumetric analysis and intelligent data selection. My goal is to develop software that makes complex medical data more accessible and actionable.
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
                gap: isMobile ? '3rem' : '6rem' 
              }}>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Education</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, opacity: 0.8 }}>
                    B.E. Information Technology <br /> Cloud Computing Minor
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem' }}>Achievements</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, opacity: 0.8 }}>
                    IITM Opsium Runner-up <br /> Shaastra IITM Finalist
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
