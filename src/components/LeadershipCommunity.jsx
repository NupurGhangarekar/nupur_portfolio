import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const impact = [
  {
    role: 'Student Head',
    organization: 'VESLit Literary Circle',
    description: 'Directing literary initiatives and coordinating inter-collegiate contingents. Led the team to a runner-up position at Arthanomics 2025, one of Mumbais largest student-led economics fests.',
  },
  {
    role: 'Sr. Public Relations Officer',
    organization: 'Quest IT VESIT',
    description: 'Managing technical community outreach and communication strategy for department-wide technical events and workshops.',
  },
  {
    role: 'Jr. Public Relations Officer',
    organization: 'ISTE',
    description: 'Coordinating student-led technical workshops and promoting engineering literacy through collaborative learning environments.',
  }
];

export default function LeadershipCommunity() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="leadership" style={{ padding: isMobile ? '8rem 5vw' : '18rem 5vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          style={{ marginBottom: isMobile ? '5rem' : '10rem' }}
        >
          <span className="section-tag" style={{ marginBottom: isMobile ? '2rem' : '4rem' }}>05 — Leadership & Community</span>
          <h2 className="heading-xl">Collaborative <br /><span className="text-italic" style={{ color: 'var(--accent-lavender)' }}>engagement.</span></h2>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: isMobile ? '2.5rem' : '4rem' 
        }}>
          {impact.map((item, index) => (
            <motion.div
              key={item.role}
              ref={ref}
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1.5, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
              whileHover={isMobile ? {} : { y: -8, borderColor: 'rgba(181, 164, 219, 0.25)' }}
              style={{
                padding: isMobile ? '3rem 2rem' : '4rem 3rem',
                backgroundColor: 'rgba(255, 255, 251, 0.012)',
                border: '1px solid var(--glass-border)',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: isMobile ? '0' : '3px', height: '0%',
                background: 'var(--accent-lavender)',
                transition: 'height 0.5s ease'
              }} className="card-indicator" />
              
              <style>{`
                div:hover > .card-indicator { height: 100%; }
              `}</style>

              <h4 style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--accent-lavender)',
                letterSpacing: '0.2em',
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                opacity: 0.7
              }}>
                {item.organization}
              </h4>
              <h3 className="heading-md" style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', fontStyle: 'italic', letterSpacing: '-0.01em', fontSize: isMobile ? '1.8rem' : '2.2rem' }}>{item.role}</h3>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                flex: 1,
                opacity: 0.9
              }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
