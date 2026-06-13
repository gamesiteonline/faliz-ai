import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrbParticlesProps {
  size: number;
}

const OrbParticles: React.FC<OrbParticlesProps> = ({ size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    const particles: { x: number; y: number; radius: number; color: string; velocity: { x: number; y: number } }[] = [];
    const numParticles = 20;
    const centerX = size / 2;
    const centerY = size / 2;
    const orbRadius = size / 2 - 10;

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = orbRadius * (0.5 + Math.random() * 0.5);
      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(245, 166, 35, ${0.3 + Math.random() * 0.5})`, // Amber glow
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      });
    }

    let animationFrameId: number;

    const animateParticles = () => {
      ctx.clearRect(0, 0, size, size);

      particles.forEach((p, index) => {
        p.x += p.velocity.x;
        p.y += p.velocity.y;

        // Wrap around if out of bounds
        if (p.x < 0 || p.x > size) p.velocity.x *= -1;
        if (p.y < 0 || p.y > size) p.velocity.y *= -1;

        // Simple orbit around the center
        const dx = p.x - centerX;
        const dy = p.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > orbRadius) {
          p.velocity.x -= dx * 0.01;
          p.velocity.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return <canvas ref={canvasRef} className="absolute" style={{ width: size, height: size }} />;
};

export default OrbParticles;
