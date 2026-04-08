import React, { useEffect, useRef } from 'react';

const AuroraBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ background: '#0D1117' }}>
      {/* Animated particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Radial gold glow - top left */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: '-10%', left: '-5%',
          width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Radial gold glow - bottom right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: '-10%', right: '-5%',
          width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(201,169,110,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Horizontal lines decoration */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[20, 40, 60, 80].map(pct => (
          <div
            key={pct}
            className="absolute w-full"
            style={{
              top: `${pct}%`,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.06) 50%, transparent 100%)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;
