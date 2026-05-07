import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const researchTopics = [
  {
    title: 'Volumetric CT Analysis',
    description: 'Developing 3D voxel-based processing pipelines to enhance tumor detection and diagnostic clarity within high-dimensional CT volumes.',
    tag: 'Computer Vision'
  },
  {
    title: 'Ray Casting & Visualization',
    description: 'Implementing efficient 3D reconstruction and ray casting techniques for ROI visualization in clinical research environments.',
    tag: 'Graphics & Simulation'
  },
  {
    title: 'Intelligent Slice Selection',
    description: 'Designing data reduction algorithms that prioritize high-entropy slices, optimizing computational performance without loss of clinical detail.',
    tag: 'Data Optimization'
  },
];

export default function ResearchExploration() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section 
      id="research" 
      ref={containerRef}
      style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden', padding: '20rem 5vw' }}
    >
      {/* Cinematic Horizontal Parallax Text Overlay */}
      <motion.div 
        style={{
          position: 'absolute', top: '8%', right: '0', x: xParallax,
          fontFamily: 'var(--font-serif)', fontSize: '15vw', color: 'rgba(181, 164, 219, 0.015)',
          fontStyle: 'italic', zIndex: 0, pointerEvents: 'none', whiteSpace: 'nowrap'
        }}
      >
        Research & Analysis
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '12rem', alignItems: 'start' }}>

          {/* Left: Sticky Header */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'sticky', top: '150px' }}
          >
            <span className="section-tag" style={{ marginBottom: '4rem' }}>04 — Research Focus</span>
            <h2 className="heading-lg" style={{ marginBottom: '4rem' }}>
              Specialized <br />
              <span className="text-italic" style={{ color: 'var(--accent-blue)' }}>technical </span> <br />
              analysis.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '400px', lineHeight: 1.8, opacity: 0.8 }}>
              Investigating the technical foundations of medical data processing, where advanced algorithms meet clinical diagnostic requirements.
            </p>
          </motion.div>

          {/* Right: Topic List */}
          <div>
            {researchTopics.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.25, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  padding: '5rem 0',
                  borderBottom: '1px solid var(--glass-border)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', marginBottom: '2.5rem' }}>
                   <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent-lavender)',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    opacity: 0.7
                  }}>
                    {item.tag}
                  </span>
                  <div style={{ width: '30px', height: '1px', background: 'var(--accent-lavender)', opacity: 0.2 }} />
                </div>
                
                <h3 className="heading-md" style={{ marginBottom: '2.5rem', fontStyle: 'italic', fontSize: '2.8rem' }}>{item.title}</h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.15rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  maxWidth: '520px',
                  opacity: 0.85
                }}>
                  {item.description}
                </p>

                <motion.div 
                  className="reveal-line"
                  style={{
                    position: 'absolute', bottom: '-1px', left: 0, width: '0%', height: '1px',
                    background: 'var(--accent-lavender)',
                    transition: 'width 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                  }}
                  whileInView={{ width: '100%' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
