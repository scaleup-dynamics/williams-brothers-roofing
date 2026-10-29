import { useState, useEffect } from 'react';
import { MapPin, Home, Building, X, ChevronLeft, ChevronRight, Calendar, ScanLine, Eye, MoveHorizontal } from 'lucide-react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { site } from '@/config/site';

const projects = [
  { image: 'https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Craftsman Roof Replacement', category: 'Residential', location: 'West Plano, TX', detail: 'Complete storm tear-off and Class 4 impact-resistant architectural shingle replacement on a 2,800 sq ft home.', size: '32 Squares', duration: '1 Day' },
  { image: 'https://images.pexels.com/photos/8576025/pexels-photo-8576025.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Multi-Unit Shingle Restoration', category: 'Residential', location: 'Frisco, TX', detail: 'Coordinated reroofing of a residential development with ice/water underlayment and custom aluminum flashing.', size: '54 Squares', duration: '2 Days' },
  { image: 'https://images.pexels.com/photos/18289258/pexels-photo-18289258.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Standing Seam Metal Roofing', category: 'Commercial', location: 'McKinney, TX', detail: 'Corrugated standing seam metal roof installation on a commercial facility with custom drainage and insulation.', size: '120 Squares', duration: '4 Days' },
  { image: 'https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Luxury Estate Tile Roof', category: 'Residential', location: 'Allen, TX', detail: 'Premium clay tile installation with integrated skylights, ridge ventilation, and copper valleys.', size: '48 Squares', duration: '3 Days' },
  { image: 'https://images.pexels.com/photos/32938587/pexels-photo-32938587.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Commercial TPO Membrane System', category: 'Commercial', location: 'Richardson, TX', detail: 'Full commercial heat-welded TPO flat roofing system with rooftop HVAC curb coordination.', size: '200 Squares', duration: '6 Days' },
  { image: 'https://images.pexels.com/photos/10848297/pexels-photo-10848297.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Subdivision Hail Restoration', category: 'Residential', location: 'Plano, TX', detail: 'Complete hail damage roof overhaul with upgraded ridge venting, gutters, and leak-proof flashing.', size: '180 Squares', duration: '5 Days' },
];

