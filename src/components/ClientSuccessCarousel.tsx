import React, { useState, useEffect } from 'react';
import { Quote, Building2, ShieldCheck, ChevronLeft, ChevronRight, Play, Pause, Globe, Cpu, Award, BadgeAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessStory {
  id: string;
  clientName: string;
  website?: string;
  industry: string;
  projectType: string;
  feedback: string;
  representative: string;
  metric?: string;
  refCode: string;
  avatarInitials: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'skillsmin',
    clientName: 'Ministry of Skills Development & Vocational Training',
    website: 'skillsmin.gov.lk',
    industry: 'Government / Vocational Education Sector',
    projectType: 'National Educational Portal Platform & Core Architecture Redesign',
    feedback: 'E-Tech Solutions successfully executed a complete vocational website architecture overhaul! They delivered robust, load-balanced uptime under high simultaneous traffic demands and crafted simplified, accessible navigation standards for search paths across Sri Lanka.',
    representative: 'Executive Representative for ICT Services Liaison',
    metric: '100% Uptime Under Launch Load',
    refCode: 'GOV-ET-2012',
    avatarInitials: 'MS'
  },
  {
    id: 'delvon',
    clientName: 'Delvon Securities & Investigations',
    website: 'delvon.com',
    industry: 'Secure Logistics & Guarding Operations',
    projectType: 'SmartQR Patrol Tracking Mobile App & Dashboard System',
    feedback: 'The offline-first SmartQR patrol system built by E-Tech Solutions revolutionized our active security logs! Our field agent tracking & dispatch metrics improved by 40% using their secure scanning check-ins and centralized cloud server arrays.',
    representative: 'Managing Director & Operations Head',
    metric: '40% Operation Dispatch Efficiency Gain',
    refCode: 'SEC-ET-QR24',
    avatarInitials: 'DS'
  },
  {
    id: 'crange',
    clientName: 'C-Range International (Pvt) Ltd',
    website: 'crange.lk',
    industry: 'Retail, Imports and Bulk Commodities',
    projectType: 'Enterprise pfSense Network Firewall & Secure Multi-Site Subnet',
    feedback: 'E-Tech deployed customized pfSense gateway clusters to safeguard our central databases and POS nodes. We have seen zero malicious connection drops or network congestion since implementation. Their technical support SLA is uncompromising.',
    representative: 'Chief Operations & Procurement Liaison',
    metric: 'Zero Security Incidents Since Deployment',
    refCode: 'NET-ET-PF88',
    avatarInitials: 'CR'
  }
];

