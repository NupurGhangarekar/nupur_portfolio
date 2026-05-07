import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const yParallax = useTransform(scrollY, [0, 800], [0, isMobile ? 50 : 250]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const scaleEffect = useTransform(scrollY, [0, 800], [1, isMobile ? 1.05 : 1.1]);

  const mouseX = useSpring(0, { damping: 20, stiffness: 100 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 100 });

  // Defining transforms at the top level to avoid hook rule violations
  const xMouseParallax = useTransform(mouseX, x => x * -1.2);
  const yMouseParallax = useTransform(mouseY, y => y * -1.2);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 30);
    mouseY.set((clientY - innerHeight / 2) / 30);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: isMobile ? '8rem' : '10rem',
        paddingBottom: isMobile ? '4rem' : '0',
      }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', 
        gap: isMobile ? '4rem' : '8rem', 
        alignItems: 'center', 
        width: '100%' 
      }}>
        
        <motion.div style={{ position: 'relative', zIndex: 10, x: isMobile ? 0 : mouseX, y: isMobile ? 0 : mouseY }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="section-tag"
            style={{ marginBottom: isMobile ? '2rem' : '3rem' }}
          >
            Software Engineer & Researcher
          </motion.div>
          
          <h1 className="heading-xl" style={{ marginBottom: isMobile ? '3rem' : '4rem' }}>
            Nupur <br />
            <motion.span 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-italic" 
              style={{ color: 'var(--accent-lavender)', display: 'inline-block' }}
            >
              Ghangarekar.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              color: 'var(--text-secondary)', 
              maxWidth: '540px', 
              lineHeight: 1.8, 
              marginBottom: isMobile ? '4rem' : '5rem',
              fontFamily: 'var(--font-sans)'
            }}
          >
            Developing intelligent systems at the intersection of computer vision and clinical diagnostic research. Focused on building software that translates complex data into clear, actionable insights.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            style={{ display: 'flex', gap: isMobile ? '2rem' : '3rem', alignItems: 'center' }}
          >
            <a href="#projects" className="btn-editorial">
              View Projects
            </a>
            <a 
              href="https://drive.google.com/file/d/1K9xJG8R8VR8Jk_8RrGGeurQ6oYLtxXVN/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                color: 'var(--text-primary)', 
                textDecoration: 'none',
                opacity: 0.6,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderBottom: '1px solid var(--accent-lavender)',
                paddingBottom: '4px',
                transition: 'opacity 0.4s ease'
              }}
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ 
            position: 'relative', 
            y: yParallax, 
            opacity: opacityFade,
            scale: scaleEffect,
            x: isMobile ? 0 : xMouseParallax,
            y: isMobile ? 0 : yMouseParallax,
            order: isMobile ? -1 : 1
          }}
        >
          <div style={{ position: 'relative', width: '100%' }}>
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                position: 'absolute', top: '-10%', right: '-10%', 
                width: '120%', height: '120%', 
                background: 'radial-gradient(circle, var(--accent-lavender) 0%, transparent 70%)',
                zIndex: 0, pointerEvents: 'none',
                filter: isMobile ? 'blur(50px)' : 'blur(80px)'
              }} 
            />
            
            <motion.div 
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="editorial-frame" 
              style={{ 
                aspectRatio: isMobile ? '4/5' : '3.5/5', 
                width: isMobile ? '100%' : '100%', 
                boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
                zIndex: 2, position: 'relative',
                borderRadius: '2px'
              }}
            >
              <motion.img 
                whileHover={isMobile ? {} : { scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                src="/NupurGhangarekar_JrTechnicalOfficer.jpg" 
                alt="Nupur Ghangarekar" 
                style={{ objectPosition: 'center 20%', width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(45deg, rgba(181, 164, 219, 0.04), transparent 60%)',
                pointerEvents: 'none', zIndex: 3
              }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isMobile ? 20 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              style={{
                position: 'absolute', 
                bottom: isMobile ? '-2rem' : '10%', 
                left: isMobile ? 'auto' : '-12%',
                right: isMobile ? '1rem' : 'auto',
                padding: isMobile ? '1.5rem 2rem' : '2.5rem',
                backgroundColor: 'rgba(8, 8, 8, 0.9)',
                backdropFilter: 'blur(30px)',
                border: '1px solid var(--glass-border)',
                zIndex: 5,
                borderRadius: '2px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}
            >
              <div style={{ width: '25px', height: '1px', background: 'var(--accent-lavender)', marginBottom: '0.8rem', opacity: 0.5 }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--accent-lavender)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.4rem' }}>Based in</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: isMobile ? '1.3rem' : '1.6rem', color: 'var(--text-primary)', fontStyle: 'italic', letterSpacing: '-0.01em' }}>Mumbai, India</h3>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
