import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Send, Phone, Mail, MapPin, Clock, Star } from 'lucide-react';
import Reveal from './Reveal';
import HolographicSeal from './HolographicSeal';
import BorderBeam from './BorderBeam';
import MagneticButton from './MagneticButton';
import { site } from '../config/site';

type Status = 'idle' | 'loading' | 'success';

export default function ContactCTA() {
  const [status, setStatus] = useState<Status>('idle');
  const [estimate, setEstimate] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', propertyType: 'Residential', message: '',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, spaces, parentheses, hyphens, and optional leading +
    const rawVal = e.target.value;
    const cleanDigits = rawVal.replace(/\D/g, '');
    
    // Prevent typing if length exceeds 15 digits (standard international max)
    if (cleanDigits.length > 15) return;

    // Filter out disallowed characters on the fly
    const filteredVal = rawVal.replace(/[^\d\s\(\)\-\+\.]/g, '');
    setForm(prev => ({ ...prev, phone: filteredVal }));

    if (cleanDigits.length > 0 && cleanDigits.length < 10) {
      setPhoneError('Please enter a valid phone number (at least 10 digits).');
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Disallow numbers or special symbols in the name field (allow letters, spaces, hyphens, apostrophes)
    const filtered = val.replace(/[^a-zA-Z\s\-\'\.]/g, '');
    setForm(prev => ({ ...prev, name: filtered }));

    if (filtered.trim().length > 0 && filtered.trim().length < 2) {
      setNameError('Name must be at least 2 characters.');
    } else {
      setNameError('');
    }
  };

  useEffect(() => {
    const loadEstimate = () => {
      const value = sessionStorage.getItem('roof-estimate');
      if (value) {
        setEstimate(value);
        setForm((current) => ({ ...current, message: `${value}\nPlease contact me to arrange an inspection.` }));
      }
    };
    loadEstimate();
    window.addEventListener('roof-estimate-ready', loadEstimate);
    return () => window.removeEventListener('roof-estimate-ready', loadEstimate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (form.name.trim().length < 2) {
      setNameError('Please enter your full name.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', propertyType: 'Residential', message: '' });
      setPhoneError('');
      setNameError('');
    }, 1200);
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl bg-charcoal-980/60 border border-charcoal-800 text-white placeholder-charcoal-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:shadow-[0_0_20px_rgba(11,138,240,0.15)] transition-all duration-300';

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-980/0 via-primary-950/10 to-charcoal-980/0" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-700/8 blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-600/5 blur-[120px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Copy + Info */}
          <Reveal className="reveal-left">
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">
              Get Started Today
            </span>
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
              Request Your Free Roof Inspection
            </h2>
            <p className="mt-5 text-charcoal-400 text-lg leading-relaxed">
              No obligation, no pressure. Our certified inspector will assess
              your roof, provide a detailed report with photos, and recommend
              the best path forward — completely free.
            </p>

            {/* Holographic seal */}
            <div className="mt-6">
              <HolographicSeal />
            </div>

            <div className="mt-8 space-y-4">
              {[
                'Same-day response for inspection requests',
                'Detailed photo report of your roof condition',
                'Transparent estimate with no hidden fees',
                'Insurance claim assistance available',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg glass-titanium border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/25 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary-400" />
                  </div>
                  <span className="text-charcoal-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Contact info cards */}
            <div className="mt-10 pt-8 border-t border-charcoal-800/40 grid sm:grid-cols-2 gap-4">
              <a href={`tel:${site.phoneHref}`} className="glass-titanium rounded-2xl p-5 hover:border-primary-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-primary-400" />
                </div>
                <div className="text-xs text-charcoal-500 uppercase tracking-wider font-mono">Call Us</div>
                <div className="text-white font-semibold mt-0.5">{site.phone}</div>
              </a>
              <a href={`mailto:${site.email}`} className="glass-titanium rounded-2xl p-5 hover:border-primary-500/30 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary-400" />
                </div>
                <div className="text-xs text-charcoal-500 uppercase tracking-wider font-mono">Email Us</div>
                <div className="text-white font-semibold mt-0.5">{site.email}</div>
              </a>
              <a
                href={site.mapUrl || 'https://maps.app.goo.gl/aVX9TzEVga9qA8XY9'}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-titanium rounded-2xl p-5 hover:border-primary-500/30 transition-colors group block"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-primary-400" />
                </div>
                <div className="text-xs text-charcoal-500 uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>Location / Service Area</span>
                  <span className="text-[10px] text-primary-400 group-hover:underline">Open on Google Maps &rarr;</span>
                </div>
                <div className="text-white font-semibold mt-0.5">{site.address || site.serviceArea}</div>
              </a>
              <div className="glass-titanium rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                </div>
                <div className="text-xs text-charcoal-500 uppercase tracking-wider font-mono">Hours</div>
                <div className="text-white font-semibold mt-0.5">{site.hours}</div>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={150} className="reveal-right">
            <BorderBeam className="rounded-3xl">
              <div className="glass-dark rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/5">
                {status === 'success' ? (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="w-24 h-24 mx-auto rounded-full bg-success-500/15 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-12 h-12 text-success-400" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">Request Received!</h3>
                    <p className="text-charcoal-400 mb-6 max-w-sm mx-auto">
                      Thank you for reaching out. Our team will contact you within 24 hours to schedule your free inspection.
                    </p>
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-accent-400 fill-accent-400" />)}
                    </div>
                    <button onClick={() => setStatus('idle')}
                      className="px-6 py-3 rounded-xl glass border border-charcoal-700 hover:border-primary-500/30 text-white font-medium transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {estimate && <div className="rounded-xl border border-accent-300/20 bg-accent-300/5 p-4 text-sm text-accent-100"><span className="block text-xs uppercase tracking-widest text-accent-300">Your planning estimate</span><span className="mt-1 block">{estimate}</span></div>}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-xl text-white">Inspection Request Form</h3>
                      <span className="px-3 py-1 rounded-full bg-success-500/10 border border-success-500/20 text-xs font-medium text-success-400 font-mono">
                        100% FREE
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">Full Name</label>
                      <input type="text" required value={form.name}
                        onChange={handleNameChange}
                        className={`${inputClass} ${nameError ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                        placeholder="John Smith" />
                      {nameError && (
                        <p className="mt-1.5 text-xs text-red-400 font-medium">{nameError}</p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">Email</label>
                        <input type="email" required value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={inputClass} placeholder="john@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">Phone</label>
                        <input type="tel" required value={form.phone}
                          onChange={handlePhoneChange}
                          inputMode="tel"
                          className={`${inputClass} ${phoneError ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' : ''}`}
                          placeholder="(555) 000-0000" />
                        {phoneError && (
                          <p className="mt-1.5 text-xs text-red-400 font-medium">{phoneError}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">Property Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Residential', 'Commercial'].map((type) => (
                          <button key={type} type="button"
                            onClick={() => setForm({ ...form, propertyType: type })}
                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              form.propertyType === type
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-charcoal-980/60 text-charcoal-300 border border-charcoal-800 hover:border-charcoal-700'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">Tell Us About Your Roof</label>
                      <textarea value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} resize-none`} rows={4}
                        placeholder="Describe the issue or what you're looking for..." />
                    </div>

                    <MagneticButton type="submit" disabled={status === 'loading'} className="w-full px-6 py-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-xl shadow-primary-500/30 hover:shadow-primary-500/60 disabled:opacity-70 border-beam"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Request Free Inspection</>
                      )}
                    </MagneticButton>
                    <p className="text-xs text-center text-charcoal-500 font-mono">
                      We typically respond within 24 hours. Your information is never shared.
                    </p>
                  </form>
                )}
              </div>
            </BorderBeam>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

