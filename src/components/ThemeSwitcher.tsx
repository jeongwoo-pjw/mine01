'use client';
import { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export type ColorScheme = 'blessingsky' | 'mistyrose' | 'cloudagain' | 'cloudyapple' | 'snowgrey';

const SCHEMES: {
  id: ColorScheme;
  label: string;
  swatch: string[];
  desc: string;
}[] = [
  {
    id: 'blessingsky',
    label: 'Blessing Sky',
    swatch: ['#FDDB92', '#D1FDFF', '#B07820'],
    desc: 'Golden sunrise to sky',
  },
  {
    id: 'mistyrose',
    label: 'Misty Rose',
    swatch: ['#faaca8', '#ddd6f3', '#9060A0'],
    desc: 'Coral pink to lavender',
  },
  {
    id: 'cloudagain',
    label: 'Cloud Again',
    swatch: ['#E6E9F0', '#D8DDE8', '#4A6090'],
    desc: 'Soft clouds & sky blue',
  },
  {
    id: 'cloudyapple',
    label: 'Cloudy Apple',
    swatch: ['#F3E7E9', '#E3EEFF', '#7062A2'],
    desc: 'Rose to blue bloom',
  },
  {
    id: 'snowgrey',
    label: 'Snow Grey',
    swatch: ['#EBEDEE', '#C8C9CA', '#484C52'],
    desc: 'Clean minimal frost',
  },
];

export default function ThemeSwitcher() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState<ColorScheme>('blessingsky');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyScheme = (id: ColorScheme) => {
    if (id === 'blessingsky') {
      document.documentElement.removeAttribute('data-color-scheme');
    } else {
      document.documentElement.setAttribute('data-color-scheme', id);
    }
    setActive(id);
    setOpen(false);
    localStorage.setItem('colorScheme', id);
  };

  useEffect(() => {
    const saved = localStorage.getItem('colorScheme') as ColorScheme | null;
    if (saved && SCHEMES.find(s => s.id === saved)) {
      applyScheme(saved);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = SCHEMES.find(s => s.id === active)!;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Color theme"
        title="Color theme"
        style={{
          width: 38, height: 38, borderRadius: 10,
          border: '1.5px solid var(--border)',
          background: 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.22s, background 0.22s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-light)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)';
        }}
      >
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {current.swatch.map((c, i) => (
            <div key={i} style={{
              width: i === 1 ? 7 : 6, height: i === 1 ? 7 : 6,
              borderRadius: '50%', background: c,
              border: '0.5px solid rgba(0,0,0,0.10)',
            }} />
          ))}
        </div>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 10px)', right: 0,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, padding: '10px 8px',
          boxShadow: '0 8px 32px var(--shadow-md)',
          zIndex: 200, minWidth: 220,
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <p style={{
            fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.09em',
            padding: '2px 8px 6px',
          }}>
            Color Theme
          </p>

          {SCHEMES.map(scheme => (
            <button
              key={scheme.id}
              onClick={() => applyScheme(scheme.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 10px', borderRadius: 9, border: 'none',
                background: active === scheme.id ? 'var(--accent-light)' : 'transparent',
                cursor: 'pointer', width: '100%', textAlign: 'left',
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
              <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                {scheme.swatch.map((c, i) => (
                  <div key={i} style={{
                    width: 14, height: 14, borderRadius: 4,
                    background: c, border: '1px solid rgba(0,0,0,0.09)',
                  }} />
                ))}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: active === scheme.id ? 700 : 500,
                  color: active === scheme.id ? 'var(--accent)' : 'var(--text-primary)',
                  lineHeight: 1.2,
                }}>
                  {scheme.label}
                </div>
                <div style={{
                  fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 1,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {scheme.desc}
                </div>
              </div>
              {active === scheme.id && <Check size={13} color="var(--accent)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
