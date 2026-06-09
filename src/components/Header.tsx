'use client';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, PenLine } from 'lucide-react';
import Link from 'next/link';

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
    { label: '사용 방법', href: '#how-it-works' },
    { label: '폰트 갤러리', href: '#gallery' },
    { label: '요금제', href: '#pricing' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(28,33,48,0.92)'
            : 'rgba(250,246,240,0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(240,208,96,0.40)',
            }}>
              <PenLine size={20} color="var(--ink)" strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '1.55rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}>
              Hand<span style={{ color: 'var(--mocha)' }}>Font</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.93rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={toggle}
              aria-label="테마 전환"
              style={{
                width: 38, height: 38,
                borderRadius: 10,
                border: '1.5px solid var(--border)',
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a href="#start" className="btn-primary hidden-mobile" style={{ padding: '9px 20px', fontSize: '0.9rem', borderRadius: 10 }}>
              시작하기
            </a>

            {/* Mobile hamburger */}
            <button
              className="show-mobile"
              onClick={() => setMenuOpen(v => !v)}
              style={{
                width: 38, height: 38, border: '1.5px solid var(--border)',
                borderRadius: 10, background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-secondary)',
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 68, left: 0, right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '12px 0',
                color: 'var(--text-primary)', textDecoration: 'none',
                fontSize: '1rem', fontWeight: 500,
                borderBottom: '1px solid var(--border)',
              }}>
              {l.label}
            </a>
          ))}
          <a href="#start" className="btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center', borderRadius: 12 }}
            onClick={() => setMenuOpen(false)}>
            시작하기
          </a>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </header>
  );
}
