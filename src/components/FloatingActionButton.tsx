'use client';
import { useState, useEffect } from 'react';

interface SubAction {
  icon: string;
  label: string;
  tx: number;
  ty: number;
  labelDir: 'left' | 'top';
}

const ACTIONS: SubAction[] = [
  { icon: 'qr_code_2', label: 'QR 스캔',    tx: 0,   ty: -80, labelDir: 'top'  },
  { icon: 'upload',    label: '사진 업로드', tx: -57, ty: -57, labelDir: 'left' },
  { icon: 'search',    label: '폰트 검색',   tx: -80, ty: 0,   labelDir: 'left' },
];

export default function FloatingActionButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen]       = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, []);

  useEffect(() => { if (!visible) setOpen(false); }, [visible]);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        position:      'fixed',
        bottom:        32,
        right:         32,
        width:         56,
        height:        56,
        zIndex:        200,
        opacity:       visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition:    'opacity 0.35s ease',
      }}
    >
      {/* ── Sub-buttons ──────────────────────────────────────── */}
      {ACTIONS.map((action, i) => (
        <div
          key={action.icon}
          className="fab-sub-wrap"
          style={{
            position:   'absolute',
            bottom:     4,           /* (56 - 48) / 2 = center-align on main FAB */
            right:      4,
            transform:  open
              ? `translate(${action.tx}px, ${action.ty}px)`
              : 'translate(0, 0)',
            opacity:    open ? 1 : 0,
            transition: open
              ? `transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s, opacity 0.22s ease ${i * 0.07}s`
              : `transform 0.28s ease ${(ACTIONS.length - 1 - i) * 0.05}s, opacity 0.18s ease ${(ACTIONS.length - 1 - i) * 0.05}s`,
            zIndex: 99,
          }}
        >
          {/* Tooltip label */}
          <span
            className={`fab-sub-label fab-sub-label--${action.labelDir}`}
            aria-hidden
          >
            {action.label}
          </span>

          <button className="fab-sub-btn" title={action.label} type="button">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: 22,
                fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
              }}
            >
              {action.icon}
            </span>
          </button>
        </div>
      ))}

      {/* ── Main FAB ─────────────────────────────────────────── */}
      <button
        className="fab-main-btn"
        type="button"
        aria-label="빠른 실행"
        style={{
          width:      56,
          height:     56,
          borderRadius: '50%',
          border:     'none',
          background: 'var(--accent)',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor:     'pointer',
          boxShadow:  '0 6px 28px var(--shadow-md)',
          transition: 'transform 0.32s ease, box-shadow 0.32s ease',
          transform:  open ? 'rotate(45deg) scale(1.06)' : 'rotate(0deg) scale(1)',
          position:   'relative',
          zIndex:     100,
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: 26,
            fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            transition: 'inherit',
          }}
        >
          add
        </span>
      </button>
    </div>
  );
}
