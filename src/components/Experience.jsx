import { motion, useMotionValue } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const experiences = [
  {
    role: 'Research Intern',
    org: 'VESIT Research Division',
    period: 'January 2026 — Present',
    description: 'Working on volumetric CT scan analysis and voxel-based visualization. Developed entropy-guided slice selection algorithms to improve diagnostic efficiency in high-dimensional medical imaging datasets.',
    details: ['Volumetric Analysis', 'Ray Casting', '3D Interpolation', 'Entropy Selection']
  },
  {
    role: 'Software Developer Intern',
    org: 'Zemo',
    period: 'December 2025- January 2026',
    description: 'Developed an automated system for certificate generation and management. Implemented dynamic PDF workflows to streamline administrative processes and reduce manual overhead.',
    details: ['Automated Systems', 'PDF Generation', 'Workflow Optimization']
  }
];

function ExperienceCard({ exp, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        padding: '4.5rem 3.5rem',
        backgroundColor: 'rgba(255, 255, 251, 0.012)',
        border: '1px solid var(--glass-border)',
        borderRadius: '2px',
        overflow: 'hidden'
      }}
      whileHover={{ y: -10, borderColor: 'rgba(181, 164, 219, 0.25)' }}
    >
      {/* Subtle Radial Hover Highlight */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(181, 164, 219, 0.06) 0%, transparent 70%)`,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2.4rem', 
              marginBottom: '0.6rem', 
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}>
              {exp.role}
            </h3>
            <p style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.7rem', 
              color: 'var(--accent-lavender)', 
              letterSpacing: '0.25em', 
              textTransform: 'uppercase',
              opacity: 0.8
            }}>
              {exp.org}
            </p>
          </div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.7rem', 
            color: 'var(--text-secondary)', 
            opacity: 0.4,
            letterSpacing: '0.1em'
          }}>
            {exp.period}
          </span>
        </div>
        
        <p style={{ 
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-secondary)', 
          fontSize: '1.15rem', 
          lineHeight: 1.8, 
          marginBottom: '3.5rem', 
          opacity: 0.9,
          maxWidth: '520px'
        }}>
          {exp.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {exp.details.map((detail) => (
            <span 
              key={detail}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-primary)',
                backgroundColor: 'rgba(255, 255, 251, 0.02)',
                border: '1px solid rgba(255, 255, 251, 0.06)',
                borderRadius: '100px',
                opacity: 0.7,
                letterSpacing: '0.1em'
              }}
            >
              {detail}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="experience" style={{ padding: isMobile ? '8rem 5vw' : '18rem 5vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          style={{ marginBottom: isMobile ? '5rem' : '10rem' }}
        >
          <span className="section-tag">03 — Professional Experience</span>
          <h2 className="heading-xl">Applied <br /><span className="text-italic" style={{ color: 'var(--accent-lavender)' }}>expertise.</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(440px, 1fr))', gap: isMobile ? '2.5rem' : '4rem' }}>
          {experiences.map((exp, idx) => (
            <ExperienceCard key={exp.org} exp={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
