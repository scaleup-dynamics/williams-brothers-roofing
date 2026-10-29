import {
  Home, Building2, Wrench, ShieldCheck, Droplets, Wind, ArrowRight,
} from 'lucide-react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import BorderBeam from './BorderBeam';

const services = [
  { icon: Home, title: 'Residential Roofing', description: 'Complete roof installations, replacements, and repairs for homes of every size and style.', features: ['Asphalt & metal shingles', 'Tile & slate roofing', 'Gutter installation'], image: 'https://images.pexels.com/photos/10848297/pexels-photo-10848297.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { icon: Building2, title: 'Commercial Roofing', description: 'Flat and low-slope roofing systems engineered for commercial buildings and warehouses.', features: ['TPO & EPDM systems', 'Flat roof coatings', 'Maintenance contracts'], image: 'https://images.pexels.com/photos/18289258/pexels-photo-18289258.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { icon: Wrench, title: 'Roof Repairs', description: 'Fast, reliable repairs for leaks, storm damage, missing shingles, and flashing failures.', features: ['Leak detection', 'Storm damage repair', 'Emergency tarping'], image: 'https://images.pexels.com/photos/17680685/pexels-photo-17680685.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { icon: ShieldCheck, title: 'Roof Inspections', description: 'Thorough inspections with detailed reports and photo documentation for total transparency.', features: ['Free initial inspection', 'Insurance assessments', 'Drone survey available'], image: 'https://images.pexels.com/photos/16587704/pexels-photo-16587704.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { icon: Droplets, title: 'Gutter Systems', description: 'Seamless gutter installation and repair to protect your foundation and landscaping.', features: ['Seamless aluminum', 'Gutter guards', 'Downspout routing'], image: 'https://images.pexels.com/photos/5225014/pexels-photo-5225014.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { icon: Wind, title: 'Storm Restoration', description: 'Rapid response storm restoration with direct insurance billing to simplify your claim.', features: ['Hail & wind damage', 'Insurance claim help', '24/7 emergency service'], image: 'https://images.pexels.com/photos/8576025/pexels-photo-8576025.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary-900/8 blur-[120px]" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest font-mono">What We Do</span>
          <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight text-balance">
            Complete Roofing Solutions for Every Property
          </h2>
          <p className="mt-4 text-charcoal-400 text-lg leading-relaxed">
            From single-family homes to commercial facilities, we deliver craftsmanship that stands up to the elements year after year.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 80}>
                <TiltCard max={5}>
                  <BorderBeam className="rounded-2xl">
                    <div className="relative glass-titanium rounded-2xl overflow-hidden h-full border border-white/5 hover:border-primary-500/20 transition-colors duration-400">
                      <div className="relative h-40 overflow-hidden">
                        <img src={service.image} alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
                        <div className="absolute -bottom-7 left-6">
                          <div className="w-14 h-14 rounded-2xl glass-dark border border-primary-500/30 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-primary-500/50 transition-all duration-300">
                            <Icon className="w-7 h-7 text-primary-400" strokeWidth={2} />
                          </div>
                        </div>
                      </div>
                      <div className="p-7 pt-10">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-display font-bold text-xl text-white">{service.title}</h3>
                          <span className="text-xs font-mono font-bold text-charcoal-600 group-hover:text-primary-400 transition-colors">0{i + 1}</span>
                        </div>
                        <p className="text-charcoal-400 text-sm leading-relaxed mb-5">{service.description}</p>
                        <ul className="space-y-2.5">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2.5 text-sm text-charcoal-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 pt-5 border-t border-charcoal-800/40">
                          <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors group/link">
                            Learn More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </BorderBeam>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
