import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, X, ChevronDown, ChevronUp, Sparkles, MessageSquare, 
  Layers, Video, LineChart, Target, Calendar, PlusCircle, 
  HelpCircle, ShieldAlert, Award, ArrowRight, HeartHandshake, PhoneCall,
  Facebook, Instagram, Linkedin, Send, Chrome
} from 'lucide-react';

interface DigitalMarketingPackagesProps {
  language: string;
  setActivePage: (page: string) => void;
}

export default function DigitalMarketingPackages({ language, setActivePage }: DigitalMarketingPackagesProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleTerms = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollPackages = () => {
    const el = document.getElementById('marketing-pricing-cards');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCTA = () => {
    setActivePage('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Optional Add-on Services Data
  const addOns = [
    { service: 'Facebook/Instagram ad campaign management', price: 'LKR 25,000 / campaign', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Paid ad creative design', price: 'LKR 5,000 / design', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Additional social media post', price: 'LKR 2,500 / post', icon: <PlusCircle size={14} className="text-zinc-500" /> },
    { service: 'Additional reel/short video edit', price: 'LKR 7,500 / video', icon: <PlusCircle size={14} className="text-zinc-500" /> },
    { service: 'Professional product photography', price: 'LKR 35,000 / session', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'On-location video shoot', price: 'LKR 50,000 / session', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'YouTube video editing', price: 'LKR 20,000 / video', icon: <PlusCircle size={14} className="text-zinc-500" /> },
    { service: 'Logo design', price: 'LKR 25,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Brand guideline document', price: 'LKR 45,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'One-page landing page', price: 'LKR 75,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Full business website', price: 'From LKR 150,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Search engine optimization setup', price: 'From LKR 50,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Google Business Profile setup', price: 'LKR 15,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'WhatsApp Business setup', price: 'LKR 10,000', icon: <PlusCircle size={14} className="text-brand-red" /> },
    { service: 'Social media audit report', price: 'LKR 20,000', icon: <PlusCircle size={14} className="text-zinc-500" /> },
    { service: 'Crisis communication support', price: 'Custom quotation', icon: <PlusCircle size={14} className="text-brand-red" /> },
  ];

  // Platforms managed
  const platforms = [
    { name: 'Facebook', icon: <Facebook size={24} />, desc: 'Primary dynamic community channel' },
    { name: 'Instagram', icon: <Instagram size={24} />, desc: 'Visual storytelling & premium brand aesthetics' },
    { 
      name: 'TikTok', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.14 1.13 1.2 2.68 1.86 4.3 1.88v3.85c-1.63-.02-3.23-.51-4.6-1.42-.31-.2-.6-.42-.87-.66v6.24c.03 2.36-.93 4.63-2.6 6.27-.85.83-1.85 1.48-2.96 1.9-2.31.87-4.9.72-7.1-.42A9.22 9.22 0 01.375 14.1c-.55-2.09-.34-4.32.59-6.26.97-2.02 2.76-3.59 4.93-4.28 1.45-.46 3-.48 4.46-.07V7.5a5.2 5.2 0 00-2.37.95c-.86.64-1.46 1.58-1.7 2.64-.32 1.4.1 2.89 1.12 3.86a5.16 5.16 0 004.91 1.25c1.4-.42 2.51-1.57 2.92-2.96.16-.54.21-1.1.2-1.66V.02z" />
        </svg>
      ), 
      desc: 'Viral organic reach & short-form video loops' 
    },
    { 
      name: 'YouTube', 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ), 
      desc: 'Long-form credibility & smart vertical Shorts' 
    },
    { name: 'LinkedIn', icon: <Linkedin size={24} />, desc: 'B2B enterprise credibility & leadership' },
    { name: 'WhatsApp Business', icon: <MessageSquare size={24} />, desc: 'Direct transactional conversions & customer service' },
    { name: 'Google Business Profile', icon: <Chrome size={24} />, desc: 'Local search domination & verified organic reviews' },
  ];

  // Inclusions Data
  const inclusionsList = [
    'Strategic Content Planning',
    'High-End Graphic Design',
    'Seductive Caption Writing',
    'Optimized Hashtag Strategy',
    'Comprehensive Page Optimization',
    'Defensible Brand Positioning',
    'Proactive Campaign Planning',
    'Experienced Paid Ad Coordination',
    'Granular Performance Reporting',
    'Iterative Growth Recommendations',
    'Monthly Executive Strategy Consultation',
  ];

  // Exclusions Data
  const exclusionsList = [
    'Paid advertising budget (incurred separately)',
    'Influencer modeling/payment fees',
    'Raw material printing & logistics costs',
    'Professional photography/videography scopes',
    'Professional voice-over artist charges',
    'External actor/model hiring payments',
    'On-site studio rental fees',
    'Product sample procurement costs',
    'On-the-road travel & premium accommodation',
    'Legal representation for regulated/restricted advertising',
    'Full-time customer service call center operations',
  ];

  // Terms and conditions accordion
  const terms = [
    {
      title: '1. Page Ownership',
      desc: 'The client remains the sole owner of all social media pages, business accounts, advertising accounts, YouTube channels, and related digital assets. E-Tech Solutions may be given page/admin access strictly for service delivery.'
    },
    {
      title: '2. Admin Access',
      desc: 'The client must provide the required access to social media pages, Meta Business Suite, Google accounts, YouTube Studio, TikTok Business, LinkedIn page, or other platforms as required for publishing and optimization.'
    },
    {
      title: '3. Paid Advertising Budget',
      desc: 'All advertising budgets are paid by the client. E-Tech Solutions’ service fee does not include advertising spend. Ad budgets are billed directly to the client’s debit/credit card by Meta/Google.'
    },
    {
      title: '4. Content Approval',
      desc: 'The client must approve posts, captions, campaign messages, offers, prices, and claims before publishing, unless a pre-approved content calendar is signed-off for automated publishing.'
    },
    {
      title: '5. Response Handling',
      desc: 'Inbox replies, comment replies, customer service, and sales follow-up are not included unless specifically outlined in the selected package or contracted under a separate hourly customer support service.'
    },
    {
      title: '6. Ad Revenue',
      desc: 'Any YouTube monetization, page monetization, partner affiliate income, or ad revenue belongs entirely to the client unless otherwise agreed in writing under a custom revenue-share framework.'
    },
    {
      title: '7. Minimum Contract Period',
      desc: 'Recommended minimum engagement period: 3 months. Digital marketing requires consistency to manifest brand-trust indicators. One-month campaigns are possible, but significant brand growth and measurable performance usually require at least 90 days.'
    }
  ];

  return (
    <div className="bg-[#030303] text-white">
      {/* Hero Sub-Header within service classification */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 md:px-8 border-b border-zinc-800 bg-gradient-to-b from-black/80 to-zinc-950/80">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-grid-mesh-gray" />
        
        {/* Glow Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-red/10 blur-[80px]" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/25 text-brand-red font-mono text-[10px] font-bold uppercase tracking-wider mb-4 animate-pulse">
            <Sparkles size={11} /> ESTD 2012 SOCIAL SYSTEMS
          </span>
          
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase mb-4 leading-none">
            Digital Marketing & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-red to-white">
              Social Media Packages
            </span>
          </h2>
          
          <p className="text-zinc-400 font-mono text-xs sm:text-sm tracking-wider uppercase max-w-2xl mx-auto mb-6">
            Grow your brand. Engage your audience. Convert attention into business.
          </p>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            E-Tech Solutions provides end-to-end digital marketing and social media management services for businesses, professionals, institutions, public figures, and organizations that need a strong online presence. We manage your digital channels strategically — from content planning and creative design to page management, video content, paid advertising coordination, reporting, and audience engagement.
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <button
              onClick={scrollPackages}
              className="bg-brand-red hover:bg-red-700 text-white font-mono text-xs font-bold py-3.5 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all cursor-pointer uppercase tracking-wider"
            >
              View Our Packages
            </button>
            <button
              onClick={handleCTA}
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-brand-red font-mono text-xs font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer uppercase tracking-wider flex items-center gap-2"
            >
              <PhoneCall size={13} className="text-brand-red" />
              <span>Request Free Consultation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards Section */}
      <section id="marketing-pricing-cards" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-12">
          <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase text-white">
            SELECT A CAMPAIGN ARCHITECTURE
          </h3>
          <p className="text-xs font-mono text-brand-red uppercase tracking-wider mt-1">
            Pricing structures fine-tuned for small businesses, SMEs, and Premium Brands
          </p>
        </div>

        {/* 3 Columns Responsive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Starter Presence */}
          <div className="bg-[#0b0c10] border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative group shadow-2xl">
            {/* Top design bracket */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-zinc-800" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-zinc-800" />
            
            <div>
              <div className="mb-6">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  TACTICAL PRESENCE // INDEX-01
                </span>
                <h4 className="font-display font-bold text-lg text-white group-hover:text-brand-red transition-colors">
                  Starter Presence Package
                </h4>
                <p className="text-xs text-zinc-400 mt-2 font-sans italic min-h-[48px]">
                  Best for small businesses, startups, personal brands, and professionals who need a basic but professional social media presence.
                </p>
              </div>

              {/* Price */}
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 mb-6 text-center">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">INVESTMENT</span>
                <span className="text-xl sm:text-2xl font-display font-black text-brand-red">LKR 35,000</span>
                <span className="text-zinc-400 text-[10px] font-mono block">/ Month</span>
              </div>

              {/* Features Accordion representation */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-3 flex items-center justify-between">
                    <span>What is Included:</span>
                    <span className="text-neutral-600 font-normal">10 Core Features</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {[
                      'Facebook page management',
                      'Instagram page management',
                      'Monthly content calendar',
                      '8 social media posts per month',
                      'Basic graphic designs',
                      'Caption writing',
                      'Hashtag suggestions',
                      'Basic page optimization',
                      'Inbox/comment monitoring guidance',
                      'Monthly performance summary'
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-brand-red shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Best For:
                  </h5>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Small businesses', 'New brands', 'Consultants', 'Tuition classes', 'Service providers', 'Shops & local businesses'].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono bg-zinc-950 border border-zinc-900 text-zinc-300 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Deliverables:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Designed Posts:</span>
                      <span className="text-white font-bold">8 posts</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Copywriting:</span>
                      <span className="text-white font-bold">8 captions</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Content Calendar:</span>
                      <span className="text-white font-bold">1 Plan</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Reporting:</span>
                      <span className="text-white font-bold">1 Basic Report</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-950/10 border border-red-950/25 p-3.5 rounded-xl">
                  <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Strict Exclusions:
                  </h5>
                  <ul className="space-y-1 text-[11px] text-zinc-400 font-sans">
                    {['Paid ad budget', 'Video production', 'Reels/TikTok videos', 'Daily inbox handling', 'Photography/videography', 'Advanced campaign strategy'].map((exl, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <X size={10} className="text-brand-red/60" />
                        <span>{exl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleCTA}
              className="mt-8 w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-brand-red text-white font-mono text-xs font-bold py-3.5 px-4 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
            >
              Start Basic Social Media Management
            </button>
          </div>

          {/* Card 2: Business Growth (RECOMMENDED) */}
          <div className="bg-[#0b0c10] border-2 border-brand-red rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-red-500 transition-all duration-300 relative group shadow-[0_0_50px_rgba(229,9,20,0.15)]">
            {/* Recommendation badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-red text-white py-1.5 px-4 text-[10px] font-mono tracking-widest uppercase font-black rounded-full shadow-[0_4px_12px_rgba(229,9,20,0.3)] animate-pulse">
              RECOMMENDED SYSTEMS
            </div>
            
            {/* Top design bracket */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-brand-red/35" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-brand-red/35" />

            <div>
              <div className="mb-6 mt-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  FAST ACCELERATION // INDEX-02
                </span>
                <h4 className="font-display font-bold text-lg text-white">
                  Business Growth Package
                </h4>
                <p className="text-xs text-zinc-300 mt-2 font-sans italic min-h-[48px]">
                  Our recommended package for growing businesses that need consistent branding, better engagement, and structured digital campaigns.
                </p>
              </div>

              {/* Price */}
              <div className="bg-brand-red/5 border border-brand-red/20 rounded-xl p-4 mb-6 text-center">
                <span className="text-[9px] font-mono text-brand-red uppercase block font-black">INVESTMENT</span>
                <span className="text-xl sm:text-2xl font-display font-black text-white">LKR 75,000</span>
                <span className="text-zinc-400 text-[10px] font-mono block">/ Month</span>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-mono font-bold text-brand-red uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-3 flex items-center justify-between">
                    <span>What is Included:</span>
                    <span className="text-brand-muted font-bold">14 Accelerated Features</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-zinc-200">
                    {[
                      'Facebook page management',
                      'Instagram page management',
                      'TikTok or YouTube Shorts planning',
                      'Monthly content calendar',
                      '12 social media posts per month',
                      '4 short-form video/reel concepts per month',
                      'Caption writing',
                      'Hashtag strategy',
                      'Basic competitor review',
                      'Page/profile optimization',
                      'Campaign planning',
                      'Paid ad campaign setup support',
                      'Monthly performance report',
                      'Monthly strategy review meeting'
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-brand-red shrink-0 mt-0.5" />
                        <span className="font-medium text-white">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Best For:
                  </h5>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['SMEs', 'Retail businesses', 'Training institutes', 'Restaurants & cafés', 'Consultants', 'Real estate', 'Education providers', 'Tech companies'].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono bg-zinc-950 border border-zinc-900 text-zinc-200 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Deliverables:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Designed Posts:</span>
                      <span className="text-white font-bold">12 posts</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Short Videos/Reels:</span>
                      <span className="text-white font-bold">4 concepts</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Copywriting:</span>
                      <span className="text-white font-bold">16 captions</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Campaign Planning:</span>
                      <span className="text-white font-bold">1 Monthly Plan</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Analytics Review:</span>
                      <span className="text-emerald-400 font-bold">1 Report + 1 Meeting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-950/10 border border-red-950/25 p-3.5 rounded-xl">
                  <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Strict Exclusions:
                  </h5>
                  <ul className="space-y-1 text-[11px] text-zinc-400 font-sans">
                    {['Paid ad budget', 'Professional video shooting', 'Influencer payments', 'Website development', 'Large-scale ad management', 'Product photography'].map((exl, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <X size={10} className="text-brand-red/60" />
                        <span>{exl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleCTA}
              className="mt-8 w-full bg-brand-red hover:bg-red-700 text-white font-mono text-xs font-bold py-4 px-4 rounded-xl shadow-[0_0_30px_rgba(229,9,20,0.25)] hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] transition-all uppercase tracking-wider cursor-pointer"
            >
              Grow My Business Online
            </button>
          </div>

          {/* Card 3: Premium Brand Management */}
          <div className="bg-[#0b0c10] border border-zinc-900 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-zinc-800 transition-all duration-300 relative group shadow-2xl">
            {/* Top design bracket */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-zinc-800" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-zinc-800" />

            <div>
              <div className="mb-6">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  AGGRESSIVE ACQUISITION // INDEX-03
                </span>
                <h4 className="font-display font-bold text-lg text-white group-hover:text-brand-red transition-colors">
                  Premium Brand Management Package
                </h4>
                <p className="text-xs text-zinc-400 mt-2 font-sans italic min-h-[48px]">
                  A complete digital marketing management package for brands that need aggressive visibility, professional content, paid campaign coordination, and strong brand positioning.
                </p>
              </div>

              {/* Price */}
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 mb-6 text-center">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">INVESTMENT</span>
                <span className="text-xl sm:text-2xl font-display font-black text-brand-red">LKR 150,000</span>
                <span className="text-zinc-400 text-[10px] font-mono block">/ Month</span>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-3 flex items-center justify-between">
                    <span>What is Included:</span>
                    <span className="text-neutral-600 font-normal">20 Professional Features</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-zinc-300">
                    {[
                      'Facebook management',
                      'Instagram management',
                      'TikTok management',
                      'YouTube channel management support',
                      'LinkedIn page management, if required',
                      'Monthly strategy session',
                      'Full monthly content calendar',
                      '20 social media posts per month',
                      '8 reels/short-form video concepts per month',
                      'Caption writing and copywriting',
                      'Campaign theme development',
                      'Paid ad campaign planning',
                      'Paid ad setup and monitoring support',
                      'Audience targeting recommendations',
                      'Competitor review',
                      'Brand tone & content guideline',
                      'Monthly analytics & growth report',
                      'Lead generation campaign support',
                      'Basic reputation monitoring',
                      'Priority consultant support'
                    ].map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={12} className="text-brand-red shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Best For:
                  </h5>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Established SMEs', 'Corporate brands', 'Educational institutes', 'Professional services', 'Public figures', 'Large retail', 'Tech corporations', 'Export-oriented'].map((tag, i) => (
                      <span key={i} className="text-[9px] font-mono bg-zinc-950 border border-zinc-900 text-zinc-300 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-900 pb-1.5 mb-2">
                    Deliverables:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Designed Posts:</span>
                      <span className="text-white font-bold">20 posts</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Short Videos/Reels:</span>
                      <span className="text-white font-bold">8 concepts</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Copywriting Items:</span>
                      <span className="text-white font-bold">28 items</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Paid Ad Strategy:</span>
                      <span className="text-red-400 font-bold">1 campaign plan</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-zinc-500">Advanced Analytics:</span>
                      <span className="text-emerald-400 font-bold">1 detailed report + meeting</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-950/10 border border-red-950/25 p-3.5 rounded-xl">
                  <h5 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Strict Exclusions:
                  </h5>
                  <ul className="space-y-1 text-[11px] text-zinc-400 font-sans">
                    {['Paid ad budget', 'Influencer fees/payments', 'Studio production costs', 'Major heavy editing projects', 'Full documentary video', 'SEO / Web coding'].map((exl, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <X size={10} className="text-brand-red/60" />
                        <span>{exl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={handleCTA}
              className="mt-8 w-full bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-brand-red text-white font-mono text-xs font-bold py-3.5 px-4 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
            >
              Build My Premium Brand
            </button>
          </div>

        </div>
      </section>

      {/* Platform management section */}
      <section className="py-16 bg-[#060608] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-brand-red uppercase tracking-wider block mb-1">
              PROACTIVE ADAPTABILITY
            </span>
            <h3 className="font-display font-black text-2xl tracking-tight uppercase text-white">
              Platforms We Manage
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mt-2 leading-relaxed">
              Platform selection depends on the client’s industry, target audience, content type, and marketing objectives. We design target architectures optimized for relevant consumer conversions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((plat, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b0c10] border border-zinc-900 p-5 rounded-2xl w-full sm:w-[220px] text-center flex flex-col items-center gap-3 hover:border-brand-red/35 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-3 bg-brand-red/10 border border-brand-red/25 rounded-xl text-brand-red">
                  {plat.icon}
                </div>
                <div>
                  <h5 className="font-display font-bold text-xs text-white uppercase tracking-tight">
                    {plat.name}
                  </h5>
                  <p className="text-[10px] text-zinc-500 mt-1 font-sans leading-normal">
                    {plat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Add-on Services section */}
      <section className="py-16 bg-gradient-to-b from-[#030303] to-[#08080a] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-brand-red uppercase tracking-wider block mb-1">
              MODULAR FLEXIBILITY
            </span>
            <h3 className="font-display font-black text-2xl tracking-tight uppercase text-white">
              Optional Add-on Services
            </h3>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
              Select key components to supercharge your brand campaigns
            </p>
          </div>

          {/* Grid layout for add-ons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {addOns.map((add, i) => (
              <div 
                key={i} 
                className="bg-[#0a0a0e] border border-zinc-900/80 p-4 rounded-xl flex items-start gap-3 hover:border-zinc-800 transition-all cursor-pointer group"
              >
                <div className="p-2 bg-zinc-950 rounded-lg group-hover:bg-brand-red/10 group-hover:text-brand-red transition-all mt-0.5">
                  {add.icon}
                </div>
                <div className="min-w-0">
                  <h6 className="text-xs text-zinc-200 group-hover:text-white font-medium truncate leading-tight">
                    {add.service}
                  </h6>
                  <span className="text-[10px] font-mono text-brand-red font-bold uppercase mt-1 block">
                    {add.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions and Exclusions side-by-side section */}
      <section className="py-16 bg-[#030303] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* What We Provide Column */}
          <div className="bg-[#0a0a0f] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-emerald-500/10" />
            <h3 className="font-display font-black text-lg text-emerald-400 uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-sm" />
              What We Provide
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inclusionsList.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-4 h-4 bg-emerald-500/10 border border-emerald-500/30 rounded flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-emerald-400 shrink-0" strokeWidth={3} />
                  </div>
                  <span className="text-[12px] text-zinc-300 font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do Not Provide Column */}
          <div className="bg-[#0a0a0f] border border-zinc-900 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-red/10" />
            <h3 className="font-display font-black text-lg text-brand-red uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-brand-red rounded-sm" />
              What We Do Not Provide Unless Separately Agreed
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exclusionsList.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="w-4 h-4 bg-brand-red/10 border border-brand-red/30 rounded flex items-center justify-center shrink-0 mt-0.5">
                    <X size={10} className="text-brand-red shrink-0" strokeWidth={3} />
                  </div>
                  <span className="text-[12px] text-zinc-400 font-sans">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Important Terms accordion section */}
      <section className="py-16 bg-[#060608] border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-zinc-500 uppercase block">REGULATORY TRANSPARENCY</span>
            <h3 className="font-display font-black text-2xl tracking-tight uppercase text-white mt-1">
              Important Terms of Engagement
            </h3>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Ensuring dynamic operating expectations & clear corporate boundary lines
            </p>
          </div>

          <div className="space-y-3">
            {terms.map((term, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#0b0c10] border border-zinc-900 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleTerms(index)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-3 cursor-pointer select-none"
                  >
                    <span className="font-display font-semibold text-xs sm:text-xs text-zinc-200 uppercase tracking-wider">
                      {term.title}
                    </span>
                    <span className="text-brand-red shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-zinc-900 text-xs sm:text-xs text-zinc-400 font-sans leading-relaxed">
                      {term.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Website Disclaimer Section */}
      <section className="py-10 max-w-4xl mx-auto px-6">
        <div className="bg-[#0c0d12]/60 border border-brand-red/15 rounded-xl p-5 sm:p-6 flex gap-4">
          <ShieldAlert size={24} className="text-brand-red shrink-0 mt-0.5 animate-pulse-slow" />
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-widest block mb-2">
              DIGITAL DEPLOYMENT ADVISORY AGREEMENT
            </span>
            <h5 className="font-display font-bold text-xs text-white uppercase tracking-tight mb-2">
              Website & Campaign Disclaimer
            </h5>
            <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-relaxed font-sans">
              E-Tech Solutions provides digital marketing, social media management, creative content planning, campaign coordination, and performance reporting services. Final business results depend on market demand, advertising budget, audience behavior, product/service quality, competition, and client-side sales follow-up. Paid advertising budgets, photography, videography, influencer payments, and third-party platform costs are not included unless specifically stated in the selected package.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-20 bg-gradient-to-t from-black to-[#050508] border-t border-zinc-900 text-center relative overflow-hidden">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-red/10 blur-[90px]" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <HeartHandshake size={32} className="text-brand-red mb-4" />
          
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
            Ready to Grow Your Digital Presence?
          </h3>
          
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mb-8">
            Choose the right digital marketing package for your brand and let E-Tech Solutions manage your online growth with strategy, creativity, and measurable execution.
          </p>

          <div className="flex gap-3.5 flex-wrap justify-center">
            <button
              onClick={handleCTA}
              className="bg-brand-red hover:bg-red-700 text-white font-mono text-xs font-bold py-4 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all cursor-pointer uppercase tracking-wider"
            >
              Request a Free Consultation
            </button>
            <button
              onClick={scrollPackages}
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-brand-red font-mono text-xs font-bold py-4 px-6 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
            >
              View Our Packages
            </button>
            <button
              onClick={handleCTA}
              className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-brand-red font-mono text-xs font-bold py-4 px-6 rounded-xl transition-all cursor-pointer uppercase tracking-wider"
            >
              Contact E-Tech Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
