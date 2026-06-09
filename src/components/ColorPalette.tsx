'use client';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const PALETTE = [
  {
    name: 'CAPPUCCINO FOAM',
    hex: '#EDD5B3',
    rgb: '237, 213, 179',
    desc: '따뜻한 밀크폼 베이지 — 메인 배경',
  },
  {
    name: 'POLISHED METAL',
    hex: '#B0B7C3',
    rgb: '176, 183, 195',
    desc: '쿨톤 메탈릭 실버 — 보조 UI 요소',
  },
  {
    name: 'BUTTER YELLOW',
    hex: '#F0D060',
    rgb: '240, 208, 96',
    desc: '황금 버터 옐로우 — 포인트 컬러',
  },
  {
    name: 'WARM MOCHA',
    hex: '#8B6347',
    rgb: '139, 99, 71',
    desc: '깊은 모카 브라운 — 앵커 컬러',
  },
  {
    name: 'MIDNIGHT INK',
    hex: '#2C3445',
    rgb: '44, 52, 69',
    desc: '딥 네이비 잉크 — 텍스트 / 다크 배경',
  },
];

export default function ColorPalette() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copy = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  return (
    <section id="palette" style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="section-badge">컬러 팔레트</div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 12,
            letterSpacing: '-0.02em',
          }}>
            HandFont 브랜드 컬러
          </h2>
        </div>

        {/* Large strip preview */}
        <div style={{
          display: 'flex',
          height: 72,
          borderRadius: 18,
          overflow: 'hidden',
          marginBottom: 32,
          boxShadow: '0 8px 32px var(--shadow-md)',
        }}>
          {PALETTE.map(c => (
            <div
              key={c.hex}
              title={c.name}
              onClick={() => copy(c.hex)}
              style={{ flex: 1, background: c.hex, cursor: 'pointer', transition: 'flex 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.flex = '1.4'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.flex = '1'; }}
            />
          ))}
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 16,
        }}>
          {PALETTE.map(c => (
            <div
              key={c.hex}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                overflow: 'hidden',
                boxShadow: '0 2px 8px var(--shadow)',
              }}
            >
              <div style={{ height: 80, background: c.hex }} />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  {c.name}
                </div>
                <button
                  onClick={() => copy(c.hex)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: 0,
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                  }}
                >
                  {c.hex}
                  {copiedHex === c.hex
                    ? <Check size={13} color="#22c55e" />
                    : <Copy size={12} color="var(--text-muted)" />
                  }
                </button>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {c.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
