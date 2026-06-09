'use client';
import { Scan, Wand2, Download, Globe, Palette, Shield } from 'lucide-react';

const FEATURES = [
  {
    icon: Scan,
    color: '#EDD5B3',
    title: 'QR 스캔 업로드',
    desc: '스마트폰으로 QR 코드를 스캔하면 손글씨 템플릿이 바로 열립니다. 찍어서 올리면 끝.',
  },
  {
    icon: Wand2,
    color: '#F0D060',
    title: 'AI 자동 변환',
    desc: '딥러닝 AI가 손글씨의 고유한 스타일을 분석하고 벡터 기반 폰트로 정밀 변환합니다.',
  },
  {
    icon: Palette,
    color: '#B0B7C3',
    title: '스타일 편집',
    desc: '두께, 간격, 기울기, 장식 요소를 세밀하게 조정하여 나만의 완성도 높은 폰트를 만드세요.',
  },
  {
    icon: Download,
    color: '#8B6347',
    title: 'OTF·TTF 다운로드',
    desc: '업계 표준 포맷으로 즉시 다운로드. Mac·Windows·모바일 어디서든 설치해 사용하세요.',
  },
  {
    icon: Globe,
    color: '#F0D060',
    title: '웹폰트 CDN',
    desc: '웹사이트에 바로 삽입할 수 있는 CSS 코드와 CDN 링크를 자동으로 제공합니다.',
  },
  {
    icon: Shield,
    color: '#B0B7C3',
    title: '저작권 보호',
    desc: '생성된 폰트의 저작권은 사용자에게 귀속됩니다. 상업적 이용도 완전히 자유롭습니다.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '100px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-badge">서비스 특징</div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 12,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
          }}>
            손글씨를 폰트로 바꾸는<br />가장 쉬운 방법
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 16, fontSize: '1.05rem', maxWidth: 520, margin: '16px auto 0' }}>
            복잡한 과정 없이 누구나 5분 안에 나만의 폰트를 완성할 수 있습니다.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="font-card fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                  border: `1px solid ${f.color}60`,
                }}>
                  <Icon size={22} color={f.color === '#B0B7C3' ? 'var(--metal-light)' : f.color === '#EDD5B3' ? 'var(--mocha)' : f.color} strokeWidth={1.8} />
                </div>
                <h3 style={{
                  fontSize: '1.08rem', fontWeight: 700,
                  color: 'var(--text-primary)', marginBottom: 10,
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.68 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