export default function ClientSuccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };

  const current = SUCCESS_STORIES[activeIndex];

  return (
    <section className="bg-brand-charcoal py-24 px-6 border-b border-brand-dark-gray relative overflow-hidden">
      {/* Background Mesh Overlay & Elegant Lighting */}
      <div className="absolute inset-0 bg-grid-mesh-gray opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-red/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-red-950/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block with high design aesthetic */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3 bg-brand-red/10 border border-brand-red/20 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest text-brand-red uppercase font-semibold">
            <Sparkles size={11} className="animate-spin" style={{ animationDuration: '3s' }} />
            <span>Compliant Case Studies & Regional Trust</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--white)] mb-4 uppercase tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Leading Sri Lankan governmental offices, enterprise importers, and secure security firms choose E-Tech Solutions for highly reliable network frameworks and zero-downtime integration SLAs.
          </p>
        </div>

        {/* Carousel Container Slider Frame */}
        <div className="bg-gradient-to-b from-[#18181b]/95 to-[#0c0c0e]/95 border border-brand-dark-gray/65 rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md relative">
          
          {/* Diagnostic Code Strip in top border */}
          <div className="border-b border-brand-dark-gray/50 px-6 py-3 flex items-center justify-between text-[10px] font-mono text-brand-muted bg-[#121214]/60">
            <span className="flex items-center gap-2 uppercase font-semibold tracking-wide">
              <Cpu size={12} className="text-brand-red animate-pulse" />
              <span>ACTIVE SYSTEM AUDIT VERIFICATION: <strong className="text-stone-100 font-bold">{current.refCode}</strong></span>
            </span>
            <span className="inline-flex items-center gap-1.5 uppercase text-emerald-500 tracking-wider font-semibold text-[9.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SLA LEVEL COMPLIANT OK
            </span>
          </div>

          <div className="relative min-h-[460px] lg:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="p-8 sm:p-12 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Left Box: Customer Quote & Profile details (8 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                  
                  {/* Elegant quote icon decoration */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-red/10 p-2.5 rounded-lg border border-brand-red/20 shadow-inner">
                      <Quote size={28} className="text-brand-red stroke-[2]" />
                    </div>
                    {current.metric && (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 font-mono text-[9.5px] font-bold uppercase tracking-wider shadow-sm">
                        <ShieldCheck size={12} className="shrink-0" />
                        <span>ROI verified // {current.metric}</span>
                      </div>
                    )}
                  </div>

                  {/* Main quote in elegant Serif Italic */}
                  <blockquote className="text-base sm:text-lg md:text-xl font-serif italic text-stone-100 leading-relaxed mb-8 font-medium border-l-2 border-brand-red/30 pl-4">
                    "{current.feedback}"
                  </blockquote>

                  {/* Representative Information block with modern layout */}
                  <div className="flex items-center gap-4 border-t border-brand-dark-gray/35 pt-6">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-red to-blue-900 border border-brand-red/40 flex items-center justify-center font-display font-black text-white text-sm shadow-md shadow-brand-red/10">
                      {current.avatarInitials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white tracking-wide uppercase font-display">
                        {current.representative}
                      </p>
                      <p className="text-xs text-brand-muted font-mono mt-0.5">
                        Authorized Executive Signatory — <span className="text-brand-red/90 font-semibold">{current.clientName}</span>
                      </p>
                    </div>
                  </div>

                </div>

                {/* Right Box: Metadata Panel & Operations Spec (5 cols) */}
                <div className="lg:col-span-5 bg-[#141416]/90 border border-white/5 p-6 rounded-xl flex flex-col gap-4.5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/[0.02] rounded-full filter blur-xl group-hover:bg-brand-red/[0.04] transition-all" />
                  
                  <div>
                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest block mb-1.5 font-bold">
                      Corporate Client Identity
                    </span>
                    <p className="text-sm font-semibold text-white font-display leading-tight flex items-start gap-2 uppercase tracking-tight">
                      <Building2 size={16} className="text-brand-red mt-0.5 shrink-0" />
                      <span>{current.clientName}</span>
                    </p>
                    {current.website && (
                      <a 
                        href={`https://${current.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-mono text-brand-red hover:underline mt-2 inline-flex items-center gap-1.5 tracking-wide font-semibold"
                      >
                        <Globe size={11} className="animate-spin-slow" />
                        <span>www.{current.website}</span>
                      </a>
                    )}
                  </div>

                  <div className="h-[1px] bg-brand-dark-gray/50" />

                  <div>
                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest block mb-1.5 font-bold">
                      Enterprise Sector Vertical
                    </span>
                    <p className="text-xs font-semibold text-stone-200 flex items-center gap-2 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                      {current.industry}
                    </p>
                  </div>

                  <div className="h-[1px] bg-brand-dark-gray/50" />

                  <div>
                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest block mb-1.5 font-bold">
                      Deployed Solutions Framework
                    </span>
                    <p className="text-xs font-serif italic text-brand-red/95 leading-relaxed font-semibold bg-brand-red/[0.04] p-2.5 rounded border border-brand-red/10">
                      {current.projectType}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Controls & Slider Interactivity Strip */}
          <div className="border-t border-brand-dark-gray/35 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121214]/60">
            
            {/* Play/Pause & Left/Right Action Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-lg border border-brand-dark-gray bg-[#18181b] hover:border-brand-red/60 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:shadow-lg shadow-brand-red/5"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-lg border border-brand-dark-gray bg-[#18181b] hover:border-brand-red/60 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                title={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
              >
                {isPlaying ? <Pause size={13} className="text-brand-red" /> : <Play size={13} />}
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-lg border border-brand-dark-gray bg-[#18181b] hover:border-brand-red/60 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 hover:shadow-lg shadow-brand-red/5"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Pagination Bullet Indicators */}
            <div className="flex items-center gap-2.5">
              {SUCCESS_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveIndex(idx);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx 
                      ? 'w-10 bg-brand-red shadow-[0_0_8px_rgba(229,9,20,0.6)]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Go to item ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* Brand Credentials Board (Institutional Trust badges) - highly authentic looking */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-brand-muted mb-6">
            Trusted by Reputable Clients & Government Departments Islandwide
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-brand-black/45 border border-brand-dark-gray/40 py-3 px-4 rounded-xl flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-display font-black text-[var(--white)]/95 uppercase text-center tracking-tight leading-tight">
                Vocational Education
              </span>
              <span className="text-[8px] font-mono text-brand-red mt-1 uppercase font-semibold">Gov Office Sector lk</span>
            </div>
            <div className="bg-brand-black/45 border border-brand-dark-gray/40 py-3 px-4 rounded-xl flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-display font-black text-[var(--white)]/95 uppercase text-center tracking-tight leading-tight">
                Delvon Securities
              </span>
              <span className="text-[8px] font-mono text-brand-red mt-1 uppercase font-semibold">Logistics Protection</span>
            </div>
            <div className="bg-brand-black/45 border border-brand-dark-gray/40 py-3 px-4 rounded-xl flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-display font-black text-[var(--white)]/95 uppercase text-center tracking-tight leading-tight">
                C-Range Intl.
              </span>
              <span className="text-[8px] font-mono text-brand-red mt-1 uppercase font-semibold">Imports & Retail</span>
            </div>
            <div className="bg-brand-black/45 border border-brand-dark-gray/40 py-3 px-4 rounded-xl flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-display font-black text-[var(--white)]/95 uppercase text-center tracking-tight leading-tight">
                Corporate SMEs
              </span>
              <span className="text-[8px] font-mono text-brand-red mt-1 uppercase font-semibold">Active Support SLA</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
