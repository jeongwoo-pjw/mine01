'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { sb, Post, BoardType } from '@/lib/supabase'
import { useAuth, checkAdmin } from '@/lib/useAuth'

const BOARD_LABEL: Record<BoardType, string> = {
  notice: '공지사항',
  qna: 'Q&A',
  general: '자유게시판',
}

const PAGE_SIZE = 10

function BoardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const type = (searchParams.get('type') ?? 'general') as BoardType
  const { user } = useAuth()

  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (user) checkAdmin(user.id).then(setIsAdmin)
    else setIsAdmin(false)
  }, [user])

  const load = useCallback(async (p: number) => {
    setLoading(true)
    const from = (p - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const [{ data, error }, { count }] = await Promise.all([
      sb.from('posts').select('*').eq('board_type', type).order('created_at', { ascending: false }).range(from, to),
      sb.from('posts').select('*', { count: 'exact', head: true }).eq('board_type', type),
    ])

    if (!error && data) setPosts(data as Post[])
    setTotal(count ?? 0)
    setLoading(false)
  }, [type])

  useEffect(() => {
    setPage(1)
    load(1)
  }, [type, load])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function canWrite() {
    if (type === 'notice') return isAdmin
    return !!user
  }

  function handleWrite() {
    if (!user) { router.push('/login'); return }
    router.push(`/board/write?type=${type}`)
  }

  const chipColor: Record<BoardType, string> = {
    notice: '#f59e0b',
    qna: 'var(--accent)',
    general: 'var(--text-secondary)',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* Board type tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          {(['notice', 'qna', 'general'] as BoardType[]).map(t => (
            <Link key={t} href={`/board?type=${t}`} style={{
              padding: '7px 16px', borderRadius: 20,
              background: type === t ? 'var(--accent)' : 'var(--bg-card)',
              color: type === t ? 'var(--bg-card)' : 'var(--text-secondary)',
              border: `1.5px solid ${type === t ? 'var(--accent)' : 'var(--border)'}`,
              fontWeight: 600, fontSize: '0.85rem',
              textDecoration: 'none', transition: 'all 0.2s',
            }}>
              {BOARD_LABEL[t]}
            </Link>
          ))}
        </div>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {BOARD_LABEL[type]}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {user && (
              <span style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                {user.email}
              </span>
            )}
            {canWrite() ? (
              <button onClick={handleWrite} style={{
                padding: '8px 16px', borderRadius: 10,
                background: 'var(--accent)', color: 'var(--bg-card)',
                border: 'none', fontWeight: 600, fontSize: '0.88rem',
                cursor: 'pointer', transition: 'opacity 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                글쓰기
              </button>
            ) : type === 'notice' && user ? (
              <span style={{
                fontSize: '0.8rem', color: 'var(--text-muted)',
                border: '1px solid var(--border)', borderRadius: 8,
                padding: '6px 12px', background: 'var(--bg-secondary)',
              }}>
                관리자 전용
              </span>
            ) : null}
            {!user && (
              <Link href="/login" style={{
                padding: '8px 16px', borderRadius: 10,
                background: 'var(--bg-card)', color: 'var(--text-secondary)',
                border: '1.5px solid var(--border)', fontWeight: 600, fontSize: '0.88rem',
                textDecoration: 'none', transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                로그인
              </Link>
            )}
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 2px 12px var(--shadow)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)' }}>
                {['번호', '제목', '작성자', '날짜'].map((h, i) => (
                  <th key={h} style={{
                    padding: '12px 14px', fontSize: '0.78rem', fontWeight: 600,
                    color: 'var(--text-muted)', textAlign: 'left',
                    borderBottom: '1px solid var(--border)',
                    width: i === 0 ? 60 : i === 2 ? 120 : i === 3 ? 110 : undefined,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    불러오는 중...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>📭</div>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>게시글이 없습니다</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 4 }}>
                      첫 번째 글을 작성해보세요
                    </div>
                  </td>
                </tr>
              ) : posts.map((p, idx) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {total - ((page - 1) * PAGE_SIZE) - idx}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <Link href={`/board/post?id=${p.id}`} style={{
                      color: 'var(--text-primary)', textDecoration: 'none',
                      fontWeight: 500, fontSize: '0.92rem',
                      display: 'flex', alignItems: 'center', gap: 8,
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    >
                      {type === 'notice' && (
                        <span style={{
                          fontSize: '0.7rem', fontWeight: 700, padding: '2px 7px',
                          borderRadius: 20, background: 'rgba(245,158,11,.15)',
                          color: chipColor.notice,
                        }}>공지</span>
                      )}
                      {p.title}
                    </Link>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {p.author_email.split('@')[0]}
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {p.created_at.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: '1.5rem' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => { setPage(p); load(p) }} style={{
                minWidth: 36, height: 36, borderRadius: 8, border: '1.5px solid',
                borderColor: page === p ? 'var(--accent)' : 'var(--border)',
                background: page === p ? 'var(--accent)' : 'var(--bg-card)',
                color: page === p ? 'var(--bg-card)' : 'var(--text-secondary)',
                fontWeight: page === p ? 700 : 400, fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BoardPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>불러오는 중...</div>
      </div>
    }>
      <BoardContent />
    </Suspense>
  )
}
