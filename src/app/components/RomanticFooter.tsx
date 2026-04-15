import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function RomanticFooter() {
  return (
    <footer
      className="relative py-12 px-4 text-center overflow-hidden"
      style={{ background: '#0a0715', borderTop: '1px solid rgba(232,121,160,0.1)' }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(232,121,160,0.5), transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-4xl mb-4"
        >
          💝
        </motion.div>

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#c9a0b8',
            fontSize: '1rem',
            fontStyle: 'italic',
            lineHeight: 1.9,
          }}
          className="mb-4"
        >
          "Yêu không phải là nhìn nhau,
          <br />
          mà là cùng nhìn về một hướng."
        </p>

        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,67,0.5))' }} />
          <span style={{ color: '#d4a843', fontSize: '0.7rem', fontFamily: "'Lato', sans-serif", letterSpacing: '0.15em' }}>
            — Antoine de Saint-Exupéry
          </span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,67,0.5))' }} />
        </div>

        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            color: '#4a3555',
            fontSize: '0.75rem',
          }}
        >
          Được tạo ra với <Heart size={10} className="inline" fill="#e879a0" style={{ color: '#e879a0' }} /> và tất cả tình cảm chân thành
        </p>
      </motion.div>
    </footer>
  );
}
