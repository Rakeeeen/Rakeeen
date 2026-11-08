import type { Competency, Project, SiteConfig, TimelineItem, WorkflowPhase } from '@/domain/content';

export const SITE_CONFIG: SiteConfig = {
  name: { en: "Hamid Walid", ar: "حامد وليد", it: "Hamid Walid" },
  role: {
    en: "Product Builder",
    ar: "باني المنتج",
    it: "Costruttore di Prodotti"
  },
  location: { en: "", ar: "", it: "" },
  email: "Hamed.rakeeen@gmail.com",
  summary: { en: "", ar: "", it: "" },
  detailed_summary: {
    en: "Product Builder with 3+ years of experience bridging the gap between complex business logic\nand human-centered design. From my early start in graphic design to building scalable digital\nproducts in Egypt and Saudi Arabia, my focus has always been Simplicity.\nI leverage AI\nworkflows to accelerate prototyping and delivery by 10X, ensuring that every pixel serves a\npurpose and every journey is frictionless for the end user.",
    it: "Product Builder con oltre 3 anni di esperienza nel colmare il divario tra logica di business e design centrato sull'utente. Dagli inizi nel graphic design alla creazione di prodotti digitali scalabili tra Egitto e Arabia Saudita, il mio focus è sempre la Semplicità. Integro workflow di IA per accelerare prototipazione e delivery di 10 volte, assicurando che ogni pixel abbia uno scopo e ogni user journey sia fluida e senza intoppi",
    ar: "باني منتج بخبرة +3 سنين في تحويل تعقيدات البيزنس لتصاميم سهلة الاستخدام. رحلتي بدأت من الجرافيك ديزاين لحد بناء منتجات رقمية في مصر والسعودية، ومبدئي دايماً البساطة. بستخدم الذكاء الاصطناعي عشان أسرع الـ Prototyping والتسليم لـ 10 أضعاف، عشان أضمن إن كل بكسل له هدف، وكل رحلة للمستخدم تكون سلسة ومن غير مجهود"
  },
  heroHeadline: {
    en: "Designing for Human with AI",
    ar: "بصمم للناس ... بالذكاء الاصطناعي",
    it: "Progettare per l'uomo... con l'IA"
  },
  heroSubtitle: {
    en: "Product Builder turning complex ideas into simple, user-friendly products.\nCombining human-centered design with AI to deliver high-quality results, fast",
    ar: "باني المنتج بساعدك تحول فكرتك لمنتج بسيط وسهل الاستخدام.\nبدمج بين التصميم المريح والذكاء الاصطناعي عشان أطلعلك شغل تقيل في وقت قياسي",
    it: "Costruttore di Prodotti trasformo idee complesse in prodotti semplici e intuitivi.\nUnisco design umano e IA per risultati di qualità in tempi record"
  },
  heroBtnPrimary: { en: "", ar: "", it: "" },
  heroBtnSecondary1: { en: "", ar: "", it: "" },
  heroBtnSecondary2: { en: "", ar: "", it: "" },
  socials: {
    linkedin: "https://www.linkedin.com/in/rakeeen/",
    behance: "https://www.behance.net/rakeeen"
  },
  siteImages: {
    // Images are served from Cloudinary via the dashboard. The favicon is the site's own logo (public/).
    navbarLogo: "",
    aboutPortrait: "",
    contactBackground: "",
    projectDetail1: "",
    projectDetail2: "",
    projectDetail3: ""
  },
  tools: [],
  contactForm: {
    enabled: true,
    heading: { en: "Send a Letter", ar: "ابعت رسالة بروح زمان", it: "Invia una Lettera" },
    subtitle: { en: "Old school vibes. New school response time.", ar: "طابع كلاسيكي، بس برد عليك طيارة.", it: "Atmosfera vintage. Tempi di risposta moderni." },
    labelName: { en: "Your Name", ar: "اسمك إيه؟", it: "Il tuo Nome" },
    labelEmail: { en: "Your Email", ar: "إيميلك", it: "La tua Email" },
    labelMessage: { en: "Your Message", ar: "عايز تقول إيه؟", it: "Il tuo Messaggio" },
    placeholderName: { en: "Who's writing?", ar: "سجل اسمك هنا", it: "Chi scrive?" },
    placeholderEmail: { en: "So I can write back", ar: "عشان أعرف أرد عليك", it: "Così posso risponderti" },
    placeholderMessage: { en: "What's on your mind?", ar: "حابب تقول إيه؟", it: "Cosa hai in mente?" },
    btnText: { en: "Send It!", ar: "طيّر الرسالة", it: "Invia!" },
    successHeading: { en: "Letter sent!", ar: "الرسالة طارت!", it: "Lettera inviata!" },
    successBody: { en: "I'll get back to you. Promise.", ar: "هرد عليك قريب، مفيش كلام.", it: "Ti risponderò presto. Promesso." },
    responseTime: { en: "I respond within 24hrs", ar: "برد في أقل من يوم", it: "Rispondo entro 24 ore" }
  }
};

