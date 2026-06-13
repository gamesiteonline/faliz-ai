import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/hooks';
import { OrbState } from '@/store/slices/faliz.slice';

interface FalizOrbProps {
  size?: number;
}

const FalizOrb: React.FC<FalizOrbProps> = ({ size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbState = useAppSelector((state) => state.faliz.orbState);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let animationFrameId: number;

    const drawOrb = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 10; // Small padding

      // Base orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 17, 24, 0.8)'; // Surface color
      ctx.fill();
      ctx.strokeStyle = 'rgba(245, 166, 35, 0.3)'; // Amber border
      ctx.lineWidth = 2;
      ctx.stroke();

      switch (orbState) {
        case 'IDLE':
          // Slow breathing pulse (simulated with Framer Motion on parent div)
          // Soft amber glow
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(245, 166, 35, 0.4)';
          ctx.fillStyle = 'rgba(245, 166, 35, 0.1)';
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        case 'LISTENING':
          // Rapid amplitude rings (simplified)
          ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)'; // Cyan
          ctx.lineWidth = 3;
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * (0.7 + (Date.now() % 1000) / 1000 * 0.3) - i * 10, 0, Math.PI * 2);
            ctx.stroke();
          }
          // Orb color shifts to cyan
          ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
          ctx.fill();
          break;
        case 'THINKING':
          // Rotating orbital rings (simplified)
          ctx.strokeStyle = 'rgba(245, 166, 35, 0.6)'; // Amber
          ctx.lineWidth = 2;
          const angle = (Date.now() / 100) % (Math.PI * 2);
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radius * 0.8, radius * 0.4, angle, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radius * 0.8, radius * 0.4, -angle, 0, Math.PI * 2);
          ctx.stroke();
          // Color morphs amber->cyan->amber (simplified)
          const colorLerp = Math.sin(Date.now() / 500) * 0.5 + 0.5;
          const r = Math.round(245 * (1 - colorLerp) + 0 * colorLerp);
          const g = Math.round(166 * (1 - colorLerp) + 212 * colorLerp);
          const b = Math.round(35 * (1 - colorLerp) + 255 * colorLerp);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.2)`;
          ctx.fill();
          break;
        case 'SPEAKING':
          // Sound wave bars (simplified)
          ctx.fillStyle = 'rgba(245, 166, 35, 0.6)'; // Amber
          const barWidth = radius / 8;
          const barSpacing = radius / 10;
          const numBars = 5;
          for (let i = 0; i < numBars; i++) {
            const barHeight = Math.random() * radius * 0.6 + radius * 0.1;
            ctx.fillRect(centerX - radius / 2 + i * (barWidth + barSpacing), centerY - barHeight / 2, barWidth, barHeight);
          }
          // Warm amber glow intensifies
          ctx.shadowBlur = 30;
          ctx.shadowColor = 'rgba(245, 166, 35, 0.6)';
          ctx.fillStyle = 'rgba(245, 166, 35, 0.2)';
          ctx.fill();
          ctx.shadowBlur = 0;
          break;
        case 'ERROR':
          // Brief red flash + shake animation (handled by Framer Motion on parent)
          ctx.fillStyle = 'rgba(231, 76, 60, 0.5)'; // Red
          ctx.fill();
          break;
      }

      animationFrameId = requestAnimationFrame(drawOrb);
    };

    drawOrb();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [orbState, size]);

  const orbVariants = {
    IDLE: {
      scale: [0.95, 1.05, 0.95],
      transition: { duration: 4, ease: "easeOut", repeat: Infinity },
    },
    LISTENING: {
      scale: 1.0,
      rotate: 0,
      x: 0,
      y: 0,
    },
    THINKING: {
      scale: 1.0,
      rotate: 0,
      x: 0,
      y: 0,
    },
    SPEAKING: {
      scale: 1.0,
      rotate: 0,
      x: 0,
      y: 0,
    },
    ERROR: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      variants={orbVariants}
      animate={orbState}
    >
      <canvas ref={canvasRef} className="absolute" />
      {orbState === 'THINKING' && (
        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* <OrbParticles size={size} /> */}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FalizOrb;
