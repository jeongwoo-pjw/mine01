'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { sb, Post, BoardType } from '@/lib/supabase'
import { useAuth } from '@/lib/useAuth'

const BOARD_LABEL: Record<BoardType, string> = {
  notice: '공지사항',
  qna: 'Q&A',
  general: '자유게시판',
}

function PostContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const id = searchParams.get('id')

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!id) { router.replace('/board'); return }
    sb.from('posts').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) { router.replace('/board'); return }
      setPost(data as Post)
      setLoading(false)
    })
  }, [id, router])

  async function handleDelete() {
    if (!post) return
    setDeleting(true)
    await sb.from('posts').delete().eq('id', post.id)
    router.replace(`/board?type=${post.board_type}`)
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'var(--text-muted)' }}>불러오는 중...</div>
    </div>
  )

  if (!post) return null

  const isAuthor = user?.id === post.author_id

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <Link href={`/board?type=${post.board_type}`} style={{
            fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 12,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            ← {BOARD_LABEL[post.board_type]}
          </Link>

          <div style={{
            fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px',
            borderRadius: 20, background: 'var(--accent-light)',
            color: 'var(--accent)', display: 'inline-block', marginBottom: 10,
          }}>
            {BOARD_LABEL[post.board_type]}
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, margin: '0 0 14px' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>{post.author_email.split('@')[0]}</span>
            <span>{new Date(post.created_at).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
            {post.updated_at !== post.created_at && <span>수정됨</span>}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 1.75rem' }} />

        {/* Content */}
        <div style={{
          fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap', wordBreak: 'break-word', minHeight: 200,
        }}>
          {post.content}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex', gap: 10, marginTop: '2.5rem',
          paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
        }}>
          <Link href={`/board?type=${post.board_type}`} style={{
            padding: '9px 18px', borderRadius: 10,
            border: '1.5px solid var(--border)', background: 'var(--bg-card)',
            color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem',
            textDecoration: 'none', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            목록
          </Link>
          {isAuthor && (
            <>
              <Link href={`/board/write?id=${post.id}`} style={{
                padding: '9px 18px', borderRadius: 10,
                border: '1.5px solid var(--accent)', background: 'transparent',
                color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg-card)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
              >
                수정
              </Link>
              <button onClick={() => setShowModal(true)} style={{
                padding: '9px 18px', borderRadius: 10,
                border: '1.5px solid #ef4444', background: 'transparent',
                color: '#ef4444', fontWeight: 600, fontSize: '0.88rem',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ef4444' }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, padding: '2rem', width: 'min(90%, 360px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              게시글 삭제
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '0 0 1.5rem' }}>
              삭제한 게시글은 복구할 수 없습니다. 삭제하시겠습니까?
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{
                padding: '8px 16px', borderRadius: 8,
                border: '1.5px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
              }}>
                취소
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                background: '#ef4444', color: '#fff',
                fontWeight: 700, fontSize: '0.88rem', cursor: deleting ? 'not-allowed' : 'pointer',
                opacity: deleting ? 0.6 : 1,
              }}>
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PostPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-muted)' }}>불러오는 중...</div>
      </div>
    }>
      <PostContent />
    </Suspense>
  )
}
