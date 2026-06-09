'use client';
import { useEffect, useState } from 'react';
import { Smartphone, ScanLine } from 'lucide-react';

export default function QRSection() {
  const [QRCode, setQRCode] = useState<React.ComponentType<{value:string;size:number;fgColor:string;bgColor:string;level:string}> | null>(null);

  useEffect(() => {
    import('qrcode.react').then(mod => {
      setQRCode(() => mod.QRCodeSVG as unknown as typeof QRCode);
    });
  }, []);

  const url = typeof window !== 'undefined' ? `${window.location.origin}/scan` : 'https://handfont.app/scan';

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      maxWidth: 240,
      boxShadow: '0 4px 24px var(--shadow)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ScanLine size={18} color="var(--mocha)" />
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
          QR로 바로 시작
        </span>
      </div>

      <div className="qr-pulse" style={{
        padding: 12,
        background: 'white',
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {QRCode ? (
          <QRCode value={url} size={140} fgColor="#2C3445" bgColor="#FFFFFF" level="M" />
        ) : (
          <div style={{
            width: 140, height: 140,
            background: 'linear-gradient(135deg, var(--bg-secondary), var(--cappuccino))',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0.7,
          }}>
            <ScanLine size={40} color="var(--mocha)" />
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
          <Smartphone size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>스마트폰으로 스캔하세요</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          카메라 앱 또는 QR 앱으로<br />바로 손글씨 업로드 가능
        </p>
      </div>
    </div>
  );
}
