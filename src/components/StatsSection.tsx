export default function StatsSection() {
  const stats = [
    { value: '12,000+', label: '생성된 폰트'   },
    { value: '98%',     label: 'AI 정확도'     },
    { value: '5분',     label: '평균 완성'     },
    { value: '4.9★',   label: '사용자 만족도'  },
  ];

  return (
    <section style={{
      background: 'var(--bg-primary)',
      borderTop:    '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
    }}>
      <div id="stats-inner" style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
      }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: '40px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: 'clamp(2.2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: 'var(--accent)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: 10,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: '0.78rem',
              fontWeight: 400,
              color: 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          #stats-inner { grid-template-columns: repeat(2, 1fr) !important; }
          #stats-inner > div:nth-child(2) { border-right: none !important; }
          #stats-inner > div:nth-child(n+3) { border-top: 1px solid var(--border); }
        }
      `}</style>
    </section>
  );
}
