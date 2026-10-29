import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import BorderBeam from './BorderBeam';

const testimonials = [
  {
    name: 'Kai Joyce',
    role: 'Homeowner · Plano, TX',
    avatar: 'https://images.pexels.com/photos/36819484/pexels-photo-36819484.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'We had a great experience with our new roof replacement in Plano. The team worked with our insurance agent to get the claim approved after storm damage. They upgraded the flashing across the roof without us even asking. Micah was excellent to work with and the cleanup was outstanding!'
  },
  {
    name: 'Sabrina W.',
    role: 'Homeowner · Plano, TX',
    avatar: 'https://images.pexels.com/photos/36707107/pexels-photo-36707107.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Craig, the project manager, made the whole roof replacement after hail damage feel easy, organized, and low stress. He helped with insurance paperwork and the crew did an incredible job cleaning up every single nail and shingle. With the heat and storms in Texas, this team is dependable!'
  },
  {
    name: 'Carrie N.',
    role: 'Verified Customer (Local Guide) · Plano, TX',
    avatar: 'https://images.pexels.com/photos/37842959/pexels-photo-37842959.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Out of four roofing contractors I contacted in Plano, Williams Brothers was the only one who called me back the same day and set up an inspection right away. The crew was punctual, professional, and handled the insurance company smoothly. Solid quality control all the way.'
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [fadeKey, setFadeKey] = useState(0);

  const next = () => { setActive((p) => (p + 1) % testimonials.length); setFadeKey((k) => k + 1); };
  const prev = () => { setActive((p) => (p - 1 + testimonials.length) % testimonials.length); setFadeKey((k) => k + 1); };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
      setFadeKey((k) => k + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 bg-charcoal-975/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-600/8 blur-[130px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary-700/8 blur-[120px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">Google Reviews</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">Real Plano Homeowner Reviews</h2>
          <div className="mt-5 inline-flex items-center gap-3">
            <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-accent-400 fill-accent-400" />)}</div>
            <span className="text-charcoal-300 font-medium">4.9 out of 5 from 100+ verified Google reviews in Collin County</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <BorderBeam className="rounded-3xl">
            <div
              className="relative glass-titanium rounded-3xl p-8 lg:p-14 border border-white/5 overflow-hidden"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              <Quote className="absolute top-6 right-6 w-24 h-24 text-white/[0.03] pointer-events-none" />

              <div key={fadeKey} className="animate-fade-in max-w-3xl mx-auto text-center">
                <div className="flex justify-center gap-1.5 mb-8">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />
                  ))}
                </div>

                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed italic">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>

                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="relative">
                    <img src={testimonials[active].avatar} alt={testimonials[active].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary-500/40" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-white text-lg">{testimonials[active].name}</div>
                    <div className="text-xs text-charcoal-400 font-mono">{testimonials[active].role}</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button key={i} onClick={() => { setActive(i); setFadeKey((k) => k + 1); }}
                      className={`h-2 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-primary-500' : 'w-2 bg-charcoal-700 hover:bg-charcoal-600'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="w-10 h-10 rounded-xl glass border border-white/10 hover:border-primary-500/40 flex items-center justify-center text-white hover:text-primary-400 transition-colors" aria-label="Previous review">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={next} className="w-10 h-10 rounded-xl glass border border-white/10 hover:border-primary-500/40 flex items-center justify-center text-white hover:text-primary-400 transition-colors" aria-label="Next review">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </BorderBeam>
        </Reveal>
      </div>
    </section>
  );
}
