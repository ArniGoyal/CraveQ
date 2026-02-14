import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import craveqLogo from '@/assets/craveq-logo.png';

const LiveCounter = () => {
  const [count, setCount] = useState(847293);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-dark px-6 py-4 rounded-sm neon-border inline-block"
    >
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-3 h-3 bg-primary rounded-full"
        />
        <div>
          <div className="data-text text-xs text-muted-foreground">CRAVINGS DECODED</div>
          <div className="grimoire-heading text-2xl neon-text">
            {count.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Footer = () => {
  const links = [
    { label: "Documentation", href: "#" },
    { label: "API Access", href: "#" },
    { label: "Research Papers", href: "#" },
    { label: "Community", href: "#" },
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-grimoire-dark" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        {/* Live counter */}
        <div className="flex justify-center mb-16">
          <LiveCounter />
        </div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <img 
              src={craveqLogo} 
              alt="CraveQ" 
              className="w-16 h-16 drop-shadow-[0_0_15px_hsl(150_100%_50%/0.4)]"
            />
            <span className="grimoire-heading text-2xl">CraveQ</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-8">
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                className="data-text text-sm text-muted-foreground hover:text-primary transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="data-text text-xs text-muted-foreground">
            © 2025 CRAVEQ MOLECULAR GASTRONOMY SYSTEMS
          </p>
          <div className="flex items-center gap-6">
            <span className="data-text text-xs text-muted-foreground">
              POWERED BY FLAVORDB + RECIPEDB
            </span>
            <div className="flex gap-2">
              {['⚗', '🧬', '🔬'].map((icon, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-lg cursor-pointer"
                >
                  {icon}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
