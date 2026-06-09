'use client';
import { useEffect, useRef } from 'react';

export default function FountainPenCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const outerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current!;
    const inner  = innerRef.current!;
    const outer  = outerRef.current!;
    const ctx    = canvas.getContext('2d')!;

    document.body.style.cursor = 'none';

    let animId = 0;
    const mouse    = { x: -400, y: -400 };
    const innerPos = { x: -400, y: -400 };
    const outerPos = { x: -400, y: -400 };
    let isVisible  = false;

    type Pt = { x: number; y: number; age: number; seq: number };
    const trail: Pt[] = [];
    let lastTrail = { x: -400, y: -400 };
    let seq = 0;

    // Idle ink blob
    type Blob = { x: number; y: number; radius: number; maxRadius: number; alpha: number; growing: boolean };
    let blob: Blob | null = null;
    const lastMoveRef = { t: 0 };
    let hasMouseMoved = false;
    const IDLE_TRIGGER_MS = 1000;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) {
        innerPos.x = mouse.x; innerPos.y = mouse.y;
        outerPos.x = mouse.x; outerPos.y = mouse.y;
        isVisible = true;
      }
      inner.style.opacity = '1';
      outer.style.opacity = '1';
      seq++;
      lastMoveRef.t = Date.now();
      hasMouseMoved = true;
      blob = null; // cancel any active blob on mouse move
    };

    document.addEventListener('mousemove', onMove, { passive: true });

    const MAX_AGE = 75;
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    const tick = () => {
      innerPos.x += (mouse.x - innerPos.x) * 0.26;
      innerPos.y += (mouse.y - innerPos.y) * 0.26;

      outerPos.x += (mouse.x - outerPos.x) * 0.10;
      outerPos.y += (mouse.y - outerPos.y) * 0.10;

      const d = Math.hypot(mouse.x - lastTrail.x, mouse.y - lastTrail.y);
      if (d > 3 && mouse.x > -200) {
        trail.push({ x: mouse.x, y: mouse.y, age: 0, seq });
        lastTrail = { x: mouse.x, y: mouse.y };
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age++;
        if (trail[i].age > MAX_AGE) trail.splice(i, 1);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDark();

      // Dynamic cursor circle colors based on theme
      if (dark) {
        outer.style.border = '1.5px solid rgba(220, 215, 240, 0.35)';
        inner.style.background = 'rgba(220, 215, 240, 0.18)';
        inner.style.border = '1.5px solid rgba(220, 215, 240, 0.55)';
      } else {
        outer.style.border = '1.5px solid rgba(100, 82, 78, 0.32)';
        inner.style.background = 'rgba(100, 82, 78, 0.18)';
        inner.style.border = '1.5px solid rgba(100, 82, 78, 0.52)';
      }

      for (let i = 1; i < trail.length; i++) {
        const p  = trail[i];
        const pp = trail[i - 1];
        if (p.seq !== pp.seq && p.seq - pp.seq > 1) continue;
        if (Math.hypot(p.x - pp.x, p.y - pp.y) > 50) continue;

        const t     = 1 - p.age / MAX_AGE;
        const alpha = t * t * 0.20;
        const width = 0.4 + t * 1.0;

        ctx.beginPath();
        ctx.moveTo(pp.x, pp.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = dark
          ? `rgba(242, 238, 255, ${alpha.toFixed(3)})`
          : `rgba(80, 65, 62, ${alpha.toFixed(3)})`;
        ctx.lineWidth = width;
        ctx.lineCap   = 'round';
        ctx.lineJoin  = 'round';
        ctx.stroke();
      }

      // Idle ink blob — appears after IDLE_TRIGGER_MS of no movement
      if (hasMouseMoved && mouse.x > -200) {
        const idleMs = Date.now() - lastMoveRef.t;
        if (idleMs > IDLE_TRIGGER_MS && !blob) {
          blob = {
            x: mouse.x,
            y: mouse.y,
            radius: 0,
            maxRadius: 55 + Math.random() * 35,
            alpha: 0,
            growing: true,
          };
        }
      }

      if (blob) {
        if (blob.growing) {
          const growSpeed = (1 - blob.radius / blob.maxRadius) * 0.45 + 0.04;
          blob.radius = Math.min(blob.maxRadius, blob.radius + growSpeed);
          blob.alpha = (blob.radius / blob.maxRadius) * 0.11;
          if (blob.radius >= blob.maxRadius) blob.growing = false;
        } else {
          blob.alpha -= 0.0012;
          if (blob.alpha <= 0) { blob = null; }
        }

        if (blob) {
          const inkR = dark ? '220, 215, 240' : '80, 60, 60';
          const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
          grad.addColorStop(0,   `rgba(${inkR}, ${Math.min(0.22, blob.alpha * 1.5).toFixed(3)})`);
          grad.addColorStop(0.5, `rgba(${inkR}, ${blob.alpha.toFixed(3)})`);
          grad.addColorStop(1,   `rgba(${inkR}, 0)`);
          ctx.beginPath();
          ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      inner.style.left = `${innerPos.x}px`;
      inner.style.top  = `${innerPos.y}px`;
      outer.style.left = `${outerPos.x}px`;
      outer.style.top  = `${outerPos.y}px`;

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100vw', height: '100vh',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />
      {/* Outer ring — lags behind, creates overlapping effect */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 9998, opacity: 0,
          transition: 'opacity 0.5s',
          width: 20, height: 20, borderRadius: '50%',
          background: 'transparent',
          border: '1.5px solid rgba(100, 82, 78, 0.32)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Inner dot — follows faster */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 9999, opacity: 0,
          transition: 'opacity 0.5s',
          width: 8, height: 8, borderRadius: '50%',
          background: 'rgba(100, 82, 78, 0.18)',
          border: '1.5px solid rgba(100, 82, 78, 0.52)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
