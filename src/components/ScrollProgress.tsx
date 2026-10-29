import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const handle = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? (scrolled / max) * 100 : 0);
        setShowButton(scrolled > 600);
      });
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => { window.removeEventListener('scroll', handle); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-accent-500 will-change-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center shadow-xl shadow-primary-500/40 transition-all duration-300 will-change-transform ${
          showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
