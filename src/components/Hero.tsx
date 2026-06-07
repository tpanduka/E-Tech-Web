import { PageId } from '../types';
import { ShieldCheck, Activity, Terminal, ArrowRight } from 'lucide-react';

interface HeroProps {
  setActivePage: (page: PageId) => void;
}

export default function Hero({ setActivePage }: HeroProps) {
  const handleCTA = (page: PageId) => {
    setActivePage(page);
    // Smooth scroll to target area if needed
    const element = document.getElementById('main-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 px-6 overflow-hidden bg-gradient-black-pure">
      {/* Dynamic Background Image with Overlay & Mesh Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
          alt="E-Tech Solutions Secure Cyber Datacenter Grid"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-110"
        />
        {/* Subtle Structural Work Grid Overlay */}
        <div className="absolute inset-0 bg-grid-mesh-gray opacity-70" />
        
        {/* White Gradient Laser Lines running vertically and horizontally */}
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent overflow-hidden">
          <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scan-h-1" />
        </div>
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan-h-2" />
        </div>
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent overflow-hidden">
          <div className="w-full h-1/3 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-scan-v-1" />
        </div>
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent overflow-hidden">
          <div className="w-full h-1/4 bg-gradient-to-b from-transparent via-white/40 to-transparent animate-scan-v-1 [animation-delay:3.5s]" />
        </div>
        
        {/* Real Red Glowing Overlay Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-red/15 rounded-full filter blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-brand-red/10 rounded-full filter blur-[150px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black/90 pointer-events-none" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Glow badge with structured technical framing */}
        <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/35 px-4 py-1.5 rounded-sm text-brand-red text-[11px] font-mono font-medium tracking-widest uppercase mb-6 animate-pulse">
          <Terminal size={12} className="text-brand-red shrink-0" />
          <span>COORDS // 6.8741° N, 79.9015° E — SRILANKAN OPERATIONS</span>
        </div>

        {/* Hero Title with corporate authority font pairing */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.12] tracking-tight mb-6 max-w-4xl text-center">
          Engineered <span className="text-brand-red drop-shadow-[0_0_15px_rgba(229,9,20,0.5)]">ICT Systems & Cybersecurity</span>. Sourced, Configured & Audited.
        </h1>

        {/* Brand Voice / Mission statement pairing using elegant italic font-serif */}
        <p className="text-sm sm:text-base md:text-lg text-brand-muted leading-relaxed mb-6 max-w-3xl font-sans">
          E-Tech Solutions delivers bespoke software builds, secure subnet routing, pfSense firewalls, compliant multi-platform licensing, and independent consultancy.
        </p>

        <blockquote className="text-sm sm:text-base italic font-serif text-white tracking-wide max-w-2xl mb-10 border-l-2 border-brand-red pl-4 text-left sm:text-center bg-brand-charcoal/40 py-3.5 pr-4 rounded-r-md backdrop-blur-sm">
          "Pioneering premium ICT frameworks for Sri Lanka's leading governmental offices, dynamic corporate groups, and secure SME ecosystems since 2012."
        </blockquote>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => handleCTA('contact')}
            className="group bg-brand-red hover:bg-[#ff1a22] text-white text-sm font-bold px-7 py-4 rounded shadow-xl shadow-brand-red/30 transform hover:-translate-y-0.5 tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Request a Quote</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleCTA('services')}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-brand-red/50 text-sm font-bold px-7 py-4 rounded tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-sm"
          >
            Explore Our Services
          </button>

          <a
            href="https://wa.me/94752121000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600/10 hover:bg-green-600/20 text-white border border-green-600/30 text-sm font-bold px-7 py-4 rounded tracking-wide uppercase transition-all flex items-center justify-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping" />
            Talk to an Expert
          </a>
        </div>

        {/* Floating Trust stats banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t border-b border-white/5 py-6 mt-16 max-w-4xl text-left bg-brand-black/40 backdrop-blur-sm rounded-lg px-4">
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">14+</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-brand-muted tracking-wider">Years of</p>
              <p className="text-xs text-white font-medium">Sri Lankan Experience</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">450+</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-brand-muted tracking-wider">Projects</p>
              <p className="text-xs text-white font-medium">Successfully Completed</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">20+</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-brand-muted tracking-wider">Industries</p>
              <p className="text-xs text-white font-medium">Supported Regionally</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">SLA</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-brand-muted tracking-wider">Response</p>
              <p className="text-xs text-white font-medium">Guaranteed Under Contract</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
