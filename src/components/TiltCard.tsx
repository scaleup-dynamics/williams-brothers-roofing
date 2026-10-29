import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export default function TiltCard({ children, className = '', max = 5 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.transform = `perspective(1000px) rotateX(${y * -max}deg) rotateY(${x * max}deg)`;
      const glow = el.querySelector('[data-glow]') as HTMLDivElement | null;
      if (glow) {
        glow.style.left = `${e.clientX - rect.left - 96}px`;
        glow.style.top = `${e.clientY - rect.top - 96}px`;
      }
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`group relative preserve-3d transition-transform duration-150 ease-out will-change-transform ${className}`}
    >
      <div
        data-glow
        className="absolute w-48 h-48 rounded-full bg-primary-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
      />
      {children}
    </div>
  );
}
