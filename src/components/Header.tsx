'use client';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '@/lib/useAuth';
import { sb } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [boardOpen, setBoardOpen] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) {
        setBoardOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  async function handleLogout() {
    await sb.auth.signOut();
    router.push('/');
  }

  const navLinks = [
    { label: '서비스 소개', href: '#features' },
    { label: '사용 방법',   href: '#how-it-works' },
    { label: '폰트 갤러리', href: '#gallery' },
  ];

  const boardItems = [
    { label: '공지사항', type: 'notice' },
    { label: 'Q&A',     type: 'qna' },
    { label: '자유게시판', type: 'general' },
  ];

  const bgScrolled = theme === 'dark'
    ? 'rgba(20,18,32,0.92)'
    : 'rgba(255,255,255,0.92)';

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.92rem', fontWeight: 500,
    transition: 'color 0.2s',
    padding: '4px 0',
    cursor: 'pointer',
    background: 'none', border: 'none',
    fontFamily: 'inherit',
  };

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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{
              fontFamily: "'Playwrite NZ Basic Guides', cursive",
              fontSize: '1.5rem', fontWeight: 300,
              color: 'var(--text-primary)',
              letterSpacing: '0.03em', lineHeight: 1,
            }}>
              HANDY
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────── */}
          <nav className="nav-desktop" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </a>
            ))}

            {/* Board dropdown */}
            <div ref={boardRef} style={{ position: 'relative' }}
              onMouseEnter={() => setBoardOpen(true)}
              onMouseLeave={() => setBoardOpen(false)}
            >
              <button style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 4 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                onClick={() => setBoardOpen(v => !v)}
              >
                Board
                <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: boardOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              {boardOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '6px',
                  minWidth: 140, boxShadow: '0 8px 30px var(--shadow-md)',
                  zIndex: 200,
                }}>
                  <div style={{
                    position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                    width: 12, height: 6, overflow: 'hidden',
                  }}>
                    <div style={{
                      width: 10, height: 10, background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      transform: 'rotate(45deg)', transformOrigin: 'bottom left',
                      marginLeft: 1,
                    }} />
                  </div>
                  {boardItems.map(item => (
                    <Link key={item.type} href={`/board?type=${item.type}`}
                      onClick={() => setBoardOpen(false)}
                      style={{
                        display: 'block', padding: '9px 14px',
                        color: 'var(--text-secondary)', textDecoration: 'none',
                        fontSize: '0.88rem', fontWeight: 500, borderRadius: 8,
                        transition: 'background 0.15s, color 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--accent-light)';
                        e.currentTarget.style.color = 'var(--accent)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right controls ────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggle} aria-label="테마 전환" style={{
              width: 38, height: 38, borderRadius: 10,
              border: '1.5px solid var(--border)', background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)',
              transition: 'border-color 0.22s, background 0.22s, color 0.22s',
            }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'var(--accent)';
                b.style.background  = 'var(--accent-light)';
                b.style.color       = 'var(--accent)';
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

            {user ? (
              <button onClick={handleLogout} className="nav-desktop" style={{
                padding: '9px 18px', fontSize: '0.88rem', borderRadius: 10,
                border: '1.5px solid var(--border)', background: 'var(--bg-card)',
                color: 'var(--text-secondary)', fontWeight: 600,
                cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
                fontFamily: 'inherit',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="nav-desktop btn-primary"
                style={{ padding: '9px 18px', fontSize: '0.88rem', borderRadius: 10 }}
              >
                로그인
              </Link>
            )}

            <ThemeSwitcher />

            <button className="nav-mobile" onClick={() => setMenuOpen(v => !v)} style={{
              width: 38, height: 38,
              border: '1.5px solid var(--border)', borderRadius: 10, background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-secondary)',
              transition: 'border-color 0.22s, background 0.22s',
            }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement;
                b.style.borderColor = 'var(--accent)';
                b.style.background  = 'var(--accent-light)';
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

      {/* ── Mobile menu ─────────────────────── */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: 68, left: 0, right: 0,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 24px 20px',
        }}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '13px 0',
              color: 'var(--text-primary)', textDecoration: 'none',
              fontSize: '0.97rem', fontWeight: 500,
              borderBottom: '1px solid var(--border)', transition: 'color 0.2s',
            }}>
              {l.label}
            </a>
          ))}

          <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)', padding: '5px 0 8px' }}>Board</div>
            {boardItems.map(item => (
              <Link key={item.type} href={`/board?type=${item.type}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', padding: '8px 12px',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  fontSize: '0.92rem', transition: 'color 0.2s',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', marginTop: 16, gap: 8 }}>
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} style={{
                flex: 1, padding: '11px', borderRadius: 12, border: '1.5px solid var(--border)',
                background: 'var(--bg-card)', color: 'var(--text-secondary)',
                fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer', fontFamily: 'inherit',
              }}>
                로그아웃
              </button>
            ) : (
              <Link href="/login" className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', borderRadius: 12, fontSize: '0.92rem' }}
                onClick={() => setMenuOpen(false)}
              >
                로그인
              </Link>
            )}
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
