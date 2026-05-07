import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const works = [
  {
    id: 'helios',
    title: 'Helios',
    category: 'Computer Vision / Medical AI',
    description: 'A processing pipeline designed to optimize diagnostic workflows for CT volumes. Utilizes entropy-based selection and 3D reconstruction to prioritize high-value clinical data.',
    image: '/helios.png',
    accent: '#b5a4db',
    glow: 'rgba(181, 164, 219, 0.1)',
    style: 'lab'
  },
  {
    id: 'attention-os',
    title: 'Attention OS',
    category: 'Automation / Behavioral Tech',
    description: 'A focus-classification engine that leverages OpenCV and workflow automation. Analyzes behavioral indicators to align digital environments with cognitive states.',
    image: '/attention_os.png',
    accent: '#8ba8b8',
    glow: 'rgba(139, 168, 184, 0.1)',
    style: 'dashboard'
  },
  {
    id: 'opsium',
    title: 'Opsium ML',
    category: 'Predictive Modeling / IITM',
    description: 'Developed for the IIT Madras × FedEx challenge. Translated operational and behavioral metrics into stress prediction models with high precision.',
    image: '/opsium.png',
    accent: '#d6cfc7',
    glow: 'rgba(214, 207, 199, 0.1)',
    style: 'analytical'
  },
  {
    id: 'secure-wiping',
    title: 'Data Security',
    category: 'Cybersecurity / Forensic Tool',
    description: 'An irreversible data destruction utility. Features multi-pass overwrite protocols and metadata sanitization to ensure complete digital forensics protection.',
    image: '/secure_wiping_mockup.png',
    accent: '#b5a4db',
    glow: 'rgba(181, 164, 219, 0.1)',
    style: 'forensic'
  },
];

function WorkItem({ work, index }) {
  const containerRef = useRef(null);
  const [inViewRef, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageReveal = useTransform(scrollYProgress, [0, 0.3], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        inViewRef(el);
      }}
      style={{
        marginBottom: '30rem',
        display: 'grid',
        gridTemplateColumns: isEven ? '1.2fr 1fr' : '1fr 1.2fr',
        gap: '10vw',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Subtle Atmosphere Background Glow */}
      <motion.div 
        style={{
          position: 'absolute',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${work.glow} 0%, transparent 70%)`,
          left: isEven ? '-15%' : 'auto',
          right: isEven ? 'auto' : '-15%',
          top: '-5%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: glowOpacity,
          filter: 'blur(100px)'
        }} 
      />

      <motion.div
        style={{ 
          order: isEven ? 1 : 2, 
          position: 'relative', 
          zIndex: 2, 
          y: yParallax 
        }}
      >
        <motion.div 
          className="editorial-frame" 
          style={{ 
            aspectRatio: '16/11', 
            boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            overflow: 'hidden',
            borderRadius: '2px',
            clipPath: imageReveal
          }}
        >
          {work.style === 'lab' && (
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(181, 164, 219, 0.02) 1px, transparent 1px)',
              backgroundSize: '100% 6px',
              zIndex: 3, pointerEvents: 'none', opacity: 0.4
            }} />
          )}
          
          <motion.img 
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            src={work.image} 
            alt={work.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, transparent 40%, rgba(8, 8, 8, 0.3) 100%)',
            pointerEvents: 'none', zIndex: 4
          }} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        style={{ order: isEven ? 2 : 1, position: 'relative', zIndex: 3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: work.accent,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.7
          }}>
            {work.category}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }} />
        </div>
        
        <h3 className="heading-md" style={{ marginBottom: '2.5rem', fontStyle: 'italic', fontSize: '3.5rem' }}>
          {work.title}
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.2rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.8,
          marginBottom: '5rem',
          maxWidth: '460px'
        }}>
          {work.description}
        </p>
        
        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="https://github.com/NupurGhangarekar" 
          target="_blank"
          rel="noopener noreferrer"
          className="btn-editorial"
        >
          Project Details
        </motion.a>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          style={{ marginBottom: '18rem', textAlign: 'center' }}
        >
          <span className="section-tag" style={{ justifyContent: 'center', marginBottom: '4rem' }}>02 — Selected Work</span>
          <h2 className="heading-xl">Strategic <br /><span className="text-italic" style={{ color: 'var(--accent-lavender)' }}>development.</span></h2>
        </motion.div>

        {works.map((work, i) => (
          <WorkItem key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}
