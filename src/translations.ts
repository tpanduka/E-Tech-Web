export type Language = 'en' | 'si';

export interface TranslationDict {
  // Navigation & General UI
  home: string;
  aboutUs: string;
  solutionsServices: string;
  portfolio: string;
  faq: string;
  contact: string;
  search: string;
  searchTitle: string;
  searchPlaceholder: string;
  searchClose: string;
  requestQuote: string;
  quoteButton: string;
  accessibilityTheme: string;
  interfaceMode: string;
  midnightLayout: string;
  slateBlueLayout: string;
  hotline: string;
  colomboLk: string;
  slaVerified: string;
  facebookConnect: string;
  tickerTitle: string;
  closeMenu: string;
  sendInquiry: string;
  goBackTop: string;

  // PDPA Compliance Gateway
  complianceGateway: string;
  pdpaActiveGuard: string;
  safeToBrowse: string;
  environmentVerified: string;
  gatewayWelcome: string;
  gatewayPdpaHighlight: string;
  gatewayNoScrapers: string;
  verifyAndEnter: string;
  sessionHashLabel: string;
  pdpaReady: string;
  aesEncrypted: string;
  tlsCertified: string;
  sandboxCompliant: string;

  // Homepage / Hero Content
  heroTitlePre: string;
  heroTitleRed: string;
  heroTitlePost: string;
  heroDesc: string;
  heroBadge: string;
  viewServices: string;
  getSlaQuote: string;

  // Sectors & Labels
  coreEngineering: string;
  advisoryAudits: string;
  mediaGrowth: string;
  viewAllServices: string;
  serviceInclusions: string;
  learnMore: string;

  // Core Sections
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  allProjects: string;
  webSoftwareCategory: string;
  hardwareCctvCategory: string;
  networkingCategory: string;
  firewallCategory: string;

  // Contact / Quote Section
  getQuoteTitle: string;
  getQuoteSubtitle: string;
  formFullName: string;
  formOrganization: string;
  formPhone: string;
  formEmail: string;
  formService: string;
  formBudget: string;
  formPrefContact: string;
  formMessage: string;
  formSubmit: string;
  preferencePhone: string;
  preferenceWhatsApp: string;
  preferenceEmail: string;
  submittingInquiry: string;
  inquirySuccess: string;

  // Footers
  rightsReserved: string;
  hqAddress: string;
  workingHours: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    home: 'Home',
    aboutUs: 'About Us',
    solutionsServices: 'Solutions & Services',
    portfolio: 'Portfolio',
    faq: 'FAQ',
    contact: 'Contact Us',
    search: 'Search',
    searchTitle: 'REAL-TIME SYSTEM SEARCH',
    searchPlaceholder: 'Type to locate web app development, pfSense setup, CCTV configs...',
    searchClose: 'Press ESC to close',
    requestQuote: 'Request a Quote',
    quoteButton: 'Quote',
    accessibilityTheme: 'Accessibility Theme:',
    interfaceMode: 'INTERFACE MODE',
    midnightLayout: 'Midnight',
    slateBlueLayout: 'Slate Blue',
    hotline: 'HOTLINE',
    colomboLk: 'COLOMBO, LK',
    slaVerified: 'SLA CORE VERIFIED',
    facebookConnect: 'Connect with us on Facebook',
    tickerTitle: 'ICT INTELLIGENCE TICKER',
    closeMenu: 'Close Menu',
    sendInquiry: 'Send Quotation Inquiry',
    goBackTop: 'Scroll back to top',

    // PDPA Compliance Gateway
    complianceGateway: 'Compliance Gateway',
    pdpaActiveGuard: 'Sri Lanka PDPA (No. 9 of 2022) Active Guard',
    safeToBrowse: 'SAFE TO BROWSE',
    environmentVerified: 'ENVIRONMENT VERIFIED // SAFE TO BROWSE',
    gatewayWelcome: 'Welcome to the official digital platform of E-Tech Solutions. To align with our commitment to digital governance and data safety:',
    gatewayPdpaHighlight: 'We strictly comply with provisions of the Sri Lanka Personal Data Protection Act (PDPA), No. 9 of 2022. This web app guarantees that all user interactions, AMC quotation configurations, software licensing inputs, and message streams are processed strictly over end-to-end client-to-server TLS 1.3 encrypted nodes.',
    gatewayNoScrapers: 'No unsolicited tracking cookies, behavioral scrapers, or dark pattern telemetry systems are active on this network infrastructure. Your session is 100% self-contained and private.',
    verifyAndEnter: 'Verify Security & Enter Secure Site',
    sessionHashLabel: 'Ref session hash: sha-256 TLS_ECDHE_RSA_WITH_AES_256_GCM',
    pdpaReady: 'SL PDPA No. 9 READY',
    aesEncrypted: 'AES-256 ENCRYPTED',
    tlsCertified: 'TLS 1.3 CERTIFIED',
    sandboxCompliant: 'SANDBOX COMPLIANT',

