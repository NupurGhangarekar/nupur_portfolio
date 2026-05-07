import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const skillCategories = [
  {
    name: 'Computer Vision',
    description: 'Specialized in high-dimensional medical data processing and volumetric visualization techniques.',
    skills: ['Volumetric Analysis', 'CT Scan Pipelines', 'Ray Casting', '3D Interpolation', 'OpenCV']
  },
  {
    name: 'Engineering & Cloud',
    description: 'Building scalable software systems with a strong foundation in cloud infrastructure and architecture.',
    skills: ['PyTorch', 'TensorFlow', 'React', 'Node.js', 'Vite', 'Cloud Computing', 'PDF Automation']
  },
  {
    name: 'Analysis & Security',
    description: 'Focusing on data integrity, forensic security, and behavioral predictive modeling.',
    skills: ['Data Wiping', 'Metadata Sanitization', 'Sentiment Analysis', 'Predictive Modeling', 'Behavioral Analytics']
  }
];

function SkillCategory({ category, index, isMobile }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 45);
    setRotateY(-(x - centerX) / 45);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.5, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
      style={{
        perspective: 1200,
        height: '100%'
      }}
    >
      <motion.div
        animate={isMobile ? {} : { rotateX, rotateY }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        style={{
          backgroundColor: 'rgba(255, 255, 251, 0.012)',
          padding: isMobile ? '3rem 2rem' : '4.5rem 3.5rem',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(30px)',
          borderRadius: '2px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transformStyle: 'preserve-3d',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={isMobile ? {} : { borderColor: 'rgba(181, 164, 219, 0.35)' }}
      >
        {/* Subtle Background Bloom */}
        <div style={{
          position: 'absolute', top: '-25%', left: '-25%', width: '150%', height: '150%',
          background: 'radial-gradient(circle, rgba(181, 164, 219, 0.04) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0
        }} />

        <div style={{ transform: isMobile ? 'none' : 'translateZ(50px)', position: 'relative', zIndex: 1 }}>
          <h3 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: isMobile ? '1.8rem' : '2.2rem', 
            marginBottom: '1.5rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            fontStyle: 'italic'
          }}>
            {category.name}
          </h3>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.95rem', 
            lineHeight: 1.7, 
            marginBottom: isMobile ? '2.5rem' : '3.5rem',
            fontFamily: 'var(--font-sans)',
            opacity: 0.85
          }}>
            {category.description}
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '0.6rem' : '1rem' }}>
            {category.skills.map((skill) => (
              <motion.div
                key={skill}
                whileHover={isMobile ? {} : { 
                  scale: 1.08,
                  backgroundColor: 'rgba(181, 164, 219, 0.12)',
                  borderColor: 'var(--accent-lavender)',
                  color: 'var(--text-primary)'
                }}
                style={{
                  padding: isMobile ? '0.5rem 1rem' : '0.7rem 1.4rem',
                  backgroundColor: 'rgba(255, 255, 251, 0.03)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-secondary)',
                  cursor: 'none',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="skills" style={{ padding: isMobile ? '8rem 5vw' : '20rem 5vw', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          style={{ marginBottom: isMobile ? '6rem' : '12rem', textAlign: 'center' }}
        >
          <span className="section-tag" style={{ justifyContent: 'center', marginBottom: isMobile ? '2rem' : '4rem' }}>Capabilities</span>
          <h2 className="heading-xl">Technical <span className="text-italic" style={{ color: 'var(--accent-lavender)' }}>foundations.</span></h2>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))', 
          gap: isMobile ? '2.5rem' : '5rem' 
        }}>
          {skillCategories.map((category, idx) => (
            <SkillCategory key={category.name} category={category} index={idx} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