export const PROJECTS: Project[] = [
  {
    id: "1778502708356",
    title: { en: "Book a Doctor in 3 steps", ar: "", it: "" },
    link: "https://www.behance.net/gallery/242827673/Alhayat-Designing-a-Seamless-Doctor-Booking-app",
    featured: false
  },
  {
    id: "1778502742805",
    title: { en: "New Way to Design Arab Apps", ar: "", it: "" },
    link: "https://www.behance.net/gallery/228718391/Athar"
  },
  {
    id: "1778502764414",
    title: { en: "Live Chat ? Here", ar: "", it: "" },
    link: "https://www.behance.net/gallery/233544029/15-Mayo-Live-Chat-App"
  },
  {
    id: "1778502780838",
    title: { en: "Food App ? Here", ar: "", it: "" },
    link: "https://www.behance.net/gallery/228720039/Food-App"
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    company: { en: "Alsanosy", ar: "السنوسي", it: "Alsanosy" },
    year: "Oct 2023 ... Apr 2024",
    role: { en: "Media Buyer", ar: "مشتري مساحات اعلانيه", it: "Media Buyer" },
    description: {
      en: "I started in marketing, graphic design, and video editing. I handled data entry and created presentations to help the team visualize ideas.",
      it: "Ho iniziato con la grafica, il montaggio video e la pubblicità. Mi occupavo anche di gestire dati e creare presentazioni efficaci.",
      ar: "بدأت مشواري في مجال الدعاية والإعلان وتجهيز الفيديوهات وتصميم الصور. كنت مسؤول كمان عن إدخال البيانات وعرض التقارير بشكل يسهل فهمه. "
    }
  },
  {
    company: { en: "Mint Ops", ar: "مينت اوبس", it: "Mint Ops" },
    year: "Apr 2024 ... Oct 2024",
    role: { en: "UIX Designer", ar: "مصمم تجربة وواجهات المستخدم", it: "" },
    description: {
      en: "I joined as a trainee to learn how to design better digital experiences. For 6 months, I focused on solving user problems through simple layouts.",
      it: "Ho fatto un tirocinio di 6 mesi per imparare a creare app facili da usare. Mi sono concentrato sulla semplicità e sulla soluzione di problemi reali.",
      ar: "بدأت أتعمق في إزاي أصمم تطبيقات ومواقع تريح الناس اللي بتستخدمها. اتدربت لمدة 6 شهور على إزاي أحول الأفكار المعقدة لحلول بسيطة وعملية."
    }
  },
  {
    company: { en: "Rakeeen", ar: "ركيـــن", it: "Rakeeen" },
    year: "Apr 2024 ... Present",
    role: { en: "Freelancer", ar: "مدير نفسي", it: "" },
    description: {
      en: "I designed financial dashboards and service apps for international clients. I used AI tools to speed up my work and deliver high-quality designs.",
      it: "Ho progettato sistemi finanziari e app di servizi per clienti in tutto il mondo. Ho usato l’IA per lavorare più velocemente e con precisionه.",
      ar: "اشتغلت مع عملاء من كذا دولة وصممت لوحات تحكم مالية وتطبيقات خدمية. ركزت في الفترة دي على استخدام الذكاء الاصطناعي عشان أنجز الشغل بجودة عالية وسرعة خيالية."
    }
  },
  {
    company: { en: "Alhayat", ar: "الحياه", it: "" },
    year: "Sep 2025 ... Present",
    role: { en: "Product Builder", ar: "باني المنتج", it: "Costruttore di Prodotti" },
    description: {
      en: "Currently leading the design of the \"Alhayat\" app from scratch. I created features to make the app easy to use for families and older generations.",
      it: "Oggi gestisco l’intero design dell’app Alhayat. Ho creato funzioni speciali per rendere la tecnologia semplice per tutta la famiglia.",
      ar: "حالياً أنا المسؤول عن تصميم التطبيق من الألف للياء لضمان راحة المستخدمين. صممت مميزات خاصة بتسهل استخدام التكنولوجيا لكبار السن وللعيلة كلها."
    }
  }
];

