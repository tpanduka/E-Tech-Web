import { useEffect, useRef } from 'react';

interface TechNode {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface CircuitTrace {
  points: { x: number; y: number }[];
  progress: number;
  speed: number;
  color: string;
}

interface DataPacket {
  x: number;
  y: number;
  value: string;
  speed: number;
  opacity: number;
  fontSize: number;
}

export default function CyberTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = canvas.offsetWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight;

    const nodes: TechNode[] = [];
    const circuits: CircuitTrace[] = [];
    const packets: DataPacket[] = [];

    // 1. Initialize Tech Nodes (Mesh intersection highlights)
    const cols = Math.ceil(width / 130);
    const rows = Math.ceil(height / 130);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = (c * 130) + (Math.random() * 40 - 20) + 40;
        const y = (r * 130) + (Math.random() * 40 - 20) + 40;
        nodes.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.25 + 0.1,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          pulsePhase: Math.random() * Math.PI,
        });
      }
    }

    // 2. Initialize Circuit Traces (Horizontal-vertical motherboard laser runs)
    const generateCircuit = (): CircuitTrace => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const length = Math.random() * 120 + 80;
      const isHorizontal = Math.random() > 0.5;
      
      const points = [{ x: rx, y: ry }];
      if (isHorizontal) {
        points.push({ x: rx + length * (Math.random() > 0.5 ? 1 : -1), y: ry });
        points.push({ x: points[1].x, y: points[1].y + (Math.random() * 60 - 30) });
      } else {
        points.push({ x: rx, y: ry + length * (Math.random() > 0.5 ? 1 : -1) });
        points.push({ x: points[1].x + (Math.random() * 60 - 30), y: points[1].y });
      }

      return {
        points,
        progress: 0,
        speed: Math.random() * 0.006 + 0.003,
        color: Math.random() > 0.4 ? 'rgba(229, 9, 20, 0.45)' : 'rgba(100, 116, 139, 0.35)'
      };
    };

    for (let i = 0; i < 8; i++) {
      circuits.push(generateCircuit());
    }

    // 3. Initialize Floating Binary streams
    for (let i = 0; i < 25; i++) {
      packets.push({
        x: Math.random() * width,
        y: Math.random() * height,
        value: Math.random() > 0.5 ? '1' : '0',
        speed: Math.random() * 0.95 + 0.35,
        opacity: Math.random() * 0.35 + 0.1,
        fontSize: Math.floor(Math.random() * 5) + 9
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // --- draw background matrix dots ---
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      const step = 28;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          ctx.fillRect(x, y, 1, 1);
        }
      }

      const mouse = mouseRef.current;

      // --- draw tech nodes with web mesh connections ---
      nodes.forEach((n) => {
        n.pulsePhase += n.pulseSpeed;
        const scale = 1 + Math.sin(n.pulsePhase) * 0.35;
        
        // Gentle movement
        n.x += n.vx;
        n.y += n.vy;

        // Spring back if too far from original grid anchor index
        const dxOrig = n.originalX - n.x;
        const dyOrig = n.originalY - n.y;
        n.vx += dxOrig * 0.001;
        n.vy += dyOrig * 0.001;

        // Interaction with mouse pointer
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            n.x -= (dx / dist) * force * 15;
            n.y -= (dy / dist) * force * 15;
          }
        }

        // Render point
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * scale, 0, Math.PI * 2);
        const glow = Math.sin(n.pulsePhase) * 0.15 + 0.15;
        ctx.fillStyle = `rgba(229, 9, 20, ${n.alpha + glow})`;
        ctx.fill();

        // Draw node outline ring
        if (n.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * scale * 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(229, 9, 20, ${(n.alpha + glow) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      // --- Draw connection mesh lines between close nodes ---
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d < 140) {
            const alpha = (1 - (d / 140)) * 0.075;
            ctx.strokeStyle = `rgba(229, 9, 20, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // --- draw motherboard traces ---
      circuits.forEach((c, idx) => {
        c.progress += c.speed;
        if (c.progress >= 1) {
          circuits[idx] = generateCircuit();
          return;
        }

        ctx.beginPath();
        ctx.moveTo(c.points[0].x, c.points[0].y);
        
        const totalPoints = c.points.length;
        const segmentCount = totalPoints - 1;
        const targetSegIndex = Math.floor(c.progress * segmentCount);
        const localProgress = (c.progress * segmentCount) - targetSegIndex;

        // Draw traces line
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(c.points[0].x, c.points[0].y);
        
        for (let k = 1; k <= targetSegIndex; k++) {
          ctx.lineTo(c.points[k].x, c.points[k].y);
        }
        
        if (targetSegIndex < segmentCount) {
          const from = c.points[targetSegIndex];
          const to = c.points[targetSegIndex + 1];
          const currentX = from.x + (to.x - from.x) * localProgress;
          const currentY = from.y + (to.y - from.y) * localProgress;
          ctx.lineTo(currentX, currentY);

          // Draw the shiny laser head leading packet
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ff1a22';
          ctx.fill();
        } else {
          ctx.stroke();
        }
      });

      // --- draw packet floating binary characters ---
      packets.forEach((p) => {
        p.y += p.speed;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
          p.value = Math.random() > 0.5 ? '1' : '0';
        }

        // Binary update frequency
        if (Math.random() > 0.98) {
          p.value = Math.random() > 0.5 ? '1' : '0';
        }

        ctx.font = `bold ${p.fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(229, 9, 20, ${p.opacity})`;
        ctx.fillText(p.value, p.x, p.y);
      });

      // --- Ambient cursor gravity ripple glow ---
      if (mouse.x !== null && mouse.y !== null) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, 195);
        gradient.addColorStop(0, 'rgba(229, 9, 20, 0.08)');
        gradient.addColorStop(0.5, 'rgba(229, 9, 20, 0.015)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 195, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block bg-transparent"
    />
  );
}
