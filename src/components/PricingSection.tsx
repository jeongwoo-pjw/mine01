'use client';
import { Check, Sparkles, PenLine } from 'lucide-react';

const PLANS = [
  {
    name: '무료',
    price: '0',
    period: '영구 무료',
    desc: '처음 시작하는 분들을 위한 기본 플랜',
    features: [
      '폰트 1개 생성',
      'OTF·TTF 다운로드',
      '기본 스타일 편집',
      '워터마크 없음',
      '개인 사용 가능',
    ],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    name: 'PRO',
    price: '9,900',
    period: '월',
    desc: '더 많은 폰트와 고급 기능을 원하는 분들',
    features: [
      '무제한 폰트 생성',
      'OTF·TTF·웹폰트 다운로드',
      '고급 스타일 편집',
      'CDN 호스팅 포함',
      '상업적 사용 가능',
      '우선 AI 처리',
    ],
    cta: 'PRO 시작하기',
    highlight: true,
  },
  {
    name: '팀',
    price: '29,900',
    period: '월 / 5인',
    desc: '팀과 함께 브랜드 폰트를 관리하는 플랜',
    features: [
      '팀원 5명 계정',
      '공유 폰트 라이브러리',
      '팀 브랜드 관리',
      'API 접근',
      '전담 지원',
      '상업적 사용 가능',
    ],
    cta: '팀 플랜 시작',
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" style={{ padding: '100px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-badge">요금제</div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 12,
            letterSpacing: '-0.02em',
          }}>
            합리적인 가격으로<br />나만의 폰트를
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '1rem' }}>
            무료로 시작하고, 필요할 때 업그레이드하세요.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
          alignItems: 'stretch',
        }}>
          {PLANS.map(plan => (
            <div
              key={plan.name}
              style={{
                background: plan.highlight
                  ? 'linear-gradient(145deg, var(--mocha), #6B4D37)'
                  : 'var(--bg-card)',
                border: plan.highlight ? 'none' : '1px solid var(--border)',
                borderRadius: 20,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                boxShadow: plan.highlight ? '0 20px 50px rgba(139,99,71,0.30)' : '0 2px 12px var(--shadow)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'var(--accent)',
                  color: 'var(--ink)',
                  fontSize: '0.7rem', fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: 999,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <Sparkles size={11} />
                  인기
                </div>
              )}

              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: '0.82rem', fontWeight: 700,
                  color: plan.highlight ? 'rgba(237,213,179,0.7)' : 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}>
                  {plan.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                    fontWeight: 800,
                    color: plan.highlight ? '#EDD5B3' : 'var(--text-primary)',
                  }}>
                    ₩{plan.price}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: plan.highlight ? 'rgba(237,213,179,0.6)' : 'var(--text-muted)' }}>
                    / {plan.period}
                  </span>
                </div>
                <p style={{
                  fontSize: '0.88rem',
                  color: plan.highlight ? 'rgba(237,213,179,0.75)' : 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}>
                  {plan.desc}
                </p>
              </div>

              <ul style={{ listStyle: 'none', marginBottom: 28, flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    fontSize: '0.88rem',
                    color: plan.highlight ? '#EDD5B3' : 'var(--text-secondary)',
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: plan.highlight ? 'rgba(240,208,96,0.2)' : 'rgba(240,208,96,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={11} color={plan.highlight ? '#F0D060' : 'var(--mocha)'} strokeWidth={2.5} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={plan.highlight ? '' : 'btn-secondary'}
                style={plan.highlight ? {
                  background: 'var(--accent)',
                  color: 'var(--ink)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 24px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 16px rgba(240,208,96,0.40)',
                  transition: 'transform 0.2s',
                } : {
                  justifyContent: 'center',
                  borderRadius: 12,
                  width: '100%',
                  padding: '13px 24px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                <PenLine size={16} />
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
