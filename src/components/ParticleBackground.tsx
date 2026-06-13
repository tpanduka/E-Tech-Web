import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface ParticleBackgroundProps {
  color?: string; // e.g., '229, 9, 20' for red, '56, 189, 248' for celestial blue
  particleCount?: number;
}

export default function ParticleBackground({ 
  color = '229, 9, 20', // Default brand red
  particleCount = 60 
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.offsetWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, // Slow, peaceful floating velocity
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.8,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse interactive force fields
      const mouse = mouseRef.current;

      // Draw and update particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision bounce
        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        // Particle attraction to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            // Gently glide toward the mouse pointer
            p.x += (dx / dist) * 0.12;
            p.y += (dy / dist) * 0.12;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.fill();
      });

      // Draw connections
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Connection range threshold
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18; // Ultra subtle link transparency to maintain readability
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, particleCount]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block bg-transparent"
    />
  );
}
