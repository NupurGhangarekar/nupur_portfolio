import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  
  const ringSpringConfig = { damping: 20, stiffness: 100, mass: 1 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    // Refresh interactive elements on DOM changes
    const updateInteractives = () => {
      const interactives = document.querySelectorAll('a, button, [data-hover]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    updateInteractives();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Lavender Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          backgroundColor: 'var(--accent-lavender)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 15px var(--accent-lavender)',
          opacity: 0.8
        }}
      />

      {/* Trailing Ring with Bloom */}
      <motion.div
        animate={{
          scale: hovering ? 2.5 : 1,
          opacity: hovering ? 0.4 : 0.2,
          borderColor: hovering ? 'var(--accent-lavender)' : 'rgba(255, 255, 251, 0.3)'
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          border: '1px solid',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          translateX: '-50%',
          translateY: '-50%',
          background: hovering ? 'radial-gradient(circle, rgba(181, 164, 219, 0.1) 0%, transparent 70%)' : 'transparent',
          transition: 'border-color 0.3s ease, background 0.3s ease'
        }}
      />
      
      {/* Lavender Light Trail (Ambient) */}
      <motion.div
        animate={{
          x: ringX,
          y: ringY,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          left: 0, top: 0,
          width: 100, height: 100,
          background: 'radial-gradient(circle, rgba(181, 164, 219, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(20px)'
        }}
      />
    </>
  );
}
