'use client';
import { Code2, Camera, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      color: 'var(--footer-text)',
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
            <Link href="/" style={{
              display: 'inline-block',
              textDecoration: 'none', marginBottom: 16,
            }}>
              <span style={{
                fontFamily: "'Playwrite NZ Basic Guides', cursive",
                fontSize: '1.5rem',
                fontWeight: 300,
                color: 'var(--footer-text)',
                letterSpacing: '0.03em',
                lineHeight: 1,
              }}>
                HANDY
              </span>
            </Link>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--footer-dim)',
              lineHeight: 1.7,
              maxWidth: 240,
            }}>
              AI로 나만의 손글씨를 폰트로 변환하는 가장 쉬운 방법.
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {[
                { icon: Code2,         label: 'GitHub' },
                { icon: Camera,        label: 'Instagram' },
                { icon: MessageCircle, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: '1px solid var(--footer-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--footer-dim)',
                    textDecoration: 'none',
                    transition: 'border-color 0.22s, color 0.22s, background 0.22s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--footer-heading)';
                    el.style.color = 'var(--footer-heading)';
                    el.style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'var(--footer-border)';
                    el.style.color = 'var(--footer-dim)';
                    el.style.background = 'transparent';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: '서비스', links: ['폰트 생성', '폰트 갤러리', '템플릿 다운로드', 'API 문서'] },
            { title: '지원',   links: ['사용 가이드', 'FAQ', '고객 센터', '업데이트 노트'] },
            { title: '회사',   links: ['서비스 소개', '이용 약관', '개인정보처리방침', '저작권 정책'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '0.78rem', fontWeight: 700,
                color: 'var(--footer-heading)',
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
                        color: 'var(--footer-dim)',
                        textDecoration: 'none',
                        transition: 'color 0.22s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--footer-text)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--footer-dim)'; }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--footer-border)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--footer-dim)', opacity: 0.7 }}>
            © 2026 HANDY. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--footer-dim)', opacity: 0.7,
            fontFamily: 'Caveat, cursive',
          }}>
            Made with ✍️ & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
