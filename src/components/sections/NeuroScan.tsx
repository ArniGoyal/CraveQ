import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ScannerVisualization = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Scanner rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-4 border border-primary/30 rounded-full" />
        <div className="absolute inset-8 border border-primary/20 rounded-full" />
        <div className="absolute inset-12 border border-primary/40 rounded-full" />
      </motion.div>

      {/* Scanning line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-primary to-transparent origin-left" />
      </motion.div>

      {/* Center burger icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🍔
        </motion.div>
      </div>

      {/* Data points */}
      {[
        { label: "FAT RATIO", value: "34.2%", angle: 30 },
        { label: "UMAMI", value: "892μM", angle: 120 },
        { label: "VOLATILES", value: "47 CPDS", angle: 210 },
        { label: "REWARD", value: "HIGH", angle: 300 },
      ].map((point, i) => {
        const radians = (point.angle * Math.PI) / 180;
        const x = Math.cos(radians) * 45 + 50;
        const y = Math.sin(radians) * 45 + 50;
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="absolute text-center"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="glass-dark px-3 py-2 rounded-sm">
              <div className="data-text text-[10px] text-muted-foreground">{point.label}</div>
              <div className="data-text text-sm neon-text">{point.value}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const NeuroScan = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-grimoire-charcoal via-background to-grimoire-charcoal" />
      
      <motion.div style={{ y, opacity }} className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="grimoire-heading text-4xl md:text-5xl mb-6">
              The <span className="neon-text">Neuro-Palate</span> Scan
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Input any unhealthy craving. Our AI analyzes its chemical reward 
              profile—fat ratios, volatile aromas, and umami triggers—to understand 
              exactly why your brain is hooked.
            </p>
            
            {/* Features list */}
            <div className="space-y-4">
              {[
                "Volatile compound detection (47+ aromatics)",
                "Maillard reaction product mapping",
                "Neural reward pathway simulation",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <span className="w-6 h-6 flex items-center justify-center border border-primary/50 text-primary text-xs">
                    ⚡
                  </span>
                  <span className="data-text text-sm text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Scanner visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ScannerVisualization />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NeuroScan;
