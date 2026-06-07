import React, { useState, useEffect } from 'react';
import { Quote, Building2, ShieldCheck, ChevronLeft, ChevronRight, Play, Pause, Globe, Cpu } from 'lucide-react';

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
    refCode: 'GOV-ET-2012'
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
    refCode: 'SEC-ET-QR24'
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
    refCode: 'NET-ET-PF88'
  }
];

export default function ClientSuccessCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 6000);
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
      {/* Background Mesh Overlay */}
      <div className="absolute inset-0 bg-grid-mesh-gray opacity-30 pointer-events-none" />
      
      {/* Visual Accent Globs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-brand-red/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-brand-red/45" />
            <span className="text-[10px] text-brand-red font-mono uppercase font-bold tracking-widest block">
              COMPLIANT CASE STUDIES // PROVEN CRITERIA
            </span>
            <span className="h-[1px] w-6 bg-brand-red/45" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4 uppercase tracking-tight">
            Client Success Stories
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Leading Sri Lankan governmental offices, dynamic corporate entities, and secure security enterprises choose E-Tech Solutions for uncompromising system builds and security SLAs.
          </p>
        </div>

        {/* Carousel Container Slider Frame */}
        <div className="bg-brand-black border border-white/5 rounded-sm overflow-hidden shadow-2xl relative">
          
          {/* Diagnostic Code Strip in top border */}
          <div className="border-b border-white/5 px-6 py-2 flex items-center justify-between text-[9px] font-mono text-brand-muted bg-brand-charcoal/40">
            <span className="flex items-center gap-1.5 uppercase font-semibold">
              <Cpu size={10} className="text-brand-red" />
              Active System Log Verification / {current.refCode}
            </span>
            <span className="uppercase text-brand-red tracking-wider font-semibold">
              SLA Level Verified OK
            </span>
          </div>

          <div className="p-8 sm:p-12 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Box: Customer Quote & Profile details (8 cols) */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              
              {/* Elegant quote icon decoration */}
              <div className="mb-6 text-brand-red/25">
                <Quote size={52} className="stroke-[1.5]" />
              </div>

              {/* Success Stat Badge / Highlight Block */}
              {current.metric && (
                <div className="inline-flex max-w-fit items-center gap-2 bg-brand-red/10 border border-brand-red/20 px-3 py-1 rounded-sm text-brand-red font-mono text-[10px] font-semibold uppercase tracking-wider mb-6">
                  <ShieldCheck size={11} className="shrink-0" />
                  <span>Verified ROI // {current.metric}</span>
                </div>
              )}

              {/* Main quote in elegant Serif Italic */}
              <blockquote className="text-base sm:text-lg md:text-xl font-serif italic text-white/95 leading-relaxed mb-6 font-medium">
                "{current.feedback}"
              </blockquote>

              {/* Representative Information block */}
              <div className="mt-2 border-l border-brand-red/40 pl-4 py-1">
                <p className="text-sm font-semibold text-white tracking-wide uppercase font-display">
                  {current.representative}
                </p>
                <p className="text-xs text-brand-muted font-mono mt-0.5">
                  Authorized signatory — {current.clientName}
                </p>
              </div>

            </div>

            {/* Right Box: Metadata Panel & Operations Spec (4 cols) */}
            <div className="lg:col-span-4 bg-brand-charcoal/70 border border-white/5 p-6 rounded-sm flex flex-col gap-5">
              
              <div>
                <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider block mb-1">
                  Corporate Client Identity
                </span>
                <p className="text-sm font-semibold text-white font-display leading-tight flex items-start gap-1.5 uppercase">
                  <Building2 size={15} className="text-brand-red mt-0.5 shrink-0" />
                  {current.clientName}
                </p>
                {current.website && (
                  <a 
                    href={`https://${current.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-brand-red hover:underline mt-1.5 inline-flex items-center gap-1"
                  >
                    <Globe size={10} />
                    www.{current.website}
                  </a>
                )}
              </div>

              <div className="h-[1px] bg-white/5" />

              <div>
                <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider block mb-1">
                  Enterprise Sector Vertical
                </span>
                <p className="text-xs font-semibold text-white/90">
                  {current.industry}
                </p>
              </div>

              <div className="h-[1px] bg-white/5" />

              <div>
                <span className="text-[9px] font-mono text-brand-muted uppercase tracking-wider block mb-1">
                  Deployed Solutions Framework
                </span>
                <p className="text-xs font-serif italic text-brand-red/90 leading-relaxed font-semibold">
                  {current.projectType}
                </p>
              </div>

            </div>

          </div>

          {/* Footer Controls & Slider Interactivity Strip */}
          <div className="border-t border-white/5 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-charcoal/20">
            
            {/* Play/Pause & Left/Right Action Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-sm border border-white/5 bg-brand-black hover:border-brand-red/40 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-sm border border-white/5 bg-brand-black hover:border-brand-red/40 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                title={isPlaying ? "Pause auto-rotation" : "Play auto-rotation"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-sm border border-white/5 bg-brand-black hover:border-brand-red/40 hover:text-brand-red text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
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
                      ? 'w-8 bg-brand-red' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Go to item ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
