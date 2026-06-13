import { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, Phone, Shield, Mail, Globe, MapPin, Contrast, Facebook, Search,
  Home, Info, Code, Cpu, Network, FileCode, FileText, Briefcase, Terminal, 
  TrendingUp, Video, Layers, HelpCircle, ExternalLink, Award, QrCode
} from 'lucide-react';
import { PageId } from '../types';
import EtechLogo from './EtechLogo';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA, PORTFOLIO_PROJECTS } from '../data';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  theme: 'midnight' | 'slate-blue';
  setTheme: (theme: 'midnight' | 'slate-blue') => void;
}

export default function Navbar({ activePage, setActivePage, theme, setTheme }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'home': return <Home size={16} className="text-brand-red shrink-0" />;
      case 'about': return <Info size={16} className="text-brand-red shrink-0" />;
      case 'web-software-development': return <Code size={16} className="text-brand-red shrink-0" />;
      case 'hardware-solutions': return <Cpu size={16} className="text-brand-red shrink-0" />;
      case 'networking-solutions': return <Network size={16} className="text-brand-red shrink-0" />;
      case 'cybersecurity-solutions': return <Shield size={16} className="text-brand-red shrink-0" />;
      case 'software-licensing': return <FileCode size={16} className="text-brand-red shrink-0" />;
      case 'maintenance-agreements': return <FileText size={16} className="text-brand-red shrink-0" />;
      case 'ict-procurement-consultancy': return <Briefcase size={16} className="text-brand-red shrink-0" />;
      case 'cybersecurity-consultancy': return <Terminal size={16} className="text-brand-red shrink-0" />;
      case 'digital-marketing': return <TrendingUp size={16} className="text-brand-red shrink-0" />;
      case 'creative-media-production': return <Video size={16} className="text-brand-red shrink-0" />;
      case 'lectures-awareness': return <Award size={16} className="text-brand-red shrink-0" />;
      case 'smart-qr-patrol': return <QrCode size={16} className="text-brand-red shrink-0" />;
      case 'portfolio': return <Layers size={16} className="text-brand-red shrink-0" />;
      case 'faq': return <HelpCircle size={16} className="text-brand-red shrink-0" />;
      case 'contact': return <Mail size={16} className="text-brand-red shrink-0" />;
      default: return <ChevronDown size={16} className="text-brand-red shrink-0" />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (pageId: PageId) => {
    setActivePage(pageId);
    setIsOpen(false);
    setDropdownOpen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const serviceLinks = [
    { name: language === 'si' ? 'වෙබ් සහ මෘදුකාංග සංවර්ධනය' : 'Web & Software Development', id: 'web-software-development' },
    { name: language === 'si' ? 'දෘඩාංග සහ CCTV විසඳුම්' : 'Hardware Solutions', id: 'hardware-solutions' },
    { name: language === 'si' ? 'ජාලකරණ පද්ධති විසඳුම්' : 'Networking Solutions', id: 'networking-solutions' },
    { name: language === 'si' ? 'සයිබර් ආරක්ෂණ විසඳුම්' : 'Cybersecurity Solutions', id: 'cybersecurity-solutions' },
    { name: language === 'si' ? 'මෘදුකාංග බලපත්‍ර සහය' : 'Software Licensing Support', id: 'software-licensing' },
    { name: language === 'si' ? 'නඩත්තු ගිවිසුම් (AMCs)' : 'Maintenance Agreements (AMCs)', id: 'maintenance-agreements' },
    { name: language === 'si' ? 'ස්මාර්ට් QR මුර සංචාරය' : 'Smart QR Patrol Solution', id: 'smart-qr-patrol' }
  ];

  const consultancyLinks = [
    { name: language === 'si' ? 'තොරතුරු තාක්ෂණ උපදේශනය' : 'ICT Procurement Consultancy', id: 'ict-procurement-consultancy' },
    { name: language === 'si' ? 'සයිබර් ආරක්ෂණ විගණන' : 'Cybersecurity Consultancy', id: 'cybersecurity-consultancy' },
    { name: language === 'si' ? 'දේශන සහ දැනුවත් කිරීමේ සේවා' : 'Lectures & Awareness Sessions', id: 'lectures-awareness' }
  ];

  const filteredServices = searchQuery.trim() === '' ? [] : SERVICES_DATA.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.longDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.inclusions.some(inc => inc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProjects = searchQuery.trim() === '' ? [] : PORTFOLIO_PROJECTS.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Banner Contact Details */}
      <div className="bg-brand-charcoal text-[var(--white)] text-[11px] border-b border-brand-dark-gray py-2 px-4 hidden lg:block font-sans shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-4 text-brand-muted font-mono bg-transparent">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Phone size={11} className="text-brand-red font-bold animate-pulse" />
              <span className="font-semibold">{t.hotline}:</span> <span className="text-[var(--white)] font-bold hover:text-brand-red transition-colors whitespace-nowrap">+94 72 212 1000</span>
            </span>
            <span className="text-brand-dark-gray">|</span>
            <span className="flex items-center gap-1.5 flex-wrap whitespace-nowrap">
              <Mail size={11} className="text-brand-red font-bold" />
              <span className="font-semibold">Email:</span> 
              <a href="mailto:info@etechmultisolutions.com" className="text-[var(--white)] font-bold hover:text-brand-red transition-colors whitespace-nowrap">info@etechmultisolutions.com</a>
              <span className="text-brand-dark-gray">/</span>
              <a href="mailto:etechmultisolutions@gmail.com" className="text-[var(--white)] font-bold hover:text-brand-red transition-colors whitespace-nowrap">etechmultisolutions@gmail.com</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-brand-muted font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-brand-red font-bold" />
              <span className="font-semibold">HQ:</span> <span className="text-[var(--white)] font-bold">{t.colomboLk}</span>
            </span>
            <span className="text-brand-dark-gray">|</span>
            <a
              href="https://web.facebook.com/etechworldwide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-brand-red text-[var(--white)] font-bold transition-colors tracking-wider text-[11px]"
            >
              <Facebook size={12} className="text-[#1877F2] shrink-0" />
              FACEBOOK
            </a>
            <span className="text-brand-dark-gray">|</span>
            <span className="flex items-center gap-1.5 text-brand-red font-bold uppercase tracking-wider">
              <Shield size={11} className="text-brand-red animate-pulse" />
              {t.slaVerified}
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav
        id="navbar"
        className={`w-full py-4 px-6 border-b transition-all duration-300 relative z-30 ${
          scrolled
            ? 'bg-brand-black/95 backdrop-blur-md border-brand-red/20 shadow-lg'
            : 'bg-brand-black/80 backdrop-blur-sm border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
          >
            <EtechLogo size={36} className="sm:w-[42px] sm:h-[42px] transform group-hover:scale-105 transition-all shrink-0" />
            <div className="min-w-0">
              <span className="font-display font-bold text-sm sm:text-base md:text-lg text-[var(--white)] tracking-tight flex items-center gap-1 whitespace-nowrap">
                E-TECH <span className="text-brand-red">SOLUTIONS</span>
              </span>
              <p className="text-[9px] sm:text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-mono mt-0.5 truncate max-w-[130px] sm:max-w-none">
                ICT & Cybersecurity Partner
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              id="menu-home"
              onClick={() => navigateTo('home')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'home' ? 'text-brand-red font-semibold' : 'text-[var(--white)] hover:text-brand-red/90'
              }`}
            >
              {t.home}
            </button>
            <button
              id="menu-about"
              onClick={() => navigateTo('about')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'about' ? 'text-brand-red font-semibold' : 'text-[var(--white)] hover:text-brand-red/90'
              }`}
            >
              {t.aboutUs}
            </button>

            {/* Unified Solutions & Services Dropdown */}
            <div className="relative group">
              <button
                id="menu-solutions-dropdown"
                className={`flex items-center gap-1 font-medium text-sm transition-colors cursor-pointer ${
                  [
                    'web-software-development', 'hardware-solutions', 'networking-solutions', 
                    'cybersecurity-solutions', 'software-licensing', 'maintenance-agreements',
                    'ict-procurement-consultancy', 'cybersecurity-consultancy',
                    'digital-marketing', 'creative-media-production', 'services', 'smart-qr-patrol', 'lectures-awareness'
                  ].includes(activePage)
                    ? 'text-brand-red font-semibold'
                    : 'text-[var(--white)] hover:text-brand-red/90'
                }`}
              >
                {t.solutionsServices}
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-brand-charcoal border border-brand-dark-gray rounded-md shadow-2xl p-6 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-6 z-50"
              >
                {/* Column 1: Core Eng */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                    {t.coreEngineering}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: language === 'si' ? 'වෙබ් සහ මෘදුකාංග සංවර්ධනය' : 'Custom Web & Software', id: 'web-software-development' },
                      { name: language === 'si' ? 'දෘඩාංග සහ CCTV සැපයුම' : 'Hardware Supply & CCTV', id: 'hardware-solutions' },
                      { name: language === 'si' ? 'ජාලකරණ පද්ධති විසඳුම්' : 'Networking & Cabling', id: 'networking-solutions' },
                      { name: language === 'si' ? 'pfSense ක්‍රියාකාරී ෆයර්වෝල්' : 'Active Firewall Protection', id: 'cybersecurity-solutions' },
                      { name: language === 'si' ? 'ස්මාර්ට් QR මුර සංචාරක පද්ධතිය' : 'Smart QR Patrol Solution', id: 'smart-qr-patrol' },
                      { name: language === 'si' ? 'මෘදුකාංග බලපත්‍ර සැපයුම' : 'Software Licenses Supply', id: 'software-licensing' },
                      { name: language === 'si' ? 'තාක්ෂණික නඩත්තු ගිවිසුම් (AMCs)' : 'IT SLA Agreements (AMCs)', id: 'maintenance-agreements' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-[var(--white)]/85 hover:text-brand-red'
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 2: Governance & Auditing */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                    {t.advisoryAudits}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: language === 'si' ? 'තොරතුරු තාක්ෂණ උපදේශනය' : 'IT Procurement Consultancy', id: 'ict-procurement-consultancy' },
                      { name: language === 'si' ? 'සයිබර් ආරක්ෂණ විගණන' : 'Cybersecurity PDPA Audits', id: 'cybersecurity-consultancy' },
                      { name: language === 'si' ? 'දේශන සහ දැනුවත් කිරීමේ සේවා' : 'Lectures & Awareness Sessions', id: 'lectures-awareness' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-[var(--white)]/85 hover:text-brand-red'
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Column 3: Growth media */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                    {t.mediaGrowth}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: language === 'si' ? 'ඩිජිටල් අලෙවිකරණය' : 'Online Digital Marketing', id: 'digital-marketing' },
                      { name: language === 'si' ? 'නිර්මාණාත්මක වීඩියෝ නිෂ්පාදනය' : 'Creative Video Shoots', id: 'creative-media-production' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-[var(--white)]/85 hover:text-brand-red'
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-brand-dark-gray my-1.5"></div>
                  <button
                    onClick={() => navigateTo('services')}
                    className="text-left text-[11px] font-bold text-brand-red hover:underline"
                  >
                    {t.viewAllServices}
                  </button>
                </div>
              </div>
            </div>

            <button
              id="menu-portfolio"
              onClick={() => navigateTo('portfolio')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'portfolio' ? 'text-brand-red font-semibold' : 'text-[var(--white)] hover:text-brand-red/90'
              }`}
            >
              {t.portfolio}
            </button>
            <button
              id="menu-faq"
              onClick={() => navigateTo('faq')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'faq' ? 'text-brand-red font-semibold' : 'text-[var(--white)] hover:text-brand-red/90'
              }`}
            >
              {t.faq}
            </button>
            <button
              id="menu-contact"
              onClick={() => navigateTo('contact')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'contact' ? 'text-brand-red font-semibold' : 'text-[var(--white)] hover:text-brand-red/90'
              }`}
            >
              {t.contact}
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 bg-brand-charcoal hover:bg-brand-dark-gray border border-white/5 py-1.5 px-3 rounded-md text-xs font-medium text-brand-muted hover:text-white transition-all cursor-pointer group"
              title="Search Services & Projects"
            >
              <Search size={13} className="text-brand-red group-hover:scale-110 transition-transform" />
              <span>{t.search}</span>
            </button>

            {/* Accessibility Theme Toggler single button */}
            <button
              onClick={() => setTheme(theme === 'midnight' ? 'slate-blue' : 'midnight')}
              className="flex items-center gap-1.5 bg-brand-charcoal hover:bg-brand-dark-gray border border-white/5 py-1.5 px-3 rounded-md text-xs font-medium text-brand-muted hover:text-white transition-all cursor-pointer group"
              title={theme === 'midnight' ? 'Switch to Slate Blue Theme' : 'Switch to Midnight Black Theme'}
            >
              <Contrast size={13} className="text-brand-red group-hover:rotate-180 transition-transform duration-300" />
              <span>{theme === 'midnight' ? t.slateBlueLayout : t.midnightLayout}</span>
            </button>

            {/* Quick Quote Button */}
            <button
              id="nav-cta-quote"
              onClick={() => navigateTo('contact')}
              className="bg-brand-red hover:bg-dark-red text-white text-xs font-bold px-4 py-2.5 rounded-md shadow-md hover:shadow-brand-red/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              {t.requestQuote}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[var(--white)] hover:text-brand-red transition-colors"
              title="Search Services and Projects"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="bg-brand-red p-2 rounded text-white text-xs font-bold"
            >
              Quote
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[var(--white)] hover:text-brand-red transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Animated ICT Knowledge Marquee below the menu bar */}
      <div 
        className="bg-brand-black/95 text-[10px] font-mono border-b border-brand-dark-gray/60 py-1.5 overflow-hidden flex items-center relative z-20 select-none"
        style={{ color: 'var(--white)' }}
      >
        <div className="absolute left-0 top-0 bottom-0 px-3.5 bg-brand-red text-white font-bold text-[9.5px] tracking-wider flex items-center z-30 shadow-[4px_0_12px_rgba(0,0,0,0.7)] uppercase">
          ICT INTELLIGENCE TICKER
        </div>
        <div className="flex overflow-hidden w-full pl-56">
          <motion.div
            className="flex gap-20 whitespace-nowrap uppercase tracking-wider opacity-95"
            animate={{ x: ["0%", "-51.8%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 180,
            }}
          >
            {[
              "🔒 Cybersecurity Tip: Enforce strong Multi-Factor Authentication (MFA) across all endpoints to block 99.9% of credential-hijacking attempts.",
              "⚡ Infrastructure Insight: High-performance SD-WAN combined with dual routing nodes ensures 99.99% active connectivity uptime.",
              "📁 Compliance Directive: To respect Sri Lankan PDPA provisions, secure all consumer records via active databases and encryption-at-rest.",
              "🔧 Preventive AMC Tip: Regular quarterly physical deep-cleans protect corporate server units and extend hardware lifespan by 3+ years.",
              "🌐 Web Engineering: Progressive headless applications improve core web vitals and organic visibility by loading under 1.2 seconds.",
              "🚪 Enterprise Threat: Disable unnecessary legacy subnets (such as SMB p.445 and RDP p.3389) on internet-facing devices."
            ].concat([
              "🔒 Cybersecurity Tip: Enforce strong Multi-Factor Authentication (MFA) across all endpoints to block 99.9% of credential-hijacking attempts.",
              "⚡ Infrastructure Insight: High-performance SD-WAN combined with dual routing nodes ensures 99.99% active connectivity uptime.",
              "📁 Compliance Directive: To respect Sri Lankan PDPA provisions, secure all consumer records via active databases and encryption-at-rest.",
              "🔧 Preventive AMC Tip: Regular quarterly physical deep-cleans protect corporate server units and extend hardware lifespan by 3+ years.",
              "🌐 Web Engineering: Progressive headless applications improve core web vitals and organic visibility by loading under 1.2 seconds.",
              "🚪 Enterprise Threat: Disable unnecessary legacy subnets (such as SMB p.445 and RDP p.3389) on internet-facing devices."
            ]).map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
                <span>{item}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Full-Screen Slider Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[80] bg-brand-black/90 backdrop-blur-md flex justify-end"
          >
            {/* Backdrop close clickable area */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Slide-in Menu Drawer Card */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-brand-charcoal h-full shadow-[0_0_50px_rgba(0,0,0,0.85)] border-l border-brand-dark-gray/60 p-6 flex flex-col justify-between overflow-y-auto z-10"
            >
              <div>
                {/* Header bar of drawer */}
                <div className="flex items-center justify-between border-b border-brand-dark-gray/60 pb-5 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 scale-90">
                      <EtechLogo size={32} />
                    </div>
                    <div>
                      <span className="font-display font-black text-xs uppercase tracking-wider text-[var(--white)] block">E-Tech Solutions</span>
                      <span className="text-[8px] font-mono text-brand-red uppercase font-semibold">Security & ICT SLA System</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-lg bg-brand-black/50 border border-white/5 text-[var(--white)] hover:text-brand-red transition-all cursor-pointer hover:border-brand-red/35"
                    title="Close Menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Theme toggle & Primary Links */}
                <div className="flex flex-col gap-3 bg-brand-black/95 p-3 rounded-xl border border-white/5 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] font-mono text-brand-muted uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Contrast size={12} className="text-brand-red" />
                      {t.interfaceMode}
                    </span>
                    <div className="flex items-center gap-1 bg-brand-charcoal border border-white/5 p-1 rounded-md text-[9px] uppercase font-mono font-bold">
                      <button
                        onClick={() => setTheme('midnight')}
                        className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                          theme === 'midnight'
                            ? 'bg-brand-red text-white'
                            : 'text-brand-muted hover:text-white'
                        }`}
                      >
                        {t.midnightLayout}
                      </button>
                      <button
                        onClick={() => setTheme('slate-blue')}
                        className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                          theme === 'slate-blue'
                            ? 'bg-brand-red text-slate-900 animate-none'
                            : 'text-brand-muted hover:text-white'
                        }`}
                      >
                        {t.slateBlueLayout}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Core Navigation Channels */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {[
                    { name: t.home, id: 'home' },
                    { name: t.aboutUs, id: 'about' },
                    { name: t.portfolio, id: 'portfolio' },
                    { name: t.faq, id: 'faq' }
                  ].map((chan) => (
                    <button
                      key={chan.id}
                      onClick={() => navigateTo(chan.id as PageId)}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        activePage === chan.id 
                          ? 'bg-brand-red/10 border-brand-red/40 text-brand-red font-bold' 
                          : 'bg-brand-black/30 border-white/5 text-[var(--white)]/70 hover:border-brand-red/25 hover:text-[var(--white)]'
                      }`}
                    >
                      {getServiceIcon(chan.id)}
                      <span className="text-xs uppercase font-mono font-semibold tracking-wide">{chan.name}</span>
                    </button>
                  ))}
                </div>

                {/* Scrollable List of Service Categories */}
                <div className="space-y-5">
                  {/* Category Group 1 */}
                  <div>
                    <span className="text-[10px] font-mono text-brand-red uppercase tracking-wider font-bold block mb-2.5 border-b border-brand-dark-gray/40 pb-1">
                      {language === 'si' ? 'අපගේ සේවා ඒකාබද්ධතාවයන්' : 'Our Service Integrations'}
                    </span>
                    <div className="space-y-2">
                      {serviceLinks.map((link) => (
                        <button
                          key={link.id}
                          onClick={() => navigateTo(link.id as PageId)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            activePage === link.id
                              ? 'bg-brand-red/15 border-brand-red/50 text-brand-red shadow-sm'
                              : 'bg-brand-black/50 border-white/5 text-[var(--white)]/70 hover:border-brand-red/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-brand-charcoal/90 border border-white/5 text-brand-red">
                              {getServiceIcon(link.id)}
                            </div>
                            <div>
                              <p className="text-xs font-display font-semibold leading-tight">{link.name}</p>
                              <p className="text-[9px] text-brand-muted font-mono uppercase mt-0.5 tracking-wider">REF ID: {link.id.substring(0, 10)}</p>
                            </div>
                          </div>
                          <span className="text-stone-600 group-hover:text-brand-red text-xs">➔</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Group 2 */}
                  <div>
                    <span className="text-[10px] font-mono text-brand-red uppercase tracking-wider font-bold block mb-2.5 border-b border-brand-dark-gray/40 pb-1">
                      {language === 'si' ? 'සයිබර් උපදේශන සහ අනුකූලතා විගණන' : 'Cyber Advisory & Compliance Reviews'}
                    </span>
                    <div className="space-y-2">
                      {consultancyLinks.map((link) => (
                        <button
                          key={link.id}
                          onClick={() => navigateTo(link.id as PageId)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            activePage === link.id
                              ? 'bg-brand-red/15 border-brand-red/50 text-brand-red shadow-sm'
                              : 'bg-brand-black/50 border-white/5 text-[var(--white)]/70 hover:border-brand-red/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-brand-charcoal/90 border border-white/5 text-brand-red">
                              {getServiceIcon(link.id)}
                            </div>
                            <div>
                              <p className="text-xs font-display font-semibold leading-tight">{link.name}</p>
                              <p className="text-[9px] text-brand-muted font-mono uppercase mt-0.5 tracking-wider">Gov Compliance Core</p>
                            </div>
                          </div>
                          <span className="text-stone-600 group-hover:text-brand-red text-xs">➔</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Core Sectors */}
                  <div>
                    <span className="text-[10px] font-mono text-brand-red uppercase tracking-wider font-bold block mb-2.5 border-b border-brand-dark-gray/40 pb-1">
                      {language === 'si' ? 'ඩිජිටල් මාධ්‍ය සහ ප්‍රවර්ධන' : 'Digital Media & Campaigns'}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { name: 'Digital Marketing Support', id: 'digital-marketing' },
                        { name: 'Creative Media Production', id: 'creative-media-production' }
                      ].map((link) => (
                        <button
                          key={link.id}
                          onClick={() => navigateTo(link.id as PageId)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            activePage === link.id
                              ? 'bg-brand-red/15 border-brand-red/50 text-brand-red'
                              : 'bg-brand-black/50 border-white/5 text-[var(--white)]/70 hover:border-brand-red/30'
                          }`}
                        >
                          {getServiceIcon(link.id)}
                          <span className="text-xs font-display font-medium leading-snug">{link.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer and physical coordinate strip */}
              <div className="mt-8 pt-6 border-t border-brand-dark-gray/50 flex flex-col gap-4">
                <div className="text-[11px] font-mono text-brand-muted space-y-2 text-left bg-brand-black/40 p-4 rounded-xl border border-white/5">
                  <p className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span>HOTLINES: <strong>+94 72 212 1000</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>LANDLINE: <strong>+94 112 819548</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>HQ OFFICE: <strong>Nugegoda, Sri Lanka</strong></span>
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigateTo('contact')}
                    className="flex-1 bg-brand-red hover:bg-red-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-center uppercase tracking-wider font-mono cursor-pointer"
                  >
                    Send Quotation Inquiry
                  </button>
                  <a
                    href="https://web.facebook.com/etechworldwide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-brand-black hover:bg-zinc-800 text-[#1877F2] border border-white/5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                    title="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 sm:px-6">
            {/* Modal Backdrop with deep blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="fixed inset-0 bg-brand-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-brand-charcoal border border-brand-dark-gray rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]"
            >
              {/* Search Bar Header */}
              <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-brand-dark-gray/60 bg-brand-black/40">
                <Search size={22} className="text-brand-red shrink-0" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-white placeholder-brand-muted/70 text-sm sm:text-base font-sans focus:outline-none"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 rounded-md text-brand-muted hover:text-white hover:bg-brand-dark-gray/50 transition-all cursor-pointer"
                  title="Close Search (Esc)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Live Search Results Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
                {searchQuery.trim() === '' ? (
                  <div className="text-center py-8 text-brand-muted text-xs sm:text-sm">
                    <p className="font-mono uppercase tracking-wider mb-2 text-[11px] text-brand-red">Popular Keywords</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-3 max-w-sm mx-auto">
                      {['E-Commerce', 'pfSense', 'Surveillance', 'Cabling', 'Licensing', 'AMC', 'PDPA', 'CCTV'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="bg-brand-black hover:bg-brand-dark-gray border border-brand-dark-gray px-3 py-1.5 rounded text-xs text-white/95 hover:border-brand-red/40 transition-all cursor-pointer"
                        >
                          # {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {/* Services Section */}
                    {filteredServices.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-wider text-brand-red mb-3 font-semibold border-b border-brand-dark-gray pb-1">
                          Matched Services ({filteredServices.length})
                        </h3>
                        <div className="flex flex-col gap-2.5">
                          {filteredServices.map(service => (
                            <button
                              key={service.id}
                              onClick={() => {
                                navigateTo(service.id);
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left bg-brand-black/40 hover:bg-brand-black/90 border border-brand-dark-gray/40 hover:border-brand-red/35 p-3.5 rounded-lg transition-all duration-200 group flex items-start gap-3.5 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded overflow-hidden shrink-0 hidden sm:block border border-brand-dark-gray">
                                <img src={service.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-xs sm:text-sm text-white group-hover:text-brand-red transition-colors flex items-center gap-2">
                                  {service.title}
                                </h4>
                                <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                                  {service.shortDesc}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects Section */}
                    {filteredProjects.length > 0 && (
                      <div>
                        <h3 className="text-[10px] font-mono uppercase tracking-wider text-brand-red mb-3 font-semibold border-b border-brand-dark-gray pb-1">
                          Matched Projects ({filteredProjects.length})
                        </h3>
                        <div className="flex flex-col gap-2.5">
                          {filteredProjects.map(project => (
                            <button
                              key={project.id}
                              onClick={() => {
                                navigateTo('portfolio');
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left bg-brand-black/40 hover:bg-brand-black/90 border border-brand-dark-gray/40 hover:border-brand-red/35 p-3.5 rounded-lg transition-all duration-200 group flex items-start gap-3.5 cursor-pointer"
                            >
                              <div className="w-10 h-10 rounded overflow-hidden shrink-0 hidden sm:block border border-brand-dark-gray">
                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-xs sm:text-sm text-white group-hover:text-brand-red transition-colors">
                                    {project.title}
                                  </h4>
                                  <span className="text-[9px] font-mono uppercase bg-brand-red/10 text-brand-red border border-brand-red/20 px-1.5 py-0.5 rounded shrink-0">
                                    {project.category}
                                  </span>
                                </div>
                                <p className="text-xs text-brand-muted mt-1 leading-relaxed line-clamp-2">
                                  {project.description}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No matches */}
                    {filteredServices.length === 0 && filteredProjects.length === 0 && (
                      <div className="text-center py-10">
                        <p className="text-sm text-brand-muted">
                          No results found matching "<span className="text-brand-red font-medium">{searchQuery}</span>". 
                        </p>
                        <p className="text-[11px] font-mono text-brand-muted/70 mt-1 uppercase">
                          Try searching for keywords like 'development', 'cctv', 'routing' or 'amc'.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="px-4 py-2.5 border-t border-brand-dark-gray/50 bg-brand-black/60 text-[10px] text-brand-muted font-mono flex justify-between items-center">
                <span>Secure local index searchable</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
