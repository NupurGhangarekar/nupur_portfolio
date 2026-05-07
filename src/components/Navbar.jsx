import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 1.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '1.5rem 3rem' : '3rem 3rem',
        transition: 'padding 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 3rem',
        borderRadius: '100px',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.4)' : 'transparent',
        backdropFilter: scrolled ? 'blur(30px)' : 'none',
        border: scrolled ? '1px solid rgba(255, 255, 251, 0.05)' : '1px solid transparent',
        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      }}>
        {/* Logo */}
        <a href="#hero" style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.8rem', 
          color: 'var(--text-primary)',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          fontStyle: 'italic'
        }}>
          N.G
        </a>

        {/* Links */}
        <div style={{ display: 'flex', gap: '3.5rem' }}>
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              whileHover={{ scale: 1.1, color: 'var(--accent-lavender)' }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                opacity: 0.5,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition: 'opacity 0.4s ease, color 0.4s ease',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.5'}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Action Button */}
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#contact" 
          className="btn-editorial" 
          style={{ 
            padding: '0.7rem 2rem', 
            fontSize: '0.7rem',
            borderRadius: '100px',
            border: '1px solid var(--accent-lavender)',
            color: 'var(--accent-lavender)'
          }}
        >
          Initiate
        </motion.a>
      </div>
    </motion.nav>
  );
}
