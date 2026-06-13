import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, ProjectItem } from './types';
import {
  SERVICES_DATA,
  PORTFOLIO_PROJECTS,
  FAQS_DATA,
  WHY_CHOOSE_US_POINTS,
  INDUSTRIES_SERVED
} from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DataConsent from './components/DataConsent';
import Hero from './components/Hero';
import QuoteForm from './components/QuoteForm';
import ServiceDetailView from './components/ServiceDetailView';
import ClientSuccessCarousel from './components/ClientSuccessCarousel';
import AnimatedCounter from './components/AnimatedCounter';
import ParticleBackground from './components/ParticleBackground';
import EtechLogo from './components/EtechLogo';
import {
  Shield, Check, Phone, Mail, MapPin, ExternalLink, ArrowRight, ArrowUp,
  TrendingUp, Award, Building, HeartHandshake, Users, Info, HelpCircle,
  Laptop, Cpu, Network, CheckCircle2, ChevronDown, Camera, QrCode, Download,
  Smartphone, Database
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState<'midnight' | 'slate-blue'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('etech_theme');
        if (stored === 'slate-blue') return 'slate-blue';
      } catch (err) {
        console.warn('Storage blocked in sandboxed iframe:', err);
      }
    }
    return 'midnight';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'slate-blue') {
      root.setAttribute('data-theme', 'slate-blue');
      root.classList.add('theme-slate-blue');
    } else {
      root.setAttribute('data-theme', 'midnight');
      root.classList.remove('theme-slate-blue');
    }
    try {
      localStorage.setItem('etech_theme', theme);
    } catch (err) {
      console.warn('Unable to write to storage in sandbox:', err);
    }
  }, [theme]);

  const [activePage, setActivePage] = useState<PageId>('home');
  const [pdpaVerified, setPdpaVerified] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('etech_pdpa_verified');
        if (stored === 'true') return true;
      } catch (err) {
        console.warn('Storage blocked in sandboxed iframe:', err);
      }
    }
    return false;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll-to-top button if user scrolls down past 500px threshold (past hero view)
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerifyPdpa = () => {
    try {
      sessionStorage.setItem('etech_pdpa_verified', 'true');
    } catch (err) {
      console.warn('Unable to write to storage in sandbox:', err);
    }
    setPdpaVerified(true);
  };

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [labTab, setLabTab] = useState<'levels' | 'families' | 'roadmap' | 'deliverables'>('levels');

  // Dynamic QR Code States and helper functions
  const [qrMode, setQrMode] = useState<'vcard' | 'tel' | 'mail'>('vcard');
  const [downloadingContact, setDownloadingContact] = useState(false);

  const triggerVCardDownload = () => {
    setDownloadingContact(true);
    try {
      const vCardText = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:E-Tech Solutions\r\nORG:E-Tech Solutions Sri Lanka\r\nTEL;TYPE=WORK,VOICE:+94722121000\r\nTEL;TYPE=WORK,DESK:+94112819548\r\nEMAIL;TYPE=PREF,INTERNET:etechmultisolutions@gmail.com\r\nADR;TYPE=WORK:;;72/10, Edirisinghe Road, Mirihana;Nugegoda;;Colombo;Sri Lanka\r\nURL:https://etechmultisolutions.com\r\nEND:VCARD`;
      const blob = new Blob([vCardText], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'e_tech_solutions.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => setDownloadingContact(false), 800);
  };

  // Update document title for SEO on route change
  useEffect(() => {
    let title = 'E-Tech Solutions - Complete ICT & Cybersecurity Partner';
    let metaDesc = 'Sri Lankan premier ICT consultancy. We specialize in software development, cybersecurity firewalls (pfSense), networks, and ICT procurement.';
    
    if (activePage === 'about') {
      title = 'About Us - E-Tech Solutions Sri Lanka';
    } else if (activePage === 'services') {
      title = 'Our Services Portfolio - E-Tech Solutions';
    } else if (activePage === 'portfolio') {
      title = 'Recent Projects Showcase - E-Tech Solutions';
    } else if (activePage === 'contact') {
      title = 'Request a Quote / Contact Desk - E-Tech Solutions';
    } else if (activePage !== 'home') {
      const svc = SERVICES_DATA.find((s) => s.id === activePage);
      if (svc) {
        title = `${svc.title} - E-Tech Solutions`;
      }
    }

    document.title = title;
    
    // Smooth scroll to top on navigation change
    window.scrollTo({ top: 0 });
  }, [activePage]);

  const handleServiceClick = (id: PageId) => {
    setActivePage(id);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const navTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const item = document.getElementById(sectionId);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 180);
    } else {
      const item = document.getElementById(sectionId);
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Helper for unique categories in portfolio
  const categoriesList = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web & Software' },
    { key: 'hardware', label: 'CCTV & Hardware' },
    { key: 'network', label: 'Networking Setup' },
    { key: 'cyber', label: 'Firewall & Compliance' }
  ];

  const filteredProjects = filterCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.categoryKey === filterCategory || (filterCategory === 'cyber' && p.categoryKey.includes('cyber')));

  return (
    <div className="bg-brand-black min-h-screen flex flex-col text-[var(--white)] font-sans selection:bg-brand-red selection:text-white">
      {/* Interactive PDPA Compliance Entrance Gateway Shield */}
      <AnimatePresence>
        {!pdpaVerified && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -45, scale: 0.98 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[1000] bg-[#040406] text-white flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto compliance-gateway-dark"
          >
            {/* Immersive High-Fidelity Cybersecurity & Server Grid Fullscreen Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"
                alt="Secure Enterprise Cyber Datacenter Grid"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.15] contrast-[1.12] saturate-[0.8] scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay Vignette with dark cinematic edges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-transparent to-[#040406] opacity-95" />
              <div className="absolute inset-0 bg-[#040406]/92" />
              
              {/* Structural grid mesh pattern on top of image */}
              <div className="absolute inset-0 bg-grid-mesh-gray opacity-45 pointer-events-none" />

              {/* Floating modern cyber particles */}
              <ParticleBackground color="229, 9, 20" particleCount={75} />

              {/* Glowing Ambient Lights */}
              <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-red-650/[0.06] rounded-full filter blur-[120px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-blue-900/[0.04] rounded-full filter blur-[140px]" />
              
              {/* Infinite scanning background scanner stripe */}
              <motion.div 
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-red/15 to-transparent shadow-[0_0_12px_rgba(229,9,20,0.35)]"
              />
            </div>

            <div className="relative z-10 w-full max-w-xl bg-gradient-to-b from-[#14141a] to-[#09090c] border border-[#20222a] rounded-2xl p-6 sm:p-9 shadow-[0_0_80px_rgba(0,0,0,0.95)] backdrop-blur-md overflow-hidden flex flex-col items-center text-center">
              
              {/* Corner brackets aesthetic accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-red/35" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-red/35" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-red/35" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-red/35" />

              {/* E-Tech Solutions Official Logo & Pulsating active system shield */}
              <div className="flex items-center gap-6 mb-6">
                <EtechLogo size={70} className="filter drop-shadow-[0_4px_12px_rgba(229,9,20,0.25)] hover:after:duration-300" />
                <div className="h-10 w-[1px] bg-[#1e2029]/80" />
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="w-14 h-14 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red relative"
                  >
                    <Shield size={24} className="animate-pulse" />
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full border border-[#070709]">
                    <Check size={10} className="stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Security Header */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>{t.environmentVerified}</span>
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight mb-2">
                {t.complianceGateway}
              </h1>
              
              <p className="text-[10px] font-mono tracking-widest text-brand-red uppercase font-semibold mb-5">
                {t.pdpaActiveGuard}
              </p>

              <div className="bg-[#0b0c11] rounded-xl border border-[#1e2029] p-5 text-left text-xs sm:text-sm leading-relaxed text-zinc-100 space-y-4 mb-6">
                <p className="text-zinc-200">
                  {language === 'si' ? (
                    <span>ඊ-ටෙක් සොලියුෂන්ස් (<strong className="text-white font-bold">E-Tech Solutions</strong>) නිල ඩිජිටල් වේදිකාව වෙත සාදරයෙන් පිළිගනිමු. ඩිජිටල් පාලනය සහ දත්ත සුරක්ෂිතතාවය සඳහා අපගේ කැපවීම සමඟ ඒකාබද්ධ වීමට:</span>
                  ) : (
                    <span>Welcome to the official digital platform of <strong className="text-white font-bold">E-Tech Solutions</strong>. To align with our commitment to digital governance and data safety:</span>
                  )}
                </p>
                <p className="border-l-2 border-brand-red pl-3 text-zinc-100 bg-brand-red/[0.04] py-1">
                  {t.gatewayPdpaHighlight}
                </p>
                <p className="text-zinc-200">
                  {t.gatewayNoScrapers}
                </p>
              </div>

              {/* Verified Specs Checklist */}
              <div className="w-full grid grid-cols-2 gap-2 text-[10px] sm:text-xs font-mono text-zinc-400 mb-8 border-t border-[#1e2029]/80 pt-5">
                <div className="flex items-center gap-2 bg-[#0c0d12] border border-[#1a1b21] p-2.5 rounded-lg">
                  <Check size={11} className="text-brand-red shrink-0" />
                  <span className="text-zinc-150">{t.pdpaReady}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0c0d12] border border-[#1a1b21] p-2.5 rounded-lg">
                  <Check size={11} className="text-brand-red shrink-0" />
                  <span className="text-zinc-150">{t.aesEncrypted}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0c0d12] border border-[#1a1b21] p-2.5 rounded-lg">
                  <Check size={11} className="text-brand-red shrink-0" />
                  <span className="text-zinc-150">{t.tlsCertified}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0c0d12] border border-[#1a1b21] p-2.5 rounded-lg">
                  <Check size={11} className="text-brand-red shrink-0" />
                  <span className="text-zinc-150">{t.sandboxCompliant}</span>
                </div>
              </div>

              {/* Action buttons */}
              <button
                onClick={handleVerifyPdpa}
                className="w-full relative group overflow-hidden bg-brand-red hover:bg-red-700 text-white font-mono text-xs sm:text-sm font-bold py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(229,9,20,0.3)] hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>{t.verifyAndEnter}</span>
              </button>

              <p className="text-[9px] font-mono text-brand-muted mt-3 uppercase tracking-wide">
                {t.sessionHashLabel}
              </p>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Sticky Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />

      <main className="flex-grow pt-1.5" id="main-content">
        
        {/* HOMEPAGE VIEW */}
        {activePage === 'home' && (
          <div className="flex flex-col relative w-full overflow-hidden">
            {/* Suitable Live Fullscreen Cyber Network Grid Background for the entire Landing Page */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
                alt="Cyber Infrastructure Mesh Grid Background"
                className="w-full h-full object-cover transition-all duration-700 select-none opacity-5 filter brightness-[0.88] contrast-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-black/95 via-brand-black/90 to-brand-black/95" />
              <div className="absolute inset-0 bg-grid-mesh-gray opacity-20" />
            </div>

            <div className="relative z-10 w-full flex flex-col">
              {/* 2. Hero Section */}
              <Hero setActivePage={setActivePage} />

              {/* 3. Trusted ICT Partner / Company Highlights */}
              <section className="bg-brand-black/45 backdrop-blur-sm py-20 px-6 border-b border-brand-dark-gray/30 text-center relative overflow-hidden">
                {/* Mesh background overlay */}
                <div className="absolute inset-0 bg-grid-mesh-gray opacity-10 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="h-[1px] w-8 bg-brand-red/45" />
                    <span className="text-[11px] text-brand-red font-sans uppercase font-bold tracking-widest block">
                      {language === 'si' ? 'අපගේ පසුබිම // ස්ථාපිත 2012' : 'ABOUT E-TECH SOLUTIONS // ESTD 2012'}
                    </span>
                    <span className="h-[1px] w-8 bg-brand-red/45" />
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--white)] mb-6 tracking-tight">
                    {language === 'si' ? 'ශ්‍රී ලංකාව පුරා ඩිජිටල් වර්ධනය සහ ආරක්ෂාව සැලසීම' : 'Driving Digital Growth and Security Across Sri Lanka'}
                  </h2>
                  
                  {/* Brand quotation pairing */}
                  <p className="text-base sm:text-lg font-serif italic text-stone-700 dark:text-zinc-200 max-w-2xl mx-auto leading-relaxed mb-8">
                    {language === 'si'
                      ? '"2012 වසරේ සිට, ඊ-ටෙක් සොලියුෂන්ස් ආයතනය ශ්‍රී ලංකාවේ ප්‍රමුඛතම තොරතුරු තාක්ෂණ සහ සයිබර් ආරක්ෂණ හවුල්කරුවෙකු ලෙස කටයුතු කරයි. අපි ව්‍යාපාරික පද්ධති සුරක්ෂිතව, කාර්යක්ෂමව සහ විශ්වාසදායකව පවත්වාගෙන යාමට සහය වන්නෙමු."'
                      : '"Since 2012, E-Tech Solutions has served as an integrated IT and cybersecurity partner. We deliver reliable, secure, and compliant solutions that protect digital assets and build long-term business resilience."'}
                  </p>

                  {/* High-Impact Animated Stats Grid on Scroll */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 py-8 bg-white/45 dark:bg-zinc-900/40 border border-brand-dark-gray/40 rounded-xl backdrop-blur-sm shadow-sm relative z-20">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-display font-black text-brand-red tracking-tight flex items-center justify-center text-center">
                        <AnimatedCounter end={14} />+
                      </span>
                      <span className="text-xs font-sans uppercase text-stone-700 dark:text-stone-200 tracking-wider mt-2 font-bold">{language === 'si' ? 'වසරක පළපුරුද්ද' : 'Years of Experience'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-y sm:border-y-0 sm:border-x border-brand-dark-gray/30 py-6 sm:py-0">
                      <span className="text-4xl sm:text-5xl font-display font-black text-brand-red tracking-tight flex items-center justify-center text-center">
                        <AnimatedCounter end={450} />+
                      </span>
                      <span className="text-xs font-sans uppercase text-stone-700 dark:text-stone-200 tracking-wider mt-2 font-bold">{language === 'si' ? 'සාර්ථක ව්‍යාපෘති' : 'Successful Projects'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-display font-black text-brand-red tracking-tight flex items-center justify-center text-center">
                        <AnimatedCounter end={20} />+
                      </span>
                      <span className="text-xs font-sans uppercase text-stone-700 dark:text-stone-200 tracking-wider mt-2 font-bold">{language === 'si' ? 'කර්මාන්තයන්' : 'Industries Supported'}</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-24 bg-brand-dark-gray/40 mx-auto mb-10" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4, borderColor: '#e50914' }}
                      className="bg-zinc-900/90 backdrop-blur-sm p-6 rounded-xl border border-brand-dark-gray/40 transition-all text-left flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(229,9,20,0.15)] cursor-default"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <Award className="text-brand-red group-hover:rotate-6 transition-transform" size={30} />
                          <span className="text-[10px] font-sans text-brand-red/90 font-bold uppercase tracking-wider">{language === 'si' ? 'ගුණාත්මකභාවය' : 'PROFESSIONAL INTEGRITY'}</span>
                        </div>
                        <h3 className="font-display font-bold text-white mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">
                          {language === 'si' ? 'විශ්වාසනීය ව්‍යාපාරික සදාචාරය' : 'Solid Business Trust'}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {language === 'si' 
                            ? 'අව්‍යාජ මෘදුකාංග බලපත්‍ර සැපයීම සහ විනිවිදභාවයෙන් යුතු ප්‍රසම්පාදන සේවාවන් හරහා උපරිම විශ්වාසයක් ලබා දීම.'
                            : 'Strictly aligning with genuine software licensing guidelines, transparent procurement advisories, and industry standards.'}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, y: -4, borderColor: '#e50914' }}
                      className="bg-zinc-900/90 backdrop-blur-sm p-6 rounded-xl border border-brand-dark-gray/40 transition-all text-left flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(229,9,20,0.15)] cursor-default"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <Shield className="text-brand-red group-hover:rotate-6 transition-transform" size={30} />
                          <span className="text-[10px] font-sans text-brand-red/90 font-bold uppercase tracking-wider">{language === 'si' ? 'ආරක්ෂණය' : 'BUILT-IN SECURITY'}</span>
                        </div>
                        <h3 className="font-display font-bold text-white mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">
                          {language === 'si' ? 'පූර්ණ සයිබර් ආරක්ෂණය' : 'Integrated Cybersecurity'}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {language === 'si' 
                            ? 'අපගේ සෑම විසඳුමකදීම සයිබර් ආරක්ෂණ ෆයර්වෝල් පද්ධති සහ දත්ත ආරක්ෂණ නීති (PDPA) කෙරෙහි දැඩි අවධානයක් යොමු කෙරේ.'
                            : 'Every network and software frame is fortified with custom pfSense firewalls, vulnerability checks, and local data protection compliance.'}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03, y: -4, borderColor: '#e50914' }}
                      className="bg-zinc-900/90 backdrop-blur-sm p-6 rounded-xl border border-brand-dark-gray/40 transition-all text-left flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_30px_-5px_rgba(229,9,20,0.15)] cursor-default"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <HeartHandshake className="text-brand-red group-hover:rotate-6 transition-transform" size={30} />
                          <span className="text-[10px] font-sans text-brand-red/90 font-bold uppercase tracking-wider">{language === 'si' ? 'සේවා සහය' : 'RELIABLE SLA'}</span>
                        </div>
                        <h3 className="font-display font-bold text-white mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">
                          {language === 'si' ? 'අඛණ්ඩ තාක්ෂණික සහයෝගය' : 'Contracted Maintenance'}
                        </h3>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                          {language === 'si' 
                            ? 'Annual Maintenance Contracts (AMC) මගින් අපගේ ගනුදෙනුකරුවන් සඳහා කඩිනම් සහ නොකඩවා ක්‍රියාත්මක වන සේවා සහය සහතික කරමු.'
                            : 'Offering direct Annual Maintenance Contracts (AMCs) to guarantee regular hardware tune-ups, prompt support, and network upkeep.'}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* 4. Core Services Section */}
              <section className="bg-brand-black/20 backdrop-blur-sm py-20 px-6 border-b border-brand-dark-gray/30 relative overflow-hidden">
              {/* Grid mesh backdrop */}
              <div className="absolute inset-0 bg-grid-mesh-gray opacity-10 pointer-events-none" />

              <div className="max-w-7xl mx-auto text-center relative z-10">
                <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-2">
                  {language === 'si' ? 'අපගේ ප්‍රධාන සේවා සහ විසඳුම්' : 'OUR CORE SERVICES // TAILORED SYSTEM INTEGRATIONS'}
                </span>
                <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--white)] mb-4 tracking-tight uppercase">
                  {language === 'si' ? 'විශ්වාසදායක තාක්ෂණික විසඳුම්' : 'Professional Technology Solutions'}
                </h1>
                <p className="text-base font-serif italic text-stone-700 dark:text-zinc-200 max-w-2xl mx-auto mb-12">
                  {language === 'si' 
                    ? '"වෘත්තීය මට්ටමේ ජාලකරණය, කාර්යක්ෂම pfSense ෆයර්වෝල්ස්, උසස් මෘදුකාංග පාලනය සහ පද්ධති නඩත්තු සේවාවන් කඩිනමින් සපයන්නෙමු."'
                    : '"From bespoke software solutions to secure networking frameworks and proactive hardware support — engineered with precision for modern business environments."'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SERVICES_DATA.map((svc, sIdx) => (
                    <div
                      key={svc.id}
                      onClick={() => handleServiceClick(svc.id)}
                      className="bg-[#121214]/90 border border-brand-dark-gray/40 rounded-lg p-5 text-left cursor-pointer hover:border-brand-red/45 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_20px_rgba(229,9,20,0.1)]"
                    >
                      <div>
                        {/* Service Photo with clean monochrome overlay */}
                        <div className="relative h-32 w-full overflow-hidden rounded-sm mb-4 bg-black">
                          <img
                            src={svc.image}
                            alt={svc.title}
                            className="w-full h-full object-cover filter brightness-[0.85] contrast-105 group-hover:scale-105 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-2 left-2 bg-brand-red px-2 py-0.5 text-[9px] font-sans font-bold text-white uppercase rounded-xs">
                            {language === 'si' ? 'සේවාව' : 'SERVICE'} 0{sIdx + 1}
                          </div>
                        </div>
                        <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-zinc-100 group-hover:text-brand-red transition-colors flex items-center justify-between pb-2 border-b border-brand-dark-gray/40">
                          <span>{svc.title}</span>
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-brand-red" />
                        </h3>
                        <p className="text-[11px] text-zinc-350 leading-relaxed mt-2 line-clamp-3 font-sans">
                          {svc.shortDesc}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-brand-dark-gray/40 flex justify-between items-center text-[10px] uppercase font-mono tracking-wider font-semibold">
                        <span className="text-brand-red/90 font-bold">9+ Core inclusions</span>
                        <span className="text-zinc-400 group-hover:text-brand-red transition-all">SLA Specs →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Web & Software Development Section */}
            <section id="web-software-section" className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-1">
                    Full-Stack Software Engineering
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                    Custom Web, E-Commerce, Database Systems & Mobile Applications
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
                    E-Tech Solutions designs and develops professional websites, web applications, and mobile applications that help businesses build a strong digital presence and automate their operations. From simple business websites to advanced database-driven systems, we deliver scalable, secure, and user-friendly digital solutions tailored to real business requirements.
                  </p>
                  
                  {/* Commonly Utilized Tech Stack Badges */}
                  <div className="mt-2 pt-3 border-t border-zinc-800/80">
                    <p className="text-[10px] uppercase font-mono tracking-widest text-[#ff333d] font-bold mb-3">
                      Commonly Utilized Tech Stacks // Certified Frameworks
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {/* React Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-[#00d8ff] transition-colors select-none">
                        <svg className="w-3.5 h-3.5 text-[#00d8ff] animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
                          <circle cx="50" cy="50" r="8" />
                          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(0 50 50)" />
                          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(60 50 50)" />
                          <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(120 50 50)" />
                        </svg>
                        React & Next.js
                      </span>

                      {/* Node.js Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-[#68a063] transition-colors select-none">
                        <svg className="w-3.5 h-3.5 text-[#68a063]" viewBox="0 0 256 256" fill="currentColor">
                          <path d="M117.8 231a10 10 0 0 0 10 0l79-45.72a10 10 0 0 0 5-8.66V85.34a10 10 0 0 0-5-8.66l-79-45.73a10 10 0 0 0-10 0l-79 45.73a10 10 0 0 0-5 8.66v91.32a10 10 0 0 0 5 8.66z" fill="none" stroke="currentColor" strokeWidth="16" />
                        </svg>
                        Node.js Express
                      </span>

                      {/* PostgreSQL / MySQL Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-[#336791] transition-colors select-none">
                        <Database className="w-3.5 h-3.5 text-[#336791]" />
                        SQL (Postgres & MySQL)
                      </span>

                      {/* TypeScript Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-[#3178c6] transition-colors select-none">
                        <span className="w-3.5 h-3.5 bg-[#3178c6] text-white flex items-center justify-center font-sans font-black text-[8px] rounded-xs">TS</span>
                        TypeScript
                      </span>

                      {/* Flutter Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-red-500 transition-colors select-none">
                        <Smartphone className="w-3.5 h-3.5 text-brand-red" />
                        Flutter & Mobile
                      </span>

                      {/* Web API Badge */}
                      <span className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 text-white font-sans font-semibold text-xs py-1.5 px-3 rounded-full hover:border-purple-500 transition-colors select-none">
                        <Cpu className="w-3.5 h-3.5 text-purple-400" />
                        REST APIs
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Business & Corporate Portals',
                      'Secure E-commerce Stores (Payment Gateway integrated)',
                      'Automated Inventory & HRM Dashboards',
                      'Custom Mobile Applications (iOS & Android)',
                      'Dedicated Booking & Scheduling APIs',
                      'Domain, SSL Certificate, Host, and Mail Configs'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs sm:text-sm text-stone-100 font-sans font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('web-software-development')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="relative border border-brand-dark-gray p-1.5 rounded-xl bg-brand-charcoal/80 overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                      alt="Web and custom software development dashboard showcase"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                    <div className="absolute top-4 right-4 bg-brand-black/90 px-3 py-1.5 rounded border border-brand-red/30 text-brand-red text-[11px] font-mono">
                      SQLite / MySQL / React Stack ready
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Hardware & Infrastructure Section */}
            <section id="hardware-solutions-section" className="bg-gradient-white-ash py-16 px-6 border-t border-neutral-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1 relative">
                  <div className="border border-neutral-200 p-1.5 rounded-xl bg-white overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80"
                      alt="Hardware components PC assembly"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Hardware Supply, CCTV & Surveillance
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                    Office Desktop PC Assembling, Biometric Access & IP Camera Systems
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    E-Tech Solutions provides reliable hardware supply, installation, repair, and maintenance services. We support complete office ICT infrastructure including computers, laptops, servers, CCTV systems, time attendance devices, entrance control systems, and PABX communication systems.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Desktop Computer Assembling & Repair support',
                      'Laptops, Printers & Accessory Sourcing',
                      'Advanced CCTV Systems & NVR Setup',
                      'Biometric Fingerprint/Face Attendance Systems',
                      'Office Entrance Security barriers',
                      'Annual Maintenance Agreements (AMCs) for office hardware'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('hardware-solutions')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
              </div>
            </section>

            {/* 7. Networking Solutions Section */}
            <section id="networking-solutions-section" className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-1">
                    Structured Cabling & Active Networks
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                    Reliable Office Subnets, High-Range Wi-Fi Nodes & Server Room Planning
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
                    We build stable, secure, and performance-oriented network environments for offices and institutions. Our networking services cover structured cabling, router and switch configuration, Wi-Fi deployment, VLAN setup, server room implementation, network troubleshooting, and long-term network maintenance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'LAN Designing & Cat6 Network Cable laying',
                      'Enterprise Access Points WiFi optimization',
                      'Managing Smart Core Routers, Switches & VLANs',
                      'Cabling rack installation & tidy server patches',
                      'Network slow-point diagnostics',
                      'Dynamic load-balancing & failover internet dual links'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('networking-solutions')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="border border-brand-dark-gray p-1.5 rounded-xl bg-brand-charcoal/80 overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                      alt="Structured Cabling Network Setup server cabinet"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Cybersecurity Solutions Section */}
            <section id="cybersecurity-solutions-section" className="bg-gradient-ash-medium py-16 px-6 border-t border-neutral-300">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1 relative">
                  <div className="border border-neutral-200 p-1.5 rounded-xl bg-white overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
                      alt="Cybersecurity Shield Firewall Console"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Cybersecurity & Firewall Defense
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                    Fortinet, Sophos & Specialized Cost-Effective pfSense Integrations
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    Cybersecurity is no longer optional. E-Tech Solutions helps organizations protect their digital assets through firewall solutions, endpoint protection, web filtering, email security, vulnerability assessment, compliance reviews, and security consultancy. We support both commercial firewall platforms and cost-effective open-source firewall deployments.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Commercial UTM Gateways config & subscription support',
                      'Highly scalable custom pfSense Open Source Firewalls',
                      'Granular Web, Domain, URL & Content Filters',
                      'Endpoint Antivirus centralized console configs',
                      'Safe VPN Tunnels setup for remote branch links',
                      'Dynamic security threat scans & patch configurations'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('cybersecurity-solutions')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
              </div>
            </section>

            {/* 9. Digital Marketing & Social Media Management Section */}
            <section id="digital-marketing-section" className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-1">
                    Social Media & Organic Growth
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                    Professional Channel Creation, Creative Post Design & Content Planning
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-normal">
                    We help businesses, professionals, and brands build, manage, and grow their online presence through social media marketing, content creation, photography, videography, creative design, and digital campaign support. Our team handles page creation, profile branding, posts, reels, YouTube content, TikTok videos, Instagram content, and ongoing social media maintenance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'In-depth Facebook & Instagram brand alignment',
                      'Custom graphic creation with corporate theme palettes',
                      'Video post-production for vertical Reels & TikTok videos',
                      'YouTube channel banner, tags & description setups',
                      'High-quality thumbnail designs to optimize CTR indicators',
                      'Coordinated content calendars & automated scheduling'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('digital-marketing')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="border border-brand-dark-gray p-1.5 rounded-xl bg-brand-charcoal/80 overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                      alt="Social Media Influencer Strategy Content Dashboard"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Creative Media Production Section */}
            <section id="creative-media-section" className="bg-gradient-white-ash py-16 px-6 border-t border-neutral-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1 relative">
                  <div className="border border-neutral-200 p-1.5 rounded-xl bg-white overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
                      alt="Professional videography cameras and lighting"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Commercial Media Shoots & Edits
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                    High-End Executive Profiles, Product Photography & Corporate Event Videos
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    Our creative media production services help businesses present their brand professionally across digital platforms. We provide photography, videography, video editing, social media creatives, promotional videos, thumbnails, reels, posters, and campaign visuals designed to strengthen digital visibility and customer engagement.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Commercial product catalogs shoots & lighting',
                      'Executive management portrait sittings & cover designs',
                      'Promo videography for launches, seminars & AGMs',
                      'Clean audio noise cancellation & color corrections',
                      'Smooth motion graphics overlays & lower third titles',
                      'Fast vertical reel clip compilation & poster creation'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('creative-media-production')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
              </div>
            </section>

            {/* 11. Software Licensing Section */}
            <section id="software-licensing-section" className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs sm:text-sm text-[#ff333d] font-sans uppercase font-extrabold tracking-wider block mb-1">
                    Corporate Software Licensing Advisory
                  </span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                    Windows, Microsoft 365, Adobe Creative Cloud, AutoCAD & Antivirus Subscriptions
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-normal">
                    We assist clients in selecting, purchasing, renewing, and deploying genuine software licenses suitable for their business, technical, and compliance requirements. Our software licensing support helps organizations avoid licensing risks while improving productivity and operational continuity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Genuine Windows 10 & 11 Professional activations',
                      'Microsoft Office and M365 Business Cloud migrations',
                      'Adobe Creative Suite single and all app license sets',
                      'AutoCAD Autodesk technical licensing compliance',
                      'Endpoint Protection multi-device antivirus renewals',
                      'Asset allocation & license legal compliance checks'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('software-licensing')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="border border-brand-dark-gray p-1.5 rounded-xl bg-brand-charcoal/80 overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
                      alt="Genuine Software licensing dashboard interface"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 12. ICT Procurement Consultancy Section */}
            <section id="procurement-consultancy-section" className="bg-gradient-ash-medium py-16 px-6 border-t border-neutral-300">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1 relative">
                  <div className="border border-neutral-200 p-1.5 rounded-xl bg-white overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                      alt="Procurement Consultancy contract meeting"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-stone-200/40 shadow-xl">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Independent Procurement Consultancy
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-950 tracking-tight">
                    Drafting Technical Specifications, TORs, BOQs & Compliance Matrixes for Committees
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                    E-Tech Solutions provides professional ICT procurement consultancy services to help organizations prepare accurate technical specifications, Terms of Reference, compliance sheets, evaluation criteria, warranty conditions, SLA requirements, UAT plans, and implementation conditions. We support clients in making technically sound, transparent, practical, and cost-effective procurement decisions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 border-t border-stone-200/50 pt-4">
                    {[
                      'Unbiased computer & networking technical specs preparation',
                      'Rigorous Terms of Reference (TOR) drafting',
                      'Realistic Bill of Quantity (BOQ) formulations',
                      'Vendor compliance assessment criteria structures',
                      'Drafting robust SLAs, warranties & support conditions',
                      'Constructing User Acceptance Testing (UAT) checklists'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-stone-900 font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('ict-procurement-consultancy')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
              </div>
            </section>

            {/* 13. Cybersecurity Consultancy Section */}
            <section id="cybersecurity-consultancy-section" className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto">
                {/* Introduction Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <span className="text-xs sm:text-sm text-[#ff333d] font-sans uppercase font-extrabold tracking-wider block mb-1">
                      Cybersecurity Governance & Auditing
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
                      Sri Lanka PDPA Compliance Readiness & CMMC 2.0 Self-Assessment Support
                    </h2>
                    <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-normal">
                      E-Tech Solutions provides systematic compliance audits, readiness assessments, and risk mapping. We specialize in helping defense sector contractors prepare for <strong>CMMC 2.0</strong> self-attestations (NIST SP 800-171) and support Sri Lankan organizations aligning with local <strong>Personal Data Protection Act (PDPA)</strong> provisions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {[
                        'CMMC 2.0 Level 1 (FCI) & Level 2 (CUI) Alignment',
                        'Sri Lanka Personal Data Protection Act (PDPA) Auditing',
                        'System Security Plan (SSP) & Boundary Documentation',
                        'Plan of Action and Milestones (POA&M) Defensibility',
                        'Active Web App & Subnet Vulnerability Scans',
                        'Corporate Information Security Policies writing (WISP)'
                      ].map((item, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Check size={14} className="text-brand-red shrink-0" />
                          <span className="text-xs text-white/90">{item}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleServiceClick('cybersecurity-consultancy')}
                      className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                    >
                      Explore Inclusions & Related Package Tiers →
                    </button>
                  </div>
                  <div className="lg:col-span-5 relative">
                    <div className="border border-brand-dark-gray p-1.5 rounded-xl bg-brand-charcoal/80 overflow-hidden shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                        alt="Cybersecurity compliance and CMMC assessment review"
                        className="rounded-lg object-cover w-full h-[280px] brightness-90 filter"
                      />
                    </div>
                  </div>
                </div>

                {/* CMMC 2.0 & PDPA Compliance Interactive Lab */}
                <div className="border border-zinc-800 bg-zinc-950/95 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-2xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-5 mb-6 gap-4">
                    <div>
                      <span className="text-xs sm:text-sm text-[#ff333d] font-sans uppercase font-extrabold tracking-wider block mb-1">
                        {language === 'si' ? 'අන්තර්ක්‍රියාකාරී අනුකූලතා පරීක්ෂණ' : 'Interactive Compliance Board'}
                      </span>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white mt-1 uppercase">
                        {language === 'si' ? 'CMMC 2.0 සහ දත්ත ආරක්ෂණ නීති සැසඳීම' : 'CMMC 2.0 & PDPA Standards Explorer'}
                      </h3>
                      <p className="text-sm text-stone-200 mt-2 leading-relaxed font-sans font-normal">
                        {language === 'si' 
                          ? 'ඊ-ටෙක් සොලියුෂන්ස් සැසඳීම් මෙවලම. නියාමන රාමුව ගවේෂණය කිරීමට පහත ටැබ් භාවිතා කරන්න.'
                          : 'Select a tab below to explore security structures, the 14 NIST families, compliance roadmaps, and key audit deliverables.'}
                      </p>
                    </div>
                    {/* Lab Tab Buttons */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'levels', label: 'CMMC Levels' },
                        { id: 'families', label: '14 NIST Domains' },
                        { id: 'roadmap', label: '9-Phase Roadmap' },
                        { id: 'deliverables', label: '12 Deliverables' }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setLabTab(tab.id as any)}
                          className={`px-3.5 py-2 rounded text-xs sm:text-sm font-sans uppercase tracking-wider transition-all cursor-pointer ${
                            labTab === tab.id
                              ? 'bg-red-650 text-white font-black shadow-md shadow-red-650/45 border border-red-500'
                              : 'bg-zinc-900 border border-zinc-700 text-stone-200 hover:text-white hover:border-red-500 font-bold'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tab Contents */}
                  <div className="min-h-[220px]">
                    {/* levels Tab */}
                    {labTab === 'levels' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                        <div className="border border-zinc-700 bg-zinc-900/90 p-5 rounded-lg flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-mono text-stone-300 font-bold tracking-widest uppercase block mb-1">CMMC Level 1</span>
                            <h4 className="font-display font-black text-red-500 text-lg mb-2">Foundational Readiness</h4>
                            <p className="text-sm text-stone-100 leading-relaxed mb-4">
                              Applies to standard defense suppliers handling <strong>Federal Contract Information (FCI)</strong>. Centers on basic safeguarding parameters.
                            </p>
                            <ul className="text-xs sm:text-sm text-white space-y-1.5 font-mono mb-4">
                              <li className="font-semibold text-stone-150">• Info Type: FCI Only</li>
                              <li className="font-semibold text-stone-150">• Practices: 17 Cyber Hygiene rules</li>
                              <li className="font-semibold text-stone-150">• Scope: Limiting basic access controls</li>
                              <li className="font-semibold text-stone-150">• Assessment: Annual Self-Assessment</li>
                            </ul>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-green-400 font-extrabold bg-green-500/15 px-2.5 py-1 rounded w-max border border-green-500/30">Low-Risk Contracts</span>
                        </div>

                        <div className="border border-red-500/80 bg-zinc-900/95 p-5 rounded-lg flex flex-col justify-between relative shadow-lg">
                          <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-mono font-bold px-2 py-1 rounded uppercase tracking-widest animate-pulse border border-red-400">Our Core Focus</div>
                          <div>
                            <span className="text-[11px] font-mono text-red-400 font-bold tracking-widest uppercase block mb-1">CMMC Level 2</span>
                            <h4 className="font-display font-black text-white text-lg mb-2">Advanced Compliance</h4>
                            <p className="text-sm text-zinc-150 leading-relaxed mb-4">
                              Applies to contractors storing or transmitting <strong>Controlled Unclassified Information (CUI)</strong>. Aligns strictly under NIST SP 800-171 principles.
                            </p>
                            <ul className="text-xs sm:text-sm text-white space-y-1.5 font-mono mb-4 animate-pulse">
                              <li className="font-semibold text-stone-150">• Info Type: CUI & Export-Controlled (ITAR)</li>
                              <li className="font-semibold text-stone-150">• Practices: 110 Controls mapping</li>
                              <li className="font-semibold text-stone-150">• Core Standard: NIST SP 800-171 Rev. 2</li>
                              <li className="font-semibold text-stone-150">• Assessment: Self-Assessment & POA&M</li>
                            </ul>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-extrabold bg-red-600/15 px-2.5 py-1 rounded w-max border border-red-550">ITAR & CUI Environment</span>
                        </div>

                        <div className="border border-zinc-700 bg-zinc-900/90 p-5 rounded-lg flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-mono text-stone-300 font-bold tracking-widest uppercase block mb-1">CMMC Level 3</span>
                            <h4 className="font-display font-black text-red-500 text-lg mb-2">Expert Security</h4>
                            <p className="text-sm text-stone-100 leading-relaxed mb-4">
                              Applies to high-priority organizations working on critical defense programs facing advanced persistent threats (APTs).
                            </p>
                            <ul className="text-xs sm:text-sm text-white space-y-1.5 font-mono mb-4">
                              <li className="font-semibold text-stone-150">• Info Type: High-Sensitivity CUI</li>
                              <li className="font-semibold text-stone-150">• Practices: 110+ Enhanced rules</li>
                              <li className="font-semibold text-stone-150">• Core Standard: NIST SP 800-172</li>
                              <li className="font-semibold text-stone-150">• Assessment: Government-Led Audits</li>
                            </ul>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-extrabold bg-amber-500/10 px-2.5 py-1 rounded w-max border border-amber-500/20">Government Audited Only</span>
                        </div>
                      </div>
                    )}

                    {/* families Tab */}
                    {labTab === 'families' && (
                      <div className="animate-fadeIn">
                        <p className="text-sm sm:text-base text-stone-250 mb-5 leading-relaxed font-sans font-medium">
                          CMMC Level 2 contains 110 technical, administrative, and operational controls mapped across <strong>14 key NIST SP 800-171 Security Families</strong>. Every project involves evaluating:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                          {[
                            { code: 'AC', name: 'Access Control', desc: 'Restricting logical system entry' },
                            { code: 'AT', name: 'Awareness & Training', desc: 'Educating staff on data safety' },
                            { code: 'AU', name: 'Audit & Accountability', desc: 'System log generation & reviews' },
                            { code: 'CM', name: 'Config Management', desc: 'Hardware & software baselines' },
                            { code: 'IA', name: 'Identification', desc: 'User identity policies & MFA' },
                            { code: 'IR', name: 'Incident Response', desc: 'Threat containment & reporting font-sans' },
                            { code: 'MA', name: 'Maintenance', desc: 'Repair logs & technician rules' },
                            { code: 'MP', name: 'Media Protection', desc: 'Removable USB / disk security' },
                            { code: 'PE', name: 'Physical Protection', desc: 'Restricting server room entry' },
                            { code: 'PS', name: 'Personnel Security', desc: 'Staff screening & exit sweeps font-sans' },
                            { code: 'RA', name: 'Risk Assessment', desc: 'Vulnerability threat scanning' },
                            { code: 'CA', name: 'Security Assessment', desc: 'Evaluating system security plans' },
                            { code: 'SC', name: 'System Protection', desc: 'Network routing & encryption' },
                            { code: 'SI', name: 'Information Integrity', desc: 'Antivirus, EDR, and patch alerts' }
                          ].map((fam) => (
                            <div key={fam.code} className="bg-[#0e0e11] border border-zinc-700/80 p-3.5 rounded-lg hover:border-[#ff333d]/50 transition-all text-center flex flex-col justify-center min-h-[110px]">
                              <span className="text-sm font-mono font-black text-red-500 block mb-1">{fam.code}</span>
                              <span className="text-xs sm:text-sm text-white font-bold truncate block" title={fam.name}>{fam.name}</span>
                              <span className="text-xs text-stone-300 mt-1 leading-snug line-clamp-2">{fam.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* roadmap Tab */}
                    {labTab === 'roadmap' && (
                      <div className="animate-fadeIn">
                        <p className="text-sm sm:text-base text-stone-250 mb-5 leading-relaxed font-sans font-medium">
                          E-Tech Solutions guides organizations preparing for external review using our structured, <strong>9-Phase Phased Readiness Framework</strong>.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-4 text-left">
                          {[
                            { num: '01', title: 'Discovery', desc: 'Gather clauses, contract specifications, and IT architecture details.' },
                            { num: '02', title: 'Scoping', desc: 'Define system boundary limits - where CUI is stored/transmitted.' },
                            { num: '03', title: 'Assessment', desc: 'Conduct gap reviews relative to Level 1 / Level 2 rules.' },
                            { num: '04', title: 'Policies', desc: 'Develop tailored security policies (Access Control, Incident).' },
                            { num: '05', title: 'Remediation', desc: 'Configure missing controls (MFA, backup, monitoring, logging).' },
                            { num: '06', title: 'Evidence', desc: 'Collect platform configurations and operating proof.' },
                            { num: '07', title: 'Reporting', desc: 'Compile the formal Control Matrix and draft local gap files.' },
                            { num: '08', title: 'Affirmation', desc: 'Secure stakeholder reviews and formal management affirmation.' },
                            { num: '09', title: 'Monitoring', desc: 'Establish annual reviews, reassessment logs, and patches.' }
                          ].map((step, idx) => (
                            <div key={step.num} className="bg-[#0e0e11] border border-zinc-700/80 p-4 rounded-lg relative hover:border-[#ff333d]/40 transition-all flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-xs sm:text-sm font-mono font-bold text-red-500">{step.num}</span>
                                  {idx < 8 && <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-stone-500/50 font-bold select-none text-[10px]">→</span>}
                                </div>
                                <h5 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider block mb-1 font-sans">{step.title}</h5>
                                <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed font-sans">{step.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* deliverables Tab */}
                    {labTab === 'deliverables' && (
                      <div className="animate-fadeIn">
                        <p className="text-sm sm:text-base text-stone-250 mb-5 leading-relaxed font-sans font-medium">
                          For our CMMC 2.0 readiness engagements, E-Tech Solutions compiles and provides the following <strong>12 Crucial Compliance Deliverables</strong> as audit evidence:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 font-mono text-xs sm:text-sm">
                          {[
                            '1. CMMC 2.0 Technical Overview Document',
                            '2. Client Scoped Information Request File',
                            '3. Cybersecurity Standards Abbreviation List',
                            '4. CMMC Environment Scope Statement',
                            '5. Corporate CMMC Self-Assessment Policy',
                            '6. Active Compliance Control Matrix Spreadsheet',
                            '7. Complete System Security Plan (SSP) Draft',
                            '8. Structured Platform Evidence Register',
                            '9. Detailed Cybersecurity Gap Assessment Report',
                            '10. Formal Plan of Action & Milestones (POA&M)',
                            '11. Management Self-Attestation Questionnaire',
                            '12. Client-Facing CMMC Readiness Summary'
                          ].map((deliv, idx) => (
                            <div key={idx} className="bg-[#0e0e11] border border-zinc-700/85 p-3.5 rounded-lg flex items-center gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-red-650/15 text-red-500 flex items-center justify-center shrink-0 border border-red-500/30">✓</div>
                              <span className="text-zinc-150 leading-snug font-sans font-semibold">{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 14. Maintenance Agreements Section */}
            <section id="maintenance-agreements-section" className="bg-gradient-white-ash py-16 px-6 border-t border-neutral-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 order-2 lg:order-1 relative">
                  <div className="border border-neutral-200 p-1.5 rounded-xl bg-white overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
                      alt="IT support engineer at work"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
                  </div>
                </div>
                <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Strategic IT Maintenance Contracts (AMCs)
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
                    Customized Annual Maintenance Blueprints, Preventive Visits & Emergency Standby SLAs
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    E-Tech Solutions provides flexible maintenance agreements to keep ICT systems reliable, secure, and operational. Our maintenance packages cover hardware, networking, servers, CCTV, firewall systems, endpoint protection, software support, preventive maintenance, remote troubleshooting, and on-site support.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Complete hardware diagnostics & regular computer tuneups',
                      'Routine surveillance system checks & log backups',
                      'Router/AP stability configurations & WiFi congestion tuning',
                      'Central firewall settings checks and gateway updates',
                      'Professional phone/remote IT desk troubleshooting',
                      'Commitments for emergency arrival times under active contract'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <Check size={14} className="text-brand-red shrink-0" />
                        <span className="text-xs text-stone-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleServiceClick('maintenance-agreements')}
                    className="mt-6 text-xs text-brand-red font-bold hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer w-max"
                  >
                    Explore Inclusions & Related Package Tiers →
                  </button>
                </div>
              </div>
            </section>

            {/* 15. Why Choose E-Tech Solutions */}
            <section className="bg-brand-black/20 backdrop-blur-sm py-16 px-6 border-t border-brand-dark-gray/30 border-b border-brand-dark-gray/30 select-none">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-[11px] text-brand-red font-sans uppercase font-bold tracking-widest block mb-2">
                    {language === 'si' ? 'අපව තෝරාගත යුත්තේ ඇයි' : 'WHY E-TECH SOLUTIONS // PROVEN COMPLIANCE & EXPERTISE'}
                  </span>
                  <h2 className="font-display font-bold text-3xl text-[var(--white)]">
                    {language === 'si' ? 'ශ්‍රී ලංකාවේ ප්‍රමුඛතම ව්‍යාපාර ඊ-ටෙක් තෝරා ගන්නේ ඇයි' : 'Why Growing Businesses Choose E-Tech Solutions'}
                  </h2>
                  <p className="text-base text-stone-700 dark:text-zinc-200 max-w-2xl mx-auto mt-2 font-medium">
                    {language === 'si'
                      ? 'අපි තාක්ෂණික විශේෂඥභාවය, ප්‍රායෝගික පළපුරුද්ද, සයිබර් ආරක්ෂාව සහ ව්‍යාපාරික අවශ්‍යතා මනාව හඳුනාගෙන පරිපූර්ණ තොරතුරු තාක්ෂණ විසඳුම් ලබා දෙන්නෙමු.'
                      : 'We combine deeply compliance-focused IT standards, rigorous cybersecurity checkups, and transparent service metrics to optimize your network infrastructure.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {WHY_CHOOSE_US_POINTS.map((pt, i) => (
                    <div
                      key={i}
                      className="bg-[#121214]/90 border border-brand-dark-gray/30 rounded-lg p-6 hover:border-brand-red/35 transition-all shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-sans font-bold flex items-center justify-center mb-4 border border-brand-red/25">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h4 className="font-display font-semibold text-zinc-100 mb-2 text-sm">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-zinc-350 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 16. Industries We Serve */}
            <section className="bg-gradient-black-pure py-16 px-6 border-b border-brand-dark-gray">
              <div className="max-w-7xl mx-auto text-center">
                <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-2">
                  {language === 'si' ? 'අප සහය දක්වන ක්ෂේත්‍රයන්' : 'EXPERTISE SECTORS // SRI LANKAN OPERATIONS'}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3 uppercase tracking-tight">
                  {language === 'si' ? 'අප තාක්ෂණික සහය ලබාදෙන ප්‍රධාන ක්ෂේත්‍රයන්' : 'Sectors We Empower Across the Nation'}
                </h2>
                <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
                  {language === 'si' 
                    ? 'විවිධ ක්ෂේත්‍රවල ව්‍යාපාර සඳහා විශ්වාසනීය ජාලකරණ සැලසුම්, ආරක්ෂිත දත්ත පද්ධති සහ ඩිජිටල් උපාය මාර්ග සැපයීම.'
                    : 'Delivering robust, localized, and compliant network infrastructures, licensed security bundles, and hardware support structures.'}
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {INDUSTRIES_SERVED.map((ind, i) => (
                    <span
                      key={i}
                      className="bg-zinc-900 text-zinc-100 border border-zinc-700 px-4 py-2.5 text-xs rounded-full hover:border-[#ff1a22] hover:bg-brand-red/15 hover:text-white transition-all text-center inline-block font-sans font-bold shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-default"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 17. Portfolio / Recent Projects Section */}
            <section className="bg-brand-black/45 backdrop-blur-sm py-16 px-6 border-t border-brand-dark-gray/30 border-b border-brand-dark-gray/30">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-2">
                    {language === 'si' ? 'නිමි ව්‍යාපෘති' : 'OUR PORTFOLIO // PROVEN CAPABILITIES'}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--white)] uppercase tracking-tight">
                    {language === 'si' ? 'අපගේ මෑතකාලීන ව්‍යාපෘති සහ සාර්ථකත්වයන්' : 'Our Recent Project Deliveries'}
                  </h2>
                  <p className="text-sm sm:text-base text-stone-700 dark:text-zinc-200 max-w-2xl mx-auto mt-3 leading-relaxed font-sans font-normal">
                    {language === 'si'
                      ? 'විවිධ සේවාදායකයින් සඳහා සාර්ථකව නිම කරන ලද වගකීම් සහගත ජාල විසඳුම් සහ මෘදුකාංග පද්ධති කිහිපයක්.'
                      : 'Explore a detailed breakdown of our customized software setups, robust networks, and secure active infrastructure.'}
                  </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setFilterCategory(cat.key)}
                      className={`px-4 py-2 rounded text-xs font-semibold border transition-all cursor-pointer ${
                        filterCategory === cat.key
                          ? 'bg-brand-red border-brand-red text-white shadow'
                          : 'bg-brand-charcoal border-brand-dark-gray text-brand-muted hover:border-brand-red/30 hover:text-brand-red'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Project cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProjects.slice(0, 4).map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-zinc-900 border border-zinc-700/80 rounded-lg overflow-hidden flex flex-col group hover:border-[#ff333d]/50 transition-all duration-300 shadow-sm hover:shadow-[0_8px_20px_rgba(229,9,20,0.1)]"
                    >
                      <div className="relative h-44 overflow-hidden bg-black shrink-0">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover filter brightness-[0.85] contrast-105 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-[#ff333d] text-white text-[10px] uppercase font-mono font-bold px-2 py-1 rounded">
                          {proj.category}
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-bold text-sm text-zinc-100 group-hover:text-[#ff333d] transition-colors mb-2">
                            {proj.title}
                          </h4>
                          <p className="text-[11.5px] text-zinc-300 leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setActivePage('portfolio')}
                          className="text-[11px] text-red-500 font-bold hover:underline mt-4 text-left cursor-pointer"
                        >
                          View Details Index →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => setActivePage('portfolio')}
                    className="bg-white dark:bg-zinc-900 border border-neutral-300 dark:border-zinc-800 hover:border-brand-red/35 text-stone-900 dark:text-zinc-100 text-xs font-bold px-6 py-3 rounded tracking-wider uppercase transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
                  >
                    View All Case Projects Portfolio
                  </button>
                </div>
              </div>
            </section>

            {/* Client Success Stories Carousel with Sri Lankan Corporate partners */}
            <ClientSuccessCarousel />

            {/* 18. Request a Quote Section */}
            <section className="bg-gradient-black-pure py-16 px-6 relative" id="quote-section">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-2">
                    Consolidate Your Scope
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                    Request an Estimated Quote Profile
                  </h2>
                  <p className="text-sm sm:text-base text-stone-200 font-sans max-w-2xl mx-auto mt-3 leading-relaxed">
                    Submit your organization constraints. Our compliance and technology coordinators will review logs & provide preliminary BOQ configurations.
                  </p>
                </div>

                <QuoteForm />
              </div>
            </section>

            {/* 19. Contact Section */}
            <section className="bg-gradient-black-pure py-16 px-6 border-t border-brand-dark-gray">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs sm:text-sm text-red-500 font-sans uppercase font-extrabold tracking-wider block mb-2">
                      Reach Out Swiftly
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                      Let's Coordinate Your Integration
                    </h2>
                    <p className="text-sm sm:text-base text-stone-200 font-sans leading-relaxed mt-3 font-normal">
                      Our main offices are strategically based in Mirihana, Nugegoda. We welcome visits, phone reviews, or direct technical advisory queries via email or active SLA hotlines.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 bg-zinc-900/90 p-5 rounded-lg border border-zinc-700/80">
                      <MapPin className="text-red-500 shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-red-500">Registered Headquarters Address</h4>
                        <p className="text-sm text-stone-100 mt-1 leading-relaxed font-sans font-medium">
                          E-Tech Solutions, 72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 bg-zinc-900/90 p-5 rounded-lg border border-zinc-700/80">
                      <Phone className="text-red-500 shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-red-500">Active Phone Lines & support</h4>
                        <p className="text-sm text-stone-100 mt-1 leading-relaxed font-sans font-medium">
                          Office Landline: <span className="text-white font-bold">+94 112 819548</span> <br />
                          Hotline Streams: <span className="text-white font-bold">+94 72 212 1000</span> / <span className="text-white font-bold">+94 777 889 734</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 bg-zinc-900/90 p-5 rounded-lg border border-zinc-700/80">
                      <Mail className="text-red-500 shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-red-500">Primary Email channels</h4>
                        <p className="text-sm text-stone-100 mt-1 font-mono font-medium">
                          etechmultisolutions@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Map Embed with high-fidelity corporate graphics */}
                <div className="bg-zinc-900/90 border border-zinc-700/85 rounded-xl p-6 relative overflow-hidden h-max flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-black text-sm text-red-500 mb-2 uppercase tracking-wider">Mirihana, Nugegoda HQ Location</h3>
                    <p className="text-sm text-stone-200 mb-6 leading-relaxed font-sans">
                      Strategically located close to Nugegoda, Mirihana, providing easy access to corporate centers, governmental boards and SME enterprises in Colombo sub-regions.
                    </p>
                    {/* Visual Vector Grid representation instead of complex heavy iframe */}
                    <div className="w-full h-48 bg-black border border-zinc-700/80 rounded-lg relative flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                      <div className="w-10 h-10 rounded-full bg-red-650/20 border border-red-500 flex items-center justify-center animate-pulse mb-3">
                        <MapPin className="text-red-500" size={20} />
                      </div>
                      <span className="text-xs sm:text-sm text-white font-bold font-display">72/10, Edirisinghe Road, Mirihana</span>
                      <p className="text-[11px] text-stone-300 font-mono mt-1 max-w-xs font-bold">GPS Coordinates: 6.8741° N, 79.9015° E</p>
                      <a
                        href="https://maps.google.com/?q=Edirisinghe+Road,+Mirihana,+Nugegoda,+Sri+Lanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-[11px] text-red-500 font-bold uppercase tracking-widest hover:underline hover:text-red-400 flex items-center gap-1.5"
                      >
                        Navigate on Google Maps <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      )}


        {/* ABOUT US PAGE */}
        {activePage === 'about' && (
          <section className="pt-36 sm:pt-40 md:pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">Company Profile</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--white)]">E-Tech Solutions Profile</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto">Providing reliable, professional, and secure technology ecosystems in Sri Lanka since 2012.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4">
                <h2 className="font-display font-semibold text-xl text-brand-red">Who We Are</h2>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Established in 2012, <strong>E-Tech Solutions</strong> is a premier, fully integrated ICT and cybersecurity consultancy firm proudly based in Sri Lanka.
                </p>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  For over a decade, we have served as a trusted technology partner for a diverse range of clients, including government offices, dynamic SMEs, educational institutes, corporate enterprises, and growing businesses. Our mission is to deliver end-to-end technology solutions that drive meaningful digital transformation, operational efficiency, security, and sustainable growth.
                </p>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  We bridge the gap between robust IT infrastructure and innovative digital strategy by offering a comprehensive suite of services, including custom web and software development, mobile application development, enterprise-grade networking, hardware solutions, cybersecurity solutions, software licensing, social media marketing, and creative digital media services.
                </p>
              </div>
              <div className="border border-brand-dark-gray p-2 rounded-xl bg-brand-charcoal overflow-hidden shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
                  alt="Corporate consulting board"
                  className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                />
                <div className="absolute bottom-6 left-6 bg-brand-black/90 p-3.5 rounded border border-brand-red/30">
                  <span className="text-brand-red font-mono font-bold text-xs uppercase block">SLA COMPLIANT CONTRACTS</span>
                  <p className="text-[10px] text-brand-muted mt-1">Guaranteed response windows with designated support groups.</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-charcoal border border-brand-dark-gray rounded-xl p-6 sm:p-8 mt-4">
              <h3 className="font-display font-semibold text-lg text-[var(--white)] mb-4">Our Practical Philosophy & Commitment</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                Beyond seamless technical implementation, our specialized expertise in ICT procurement consultancy and cybersecurity governance ensures that our clients’ operations are not only technologically advanced, but also resilient, secure, compliant, and strategically aligned for long-term success.
              </p>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                At E-Tech Solutions, we believe technology should not be complicated. It should be reliable, secure, practical, and aligned with the real business needs of every client we serve. Our technical advisors reject over-engineered hype in favor of durable, scalable, and cost-effective operations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-dark-gray text-center">
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">2012</h4>
                  <p className="text-xs text-[var(--white)] font-medium">Year Established</p>
                  <p className="text-[11px] text-brand-muted mt-1">SLA integrity for 14+ continuous years.</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">100%</h4>
                  <p className="text-xs text-[var(--white)] font-medium">Genuine Software Advisory</p>
                  <p className="text-[11px] text-brand-muted mt-1">We enforce genuine activations & compliance.</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">Col</h4>
                  <p className="text-xs text-[var(--white)] font-medium">Mirihana, Nugegoda Head Office</p>
                  <p className="text-[11px] text-brand-muted mt-1">Sourcing support across all provinces.</p>
                </div>
              </div>
            </div>

            {/* Inclusions segment on about page */}
            <div>
              <h3 className="font-display font-semibold text-lg text-[var(--white)] mb-6 text-center">Core Milestones & Technical Security Strengths</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">ESTABLISHED IN 2012</span>
                  <h4 className="font-display font-bold text-sm text-[var(--white)] mb-2">A Decade of Integration</h4>
                  <p className="text-xs text-brand-muted">Solid roots in corporate IT cabling, hardware diagnostics, and administrative automation tools.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">SECURITY FIRST</span>
                  <h4 className="font-display font-bold text-sm text-[var(--white)] mb-2">Rigorous Firewall Mastery</h4>
                  <p className="text-xs text-brand-muted">Specialists in deploying advanced Fortinet equipment & highly optimized open source pfSense cluster parameters.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">BRAND ELEVATION</span>
                  <h4 className="font-display font-bold text-sm text-[var(--white)] mb-2">Corporate Media & Socials</h4>
                  <p className="text-xs text-brand-muted">Handling product photography, вертикал Reels, YouTube descriptions, and monthly brand scheduling calendars perfectly.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">UNBIASED ADVISORY</span>
                  <h4 className="font-display font-bold text-sm text-[var(--white)] mb-2">Procurement Rigor</h4>
                  <p className="text-xs text-brand-muted">Serving tender boards as trusted advisors to prepare solid TORs, BOQs, and compliance matrices.</p>
                </div>
              </div>
            </div>

            {/* Quick Call to Action block */}
            <div className="bg-brand-red/10 border border-brand-red/30 rounded-xl p-6 text-center max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-sm text-[var(--white)] uppercase tracking-wide mb-2">Need to coordinate with our board?</h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                Whether you represent a government office needing technical specifications, or a startup wanting an interactive web catalog, we are structured to support your ecosystem.
              </p>
              <button
                onClick={() => setActivePage('contact')}
                className="bg-brand-red hover:bg-dark-red text-white text-xs font-bold px-6 py-3 rounded uppercase tracking-wider transition-all cursor-pointer inline-block"
              >
                Talk to our Tech Leads Now
              </button>
            </div>
          </section>
        )}


        {/* SERVICES INDEX PAGE */}
        {activePage === 'services' && (
          <section className="pt-36 sm:pt-40 md:pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">Sector Capabilities</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--white)]">Our Complete Service Horizons</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto">
                Explore the nine core operational vectors E-Tech Solutions serves. We manage execution from requirement specification to active deployment & AMC support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES_DATA.map((svc) => (
                <div
                   key={svc.id}
                   className="bg-brand-charcoal border border-brand-dark-gray rounded-xl overflow-hidden flex flex-col justify-between hover:border-brand-red/30 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden bg-black shrink-0">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-305"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-base text-[var(--white)] group-hover:text-brand-red transition-colors mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed mb-6">
                        {svc.shortDesc}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleServiceClick(svc.id)}
                        className="w-full text-center bg-brand-black border border-brand-dark-gray hover:border-brand-red/50 hover:bg-brand-red/5 text-[var(--white)] py-2.5 rounded text-xs font-bold uppercase transition-all tracking-wider cursor-pointer"
                      >
                        View Deliverables & SLA Tiers →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}


        {/* PORTFOLIO PAGE */}
        {activePage === 'portfolio' && (
          <section className="pt-36 sm:pt-40 md:pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">Showcase</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--white)]">Our Portfolio and Recent Engagements</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto">
                E-Tech Solutions builds solid proof of capability. Review a selection of website developments, networking cabling, open-source firewall deployments, and procurement consultancy roles.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFilterCategory(cat.key)}
                  className={`px-4 py-2 rounded text-xs font-semibold border transition-all cursor-pointer ${
                    filterCategory === cat.key
                      ? 'bg-brand-red border-brand-red text-white'
                      : 'bg-brand-black border-brand-dark-gray text-brand-muted hover:border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Extensive Portfolio Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-brand-charcoal border border-brand-dark-gray rounded-xl overflow-hidden flex flex-col justify-between hover:border-brand-red/30 transition-all duration-300 group"
                >
                  <div className="relative h-44 overflow-hidden bg-black shrink-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-all duration-305"
                    />
                    <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-[var(--white)] group-hover:text-brand-red transition-colors mb-2">
                        {proj.title}
                      </h4>
                      <p className="text-[11px] text-brand-muted leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-brand-dark-gray/30 mt-4 flex items-center justify-between text-[9px] text-brand-muted font-mono uppercase">
                      <span className="text-brand-red">Sri Lankan Target</span>
                      <span>Compliant SLA</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom note on client confidentiality */}
            <div className="text-center max-w-xl mx-auto text-xs text-brand-muted bg-brand-charcoal/80 border border-brand-dark-gray p-4 rounded mt-4">
              <span className="text-brand-red font-display font-semibold block mb-1">Corporate Client Confidentiality:</span>
              To comply with cybersecurity governance laws and individual procurement non-disclosure clauses, some governmental, cybersecurity, and banking defense cases are omitted from the public catalog.
            </div>
          </section>
        )}


        {/* FAQ PAGE (Separate view) */}
        {activePage === 'faq' && (
          <section className="pt-36 sm:pt-40 md:pt-48 pb-24 px-6 max-w-4xl mx-auto flex flex-col gap-12 min-h-[80vh]">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-1">FAQ Index Workspace</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--white)]">Frequently Asked Questions</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto leading-relaxed">
                Explore precise answers regarding core ICT installations, licensed business software deployment, SLAs, corporate auditing, and government procurement consultancy rules.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {FAQS_DATA.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-brand-charcoal border border-brand-dark-gray rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:border-brand-red/30"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-sm sm:text-base font-bold text-[var(--white)] hover:text-brand-red transition-all cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-brand-red transition-transform duration-300 ${expandedFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-dark-gray/60 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}


        {/* CONTACT US HUB */}
        {activePage === 'contact' && (
          <section className="pt-36 sm:pt-40 md:pt-48 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">Connect Desk</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--white)]">Initiate a Consultation</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-2 max-w-xl mx-auto font-sans">
                Contact the E-Tech Solutions Engineering Desk. We will coordinate technical specs drawings, compliance mappings, and provisional estimations.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Side: Contact details */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h3 className="font-display font-semibold text-lg text-brand-red border-b border-brand-dark-gray pb-3 mb-4">
                    Head Office Coordinates & Hotlines
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    We support organizations across Sri Lanka from our central base. Our coordinators handle on-site assemblies, server rack reviews, and SLA maintenance dispatches.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                    <MapPin className="text-brand-red shrink-0" size={24} />
                    <div>
                      <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-red">Registered office base</h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        E-Tech Solutions, 72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                    <Phone className="text-brand-red shrink-0" size={24} />
                    <div>
                      <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-red">Active Telephone Connections</h4>
                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        Primary Landline Desk: +94 112 819548 <br />
                        Corporate Hotlines: +94 72 212 1000 / +94 777 889 734
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                    <Mail className="text-brand-red shrink-0" size={24} />
                    <div>
                      <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-red">Official Emails</h4>
                      <p className="text-xs text-brand-muted mt-1">
                        etechmultisolutions@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Map Embed */}
                <div className="bg-brand-charcoal border border-brand-dark-gray rounded-xl p-5 relative overflow-hidden text-center flex flex-col items-center">
                  <span className="text-[10px] text-brand-red font-mono font-bold uppercase mb-2">Mirihana Regional Access</span>
                  <p className="text-[11px] text-brand-muted leading-relaxed max-w-sm mb-4">
                    Our workspace is positioned near the key administrative sectors of Colombo & central Nugegoda, offering fast physical technician dispatching.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Edirisinghe+Road,+Mirihana,+Nugegoda,+Sri+Lanka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-black border border-brand-dark-gray hover:border-brand-red/30 px-4 py-2.5 rounded text-xs font-bold uppercase text-[var(--white)] inline-flex items-center gap-1 cursor-pointer transition-all w-max"
                  >
                    Launch Navigation Map
                  </a>
                </div>

                {/* Dynamic QR Code Quick Savable Card */}
                <div className="bg-brand-charcoal border border-brand-dark-gray rounded-xl p-5 relative overflow-hidden flex flex-col items-center shadow-lg hover:border-brand-red/30 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-3xl pointer-events-none" />
                  
                  <div className="flex items-center gap-2 mb-3 w-full justify-center">
                    <QrCode className="text-brand-red animate-pulse animate-pulse-slow" size={16} />
                    <span className="text-[10px] text-brand-red font-mono font-bold uppercase tracking-wider">Dynamic QR Access Key</span>
                  </div>

                  <h4 className="font-display font-semibold text-xs text-[var(--white)] mb-1.5 text-center uppercase tracking-wider">
                    Instant Mobile Sync Desk
                  </h4>
                  <p className="text-[11px] text-brand-muted text-center max-w-xs mb-4 leading-relaxed">
                    Scan with your smartphone camera to instantly save our coordinates (vCard), dial support lines, or start an official email thread.
                  </p>

                  {/* Mode Toggle Tabs */}
                  <div className="grid grid-cols-3 gap-1 bg-brand-black/60 p-1 rounded border border-white/5 w-full mb-4 text-[10px]">
                    <button
                      onClick={() => setQrMode('vcard')}
                      className={`py-1.5 rounded transition-all font-medium uppercase font-mono cursor-pointer text-center ${
                        qrMode === 'vcard'
                          ? 'bg-brand-red text-white font-bold'
                          : 'text-brand-muted hover:text-white'
                      }`}
                      title="Load E-Tech Solutions contact profile payload"
                    >
                      vCard Sync
                    </button>
                    <button
                      onClick={() => setQrMode('tel')}
                      className={`py-1.5 rounded transition-all font-medium uppercase font-mono cursor-pointer text-center ${
                        qrMode === 'tel'
                          ? 'bg-brand-red text-white font-bold'
                          : 'text-brand-muted hover:text-white'
                      }`}
                      title="Load direct dialing hotline"
                    >
                      Hotline
                    </button>
                    <button
                      onClick={() => setQrMode('mail')}
                      className={`py-1.5 rounded transition-all font-medium uppercase font-mono cursor-pointer text-center ${
                        qrMode === 'mail'
                          ? 'bg-brand-red text-white font-bold'
                          : 'text-brand-muted hover:text-white'
                      }`}
                      title="Load support e-mail link"
                    >
                      Email Support
                    </button>
                  </div>

                  {/* QR Display Polaroid Container with dynamic styling */}
                  <div className="group relative bg-white p-3 rounded-lg shadow-inner border border-white/10 mb-4 transition-all duration-300 transform hover:scale-102 overflow-hidden">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&color=${theme === 'slate-blue' ? '0284c7' : 'e50914'}&bgcolor=ffffff&data=${encodeURIComponent(
                        qrMode === 'tel' 
                          ? 'tel:+94722121000' 
                          : qrMode === 'mail' 
                          ? 'mailto:etechmultisolutions@gmail.com?subject=ICT%20Consultation%20Inquiry' 
                          : `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:E-Tech Solutions\r\nORG:E-Tech Solutions Sri Lanka\r\nTEL;TYPE=WORK,VOICE:+94722121000\r\nTEL;TYPE=WORK,DESK:+94112819548\r\nEMAIL;TYPE=PREF,INTERNET:etechmultisolutions@gmail.com\r\nADR;TYPE=WORK:;;72/10, Edirisinghe Road, Mirihana;Nugegoda;;Colombo;Sri Lanka\r\nURL:https://etechmultisolutions.com\r\nEND:VCARD`
                      )}`}
                      alt={`QR Code for E-Tech ${qrMode}`}
                      className="w-36 h-36 object-contain relative z-10"
                    />
                    <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none" />
                    
                    {/* Laser Scanner Laser and Overlay */}
                    <div className="absolute inset-0 bg-brand-red/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-15" />
                    <div className="absolute inset-x-0 h-[2.5px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 shadow-[0_0_8px_rgba(229,9,20,0.85)] animate-qr-scanner" />
                  </div>

                  {/* QR Scan Indicators */}
                  <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider mb-4 bg-brand-black/95 px-3 py-1 rounded border border-white/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active payload: <strong className="text-brand-red">{qrMode === 'vcard' ? 'Save Contact' : qrMode === 'tel' ? 'Instant Hotline dialer' : 'Service Desk Email'}</strong></span>
                  </span>

                  {/* Direct Export file triggers */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                    <button
                      onClick={triggerVCardDownload}
                      className="bg-brand-black hover:bg-brand-dark-gray text-white text-xs font-bold py-2 px-3 rounded border border-white/5 hover:border-brand-red/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full text-center"
                      title="Download contact file format (.vcf)"
                    >
                      <Download size={12} className="text-brand-red shrink-0" />
                      <span>{downloadingContact ? 'Exporting...' : 'Save .vcf Card'}</span>
                    </button>
                    <a
                      href={qrMode === 'tel' ? 'tel:+94722121000' : qrMode === 'mail' ? 'mailto:etechmultisolutions@gmail.com?subject=ICT%20Consultation%20Inquiry' : 'https://etechmultisolutions.com'}
                      className="bg-brand-black hover:bg-brand-dark-gray text-white text-xs font-bold py-2 px-3 rounded border border-white/5 hover:border-brand-red/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full text-center"
                    >
                      <ExternalLink size={12} className="text-brand-red shrink-0" />
                      <span>Live Connect</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: Interaction Quote Form widget */}
              <div className="lg:col-span-7">
                <QuoteForm />
              </div>

            </div>
          </section>
        )}


        {/* DETAILED SERVICE VIEW REPRESENTING SECONDARY PAGES */}
        {!['home', 'about', 'services', 'portfolio', 'contact'].includes(activePage) && (
          <ServiceDetailView serviceId={activePage} setActivePage={setActivePage} />
        )}

      </main>

      {/* 20. Footer Section */}
      <Footer setActivePage={setActivePage} scrollToSection={scrollToSection} />

      {/* 21. Data Protection Consent Banner */}
      <DataConsent />

      {/* 22. Animated Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-[60] bg-brand-red hover:bg-[#121214] border border-brand-red/30 hover:border-brand-red/60 text-white p-3.5 rounded-full shadow-[0_10px_30px_rgba(229,9,20,0.3)] transition-colors duration-300 cursor-pointer flex items-center justify-center group"
            title="Scroll back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
