import { useState, useEffect } from 'react';
import { Phone, Search, FileText, Wrench, CheckCircle2, Radar } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  { icon: Phone, title: 'Reach Out', description: 'Call or submit a request online. We respond same-day to schedule your inspection at a time that works for you.', duration: 'Same Day', hours: 0, mins: 0 },
  { icon: Search, title: 'Free Inspection', description: 'Our certified inspector evaluates your roof inside and out — including drone survey if needed — with photo documentation.', duration: '60–90 Minutes', hours: 1, mins: 30 },
  { icon: FileText, title: 'Detailed Report', description: 'Receive a comprehensive report with photos, findings, and a transparent written estimate. No pressure, no obligation.', duration: 'Within 48 Hours', hours: 48, mins: 0 },
  { icon: Wrench, title: 'Expert Installation', description: 'Our crew arrives on schedule, completes the work with precision, and cleans up like we were never there.', duration: '1–3 Days', hours: 24, mins: 0 },
  { icon: CheckCircle2, title: 'Final Walkthrough', description: 'We walk the property with you, ensure everything meets our quality standard, and register your 25-year warranty.', duration: 'Same Day', hours: 0, mins: 30 },
];

function CountdownClock({ active, hours, mins }: { active: boolean; hours: number; mins: number }) {
  const [displayHours, setDisplayHours] = useState(hours);
  const [displayMins, setDisplayMins] = useState(mins);

  useEffect(() => {
    if (active) {
      setDisplayHours(hours);
      setDisplayMins(mins);
    }
  }, [active, hours, mins]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setDisplayMins((m) => {
        if (m <= 0) {
          setDisplayHours((h) => Math.max(0, h - 1));
          return 59;
        }
        return m - 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 ${
      active ? 'bg-primary-500/15 border border-primary-500/30 text-primary-300' : 'bg-charcoal-800/50 text-charcoal-600 border border-charcoal-700/30'
    }`}>
      <span className={active ? 'text-success-400' : 'text-charcoal-700'}>●</span>
      <span className="font-bold">{String(displayHours).padStart(2, '0')}h</span>
      <span className="text-charcoal-600">:</span>
      <span className="font-bold">{String(displayMins).padStart(2, '0')}m</span>
    </div>
  );
}

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent-600/5 blur-[130px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">How It Works</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
            Our Proven 5-Step Process
          </h2>
          <p className="mt-4 text-charcoal-400 text-lg leading-relaxed">
            No surprises, no hidden fees. Just a clear path from first call to final inspection — designed to make your roofing project effortless.
          </p>
        </Reveal>

        {/* Desktop holographic blueprint */}
        <div className="hidden lg:block relative">
          <div className="absolute top-12 left-[10%] right-[10%] h-px neon-line" />
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = active === i;
              return (
                <div
                  key={step.title}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <div className="relative w-24 h-24 mb-6">
                    {/* Radar pulse on active */}
                    {isActive && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-ripple" />
                        <div className="absolute inset-0 rounded-full bg-primary-500/10 animate-ripple" style={{ animationDelay: '0.5s' }} />
                      </>
                    )}
                    <div className={`absolute inset-0 rounded-full border transition-all duration-300 ${
                      isActive ? 'border-primary-500/50 bg-primary-500/5' : 'glass border-charcoal-700/50'
                    }`} />
                    {/* Radar icon */}
                    {isActive && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-400 animate-spin-slow opacity-50">
                        <Radar className="w-20 h-20" />
                      </div>
                    )}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                      <Icon className={`w-8 h-8 transition-colors ${isActive ? 'text-primary-400' : 'text-charcoal-400'}`} />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isActive ? 'bg-primary-500 shadow-primary-500/40' : 'bg-charcoal-700'
                    }`}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className={`font-display font-bold text-lg mb-2 transition-colors ${isActive ? 'text-white' : 'text-charcoal-300'}`}>{step.title}</h3>
                  <p className="text-sm text-charcoal-400 leading-relaxed mb-3">{step.description}</p>
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300 font-mono">{step.duration}</span>
                    <CountdownClock active={isActive} hours={step.hours} mins={step.mins} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = active === i;
            return (
              <Reveal key={step.title} delay={i * 80}>
                <div className="flex gap-5 group cursor-pointer" onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}>
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      {isActive && <div className="absolute inset-0 rounded-2xl bg-primary-500/20 animate-ripple" />}
                      <div className={`absolute inset-0 rounded-2xl flex items-center justify-center border transition-all ${isActive ? 'border-primary-500/40 bg-primary-500/5' : 'glass border-charcoal-700/50'}`}>
                        <Icon className={`w-7 h-7 transition-colors ${isActive ? 'text-primary-400' : 'text-charcoal-400'}`} />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center ${isActive ? 'bg-primary-500' : 'bg-charcoal-700'}`}>{i + 1}</div>
                    </div>
                    {i < steps.length - 1 && <div className="w-0.5 h-full bg-charcoal-800 mt-3 flex-1 min-h-[40px]" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className={`font-display font-bold text-lg ${isActive ? 'text-white' : 'text-charcoal-300'}`}>{step.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-xs font-medium text-primary-300 font-mono">{step.duration}</span>
                    </div>
                    <p className="text-sm text-charcoal-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
