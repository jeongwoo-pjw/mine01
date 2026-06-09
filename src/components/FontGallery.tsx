'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Star, Heart, Lock, Globe } from 'lucide-react';

type Font = {
  id: number;
  name: string;
  author: string;
  fontFamily: string;
  sample: string;
  sampleKo: string;
  tags: string[];
  downloads: number;
  rating: number;
};

const FONTS: Font[] = [
  { id: 1,  name: 'Morning Breeze', author: '김지수', fontFamily: 'Dancing Script',      sample: 'Hello, World!',  sampleKo: '안녕하세요',      tags: ['로맨틱','우아함'],    downloads: 4821, rating: 4.9 },
  { id: 2,  name: 'Cozy Corner',    author: '박민준', fontFamily: 'Caveat',              sample: 'My Story',       sampleKo: '나의 이야기',     tags: ['캐주얼','귀여움'],    downloads: 3290, rating: 4.7 },
  { id: 3,  name: 'Ink & Paper',    author: '이수연', fontFamily: 'Klee One',            sample: '손글씨의 감성',   sampleKo: '감성 필기체',    tags: ['클래식','정갈함'],    downloads: 2874, rating: 4.8 },
  { id: 4,  name: 'Sunset Drift',   author: '최현우', fontFamily: 'Satisfy',             sample: 'Dream Big',      sampleKo: '꿈을 향해',      tags: ['활기찬','열정'],      downloads: 5612, rating: 4.6 },
  { id: 5,  name: 'Quiet Garden',   author: '정예린', fontFamily: 'Shadows Into Light',  sample: 'Simply Me',      sampleKo: '나다운 글씨',    tags: ['미니멀','심플'],      downloads: 1985, rating: 4.5 },
  { id: 6,  name: 'Golden Hour',    author: '강태양', fontFamily: 'Pacifico',            sample: 'Golden Time',    sampleKo: '황금의 시간',    tags: ['빈티지','따뜻함'],    downloads: 7340, rating: 5.0 },
  { id: 7,  name: 'Silver Lining',  author: '윤서희', fontFamily: 'Sacramento',          sample: 'Silver & Grace', sampleKo: '우아한 선',      tags: ['고급스러움','세련됨'], downloads: 3100, rating: 4.8 },
  { id: 8,  name: 'Nanum Brush',    author: '한동훈', fontFamily: 'Nanum Brush Script',  sample: '붓글씨 감성',    sampleKo: '봄날의 기억',    tags: ['한글','붓터치'],      downloads: 9210, rating: 4.9 },
  { id: 9,  name: 'Daily Memo',     author: '오채린', fontFamily: 'Nanum Pen Script',    sample: "Today's Note",  sampleKo: '오늘의 메모',    tags: ['일상','노트'],        downloads: 6300, rating: 4.7 },
  { id: 10, name: 'Tiny Tales',     author: '배준호', fontFamily: 'Single Day',          sample: '소소한 이야기',   sampleKo: '작은 이야기',    tags: ['포근함','일상'],      downloads: 2450, rating: 4.6 },
  { id: 11, name: 'Metro Script',   author: '임지영', fontFamily: 'Dancing Script',      sample: 'City Vibes',    sampleKo: '도시의 감각',    tags: ['모던','트렌디'],      downloads: 4100, rating: 4.8 },
  { id: 12, name: 'Heritage Hand',  author: '조성민', fontFamily: 'Klee One',            sample: '전통과 현대',    sampleKo: '고전의 아름다움', tags: ['전통','우아함'],      downloads: 3780, rating: 4.9 },
];

const PER_PAGE = 6;
type Filter = 'all' | 'shared' | 'private';

