'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Star, Heart } from 'lucide-react';

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
  color: string;
};

const FONTS: Font[] = [
  {
    id: 1,
    name: 'Morning Breeze',
    author: '김지수',
    fontFamily: 'Dancing Script',
    sample: 'Hello, World!',
    sampleKo: '안녕하세요',
    tags: ['로맨틱', '우아함'],
    downloads: 4821,
    rating: 4.9,
    color: '#1C2E50',
  },
  {
    id: 2,
    name: 'Cozy Corner',
    author: '박민준',
    fontFamily: 'Caveat',
    sample: 'My Story',
    sampleKo: '나의 이야기',
    tags: ['캐주얼', '귀여움'],
    downloads: 3290,
    rating: 4.7,
    color: '#B6BDC8',
  },
  {
    id: 3,
    name: 'Ink & Paper',
    author: '이수연',
    fontFamily: 'Klee One',
    sample: '손글씨의 감성',
    sampleKo: '감성 필기체',
    tags: ['클래식', '정갈함'],
    downloads: 2874,
    rating: 4.8,
    color: '#6B7B93',
  },
  {
    id: 4,
    name: 'Sunset Drift',
    author: '최현우',
    fontFamily: 'Satisfy',
    sample: 'Dream Big',
    sampleKo: '꿈을 향해',
    tags: ['활기찬', '열정'],
    downloads: 5612,
    rating: 4.6,
    color: '#1C2E50',
  },
  {
    id: 5,
    name: 'Quiet Garden',
    author: '정예린',
    fontFamily: 'Shadows Into Light',
    sample: 'Simply Me',
    sampleKo: '나다운 글씨',
    tags: ['미니멀', '심플'],
    downloads: 1985,
    rating: 4.5,
    color: '#E2E8F4',
  },
  {
    id: 6,
    name: 'Golden Hour',
    author: '강태양',
    fontFamily: 'Pacifico',
    sample: 'Golden Time',
    sampleKo: '황금의 시간',
    tags: ['빈티지', '따뜻함'],
    downloads: 7340,
    rating: 5.0,
    color: '#1C2E50',
  },
  {
    id: 7,
    name: 'Silver Lining',
    author: '윤서희',
    fontFamily: 'Sacramento',
    sample: 'Silver & Grace',
    sampleKo: '우아한 선',
    tags: ['고급스러움', '세련됨'],
    downloads: 3100,
    rating: 4.8,
    color: '#B6BDC8',
  },
  {
    id: 8,
    name: 'Nanum Brush',
    author: '한동훈',
    fontFamily: 'Nanum Brush Script',
    sample: '붓글씨 감성',
    sampleKo: '봄날의 기억',
    tags: ['한글', '붓터치'],
    downloads: 9210,
    rating: 4.9,
    color: '#1C2E50',
  },
  {
    id: 9,
    name: 'Daily Memo',
    author: '오채린',
    fontFamily: 'Nanum Pen Script',
    sample: "Today's Note",
    sampleKo: '오늘의 메모',
    tags: ['일상', '노트'],
    downloads: 6300,
    rating: 4.7,
    color: '#E2E8F4',
  },
  {
    id: 10,
    name: 'Tiny Tales',
    author: '배준호',
    fontFamily: 'Single Day',
    sample: '소소한 이야기',
    sampleKo: '작은 이야기',
    tags: ['포근함', '일상'],
    downloads: 2450,
    rating: 4.6,
    color: '#6B7B93',
  },
  {
    id: 11,
    name: 'Metro Script',
    author: '임지영',
    fontFamily: 'Dancing Script',
    sample: 'City Vibes',
    sampleKo: '도시의 감각',
    tags: ['모던', '트렌디'],
    downloads: 4100,
    rating: 4.8,
    color: '#B6BDC8',
  },
  {
    id: 12,
    name: 'Heritage Hand',
    author: '조성민',
    fontFamily: 'Klee One',
    sample: '전통과 현대',
    sampleKo: '고전의 아름다움',
    tags: ['전통', '우아함'],
    downloads: 3780,
    rating: 4.9,
    color: '#8B6347',
  },
];

