import { Shield, BadgeCheck, Award, Star, Building2, Wrench } from 'lucide-react';
import Reveal from './Reveal';

const badges = [
  { icon: Shield, label: 'Licensed & Insured', status: 'ACTIVE' },
  { icon: BadgeCheck, label: 'GAF Certified Installer', status: 'VERIFIED' },
  { icon: Award, label: 'BBB A+ Rated', status: 'ACCREDITED' },
  { icon: Star, label: '4.9/5 Customer Rating', status: 'LIVE' },
  { icon: Building2, label: 'Commercial Specialists', status: 'CERTIFIED' },
  { icon: Wrench, label: '25-Year Warranty', status: 'BACKED' },
];

export default function TrustStrip() {
  return (
    <section className="relative py-8 border-y border-charcoal-800/40 bg-charcoal-980/80 overflow-hidden">
      {/* Neon top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px neon-line" />
      <div className="absolute bottom-0 left-0 right-0 h-px neon-line" />

      <Reveal className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex flex-col items-center gap-2.5 text-center group">
                {/* Biometric pulse */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-success-500/20 animate-ripple" />
                  <div className="absolute inset-0 rounded-xl bg-success-500/10 animate-ripple" style={{ animationDelay: '0.5s' }} />
                  <div className="relative w-12 h-12 rounded-xl glass-titanium border border-charcoal-700/50 flex items-center justify-center group-hover:border-success-500/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                </div>
                <span className="text-xs font-medium text-charcoal-400 group-hover:text-charcoal-200 transition-colors">{badge.label}</span>
                <span className="text-[9px] font-mono text-success-400 uppercase tracking-widest">{badge.status}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
