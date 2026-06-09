'use client';
import { useEffect, useState } from 'react';

// 감성적인 손글씨 Google Fonts 샘플
// 한글: Nanum Brush Script, Nanum Pen Script, Single Day
// 영문: Dancing Script, Sacramento, Caveat, Satisfy, Shadows Into Light
const SAMPLES = [
  { text: '봄날의 기억처럼',        font: "'Nanum Brush Script', cursive", size: '1.85rem' },
  { text: 'My Beautiful Story',   font: "'Dancing Script', cursive",      size: '1.75rem' },
  { text: '나만의 손글씨체',        font: "'Nanum Pen Script', cursive",   size: '1.8rem'  },
  { text: 'Write Your Heart',     font: "'Sacramento', cursive",          size: '1.9rem'  },
  { text: '감성 필기체 폰트',       font: "'Single Day', cursive",         size: '1.75rem' },
  { text: 'Handcrafted with Love',font: "'Satisfy', cursive",             size: '1.55rem' },
  { text: '손끝에서 피어나는 글씨', font: "'Nanum Brush Script', cursive", size: '1.4rem'  },
  { text: 'Memories in Ink',      font: "'Shadows Into Light', cursive",  size: '1.75rem' },
];

const CHAR_MS   = 60;   // 타이핑 속도
const PAUSE_MS  = 1800; // 완성 후 대기
const DEL_MS    = 28;   // 지우기 속도

export default function HandwritingAnimation() {
  const [idx, setIdx]         = useState(0);
  const [shown, setShown]     = useState('');
  const [phase, setPhase]     = useState<'type' | 'pause' | 'erase'>('type');

  const sample = SAMPLES[idx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'type') {
      if (shown.length < sample.text.length) {
        timer = setTimeout(
          () => setShown(sample.text.slice(0, shown.length + 1)),
          CHAR_MS,
        );
      } else {
        setPhase('pause');
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('erase'), PAUSE_MS);
    } else {
      if (shown.length > 0) {
        timer = setTimeout(() => setShown(s => s.slice(0, -1)), DEL_MS);
      } else {
        setIdx(i => (i + 1) % SAMPLES.length);
        setPhase('type');
      }
    }

    return () => clearTimeout(timer);
  }, [shown, phase, sample, idx]);

  return (
    <div
      style={{
        height: 72,
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px',
        minWidth: 0,
      }}
      aria-live="polite"
      aria-label="손글씨 미리보기 애니메이션"
    >
      <span
        style={{
          fontFamily: sample.font,
          fontSize: sample.size,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
          display: 'inline-block',
          letterSpacing: '0.01em',
          transition: 'font-family 0.15s',
        }}
      >
        {shown}
      </span>

      {/* 깜빡이는 커서 */}
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '1.25em',
          background: 'var(--accent)',
          borderRadius: 1,
          marginLeft: 3,
          verticalAlign: 'middle',
          flexShrink: 0,
          animation: 'blink 0.9s step-end infinite',
          opacity: phase === 'pause' ? 0 : 1,
        }}
      />
    </div>
  );
}