const PER_PAGE = 6;

export default function FontGallery() {
  const [page, setPage] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const totalPages = Math.ceil(FONTS.length / PER_PAGE);
  const visible = FONTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const toggleLike = (id: number) =>
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section id="gallery" style={{ padding: '100px 24px', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-badge">폰트 갤러리</div>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginTop: 12,
            letterSpacing: '-0.02em',
          }}>
            사용자들이 만든 폰트
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '1rem', maxWidth: 480, margin: '12px auto 0' }}>
            실제 손글씨로 제작된 폰트 예시입니다. 당신의 글씨로도 도전해보세요.
          </p>
        </div>

        {/* 2×3 Font Grid */}
        <div className="font-grid-2col" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(3, auto)',
          gap: 20,
          marginBottom: 44,
        }}>
          {visible.map((font, i) => (
            <div
              key={font.id}
              className="font-card fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Card top */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    background: font.color === '#E2E8F4'
                      ? 'rgba(226,232,244,0.80)'
                      : font.color === '#B6BDC8'
                        ? 'rgba(182,189,200,0.20)'
                        : 'rgba(28,46,80,0.09)',
                    color: font.color === '#E2E8F4' || font.color === '#B6BDC8'
                      ? 'var(--steel)'
                      : 'var(--midnight)',
                    border: `1px solid ${font.color}55`,
                    borderRadius: 6,
                    padding: '2px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    marginBottom: 6,
                  }}>
                    {font.tags[0]}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    {font.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>by {font.author}</p>
                </div>
                <button
                  onClick={() => toggleLike(font.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: liked.has(font.id) ? '#e05c7a' : 'var(--text-muted)',
                    transition: 'color 0.2s, transform 0.15s',
                    transform: liked.has(font.id) ? 'scale(1.2)' : 'scale(1)',
                    padding: 4,
                  }}
                  aria-label="좋아요"
                >
                  <Heart size={18} fill={liked.has(font.id) ? '#e05c7a' : 'none'} />
                </button>
              </div>

              {/* Font Sample */}
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: '20px 16px',
                marginBottom: 16,
                textAlign: 'center',
                minHeight: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}>
                <div style={{
                  fontFamily: `'${font.fontFamily}', cursive`,
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                }}>
                  {font.sample}
                </div>
                <div style={{
                  fontFamily: `'${font.fontFamily}', cursive`,
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                  color: 'var(--text-secondary)',
                }}>
                  {font.sampleKo}
                </div>
              </div>

              {/* Meta + Download */}
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
                  className="dl-btn"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'background 0.22s, transform 0.18s, box-shadow 0.22s',
                    boxShadow: '0 2px 8px rgba(28,46,80,0.18)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(28,46,80,0.26)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 8px rgba(28,46,80,0.18)';
                  }}
                >
                  <Download size={13} />
                  다운로드
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: '1.5px solid var(--border)',
              background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === 0 ? 'not-allowed' : 'pointer',
              opacity: page === 0 ? 0.4 : 1,
              color: 'var(--text-secondary)',
              transition: 'opacity 0.2s',
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
                border: `1.5px solid ${i === page ? 'var(--accent)' : 'var(--border)'}`,
                background: i === page ? 'var(--accent)' : 'var(--bg-card)',
                color: i === page ? 'var(--ink)' : 'var(--text-secondary)',
                fontWeight: i === page ? 700 : 400,
                cursor: 'pointer',
                fontSize: '0.88rem',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            style={{
              width: 40, height: 40, borderRadius: 10,
              border: '1.5px solid var(--border)',
              background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
              opacity: page === totalPages - 1 ? 0.4 : 1,
              color: 'var(--text-secondary)',
              transition: 'opacity 0.2s',
            }}
            aria-label="다음 페이지"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Page info */}
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, FONTS.length)} / {FONTS.length}개 폰트
        </p>

        <style>{`
          @media (max-width: 600px) {
            #gallery [style*="grid-template-columns: repeat(2"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
