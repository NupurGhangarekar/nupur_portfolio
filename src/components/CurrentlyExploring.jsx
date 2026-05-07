import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const explorations = [
  {
    title: 'Medical AI',
    desc: 'Developing intelligent diagnostic pipelines that can detect, segment, and characterize lung tumors from clinical-grade CT datasets with researcher-level precision.',
    icon: '◈',
    color: '#8b5cf6',
    tag: 'Journal Bound',
  },
  {
    title: 'Attention-Based CNNs',
    desc: 'Integrating attention mechanisms into convolutional architectures for adaptive feature selection in medical images — making models focus where it matters most.',
    icon: '◎',
    color: '#06b6d4',
    tag: 'In Progress',
  },
  {
    title: 'Workflow Automation',
    desc: 'Designing intelligent automation systems that sense context, adapt to behavior patterns, and reduce cognitive overhead — building tools that think alongside you.',
    icon: '◉',
    color: '#f59e0b',
    tag: 'Shipping',
  },
];

function ExploreCard({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.65, ease: 'easeOut' }}
    >
      <motion.div
        data-hover
        whileHover={{
          y: -8,
          borderColor: `${item.color}50`,
          boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${item.color}18`,
          background: `rgba(255,255,255,0.055)`,
        }}
        style={{
          padding: '1.75rem',
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.38s cubic-bezier(0.23,1,0.32,1)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 80, height: 80,
          background: `radial-gradient(circle at top right, ${item.color}18, transparent 70%)`,
          borderRadius: '0 1.25rem 0 0',
        }} />

        {/* Tag */}
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          fontSize: '0.65rem',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.1em',
          color: item.color,
          background: `${item.color}15`,
          border: `1px solid ${item.color}30`,
          padding: '0.2rem 0.6rem',
          borderRadius: 50,
          marginBottom: '1.25rem',
          width: 'fit-content',
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: item.color,
            boxShadow: `0 0 6px ${item.color}`,
          }} />
          {item.tag}
        </span>

        {/* Icon */}
        <div style={{
          fontSize: '1.75rem',
          color: item.color,
          marginBottom: '0.75rem',
          lineHeight: 1,
          filter: `drop-shadow(0 0 12px ${item.color}60)`,
        }}>{item.icon}</div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Clash Display, Satoshi, Space Grotesk, sans-serif',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#eef2f7',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}>{item.title}</h3>

        {/* Description */}
        <p style={{
          fontSize: '0.87rem',
          lineHeight: 1.75,
          color: 'rgba(238,242,247,0.55)',
          flex: 1,
        }}>{item.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function CurrentlyExploring() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="exploring" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 2 }}>
      {/* Background CT scan ring motif */}
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0, opacity: 0.06 }}>
        {[280, 210, 140, 70].map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: '1px solid #00d4ff',
            top: '50%', left: '50%',
            transform: `translate(-50%, -50%)`,
            animation: `ringRotate ${14 + i * 5}s linear infinite`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <span className="section-tag">08 — Currently Exploring</span>
          <h2 className="heading-lg" style={{ marginTop: '0.75rem' }}>
            The frontier I'm{' '}
            <span className="gradient-text">actively pushing</span>
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(238,242,247,0.45)',
            marginTop: '0.75rem',
            maxWidth: 520,
            lineHeight: 1.7,
          }}>
            Research threads, open questions, and emerging ideas that occupy my whiteboard — and my dreams.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {explorations.slice(0, 3).map((item, i) => (
            <ExploreCard key={item.title} item={item} index={i} />
          ))}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          marginTop: '1.25rem',
          maxWidth: 780,
        }}>
          {explorations.slice(3).map((item, i) => (
            <ExploreCard key={item.title} item={item} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
