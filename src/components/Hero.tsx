import { useEffect, useRef, useState } from 'react';
import { Shield, Star, Award, TrendingUp, MousePointerClick } from 'lucide-react';
import MagneticButton from './MagneticButton';
import HeroScene3D from './3d/HeroScene3D';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { site } from '@/config/site';

export default function Hero() {
  const caps = useDeviceCapabilities();
  const containerRef = useRef<HTMLDivElement>(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (caps.isMobile) return;
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const handle = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width - 0.5) * 2}`);
        el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height - 0.5) * 2}`);
      });
    };
    el.addEventListener('mousemove', handle);
    el.addEventListener('mouseleave', () => { el.style.setProperty('--mx', '0'); el.style.setProperty('--my', '0'); });
    return () => { el.removeEventListener('mousemove', handle); cancelAnimationFrame(raf); };
  }, [caps.isMobile]);

  const show3D = caps.supportsWebGL && !caps.prefersReducedMotion;

  return (
    <section
      ref={containerRef}
      className="relative min-h-0 overflow-hidden perspective-2000 noise-bg"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, #01274d 0%, #07090b 65%)' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Floating orbs - disabled on mobile for GPU savings */}
      {!caps.isMobile && (
        <>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-primary-600/12 blur-[140px] animate-pulse-slow" style={{ top: '5%', left: '-5%' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-accent-500/6 blur-[120px] animate-pulse-slow" style={{ bottom: '5%', right: '-5%', animationDelay: '2s' }} />
        </>
      )}

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 flex flex-col">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 text-center lg:text-left lg:-translate-y-10 xl:-translate-y-14">
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-primary-500/20 mb-7 animate-fade-up"
              style={{ animationDelay: '0.1s', opacity: 0 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500" />
              </span>
              <span className="text-sm font-medium text-primary-200">{site.trustBadge || 'Licensed & Insured • 25-Year Workmanship Warranty'}</span>
            </div>

            <h1
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight text-balance animate-fade-up"
              style={{ animationDelay: '0.2s', opacity: 0 }}
            >
              Durable Roofs Built to <span className="text-gradient">Last Decades</span>
            </h1>

            <p
              className="mt-6 text-lg text-charcoal-300 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-up"
              style={{ animationDelay: '0.35s', opacity: 0 }}
            >
              Plano’s trusted roofing specialists for storm damage repair, full roof replacements, and insurance claim navigation. Honest inspections, premium materials, and flawless cleanups.
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '0.5s', opacity: 0 }}
            >
              <MagneticButton href="#contact"
                className="px-8 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/60 hover:-translate-y-1 border-beam"
              >
                Request Free Roof Inspection &rarr;
              </MagneticButton>
              <MagneticButton href="#projects"
                className="px-7 py-4 rounded-xl glass hover:bg-white/10 text-white font-semibold"
              >
                View Our Work
              </MagneticButton>
            </div>

            <div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5 justify-center lg:justify-start animate-fade-up"
              style={{ animationDelay: '0.65s', opacity: 0 }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-accent-400 fill-accent-400" />)}</div>
                <div className="flex flex-col"><span className="text-sm font-semibold text-white">4.9/5</span><span className="text-xs text-charcoal-400">100+ Google Reviews</span></div>
              </div>
              <div className="h-10 w-px bg-charcoal-800 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-success-400" />
                <div className="flex flex-col"><span className="text-sm font-semibold text-white">Plano, TX</span><span className="text-xs text-charcoal-400">Collin County</span></div>
              </div>
              <div className="h-10 w-px bg-charcoal-800 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-accent-400" />
                <div className="flex flex-col"><span className="text-sm font-semibold text-white">20+ Years</span><span className="text-xs text-charcoal-500">Experience</span></div>
              </div>
            </div>
          </div>

          {/* Right: 3D Scene */}
          <div className="lg:col-span-6">
            <div
              className="relative animate-fade-up py-2 lg:py-4"
              style={{ animationDelay: '0.4s', opacity: 0 }}
            >
              <div className="relative h-[360px] sm:h-[400px] lg:h-[520px] rounded-3xl overflow-hidden glass-dark border border-white/5 bg-gradient-to-br from-[#0c1a29]/60 via-[#070e17]/80 to-[#07090b]">
                {show3D ? (
                  <div className={`w-full h-full transition-opacity duration-700 ${sceneReady ? 'opacity-100' : 'opacity-0'}`}>
                    <HeroScene3D dprMax={caps.isMobile ? 1 : 1.5} onLoaded={() => setSceneReady(true)} />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src="https://images.pexels.com/photos/8491085/pexels-photo-8491085.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Roofing construction"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-975 via-charcoal-975/20 to-transparent" />
                  </div>
                )}

                {/* Loading skeleton placeholder behind canvas while initializing */}
                {show3D && !sceneReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full border-2 border-primary-500/20 border-t-primary-500 animate-spin mb-3" />
                    <span className="text-xs font-mono text-charcoal-400">Initializing 3D Model...</span>
                  </div>
                )}

                {/* Interactive hint */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-charcoal-400 glass-dark rounded-full px-3 py-1.5 border border-white/5">
                  <MousePointerClick className="w-3.5 h-3.5 text-primary-400" />
                  <span className="font-mono">{show3D ? (sceneReady ? 'Drag to rotate' : '3D loading...') : 'Interactive View'}</span>
                </div>

                <div className="absolute bottom-4 right-4 glass-dark rounded-2xl p-4 border border-white/5">
                  <div className="text-xs text-charcoal-500 uppercase tracking-wider font-mono">Model</div>
                  <div className="text-white font-display font-bold text-sm">LuckyShield&trade; System</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Shield className="w-3 h-3 text-success-400" />
                    <span className="text-[10px] text-success-400 font-mono">ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Proof cards sit beneath the model, aligned to its edges. */}
              {!caps.isMobile && (
                <div className="mt-4 grid gap-5 px-4 xl:px-8">
                  <div className="glass-titanium rounded-2xl p-4 shadow-2xl animate-float border-beam">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-2xl font-display font-extrabold text-white leading-tight">25-Year</div>
                        <div className="text-xs text-charcoal-400">Workmanship Warranty</div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-titanium rounded-2xl p-4 shadow-2xl animate-float border-beam" style={{ animationDelay: '1.5s' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-success-500/20 border border-success-500/30 flex items-center justify-center">
                        <Star className="w-5 h-5 text-success-400 fill-success-400" />
                      </div>
                      <div>
                        <div className="text-lg font-display font-bold text-white">Top Rated</div>
                        <div className="text-xs text-charcoal-400">Oregon CCB Licensed</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


