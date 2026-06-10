'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { sb, BoardType } from '@/lib/supabase'
import { useAuth, checkAdmin } from '@/lib/useAuth'

const BOARD_LABEL: Record<BoardType, string> = {
  notice: '공지사항',
  qna: 'Q&A',
  general: '자유게시판',
}

function WriteContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const editId = searchParams.get('id')
  const typeParam = (searchParams.get('type') ?? 'general') as BoardType

  const [boardType, setBoardType] = useState<BoardType>(typeParam)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/login'); return }

    async function init() {
      if (editId) {
        const { data } = await sb.from('posts').select('*').eq('id', editId).single()
        if (!data) { router.replace('/board'); return }
        if (data.author_id !== user!.id) { router.replace('/board'); return }
        setTitle(data.title)
        setContent(data.content)
        setBoardType(data.board_type as BoardType)
      }

      if (boardType === 'notice' || (editId === null && typeParam === 'notice')) {
        const admin = await checkAdmin(user!.id)
        if (!admin) { router.replace('/board?type=notice'); return }
      }

      setReady(true)
    }

    init()
  }, [authLoading, user, editId, typeParam, boardType, router])

  async function handleSubmit() {
    if (!title.trim()) return setMsg('제목을 입력해주세요.')
    if (!content.trim()) return setMsg('내용을 입력해주세요.')
    setBusy(true)
    setMsg('')

    if (editId) {
      const { error } = await sb.from('posts').update({ title: title.trim(), content: content.trim() }).eq('id', editId)
      setBusy(false)
      if (error) { setMsg(error.message); return }
      router.push(`/board/post?id=${editId}`)
    } else {
      const { error } = await sb.from('posts').insert({
        title: title.trim(),
        content: content.trim(),
        board_type: boardType,
        author_id: user!.id,
        author_email: user!.email ?? '',
      })
      setBusy(false)
      if (error) { setMsg(error.message); return }
      router.push(`/board?type=${boardType}`)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1.5px solid var(--border)', background: 'var(--bg-secondary)',
    color: 'var(--text-primary)', fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit', transition: 'border-color 0.2s',
  }

  if (!ready) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--text-muted)' }}>확인 중...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem' }}>
          <Link href={`/board?type=${boardType}`} style={{
            color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            ← {BOARD_LABEL[boardType]}
          </Link>
          <span style={{ color: 'var(--border)' }}>|</span>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {editId ? '게시글 수정' : '글쓰기'}
          </h1>
          <span style={{
            fontSize: '0.78rem', fontWeight: 600, padding: '3px 10px',
            borderRadius: 20, background: 'var(--accent-light)',
            color: 'var(--accent)', marginLeft: 'auto',
          }}>
            {BOARD_LABEL[boardType]}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>제목</label>
            <input style={inp} type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>내용</label>
            <textarea
              value={content} onChange={e => setContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              rows={14}
              style={{ ...inp, resize: 'vertical', minHeight: 280 }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
            {msg && <span style={{ flex: 1, fontSize: '0.85rem', color: '#ef4444' }}>{msg}</span>}
            <Link href={`/board?type=${boardType}`} style={{
              padding: '9px 18px', borderRadius: 10,
              border: '1.5px solid var(--border)', background: 'var(--bg-card)',
              color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem',
              textDecoration: 'none', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              취소
            </Link>
            <button onClick={handleSubmit} disabled={busy} style={{
              padding: '9px 22px', borderRadius: 10, border: 'none',
              background: 'var(--accent)', color: 'var(--bg-card)',
              fontWeight: 700, fontSize: '0.88rem',
              cursor: busy ? 'not-allowed' : 'pointer',
              opacity: busy ? 0.6 : 1, transition: 'opacity 0.2s',
            }}>
              {busy ? '저장 중...' : (editId ? '수정 완료' : '등록')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WritePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>불러오는 중...</div>
      </div>
    }>
      <WriteContent />
    </Suspense>
  )
}
