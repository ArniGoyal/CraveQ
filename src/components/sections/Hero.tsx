import { motion } from 'framer-motion';
import { HeroScene } from '@/components/3d/HeroScene';
import { GrimoireButton } from '@/components/ui/GrimoireButton';
import craveqLogo from '@/assets/craveq-logo.png';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-grimoire-charcoal" />
      
      {/* Radial glow */}
      <div className="absolute inset-0 gradient-radial-glow opacity-50" />
      
      {/* 3D Scene */}
      <HeroScene />
      
      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img 
              src={craveqLogo} 
              alt="CraveQ Logo" 
              className="w-64 h-64 mx-auto drop-shadow-[0_0_30px_hsl(150_100%_50%/0.5)]"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grimoire-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          >
            <span className="text-foreground">CraveQ: </span>
            <span className="neon-text">The Molecular Ghost</span>
            <br />
            <span className="text-foreground">of Your Greatest Cravings</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="data-text text-sm md:text-base text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Molecular gastronomy meets neural hacking. Transform your cravings
            into nutrient-dense alternatives through flavor compound alchemy.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <GrimoireButton size="lg" className="animate-glow-pulse">
              <span className="mr-2">⚗</span>
              Decode My Craving
            </GrimoireButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="data-text text-xs text-muted-foreground">Scroll to discover</span>
              <div className="w-6 h-10 border border-primary/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
