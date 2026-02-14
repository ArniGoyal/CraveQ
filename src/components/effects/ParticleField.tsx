import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
}

export const ParticleField = ({ count = 30 }: ParticleFieldProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      size: 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${particle.left}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          initial={{ y: '110vh' }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
