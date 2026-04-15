// TimelineCard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pencil, Check, X, Camera } from 'lucide-react';

export interface TimelineEventData {
  id: number;
  time: string;
  icon: string;
  title: string;
  description: string;
  defaultNote: string;
  defaultImage: string;
  accentColor: string;
  // Removed 'question' object from interface
}

interface TimelineCardProps {
  event: TimelineEventData;
  index: number;
}

export function TimelineCard({ event, index }: TimelineCardProps) {
  const isEven = index % 2 === 0;

  // Photo state
  const [photo, setPhoto] = useState(event.defaultImage);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [photoInput, setPhotoInput] = useState('');

  // Note state
  const [note, setNote] = useState(event.defaultNote);
  const [editingNote, setEditingNote] = useState(false);
  const [noteInput, setNoteInput] = useState(event.defaultNote);

  // Removed quiz state variables

  const handlePhotoSave = () => {
    if (photoInput.trim()) setPhoto(photoInput.trim());
    setEditingPhoto(false);
    setPhotoInput('');
  };

  const handleNoteSave = () => {
    setNote(noteInput);
    setEditingNote(false);
  };

  const handleNoteCancel = () => {
    setNoteInput(note);
    setEditingNote(false);
  };

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.035)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(${event.accentColor === '#e879a0' ? '232,121,160' : '212,168,67'},0.2)`,
        boxShadow: '0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(to right, transparent, ${event.accentColor}, transparent)` }}
      />

      {/* Time badge */}
      <div className="px-5 pt-5 pb-0 flex items-center gap-2">
        <span
          className="text-xs px-3 py-1 rounded-full border"
          style={{
            fontFamily: "'Lato', sans-serif",
            letterSpacing: '0.1em',
            color: event.accentColor,
            borderColor: `${event.accentColor}50`,
            background: `${event.accentColor}12`,
          }}
        >
          {event.time}
        </span>
      </div>

      {/* Title */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{event.icon}</span>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#fef0f5',
              fontSize: '1.35rem',
              fontWeight: 600,
            }}
          >
            {event.title}
          </h3>
        </div>
        <p style={{ fontFamily: "'Lato', sans-serif", color: '#c9a0b8', fontSize: '0.9rem', lineHeight: 1.75 }}>
          {event.description}
        </p>
      </div>

      {/* Photo + Note grid */}
      <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Photo frame */}
        <div>
          <div className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: '4/3' }}>
            <img
              src={photo}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = event.defaultImage;
              }}
            />
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3"
              style={{ background: 'linear-gradient(to top, rgba(15,10,30,0.7) 0%, transparent 60%)' }}
            >
              <button
                onClick={() => setEditingPhoto(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-transform hover:scale-105"
                style={{
                  background: 'rgba(232,121,160,0.85)',
                  color: '#fff',
                  fontFamily: "'Lato', sans-serif",
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Camera size={12} /> Đổi ảnh
              </button>
            </div>
            {/* On mobile: always show button */}
            <button
              onClick={() => setEditingPhoto(true)}
              className="absolute bottom-2 right-2 sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
              style={{ background: 'rgba(232,121,160,0.85)', color: '#fff', fontFamily: "'Lato', sans-serif" }}
            >
              <Camera size={10} /> Đổi ảnh
            </button>
          </div>

          {/* Photo URL edit popup */}
          <AnimatePresence>
            {editingPhoto && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-2 rounded-xl p-3 flex flex-col gap-2"
                style={{ background: 'rgba(232,121,160,0.1)', border: '1px solid rgba(232,121,160,0.25)' }}
              >
                <p style={{ fontFamily: "'Lato', sans-serif", color: '#c9a0b8', fontSize: '0.75rem' }}>
                  📸 Dán link ảnh vào đây:
                </p>
                <input
                  type="text"
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(232,121,160,0.3)',
                    color: '#fef0f5',
                    fontFamily: "'Lato', sans-serif",
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handlePhotoSave()}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handlePhotoSave}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-opacity hover:opacity-80"
                    style={{ background: '#e879a0', color: '#fff', fontFamily: "'Lato', sans-serif" }}
                  >
                    <Check size={12} /> Lưu
                  </button>
                  <button
                    onClick={() => setEditingPhoto(false)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-opacity hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.08)', color: '#c9a0b8', fontFamily: "'Lato', sans-serif" }}
                  >
                    <X size={12} /> Huỷ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Note card */}
        <div
          className="rounded-xl p-4 flex flex-col gap-2 relative"
          style={{
            background: 'rgba(212,168,67,0.06)',
            border: '1px solid rgba(212,168,67,0.18)',
            minHeight: '140px',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              style={{ fontFamily: "'Lato', sans-serif", color: '#d4a843', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              ✍️ Ghi Chú
            </span>
            {!editingNote ? (
              <button
                onClick={() => { setNoteInput(note); setEditingNote(true); }}
                className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: '#d4a843' }}
                title="Chỉnh sửa ghi chú"
              >
                <Pencil size={13} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={handleNoteSave}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: '#4ade80' }}
                >
                  <Check size={13} />
                </button>
                <button
                  onClick={handleNoteCancel}
                  className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: '#f87171' }}
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {editingNote ? (
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="flex-1 w-full resize-none rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(212,168,67,0.3)',
                color: '#fef0f5',
                fontFamily: "'Lato', sans-serif",
                fontSize: '0.85rem',
                lineHeight: 1.7,
                minHeight: '80px',
              }}
              autoFocus
            />
          ) : (
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                color: note === event.defaultNote ? '#7a5a70' : '#e8d4a8',
                fontSize: '0.85rem',
                lineHeight: 1.75,
                fontStyle: note === event.defaultNote ? 'italic' : 'normal',
                flex: 1,
              }}
            >
              {note}
            </p>
          )}
        </div>
      </div>

      {/* Completely removed the Interactive quiz section that was causing the crash */}
    </motion.div>
  );

  // Timeline dot
  const dot = (
    <div className="relative flex flex-col items-center max-lg:hidden" style={{ minWidth: '60px' }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{
          background: `radial-gradient(circle, ${event.accentColor}30, ${event.accentColor}10)`,
          border: `2px solid ${event.accentColor}`,
          boxShadow: `0 0 20px ${event.accentColor}40`,
        }}
      >
        {event.icon}
      </motion.div>
    </div>
  );

  return (
    <div className={`flex gap-6 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start max-lg:flex-col`}>
      {/* Card side (50%) */}
      <div className="flex-1 min-w-0">{cardContent}</div>

      {/* Center dot (desktop only) */}
      {dot}

      {/* Empty spacer (desktop) */}
      <div className="flex-1 max-lg:hidden" />
    </div>
  );
}