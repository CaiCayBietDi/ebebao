import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  char: string;
  drift: number;
}

export function FloatingPetals() {
  const petals = useMemo<Petal[]>(() => {
    const chars = ['🌸', '✨', '💖', '🌺', '💫', '🌷', '⭐', '🌹', '💕', '🎀'];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: (i / 18) * 100 + Math.sin(i) * 3,
      size: 10 + (i % 5) * 3,
      delay: (i * 1.3) % 12,
      duration: 14 + (i % 7) * 2,
      char: chars[i % chars.length],
      drift: (i % 3 === 0 ? 40 : i % 3 === 1 ? -40 : 20),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute select-none"
          style={{
            left: `${petal.x}%`,
            fontSize: `${petal.size}px`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '112vh'],
            x: [0, petal.drift, petal.drift / 2, petal.drift * 0.8],
            rotate: [0, 180, 360],
            opacity: [0, 0.7, 0.7, 0.2, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.3, 0.7, 0.9, 1],
          }}
        >
          {petal.char}
        </motion.span>
      ))}
    </div>
  );
}
