import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const BOKEH_IMAGE = 'D:\\Codeforbeiu\\Bokeh.jpg';

function fireConfetti() {
  const colors = ['#e879a0', '#d4a843', '#f5b8ce', '#fef0f5', '#c084fc', '#818cf8'];

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.3, y: 0.65 },
    colors,
    startVelocity: 45,
    gravity: 0.9,
  });
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.7, y: 0.65 },
    colors,
    startVelocity: 45,
    gravity: 0.9,
  });
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors,
      shapes: ['circle'],
      scalar: 1.4,
    });
  }, 300);
}

export function ConfessionSection() {
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep isUnlocking to trigger the envelope opening animation
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Modified handleReveal to automatically transition to the letter after animation
  const handleReveal = () => {
    setIsUnlocking(true); // Triggers flap opening and letter sliding up
    
    // Wait for the envelope animation to finish (1.5s), then reveal full letter
    setTimeout(() => {
      setRevealed(true);
      setTimeout(fireConfetti, 400);
    }, 1500);
  };

  const handleYes = () => {
    setAnswered('yes');
    setTimeout(fireConfetti, 100);
    setTimeout(fireConfetti, 600);
    setTimeout(fireConfetti, 1200);
  };

  // Increased the random multiplier in handleNoHover to make the button jump further away from the cursor
  const handleNoHover = () => {
    setNoCount((c) => c + 1);
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  const noMessages = [
    'Không',
    'Thử lại đi 😅',
    'Nope! 🙅‍♀️',
    'Không đúng rồi 😄',
    'Sai rồi bạn ơi!',
    'Ý tui là... Có! 🥺',
    'Nhấn nút kia kìa!',
    'Đừng nhấn nút này nữa 😂',
    'Thật sự không?? 🤔',
    'Chắc chắn không? 🥺',
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0820 40%, #0a1220 80%, #0f0a1e 100%)' }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${BOKEH_IMAGE})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #0f0a1e 0%, rgba(15,10,30,0.5) 40%, rgba(15,10,30,0.5) 60%, #0f0a1e 100%)' }}
      />

      {/* Decorative circles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${i * 180 + 120}px`,
            height: `${i * 180 + 120}px`,
            border: `1px solid rgba(232,121,160,${0.08 / i})`,
          }}
          animate={{ scale: [1, 1 + i * 0.02, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <div ref={containerRef} className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Lato', sans-serif",
            color: '#d4a843',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
          className="mb-5"
        >
          ✦ Khoảnh Khắc Cuối Ngày ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#fef0f5',
            fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
            lineHeight: 1.2,
            fontWeight: 600,
          }}
          className="mb-6"
        >
          23:59 —<br />
          <em style={{ color: '#e879a0' }}>Điều Anh Muốn Nói</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, #e879a0)' }} />
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Heart size={22} fill="#e879a0" style={{ color: '#e879a0' }} />
          </motion.div>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, #e879a0)' }} />
        </motion.div>

        {/* The envelope / reveal card */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative flex flex-col items-center"
            >
              {/* Envelope card - Completely rewritten for bulletproof z-index layering */}
              <div className="relative w-80 h-56 mx-auto mb-10 mt-8" style={{ perspective: '1000px' }}>
                {/* Mặt sau của phong bì */}
                <div
                  className="absolute inset-0 rounded-b-xl rounded-t-sm shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #e879a0, #d65b85)', zIndex: 1 }}
                />

                {/* Bức thư (Lá thư bên trong trượt lên) */}
                <motion.div
                  initial={{ y: 0 }}
                  // Khi đang mở (isUnlocking = true) thì bức thư trượt lên
                  animate={{ y: isUnlocking ? -100 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: isUnlocking ? 0.3 : 0 }}
                  className="absolute inset-x-2 top-2 bottom-2 bg-white rounded-lg shadow-md p-5 flex flex-col items-center justify-center overflow-hidden"
                  style={{ zIndex: 10 }}
                >
                  <Heart size={32} fill="#e879a0" style={{ color: '#e879a0', marginBottom: '12px' }} />
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#d4a843',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    "Trong suốt hành trình ngày hôm nay,
                    <br />
                    có một điều anh muốn nói..."
                  </p>
                  <span
                    className="mt-4"
                    style={{ fontFamily: "'Lato', sans-serif", color: '#7a5a70', fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    ~ Dành riêng cho em ~
                  </span>
                </motion.div>

                {/* Mặt trước của phong bì (Được chia làm 3 tam giác ghép lại) */}
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
                  <div className="absolute inset-0" style={{ background: '#c2557e', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                  <div className="absolute inset-0" style={{ background: '#c2557e', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                  <div className="absolute inset-0" style={{ background: '#d65b85', clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                </div>

                {/* Nắp phong bì (Phần lật lên) */}
                <motion.div
                  initial={{ rotateX: 0, zIndex: 30 }}
                  animate={{ 
                    rotateX: isUnlocking ? 180 : 0,
                    zIndex: isUnlocking ? 5 : 30 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut",
                    zIndex: { delay: isUnlocking ? 0.2 : 0 }
                  }}
                  className="absolute top-0 left-0 right-0 h-1/2"
                  style={{ transformOrigin: "top" }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: isUnlocking ? '#d65b85' : '#e879a0',
                      clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                      boxShadow: isUnlocking ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                </motion.div>
              </div>

              {/* Removed password input, button simply fades out when clicked */}
              <div className="h-16 flex items-center justify-center">
                <AnimatePresence>
                  {!isUnlocking && (
                    <motion.button
                      key="reveal-button"
                      onClick={handleReveal}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="relative px-10 py-4 rounded-full overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #e879a0, #c2557e)',
                        boxShadow: '0 8px 30px rgba(232,121,160,0.4)',
                        fontFamily: "'Lato', sans-serif",
                        color: '#fff',
                        fontSize: '1rem',
                        letterSpacing: '0.05em',
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Sparkles size={18} />
                        Mở Lá Thư Của Anh
                        <Sparkles size={18} />
                      </span>
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)' }}
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Love letter */}
              <div
                className="rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden text-left"
                style={{
                  background: 'rgba(232,121,160,0.07)',
                  border: '1px solid rgba(232,121,160,0.3)',
                  backdropFilter: 'blur(24px)',
                  boxShadow: '0 20px 60px rgba(232,121,160,0.15), 0 0 0 1px rgba(255,255,255,0.04)',
                }}
              >
                {/* Glow top */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: 'linear-gradient(to right, transparent, #e879a0, #d4a843, transparent)' }}
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,121,160,0.3), transparent 60%)' }}
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart size={20} fill="#e879a0" style={{ color: '#e879a0' }} />
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#e8d4a8',
                        fontSize: '1.1rem',
                        fontStyle: 'italic',
                      }}
                    >
                      Chào em,
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#fef0f5',
                      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                      lineHeight: 2.1,
                      fontStyle: 'italic',
                    }}
                  >
                    Anh đã ngồi phân vân mãi không biết nên bắt đầu như thế nào, vì bao nhiêu vốn từ của anh dường như đều "bay" đâu mất mỗi khi nghĩ về em.
                    <br /><br />
                    Thú thật là, sau một thời gian chúng mình bên nhau, cùng đi ăn, cùng trò chuyện và chia sẻ bao nhiêu chuyện trên đời, anh nhận ra em đã dần trở thành một phần không thể thiếu trong cuộc sống hàng ngày của anh lúc nào không hay.
                    <br /><br />
                    Bây giờ, một ngày của anh không còn chỉ là đi làm rồi về nữa, mà là chờ đợi những tin nhắn của em, là nhớ về nụ cười của em và tự hỏi không biết hôm nay em có vui không. Có những điều nhỏ nhặt bình thường thôi, nhưng nếu là làm cùng em, anh đều cảm thấy nó trở nên đặc biệt lạ lùng.
                    <br /><br />
                    Anh thích cái cách mình ở bên nhau, tự nhiên và bình yên đến thế. Và anh không muốn mình chỉ dừng lại ở mức "tìm hiểu" như thế này nữa...
                  </p>

                  <div className="mt-8 text-center">
                    <span
                      style={{ fontFamily: "'Lato', sans-serif", color: '#e879a0', fontSize: '0.9rem', letterSpacing: '0.1em' }}
                    >
                      — Với tất cả tình cảm chân thành ❤️
                    </span>
                  </div>
                </div>
              </div>

              {/* THE QUESTION */}
              <AnimatePresence mode="wait">
                {answered === null ? (
                  <motion.div
                    key="question"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <motion.p
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#fef0f5',
                        fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
                        fontWeight: 500,
                        lineHeight: 1.6,
                        marginBottom: '28px',
                        textAlign: 'center',
                        padding: '0 10px'
                      }}
                    >
                      Anh lấy hết can đảm để hỏi em câu này: <br/> 
                      <span style={{ color: '#e879a0', fontWeight: 'bold' }}>Em làm người yêu anh nhaaaaa? 🥺</span>
                    </motion.p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <motion.button
                        onClick={handleYes}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 rounded-full text-white relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #e879a0, #c2557e)',
                          boxShadow: '0 8px 30px rgba(232,121,160,0.5)',
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '1.1rem',
                          fontWeight: 700,
                        }}
                      >
                        <motion.span
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)' }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="relative">💖 Có chứ!</span>
                      </motion.button>

                      <motion.button
                        onMouseEnter={handleNoHover}
                        onTouchStart={handleNoHover}
                        style={{
                          position: 'relative',
                          transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                          transition: 'transform 0.15s ease',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          color: '#7a5a70',
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '0.9rem',
                          padding: '12px 24px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                        }}
                      >
                        {noMessages[Math.min(noCount, noMessages.length - 1)]}
                      </motion.button>
                    </div>

                    {noCount > 3 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ color: '#7a5a70', fontFamily: "'Lato', sans-serif", fontSize: '0.75rem', marginTop: '12px', fontStyle: 'italic', textAlign: 'center' }}
                      >
                        (Nút kia đang né bạn đấy... 😂)
                      </motion.p>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="yes-response"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-center flex flex-col items-center justify-center relative"
                    style={{ minHeight: '300px' }}
                  >
                    {/* Glowing Particle Heart Effect */}
                    <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10"
                      >
                        <Heart size={120} fill="url(#sparkle-gradient)" stroke="none" />
                      </motion.div>

                      {/* SVG Gradient cho trái tim chính */}
                      <svg width="0" height="0">
                        <defs>
                          <radialGradient id="sparkle-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                            <stop offset="50%" stopColor="#ffb6c1" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ff1493" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                      </svg>

                      {/* Các hạt lấp lánh xung quanh */}
                      {[...Array(40)].map((_, i) => {
                        const angle = Math.random() * Math.PI * 2;
                        const radius = 60 + Math.random() * 40;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const delay = Math.random() * 2;
                        const duration = 1 + Math.random() * 2;
                        const size = 2 + Math.random() * 4;

                        return (
                          <div
                            key={i}
                            className="particle"
                            style={{
                              position: 'absolute',
                              left: `calc(50% + ${x}px)`,
                              top: `calc(50% + ${y}px)`,
                              width: `${size}px`,
                              height: `${size}px`,
                              animationDuration: `${duration}s`,
                              animationDelay: `${delay}s`,
                            }}
                          />
                        );
                      })}

                      {/* Vòng hào quang ở dưới đáy */}
                      <motion.div
                        className="absolute -bottom-4 w-32 h-8 rounded-[100%]"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(135,206,250,0.6) 0%, rgba(135,206,250,0) 70%)',
                          filter: 'blur(4px)',
                        }}
                        animate={{ opacity: [0.4, 0.8, 0.4], scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#e879a0',
                        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        marginBottom: '16px',
                        textShadow: '0 0 20px rgba(232,121,160,0.8)',
                      }}
                    >
                      Yeahhh có người yêu rồi 💖
                    </h3>
                    
                    <p
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        color: '#c9a0b8',
                        fontSize: '1rem',
                        lineHeight: 1.8,
                        fontStyle: 'italic',
                        maxWidth: '500px',
                        margin: '0 auto'
                      }}
                    >
                      Anh không dám hứa sẽ là một người yêu hoàn hảo nhất, nhưng anh hứa sẽ là người ở bên cạnh chăm sóc, lắng nghe và làm cho em cười mỗi ngày. 
                      <br /><br />
                      Anh rất mong được cùng em viết tiếp những chương thật ngọt ngào phía trước. 🌸✨
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}