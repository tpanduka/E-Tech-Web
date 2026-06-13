import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ContactFormData } from '../types';
import { Mail, Phone, Calendar, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

interface QuoteFormProps {
  initialService?: string;
}

export default function QuoteForm({ initialService = '' }: QuoteFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: initialService,
    budget: '',
    contactMethod: 'WhatsApp',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Mobile App Development', label: 'Mobile App Development' },
    { value: 'Hardware Solutions', label: 'Hardware Solutions & Infrastructure' },
    { value: 'Networking Solutions', label: 'Networking & Structured Cabling' },
    { value: 'Cybersecurity Solutions', label: 'Cybersecurity & Firewall (pfSense/Fortinet)' },
    { value: 'Digital Marketing', label: 'Digital Marketing & Social Page Management' },
    { value: 'Creative Media Production', label: 'Creative Media (Photography/Videography)' },
    { value: 'Software Licensing', label: 'Software Sales & Licensing' },
    { value: 'ICT Procurement Consultancy', label: 'ICT Procurement Consultancy (TOR/BOQs)' },
    { value: 'Cybersecurity Consultancy', label: 'Cybersecurity Consultancy (PDPA/Safety Audit)' },
    { value: 'Maintenance Agreement', label: 'Annual/Monthly IT Maintenance Agreements (AMC)' },
    { value: 'Other', label: 'Other/General Inquiry' }
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactMethodChange = (method: 'Phone Call' | 'WhatsApp' | 'Email') => {
    setFormData((prev) => ({
      ...prev,
      contactMethod: method
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Native validation
    if (!formData.name) {
      setErrorMsg('Please state your name.');
      return;
    }
    if (!formData.phone && !formData.email) {
      setErrorMsg('Please specify either an Email or Phone Number so we can reach you.');
      return;
    }
    if (!formData.service) {
      setErrorMsg('Please select a specific service to proceed with your quote inquiry.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending inquiry to info@etechmultisolutions.com / etechmultisolutions@gmail.com
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 rounded-full filter blur-xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-red/5 rounded-full filter blur-2xl" />

      {isSuccess ? (
        <div className="text-center py-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-display font-bold text-2xl text-zinc-100 mb-2">Inquiry Submitted Successfully!</h3>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
            Thank you, <strong>{formData.name}</strong>, from {formData.organization || 'your organization'}. Your request regarding <span className="text-brand-red font-semibold">“{formData.service}”</span> has been safely received by the E-Tech Solutions Engineering Desk.
          </p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-sm p-4 max-w-sm text-left mb-6 font-mono text-[11px] leading-relaxed">
            <p className="text-zinc-200 font-semibold mb-1 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-brand-red" />
              SLA Priority Diagnostic Window:
            </p>
            <p className="text-zinc-400">
              We aim to coordinate and get back to you via your preferred selection (<strong>{formData.contactMethod}</strong>) with a technical specification draft and provisional BOQ estimation index within **24 business hours**.
            </p>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                organization: '',
                phone: '',
                email: '',
                service: '',
                budget: '',
                contactMethod: 'WhatsApp',
                message: ''
              });
            }}
            className="text-xs text-brand-red font-bold hover:underline cursor-pointer font-mono"
          >
            Submit Another Quote Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="border-b border-zinc-800 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-display font-bold text-xs tracking-widest text-brand-red font-mono">
                [ SERVICE / QUOTE INITIATION ]
              </h3>
              <span className="text-[10px] text-zinc-500 font-mono">FORM: ET-Q-26</span>
            </div>
            <h2 className="font-display font-bold text-lg text-zinc-100 uppercase tracking-tight">Request technical spec Advisory</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Submit your corporate indices. Our engineering and compliance leads will formulate technical specifications & outline estimations.
            </p>
            {errorMsg && (
              <div className="bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs p-3 rounded-sm mt-4 font-medium font-mono">
                {errorMsg}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Full Name / Contact Person *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 hover:border-brand-red/30 focus:border-brand-red/80 px-4 py-2.5 rounded-sm text-sm text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-500 font-mono text-xs"
                placeholder="E.g. Shanaka Perera"
              />
            </div>

            {/* Organization */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="organization" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Organization / Company
              </label>
              <input
                id="organization"
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 hover:border-brand-red/30 focus:border-brand-red/80 px-4 py-2.5 rounded-sm text-sm text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-500 font-mono text-xs"
                placeholder="E.g. Apex Enterprises (Pvt) Ltd"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 hover:border-brand-red/30 focus:border-brand-red/80 px-4 py-2.5 rounded-sm text-sm text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-500 font-mono text-xs"
                placeholder="E.g. +94 777 123 456"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 hover:border-brand-red/30 focus:border-brand-red/80 px-4 py-2.5 rounded-sm text-sm text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-500 font-mono text-xs"
                placeholder="E.g. info@apex.lk"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="service" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Service Required *
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 focus:border-brand-red/80 px-3 py-2.5 rounded-sm text-xs text-zinc-100 focus:outline-none cursor-pointer font-mono"
              >
                <option value="" disabled className="bg-zinc-900 text-zinc-300">-- Select Service Sector --</option>
                {servicesList.map((svc) => (
                  <option key={svc.value} value={svc.value} className="bg-zinc-900 text-zinc-100">
                    {svc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price/Budget Range (Optional) */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="budget" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
                Provisional Budget Range (Optional)
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="bg-zinc-950 border border-zinc-800 focus:border-brand-red/80 px-3 py-2.5 rounded-sm text-xs text-zinc-100 focus:outline-none cursor-pointer font-mono"
              >
                <option value="" className="bg-zinc-900 text-zinc-300">Choosing estimate spec...</option>
                <option value="SME/Starter" className="bg-zinc-900 text-zinc-100">Starter / SME Tier (&lt; LKR 100k)</option>
                <option value="Standard Business" className="bg-zinc-900 text-zinc-100">Standard Business Tier (LKR 100k - LKR 500k)</option>
                <option value="Enterprise Solution" className="bg-zinc-900 text-zinc-100">Advanced Mid-Tier Enterprise (LKR 500k - LKR 2M)</option>
                <option value="Consultancy/Global" className="bg-zinc-900 text-zinc-100">Full Infrastructure / Consultancy Scale (&gt; LKR 2M)</option>
              </select>
            </div>
          </div>

          {/* Contact Method toggles */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
              Preferred Contact Channel
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['Phone Call', 'WhatsApp', 'Email'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => handleContactMethodChange(method)}
                  className={`py-2 px-3 rounded-sm text-xs font-semibold border transition-all cursor-pointer font-mono text-[10px] uppercase tracking-wider ${
                    formData.contactMethod === method
                      ? 'bg-brand-red/20 border-brand-red text-white font-bold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Message specifics */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">
              Message / Specific Requirements
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="bg-zinc-950 border border-zinc-800 hover:border-brand-red/30 focus:border-brand-red/80 px-4 py-2.5 rounded-sm text-sm text-zinc-100 focus:outline-none transition-all placeholder:text-zinc-500 resize-none font-sans text-xs"
              placeholder="State your technical constraints, required nodes count, desired delivery targets, or specifications."
            />
          </div>

          {/* Action button */}
          <button
            id="quote-form-submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-red hover:bg-dark-red disabled:bg-brand-muted/20 text-white text-xs font-bold py-3.5 rounded-sm mt-2 uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Validating technical logs...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Submit Quotation Inquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
