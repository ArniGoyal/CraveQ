import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

const TransformationAnimation = () => {
  const [isTransformed, setIsTransformed] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Magic runes background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(150, 100%, 50%)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(150, 100%, 50%)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(150, 100%, 50%)" strokeWidth="0.5" />
          {/* Rune marks */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x1 = 100 + Math.cos(angle) * 70;
            const y1 = 100 + Math.sin(angle) * 70;
            const x2 = 100 + Math.cos(angle) * 90;
            const y2 = 100 + Math.sin(angle) * 90;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(150, 100%, 50%)" strokeWidth="0.5" />
            );
          })}
        </svg>
      </motion.div>

      {/* Transformation container */}
      <div 
        className="relative aspect-square flex items-center justify-center cursor-pointer"
        onClick={() => setIsTransformed(!isTransformed)}
        onMouseEnter={() => setIsTransformed(true)}
        onMouseLeave={() => setIsTransformed(false)}
      >
        {/* Glow effect */}
        <motion.div
          animate={{ 
            scale: isTransformed ? [1, 1.2, 1] : 1,
            opacity: isTransformed ? [0.3, 0.6, 0.3] : 0.2
          }}
          transition={{ duration: 1, repeat: isTransformed ? Infinity : 0 }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"
        />

        {/* Food icon */}
        <motion.div
          animate={{ 
            scale: isTransformed ? [1, 0.8, 1.1, 1] : 1,
            rotateY: isTransformed ? 180 : 0
          }}
          transition={{ duration: 0.6 }}
          className="text-8xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {isTransformed ? '🥗' : '🍔'}
        </motion.div>

        {/* Particle burst on transformation */}
        {isTransformed && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1.5],
                  opacity: [1, 0],
                  x: Math.cos((i / 8) * Math.PI * 2) * 100,
                  y: Math.sin((i / 8) * Math.PI * 2) * 100,
                }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="absolute w-4 h-4 bg-primary rounded-full"
              />
            ))}
          </>
        )}
      </div>

      {/* Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center data-text text-xs text-muted-foreground mt-8"
      >
        [ HOVER TO WITNESS THE TRANSFORMATION ]
      </motion.p>
    </div>
  );
};

export const Savorcery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-grimoire-charcoal via-background to-grimoire-charcoal" />
      
      {/* Decorative runes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-10 opacity-10"
      >
        <span className="text-8xl text-primary">☿</span>
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 right-10 opacity-10"
      >
        <span className="text-8xl text-primary">♃</span>
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <TransformationAnimation />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="grimoire-heading text-4xl md:text-5xl mb-6">
              <span className="neon-text">Savorcery</span> Reconstruction
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We forge a molecularly identical 
              'duplicate' using only nutrient-dense ingredients. Hack your brain's 
              reward system without the caloric cost.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { value: "99.2%", label: "FLAVOR MATCH" },
                { value: "-67%", label: "CALORIES" },
                { value: "+340%", label: "NUTRIENTS" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="grimoire-heading text-2xl md:text-3xl neon-text">
                    {stat.value}
                  </div>
                  <div className="data-text text-[10px] text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process steps */}
            <div className="space-y-3">
              {[
                "Compound isolation & mapping",
                "Healthy ingredient matching",
                "Flavor profile reconstruction",
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 flex items-center justify-center border border-primary/50 text-primary data-text text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="data-text text-sm text-foreground/80">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Savorcery;
