export default function HolographicSeal({ label = '100% FREE', sub = 'No Obligation' }: { label?: string; sub?: string }) {
  return (
    <div className="relative inline-flex items-center gap-3 group">
      {/* Spinning conic gradient ring */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <div className="absolute inset-0 rounded-full holo-seal opacity-80" />
        <div className="absolute inset-[2px] rounded-full bg-charcoal-980 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full noise-bg overflow-hidden" />
          <div className="text-center relative z-10">
            <div className="text-[9px] font-display font-extrabold text-white leading-tight animate-flicker">{label}</div>
            <div className="text-[7px] text-charcoal-400 uppercase tracking-wider mt-0.5">{sub}</div>
          </div>
        </div>
        {/* Scan line */}
        <div className="absolute inset-[2px] rounded-full overflow-hidden pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scan" />
        </div>
      </div>
      {/* Hologram text */}
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-mono text-primary-300 tracking-wider animate-hologram">VERIFIED SEAL</span>
        <span className="text-[10px] text-charcoal-500 font-mono">SECURED · ENCRYPTED</span>
      </div>
    </div>
  );
}
