import { motion } from 'motion/react';
import { ChevronDown, Heart } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1755884684514-d7a3d90cabc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0d2e 40%, #0d1525 70%, #0f0a1e 100%)' }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      />
      {/* Gradient overlay bottom */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(15,10,30,0.2) 0%, rgba(15,10,30,0.5) 60%, #0f0a1e 100%)' }} />

      {/* Decorative rings */}
      <motion.div
        className="absolute rounded-full border"
        style={{ width: '40vw', height: '40vw', maxWidth: 500, maxHeight: 500, borderColor: 'rgba(232,121,160,0.08)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{ width: '60vw', height: '60vw', maxWidth: 700, maxHeight: 700, borderColor: 'rgba(212,168,67,0.05)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Main content */}
      <div className="relative text-center px-6 max-w-3xl mx-auto" style={{ zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-6xl mb-6"
        >
          💝
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            letterSpacing: '0.35em',
            color: '#d4a843',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
          }}
          className="mb-4"
        >
          ✦ Một Ngày Thật Đặc Biệt ✦
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 9vw, 5.5rem)',
            color: '#fef0f5',
            lineHeight: 1.15,
            fontWeight: 600,
          }}
          className="mb-6"
        >
          Hành Trình
          <br />
          <em style={{ color: '#e879a0' }}>Của Chúng Ta</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex items-center gap-4 justify-center mb-6"
        >
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #d4a843)' }} />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={20} fill="#e879a0" style={{ color: '#e879a0' }} />
          </motion.div>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #d4a843)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            color: '#c9a0b8',
            fontSize: '1.05rem',
            lineHeight: 1.9,
            fontStyle: 'italic',
          }}
        >
          Mỗi khoảnh khắc bên em đều là một trang ký ức đẹp nhất
          <br className="hidden sm:block" />
          {' '}mà anh sẽ giữ mãi trong tim...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <span
            className="px-4 py-2 rounded-full border text-sm"
            style={{
              borderColor: 'rgba(212,168,67,0.4)',
              color: '#d4a843',
              fontFamily: "'Lato', sans-serif",
              background: 'rgba(212,168,67,0.07)',
            }}
          >
            📅 16/04/2026
          </span>
          <span
            className="px-4 py-2 rounded-full border text-sm"
            style={{
              borderColor: 'rgba(232,121,160,0.4)',
              color: '#e879a0',
              fontFamily: "'Lato', sans-serif",
              background: 'rgba(232,121,160,0.07)',
            }}
          >
            ✨ Thành phố Hồ Chí Minh 
          </span>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        style={{ zIndex: 2 }}
      >
        <span style={{ color: '#7a5a70', fontFamily: "'Lato', sans-serif", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          Khám phá
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ color: '#e879a0' }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </motion.div>
    </section>
  );
}
