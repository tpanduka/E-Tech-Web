import { useState, useEffect } from 'react';
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
import {
  Shield, Check, Phone, Mail, MapPin, ExternalLink, ArrowRight,
  TrendingUp, Award, Building, HeartHandshake, Users, Info, HelpCircle,
  Laptop, Cpu, Network, CheckCircle2, ChevronDown, Camera, QrCode, Download
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'midnight' | 'slate-blue'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('etech_theme');
      if (stored === 'slate-blue') return 'slate-blue';
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
    localStorage.setItem('etech_theme', theme);
  }, [theme]);

  const [activePage, setActivePage] = useState<PageId>('home');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Dynamic QR Code States and helper functions
  const [qrMode, setQrMode] = useState<'vcard' | 'tel' | 'mail'>('vcard');
  const [downloadingContact, setDownloadingContact] = useState(false);

  const triggerVCardDownload = () => {
    setDownloadingContact(true);
    try {
      const vCardText = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:E-Tech Solutions\r\nORG:E-Tech Solutions Sri Lanka\r\nTEL;TYPE=WORK,VOICE:+94752121000\r\nTEL;TYPE=WORK,DESK:+94112819548\r\nEMAIL;TYPE=PREF,INTERNET:etechmultisolutions@gmail.com\r\nADR;TYPE=WORK:;;72/10, Edirisinghe Road, Mirihana;Nugegoda;;Colombo;Sri Lanka\r\nURL:https://etechmultisolutions.com\r\nEND:VCARD`;
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
    <div className="bg-brand-black min-h-screen flex flex-col text-white font-sans selection:bg-brand-red selection:text-white">
      {/* 1. Sticky Navigation Bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />

      <main className="flex-grow pt-1.5" id="main-content">
        
        {/* HOMEPAGE VIEW */}
        {activePage === 'home' && (
          <div className="flex flex-col">
            
            {/* 2. Hero Section */}
            <Hero setActivePage={setActivePage} />

            {/* 3. Trusted ICT Partner / Company Highlights */}
            <section className="bg-gradient-white-ash py-20 px-6 border-b border-neutral-200 text-center relative overflow-hidden">
              {/* Mesh background overlay */}
              <div className="absolute inset-0 bg-grid-mesh-gray opacity-20 pointer-events-none" />
              
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-center items-center gap-2 mb-3">
                  <span className="h-[1px] w-8 bg-brand-red/45" />
                  <span className="text-[10px] text-brand-red font-mono uppercase font-bold tracking-widest block">
                    IDENTITY COMPLIANCE // ESTD 2012
                  </span>
                  <span className="h-[1px] w-8 bg-brand-red/45" />
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 mb-6 tracking-tight">
                  Driving Digital Growth and Security Across Sri Lanka
                </h2>
                
                {/* Brand quotation pairing using beautiful Playfair Display serif italic font */}
                <p className="text-sm sm:text-base font-serif italic text-stone-700 max-w-2xl mx-auto leading-relaxed mb-6">
                  "Established in 2012, E-Tech Solutions has spent over a decade serving as an integrated ICT and cybersecurity partner. We maintain rigorous compliance Indices to keep enterprise systems secure, genuine, and resilient."
                </p>
                <div className="h-[1px] w-24 bg-neutral-200 mx-auto mb-10" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-neutral-200 hover:border-brand-red/35 transition-all text-left flex flex-col justify-between group shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <Award className="text-brand-red group-hover:scale-110 transition-transform" size={28} />
                        <span className="text-[9px] font-mono text-stone-400 uppercase">REF: ET-01-QUAL</span>
                      </div>
                      <h3 className="font-display font-semibold text-stone-900 mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">Solid Corporate Integrity</h3>
                      <p className="text-[11px] text-stone-600 leading-relaxed">Adhering to strict compliance indices, licensed software guidelines, and transparent procurement policies.</p>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-neutral-200 hover:border-brand-red/35 transition-all text-left flex flex-col justify-between group shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <Shield className="text-brand-red group-hover:scale-110 transition-transform" size={28} />
                        <span className="text-[9px] font-mono text-stone-400 uppercase">REF: ET-02-SECR</span>
                      </div>
                      <h3 className="font-display font-semibold text-stone-900 mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">Cybersecurity Integrated</h3>
                      <p className="text-[11px] text-stone-600 leading-relaxed">No solution is built without security parameters. We audit risk vectors, setup firewalls, and address local PDPA regulations.</p>
                    </div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg border border-neutral-200 hover:border-brand-red/35 transition-all text-left flex flex-col justify-between group shadow-sm hover:shadow-md">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <HeartHandshake className="text-brand-red group-hover:scale-110 transition-transform" size={28} />
                        <span className="text-[9px] font-mono text-stone-400 uppercase">REF: ET-03-SUPP</span>
                      </div>
                      <h3 className="font-display font-semibold text-stone-900 mb-2 text-sm tracking-tight uppercase group-hover:text-brand-red transition-colors">SLA & Lifetime Support</h3>
                      <p className="text-[11px] text-stone-600 leading-relaxed">We provide full Annual Maintenance Contracts (AMCs) to ensure regular hardware tuneups & critical network uptime.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Core Services Section */}
            <section className="bg-gradient-ash-medium py-20 px-6 border-b border-neutral-300 relative overflow-hidden">
              {/* Grid mesh backdrop */}
              <div className="absolute inset-0 bg-grid-mesh-gray opacity-25 pointer-events-none" />

              <div className="max-w-7xl mx-auto text-center relative z-10">
                <span className="text-[10px] text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">
                  SECTOR VERTICAL MATRIX // HIGH CONTRACT DEPLOYMENT
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 mb-4 tracking-tight uppercase">
                  Comprehensive Technology Verticals
                </h2>
                <p className="text-sm font-serif italic text-stone-700 max-w-2xl mx-auto mb-12">
                  "Sourcing premium components, auditing networks for PDPA/SLA compliance, and deploying enterprise firewalls configured with custom routing nodes."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SERVICES_DATA.map((svc, sIdx) => (
                    <div
                      key={svc.id}
                      onClick={() => handleServiceClick(svc.id)}
                      className="bg-white/95 border border-neutral-200/90 rounded-lg p-5 text-left cursor-pointer hover:border-brand-red/45 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                    >
                      <div>
                        {/* Service Photo with clean monochrome overlay */}
                        <div className="relative h-32 w-full overflow-hidden rounded-sm mb-4 bg-black">
                          <img
                            src={svc.image}
                            alt={svc.title}
                            className="w-full h-full object-cover filter brightness-100 contrast-105 group-hover:scale-105 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-2 left-2 bg-black/85 px-2 py-0.5 border border-white/10 text-[9px] font-mono text-brand-red uppercase">
                            ES-VRT-0{sIdx + 1}
                          </div>
                        </div>
                        <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-stone-900 group-hover:text-brand-red transition-colors flex items-center justify-between pb-2 border-b border-stone-200/50">
                          <span>{svc.title}</span>
                          <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-brand-red" />
                        </h3>
                        <p className="text-[11px] text-stone-600 leading-relaxed mt-2 line-clamp-3 font-sans">
                          {svc.shortDesc}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-stone-200/50 flex justify-between items-center text-[10px] uppercase font-mono tracking-wider font-semibold">
                        <span className="text-brand-red/90 font-bold">9+ Core inclusions</span>
                        <span className="text-stone-500 group-hover:text-brand-red transition-all">SLA Specs →</span>
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
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Full-Stack Software Engineering
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Custom Web, E-Commerce, Database Systems & Mobile Applications
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    E-Tech Solutions designs and develops professional websites, web applications, and mobile applications that help businesses build a strong digital presence and automate their operations. From simple business websites to advanced database-driven systems, we deliver scalable, secure, and user-friendly digital solutions tailored to real business requirements.
                  </p>
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
                        <span className="text-xs text-white/90">{item}</span>
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
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Structured Cabling & Active Networks
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Reliable Office Subnets, High-Range Wi-Fi Nodes & Server Room Planning
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
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
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Social Media & Organic Growth
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Professional Channel Creation, Creative Post Design & Content Planning
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
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
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Corporate Software Licensing Advisory
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Windows, Microsoft 365, Adobe Creative Cloud, AutoCAD & Antivirus Subscriptions
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
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
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold">
                    Cybersecurity Governance & Auditing
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                    Sri Lanka PDPA Compliance Readiness, CMMC 2.0 Self-Assessment Support & Risk Mapping
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    Our cybersecurity consultancy services help organizations identify risks, strengthen controls, and prepare for security and compliance requirements. We support PDPA readiness reviews, CMMC 2.0 self-assessment support, vulnerability assessments, security audits, firewall reviews, policy development, and cybersecurity awareness programs.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {[
                      'Local Sri Lankan Personal Data Protection Act (PDPA) audits',
                      'CMMC 2.0 readiness self-assessment checklist support',
                      'Active web app vulnerability assessments (scans)',
                      'Audit reviews of Fortinet/pfSense active rules sets',
                      'Organizing corporate Information Security Policies (WISPs)',
                      'Interactive security hygiene workshops for staff'
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
                      src="https://images.unsplash.com/photo-1584438784894-089d6a128f3e?auto=format&fit=crop&w=800&q=80"
                      alt="Cybersecurity audit review session"
                      className="rounded-lg object-cover w-full h-[320px] brightness-100 filter"
                    />
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
            <section className="bg-gradient-ash-medium py-16 px-6 border-t border-neutral-300 border-b border-neutral-300 select-none">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold block mb-2">
                    Distinguishing Qualities
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
                    Why Dynamic Sri Lankan Brands Select E-Tech Solutions
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-700 max-w-2xl mx-auto mt-2 font-medium">
                    We combine technical expertise, practical implementation experience, cybersecurity awareness, and business-focused thinking to deliver complete ICT and digital solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {WHY_CHOOSE_US_POINTS.map((pt, i) => (
                    <div
                      key={i}
                      className="bg-white border border-neutral-200 rounded-lg p-6 hover:border-brand-red/35 transition-all shadow-sm hover:shadow"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-red/15 text-brand-red text-xs font-mono font-bold flex items-center justify-center mb-4 border border-brand-red/25">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h4 className="font-display font-semibold text-stone-900 mb-2 text-sm">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
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
                <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold block mb-2">
                  Corporate Alignment Scope
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                  Sri Lankan Sectors We Empower
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto mb-10">
                  Delivering reliable network designs, hardware compliance reviews, custom database suites, and digital strategies for diverse industries.
                </p>

                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                  {INDUSTRIES_SERVED.map((ind, i) => (
                    <span
                      key={i}
                      className="bg-brand-charcoal text-white/90 border border-brand-dark-gray px-4 py-2 text-xs rounded-full hover:border-brand-red/30 hover:bg-brand-red/5 transition-all text-center inline-block"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 17. Portfolio / Recent Projects Section */}
            <section className="bg-gradient-white-ash py-16 px-6 border-t border-neutral-200 border-b border-neutral-200">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold block mb-2">
                    Proof of Capability
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900">
                    Our Recent Project Engagements
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto mt-2">
                    Review a brief portfolio of our custom software assemblies, hardware provisioning, and secure structured subnets.
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
                          : 'bg-white border-neutral-200 text-stone-600 hover:border-brand-red/30 hover:text-brand-red'
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
                      className="bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col group hover:border-brand-red/30 transition-all duration-300 shadow-sm hover:shadow"
                    >
                      <div className="relative h-44 overflow-hidden bg-black shrink-0">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover filter brightness-100 group-hover:scale-105 transition-transform duration-305"
                        />
                        <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] uppercase font-mono font-bold px-2 py-1 rounded">
                          {proj.category}
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-bold text-sm text-stone-900 group-hover:text-brand-red transition-colors mb-2">
                            {proj.title}
                          </h4>
                          <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setActivePage('portfolio')}
                          className="text-[11px] text-brand-red font-bold hover:underline mt-4 text-left cursor-pointer"
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
                    className="bg-white border border-neutral-300 hover:border-brand-red/30 text-stone-900 text-xs font-bold px-6 py-3 rounded tracking-wider uppercase transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
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
                  <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold block mb-2">
                    Consolidate Your Scope
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    Request an Estimated Quote Profile
                  </h2>
                  <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto mt-2">
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
                    <span className="text-xs text-brand-red font-mono uppercase tracking-widest font-bold block mb-2">
                      Reach Out Swiftly
                    </span>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Let's Coordinate Your Integration
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mt-2">
                      Our main offices are strategically based in Mirihana, Nugegoda. We welcome visits, phone reviews, or direct technical advisory queries via email or active SLA hotlines.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                      <MapPin className="text-brand-red shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-red">Registered Headquarters Address</h4>
                        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                          E-Tech Solutions, 72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                      <Phone className="text-brand-red shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-red">Active Phone Lines & support</h4>
                        <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                          Office Landline: +94 112 819548 <br />
                          Hotline Streams: +94 752 121 000 / +94 777 889 734
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 bg-brand-charcoal p-4 rounded-lg border border-brand-dark-gray">
                      <Mail className="text-brand-red shrink-0" size={24} />
                      <div>
                        <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-brand-red">Primary Email channels</h4>
                        <p className="text-xs text-brand-muted mt-1">
                          etechmultisolutions@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Map Embed with high-fidelity corporate graphics */}
                <div className="bg-brand-charcoal border border-brand-dark-gray rounded-xl p-6 relative overflow-hidden h-max flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm text-white mb-2 uppercase tracking-wider text-brand-red">Mirihana, Nugegoda HQ Location</h3>
                    <p className="text-xs text-brand-muted mb-6 leading-relaxed">
                      Strategically located close to Nugegoda, Mirihana, providing easy access to corporate centers, governmental boards and SME enterprises in Colombo sub-regions.
                    </p>
                    {/* Visual Vector Grid representation instead of complex heavy iframe */}
                    <div className="w-full h-48 bg-brand-black border border-brand-dark-gray rounded-lg relative flex flex-col items-center justify-center text-center p-4 overflow-hidden">
                      {/* Grid background */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                      <div className="w-10 h-10 rounded-full bg-brand-red/25 border border-brand-red flex items-center justify-center animate-pulse mb-3">
                        <MapPin className="text-brand-red" size={20} />
                      </div>
                      <span className="text-xs text-white font-semibold font-display">72/10, Edirisinghe Road, Mirihana</span>
                      <p className="text-[10px] text-brand-muted mt-1 max-w-xs">GPS Coordinates: 6.8741° N, 79.9015° E</p>
                      <a
                        href="https://maps.google.com/?q=Edirisinghe+Road,+Mirihana,+Nugegoda,+Sri+Lanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-[10px] text-brand-red font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
                      >
                        Navigate on Google Maps <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>



          </div>
        )}


        {/* ABOUT US PAGE */}
        {activePage === 'about' && (
          <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">[ Company Profile ]</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">E-Tech Solutions Profile</h1>
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
              <h3 className="font-display font-semibold text-lg text-white mb-4">Our Practical Philosophy & Commitment</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                Beyond seamless technical implementation, our specialized expertise in ICT procurement consultancy and cybersecurity governance ensures that our clients’ operations are not only technologically advanced, but also resilient, secure, compliant, and strategically aligned for long-term success.
              </p>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                At E-Tech Solutions, we believe technology should not be complicated. It should be reliable, secure, practical, and aligned with the real business needs of every client we serve. Our technical advisors reject over-engineered hype in favor of durable, scalable, and cost-effective operations.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-dark-gray text-center">
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">2012</h4>
                  <p className="text-xs text-white font-medium">Year Established</p>
                  <p className="text-[11px] text-brand-muted mt-1">SLA integrity for 14+ continuous years.</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">100%</h4>
                  <p className="text-xs text-white font-medium">Genuine Software Advisory</p>
                  <p className="text-[11px] text-brand-muted mt-1">We enforce genuine activations & compliance.</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-brand-red mb-1">Col</h4>
                  <p className="text-xs text-white font-medium">Mirihana, Nugegoda Head Office</p>
                  <p className="text-[11px] text-brand-muted mt-1">Sourcing support across all provinces.</p>
                </div>
              </div>
            </div>

            {/* Inclusions segment on about page */}
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-6 text-center">Core Milestones & Technical Security Strengths</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">[ ESTABLISHED IN 2012 ]</span>
                  <h4 className="font-display font-bold text-sm text-white mb-2">A Decade of Integration</h4>
                  <p className="text-xs text-brand-muted">Solid roots in corporate IT cabling, hardware diagnostics, and administrative automation tools.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">[ SECURITY FIRST ]</span>
                  <h4 className="font-display font-bold text-sm text-white mb-2">Rigorous Firewall Mastery</h4>
                  <p className="text-xs text-brand-muted">Specialists in deploying advanced Fortinet equipment & highly optimized open source pfSense cluster parameters.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">[ BRAND ELEVATION ]</span>
                  <h4 className="font-display font-bold text-sm text-white mb-2">Corporate Media & Socials</h4>
                  <p className="text-xs text-brand-muted">Handling product photography, вертикал Reels, YouTube descriptions, and monthly brand scheduling calendars perfectly.</p>
                </div>
                <div className="bg-brand-charcoal border border-brand-dark-gray p-5 rounded-lg">
                  <span className="text-brand-red font-mono font-bold text-[10px] block mb-2">[ UNBIASED ADVISORY ]</span>
                  <h4 className="font-display font-bold text-sm text-white mb-2">Procurement Rigor</h4>
                  <p className="text-xs text-brand-muted">Serving tender boards as trusted advisors to prepare solid TORs, BOQs, and compliance matrices.</p>
                </div>
              </div>
            </div>

            {/* Quick Call to Action block */}
            <div className="bg-brand-red/10 border border-brand-red/30 rounded-xl p-6 text-center max-w-3xl mx-auto">
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wide mb-2">Need to coordinate with our board?</h3>
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
          <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">[ Sector Capabilities ]</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">Our Complete Service Horizons</h1>
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
                      <h3 className="font-display font-bold text-base text-white group-hover:text-brand-red transition-colors mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed mb-6">
                        {svc.shortDesc}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleServiceClick(svc.id)}
                        className="w-full text-center bg-brand-black border border-brand-dark-gray hover:border-brand-red/50 hover:bg-brand-red/5 text-white py-2.5 rounded text-xs font-bold uppercase transition-all tracking-wider cursor-pointer"
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
          <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">[ Showcase ]</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">Our Portfolio and Recent Engagements</h1>
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
                      <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-red transition-colors mb-2">
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
          <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col gap-12 min-h-[80vh]">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">[ FAQ Index Workspace ]</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">Frequently Asked Questions</h1>
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
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-sm sm:text-base font-bold text-white hover:text-brand-red transition-all cursor-pointer"
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
          <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center">
              <span className="text-xs text-brand-red font-mono uppercase font-bold tracking-widest block mb-2">[ Connect Desk ]</span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white">Initiate a Consultation</h1>
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
                        Corporate Hotlines: +94 752 121 000 / +94 777 889 734
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
                    className="bg-brand-black border border-brand-dark-gray hover:border-brand-red/30 px-4 py-2.5 rounded text-xs font-bold uppercase text-white inline-flex items-center gap-1 cursor-pointer transition-all w-max"
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

                  <h4 className="font-display font-semibold text-xs text-white mb-1.5 text-center uppercase tracking-wider">
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
                          ? 'tel:+94752121000' 
                          : qrMode === 'mail' 
                          ? 'mailto:etechmultisolutions@gmail.com?subject=ICT%20Consultation%20Inquiry' 
                          : `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:E-Tech Solutions\r\nORG:E-Tech Solutions Sri Lanka\r\nTEL;TYPE=WORK,VOICE:+94752121000\r\nTEL;TYPE=WORK,DESK:+94112819548\r\nEMAIL;TYPE=PREF,INTERNET:etechmultisolutions@gmail.com\r\nADR;TYPE=WORK:;;72/10, Edirisinghe Road, Mirihana;Nugegoda;;Colombo;Sri Lanka\r\nURL:https://etechmultisolutions.com\r\nEND:VCARD`
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
                      href={qrMode === 'tel' ? 'tel:+94752121000' : qrMode === 'mail' ? 'mailto:etechmultisolutions@gmail.com?subject=ICT%20Consultation%20Inquiry' : 'https://etechmultisolutions.com'}
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
    </div>
  );
}
