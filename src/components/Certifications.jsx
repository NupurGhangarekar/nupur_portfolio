import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certifications = [
  { title: 'AWS Cloud Foundations', issuer: 'Amazon Web Services', type: 'cert', color: '#f59e0b' },
  { title: 'Google Project Management', issuer: 'Google', type: 'cert', color: '#4285f4' },
  { title: 'Meta JavaScript Developer', issuer: 'Meta', type: 'cert', color: '#0668E1' },
  { title: 'IBM Data Analyst (ongoing)', issuer: 'IBM', type: 'cert', color: '#1F70C1' },
];

const achievements = [
  { title: 'Runner-up', event: 'IIT Madras Opsium', detail: 'ML Operations Challenge', color: '#00d4ff', icon: '🥈' },
  { title: 'Semi-finalist', event: 'JPMC Code for Good', detail: 'Hackathon', color: '#8b5cf6', icon: '⚡' },
  { title: 'Debate Champion', event: 'Multiple Events', detail: 'Public Speaking and Debating ', color: '#f59e0b', icon: '🎤' },
];

// Marquee items — doubled for seamless loop
const marqueeItems = [...certifications, ...certifications];

export default function Certifications() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="certifications" style={{ padding: '8rem 0', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-tag">06 — Certifications & Achievements</span>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginTop: '0.75rem',
            letterSpacing: '-0.03em',
            color: '#f0f4f8',
          }}>
            Recognition &{' '}
            <span className="gradient-text">credentials</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee certifications */}
      <div style={{
        position: 'relative',
        marginBottom: '4rem',
        maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)',
      }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '1.5rem', width: 'max-content' }}>
          {marqueeItems.map((cert, i) => (
            <div
              key={i}
              data-hover
              style={{
                padding: '1.25rem 1.75rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexShrink: 0,
                minWidth: 260,
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: `${cert.color}20`,
                border: `1px solid ${cert.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: cert.color, fontFamily: 'JetBrains Mono' }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0f4f8', lineHeight: 1.3 }}>{cert.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(240,244,248,0.45)', marginTop: '0.15rem' }}>{cert.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 600,
          color: 'rgba(240,244,248,0.5)',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em',
        }}>Notable Achievements</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.event}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
              data-hover
              whileHover={{
                y: -6,
                borderColor: `${ach.color}40`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 25px ${ach.color}20`,
              }}
              style={{
                padding: '1.75rem',
                borderRadius: '1.25rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{ach.icon}</div>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: ach.color,
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: '0.3rem',
              }}>{ach.title}</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f0f4f8', marginBottom: '0.25rem' }}>{ach.event}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(240,244,248,0.45)' }}>{ach.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
