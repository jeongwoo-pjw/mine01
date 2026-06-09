'use client';
import { PenLine, Code2, Camera, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: '#0D1828',
      color: '#E2E8F4',
      padding: '60px 24px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#B6BDC8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PenLine size={17} color="#1C2E50" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', fontWeight: 700, color: '#E2E8F4' }}>
                Hand<span style={{ color: '#B6BDC8' }}>Font</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', color: 'rgba(226,232,244,0.55)', lineHeight: 1.7, maxWidth: 240 }}>
              AI로 나만의 손글씨를 폰트로 변환하는 가장 쉬운 방법.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[
                { icon: Code2, label: 'GitHub' },
                { icon: Camera, label: 'Instagram' },
                { icon: MessageCircle, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: '1px solid rgba(182,189,200,0.20)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(226,232,244,0.50)',
                    textDecoration: 'none',
                    transition: 'border-color 0.22s, color 0.22s, background 0.22s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(182,189,200,0.55)';
                    el.style.color = '#E2E8F4';
                    el.style.background = 'rgba(182,189,200,0.10)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(182,189,200,0.20)';
                    el.style.color = 'rgba(226,232,244,0.50)';
                    el.style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: '서비스', links: ['폰트 생성', '폰트 갤러리', '템플릿 다운로드', 'API 문서'] },
            { title: '지원',   links: ['사용 가이드', 'FAQ', '고객 센터', '업데이트 노트'] },
            { title: '회사',   links: ['서비스 소개', '이용 약관', '개인정보처리방침', '저작권 정책'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '0.78rem', fontWeight: 700,
                color: '#B6BDC8',
                textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 16,
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{
                        fontSize: '0.88rem',
                        color: 'rgba(226,232,244,0.50)',
                        textDecoration: 'none',
                        transition: 'color 0.22s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#E2E8F4'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(226,232,244,0.50)'; }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(182,189,200,0.12)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(226,232,244,0.35)' }}>
            © 2026 HandFont. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(226,232,244,0.35)', fontFamily: 'Caveat, cursive' }}>
            Made with ✍️ & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
