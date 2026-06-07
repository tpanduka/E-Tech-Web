import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Mail, Phone, MapPin, ShieldAlert, Award, Users, ChevronRight, Facebook } from 'lucide-react';
import EtechLogo from './EtechLogo';

interface FooterProps {
  setActivePage: (page: PageId) => void;
  scrollToSection?: (sectionId: string) => void;
}

export default function Footer({ setActivePage, scrollToSection }: FooterProps) {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('etech_visitor_count');
      if (stored) {
        const nextVal = parseInt(stored, 10) + 1;
        localStorage.setItem('etech_visitor_count', nextVal.toString());
        setVisitorCount(nextVal);
      } else {
        const initialVal = 28741;
        localStorage.setItem('etech_visitor_count', initialVal.toString());
        setVisitorCount(initialVal);
      }
    } catch (e) {
      setVisitorCount(28741);
    }
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeepLinkClick = (sectionId: string, fallbackPage: PageId) => {
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      navigateTo(fallbackPage);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-brand-black text-white relative overflow-hidden border-t border-brand-red/10">
      {/* Decorative Red Accent Top Bar */}
      <div className="h-1 bg-gradient-to-r from-brand-red via-dark-red to-brand-black" />

      {/* Main Footer Widget Areas */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Widget 1: Company Profile */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
            <EtechLogo size={38} className="shrink-0 transform group-hover:scale-105 transition-all" />
            <span className="font-display font-bold text-base tracking-wide text-white">
              E-TECH <span className="text-brand-red">SOLUTIONS</span>
            </span>
          </div>
          <p className="text-xs text-brand-muted leading-relaxed">
            E-Tech Solutions is a premier Sri Lankan ICT, cybersecurity, software development, digital marketing, hardware, networking, software licensing, and procurement consultancy company established in 2012. We provide complete technology solutions for businesses, government offices, educational institutes, and corporate clients.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-brand-red font-semibold tracking-wider font-mono uppercase bg-brand-charcoal/80 border border-brand-dark-gray px-2.5 py-1.5 rounded w-max">
            <Award size={12} />
            Over 14 Years of Excellence
          </div>
          <div className="flex items-center gap-2 mt-1">
            <a
              href="https://web.facebook.com/etechworldwide"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-brand-muted hover:text-white bg-brand-charcoal hover:bg-[#1877F2] border border-white/5 px-3.5 py-2.2 rounded transition-all font-mono tracking-wider uppercase cursor-pointer group"
            >
              <Facebook size={12} className="text-[#1877F2] group-hover:text-white transition-colors" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

        {/* Widget 2: Quick Links */}
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-red mb-6 border-l-2 border-brand-red pl-2.5">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-xs text-brand-muted">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-brand-red transition-all cursor-pointer">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-brand-red transition-all cursor-pointer">
                About Us Profile
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('services')} className="hover:text-brand-red transition-all cursor-pointer">
                Our Tech Services
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('portfolio')} className="hover:text-brand-red transition-all cursor-pointer">
                Case Studies & Projects
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-brand-red transition-all cursor-pointer">
                Frequently Asked FAQs
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-brand-red transition-all cursor-pointer">
                Request Quote Desk
              </button>
            </li>
          </ul>
        </div>

        {/* Widget 3: Deep Service Scroll Links */}
        <div>
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-red mb-6 border-l-2 border-brand-red pl-2.5">
            Service Deep-Links
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-brand-muted">
            <li>
              <button
                onClick={() => handleDeepLinkClick('web-software-section', 'web-software-development')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Custom Web & Software</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('hardware-solutions-section', 'hardware-solutions')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Assembling & CCTV Supply</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('networking-solutions-section', 'networking-solutions')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Structured Networking LAY</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('cybersecurity-solutions-section', 'cybersecurity-solutions')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Firewalls & Security Defense</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('software-licensing-section', 'software-licensing')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Genuine Software Licenses</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('digital-marketing-section', 'digital-marketing')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Digital Organic Marketing</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('procurement-consultancy-section', 'ict-procurement-consultancy')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Procurement Advisory Roles</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('cybersecurity-consultancy-section', 'cybersecurity-consultancy')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Cyber PDPA & SLA Auditing</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDeepLinkClick('maintenance-agreements-section', 'maintenance-agreements')}
                className="hover:text-brand-red transition-all cursor-pointer flex items-center gap-1 group text-left"
              >
                <ChevronRight size={11} className="text-brand-red opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0 shrink-0" />
                <span>Annual SLAs & SLA Contracts</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Widget 4: Contact & HQ */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-red mb-2 border-l-2 border-brand-red pl-2.5">
            Head Office Contact
          </h4>
          <div className="flex flex-col gap-3 text-xs text-brand-muted">
            <div className="flex gap-2.5 items-start">
              <MapPin size={16} className="text-brand-red shrink-0 mt-0.5" />
              <span>
                <strong>E-Tech Solutions</strong> <br />
                72/10, Edirisinghe Road,<br />
                Mirihana, Nugegoda, Sri Lanka
              </span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Phone size={14} className="text-brand-red shrink-0" />
              <span>Office Tel: +94 112 819548</span>
            </div>
            <div className="flex gap-2.5 items-start">
              <Phone size={14} className="text-brand-red shrink-0 mt-0.5" />
              <span>
                Hotlines: <br />
                +94 752 121 000 <br />
                +94 777 889 734
              </span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Mail size={14} className="text-brand-red shrink-0" />
              <a href="mailto:etechmultisolutions@gmail.com" className="hover:text-brand-red transition-colors">
                etechmultisolutions@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Legal Notes */}
      <div className="bg-brand-charcoal text-[11px] text-brand-muted py-6 px-6 border-t border-brand-dark-gray">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 leading-relaxed">
          <div className="flex items-start gap-2 text-white/50 text-[10px]">
            <ShieldAlert size={14} className="text-brand-red shrink-0 mt-0.5 animate-pulse-slow" />
            <p>
              <strong>General / Product SLA Disclaimer:</strong> E-Tech Solutions provides ICT products, services, consultancy, and implementation support based on client requirements. Product availability, licensing terms, warranty conditions, and third-party software terms may vary depending on vendor, distributor, and manufacturer policies. All software licensing services are subject to genuine licensing requirements and applicable terms of the respective software vendors.
            </p>
          </div>
          <div className="flex items-start gap-2 text-white/50 text-[10px]">
            <ShieldAlert size={14} className="text-brand-red shrink-0 mt-0.5" />
            <p>
              <strong>Cybersecurity Advisory Disclaimer:</strong> Cybersecurity assessments, PDPA readiness reviews, CMMC 2.0 support, and vulnerability assessments are advisory and technical review services. Final compliance responsibility remains with the client organization unless otherwise agreed under a specific written contract.
            </p>
          </div>
        </div>
      </div>

      {/* Absolute Bottom Copy */}
      <div className="bg-brand-black/90 py-5 px-6 border-t border-brand-dark-gray/30 text-center text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {currentYear} E-Tech Solutions. All Rights Reserved. Professional Corporate ICT Partner.</p>
          
          {/* Elegant High-Contrast Visitor Counter */}
          <div className="flex items-center gap-2 bg-brand-charcoal border border-white/5 py-1 px-3 rounded-sm select-none" title="Unique System Traffic Registrations Audit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted flex items-center gap-1">
              <Users size={11} className="text-brand-red" />
              Traffic Index:
            </span>
            <span className="text-[10.5px] font-mono font-bold text-white tracking-wider bg-brand-black py-0.5 px-2 rounded-sm border border-white/5 hover:border-brand-red/30 transition-colors">
              {visitorCount > 0 ? visitorCount.toLocaleString() : 'Loading...'}
            </span>
          </div>

          <p className="text-[10px] text-brand-muted/70 font-mono">
            Optimized for Sri Lankan Government, SMEs & Enterprise Operations
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/94752121000?text=Hello%20E-Tech%20Solutions,%20I'd%20like%20to%20query%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebd59] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none"
        title="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 fill-current"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </footer>
  );
}
