import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function DataConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('etech_cookie_consent');
      if (!consent) {
        // Small delay for natural entrance feel
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.warn('Storage blocked in sandboxed iframe:', err);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('etech_cookie_consent', 'accepted');
    } catch (err) {
      console.warn('Unable to write to storage in sandbox:', err);
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    try {
      localStorage.setItem('etech_cookie_consent', 'rejected');
    } catch (err) {
      console.warn('Unable to write to storage in sandbox:', err);
    }
    setIsVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#120f0f] border-t border-[#231e1f] text-white px-6 md:px-12 py-8 shadow-[0_-12px_30px_rgba(0,0,0,0.85)] font-sans"
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-center">
              
              {/* Left Column: Information Copy */}
              <div className="flex-1 flex flex-col gap-3.5 max-w-3xl">
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider text-white">
                  CONSENT TO DATA PROTECTION
                </h3>
                <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                  This site uses cookies to store information on your computer. By clicking on the button you allow us to improve the user experience on our website and personalize ads for you. You can change this decision at any time.
                </p>
                <div className="flex items-center gap-3 text-xs sm:text-[13px] font-medium text-zinc-400 mt-1">
                  <button 
                    onClick={() => { setShowLegalNotice(true); setShowPrivacyPolicy(false); }}
                    className="hover:text-brand-red underline cursor-pointer transition-colors"
                  >
                    Legal Notice
                  </button>
                  <span className="text-zinc-600">|</span>
                  <button 
                    onClick={() => { setShowPrivacyPolicy(true); setShowLegalNotice(false); }}
                    className="hover:text-brand-red underline cursor-pointer transition-colors"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>

              {/* Right Column: Interaction Action Buttons */}
              <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0">
                <button
                  onClick={handleAccept}
                  className="w-full bg-black hover:bg-zinc-900 border border-zinc-800 text-white font-mono font-bold text-sm uppercase py-4 px-6 tracking-widest transition-all duration-250 cursor-pointer active:scale-[0.98]"
                >
                  YES, I AGREE
                </button>
                <button
                  onClick={handleReject}
                  className="w-full hover:bg-zinc-900/40 text-zinc-400 hover:text-white font-mono font-bold text-xs uppercase py-2.5 transition-all duration-250 cursor-pointer tracking-wider text-center"
                >
                  REJECT ALL USE OF DATA
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal / Drawer overlay fallback inside app view if clicked Legal/Rules */}
      <AnimatePresence>
        {(showLegalNotice || showPrivacyPolicy) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#120f0f] border border-[#231e1f] text-white rounded-lg p-6 max-w-lg w-full relative max-h-[80vh] overflow-y-auto"
            >
              <h4 className="font-display font-bold text-lg uppercase tracking-wider text-brand-red mb-4">
                {showLegalNotice ? "Legal Notice - E-Tech Solutions" : "Privacy Policy - Cookie Statement"}
              </h4>
              
              <div className="text-xs text-zinc-300 space-y-4 leading-relaxed font-mono">
                {showLegalNotice ? (
                  <>
                    <p>
                      <strong>E-TECH SOLUTIONS (PVT) LTD</strong><br />
                      Registered corporate registry in Sri Lanka since 2012.<br />
                      Principal business address: Mirihana, Nugegoda.
                    </p>
                    <p>
                      We comply with national and enterprise regulations regarding the protection of proprietary systems, software audits, and official service warranties. Terms of services govern external procurement advisory and Annual Maintenance Contracts.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      We value your privacy under corporate guidelines. This site maintains cookies to store temporary state preferences (such as selected contrast styles, local contact downloads, and preferred services).
                    </p>
                    <p>
                      <strong>GDPR & Sri Lankan PDPA Compliance:</strong> We do not track personal identifying records without consent. Your interaction requests submitted through the AMC Estimator or Request Quote fields are confidential and end-to-end encrypted.
                    </p>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => { setShowLegalNotice(false); setShowPrivacyPolicy(false); }}
                  className="bg-brand-red hover:bg-brand-red-dark text-white text-xs font-mono py-2 px-5 rounded-md cursor-pointer transition-all"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