type Filter = 'All' | 'Residential' | 'Commercial';

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [xrayMode, setXrayMode] = useState(false);
  const [comparison, setComparison] = useState(52);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    if (lightbox === null) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((p) => p === null ? p : (p + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox((p) => p === null ? p : (p - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [lightbox, filtered.length]);

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-charcoal-975/50 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-800/8 blur-[120px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">Our Work</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">Projects That Speak for Themselves</h2>
          <p className="mt-4 text-charcoal-400 text-lg">Browse a selection of our recent roofing installations and replacements across residential and commercial properties.</p>
        </Reveal>

        <Reveal delay={80} className="mb-12">
          <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent-300">Project transformation · illustrative demo</span>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">See the difference a new roof can make</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-400">Drag the control to compare a weathered look with a refreshed finish. Replace these sample visuals with a contractor’s verified before and after photos before publishing.</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10" style={{'--compare': `${comparison}%`} as React.CSSProperties}>
              <img src="/Craftsman_home_roof_inspection_after.jpg" alt="Illustrative refreshed Craftsman roof after replacement" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'inset(0 calc(100% - var(--compare)) 0 0)' }}>
                <img src="/Craftsman_home_roof_inspection_before.jpg" alt="Illustrative weathered Craftsman roof before replacement" className="h-full w-full object-cover" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">Before · sample</span>
              <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">After · sample</span>
              <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_12px_rgba(255,255,255,.8)]" style={{ left: `${comparison}%` }}><span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-charcoal-980/80 text-white"><MoveHorizontal className="h-4 w-4" /></span></div>
              <input aria-label="Compare illustrative before and after roof images" type="range" min="5" max="95" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} className="absolute inset-x-3 bottom-3 z-20 h-8 w-[calc(100%-1.5rem)] cursor-ew-resize touch-pan-y accent-amber-300" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="flex justify-center gap-3 mb-10">
          {(['All', 'Residential', 'Commercial'] as Filter[]).map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === tab ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'glass text-charcoal-300 hover:text-white hover:border-charcoal-600'
              }`}
            >
              {tab === 'Residential' && <Home className="w-4 h-4" />}
              {tab === 'Commercial' && <Building className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.title} delay={i * 60}>
              <TiltCard max={4}>
                <div onClick={() => setLightbox(i)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer glass-titanium border border-white/5 hover:border-primary-500/20 transition-all duration-400"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={project.image} alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-975 via-charcoal-975/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${project.category === 'Commercial' ? 'bg-accent-500/80 text-white' : 'bg-primary-500/80 text-white'}`}>{project.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-dark text-xs text-white font-mono">
                    <Calendar className="w-3 h-3" /> {project.duration}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-1.5 text-charcoal-300 text-xs mb-2 font-mono"><MapPin className="w-3.5 h-3.5 text-primary-400" />{project.location.includes(',') ? `${project.location.split(',')[0]}, ${site.state || 'OR'}` : `${project.location}, ${site.city}`}</div>
                    <h3 className="font-display font-bold text-lg text-white mb-1">{project.title}</h3>
                    <p className="text-sm text-charcoal-300 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 leading-relaxed">{project.detail}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-charcoal-400 font-mono">{project.size}</span>
                      <span className="text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Project &rarr; â†’</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox with X-Ray mode */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-fade-in" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full glass-dark rounded-3xl overflow-hidden border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-xl glass-dark text-white flex items-center justify-center hover:bg-error-500 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="relative">
              <img src={filtered[lightbox].image} alt={filtered[lightbox].title}
                className={`w-full h-[300px] md:h-[500px] object-cover transition-all duration-500 ${
                  xrayMode ? 'contrast-150 brightness-50 saturate-0' : ''
                }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-975 via-transparent to-transparent" />

              {/* X-Ray overlay */}
              {xrayMode && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Scan line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan shadow-[0_0_20px_rgba(63,171,255,0.8)]" />
                  {/* Blueprint grid */}
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'linear-gradient(rgba(63,171,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(63,171,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                  {/* Blueprint annotations */}
                  <div className="absolute top-[20%] left-[10%] flex items-center gap-2 text-xs font-mono text-primary-300">
                    <ScanLine className="w-4 h-4" />
                    <span className="glass-dark px-2 py-0.5 rounded">STRUCTURAL LAYER</span>
                  </div>
                  <div className="absolute top-[50%] right-[10%] flex items-center gap-2 text-xs font-mono text-accent-400">
                    <ScanLine className="w-4 h-4" />
                    <span className="glass-dark px-2 py-0.5 rounded">UNDERLAYMENT</span>
                  </div>
                  <div className="absolute bottom-[25%] left-[20%] flex items-center gap-2 text-xs font-mono text-success-400">
                    <ScanLine className="w-4 h-4" />
                    <span className="glass-dark px-2 py-0.5 rounded">DECKING INTACT</span>
                  </div>
                </div>
              )}

              {/* X-Ray toggle */}
              <button
                onClick={(e) => { e.stopPropagation(); setXrayMode(!xrayMode); }}
                className={`absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 ${
                  xrayMode ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' : 'glass-dark text-charcoal-300 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4" />
                {xrayMode ? 'X-RAY: ON' : 'X-RAY MODE'}
              </button>

              <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? p : (p - 1 + filtered.length) % filtered.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass-dark text-white flex items-center justify-center hover:bg-primary-500 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? p : (p + 1) % filtered.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl glass-dark text-white flex items-center justify-center hover:bg-primary-500 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${filtered[lightbox].category === 'Commercial' ? 'bg-accent-500 text-white' : 'bg-primary-500 text-white'}`}>{filtered[lightbox].category}</span>
                <span className="flex items-center gap-1.5 text-sm text-charcoal-400 font-mono"><MapPin className="w-3.5 h-3.5" />{filtered[lightbox].location}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">{filtered[lightbox].title}</h3>
              <p className="text-charcoal-300 leading-relaxed mb-4">{filtered[lightbox].detail}</p>
              <div className="flex items-center gap-6 text-sm font-mono">
                <div className="flex items-center gap-2 text-charcoal-400"><span className="w-2 h-2 rounded-full bg-primary-400" />{filtered[lightbox].size}</div>
                <div className="flex items-center gap-2 text-charcoal-400"><Calendar className="w-4 h-4" />{filtered[lightbox].duration}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