export const COMPETENCIES: Competency[] = [
  { title: { en: "Ui Design", ar: "بناء الواجهات", it: "Design Interfacce" } },
  { title: { en: "UX Research", ar: "فهم المستخدم", it: "Ricerca Utente" } },
  { title: { en: "Quick Learner", ar: "سرعة التعلم", it: "Apprendimento Rapido" } },
  { title: { en: "AI Workflows", ar: "الذكاء الاصطناعي", it: "Flussi IA" } },
  { title: { en: "Problem Solver", ar: "حل المشكلات", it: "Risolutore Problemi" } },
  { title: { en: "Prompt Engineering", ar: "هندسة الأوامر", it: "Ingegneria Prompt" } },
  { title: { en: "Logical Thinking", ar: "تفكير منطقي", it: "Pensiero Logico" } },
  { title: { en: "Rapid Prototyping", ar: "البناء السريع", it: "Prototipazione Rapida" } },
  { title: { en: "Team Player", ar: "شغل الفريق", it: "Lavoro Squadra" } }
];

export const DEFAULT_WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    en_title: '01 · DISCOVERY & STRATEGY',
    ar_title: '01 · الاكتشاف والاستراتيجية',
    it_title: '01 · SCOPERTA E STRATEGIA',
    en_sub: 'BUSINESS LOGIC & USER RESEARCH',
    ar_sub: 'منطق العمل والبحث عن المستخدم',
    it_sub: 'LOGICA DI BUSINESS E RICERCA UTENTE',
    en_desc: 'We start by understanding the problem, not the screen. Business goals, user needs, and technical constraints are mapped before a single wireframe is drawn.',
    ar_desc: 'نبدأ من فهم المشكلة وليس الشاشة. نرسم أهداف العمل واحتياجات المستخدم والقيود التقنية قبل حتى رسم أي هيكل أولي.',
    it_desc: 'Partiamo dal capire il problema, non dallo schermo. Obiettivi, bisogni degli utenti e vincoli tecnici vengono mappati prima di disegnare anche solo un wireframe.',
    en_skills: 'User Research · Competitive Analysis · Problem Definition',
    ar_skills: 'بحث المستخدم · تحليل المنافسين · تعريف المشكلة',
    it_skills: 'Ricerca Utente · Analisi Competitiva · Definizione del Problema',
  },
  {
    en_title: '02 · UX & LOGIC',
    ar_title: '02 · تجربة المستخدم والمنطق',
    it_title: '02 · UX E LOGICA',
    en_sub: 'USER FLOWS & WIREFRAMES',
    ar_sub: 'مسارات المستخدم والهياكل الأولية',
    it_sub: 'FLUSSI UTENTE E WIREFRAME',
    en_desc: 'Every journey is designed before it is built. Flows, wireframes, and early testing keep the logic sharp and the direction locked.',
    ar_desc: 'كل رحلة يتم تصميمها قبل بنائها. المسارات والهياكل الأولية والاختبارات المبكرة تجعل المنطق واضحًا والاتجاه ثابتًا.',
    it_desc: 'Ogni viaggio viene progettato prima di essere costruito. Flussi, wireframe e test iniziali mantengono la logica chiara e la direzione definita.',
    en_skills: 'User Flows · Wireframes · Usability Testing',
    ar_skills: 'مسارات المستخدم · الهياكل الأولية · اختبار الاستخدام',
    it_skills: 'Flussi Utente · Wireframe · Usability Testing',
  },
  {
    en_title: '03 · UI & FIGMA ENGINEERING',
    ar_title: '03 · تصميم الواجهة والهندسة في فيجما',
    it_title: '03 · UI E FIGMA ENGINEERING',
    en_sub: 'DESIGN TOKENS & COMPONENT ARCHITECTURE',
    ar_sub: 'الرموز التصميمية وهندسة المكونات',
    it_sub: 'DESIGN TOKENS E ARCHITETTURA DEI COMPONENTI',
    en_desc: 'High-fidelity screens built inside a design system that mirrors production code — consistent, scalable, and handoff-ready.',
    ar_desc: 'شاشات عالية الدقة تُبنى داخل نظام تصميم يطابق الكود الإنتاجي — متسق وقابل للتطوير وجاهز للتسليم.',
    it_desc: 'Schermate ad alta fedeltà costruite all’interno di un design system che rispecchia il codice di produzione — coerente, scalabile e pronta per il handoff.',
    en_skills: 'Figma Auto-Layout · Design Tokens · Edge Cases',
    ar_skills: 'Auto Layout · الرموز التصميمية · الحالات الخاصة',
    it_skills: 'Figma Auto-Layout · Design Tokens · Edge Cases',
  },
  {
    en_title: '04 · FULL EXECUTION — OPTIONAL',
    ar_title: '04 · التنفيذ الكامل — اختياري',
    it_title: '04 · ESECUZIONE COMPLETA — OPZIONALE',
    en_sub: 'BACKEND · FRONT-END · FLUTTER — VIA TRUSTED NETWORK',
    ar_sub: 'باك إند · فرونت إند · فلاتر — عبر شبكة موثوقة',
    it_sub: 'BACKEND · FRONT-END · FLUTTER — TRAMITE RETE DI FIDUCIA',
    en_desc: 'Design and specs are handoff-ready as they are. When a project needs full execution, a trusted network takes the same specs straight into working code — no gap in standards, no guesswork.',
    ar_desc: 'التصميم والمواصفات جاهزين للتسليم زي ما هما. ولما مشروع يحتاج تنفيذ كامل، شبكة موثوقة بتاخد نفس المواصفات وتحولها لكود شغال مباشرة — من غير فرق في المعايير، ومن غير تخمين.',
    it_desc: "Design e specifiche sono già pronti per il passaggio in sviluppo. Quando un progetto richiede l'esecuzione completa, una rete di fiducia prende le stesse specifiche e le trasforma direttamente in codice funzionante — nessun compromesso sugli standard, nessuna supposizione.",
    en_skills: 'React · Tailwind · Flutter · API Integration',
    ar_skills: 'React · Tailwind · Flutter · ربط الـ API',
    it_skills: 'React · Tailwind · Flutter · Integrazione API',
  },
  {
    en_title: '05 · QA & TESTING',
    ar_title: '05 · الجودة والاختبار',
    it_title: '05 · QA E TEST',
    en_sub: 'VISUAL · FUNCTIONAL · PERFORMANCE',
    ar_sub: 'بصري · وظيفي · أداء',
    it_sub: 'VISIVO · FUNZIONALE · PERFORMANCE',
    en_desc: 'Every pixel and every function gets tested. No broken flows, no layout bugs, no surprises after launch.',
    ar_desc: 'كل بكسل وكل وظيفة يتم اختبارها. لا توجد مسارات مكسورة ولا أخطاء تخطيط ولا مفاجآت بعد الإطلاق.',
    it_desc: 'Ogni pixel e ogni funzione vengono testati. Nessun flusso rotto, nessun bug di layout, nessuna sorpresa dopo il lancio.',
    en_skills: 'Design Parity · Code Standards · Cross-Device Testing',
    ar_skills: 'التطابق البصري · معايير الكود · اختبار عبر الأجهزة',
    it_skills: 'Parità di Design · Standard di Codice · Test Cross-Device',
  },
  {
    en_title: '06 · LAUNCH & MONITOR',
    ar_title: '06 · الإطلاق والمراقبة',
    it_title: '06 · LANCIO E MONITORAGGIO',
    en_sub: 'LIVE · DEPLOYED · TRACKED',
    ar_sub: 'مباشر · مُنَفَّذ · مُتَابَع',
    it_sub: 'LIVE · DEPLOYED · TRACKED',
    en_desc: 'The product goes live. Deployed, monitored, and ready for real users — not handed off, delivered.',
    ar_desc: 'يخرج المنتج للحياة. يُنشر ويُراقب ويكون جاهزًا للمستخدمين الحقيقيين — وليس مجرد تسليم.',
    it_desc: 'Il prodotto va live. Deployato, monitorato e pronto per utenti reali — non solo consegnato.',
    en_skills: 'App Store · Web Deployment · Analytics Setup',
    ar_skills: 'متجر التطبيقات · النشر على الويب · إعداد التحليلات',
    it_skills: 'App Store · Deploy Web · Setup Analytics',
  },
];
