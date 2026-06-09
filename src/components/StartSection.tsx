'use client';
import { PenLine, Upload, QrCode, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const QRCode = dynamic(() => import('qrcode.react').then(m => m.QRCodeSVG), { ssr: false });

export default function StartSection() {
  return (
    <section id="start" style={{
      padding: '100px 24px',
      background: 'var(--bg-secondary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(28,46,80,0.07), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(182,189,200,0.12), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-badge">시작하기</div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 14,
            letterSpacing: '-0.02em',
            lineHeight: 1.22,
          }}>
            나만의 손글씨만들기
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            marginTop: 16,
            fontSize: '1.05rem',
            maxWidth: 500,
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}>
            QR 코드로 스캔하거나 파일을 업로드해서<br />
            AI가 만들어주는 나만의 필기체 폰트를 경험해보세요.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}>
          {/* QR Scan */}
          <div style={{
            background: 'var(--accent)',
            borderRadius: 20,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 8px 32px rgba(28,46,80,0.28)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <QrCode size={26} color="#FFFFFF" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>
                📱 QR로 스캔
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
                스마트폰으로 QR 코드를 스캔하면 모바일에서 바로 손글씨를 업로드할 수 있습니다.
              </p>
            </div>
            <div style={{
              background: '#FFFFFF',
              borderRadius: 14,
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(28,46,80,0.20)',
            }}>
              <QRCode
                value="https://jeongwoo-pjw.github.io/mine01/scan/"
                size={140}
                fgColor="#1C2E50"
                bgColor="#FFFFFF"
                level="M"
              />
            </div>
          </div>

          {/* Direct Upload */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border)',
            borderRadius: 20,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 4px 24px var(--shadow)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'rgba(182,189,200,0.18)',
              border: '1px solid rgba(182,189,200,0.40)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Upload size={26} color="var(--silver)" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                💻 직접 업로드
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                PC에서 바로 이미지 파일을 업로드하세요. JPG, PNG, PDF 형식을 지원합니다.
              </p>
            </div>
            <div style={{
              width: '100%',
              border: '2px dashed var(--border)',
              borderRadius: 14,
              padding: '28px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s, background 0.2s',
              background: 'var(--bg-secondary)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            >
              <Upload size={28} color="var(--text-muted)" style={{ marginBottom: 10 }} />
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 6 }}>
                파일을 드래그하거나 클릭
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPG · PNG · PDF</p>
            </div>
          </div>

          {/* Template Download */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1.5px solid var(--border)',
            borderRadius: 20,
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 4px 24px var(--shadow)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'var(--accent-light)',
              border: '1px solid rgba(28,46,80,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PenLine size={26} color="var(--accent)" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                📋 템플릿 다운로드
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                손글씨 작성 가이드 템플릿을 출력하고 자연스럽게 채운 후 사진을 찍어 업로드하세요.
              </p>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: 12 }}>
                <PenLine size={16} />
                한글 템플릿 (A4)
              </button>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', borderRadius: 12 }}>
                English Template
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
