import { useMemo, useState } from 'react';
import { ArrowRight, Calculator, Check } from 'lucide-react';
import Reveal from './Reveal';

const materials = [
  { name: 'Architectural asphalt', low: 8, high: 13 },
  { name: 'Standing seam metal', low: 14, high: 24 },
  { name: 'Composite / slate', low: 18, high: 32 },
];

export default function Estimator() {
  const [size, setSize] = useState(2200);
  const [complexity, setComplexity] = useState(1);
  const [material, setMaterial] = useState(0);
  const range = useMemo(() => {
    const roofArea = size * 1.25;
    const factor = complexity === 0 ? 0.9 : complexity === 2 ? 1.3 : 1;
    const selected = materials[material];
    const format = (value: number) => Math.round(value / 500) * 500;
    return [format(roofArea * selected.low * factor), format(roofArea * selected.high * factor)];
  }, [size, complexity, material]);

  const goToContact = () => {
    sessionStorage.setItem('roof-estimate', `Planning range: $${range[0].toLocaleString()}–$${range[1].toLocaleString()}; approx. ${size.toLocaleString()} sq ft; ${materials[material].name}; ${['Simple', 'Typical', 'Complex'][complexity]} roof pitch.`);
    window.location.hash = 'contact';
    window.dispatchEvent(new CustomEvent('roof-estimate-ready'));
  };

  return (
    <section id="estimator" className="relative overflow-hidden border-y border-charcoal-800/40 bg-[#0b0d0f] py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="self-center">
          <span className="font-mono text-sm font-semibold uppercase tracking-widest text-accent-300">Project planning</span>
          <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Get a starting range for your roof</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal-300">A few details can help you plan your next conversation with a roofer. Adjust the options to see a preliminary project range.</p>
          <p className="mt-4 text-sm leading-relaxed text-charcoal-500">Planning estimate only. Actual costs depend on measured roof area, tear-off, access, materials, code requirements, and site conditions. This is not a quote or offer.</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-2xl sm:p-8">
            <div className="mb-7 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-300/10 text-accent-300"><Calculator className="h-5 w-5" /></span><div><p className="font-display font-bold text-white">Roof project estimator</p><p className="text-sm text-charcoal-500">Step 1 of 3 · Customize your assumptions</p></div></div>
            <label className="mb-2 block text-sm font-medium text-charcoal-200" htmlFor="roof-size">Home size · {size.toLocaleString()} sq ft</label>
            <input id="roof-size" type="range" min="1000" max="5000" step="100" value={size} onChange={(event) => setSize(Number(event.target.value))} className="w-full accent-amber-300" />
            <fieldset className="mt-6"><legend className="mb-3 text-sm font-medium text-charcoal-200">Roof complexity</legend><div className="grid grid-cols-3 gap-2">{['Simple', 'Typical', 'Complex'].map((item, index) => <button key={item} type="button" onClick={() => setComplexity(index)} className={`rounded-xl border px-3 py-3 text-sm transition ${complexity === index ? 'border-accent-300/50 bg-accent-300/10 text-accent-200' : 'border-white/10 text-charcoal-400 hover:text-white'}`}>{complexity === index && <Check className="mr-1 inline h-3.5 w-3.5" />}{item}</button>)}</div></fieldset>
            <fieldset className="mt-6"><legend className="mb-3 text-sm font-medium text-charcoal-200">Material preference</legend><div className="space-y-2">{materials.map((item, index) => <button key={item.name} type="button" onClick={() => setMaterial(index)} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${material === index ? 'border-accent-300/50 bg-accent-300/10 text-white' : 'border-white/10 text-charcoal-400 hover:text-white'}`}><span>{item.name}</span>{material === index && <Check className="h-4 w-4 text-accent-300" />}</button>)}</div></fieldset>
            <div className="mt-7 rounded-2xl border border-white/[0.06] bg-black/20 p-5"><p className="text-xs font-mono uppercase tracking-widest text-charcoal-500">Preliminary investment range</p><p className="mt-2 font-display text-3xl font-bold tracking-tight text-white">${range[0].toLocaleString()} <span className="text-charcoal-500">–</span> ${range[1].toLocaleString()}</p></div>
            <button type="button" onClick={goToContact} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-300 px-5 py-4 font-semibold text-charcoal-980 transition hover:bg-accent-200">Discuss this range <ArrowRight className="h-4 w-4" /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
