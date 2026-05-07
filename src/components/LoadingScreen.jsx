import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setLoading(false);
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            backgroundColor: 'var(--bg-primary)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Glow */}
          <motion.div 
            animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: '60vw', height: '60vw',
              background: 'radial-gradient(circle, var(--accent-lavender) 0%, transparent 70%)',
              filter: 'blur(100px)',
              zIndex: 0
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.h1 
              variants={textVariants}
              animate="animate"
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem', 
                fontStyle: 'italic',
                marginBottom: '3rem', 
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em'
              }}
            >
              Nupur Ghangarekar
            </motion.h1>

            <div style={{ width: '280px', height: '1px', backgroundColor: 'rgba(255, 255, 251, 0.05)', position: 'relative', margin: '0 auto' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  backgroundColor: 'var(--accent-lavender)',
                  boxShadow: '0 0 15px var(--accent-lavender)'
                }}
              />
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ 
                marginTop: '2rem', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--text-secondary)', 
                letterSpacing: '0.4em',
                textTransform: 'uppercase'
              }}
            >
              Constructing Narrative {progress}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
