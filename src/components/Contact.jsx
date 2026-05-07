import { motion, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useSpring(0, { damping: 20, stiffness: 100 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 25);
    mouseY.set((clientY - innerHeight / 2) / 25);
  };

  return (
    <section 
      id="contact" 
      onMouseMove={handleMouseMove}
      style={{ 
        padding: isMobile ? '8rem 5vw 6rem' : '20rem 5vw 12rem', 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      {/* Cinematic Glow Bloom Depth */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.08, 0.04]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', bottom: '-10%', left: '50%', x: '-50%',
          width: isMobile ? '140vw' : '80vw', height: isMobile ? '100vw' : '50vw',
          background: 'radial-gradient(circle, var(--accent-lavender) 0%, transparent 70%)',
          zIndex: 0, pointerEvents: 'none', filter: isMobile ? 'blur(60px)' : 'blur(120px)'
        }} 
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="section-tag" style={{ justifyContent: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>07 — Contact</span>
          <h2 className="heading-xl" style={{ marginBottom: isMobile ? '3rem' : '5rem' }}>
            Let's <span className="text-italic" style={{ color: 'var(--accent-lavender)' }}>connect.</span>
          </h2>

          <p style={{
            fontSize: isMobile ? '1.2rem' : '1.6rem',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: isMobile ? '0 auto 5rem' : '0 auto 8rem',
            lineHeight: 1.5,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            opacity: 0.8
          }}>
            I am always open to discussing new opportunities, research collaborations, or technical challenges.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '4rem' : '6rem', alignItems: 'center' }}>
            <motion.a 
              style={{ 
                x: isMobile ? 0 : mouseX, 
                y: isMobile ? 0 : mouseY,
                fontSize: isMobile ? '1.5rem' : 'clamp(1.8rem, 6vw, 5rem)',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(181, 164, 219, 0.2)',
                paddingBottom: '0.8rem',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                letterSpacing: '-0.01em',
                display: 'inline-block',
                wordBreak: 'break-all'
              }}
              whileHover={isMobile ? {} : { scale: 1.01, opacity: 0.8 }}
              href="mailto:nupurghangarekar@gmail.com" 
              className="magnetic-link"
            >
              nupurghangarekar@gmail.com
            </motion.a>

            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '2rem' : '5vw', 
              marginTop: isMobile ? '2rem' : '4rem', 
              flexWrap: 'wrap', 
              justifyContent: 'center' 
            }}>
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nupur-ghangarekar' },
                { name: 'GitHub', url: 'https://github.com/NupurGhangarekar' },
                { name: 'LeetCode', url: 'https://leetcode.com/u/Nupur_Ghangarekar/' },
                { name: 'Resume', url: 'https://drive.google.com/file/d/1K9xJG8R8VR8Jk_8RrGGeurQ6oYLtxXVN/view?usp=sharing' }
              ].map((platform, idx) => (
                <motion.a
                  key={platform.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 1.2 }}
                  whileHover={isMobile ? {} : { y: -4, color: 'var(--text-primary)' }}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'all 0.4s ease',
                    opacity: 0.5
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.5}
                >
                  {platform.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Watermark Footer Overlay */}
      {!isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 3 }}
          style={{
            position: 'absolute', bottom: '-4rem', left: '0', right: '0',
            textAlign: 'center', pointerEvents: 'none', zIndex: 0
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22vw', margin: 0, fontStyle: 'italic', whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>
            Nupur Ghangarekar
          </h2>
        </motion.div>
      )}
    </section>
  );
}
