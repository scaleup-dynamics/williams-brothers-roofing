import { useEffect, useRef, useState } from 'react';

export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 0.3) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setOffset({
          x: ((e.clientX - cx) / rect.width) * strength,
          y: ((e.clientY - cy) / rect.height) * strength,
        });
      });
    };
    el.addEventListener('mousemove', handle);
    el.addEventListener('mouseleave', () => setOffset({ x: 0, y: 0 }));
    return () => {
      el.removeEventListener('mousemove', handle);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return { ref, offset };
}