    // Homepage / Hero Content
    heroTitlePre: 'Enterprise Cybersecurity &',
    heroTitleRed: 'SLA-Assured',
    heroTitlePost: 'ICT Infrastructure Solutions',
    heroDesc: 'Sri Lanka’s elite system integration partner for corporate networking, pfSense firewalls, professional custom software, CCTV surveillance, and proactive maintenance agreements (AMCs).',
    heroBadge: 'CERTIFIED TECHNOLOGY INTEGRATOR',
    viewServices: 'Explore Core Services',
    getSlaQuote: 'Request AMC Quotation',

    // Sectors & Labels
    coreEngineering: 'Core Engineering',
    advisoryAudits: 'Advisory & Audits',
    mediaGrowth: 'Media & Growth',
    viewAllServices: 'View All Integrations Summary →',
    serviceInclusions: 'Enterprise Inclusions Included',
    learnMore: 'Learn More & Configure SLA',

    // Core Sections
    whyChooseUsTitle: 'Why Partners Rely On Our Engineering',
    whyChooseUsSubtitle: 'Providing resilient corporate tech frameworks, high security standards, and instant response SLAs across Sri Lanka.',
    portfolioTitle: 'Recent Enterprise Deliveries',
    portfolioSubtitle: 'A record of operational success, robust firewall setups, physical structured network overhauls, and corporate portals.',
    allProjects: 'All Projects',
    webSoftwareCategory: 'Web & Software',
    hardwareCctvCategory: 'CCTV & Hardware',
    networkingCategory: 'Networking Setup',
    firewallCategory: 'Firewall & Compliance',

    // Contact
    getQuoteTitle: 'Configure Your System Integration Quote',
    getQuoteSubtitle: 'Submit your structural infrastructure needs, networking setups, or AMC inquiries. Our consultants will respond within 4 business hours.',
    formFullName: 'Full Name / Contact Person',
    formOrganization: 'Organization / Company Name',
    formPhone: 'Mobile or WhatsApp Number (+94)',
    formEmail: 'Business Email Address',
    formService: 'Requested Core Integration',
    formBudget: 'Estimated Project Budget (LKR)',
    formPrefContact: 'Preferred Contact Protocol',
    formMessage: 'Detailed Technical Requirements',
    formSubmit: 'Initialize Security Request',
    preferencePhone: 'Phone Call',
    preferenceWhatsApp: 'WhatsApp',
    preferenceEmail: 'Email',
    submittingInquiry: 'Transmitting encrypted node data...',
    inquirySuccess: 'Inquiry transmitted successfully under active TLS tunnel!',

