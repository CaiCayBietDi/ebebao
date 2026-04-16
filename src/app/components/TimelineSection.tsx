// TimelineSection.tsx
import { motion } from 'motion/react';
import { TimelineCard, TimelineEventData } from './TimelineCard';

// Removed 'question' properties from all events to simplify the timeline data
// Lược trích mảng EVENTS trong TimelineSection.tsx
const EVENTS: TimelineEventData[] = [
  {
    id: 1,
    time: '03/03/2026',
    icon: '🌸',
    title: 'First date',
    description:
      'Buổi đầu tiên anh rủ em với tâm thế là mình phải chuẩn bị mọi thứ chỉnh chu như một buổi date thực thụ, cũng muốn gây ấn tượng với en',
    defaultNote: 'Nhấn ✏️ để ghi lại cảm xúc của bạn khi dạo bộ cùng nhau...',
    defaultImage: '/img/first.jpg', // Sửa ở đây
    accentColor: '#a78bfa',
  },
  {
    id: 2,
    time: '14/03/2026',
    icon: '🌹',
    title: 'Ngỏ ý tìm hiểu',
    description:
      'Đợt này sau đợt 8/3 khi mà anh đã xác định thật sự nghiêm túc và muốn tìm hiểu em hơn, anh đã có dũng khí để ngỏ ý với em, và thật may là em đã đồng ý, đó là một bước ngoặt lớn trong mối quan hệ của chúng ta, mở ra một chương mới đầy hứa hẹn và những kỷ niệm đẹp đang chờ đón chúng ta phía trước.',
    defaultNote: 'Nhấn ✏️ để chia sẻ cảm xúc của bạn khi nhận được bất ngờ này...',
    defaultImage: '/img/dongytimhieu.jpg', // Sửa ở đây
    accentColor: '#f472b6',
  },
  {
    id: 4, // ID nên để theo thứ tự 4, bạn có thể chỉnh lại id: 4 ở đây nếu muốn
    time: '05/04/2026',
    icon: '🕯️',
    title: 'Yêu xa',
    description:
      'Khoảng thời gian thật sự cảm giác trống rỗng như đang thiếu vắng một điều gì quan trọng, nhưng cũng là lúc mà anh nhận ra rằng tình cảm của mình dành cho em là thật sự sâu đậm và đáng trân trọng, dù có xa cách về mặt địa lý nhưng trái tim vẫn luôn hướng về nhau, và đó cũng là một thử thách để chúng ta cùng nhau vượt qua, củng cố thêm sự tin tưởng và tình yêu giữa hai người.',
    defaultNote: 'Nhấn ✏️ để ghi lại món yêu thích và khoảnh khắc đáng nhớ nhất...',
    defaultImage: '/img/iuxa.jpg', // Sửa ở đây
    accentColor: '#d4a843',
  },
  {
    id: 3, // Và id: 5 ở đây
    time: '04/04/2026',
    icon: '✨',
    title: 'Lần đầu đi chung như cảm giác Người yêu',
    description:
      'Khoảng khắc này nói không nên lời, cảm giác lần đầu tiên đi chung với nhau như một cặp đôi thực thụ, đó là một trải nghiệm mới mẻ và đầy cảm xúc, khi mà anh và em cùng nhau bước đi trên con đường đó, cảm nhận được sự gần gũi và kết nối đặc biệt giữa hai người, đó cũng là một bước tiến quan trọng trong mối quan hệ của chúng ta, mở ra một chương mới đầy hứa hẹn và những kỷ niệm đẹp đang chờ đón chúng ta phía trước.',
    defaultNote: 'Nhấn ✏️ để viết điều bạn ước khi nhìn lên bầu trời đêm đó...',
    defaultImage: '/img/emart.jpg', // Sửa ở đây
    accentColor: '#818cf8',
  },
];

export function TimelineSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6" style={{ background: '#0f0a1e' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            color: '#d4a843',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
          }}
          className="mb-3"
        >
          ✦ Timeline ✦
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#fef0f5',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          Từng Khoảnh Khắc
          <br />
          <em style={{ color: '#e879a0' }}>Đáng Nhớ</em>
        </h2>
        <div className="flex items-center gap-3 justify-center mt-4">
          <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #e879a0)' }} />
          <span style={{ color: '#e879a0', fontSize: '1rem' }}>❤</span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #e879a0)' }} />
        </div>
        {/* Updated helper text to remove quiz instruction */}
        <p style={{ fontFamily: "'Lato', sans-serif", color: '#7a5a70', fontSize: '0.85rem', marginTop: '12px' }}>
          💡 Nhấn ✏️ để thêm ghi chú · 📸 Hover ảnh để đổi
        </p>
      </motion.div>

      {/* Timeline content */}
      <div className="max-w-5xl mx-auto relative">
        {/* Vertical center line — desktop */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px max-lg:hidden"
          style={{ background: 'linear-gradient(to bottom, transparent, #e879a040, #d4a84340, #818cf840, transparent)' }}
        />

        {/* Vertical left line — mobile */}
        <div
          className="absolute top-0 bottom-0 left-4 w-px lg:hidden"
          style={{ background: 'linear-gradient(to bottom, transparent, #e879a040, #d4a84340, transparent)' }}
        />

        <div className="flex flex-col gap-14 lg:gap-16">
          {EVENTS.map((event, i) => (
            <div key={event.id} className="relative">
              {/* Mobile dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="absolute left-0 top-5 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm lg:hidden"
                style={{
                  background: `${event.accentColor}20`,
                  border: `2px solid ${event.accentColor}`,
                  boxShadow: `0 0 14px ${event.accentColor}40`,
                }}
              >
                {event.icon}
              </motion.div>

              {/* Card: mobile has left padding, desktop uses TimelineCard layout */}
              <div className="pl-12 lg:pl-0">
                <TimelineCard event={event} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}