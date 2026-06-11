import { PageId } from '../types';
import { ShieldCheck, Activity, Terminal, ArrowRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  setActivePage: (page: PageId) => void;
}

export default function Hero({ setActivePage }: HeroProps) {
  const { language, t } = useLanguage();
  
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
    <section className="relative min-h-[90vh] flex items-center justify-center pt-40 sm:pt-44 md:pt-48 pb-16 px-6 overflow-hidden bg-gradient-black-pure">
      {/* Dynamic Background Image with Overlay & Mesh Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
          alt="E-Tech Solutions Secure Cyber Datacenter Grid"
          className="w-full h-full object-cover filter brightness-[0.22] contrast-110"
        />
        {/* Subtle Structural Work Grid Overlay */}
        <div className="absolute inset-0 bg-grid-mesh-gray opacity-30" />
        
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
        {/* Trust badge with high contrast visibility */}
        <div className="inline-flex items-center gap-2 bg-brand-red px-4.5 py-1.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase mb-6 shadow-[0_4px_12px_rgba(229,9,20,0.3)] border border-white/20">
          <ShieldCheck size={13} className="text-white shrink-0" />
          <span className="text-white">
            {language === 'si' 
              ? 'විශ්වාසදායක තොරතුරු තාක්ෂණ සහකරු // ස්ථාපිත 2012' 
              : 'TRUSTED IT PARTNER & SYSTEM INTEGRATOR // ESTD 2012'}
          </span>
        </div>

        {/* Hero Title with corporate authority font pairing */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.15] tracking-tight mb-6 max-w-4xl text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          {language === 'si' ? (
            <>
              විශ්වාසදායක <span className="text-brand-red drop-shadow-[0_0_20px_rgba(229,9,20,0.6)] font-extrabold">තොරතුරු තාක්ෂණ පද්ධති සහ සයිබර් ආරක්ෂණ විසඳුම්</span>
            </>
          ) : (
            <>
              Enterprise-Grade <span className="text-brand-red drop-shadow-[0_0_20px_rgba(229,9,20,0.6)] font-extrabold">IT Infrastructure & Cybersecurity</span>
            </>
          )}
        </h1>

        {/* Brand Voice with high contrast text sizing */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-100 font-medium leading-relaxed mb-8 max-w-3xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] font-sans">
          {language === 'si' 
            ? 'අපි ව්‍යාපාර සඳහා වෘත්තීය මෘදුකාංග සංවර්ධනය, ආරක්ෂිත ජාලකරණය, කාර්යක්ෂම pfSense ෆයර්වෝල් පද්ධති, අව්‍යාජ මෘදුකාංග බලපත්‍ර සැපයීම සහ තොරතුරු තාක්ෂණ උපදේශනය ඇතුළු උපරිම තාක්ෂණික විසඳුම් ලබා දෙන්නෙමු.'
            : 'We provide end-to-end technology solutions, including custom web application development, secure office networks, enterprise-grade firewalls, genuine business licensing, and strategic ICT procurement.'}
        </p>

        <blockquote className="text-base sm:text-lg italic font-serif text-white tracking-wide max-w-3xl mb-10 border-l-4 border-brand-red pl-6 py-4.5 px-6 bg-zinc-950/95 rounded-r-lg border border-y-white/10 border-r-white/10 shadow-3xl backdrop-blur-md relative z-20 mx-auto text-center">
          {language === 'si'
            ? '"2012 වසරේ සිට ශ්‍රී ලංකාවේ ප්‍රමුඛතම රාජ්‍ය ආයතන, ආයතනික සමාගම් සහ ව්‍යවසායකයින් සඳහා උසස් තොරතුරු තාක්ෂණ සේවාවන් සාර්ථකව සැපයීමේ පුරෝගාමියා."'
            : '"Partnering with Sri Lanka\'s premier government departments, corporate groups, and growing enterprise ecosystems to build fast, secure, and compliant ICT systems since 2012."'}
        </blockquote>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20">
          <button
            onClick={() => handleCTA('contact')}
            className="group bg-brand-red hover:bg-[#ff1a22] text-white text-sm font-bold px-7 py-4 rounded shadow-xl shadow-brand-red/35 transform hover:-translate-y-0.5 tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.requestQuote}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleCTA('services')}
            className="bg-stone-900/95 hover:bg-stone-850 text-white border border-white/30 hover:border-brand-red/60 text-sm font-bold px-7 py-4 rounded tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg backdrop-blur-sm"
          >
            {t.viewServices}
          </button>
          
          <a
            href="https://wa.me/94722121000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600/20 hover:bg-green-600/30 text-white border border-green-600/50 text-sm font-bold px-7 py-4 rounded tracking-wide uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping" />
            {language === 'si' ? 'විශේෂඥයෙකු හා සම්බන්ධ වන්න' : 'Talk to an Expert'}
          </a>
        </div>

        {/* Floating Trust stats banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t border-b border-white/5 py-6 mt-16 max-w-4xl text-left bg-black/40 backdrop-blur-sm rounded-lg px-4">
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">
              <AnimatedCounter end={14} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                {language === 'si' ? 'වසර ගණන' : 'Years of'}
              </p>
              <p className="text-xs text-stone-100 font-medium">
                {language === 'si' ? 'ලාංකික අත්දැකීම්' : 'Sri Lankan Experience'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">
              <AnimatedCounter end={450} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                {language === 'si' ? 'ව්‍යාපෘති' : 'Projects'}
              </p>
              <p className="text-xs text-stone-100 font-medium">
                {language === 'si' ? 'සාර්ථකව නිමකල' : 'Successfully Completed'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-white/5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">
              <AnimatedCounter end={20} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                {language === 'si' ? 'කර්මාන්ත' : 'Industries'}
              </p>
              <p className="text-xs text-stone-100 font-medium">
                {language === 'si' ? 'ප්‍රාදේශීය සහාය' : 'Supported Regionally'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 lg:px-4">
            <span className="text-2xl sm:text-3xl font-display font-bold text-brand-red">SLA</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                {language === 'si' ? 'ප්‍රතිචාරය' : 'Response'}
              </p>
              <p className="text-xs text-stone-100 font-medium">
                {language === 'si' ? 'ගිවිසුම්ගතව සහතිකයි' : 'Guaranteed Under Contract'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
