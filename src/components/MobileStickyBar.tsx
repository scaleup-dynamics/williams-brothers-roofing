import { Phone, CalendarCheck } from 'lucide-react';
import { site } from '@/config/site';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-charcoal-980/90 backdrop-blur-xl border-t border-white/10 lg:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${site.phoneHref}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-800 border border-white/10 text-white font-semibold text-sm hover:bg-charcoal-700 transition active:scale-[0.98]"
        >
          <Phone className="w-4 h-4 text-primary-400" />
          <span>Call Now</span>
        </a>
        <a
          href="#contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 shadow-lg shadow-primary-500/25 transition active:scale-[0.98]"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Free Estimate</span>
        </a>
      </div>
    </div>
  );
}
