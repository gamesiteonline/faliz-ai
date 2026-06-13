import React, { useRef, useEffect } from 'react';

interface OrbRingsProps {
  size: number;
}

const OrbRings: React.FC<OrbRingsProps> = ({ size }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let animationFrameId: number;

    const drawRings = () => {
      ctx.clearRect(0, 0, size, size);

      const centerX = size / 2;
      const centerY = size / 2;
      const baseRadius = size / 2 - 10;

      // Rotating orbital rings
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)'; // Cyber color
      ctx.lineWidth = 1.5;

      const time = Date.now() * 0.001;

      for (let i = 0; i < 3; i++) {
        const offset = i * (Math.PI / 3);
        const angle = time * 0.5 + offset;
        const radiusX = baseRadius * 0.9;
        const radiusY = baseRadius * 0.4;

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, angle, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawRings);
    };

    drawRings();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return <canvas ref={canvasRef} className="absolute" style={{ width: size, height: size }} />;
};


export default OrbRings;
