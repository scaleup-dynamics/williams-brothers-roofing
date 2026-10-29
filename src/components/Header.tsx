import { useEffect, useState } from 'react';
import { Home, Menu, X, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { site } from '@/config/site';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    handle();
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden md:block bg-charcoal-980 border-b border-charcoal-800/30 text-xs text-charcoal-400 relative z-50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary-400" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-primary-400" /> {site.email}
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary-400" /> {site.hours}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-success-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success-500" />
              </span>
              Top-Rated 4.9★ Google Local Contractor
            </span>
            <span className="text-charcoal-600">|</span>
            <span className="text-charcoal-300">{site.serviceArea}</span>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-0 bg-charcoal-980/85 backdrop-blur-2xl border-b border-charcoal-800/40 py-3'
            : 'top-0 md:top-[37px] bg-transparent py-5'
        }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
              <Home className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                Williams <span className="text-primary-400">Brothers</span>
              </span>
              <span className="text-[10px] text-charcoal-400 font-mono tracking-widest uppercase mt-0.5">
                Roofing LLC &bull; Plano, TX
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium text-charcoal-200 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${site.phoneHref}`}
              className="flex items-center gap-2.5 text-sm text-charcoal-200 hover:text-white transition-colors"
            >
              <div className="w-9 h-9 rounded-lg glass border border-primary-500/20 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary-400" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-charcoal-500 uppercase tracking-wider font-mono">Call Us</span>
                <span className="text-white font-semibold">{site.phone}</span>
              </div>
            </a>
            <a href="#contact"
              className="group relative px-6 py-3 rounded-xl overflow-hidden bg-primary-500 text-white text-sm font-semibold transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/60 hover:-translate-y-0.5 border-beam"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Free Inspection
                <ChevronRight className="w-4 h-4" />
              </span>
            </a>
          </div>

          <button className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-1 px-6 pb-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="py-3 text-charcoal-200 hover:text-white border-b border-charcoal-800/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3.5 rounded-xl bg-primary-500 text-white text-center font-semibold shadow-lg shadow-primary-500/30"
            >
              Request Free Inspection
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
