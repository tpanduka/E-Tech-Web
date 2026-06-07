export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'web-software-development'
  | 'hardware-solutions'
  | 'networking-solutions'
  | 'cybersecurity-solutions'
  | 'digital-marketing'
  | 'creative-media-production'
  | 'software-licensing'
  | 'ict-procurement-consultancy'
  | 'cybersecurity-consultancy'
  | 'maintenance-agreements'
  | 'portfolio'
  | 'contact'
  | 'faq';

export interface ServiceDetail {
  id: PageId;
  title: string;
  shortDesc: string;
  image: string;
  longDesc: string;
  inclusions: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  description: string;
  image: string;
}

export interface PackageItem {
  id: string;
  category: 'web-software' | 'maintenance' | 'cybersecurity' | 'marketing' | 'procurement';
  packageName: string;
  features: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  organization: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  contactMethod: 'Phone Call' | 'WhatsApp' | 'Email';
  message: string;
}
