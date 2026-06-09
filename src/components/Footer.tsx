'use client';
import { PenLine, Code2, Camera, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--ink)',
      color: '#EDD5B3',
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
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PenLine size={17} color="var(--ink)" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'Caveat, cursive', fontSize: '1.5rem', fontWeight: 700, color: '#EDD5B3' }}>
                Hand<span style={{ color: '#F0D060' }}>Font</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', color: 'rgba(237,213,179,0.6)', lineHeight: 1.7, maxWidth: 240 }}>
              AI로 나만의 손글씨를 폰트로 변환하는 가장 쉬운 방법.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[
                { icon: Code2, label: 'GitHub' },
                { icon: Camera, label: 'Instagram' },
                { icon: MessageCircle, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} style={{
                  width: 34, height: 34, borderRadius: 8,
                  border: '1px solid rgba(237,213,179,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(237,213,179,0.6)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(240,208,96,0.5)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#F0D060';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(237,213,179,0.2)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(237,213,179,0.6)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: '서비스',
              links: ['폰트 생성', '폰트 갤러리', '템플릿 다운로드', 'API 문서'],
            },
            {
              title: '지원',
              links: ['사용 가이드', 'FAQ', '고객 센터', '업데이트 노트'],
            },
            {
              title: '회사',
              links: ['서비스 소개', '이용 약관', '개인정보처리방침', '저작권 정책'],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F0D060', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{
                      fontSize: '0.88rem',
                      color: 'rgba(237,213,179,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#EDD5B3'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(237,213,179,0.6)'; }}
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
          borderTop: '1px solid rgba(237,213,179,0.12)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(237,213,179,0.4)' }}>
            © 2026 HandFont. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(237,213,179,0.4)', fontFamily: 'Caveat, cursive' }}>
            Made with ✍️ & AI
          </p>
        </div>
      </div>
    </footer>
  );
}
