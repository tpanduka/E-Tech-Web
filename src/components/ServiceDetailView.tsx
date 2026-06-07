import { ServiceDetail, PageId } from '../types';
import { SERVICES_DATA, PACKAGES_DATA } from '../data';
import { Check, ShieldAlert, ArrowLeft, Send } from 'lucide-react';

interface ServiceDetailViewProps {
  serviceId: PageId;
  setActivePage: (page: PageId) => void;
}

export default function ServiceDetailView({ serviceId, setActivePage }: ServiceDetailViewProps) {
  const service = SERVICES_DATA.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="pt-32 pb-16 text-center max-w-7xl mx-auto px-6">
        <p className="text-brand-red text-sm font-bold uppercase">Sector Not Found</p>
        <button
          onClick={() => setActivePage('home')}
          className="text-white hover:underline mt-4 cursor-pointer"
        >
          Return to home page
        </button>
      </div>
    );
  }

  // Find related package category
  let packageCategory = '';
  if (serviceId === 'web-software-development') packageCategory = 'web-software';
  else if (serviceId === 'maintenance-agreements') packageCategory = 'maintenance';
  else if (serviceId === 'cybersecurity-solutions' || serviceId === 'cybersecurity-consultancy') packageCategory = 'cybersecurity';
  else if (serviceId === 'digital-marketing') packageCategory = 'marketing';
  else if (serviceId === 'ict-procurement-consultancy') packageCategory = 'procurement';

  const relatedPackages = PACKAGES_DATA.filter((p) => p.category === packageCategory);

  const handleInquiry = () => {
    setActivePage('contact');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <article className="pt-28 pb-16 bg-brand-black min-h-screen text-white relative overflow-hidden">
      {/* Structural Workspace Grid Background */}
      <div className="absolute inset-0 bg-grid-mesh-gray opacity-40 pointer-events-none" />
      
      {/* Top Breadcrumb Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <button
          onClick={() => {
            setActivePage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-xs text-brand-muted hover:text-brand-red font-mono uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to all services
        </button>
        <span className="text-xs text-brand-muted font-mono uppercase tracking-widest text-[10px]">
          SPEC INDEX // {serviceId.toUpperCase()}
        </span>
      </div>

      {/* Visual Service Header */}
      <div className="relative h-[25vh] sm:h-[35vh] overflow-hidden z-10">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover filter brightness-[0.45] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 max-w-7xl mx-auto px-6">
          <span className="text-[10px] text-brand-red font-mono uppercase font-bold tracking-widest block mb-1">
            SECTOR CLASSIFICATION // ESTD 2012
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
            {service.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/55 font-mono mt-2 flex items-center gap-1.5 uppercase tracking-wide">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
            SLA REGISTERED PLATFORM
          </p>
        </div>
      </div>

      {/* Core Body Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side: Long Description and Inclusions checklist */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-brand-charcoal/95 backdrop-blur-sm border border-brand-dark-gray rounded-sm p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6 border-b border-brand-dark-gray pb-3">
              <h2 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-red font-mono">
                SYSTEM SPECIFICATION & SCOPE
              </h2>
              <span className="text-[10px] text-brand-muted/50 font-mono">CODE: {serviceId.toUpperCase().slice(0,6)}</span>
            </div>
            
            {/* Elegant Serif Quotation / Paragraph introduction */}
            <p className="text-base font-serif italic text-white/95 leading-relaxed mb-6 pl-4 border-l-2 border-brand-red/60">
              "We approach this tech vertical with structural rigor, sourcing genuine vendor components and configuring high-availability failovers under dynamic SLAs."
            </p>

            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-8 font-sans">
              {service.longDesc}
            </p>

            <h3 className="font-display font-bold text-xs uppercase tracking-widest text-brand-red mb-5 font-mono">
              COMPLIANT DELIVERABLES // SCOPE MATRIX:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.inclusions.map((inc, index) => (
                <div key={index} className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 bg-brand-red/10 border border-brand-red/30 rounded flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-brand-red shrink-0" strokeWidth={3} />
                  </div>
                  <span className="text-xs text-brand-muted font-medium">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related package bundles (SLA Package options) */}
          {relatedPackages.length > 0 && (
            <div>
              <h2 className="font-display font-semibold text-xs uppercase tracking-widest text-white mb-6 font-mono flex items-center gap-2">
                <span className="w-1 h-3 bg-brand-red" />
                SLA ARCHITECTURE CONFIGURATIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-brand-charcoal/95 border border-white/5 rounded-sm p-6 flex flex-col justify-between hover:border-brand-red/35 transition-all duration-300 relative group"
                  >
                    <div>
                      <span className="text-[9px] text-brand-red font-mono uppercase font-bold tracking-widest mb-2 block">
                        CONFIG MATRIX // ETS-{pkg.id.slice(0,3).toUpperCase()}
                      </span>
                      <h3 className="font-display font-semibold text-sm text-white mb-4 border-b border-brand-dark-gray pb-2 group-hover:text-brand-red transition-all uppercase tracking-tight">
                        {pkg.packageName}
                      </h3>
                      <ul className="flex flex-col gap-2.5 text-[11px] text-brand-muted mb-6 font-mono">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-brand-red font-bold select-none">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <button
                        onClick={handleInquiry}
                        className="w-full text-center bg-brand-black border border-brand-dark-gray hover:border-brand-red/50 hover:bg-brand-red/5 text-white py-2 rounded text-[11px] font-bold uppercase transition-all tracking-wider cursor-pointer mt-4"
                      >
                        Request Quote for Tier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Sticky card: Call-To-Action and Fast Info */}
        <div className="flex flex-col gap-6 lg:h-max lg:sticky lg:top-32">
          {/* Quick SLA info */}
          <div className="bg-brand-charcoal border border-brand-dark-gray rounded-xl p-6 relative overflow-hidden">
            <span className="text-[10px] text-brand-red font-mono uppercase font-bold tracking-wide block mb-1">
              Procurement SLA Delivery
            </span>
            <h3 className="font-display font-bold text-base text-white mb-4">
              Ready to Initiate this Sector Setup?
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-6">
              Our engineering team drafts custom blueprints, equipment procurement parameters, standard security compliance, and comprehensive SLAs for our clients. Connect today to design an optimized model.
            </p>

            <button
              onClick={handleInquiry}
              className="w-full group bg-brand-red hover:bg-dark-red text-white text-xs font-bold py-3.5 rounded uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-md shadow-brand-red/10"
            >
              <Send size={12} />
              <span>Request Quote / Audit</span>
            </button>

            <div className="border-t border-brand-dark-gray/60 py-4 mt-6 flex flex-col gap-2.5 text-xs text-brand-muted">
              <span className="text-[11px] uppercase font-mono font-bold text-white/50 block">Consultation Support:</span>
              <p>📞 Hotline Support: +94 752 121 000</p>
              <p>🏠 Office HQ: Mirihana, Nugegoda</p>
              <p>🛡️ Genuine Vendor Licenses Compliant</p>
            </div>
          </div>

          {/* Quick Warning/Disclaimer Notice inside service view */}
          <div className="bg-brand-charcoal/45 border border-brand-dark-gray rounded-xl p-5 flex gap-3">
            <ShieldAlert size={20} className="text-brand-red shrink-0 mt-0.5 animate-pulse-slow" />
            <div>
              <span className="text-[10px] text-white/90 font-bold uppercase block mb-1">SLA Compliance Notice</span>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                All customized installations, server architectures, and commercial security deployments are backed by our signature SLA maintenance, subject to vendor licensing limits and regional technical rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
