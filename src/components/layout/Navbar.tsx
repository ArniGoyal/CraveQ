import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import craveqLogo from '@/assets/craveq-logo.png';
import { GrimoireButton } from '@/components/ui/GrimoireButton';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-dark py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={craveqLogo} 
              alt="CraveQ" 
              className="w-14 h-14 drop-shadow-[0_0_10px_hsl(150_100%_50%/0.4)]"
            />
            <span className="grimoire-heading text-xl hidden sm:block">CraveQ</span>
          </motion.div>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            {['Scan', 'Reconstruct', 'Library'].map((item, i) => (
              <motion.a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="data-text text-xs text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <GrimoireButton size="sm" variant="secondary">
            Launch App
          </GrimoireButton>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
