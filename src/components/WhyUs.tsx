import { useEffect, useRef, useState } from 'react';
import { Award, Clock, Users, CheckCircle2, Quote } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

const stats = [
  { icon: Award, value: 20, suffix: '+', label: 'Years in Business' },
  { icon: CheckCircle2, value: 2500, suffix: '+', label: 'Roofs Completed' },
  { icon: Users, value: 480, suffix: '+', label: 'Happy Clients' },
  { icon: Clock, value: 24, suffix: '/7', label: 'Emergency Service' },
];

const reasons = [
  { title: 'Fully Licensed & Insured', description: 'We carry full contractor licensing and comprehensive liability insurance so your property is always protected.' },
  { title: '25-Year Workmanship Warranty', description: 'Every installation is backed by a written warranty. If something fails, we fix it — no questions asked.' },
  { title: 'Transparent, Upfront Pricing', description: 'You receive a detailed written estimate before any work begins. No hidden fees, no surprise charges.' },
  { title: 'Local Crew, Local Expertise', description: 'Our team lives and works in your community. We understand Pacific Northwest weather and what roofs need to survive it.' },
];

const certifications = ['GAF Certified', 'Owens Corning Preferred', 'CertainTeed Select', 'BBB Accredited'];

function StatCard({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const value = useCountUp(stat.value, 2000, start);
  const Icon = stat.icon;
  return (
    <div className="text-center group">
      <div className="w-16 h-16 mx-auto rounded-2xl glass-titanium border border-primary-500/20 flex items-center justify-center mb-4 group-hover:border-primary-500/40 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary-400" />
      </div>
      <div className="font-display font-extrabold text-3xl lg:text-4xl text-white">
        {value}<span className="text-primary-400">{stat.suffix}</span>
      </div>
      <div className="text-sm text-charcoal-400 mt-1">{stat.label}</div>
    </div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setAnimate(true), observer.unobserve(entry.target)),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-primary-900/8 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-600/5 blur-[120px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-4 sm:px-8 rounded-3xl glass-titanium border border-charcoal-800/40 mb-20">
          {stats.map((stat) => <StatCard key={stat.label} stat={stat} start={animate} />)}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="reveal-left">
            <TiltCard max={3}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <img src="https://images.pexels.com/photos/3680959/pexels-photo-3680959.jpeg?auto=compress&cs=tinysrgb&w=1000"
                    alt="Roofing professionals at work" className="w-full h-[500px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-975/60 to-transparent" />
                </div>
                <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-6 rounded-2xl p-6 shadow-2xl bg-gradient-to-br from-primary-500 to-primary-700 border border-primary-400/30 animate-glow">
                  <div className="text-5xl font-display font-extrabold text-white">A+</div>
                  <div className="text-sm text-white/80 font-medium mt-1">BBB Rating</div>
                </div>
                <div className="absolute -top-4 left-2 sm:-top-5 sm:-left-5 glass-titanium rounded-2xl p-4 max-w-[200px] shadow-xl border border-white/10 animate-float">
                  <Quote className="w-5 h-5 text-primary-400 mb-2" />
                  <p className="text-xs text-charcoal-300 leading-relaxed italic">"Best roofing experience we've ever had. Professional from start to finish."</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">Why Choose Us</span>
              <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">Built on Trust, Backed by Results</h2>
            </Reveal>

            <div className="mt-8 space-y-6">
              {reasons.map((reason, i) => (
                <Reveal key={reason.title} delay={i * 100}>
                  <div className="flex gap-4 group">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl glass-titanium border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white mb-1">{reason.title}</h3>
                      <p className="text-charcoal-400 text-sm leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="mt-8 pt-6 border-t border-charcoal-800/40">
                <p className="text-xs text-charcoal-500 uppercase tracking-wider mb-3 font-mono">Certified &amp; Approved By</p>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert) => (
                    <span key={cert} className="px-4 py-2 rounded-xl glass border border-charcoal-700/50 text-sm text-charcoal-300 font-medium hover:border-primary-500/30 hover:text-white transition-all">{cert}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