    // Footers
    rightsReserved: 'All Rights Reserved. Compliance under Sri Lanka PDPA Framework No. 9 of 2022.',
    hqAddress: '72/10, Edirisinghe Road, Mirihana, Nugegoda, Sri Lanka',
    workingHours: 'MON - SAT: 8:30 AM - 5:30 PM'
  },
  si: {
    home: 'මුල් පිටුව',
    aboutUs: 'අප ගැන',
    solutionsServices: 'සේවා සහ විසඳුම්',
    portfolio: 'පෝට්ෆෝලියෝ',
    faq: 'නිතර අසන ප්‍රශ්න',
    contact: 'සම්බන්ධ වන්න',
    search: 'සොයන්න',
    searchTitle: 'සජීවී පද්ධති සෙවුම',
    searchPlaceholder: 'මෘදුකාංග සංවර්ධනය, pfSense ෆයර්වෝල්, CCTV සහ ජාලකරණ සේවා සොයන්න...',
    searchClose: 'පිටවීමට ESC ඔබන්න',
    requestQuote: 'මිල ගණන් ලබාගන්න',
    quoteButton: 'මිල',
    accessibilityTheme: 'ප්‍රවේශ්‍යතා තේමාව:',
    interfaceMode: 'අතුරුමුහුණත් ප්‍රකාරය',
    midnightLayout: 'මිඩ්නයිට්',
    slateBlueLayout: 'ස්ලේට් බ්ලූ',
    hotline: 'ක්ෂණික ඇමතුම්',
    colomboLk: 'කොළඹ, ශ්‍රී ලංකා',
    slaVerified: 'SLA සහතික ලත් සේවාව',
    facebookConnect: 'ಫේස්බුක් පිටුව හරහා සම්බන්ධ වන්න',
    tickerTitle: 'තොරතුරු තාක්ෂණ පුවත්',
    closeMenu: 'මෙනුව වසන්න',
    sendInquiry: 'මිල ගණන් විමසීම යවන්න',
    goBackTop: 'නැවත ඉහළ පිටුවට යන්න',

    // PDPA Compliance Gateway
    complianceGateway: 'අනුකූලතා ද්වාරය',
    pdpaActiveGuard: 'ශ්‍රී ලංකා පුද්ගලික දත්ත ආරක්ෂණ පනත (PDPA) (2022 අංක 09) සක්‍රීය ආරක්ෂාව',
    safeToBrowse: 'පිරික්සීමට සුදුසුයි',
    environmentVerified: 'පද්ධති පරිසරය තහවුරු කර ඇත // ආරක්ෂිතයි',
    gatewayWelcome: 'ඊ-ටෙක් සොලියුෂන්ස් (E-Tech Solutions) නිල ඩිජිටල් වේදිකාව වෙත සාදරයෙන් පිළිගනිමු. ඩිජිටල් පාලනය සහ දත්ත සුරක්ෂිතතාවය සඳහා අපගේ කැපවීම සමඟ ඒකාබද්ධ වීමට:',
    gatewayPdpaHighlight: 'අපි ශ්‍රී ලංකා පුද්ගලික දත්ත ආරක්ෂණ පනතේ (PDPA), 2022 අංක 09 හි ප්‍රතිපාදනවලට දැඩි ලෙස අනුකූල වෙමු. මෙම වෙබ් අඩවිය මගින් සියලුම පරිශීලක අන්තර්ක්‍රියා, AMC මිල ගණන් සැකසීම් සහ පණිවිඩ සම්ප්‍රේෂණයන් TLS 1.3 කේතන ක්‍රමය යටතේ සම්පූර්ණයෙන්ම ආරක්ෂිතව සිදු කෙරේ.',
    gatewayNoScrapers: 'කිසිදු ආකාරයක අනවශ්‍ය දත්ත ලුහුබැඳීමේ කුකීස් (tracking cookies) හෝ බාහිර ටෙලිමෙට්‍රි පද්ධති සක්‍රීය නොවේ. ඔබගේ පිවිසුම් සැසිය 100% ක්ම පුද්ගලික සහ ස්වයං-පාලිත වේ.',
    verifyAndEnter: 'ආරක්ෂාව තහවුරු කර වෙබ් අඩවියට පිවිසෙන්න',
    sessionHashLabel: 'සැසි අගය: sha-256 TLS_ECDHE_RSA_WITH_AES_256_GCM',
    pdpaReady: 'SL PDPA අංක 9 සූදානම්',
    aesEncrypted: 'AES-256 කේතනය කළ',
    tlsCertified: 'TLS 1.3 සහතික කළ',
    sandboxCompliant: 'ආරක්ෂිත පරිසරය',

    // Homepage / Hero Content
    heroTitlePre: 'විශේෂඥ සයිබර් ආරක්ෂණය සහ',
    heroTitleRed: 'SLA සහතික ලත්',
    heroTitlePost: 'තොරතුරු තාක්ෂණ පද්ධති',
    heroDesc: 'ආයතනික ජාලකරණය, pfSense ෆයර්වෝල්, වෘත්තීය මෘදුකාංග සංවර්ධනය, CCTV පද්ධති සහ සක්‍රීය නඩත්තු ගිවිසුම් (AMC) සඳහා ශ්‍රී ලංකාවේ ප්‍රමුඛතම තාක්ෂණික සහකරු.',
    heroBadge: 'සහතික ලත් තාක්ෂණික ඒකාබද්ධ කරන්නා',
    viewServices: 'සේවා පිරික්සන්න',
    getSlaQuote: 'නඩත්තු ගිවිසුම් (AMC) මිල ගණන් ලබාගන්න',

    // Sectors & Labels
    coreEngineering: 'ප්‍රධාන ඉංජිනේරු අංශය',
    advisoryAudits: 'උපදේශන සහ විගණන',
    mediaGrowth: 'මාධ්‍ය සහ ප්‍රවර්ධනය',
    viewAllServices: 'සියලුම සේවාවන්හි සාරාංශය පෙන්වන්න →',
    serviceInclusions: 'ඇතුළත් කර ඇති ආයතනික විශේෂාංග',
    learnMore: 'විස්තර දැනගන්න සහ SLA සකසන්න',

    // Core Sections
    whyChooseUsTitle: 'අපගේ ඉංජිනේරු සේවාවන් තෝරාගන්නේ ඇයි?',
    whyChooseUsSubtitle: 'ශ්‍රී ලංකාව පුරා විශ්වාසදායක ආයතනික තාක්ෂණ ව්‍යුහයන්, ඉහළ ආරක්ෂණ ප්‍රමිතීන් සහ ක්ෂණික සේවා SLA සැපයීම.',
    portfolioTitle: 'අපගේ මෑතකාලීන ව්‍යාපෘති',
    portfolioSubtitle: 'සාර්ථක මෙහෙයුම්, ශක්තිමත් ෆයර්වෝල් සැකසුම්, භෞතික ව්‍යුහගත ජාල පද්ධති සහ ආයතනික මෘදුකාංග නිමවුම්.',
    allProjects: 'සියලුම ව්‍යාපෘති',
    webSoftwareCategory: 'මෘදුකාංග සහ වෙබ්',
    hardwareCctvCategory: 'CCTV සහ දෘඩාංග',
    networkingCategory: 'ජාලකරණ පද්ධති',
    firewallCategory: 'ෆයර්වෝල් සහ අනුකූලතාවය',

    // Contact
    getQuoteTitle: 'ඔබේ පද්ධති අවශ්‍යතා සඳහා මිල ගණන් ලබාගන්න',
    getQuoteSubtitle: 'ඔබේ ආයතනික ජාල අවශ්‍යතා, AMC ගිවිසුම් හෝ තාක්ෂණික ගැටලු ඉදිරිපත් කරන්න. අපගේ උපදෙස් කාර්යාලය පැය 4ක් ඇතුළත සම්බන්ධ වනු ඇත.',
    formFullName: 'සම්පූර්ණ නම / සම්බන්ධීකරණ නිලධාරියාගේ නම',
    formOrganization: 'ආයතනය හෝ ව්‍යාපාරයේ නම',
    formPhone: 'ජංගම හෝ WhatsApp අංකය (+94)',
    formEmail: 'ව්‍යාපාරික විද්‍යුත් තැපැල් ලිපිනය',
    formService: 'අවශ්‍ය ප්‍රධාන සේවාව',
    formBudget: 'ඇස්තමේන්තුගත අයවැය (LKR)',
    formPrefContact: 'සම්බන්ධ කර ගැනීමට කැමති ක්‍රමය',
    formMessage: 'විස්තරාත්මක තාක්ෂණික අවශ්‍යතා',
    formSubmit: 'ආරක්ෂිත ඉල්ලීම යොමු කරන්න',
    preferencePhone: 'දුරකථන ඇමතුම',
    preferenceWhatsApp: 'WhatsApp',
    preferenceEmail: 'ඊමේල් (Email)',
    submittingInquiry: 'දත්ත සුරක්ෂිතව සම්ප්‍රේෂණය වෙමින් පවතී...',
    inquirySuccess: 'TLS ආරක්ෂිත ද්වාරය හරහා ඔබේ විමසීම සාර්ථකව යොමු කර ඇත!',

    // Footers
    rightsReserved: 'සියලුම හිමිකම් ඇවිරිණි. ශ්‍රී ලංකා පුද්ගලික දත්ත ආරක්ෂණ පනත (2022 අංක 09) යටතේ සුරක්ෂිතයි.',
    hqAddress: '72/10, එදිරිසිංහ පාර, මිරිහාන, නුගේගොඩ, ශ්‍රී ලංකාව',
    workingHours: 'සඳුදා - සෙනසුරාදා: පෙ.ව. 8:30 - ප.ව. 5:30'
  }
};
