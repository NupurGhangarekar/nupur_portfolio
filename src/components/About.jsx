import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityEffect = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      style={{ padding: '20rem 5vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* Editorial Decorative Element */}
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

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12rem', alignItems: 'start' }}>

          {/* Left: Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="section-tag" style={{ marginBottom: '4rem' }}>01 — Professional Profile</span>
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
            style={{ opacity: opacityEffect }}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <p style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem', 
              color: 'var(--text-primary)', 
              lineHeight: 1.3, 
              marginBottom: '5rem',
              letterSpacing: '-0.01em',
              fontStyle: 'italic'
            }}>
              "I build technical solutions that respect the complexity of human data while delivering precise, scalable results."
            </p>

            <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.9 }}>
              <p style={{ marginBottom: '3rem' }}>
                I am a final-year Information Technology student at VESIT with a minor in Cloud Computing. My work is focused on the intersection of computer vision and clinical observation, particularly in the processing of high-dimensional medical imaging data.
              </p>

              <p style={{ marginBottom: '6rem', opacity: 0.8 }}>
                With a consistent academic record of <span style={{ color: 'var(--accent-lavender)' }}>9.5 CGPA</span>, I have applied my technical foundation to research internships where I developed algorithms for volumetric analysis and intelligent data selection. My goal is to develop software that makes complex medical data more accessible and actionable.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1.2rem' }}>Education</h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, opacity: 0.8 }}>
                    B.E. Information Technology <br /> Cloud Computing Minor
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2.5rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1.2rem' }}>Achievements</h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, opacity: 0.8 }}>
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
