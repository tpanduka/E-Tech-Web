import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone, Shield, Mail, Globe, MapPin } from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
}

export default function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

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
            <div className="relative w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-display font-bold text-white text-xl tracking-wider shadow-md transform group-hover:scale-105 transition-all">
              E
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-tight flex items-center gap-1">
                E-TECH <span className="text-brand-red">SOLUTIONS</span>
              </span>
              <p className="text-[10px] text-brand-muted tracking-wider uppercase font-mono">
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

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                id="menu-services-dropdown"
                onMouseEnter={() => setDropdownOpen('services')}
                className={`flex items-center gap-1 font-medium text-sm transition-colors cursor-pointer ${
                  ['web-software-development', 'hardware-solutions', 'networking-solutions', 'cybersecurity-solutions', 'software-licensing', 'maintenance-agreements', 'services'].includes(activePage)
                    ? 'text-brand-red'
                    : 'text-white hover:text-brand-red/90'
                }`}
              >
                Services
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div
                className="absolute top-full left-0 w-72 bg-brand-charcoal border border-brand-dark-gray rounded-md shadow-2xl p-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {serviceLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id as PageId)}
                    className={`w-full text-left p-2.5 rounded-md text-xs font-medium transition-colors hover:bg-brand-dark-gray flex items-center justify-between ${
                      activePage === link.id ? 'text-brand-red bg-brand-black/55' : 'text-white/90 hover:text-brand-red'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="border-t border-brand-dark-gray my-1"></div>
                <button
                  onClick={() => navigateTo('services')}
                  className="w-full text-center text-[11px] py-1 text-brand-red font-bold hover:underline"
                >
                  View All Services →
                </button>
              </div>
            </div>

            {/* Consultancy Dropdown */}
            <div className="relative group">
              <button
                id="menu-consultancy-dropdown"
                onMouseEnter={() => setDropdownOpen('consultancy')}
                className={`flex items-center gap-1 font-medium text-sm transition-colors cursor-pointer ${
                  ['ict-procurement-consultancy', 'cybersecurity-consultancy'].includes(activePage)
                    ? 'text-brand-red'
                    : 'text-white hover:text-brand-red/90'
                }`}
              >
                Consulting & Audits
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div
                className="absolute top-full left-0 w-72 bg-brand-charcoal border border-brand-dark-gray rounded-md shadow-2xl p-2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {consultancyLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => navigateTo(link.id as PageId)}
                    className={`w-full text-left p-2.5 rounded-md text-xs font-medium transition-colors hover:bg-brand-dark-gray ${
                      activePage === link.id ? 'text-brand-red bg-brand-black/55' : 'text-white/90 hover:text-brand-red'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="menu-marketing"
              onClick={() => navigateTo('digital-marketing')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'digital-marketing' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Digital Marketing
            </button>
            <button
              id="menu-media"
              onClick={() => navigateTo('creative-media-production')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'creative-media-production' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Creative Production
            </button>
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
              id="menu-contact"
              onClick={() => navigateTo('contact')}
              className={`font-medium text-sm transition-colors cursor-pointer ${
                activePage === 'contact' ? 'text-brand-red font-semibold' : 'text-white hover:text-brand-red/90'
              }`}
            >
              Contact
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

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-[112px] sm:top-[128px] left-0 w-full h-[calc(100vh-112px)] bg-brand-charcoal border-t border-brand-dark-gray p-6 flex flex-col gap-4 overflow-y-auto transition-all duration-300 ${
          isOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
        }`}
      >
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
          onClick={() => navigateTo('contact')}
          className={`text-left font-display font-semibold text-lg border-b border-brand-dark-gray pb-2 ${activePage === 'contact' ? 'text-brand-red' : 'text-white'}`}
        >
          Contact Us
        </button>

        <div className="mt-auto pt-6 flex flex-col gap-2 border-t border-brand-dark-gray text-xs text-brand-muted">
          <p>📍 72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka</p>
          <p>📞 +94 112 819548 | 📱 +94 752 121 000</p>
        </div>
      </div>
    </header>
  );
}
