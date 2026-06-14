import { PageId } from '../types';
import { ShieldCheck, Activity, Terminal, ArrowRight } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import CyberTechBackground from './CyberTechBackground';
import EtechLogo from './EtechLogo';

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
    <section className="relative min-h-[90vh] flex items-center justify-center pt-40 sm:pt-44 md:pt-48 pb-16 px-6 overflow-hidden bg-[#0a0a0c]">
      {/* Dynamic Background Image with Overlay & Mesh Grid */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80"
          alt="E-Tech Solutions Secure Cyber Datacenter Grid"
          className="w-full h-full object-cover filter brightness-[0.06] contrast-125"
        />
        {/* Subtle Structural Work Grid Overlay */}
        <div className="absolute inset-0 bg-grid-mesh-gray opacity-10 pointer-events-none" />

        {/* Floating advanced interactive cyber tech and circuit background */}
        <CyberTechBackground />
        
        {/* Animated Background Orbs / Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Neon Red Orb 1 */}
          <motion.div 
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -60, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-red-650/15 rounded-full filter blur-[100px] pointer-events-none"
          />
          {/* Intense Crimson Orb 2 */}
          <motion.div 
            animate={{
              x: [0, -90, 60, 0],
              y: [0, 80, -70, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-red/10 rounded-full filter blur-[120px] pointer-events-none"
          />
          {/* Soft Dark Amber/Red Orb 3 */}
          <motion.div 
            animate={{
              x: [0, 50, -60, 0],
              y: [0, 90, -40, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/2 left-2/3 w-[300px] h-[300px] bg-[#ff333d]/5 rounded-full filter blur-[90px] pointer-events-none"
          />
        </div>

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
        
        {/* Overlay Gradients to maximize contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/85 to-[#0a0a0c]/90 pointer-events-none" />
      </div>

      {/* Hero Content Box with maximized contrast padding */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Dynamic Entry Landing Page E-Tech Solutions Logo Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="mb-5 cursor-pointer relative group"
        >
          <EtechLogo size={92} className="filter drop-shadow-[0_0_20px_rgba(229,9,20,0.4)]" />
        </motion.div>

        {/* Trust badge with absolute high contrast colors */}
        <div className="inline-flex items-center gap-2 bg-red-600 px-5 py-2 rounded-full text-xs font-sans font-bold tracking-widest uppercase mb-7 shadow-[0_5px_20px_rgba(229,9,20,0.45)] border border-red-400/40">
          <ShieldCheck size={14} className="text-white shrink-0 animate-pulse" />
          <span className="text-white">
            {language === 'si' 
              ? 'විශ්වාසදායක තොරතුරු තාක්ෂණ සහකරු // ස්ථාපිත 2012' 
              : 'TRUSTED IT PARTNER & SYSTEM INTEGRATOR // ESTD 2012'}
          </span>
        </div>

        {/* Hero Title with corporate authority font pairing */}
        <motion.h1 
          className="font-display font-black text-4.5xl sm:text-5.5xl md:text-7xl lg:text-[76px] text-white leading-[1.1] tracking-tight mb-6 max-w-4xl text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {language === 'si' ? (
            <>
              විශ්වාසදායක{' '}
              <motion.span 
                className="inline-block text-[#ff3c45] font-black drop-shadow-[0_0_25px_rgba(229,9,20,0.7)]"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(229,9,20,0.3)",
                    "0 0 35px rgba(229,9,20,0.8)",
                    "0 0 20px rgba(229,9,20,0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                තොරතුරු තාක්ෂණ පද්ධති සහ සයිබර් ආරක්ෂණ විසඳුම්
              </motion.span>
            </>
          ) : (
            <>
              <motion.span
                className="inline-block mr-2"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              >
                Enterprise-Grade
              </motion.span>
              <motion.span 
                className="inline-block text-[#ff3c45] font-black drop-shadow-[0_0_25px_rgba(229,9,20,0.7)]"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)",
                  textShadow: [
                    "0 0 20px rgba(229,9,20,0.4)",
                    "0 0 35px rgba(229,9,20,0.85)",
                    "0 0 20px rgba(229,9,20,0.4)"
                  ]
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.6 },
                  filter: { duration: 0.8, delay: 0.6 },
                  textShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                IT Infrastructure & Cybersecurity
              </motion.span>
            </>
          )}
        </motion.h1>

        {/* Brand Voice with high contrast text sizing */}
        <p className="text-lg sm:text-xl md:text-[21px] text-zinc-50 font-semibold leading-relaxed mb-8 max-w-3.5xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] font-sans">
          {language === 'si' 
            ? 'අපි ව්‍යාපාර සඳහා වෘත්තීය මෘදුකාංග සංවර්ධනය, ආරක්ෂිත ජාලකරණය, කාර්යක්ෂම pfSense ෆයර්වෝල් පද්ධති, අව්‍යාජ මෘදුකාංග බලපත්‍ර සැපයීම සහ තොරතුරු තාක්ෂණ උපදේශනය ඇතුළු උපරිම තාක්ෂණික විසඳුම් ලබා දෙන්නෙමු.'
            : 'We provide end-to-end technology solutions, including custom web application development, secure office networks, enterprise-grade firewalls, genuine business licensing, and strategic ICT procurement.'}
        </p>

        <blockquote className="text-base sm:text-lg italic font-serif text-white tracking-wide max-w-3xl mb-10 border-l-4 border-red-500 pl-6 py-4.5 px-6 bg-black/85 rounded-r-lg border border-y-white/20 border-r-white/20 shadow-2xl backdrop-blur-md relative z-20 mx-auto text-center">
          {language === 'si'
            ? '"2012 වසරේ සිට ශ්‍රී ලංකාවේ ප්‍රමුඛතම රාජ්‍ය ආයතන, ආයතනික සමාගම් සහ ව්‍යවසායකයින් සඳහා උසස් තොරතුරු තාක්ෂණ සේවාවන් සාර්ථකව සැපයීමේ පුරෝගාමියා."'
            : '"Partnering with Sri Lanka\'s premier government departments, corporate groups, and growing enterprise ecosystems to build fast, secure, and compliant ICT systems since 2012."'}
        </blockquote>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20">
          <button
            onClick={() => handleCTA('contact')}
            className="group bg-red-600 hover:bg-red-500 text-white text-sm font-bold px-8 py-4.5 rounded shadow-2xl shadow-red-600/40 transform hover:-translate-y-0.5 tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-500"
          >
            <span>{t.requestQuote}</span>
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => handleCTA('services')}
            className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-600 hover:border-red-500 text-sm font-bold px-8 py-4.5 rounded tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl backdrop-blur-md"
          >
            {t.viewServices}
          </button>
          
          <a
            href="https://wa.me/94722121000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white border border-green-500/50 text-sm font-bold px-8 py-4.5 rounded tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-2xl"
          >
            <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping" />
            {language === 'si' ? 'විශේෂඥයෙකු හා සම්බන්ධ වන්න' : 'Talk to an Expert'}
          </a>
        </div>

        {/* Floating Trust stats banner with excellent text readability */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border border-zinc-800/80 mt-16 max-w-4xl text-left bg-black/60 backdrop-blur-md rounded-xl p-6 shadow-2xl">
          <div className="flex items-start gap-2.5 border-r border-zinc-800/80 lg:px-4">
            <span className="text-3xl sm:text-4xl font-display font-black text-red-500 drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
              <AnimatedCounter end={14} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-300 tracking-wider font-bold">
                {language === 'si' ? 'වසර ගණන' : 'Years of'}
              </p>
              <p className="text-xs sm:text-sm text-white font-bold">
                {language === 'si' ? 'ලාංකික අත්දැකීම්' : 'Sri Lankan Experience'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-zinc-800/80 lg:px-4">
            <span className="text-3xl sm:text-4xl font-display font-black text-red-500 drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
              <AnimatedCounter end={450} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-300 tracking-wider font-bold">
                {language === 'si' ? 'ව්‍යාපෘති' : 'Projects'}
              </p>
              <p className="text-xs sm:text-sm text-white font-bold">
                {language === 'si' ? 'සාර්ථකව නිමකල' : 'Successfully Completed'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 border-r border-zinc-800/80 lg:px-4">
            <span className="text-3xl sm:text-4xl font-display font-black text-red-500 drop-shadow-[0_0_15px_rgba(229,9,20,0.4)]">
              <AnimatedCounter end={20} />+
            </span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-300 tracking-wider font-bold">
                {language === 'si' ? 'කර්මාන්ත' : 'Industries'}
              </p>
              <p className="text-xs sm:text-sm text-white font-bold">
                {language === 'si' ? 'ප්‍රාදේශීය සහාය' : 'Supported Regionally'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 lg:px-4">
            <span className="text-3xl sm:text-4xl font-display font-black text-red-500 drop-shadow-[0_0_15px_rgba(229,9,20,0.4)] font-black">SLA</span>
            <div>
              <p className="text-[11px] font-mono uppercase text-zinc-300 tracking-wider font-bold">
                {language === 'si' ? 'ප්‍රතිචාරය' : 'Response'}
              </p>
              <p className="text-xs sm:text-sm text-white font-bold">
                {language === 'si' ? 'ගිවිසුම්ගතව සහතිකයි' : 'Guaranteed Under Contract'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
