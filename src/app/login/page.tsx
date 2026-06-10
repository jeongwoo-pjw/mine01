'use client'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { sb } from '@/lib/supabase'

type Tab = 'login' | 'signup'

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('login')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPw, setLoginPw] = useState('')
  const [loginMsg, setLoginMsg] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPw, setSignupPw] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')
  const [signupMsg, setSignupMsg] = useState('')
  const [signupOk, setSignupOk] = useState(false)

  const [socialMsg, setSocialMsg] = useState('')
  const [kakaoLoading, setKakaoLoading] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    sb.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/board')
    })
  }, [router])

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setLoginMsg('')
    const { error } = await sb.auth.signInWithPassword({ email: loginEmail, password: loginPw })
    setBusy(false)
    if (error) {
      setLoginMsg(error.message === 'Invalid login credentials'
        ? '이메일 또는 비밀번호가 올바르지 않습니다.'
        : error.message)
    } else {
      router.replace('/board')
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault()
    if (signupPw !== signupConfirm) return setSignupMsg('비밀번호가 일치하지 않습니다.')
    if (signupPw.length < 6) return setSignupMsg('비밀번호는 6자 이상이어야 합니다.')
    setBusy(true)
    setSignupMsg('')
    const { error } = await sb.auth.signUp({ email: signupEmail, password: signupPw })
    setBusy(false)
    if (error) {
      setSignupMsg(error.message)
    } else {
      setSignupOk(true)
      setSignupMsg('가입 완료! 이메일 확인 후 로그인하세요.')
      setTimeout(() => { setTab('login'); setSignupOk(false); setSignupMsg('') }, 2500)
    }
  }

  async function handleKakao() {
    setKakaoLoading(true)
    setSocialMsg('')
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: 'https://jeongwoo-pjw.github.io/mine01/board/' },
    })
    setKakaoLoading(false)
    if (error) {
      setSocialMsg(
        error.message?.toLowerCase().includes('provider') || error.status === 400
          ? '카카오 로그인이 비활성화 상태입니다. Supabase → Providers → Kakao 설정을 확인해주세요.'
          : `카카오 오류: ${error.message}`
      )
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1.5px solid var(--border)', background: 'var(--bg-secondary)',
    color: 'var(--text-primary)', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
    }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '2.5rem 2rem',
        width: '100%', maxWidth: 420,
        boxShadow: '0 8px 40px var(--shadow-md)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{
            fontFamily: "'Playwrite NZ Basic Guides', cursive",
            fontSize: '1.8rem', fontWeight: 300,
            color: 'var(--text-primary)', textDecoration: 'none',
            letterSpacing: '0.03em',
          }}>
            HANDY
          </Link>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: 6, marginBottom: '1.75rem',
          background: 'var(--bg-secondary)', borderRadius: 12, padding: 4,
        }}>
          {(['login', 'signup'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '8px', border: 'none', borderRadius: 9,
              background: tab === t ? 'var(--bg-card)' : 'transparent',
              color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: tab === t ? '0 1px 4px var(--shadow)' : 'none',
              transition: 'all 0.2s',
            }}>
              {t === 'login' ? '로그인' : '회원가입'}
            </button>
          ))}
        </div>

        {/* Login form */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>이메일</label>
              <input style={inp} type="email" required autoComplete="email"
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                placeholder="example@email.com"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>비밀번호</label>
              <input style={inp} type="password" required autoComplete="current-password"
                value={loginPw} onChange={e => setLoginPw(e.target.value)}
                placeholder="비밀번호 입력"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            {loginMsg && (
              <div style={{ background: 'rgba(239,68,68,.1)', color: '#ef4444', borderRadius: 8, padding: '8px 12px', fontSize: '0.85rem' }}>
                {loginMsg}
              </div>
            )}
            <button type="submit" disabled={busy} style={{
              padding: '11px', borderRadius: 10, border: 'none',
              background: 'var(--accent)', color: 'var(--bg-card)',
              fontWeight: 700, fontSize: '0.95rem', cursor: busy ? 'not-allowed' : 'pointer',
              opacity: busy ? 0.6 : 1, transition: 'opacity 0.2s',
            }}>
              {busy ? '로그인 중...' : '로그인'}
            </button>
          </form>
        )}

        {/* Signup form */}
        {tab === 'signup' && (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>이메일</label>
              <input style={inp} type="email" required autoComplete="email"
                value={signupEmail} onChange={e => setSignupEmail(e.target.value)}
                placeholder="example@email.com"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>비밀번호</label>
              <input style={inp} type="password" required autoComplete="new-password"
                value={signupPw} onChange={e => setSignupPw(e.target.value)}
                placeholder="6자 이상"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>비밀번호 확인</label>
              <input style={inp} type="password" required autoComplete="new-password"
                value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)}
                placeholder="비밀번호 재입력"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            {signupMsg && (
              <div style={{
                borderRadius: 8, padding: '8px 12px', fontSize: '0.85rem',
                background: signupOk ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)',
                color: signupOk ? '#10b981' : '#ef4444',
              }}>
                {signupMsg}
              </div>
            )}
            <button type="submit" disabled={busy} style={{
              padding: '11px', borderRadius: 10, border: 'none',
              background: 'var(--accent)', color: 'var(--bg-card)',
              fontWeight: 700, fontSize: '0.95rem', cursor: busy ? 'not-allowed' : 'pointer',
              opacity: busy ? 0.6 : 1, transition: 'opacity 0.2s',
            }}>
              {busy ? '가입 중...' : '회원가입'}
            </button>
          </form>
        )}

        {/* Social */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--text-muted)', fontSize: '0.8rem', margin: '1.25rem 0 0.5rem',
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span>또는</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {socialMsg && (
          <div style={{ background: 'rgba(239,68,68,.1)', color: '#ef4444', borderRadius: 8, padding: '8px 12px', fontSize: '0.85rem', marginBottom: 8 }}>
            {socialMsg}
          </div>
        )}

        <button onClick={handleKakao} disabled={kakaoLoading} style={{
          width: '100%', padding: '11px', borderRadius: 10, border: 'none',
          background: '#FEE500', color: '#191919',
          fontWeight: 700, fontSize: '0.95rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: kakaoLoading ? 'not-allowed' : 'pointer',
          opacity: kakaoLoading ? 0.6 : 1, transition: 'background 0.2s, opacity 0.2s',
        }}
          onMouseEnter={e => { if (!kakaoLoading) (e.currentTarget as HTMLButtonElement).style.background = '#F0D900' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#FEE500' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 1.5C4.86 1.5 1.5 4.19 1.5 7.5c0 2.12 1.3 3.98 3.27 5.09L4 15l3.35-1.8C7.75 13.4 8.37 13.5 9 13.5c4.14 0 7.5-2.69 7.5-6S13.14 1.5 9 1.5z" fill="#191919"/>
          </svg>
          {kakaoLoading ? '카카오 연결 중...' : '카카오로 로그인'}
        </button>
      </div>
    </div>
  )
}