export default function FontGallery() {
  const [page, setPage]       = useState(0);
  const [liked, setLiked]     = useState<Set<number>>(new Set());
  const [privateSet, setPrivateSet] = useState<Set<number>>(new Set());
  const [filter, setFilter]   = useState<Filter>('all');

  const toggleLike = (id: number) =>
    setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const togglePrivacy = (id: number) =>
    setPrivateSet(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = FONTS.filter(f => {
    if (filter === 'shared')  return !privateSet.has(f.id);
    if (filter === 'private') return  privateSet.has(f.id);
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage   = Math.min(page, Math.max(0, totalPages - 1));
  const visible    = filtered.slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE);

  const filterBtns: { id: Filter; label: string; count: number }[] = [
    { id: 'all',     label: '전체',   count: FONTS.length },
    { id: 'shared',  label: '공유됨', count: FONTS.length - privateSet.size },
    { id: 'private', label: '비공개', count: privateSet.size },
  ];

  return (
    <section id="gallery" style={{ padding: '100px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ─ 헤더 ─ */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div className="section-badge">폰트 갤러리</div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            fontWeight: 800, color: 'var(--text-primary)',
            marginTop: 12, letterSpacing: '-0.02em',
          }}>
            사용자들이 만든 폰트
          </h2>
          <p style={{
            color: 'var(--text-secondary)', marginTop: 12, fontSize: '1rem',
            maxWidth: 480, margin: '12px auto 0',
          }}>
            실제 손글씨로 제작된 폰트 예시입니다. 당신의 글씨로도 도전해보세요.
          </p>
        </div>

        {/* ─ 필터 탭 + 공개/비공개 설명 ─ */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 12, marginBottom: 28,
        }}>
          {/* 필터 탭 */}
          <div style={{
            display: 'flex', gap: 6, padding: '4px',
            background: 'var(--bg-secondary)', borderRadius: 12,
            border: '1px solid var(--border)',
          }}>
            {filterBtns.map(btn => (
              <button
                key={btn.id}
                onClick={() => { setFilter(btn.id); setPage(0); }}
                style={{
                  padding: '7px 16px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  fontSize: '0.84rem', fontWeight: filter === btn.id ? 700 : 500,
                  background: filter === btn.id ? 'var(--accent)' : 'transparent',
                  color: filter === btn.id ? (btn.id === 'private' ? '#fff' : '#fff') : 'var(--text-secondary)',
                  transition: 'background 0.2s, color 0.2s',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {btn.id === 'private' && <Lock size={11} />}
                {btn.id === 'shared'  && <Globe size={11} />}
                {btn.label}
                <span style={{
                  fontSize: '0.72rem',
                  opacity: 0.75,
                  background: filter === btn.id ? 'rgba(255,255,255,0.20)' : 'var(--surface)',
                  borderRadius: 99, padding: '0px 6px', lineHeight: '18px',
                }}>
                  {btn.count}
                </span>
              </button>
            ))}
          </div>

          {/* 안내 텍스트 */}
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <Lock size={11} />
            카드의 공개 버튼으로 폰트 공유 여부를 설정하세요
          </p>
        </div>

        {/* ─ 2×3 폰트 그리드 ─ */}
        {visible.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            color: 'var(--text-muted)', fontSize: '0.95rem',
          }}>
            {filter === 'private' ? '비공개 처리된 폰트가 없습니다.' : '표시할 폰트가 없습니다.'}
          </div>
        ) : (
          <div className="font-grid-2col" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20, marginBottom: 44,
          }}>
            {visible.map((font, i) => {
              const isPrivate = privateSet.has(font.id);
              return (
                <div
                  key={font.id}
                  className="font-card fade-up"
                  style={{ animationDelay: `${i * 0.07}s`, opacity: isPrivate ? 0.75 : 1, transition: 'opacity 0.25s' }}
                >
                  {/* 카드 상단 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      {/* 태그 */}
                      <span style={{
                        display: 'inline-block',
                        background: 'var(--accent-light)',
                        color: 'var(--accent)',
                        border: '1px solid var(--border)',
                        borderRadius: 6, padding: '2px 8px',
                        fontSize: '0.7rem', fontWeight: 600, marginBottom: 5,
                      }}>
                        {font.tags[0]}
                      </span>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {font.name}
                      </h3>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        by {font.author}
                      </p>
                    </div>

                    {/* 액션 버튼 그룹 */}
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      {/* 공개/비공개 토글 */}
                      <button
                        onClick={() => togglePrivacy(font.id)}
                        title={isPrivate ? '비공개 (클릭하여 공유)' : '공유 중 (클릭하여 비공개)'}
                        style={{
                          background: isPrivate ? 'var(--accent-light)' : 'transparent',
                          border: `1.5px solid ${isPrivate ? 'var(--accent)' : 'var(--border)'}`,
                          borderRadius: 8, cursor: 'pointer',
                          color: isPrivate ? 'var(--accent)' : 'var(--text-muted)',
                          padding: '4px 8px', fontSize: '0.7rem', fontWeight: 600,
                          display: 'flex', alignItems: 'center', gap: 4,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => {
                          if (!isPrivate) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isPrivate) {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                          }
                        }}
                      >
                        {isPrivate
                          ? <><Lock size={11} />나만보기</>
                          : <><Globe size={11} />공유</>
                        }
                      </button>

                      {/* 좋아요 */}
                      <button
                        onClick={() => toggleLike(font.id)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: liked.has(font.id) ? '#d46a82' : 'var(--text-muted)',
                          transform: liked.has(font.id) ? 'scale(1.2)' : 'scale(1)',
                          transition: 'color 0.2s, transform 0.15s',
                          padding: 4,
                        }}
                        aria-label="좋아요"
                      >
                        <Heart size={17} fill={liked.has(font.id) ? '#d46a82' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* 폰트 샘플 */}
                  <div style={{
                    background: 'var(--bg-secondary)', borderRadius: 12,
                    padding: '18px 16px', marginBottom: 14, textAlign: 'center',
                    minHeight: 76, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 4,
                    position: 'relative', overflow: 'hidden',
                  }}>
                    {isPrivate && (
                      <div style={{
                        position: 'absolute', top: 6, right: 8,
                        fontSize: '0.65rem', color: 'var(--text-muted)',
                        display: 'flex', alignItems: 'center', gap: 3,
                      }}>
                        <Lock size={9} /> 비공개
                      </div>
                    )}
                    <div style={{
                      fontFamily: `'${font.fontFamily}', cursive`,
                      fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                      color: 'var(--text-primary)', lineHeight: 1.3,
                    }}>
                      {font.sample}
                    </div>
                    <div style={{
                      fontFamily: `'${font.fontFamily}', cursive`,
                      fontSize: 'clamp(0.88rem, 2vw, 1.1rem)',
                      color: 'var(--text-secondary)',
                    }}>
                      {font.sampleKo}
                    </div>
                  </div>

                  {/* 메타 + 다운로드 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 14 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={12} fill="var(--accent)" color="var(--accent)" />
                        {font.rating}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Download size={12} />
                        {font.downloads.toLocaleString()}
                      </span>
                    </div>
                    <button
                      style={{
                        background: 'var(--accent)', color: '#fff', border: 'none',
                        borderRadius: 8, padding: '6px 14px', fontSize: '0.78rem',
                        fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 4,
                        transition: 'background 0.2s, transform 0.15s',
                        boxShadow: '0 2px 8px var(--shadow)',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                      }}
                    >
                      <Download size={13} />
                      다운로드
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─ 페이지네이션 ─ */}
        {totalPages > 1 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={safePage === 0}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  border: '1.5px solid var(--border)', background: 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: safePage === 0 ? 'not-allowed' : 'pointer',
                  opacity: safePage === 0 ? 0.4 : 1, color: 'var(--text-secondary)',
                }}
                aria-label="이전 페이지"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    border: `1.5px solid ${i === safePage ? 'var(--accent)' : 'var(--border)'}`,
                    background: i === safePage ? 'var(--accent)' : 'var(--bg-card)',
                    color: i === safePage ? '#fff' : 'var(--text-secondary)',
                    fontWeight: i === safePage ? 700 : 400,
                    cursor: 'pointer', fontSize: '0.88rem',
                    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={safePage === totalPages - 1}
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  border: '1.5px solid var(--border)', background: 'var(--bg-card)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: safePage === totalPages - 1 ? 'not-allowed' : 'pointer',
                  opacity: safePage === totalPages - 1 ? 0.4 : 1, color: 'var(--text-secondary)',
                }}
                aria-label="다음 페이지"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {safePage * PER_PAGE + 1}–{Math.min((safePage + 1) * PER_PAGE, filtered.length)} / {filtered.length}개
            </p>
          </>
        )}
      </div>
    </section>
  );
}
