import { useEffect } from 'react';

export function useCursorGradient() {
  useEffect(() => {
    let rafId: number | null = null;
    let currentX = 50;
    let currentY = 50;
    let targetX = 50;
    let targetY = 50;
    let isAnimating = false;

    const animate = () => {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      const threshold = 0.1;

      if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
        currentX = targetX;
        currentY = targetY;
        document.documentElement.style.setProperty('--cursor-x', `${currentX}%`);
        document.documentElement.style.setProperty('--cursor-y', `${currentY}%`);
        isAnimating = false;
        rafId = null;
        return;
      }

      currentX += deltaX * 0.1;
      currentY += deltaY * 0.1;

      document.documentElement.style.setProperty('--cursor-x', `${currentX}%`);
      document.documentElement.style.setProperty('--cursor-y', `${currentY}%`);

      rafId = requestAnimationFrame(animate);
    };

    const updateCursorPosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      targetX = x;
      targetY = y;

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
}
