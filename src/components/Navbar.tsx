import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Shield, Mail, Globe, MapPin, Contrast, Facebook, Search } from 'lucide-react';
import { PageId } from '../types';
import EtechLogo from './EtechLogo';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA, PORTFOLIO_PROJECTS } from '../data';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  theme: 'midnight' | 'slate-blue';
  setTheme: (theme: 'midnight' | 'slate-blue') => void;
}

export default function Navbar({ activePage, setActivePage, theme, setTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    { name: 'Web & Software Development', id: 'web-software-development' },
    { name: 'Hardware Solutions', id: 'hardware-solutions' },
    { name: 'Networking Solutions', id: 'networking-solutions' },
    { name: 'Cybersecurity Solutions', id: 'cybersecurity-solutions' },
    { name: 'Software Licensing Support', id: 'software-licensing' },
    { name: 'Maintenance Agreements (AMCs)', id: 'maintenance-agreements' }
  ];

  const consultancyLinks = [
    { name: 'ICT Procurement Consultancy', id: 'ict-procurement-consultancy' },
    { name: 'Cybersecurity Consultancy', id: 'cybersecurity-consultancy' }
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
      <div className="bg-brand-black/95 text-white text-[11px] border-b border-brand-dark-gray py-2 px-4 hidden sm:block font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-brand-muted font-mono">
            <span className="flex items-center gap-1.5">
              <Phone size={11} className="text-brand-red" />
              HOTLINE: +94 752 121 000
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5">
              <Mail size={11} className="text-brand-red" />
              etechmultisolutions@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4 text-brand-muted font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin size={11} className="text-brand-red" />
              COLOMBO, LK
            </span>
            <span className="text-white/10">|</span>
            <a
              href="https://web.facebook.com/etechworldwide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white text-brand-muted transition-colors tracking-wider text-[11px]"
            >
              <Facebook size={12} className="text-[#1877F2]" />
              FACEBOOK
            </a>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5 text-brand-red font-semibold uppercase tracking-wider">
              <Shield size={11} />
              SLA CORE VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <nav
        id="navbar"
        className={`w-full py-4 px-6 border-b transition-all duration-300 ${
          scrolled
            ? 'bg-brand-black/95 backdrop-blur-md border-brand-red/20 shadow-lg'
            : 'bg-brand-black/80 backdrop-blur-sm border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <EtechLogo size={42} className="transform group-hover:scale-105 transition-all" />
            <div>
              <span className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-1">
                E-TECH <span className="text-brand-red">SOLUTIONS</span>
              </span>
              <p className="text-[10px] text-brand-muted tracking-wider uppercase font-mono mt-0.5">
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
                activePage === 'home' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Home
            </button>
            <button
              id="menu-about"
              onClick={() => navigateTo('about')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'about' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              About Us
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
                    'digital-marketing', 'creative-media-production', 'services'
                  ].includes(activePage)
                    ? 'text-brand-red font-semibold'
                    : 'text-white hover:text-brand-red/90'
                }`}
              >
                Solutions & Services
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-brand-charcoal border border-brand-dark-gray rounded-md shadow-2xl p-6 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-3 gap-6"
              >
                {/* Column 1: Core Eng */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider">
                    Core Engineering
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: 'Custom Web & Software', id: 'web-software-development' },
                      { name: 'Hardware Supply & CCTV', id: 'hardware-solutions' },
                      { name: 'Networking & Cabling', id: 'networking-solutions' },
                      { name: 'Active Firewall Protection', id: 'cybersecurity-solutions' },
                      { name: 'Software Licenses Supply', id: 'software-licensing' },
                      { name: 'IT SLA Agreements (AMCs)', id: 'maintenance-agreements' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-white/85 hover:text-brand-red'
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
                    Advisory & Audits
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: 'IT Procurement Consultancy', id: 'ict-procurement-consultancy' },
                      { name: 'Cybersecurity PDPA Audits', id: 'cybersecurity-consultancy' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-white/85 hover:text-brand-red'
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
                    Media & Growth
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {[
                      { name: 'Online Digital Marketing', id: 'digital-marketing' },
                      { name: 'Creative Video Shoots', id: 'creative-media-production' }
                    ].map((link) => (
                      <button
                        key={link.id}
                        onClick={() => navigateTo(link.id as PageId)}
                        className={`text-left text-xs py-1.5 rounded transition-colors ${
                          activePage === link.id ? 'text-brand-red font-bold' : 'text-white/85 hover:text-brand-red'
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
                    View All Integrations Summary →
                  </button>
                </div>
              </div>
            </div>

            <button
              id="menu-portfolio"
              onClick={() => navigateTo('portfolio')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'portfolio' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Portfolio
            </button>
            <button
              id="menu-faq"
              onClick={() => navigateTo('faq')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'faq' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              FAQ
            </button>
            <button
              id="menu-contact"
              onClick={() => navigateTo('contact')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'contact' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Contact
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 bg-brand-charcoal hover:bg-brand-dark-gray border border-white/5 py-1.5 px-3 rounded-md text-xs font-medium text-brand-muted hover:text-white transition-all cursor-pointer group"
              title="Search Services & Projects"
            >
              <Search size={13} className="text-brand-red group-hover:scale-110 transition-transform" />
              <span>Search</span>
            </button>

            {/* Accessibility Theme Toggler single button */}
            <button
              onClick={() => setTheme(theme === 'midnight' ? 'slate-blue' : 'midnight')}
              className="flex items-center gap-1.5 bg-brand-charcoal hover:bg-brand-dark-gray border border-white/5 py-1.5 px-3 rounded-md text-xs font-medium text-brand-muted hover:text-white transition-all cursor-pointer group"
              title={theme === 'midnight' ? 'Switch to Slate Blue Theme' : 'Switch to Midnight Black Theme'}
            >
              <Contrast size={13} className="text-brand-red group-hover:rotate-180 transition-transform duration-300" />
              <span>{theme === 'midnight' ? 'Slate Blue' : 'Midnight'}</span>
            </button>

            {/* Quick Quote Button */}
            <button
              id="nav-cta-quote"
              onClick={() => navigateTo('contact')}
              className="bg-brand-red hover:bg-dark-red text-white text-xs font-bold px-4 py-2.5 rounded-md shadow-md hover:shadow-brand-red/20 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-white hover:text-brand-red transition-colors"
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
              className="p-2 text-white hover:text-brand-red transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Animated ICT Knowledge Marquee below the menu bar */}
      <div className="bg-brand-black/95 text-white text-[10px] font-mono border-b border-brand-dark-gray/60 py-1.5 overflow-hidden flex items-center relative z-20 select-none">
        <div className="absolute left-0 top-0 bottom-0 px-3.5 bg-brand-red text-white font-bold text-[9.5px] tracking-wider flex items-center z-30 shadow-[4px_0_12px_rgba(0,0,0,0.7)] uppercase">
          ICT INTELLIGENCE TICKER
        </div>
        <div className="flex overflow-hidden w-full pl-56">
          <motion.div
            className="flex gap-20 whitespace-nowrap uppercase tracking-wider text-white/90"
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

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[140px] sm:top-[156px] left-0 w-full h-[calc(100vh-140px)] bg-brand-charcoal border-t border-brand-dark-gray p-6 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ${
          isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
        {/* Mobile Accessibility Bar */}
        <div className="flex items-center justify-between bg-brand-black/90 p-3 rounded border border-white/5 mb-2">
          <span className="text-[10px] font-mono text-brand-muted uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Contrast size={12} className="text-brand-red" />
            Accessibility Theme:
          </span>
          <div className="flex items-center gap-1 bg-brand-charcoal border border-white/5 p-1 rounded-md text-[10px] uppercase font-mono">
            <button
              onClick={() => setTheme('midnight')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                theme === 'midnight'
                  ? 'bg-brand-red text-white font-bold'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              Midnight
            </button>
            <button
              onClick={() => setTheme('slate-blue')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                theme === 'slate-blue'
                  ? 'bg-brand-red text-slate-900 font-bold'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              Slate Blue
            </button>
          </div>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'home' ? 'text-brand-red' : 'text-white'}`}
        >
          Home
        </button>
        <button
          onClick={() => navigateTo('about')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'about' ? 'text-brand-red' : 'text-white'}`}
        >
          About Us
        </button>

        {/* Services Dropdown Accordion */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-brand-red uppercase tracking-wide">Our Services</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3">
            {serviceLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id as PageId)}
                className={`text-left text-sm py-1 font-medium ${activePage === link.id ? 'text-brand-red' : 'text-white/80'}`}
              >
                • {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Consultancy Accordion */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-bold text-brand-red uppercase tracking-wide">Consulting and Compliance</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-3">
            {consultancyLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id as PageId)}
                className={`text-left text-sm py-1 font-medium ${activePage === link.id ? 'text-brand-red' : 'text-white/80'}`}
              >
                • {link.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigateTo('digital-marketing')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'digital-marketing' ? 'text-brand-red' : 'text-white'}`}
        >
          Digital Marketing
        </button>
        <button
          onClick={() => navigateTo('creative-media-production')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'creative-media-production' ? 'text-brand-red' : 'text-white'}`}
        >
          Creative Media Production
        </button>
        <button
          onClick={() => navigateTo('portfolio')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'portfolio' ? 'text-brand-red' : 'text-white'}`}
        >
          Portfolio / Projects
        </button>
        <button
          onClick={() => navigateTo('faq')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'faq' ? 'text-brand-red' : 'text-white'}`}
        >
          FAQ
        </button>
        <button
          onClick={() => navigateTo('contact')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'contact' ? 'text-brand-red' : 'text-white'}`}
        >
          Contact Us
        </button>

        <div className="mt-auto pt-6 flex flex-col gap-2 border-t border-brand-dark-gray text-xs text-brand-muted">
          <p>📍 72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka</p>
          <p>📞 +94 112 819548 | 📱 +94 752 121 000</p>
          <a
            href="https://web.facebook.com/etechworldwide"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-brand-red hover:underline font-mono uppercase tracking-wider text-[10px] mt-1.5"
          >
            <Facebook size={12} className="text-[#1877F2]" />
            Connect with us on Facebook
          </a>
        </div>
      </div>

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
                  placeholder="Type to search services, projects, or consulting scopes..."
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
