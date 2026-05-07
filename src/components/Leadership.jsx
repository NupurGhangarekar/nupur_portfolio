import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const leadership = [
  {
    role: 'Student Head',
    org: 'VESLit',
    color: '#00d4ff',
    description: 'Led the technical literary club, organizing workshops, seminars, and knowledge-sharing events. Managed a team of 20+ members, drove student engagement and cross-disciplinary collaboration.',
    highlights: ['Workshop Design', 'Team Leadership', 'Event Strategy', 'Student Engagement'],
    icon: '◈',
  },
  {
    role: 'Sr. Public Relations Officer',
    org: 'QuestIT',
    color: '#8b5cf6',
    description: 'Managed external communications and outreach for QuestIT, VESIT\'s premier technical fest. Handled media relations, sponsor communication, and built the public-facing identity of the event.',
    highlights: ['Public Speaking', 'Brand Communications', 'Sponsorship Outreach', 'Media Management'],
    icon: '◉',
  },
  {
    role: 'Jr. Public Relations Officer',
    org: 'ISTE VESIT',
    color: '#f59e0b',
    description: 'Coordinated communications for the Indian Society for Technical Education chapter, supporting event promotion, student outreach, and cross-institution knowledge exchange programs.',
    highlights: ['Event Promotion', 'Cross-Institution', 'Communication', 'Outreach Programs'],
    icon: '◎',
  },
];

function LeadershipCard({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: 'easeOut' }}
      className="float-delay"
      style={{ animationDelay: `${index * 0.8}s` }}
    >
      <motion.div
        data-hover
        whileHover={{
          y: -10,
          boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 40px ${item.color}20`,
          borderColor: `${item.color}40`,
        }}
        style={{
          padding: '2rem',
          borderRadius: '1.5rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: -40, right: -40,
          width: 160, height: 160,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${item.color}15, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          fontSize: '2rem',
          color: item.color,
          marginBottom: '1.25rem',
          textShadow: `0 0 20px ${item.color}60`,
        }}>{item.icon}</div>

        {/* Role */}
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#f0f4f8',
          letterSpacing: '-0.02em',
          marginBottom: '0.25rem',
        }}>{item.role}</h3>
        <p style={{
          color: item.color,
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '1rem',
          fontFamily: 'JetBrains Mono, monospace',
        }}>{item.org}</p>

        {/* Description */}
        <p style={{
          fontSize: '0.88rem',
          lineHeight: 1.75,
          color: 'rgba(240,244,248,0.6)',
          marginBottom: '1.5rem',
          flex: 1,
        }}>{item.description}</p>

        {/* Highlights */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {item.highlights.map(h => (
            <span key={h} style={{
              padding: '0.25rem 0.7rem',
              borderRadius: 50,
              fontSize: '0.7rem',
              fontWeight: 500,
              background: `${item.color}12`,
              border: `1px solid ${item.color}25`,
              color: `${item.color}`,
              letterSpacing: '0.02em',
            }}>{h}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Leadership() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="leadership" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 2 }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%', height: 400,
        background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-tag">04 — Leadership</span>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginTop: '0.75rem',
            letterSpacing: '-0.03em',
            color: '#f0f4f8',
          }}>
            Communities I've{' '}
            <span className="gradient-text">shaped & led</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(240,244,248,0.45)',
            marginTop: '0.75rem',
            maxWidth: 500,
          }}>
            Technical excellence multiplied through community building, communication, and collective growth.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {leadership.map((item, i) => (
            <LeadershipCard key={item.org} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
