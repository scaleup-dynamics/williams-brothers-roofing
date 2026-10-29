import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.35,
  type = 'button',
  disabled = false,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const rafRef = useRef(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.transform = 'translate(0, 0)';
  };

  const baseClass = `relative inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out will-change-transform ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        className={baseClass}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={baseClass}
    >
      {content}
    </button>
  );
}
