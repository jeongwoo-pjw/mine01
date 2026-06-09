'use client';
import { useEffect, useRef, useState } from 'react';

const TEXTS = [
  '나만의 필기체',
  'HandFont',
  '손글씨 아트',
  'My Style',
  '오직 나만의 글씨',
];

export default function HandwritingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [textIdx, setTextIdx] = useState(0);
  const animRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const text = TEXTS[textIdx];
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const fontSize = Math.min(W * 0.13, 64);

    ctx.clearRect(0, 0, W, H);

    const totalFrames = 80;
    progressRef.current = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const progress = Math.min(progressRef.current / totalFrames, 1);

      ctx.font = `${fontSize}px 'Caveat', cursive`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const fullWidth = ctx.measureText(text).width;
      const clipWidth = fullWidth * progress;
      const startX = canvas.offsetWidth / 2 - fullWidth / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(startX, 0, clipWidth, canvas.offsetHeight);
      ctx.clip();

      ctx.fillStyle = isDark ? 'rgba(226,232,244,0.92)' : 'rgba(28,46,80,0.82)';
      ctx.fillText(text, canvas.offsetWidth / 2, canvas.offsetHeight / 2);

      if (progress < 1) {
        const cursorX = startX + clipWidth + 2;
        ctx.fillStyle = isDark ? 'rgba(91,143,219,0.9)' : 'rgba(28,46,80,0.7)';
        ctx.fillRect(cursorX, canvas.offsetHeight / 2 - fontSize * 0.55, 3, fontSize * 1.1);
      }

      ctx.restore();
      progressRef.current += 1;

      if (progressRef.current <= totalFrames + 20) {
        animRef.current = requestAnimationFrame(draw);
      } else {
        setTimeout(() => {
          setTextIdx(i => (i + 1) % TEXTS.length);
        }, 1800);
      }
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [textIdx]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 90, display: 'block' }}
      aria-label="손글씨 애니메이션"
    />
  );
}
