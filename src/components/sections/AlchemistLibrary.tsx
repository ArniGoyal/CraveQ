import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface PotionProps {
  color: string;
  name: string;
  compound: string;
  effect: string;
  delay: number;
}

const Potion = ({ color, name, compound, effect, delay }: PotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group cursor-pointer"
    >
      <div className="glass-dark p-6 rounded-sm border border-primary/20 hover:border-primary/50 transition-all duration-300">
        {/* Potion visual */}
        <div className="relative h-32 mb-4 flex items-end justify-center">
          {/* Flask */}
          <div className="relative">
            {/* Liquid */}
            <motion.div
              animate={{ 
                height: ["60%", "70%", "60%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 rounded-b-lg opacity-80"
              style={{ 
                background: `linear-gradient(to top, ${color}, transparent)`,
                height: '60%'
              }}
            />
            {/* Flask outline */}
            <svg className="w-16 h-24" viewBox="0 0 40 60">
              <path
                d="M15 5 L15 20 L5 50 Q5 55 10 55 L30 55 Q35 55 35 50 L25 20 L25 5 Z"
                fill="none"
                stroke="hsl(150, 30%, 30%)"
                strokeWidth="1"
              />
              <rect x="13" y="0" width="14" height="5" fill="none" stroke="hsl(150, 30%, 30%)" strokeWidth="1" />
            </svg>
            {/* Bubbles */}
            <motion.div
              animate={{ y: [0, -20], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="absolute bottom-8 left-5 w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <motion.div
              animate={{ y: [0, -25], opacity: [1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-6 left-7 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
          
          {/* Glow effect */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full opacity-30 blur-xl group-hover:opacity-50 transition-opacity"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Info */}
        <h3 className="grimoire-heading text-lg text-foreground mb-1">{name}</h3>
        <p className="data-text text-xs text-primary mb-2">{compound}</p>
        <p className="text-sm text-muted-foreground">{effect}</p>
      </div>
    </motion.div>
  );
};

const potions: Omit<PotionProps, 'delay'>[] = [
  {
    color: "#ff6b6b",
    name: "Capsaicin Elixir",
    compound: "C₁₈H₂₇NO₃",
    effect: "Triggers endorphin cascade & thermogenesis"
  },
  {
    color: "#4ecdc4",
    name: "Menthol Essence",
    compound: "C₁₀H₂₀O",
    effect: "TRPM8 receptor activation for cooling sensation"
  },
  {
    color: "#ffe66d",
    name: "Vanillin Tincture",
    compound: "C₈H₈O₃",
    effect: "Comfort compound linked to memory centers"
  },
  {
    color: "#95e1d3",
    name: "Limonene Spirit",
    compound: "C₁₀H₁₆",
    effect: "Citrus terpene for mood elevation"
  },
  {
    color: "#f38181",
    name: "Glutamate Extract",
    compound: "C₅H₉NO₄",
    effect: "Pure umami—the fifth taste dimension"
  },
  {
    color: "#a29bfe",
    name: "Theobromine Brew",
    compound: "C₇H₈N₄O₂",
    effect: "Gentle stimulant from cacao origins"
  },
];

export const AlchemistLibrary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-grimoire-charcoal via-background to-grimoire-charcoal" />
      
      {/* Shelf lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x }} className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], [0, 200]) }} className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div style={{ x }} className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="grimoire-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            The <span className="neon-text">Alchemist's</span> Library
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive database of flavor compounds, aroma profiles, 
            and molecular pairings. Each "potion" represents decades of flavor science research.
          </p>
        </motion.div>

        {/* Potions grid */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {potions.map((potion, i) => (
            <Potion key={i} {...potion} delay={i * 0.1} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 glass-dark p-8 rounded-sm neon-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,847", label: "FLAVOR COMPOUNDS" },
              { value: "15,420", label: "INGREDIENT PAIRINGS" },
              { value: "892", label: "AROMA PROFILES" },
              { value: "∞", label: "POSSIBILITIES" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="grimoire-heading text-3xl md:text-4xl neon-text mb-2">
                  {stat.value}
                </div>
                <div className="data-text text-[10px] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlchemistLibrary;
