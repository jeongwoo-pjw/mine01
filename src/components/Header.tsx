'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, PenLine, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: '서비스 소개', href: '#features' },
    { label: '사용 방법',   href: '#how-it-works' },
    { label: '폰트 갤러리', href: '#gallery' },
    { label: '요금제',      href: '#pricing' },
  ];

  const bgScrolled = theme === 'dark'
    ? 'rgba(12,22,40,0.92)'
    : 'rgba(251,248,243,0.92)';

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? bgScrolled : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
    }}>
      <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 68,
        }}>
          {/* ── Logo ─────────────────────────── */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(28,46,80,0.22)',
              transition: 'box-shadow 0.22s',
            }}>
              <PenLine size={20} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '1.55rem', fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}>
              Hand<span style={{ color: 'var(--accent)', opacity: 0.75 }}>Font</span>
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────── */}
          <nav className="nav-desktop" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.92rem', fontWeight: 500,
                  transition: 'color 0.2s',
                  padding: '4px 0',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── Right controls ────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Dark / Light toggle */}
            <button
              onClick={toggle}
              aria-label="테마 전환"
              style={{
                width: 38, height: 38, borderRadius: 10,
                border: '1.5px solid var(--border)',
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'border-color 0.22s, background 0.22s, color 0.22s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'rgba(28,46,80,0.30)';
                b.style.background  = 'rgba(28,46,80,0.05)';
                b.style.color       = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'var(--border)';
                b.style.background  = 'var(--bg-card)';
                b.style.color       = 'var(--text-secondary)';
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* 시작하기 — desktop only */}
            <a
              href="#start"
              className="nav-desktop btn-primary"
              style={{ padding: '9px 18px', fontSize: '0.88rem', borderRadius: 10 }}
            >
              시작하기
            </a>

            {/* 상담신청 — desktop only */}
            <a
              href="#contact"
              className="nav-desktop btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.88rem', borderRadius: 10, gap: 6 }}
            >
              <MessageSquare size={15} />
              상담신청
            </a>

            {/* 컬러 테마 스위처 */}
            <ThemeSwitcher />

            {/* Hamburger — mobile only */}
            <button
              className="nav-mobile"
              onClick={() => setMenuOpen(v => !v)}
              style={{
                width: 38, height: 38,
                border: '1.5px solid var(--border)',
                borderRadius: 10, background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'border-color 0.22s, background 0.22s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'rgba(28,46,80,0.28)';
                b.style.background  = 'rgba(28,46,80,0.04)';
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'var(--border)';
                b.style.background  = 'var(--bg-card)';
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 68, left: 0, right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 24px 20px',
        }}>
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '13px 0',
                color: 'var(--text-primary)', textDecoration: 'none',
                fontSize: '0.97rem', fontWeight: 500,
                borderBottom: '1px solid var(--border)',
                transition: 'color 0.2s',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <a
              href="#start"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', borderRadius: 12, fontSize: '0.92rem' }}
              onClick={() => setMenuOpen(false)}
            >
              시작하기
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center', borderRadius: 12, fontSize: '0.92rem', gap: 6 }}
              onClick={() => setMenuOpen(false)}
            >
              <MessageSquare size={14} />
              상담신청
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 860px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile  { display: none  !important; }
        }
        @media (max-width: 859px) {
          .nav-desktop { display: none  !important; }
          .nav-mobile  { display: flex  !important; }
        }
      `}</style>
    </header>
  );
}
