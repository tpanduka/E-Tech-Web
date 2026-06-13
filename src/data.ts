import { ServiceDetail, ProjectItem, FAQItem, PackageItem } from './types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'web-software-development',
    title: 'Web & Software Development',
    shortDesc: 'Professional websites, web applications, mobile apps, dashboards, database systems, and business automation.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    longDesc: 'E-Tech Solutions designs and develops professional websites, web applications, and mobile applications that help businesses build a strong digital presence and automate their operations. From simple business websites to advanced database-driven systems, we deliver scalable, secure, and user-friendly digital solutions tailored to real business requirements.',
    inclusions: [
      'Business & Corporate Websites',
      'E-commerce & Shopping Solutions',
      'Web Applications & Client Portals',
      'Mobile App Development (iOS & Android)',
      'Enterprise Admin Dashboards',
      'Secure Database Systems (SQL/NoSQL)',
      'Business Automation Systems',
      'Online Booking & Scheduling Engines',
      'Inventory & Stock Management Software',
      'Attendance & HRM Integrations',
      'Custom Software Development Services',
      'Website Redesign & Speed Optimization',
      'Domain, Cloud Hosting & Professional Email Setup',
      'Third-party API & Payment Gateway Integration',
      'Cloud-ready Web Application Development'
    ]
  },
  {
    id: 'hardware-solutions',
    title: 'Hardware & Infrastructure Solutions',
    shortDesc: 'Desktop PC assembling, laptop supply, CCTV, servers, time attendance, and complete office setup.',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=800&q=80',
    longDesc: 'E-Tech Solutions provides reliable hardware supply, installation, repair, and maintenance services. We support complete office ICT infrastructure including computers, laptops, servers, CCTV systems, time attendance devices, entrance control systems, and PABX communication systems.',
    inclusions: [
      'Desktop PC Assembling (Office, Workstation, Graphic)',
      'Brand New Laptop & Desktop Supply (Lenovo, HP, Dell, etc.)',
      'Professional Laptop, Desktop & Printer Repair Services',
      'CCTV Camera Supply, Installation & Configuration',
      'Analog & IP Network Camera Systems',
      'Time Attendance & Biometric Access Control Systems',
      'Office Entrance Control Solutions',
      'Corporate Rack Server Installation & Configuration',
      'Server Storage Advisory & Upgrades',
      'PABX & IP-PBX Telecommunication Systems',
      'Printers, Scanners & Peripheral Supply',
      'Preventive Hardware Maintenance Services',
      'On-site Hardware Diagnosis & Spares Replacement',
      'Biometric System Attendance Reporting integration'
    ]
  },
  {
    id: 'networking-solutions',
    title: 'Secure Networking Solutions',
    shortDesc: 'LAN setup, structured cabling, enterprise Wi-Fi deployment, routers, switches, VLANs, and active management.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    longDesc: 'We build stable, secure, and performance-oriented network environments for offices and institutions. Our networking services cover structured cabling, router and switch configuration, Wi-Fi deployment, VLAN setup, server room implementation, network troubleshooting, and long-term network maintenance.',
    inclusions: [
      'Corporate LAN / WAN Design & Implementation',
      'Structured Cabling with Cat6/Cat6A & Fiber Optic Backbones',
      'Enterprise-grade Managed Wi-Fi Network Setup',
      'Core Router & VLAN Configuration for Traffic Control',
      'Managed Switch Port Allocations & Bandwidth Rules',
      'Server Room Planning & Professional Cabinet Setup',
      'Network Rack Installation & Labeling Documentation',
      'Legacy Office Network Upgrades & Re-cabling',
      'Secure Firewall Integration (VLAN protection)',
      'Internet Load Balancing & Failover Connections',
      'Network Bottleneck Diagnosis & Performance Optimization',
      'Wireless Bridging for Multi-building campuses'
    ]
  },
  {
    id: 'cybersecurity-solutions',
    title: 'Cybersecurity & Threat Protection',
    shortDesc: 'Commercial and open-source firewalls, pfSense systems, endpoint antivirus, and network protection.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    longDesc: 'Cybersecurity is no longer optional. E-Tech Solutions helps organizations protect their digital assets through firewall solutions, endpoint protection, web filtering, email security, vulnerability assessment, compliance reviews, and security consultancy. We support both commercial firewall platforms and cost-effective open-source firewall deployments.',
    inclusions: [
      'Commercial Firewall Supply & Deployment (Fortinet, Sophos, etc.)',
      'pfSense Open-Source Firewall Setup & Configuration',
      'Enterprise Endpoint Antivirus (Kaspersky, ESET, Bitdefender)',
      'Granular Web Content Filtering & User Activity Logs',
      'Corporate Email Security & Anti-Spam Gateways',
      'Intrusion Detection & Prevention System (IDS/IPS) rules',
      'Network Segregation and Perimeter Threat Mitigation',
      'Secure VPN Gateway Setup for Remote Workers (IPsec/OpenVPN)',
      'Firewall Rule Optimization & Port Forwarding Reviews',
      'System Patch Management & Vulnerability Mitigation',
      'Cyber Ransomware Protection and Regular System Backup Schemes'
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Social Management',
    shortDesc: 'Branding, creative post designs, reels, Shorts, page setup, and complete monthly maintenance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    longDesc: 'We help businesses, professionals, and brands build, manage, and grow their online presence through social media marketing, content creation, photography, videography, creative design, and digital campaign support. Our team handles page creation, profile branding, posts, reels, YouTube content, TikTok videos, Instagram content, and ongoing social media maintenance.',
    inclusions: [
      'Facebook Business Page Creation & Branding Setup',
      'Facebook Profile & High-Quality Cover Art Design',
      'Interactive Post Concept and Graphic Creation',
      'Facebook Reel Production & Short Form Video Editing',
      'Instagram Profile Optimization & Grid Aesthetics',
      'Instagram Story Designs & Custom Highlights Cover Art',
      'TikTok Channel Creation & Caption Optimization',
      'YouTube Channel Provisioning, Layout & Banner Design',
      'YouTube Video Post-Production & Custom Thumbnail Design',
      'Social Media Content Calendar & Monthly Scheduling',
      'Creative Graphic Templates for Campaign Promotions',
      'Digital Audience Engagement & Basic Facebook Ad Configuration'
    ]
  },
  {
    id: 'creative-media-production',
    title: 'Creative Media Production',
    shortDesc: 'Photoshoots, promotional video shoots, event coverage, short-form editing, and high-impact graphics.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    longDesc: 'Our creative media production services help businesses present their brand professionally across digital platforms. We provide photography, videography, video editing, social media creatives, promotional videos, thumbnails, reels, posters, and campaign visuals designed to strengthen digital visibility and customer engagement.',
    inclusions: [
      'Commercial Product Photography & Retouching',
      'Executive Profile & Corporate Staff Photoshoots',
      'On-site Business & Infrastructure Videography',
      'Corporate Promotional Video Shoots & Commercials',
      'Short-form Vertical Reels & TikTok Video Shoots',
      'Professional Video Editing with Noise Clean-up',
      'Visual Concept Development & Script Outline Support',
      'Motion Graphics, Intros, Outros & Transition Effects',
      'High-click YouTube Thumbnail Design',
      'Digital Ad Campaign Posters & Print-ready Flyers',
      'Corporate Event Coverage (Seminars, Launchings, AGMs)'
    ]
  },
  {
    id: 'software-licensing',
    title: 'Software Licensing Support',
    shortDesc: 'Genuine Windows, Microsoft 365, Adobe, AutoCAD, and business software license advisory.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    longDesc: 'We assist clients in selecting, purchasing, renewing, and deploying genuine software licenses suitable for their business, technical, and compliance requirements. Our software licensing support helps organizations avoid licensing risks while improving productivity and operational continuity.',
    inclusions: [
      'Genuine Windows 10/11 Professional Operating System licenses',
      'Microsoft Office Professional Office Suites (Retail & Volume)',
      'Microsoft 365 Business Standard & Enterprise Cloud migrations',
      'Adobe Creative Cloud All Apps & single product licensing',
      'AutoCAD & Autodesk Industry Software Licensing Support',
      'Enterprise Endpoint Security Antivirus license management',
      'Business Productivity software consultation',
      'Software Auditing & Compliance advisory reviews',
      'License Renewal planning & central control administration',
      'OS Activation & Corporate Deployment support services'
    ]
  },
  {
    id: 'ict-procurement-consultancy',
    title: 'ICT Procurement Consultancy',
    shortDesc: 'Technical specifications, Terms of Reference, Bills of Quantity, bid evaluations, and SLA drafting.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    longDesc: 'E-Tech Solutions provides professional ICT procurement consultancy services to help organizations prepare accurate technical specifications, Terms of Reference, compliance sheets, evaluation criteria, warranty conditions, SLA requirements, UAT plans, and implementation conditions. We support clients in making technically sound, transparent, practical, and cost-effective procurement decisions.',
    inclusions: [
      'Organizational ICT Requirement Analysis',
      'Detailed Technical Specification Preparation',
      'Formal Terms of Reference (TOR) Document Drafting',
      'Comprehensive Bill of Quantity (BOQ) Creation',
      'Bid & Tender Document Structural Review',
      'Technical Evaluation Criteria & Compliance Sheets',
      'Procurement Board Technical Advisory support',
      'Vendor Proposal Evaluation & Scoring Indexes',
      'Comparative Product Analysis & Hardware Benchmark reports',
      'SLA, Warranty Framework, and Support Condition Drafting',
      'User Acceptance Testing (UAT) Plan design',
      'Technical Feasibility and Project Risk Management advisory',
      'Contract & Support Agreement Legal-Technical Alignment'
    ]
  },
  {
    id: 'cybersecurity-consultancy',
    title: 'Cybersecurity Consultancy & Governance',
    shortDesc: 'PDPA compliance audits, CMMC 2.0 readiness assessments, NIST SP 800-171 systems, and security policy design.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    longDesc: 'Our cybersecurity consultancy services help organizations identify risks, strengthen controls, and satisfy critical compliance parameters. We provide thorough Sri Lanka Personal Data Protection Act (PDPA) audits and specialized CMMC 2.0 framework preparation. For contractors dealing with US clients and U.S. government defense bodies, we define boundaries, perform gap analyses, draft System Security Plans (SSP) aligned to NIST SP 800-171, and format defensible Plans of Action and Milestones (POA&M) with realistic remediation pathways.',
    inclusions: [
      'CMMC 2.0 Level 1 (FCI) & Level 2 (CUI) Assessment Boundary Scoping',
      'NIST SP 800-171 Control Mapping across all 14 Security Families',
      'System Security Plan (SSP) Preparation and Data Flow Diagrams',
      'Plan of Action and Milestones (POA&M) creation with Risk Ratings',
      'Developing Compliance Control Matrix & Evidence Registers',
      'Drafting CMMC-Compliant Policies (MFA, Access, Password, Incident)',
      'Sri Lanka Personal Data Protection Act (PDPA) Gap Assessments',
      'Network Subnet Segregation & Firewall Policy Optimization Reviews',
      'Web Application Vulnerability Scanning & Risk Remediation reports',
      'Administrative & Technical Operational Security Auditing',
      'Employee Cybersecurity Hygiene & Awareness Coaching Sessions',
      '9-Phase Phased Compliance Roadmap advisory from Discovery to Affirmation'
    ]
  },
  {
    id: 'maintenance-agreements',
    title: 'Annual & Monthly Maintenance Agreements',
    shortDesc: 'Flexible SLAs covering preventive visits, priority emergency calls, network support, and remote assistance.',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    longDesc: 'E-Tech Solutions provides flexible maintenance agreements to keep ICT systems reliable, secure, and operational. Our maintenance packages cover hardware, networking, servers, CCTV, firewall systems, endpoint protection, software support, preventive maintenance, remote troubleshooting, and on-site support.',
    inclusions: [
      'Customized Annual Maintenance Contract (AMC) Blueprints',
      'Monthly Preventive Diagnostic Visits & PC Tuning',
      'Priority Response SLAs for Sudden Network/Server Outages',
      'Desktop & Server Hardware Health Audits',
      'Server Storage Backup Health checks & Verification',
      'Remote IT Help Desk and Phone Troubleshooting',
      'On-site Support with Spare-parts replacement options',
      'Continuous Network Monitoring & Switch/AP Reboots',
      'Firewall Gateway Rule Maintenance & Log Retention',
      'Endpoint Software Updates & Security patches',
      'Continuous Consultation & System inventory management'
    ]
  },
  {
    id: 'lectures-awareness',
    title: 'Lectures & Awareness Sessions',
    shortDesc: 'Qualified resource persons for ICT lectures, cybersecurity awareness, project management, networking, and productivity training.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    longDesc: 'E-Tech Solutions provides qualified resource persons and master trainers for ICT-related lectures, corporate workshops, and technology awareness sessions. We help organizations upskill their staff, educate students, and train technical teams on specialized areas including cybersecurity hygiene, standard office productivity tools, networking principles, project management methodologies, and artificial intelligence integration.',
    inclusions: [
      'Cybersecurity & Digital Hygiene Workshops',
      'Enterprise Project Management (PMP/Agile) Lectures',
      'Office Productivity and Automation (Office 365, G-Suite)',
      'AI Tools & Generative Workflow Training',
      'Strategic Tech Infrastructure Overviews',
      'Networking Essentials & Secure Wireless Concepts',
      'Tailored Corporate Tech Upskilling Programs',
      'Educational Institute Guest Lectures & Seminars',
      'Data Protection (PDPA) Compliance Awareness'
    ]
  },
  {
    id: 'smart-qr-patrol',
    title: 'Smart QR Patrol Solution',
    shortDesc: 'Unified web and mobile application monitoring field officers 24/7 with real-time tracking, QR checkpoints, and automated reports.',
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80',
    longDesc: 'The Smart QR Patrol Solution is a unified enterprise platform featuring a management web dashboard and an Android/iOS mobile application. Designed to monitor security and field officers 24/7, the system enables real-time GPS logging, automatic checkpoint check-ins via custom QR node scans, active incident reporting, and continuous tracking. Perfect for private security, site auditing, and corporate maintenance operations.',
    inclusions: [
      'Unified Admin Control Web Dashboard',
      'Android & iOS Field Officer Mobile Apps',
      'Real-time GPS Location Tracking & Time-stamping',
      'Custom Checkpoint QR Code Tag Generation',
      'Fail-safe Offline Scan Logging with Sync Support',
      'Instant Incident Reporting with Photo Attachments',
      'Automated Patrol Performance SLA Metrics & Reports',
      '24/7 Continuous Subnet Monitoring Platform',
      'Developer API & CRM Integration Readiness'
    ]
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'E-Commerce Platform for Enterprise Retailer',
    category: 'Website Development',
    categoryKey: 'web',
    description: 'Developed a robust, high-performance online retail portal with SMS gateway and payment integration.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    title: 'Enterprise ERP and Inventory Management System',
    category: 'Business Software',
    categoryKey: 'web',
    description: 'Built a customized database management utility for a warehousing and distribution enterprise in Sri Lanka.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    title: 'Multi-Location IP-CCTV Security Deployment',
    category: 'CCTV Installation',
    categoryKey: 'hardware',
    description: 'Configured a 32-channel synchronized surveillance environment with remote biometric access controllers.',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    title: 'Structured Network Infrastructure & Fiber Trunking',
    category: 'Network Setup',
    categoryKey: 'network',
    description: 'Designed and organized structured cabling with 120 nodes, unified access points, and Server Rack layout.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    title: 'High-Availability pfSense Firewall Integration',
    category: 'Firewall Implementation',
    categoryKey: 'cyber',
    description: 'Structured failover dual-WAN open-source gatekeeper firewall protecting corporate database records.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p6',
    title: 'Full Brand Launch Social Media Activation',
    category: 'Social Media Campaign',
    categoryKey: 'marketing',
    description: 'Produced promotional reels, poster grids, and coordinated campaigns for a corporate services brand.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p7',
    title: 'Govermental ICT Tender Specification Consultation',
    category: 'Procurement Consultancy',
    categoryKey: 'procure',
    description: 'Prepared complete BOQ, TOR, compliance matrix indexes, and conducted technical evaluations for equipment.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p8',
    title: 'Sri Lanka PDPA Compliance & Threat Audit',
    category: 'Cybersecurity Assessment',
    categoryKey: 'cyber-consult',
    description: 'Conducted rigorous compliance screening, penetration assessment, and generated a full security policy dictionary.',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff270190?auto=format&fit=crop&w=800&q=80'
  }
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-w1',
    category: 'web-software',
    packageName: 'Starter Web Package',
    features: [
      'Responsive 5-Page Informational Custom Design',
      'Free Domain Name (.com or .lk) for 1 Year',
      'High-Speed SSD Web Hosting (1 Year)',
      'Up to 5 Business Email Addresses',
      'Inbuilt Contact Sheets & Google Map embed',
      'SSL Certificate & Cybersecurity Shield setup',
      'Delivery Time: 7 to 10 Working Days',
      'WhatsApp Floating Button integration'
    ]
  },
  {
    id: 'pkg-w2',
    category: 'web-software',
    packageName: 'Business Web Package',
    features: [
      'Premium Custom Theme Layout (Up to 12 pages)',
      'Service/Product Catalog Layout with Quick Search',
      'Social Media Channels auto-posting integration',
      'Custom Slider & Call-To-Action (CTA) Modules',
      'Advanced On-page SEO Optimization targeting Sri Lanka keywords',
      'Interactive CMS dashboard (WordPress or React Admin Console)',
      'Training session for internal staff updates',
      'Priority Remote Technical Support (1 Year)'
    ]
  },
  {
    id: 'pkg-w3',
    category: 'web-software',
    packageName: 'E-Commerce Package',
    features: [
      'Dynamic Web Shop with Product Categories & Brand filtering',
      'Fully Secure Shopping Cart & Secure Checkout Pages',
      'Sri Lankan Payment Gateway (IPG) Integration (WebXpay/Payhere/Bank)',
      'Automatic Delivery Charge Calculator (province or weight-based)',
      'Automated Order Invoice PDFs via Emails',
      'SMS Alert Notification system on new purchases',
      'Inventory count sync controls',
      'Detailed Sales Analytics Dashboard'
    ]
  },
  {
    id: 'pkg-m1',
    category: 'maintenance',
    packageName: 'Basic ICT Support',
    features: [
      'Supporting up to 5 Office Computers/Laptops',
      'Monthly Preventive On-site Checkups',
      'Basic Network & Internet router debugging',
      'Security patch verification and updates',
      'Helpdesk Phone support (9:00 AM - 5:30 PM)',
      'Antivirus monitoring & threat cleanups',
      '1 Priority emergency callout per month'
    ]
  },
  {
    id: 'pkg-m2',
    category: 'maintenance',
    packageName: 'Standard Maintenance',
    features: [
      'Supporting up to 15 Office Devices',
      'Twice-monthly Preventive Maintenance Visits',
      'PABX & Surveillance CCTV diagnostics',
      'Wifi performance audits & dynamic channel tuning',
      'Data backup schedule validation (local cloud)',
      'Email client configurations & license syncs',
      'Within 3 hours emergency on-site response SLA',
      '3 Priority emergency callouts per month'
    ]
  },
  {
    id: 'pkg-m3',
    category: 'maintenance',
    packageName: 'Premium Enterprise SLA',
    features: [
      'Supporting 25+ devices & Office Subnet',
      'Dedicated backup hotlines & WhatsApp Group Support',
      'Weekly active checkups and device tune-ups',
      'Full Active Firewall support (Fortinet/Sophos/pfSense rule reviews)',
      'Continuous WAN link load balancing checks',
      'Immediate remote desktop diagnosis support',
      'Guaranteed within 1.5 Hour on-site arrival for critical issues',
      'Unlimited SLA Emergency Callouts'
    ]
  },
  {
    id: 'pkg-c1',
    category: 'cybersecurity',
    packageName: 'Commercial Firewall Setup',
    features: [
      'Fortigate or Sophos Enterprise Hardware deployment',
      'Custom LAN/DMZ interface allocation configurations',
      'Active Anti-Malware scanning & Gateway Web Filter rules',
      'Secure Client-To-Site VPN setup for external employees',
      'IPS (Intrusion Prevention) system policy tweaking',
      'Weekly automated security threats PDF summary',
      'Standard 1-year Support and active device firmware upgrade alignment'
    ]
  },
  {
    id: 'pkg-c2',
    category: 'cybersecurity',
    packageName: 'PDPA Readiness Assessment',
    features: [
      'Complete audit of customer data-retention points',
      'Review of staff consent and collection processes',
      'Gap identification relative to Sri Lanka PDPA laws',
      'Security posture report with high/medium/low risk findings',
      'Draft privacy policies for your corporate website',
      'Data breach standard operating procedure blueprint',
      'Post-audit alignment check (3 months after recommendations)'
    ]
  },
  {
    id: 'pkg-c3',
    category: 'cybersecurity',
    packageName: 'CMMC 2.0 Readiness Assessment',
    features: [
      'Discovery analysis of DoD clauses & regulatory obligations',
      'Defining assessment boundaries for FCI & CUI information environments',
      'Diagnostic gap assessment against all applicable Level 1 & Level 2 controls',
      'Comprehensive NIST SP 800-171 control mapping across 14 security domains',
      'Compilation of System Security Plan (SSP) & compliance diagrams',
      'Development of Plan of Action and Milestones (POA&M) with rating indices',
      'Creating CMMC Control Compliance Matrix & Evidence Registers',
      'Drafting of 12 critical compliance deliverables for audit defensibility'
    ]
  },
  {
    id: 'pkg-marketing',
    category: 'marketing',
    packageName: 'Business Social Media Package',
    features: [
      'Professional Setup & Branding for FB, IG & YouTube',
      'Monthly Content Calendar (12 High-Quality designed posts)',
      'Monthly Reel Video Production (2 custom shot & edited reels)',
      'SEO optimized captions & trending local hashtag lists',
      'Review management & message template setups',
      'Targeted Ad Campaign setup support (budget from client)',
      'Monthly analytic progress review report'
    ]
  },
  {
    id: 'pkg-procurement',
    category: 'procurement',
    packageName: 'Specification Preparation SLA',
    features: [
      'In-person business requirements mapping workshops',
      'Drafting detailed technical specifications for hardware & networking',
      'Formulating clean Terms of Reference (TOR) templates',
      'Detailed Bill of Quantity (BOQ) with market-accurate estimates',
      'Constructing vendor compliance assessment criteria sheets',
      'Drafting SLAs, warranties, and UAT blueprints'
    ]
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: 'What services does E-Tech Solutions provide?',
    answer: 'E-Tech Solutions is a fully integrated ICT firm providing custom web and software development, hardware infrastructure supply/setup/repair, structured networking, pfSense and commercial firewall cybersecurity setups, genuine corporate software licensing, digital marketing/social media management, professional creative media (videography/photography), ICT procurement consultancy, cybersecurity compliance reviews (PDPA/CMMC 2.0), and annual IT maintenance agreements (AMCs).'
  },
  {
    question: 'Do you provide website and software development?',
    answer: 'Yes! We design and develop custom corporate websites, e-commerce stores, unique web portals, custom admin dashboards, relational database systems, and custom mobile applications (iOS/Android) suited to automate and optimize your workflows.'
  },
  {
    question: 'Do you provide cybersecurity solutions?',
    answer: 'Absolutely. We provide end-to-end security protection that includes deploying commercial antivirus agents, enterprise hardware firewalls, custom client VPN gateways, internet content filters, email protection servers, threat assessments, and security log management.'
  },
  {
    question: 'Can you supply and configure firewalls?',
    answer: 'Yes, we supply, install, configure, and maintain both commercial hardware firewalls (such as Fortinet, Sophos, SonicWall) and open-source firewall platforms.'
  },
  {
    question: 'Do you support open-source firewall solutions such as pfSense?',
    answer: 'Yes! We are specialists in cost-effective open-source cybersecurity deployments using pfSense. We configure failover clusters, complex routing rules, multi-WAN load balancing, and secure OpenVPN/WireGuard setups on dedicated network devices.'
  },
  {
    question: 'Do you provide CCTV installation and maintenance?',
    answer: 'Yes. We design, supply, and install advanced IP and analog CCTV systems, network video recorders (NVR), time-attendance biometric hardware, and turnstile entrance locks, backed by regular AMC checkups.'
  },
  {
    question: 'Do you provide social media marketing services?',
    answer: 'Yes. We manage platforms including Facebook, Instagram, TikTok, and YouTube. Our capabilities cover profile branding, design templates, monthly content calendars, video editing for professional Reels, YouTube thumbnail editing, and organic profile maintenance.'
  },
  {
    question: 'Can you help with ICT procurement documents?',
    answer: 'Yes! We act as independent ICT Procurement Consultants. We draft unbiased technical specifications, rigorous Terms of Reference (TOR), market-realistic Bills of Quantity (BOQ), tender evaluation guidelines, and assist committees with compliance checks and vendor proposal evaluations.'
  },
  {
    question: 'Do you provide PDPA compliance assessment support?',
    answer: 'Yes, we help Sri Lankan businesses and banks align with the local Personal Data Protection Act (PDPA). We map data holding pathways, conduct gap assessments, draft operational privacy guidelines, and design risk mitigation roadmaps.'
  },
  {
    question: 'Do you provide maintenance agreements?',
    answer: 'Yes! We offer highly flexible and reliable Weekly, Monthly, and Annual Maintenance Contracts (AMCs) covering office hardware tuning, server safety, CCTV up-time, routers/switches stability, remote PC cleanup, and emergency on-site technician response.'
  },
  {
    question: 'How can we request a quotation?',
    answer: 'You can submit your requirements using our interactive "Request a Quote" form on the website, dial our hotlines at +94 72 212 1000 / +94 777 889 734, or email us at info@etechmultisolutions.com or etechmultisolutions@gmail.com. We typically respond within 24 hours with a comprehensive layout.'
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Established in 2012',
    desc: 'Proudly serving as a trusted Sri Lankan corporate tech advisor for over a decade.'
  },
  {
    title: 'End-to-End Solutions',
    desc: 'Hardware, custom software, security, marketing, and procurement advisory under one roof.'
  },
  {
    title: 'Unbiased Consultancy',
    desc: 'Uncompromised professional guidance in procurement specifications & tender advisory.'
  },
  {
    title: 'Cybersecurity-First Mindset',
    desc: 'Strict cybersecurity policies and PDPA compliance protocols fused into every single project.'
  },
  {
    title: 'Expert Engineering Team',
    desc: 'Practically trained technicians, network administrators, experienced developers, and consultants.'
  },
  {
    title: 'Long-Term Support',
    desc: 'Reliable monthly or annual maintenance agreements (AMCs) with responsive priority response.'
  }
];

export const INDUSTRIES_SERVED = [
  'Government Offices',
  'Dynamic SMEs',
  'Educational Institutes',
  'Corporate Enterprises',
  'Retail & E-commerce Brands',
  'Professional Consulting Firms',
  'Non-Profit Organizations (NGOs)',
  'Service Providers & Logistics',
  'Growing Startups',
  'Independent Professionals',
  'Content Creators & Media Brands',
  'Training & Vocational Institutes',
  'Healthcare & Dental Clinics',
  'Construction & Engineering Firms',
  'Hospitality, Hotels & Restaurants'
];
