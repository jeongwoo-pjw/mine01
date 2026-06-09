'use client';
import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export type ColorScheme = 'midnight' | 'forest' | 'rose' | 'amber' | 'slate';

const SCHEMES: { id: ColorScheme; label: string; swatch: string[]; vars: Record<string, string> }[] = [
  {
    id: 'midnight',
    label: '미드나잇',
    swatch: ['#FBF8F3', '#B6BDC8', '#1C2E50'],
    vars: {
      '--accent':       '#1C2E50',
      '--accent-hover': '#263D6A',
      '--accent-light': 'rgba(28,46,80,0.08)',
      '--bg-hero':      '#EEF2FA',
      '--bg-secondary': '#EFF2F8',
    },
  },
  {
    id: 'forest',
    label: '포레스트',
    swatch: ['#F4F8F4', '#A8C5A0', '#1E3D2A'],
    vars: {
      '--accent':       '#1E3D2A',
      '--accent-hover': '#2A5238',
      '--accent-light': 'rgba(30,61,42,0.08)',
      '--bg-hero':      '#EAF3EC',
      '--bg-secondary': '#EDF5EF',
    },
  },
  {
    id: 'rose',
    label: '로즈',
    swatch: ['#FDF6F6', '#DBA8A8', '#7A1E35'],
    vars: {
      '--accent':       '#7A1E35',
      '--accent-hover': '#9B2645',
      '--accent-light': 'rgba(122,30,53,0.08)',
      '--bg-hero':      '#FAEEEE',
      '--bg-secondary': '#FBF0F0',
    },
  },
  {
    id: 'amber',
    label: '앰버',
    swatch: ['#FBF8F0', '#C8A86B', '#5C3A0A'],
    vars: {
      '--accent':       '#5C3A0A',
      '--accent-hover': '#7A4F10',
      '--accent-light': 'rgba(92,58,10,0.08)',
      '--bg-hero':      '#F6EDD8',
      '--bg-secondary': '#F8F1E4',
    },
  },
  {
    id: 'slate',
    label: '슬레이트',
    swatch: ['#F4F5F7', '#8A9BB0', '#1F2D3D'],
    vars: {
      '--accent':       '#1F2D3D',
      '--accent-hover': '#2A3D55',
      '--accent-light': 'rgba(31,45,61,0.08)',
      '--bg-hero':      '#E8EDF5',
      '--bg-secondary': '#EBF0F6',
    },
  },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ColorScheme>('midnight');
  const ref = useRef<HTMLDivElement>(null);

  // 외부 클릭 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyScheme = (scheme: typeof SCHEMES[0]) => {
    const root = document.documentElement;
    Object.entries(scheme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    // dark mode도 동일 accent 계열 적용
    root.style.setProperty('--silver', scheme.swatch[1]);
    setActive(scheme.id);
    setOpen(false);
    // localStorage에 저장
    localStorage.setItem('colorScheme', scheme.id);
  };

  // 초기 로드 시 저장된 색상 복원
  useEffect(() => {
    const saved = localStorage.getItem('colorScheme') as ColorScheme | null;
    if (saved && saved !== 'midnight') {
      const scheme = SCHEMES.find(s => s.id === saved);
      if (scheme) applyScheme(scheme);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = SCHEMES.find(s => s.id === active)!;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="컬러 테마 변경"
        title="컬러 테마 변경"
        style={{
          width: 38, height: 38,
          borderRadius: 10,
          border: '1.5px solid var(--border)',
          background: 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
          transition: 'border-color 0.22s, background 0.22s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(28,46,80,0.30)';
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(28,46,80,0.05)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)';
        }}
      >
        {/* Mini swatch preview */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {current.swatch.map((c, i) => (
            <div key={i} style={{
              width: i === 1 ? 7 : 6,
              height: i === 1 ? 7 : 6,
              borderRadius: '50%',
              background: c,
              border: '0.5px solid rgba(0,0,0,0.08)',
            }} />
          ))}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          right: 0,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '10px 8px',
          boxShadow: '0 8px 32px rgba(28,46,80,0.14)',
          zIndex: 200,
          minWidth: 180,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '2px 8px 6px',
          }}>
            컬러 테마
          </p>

          {SCHEMES.map(scheme => (
            <button
              key={scheme.id}
              onClick={() => applyScheme(scheme)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px',
                borderRadius: 9,
                border: 'none',
                background: active === scheme.id ? 'var(--accent-light)' : 'transparent',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'background 0.18s',
              }}
              onMouseEnter={e => {
                if (active !== scheme.id)
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={e => {
                if (active !== scheme.id)
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {/* Swatch row */}
              <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                {scheme.swatch.map((c, i) => (
                  <div key={i} style={{
                    width: 14, height: 14,
                    borderRadius: 4,
                    background: c,
                    border: '1px solid rgba(0,0,0,0.08)',
                  }} />
                ))}
              </div>

              <span style={{
                fontSize: '0.85rem', fontWeight: active === scheme.id ? 700 : 500,
                color: active === scheme.id ? 'var(--accent)' : 'var(--text-primary)',
                flex: 1,
              }}>
                {scheme.label}
              </span>

              {active === scheme.id && (
                <Check size={13} color="var(--accent)" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
