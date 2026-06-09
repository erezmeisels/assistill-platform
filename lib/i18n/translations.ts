import type { LocaleCode } from "./locales";

export interface Translations {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: string;
    PERSONAL_SOCIAL: string;
    LANGUAGE_TRANSLATION: string;
    MENTORING_EDUCATION: string;
  };
  nav: {
    howItWorks: string;
    findMatch: string;
    signIn: string;
    becomePartner: string;
  };
  hero: {
    badge: string;
    tagline: string;
    headline: string;
    headlinePre: string;
    headlineEm: string;
    headlinePost: string;
    subtitle: string;
    ctaSecondary: string;
    browseAll: string;
    specialties: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string; step1Desc: string;
    step2Title: string; step2Desc: string;
    step3Title: string; step3Desc: string;
  };
  search: {
    badge: string;
    title: string;
    subtitle: string;
    whatLooking: string;
    specialty: string;
    specialtyHint: string;
    location: string;
    language: string;
    searchBusiness: string;
    findConnection: string;
    clearFilters: string;
    viewProfile: string;
    perHour: string;
    available: string;
    verified: string;
  };
  joinCta: {
    badge: string;
    title: string;
    body: string;
    trust1: string;
    trust2: string;
    trust3: string;
    cta: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
}

const en: Translations = {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: "Your business compass in Israel. Whether you arrive alone or as part of a group, we take care of everything you need — from complex business guidance to a professional safety net at every step, with no surprises.",
    PERSONAL_SOCIAL:       "From now on, you're never alone. This is where real, heartwarming connections begin — from grabbing a beer at the end of the day to having someone who will simply be there for you.",
    LANGUAGE_TRANSLATION:  "Breaking language barriers. Your way to be heard and understood exactly as needed, in any situation, with professional translation and linguistic accompaniment services.",
    MENTORING_EDUCATION:   "Growing at every step of the way. Personal career mentoring and academic support that will push you forward and guide you personally toward your next goals.",
  },
  nav: {
    howItWorks:    "How it works",
    findMatch:     "Find a Match",
    signIn:        "Sign in",
    becomePartner: "Become a Partner or Pro",
  },
  hero: {
    badge:        "Verified & background-checked professionals",
    tagline:      "Your Trusted Partner in Israel",
    headline:     "Find the right professional in Israel",
    headlinePre:  "Find the",
    headlineEm:   "right professional",
    headlinePost: "in Israel",
    subtitle:     "Browse by category, city, or language — and connect with a vetted expert today.",
    ctaSecondary: "Join as a Professional",
    browseAll:    "Browse all professionals ↓",
    specialties:  "specialties",
    stat1Value: "500+",  stat1Label: "Verified professionals",
    stat2Value: "4.9★",  stat2Label: "Average rating",
    stat3Value: "100%",  stat3Label: "Background checked",
  },
  howItWorks: {
    badge:      "The process",
    title:      "How it works",
    subtitle:   "From discovery to booking in three simple steps.",
    step1Title: "Search & Filter",
    step1Desc:  "Browse professionals by category, city, language, and skill. Smart filters surface exactly the right match for your needs.",
    step2Title: "Select & Quote",
    step2Desc:  "Use our transparent pricing calculator for an instant quote. Category-specific rates with zero hidden fees.",
    step3Title: "Book & Connect",
    step3Desc:  "Every professional is background-checked and admin-approved. Book with confidence, backed by our signed NDA policy.",
  },
  search: {
    badge:          "Find your match",
    title:          "Browse professionals",
    subtitle:       "Select a service category, narrow by specialty, then filter by city and language.",
    whatLooking:    "What are you looking for?",
    specialty:      "Specialty",
    specialtyHint:  "(select area first)",
    location:       "Location",
    language:       "Language",
    searchBusiness: "Search professionals",
    findConnection: "Find your connection",
    clearFilters:   "Clear filters",
    viewProfile:    "View profile & get quote",
    perHour:        "/ hr",
    available:      "Available:",
    verified:       "Verified",
  },
  joinCta: {
    badge:  "We're growing our network",
    title:  "Join our network of experts",
    body:   "Are you a seasoned professional based in Israel? Partner with AssistILL and connect with international clients who need exactly your expertise.",
    trust1: "Fully verified & NDA-protected",
    trust2: "Premium clientele",
    trust3: "500+ active professionals",
    cta:    "Join as a Professional",
  },
  footer: {
    tagline: "Your Trusted Partner in Israel",
    rights:  "All rights reserved.",
  },
};

const he: Translations = {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: "המצפן העסקי שלך בישראל. גם אם הגעת לבד או כחלק מקבוצה, נדאג לך לכל מה שצריך – מליווי עסקי מורכב ועד לרשת ביטחון מקצועית שתלווה אותך בכל צעד, ללא הפתעות.",
    PERSONAL_SOCIAL:       "מעכשיו, אתה אף פעם לא לבד. כאן מתחילים ליצור חיבורים אמיתיים ומחממי לב – מחבר לבירה בסוף היום ועד למישהו שפשוט יהיה שם עבורך.",
    LANGUAGE_TRANSLATION:  "שוברים את מחסומי השפה. הדרך שלך להישמע ולהבין בדיוק כמו שצריך, בכל סיטואציה, עם שירותי תרגום וליווי לשוני מקצועיים.",
    MENTORING_EDUCATION:   "לצמוח בכל שלב בדרך. מנטורינג אישי לקריירה או עזרה בלימודים שידחפו אותך למעלה וילוו אותך אישית לעבר היעדים הבאים שלך.",
  },
  nav: {
    howItWorks:    "איך זה עובד",
    findMatch:     "מצא התאמה",
    signIn:        "כניסה",
    becomePartner: "הפוך לשותף",
  },
  hero: {
    badge:        "מקצוענים מאומתים ובדוקי רקע",
    tagline:      "השותף האמין שלך בישראל",
    headline:     "מצא את המקצוען הנכון בישראל",
    headlinePre:  "מצא את",
    headlineEm:   "המקצוען הנכון",
    headlinePost: "בישראל",
    subtitle:     "עיין לפי קטגוריה, עיר או שפה — והתחבר היום למומחה מאומת.",
    ctaSecondary: "הצטרף כמקצוען",
    browseAll:    "עיין בכל המקצוענים ↓",
    specialties:  "התמחויות",
    stat1Value: "500+",  stat1Label: "מקצוענים מאומתים",
    stat2Value: "4.9★",  stat2Label: "דירוג ממוצע",
    stat3Value: "100%",  stat3Label: "בדוקי רקע",
  },
  howItWorks: {
    badge:      "התהליך",
    title:      "איך זה עובד",
    subtitle:   "מגילוי להזמנה בשלושה שלבים פשוטים.",
    step1Title: "חיפוש וסינון",
    step1Desc:  "עיין במקצוענים לפי קטגוריה, עיר, שפה ומיומנות. מסנני חכמה מציגים בדיוק את ההתאמה הנכונה.",
    step2Title: "בחר וקבל הצעת מחיר",
    step2Desc:  "השתמש במחשבון התמחור השקוף שלנו לקבלת הצעת מחיר מיידית ללא עמלות נסתרות.",
    step3Title: "הזמן והתחבר",
    step3Desc:  "כל מקצוען עובר בדיקת רקע ואושר על ידי מנהל. הזמן בביטחון, מגובה ב-NDA חתום.",
  },
  search: {
    badge:          "מצא את ההתאמה שלך",
    title:          "עיין במקצוענים",
    subtitle:       "בחר קטגוריית שירות, צמצם לפי התמחות, ולאחר מכן סנן לפי עיר ושפה.",
    whatLooking:    "מה אתה מחפש?",
    specialty:      "התמחות",
    specialtyHint:  "(בחר תחום קודם)",
    location:       "מיקום",
    language:       "שפה",
    searchBusiness: "חפש מקצוענים",
    findConnection: "מצא את הקשר שלך",
    clearFilters:   "נקה מסננים",
    viewProfile:    "צפה בפרופיל וקבל הצעה",
    perHour:        "/ שעה",
    available:      "זמין:",
    verified:       "מאומת",
  },
  joinCta: {
    badge:  "אנחנו מגדילים את הרשת שלנו",
    title:  "הצטרף לרשת המומחים שלנו",
    body:   "האם אתה מקצוען ותיק המבוסס בישראל? שתף פעולה עם AssistILL והתחבר ללקוחות בינלאומיים.",
    trust1: "מאומת ומוגן NDA",
    trust2: "לקוחות פרמיום",
    trust3: "500+ מקצוענים פעילים",
    cta:    "הצטרף כמקצוען",
  },
  footer: {
    tagline: "השותף האמין שלך בישראל",
    rights:  "כל הזכויות שמורות.",
  },
};

const fr: Translations = {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: "Votre boussole professionnelle en Israël. Que vous arriviez seul ou en groupe, nous nous occupons de tout — de l'accompagnement commercial complexe à un filet de sécurité professionnel à chaque étape, sans surprises.",
    PERSONAL_SOCIAL:       "Désormais, vous n'êtes jamais seul. C'est ici que commencent les vraies connexions — d'une bière en fin de journée à quelqu'un qui sera simplement là pour vous.",
    LANGUAGE_TRANSLATION:  "Briser les barrières linguistiques. Votre façon d'être entendu et compris exactement comme il faut, dans toute situation, avec des services de traduction et d'accompagnement linguistique professionnels.",
    MENTORING_EDUCATION:   "Grandir à chaque étape. Mentorat personnel de carrière et soutien académique pour vous propulser vers vos prochains objectifs.",
  },
  nav: {
    howItWorks:    "Comment ça marche",
    findMatch:     "Trouver un match",
    signIn:        "Connexion",
    becomePartner: "Devenir professionnel",
  },
  hero: {
    badge:        "Professionnels vérifiés et contrôlés",
    tagline:      "Votre partenaire de confiance en Israël",
    headline:     "Trouvez le bon professionnel en Israël",
    headlinePre:  "Trouvez le",
    headlineEm:   "bon professionnel",
    headlinePost: "en Israël",
    subtitle:     "Parcourez par catégorie, ville ou langue — et connectez-vous avec un expert certifié.",
    ctaSecondary: "Rejoindre en tant que professionnel",
    browseAll:    "Voir tous les professionnels ↓",
    specialties:  "spécialités",
    stat1Value: "500+",  stat1Label: "Professionnels vérifiés",
    stat2Value: "4.9★",  stat2Label: "Note moyenne",
    stat3Value: "100%",  stat3Label: "Antécédents vérifiés",
  },
  howItWorks: {
    badge:      "Le processus",
    title:      "Comment ça marche",
    subtitle:   "De la découverte à la réservation en trois étapes simples.",
    step1Title: "Rechercher et filtrer",
    step1Desc:  "Parcourez les professionnels par catégorie, ville, langue et compétence.",
    step2Title: "Sélectionner et obtenir un devis",
    step2Desc:  "Utilisez notre calculateur transparent pour un devis instantané sans frais cachés.",
    step3Title: "Réserver et se connecter",
    step3Desc:  "Chaque professionnel est vérifié et approuvé. Réservez en toute confiance.",
  },
  search: {
    badge:          "Trouvez votre match",
    title:          "Parcourir les professionnels",
    subtitle:       "Sélectionnez une catégorie, précisez la spécialité, puis filtrez par ville et langue.",
    whatLooking:    "Que recherchez-vous ?",
    specialty:      "Spécialité",
    specialtyHint:  "(sélectionnez d'abord)",
    location:       "Lieu",
    language:       "Langue",
    searchBusiness: "Rechercher des professionnels",
    findConnection: "Trouver votre connexion",
    clearFilters:   "Effacer les filtres",
    viewProfile:    "Voir le profil & devis",
    perHour:        "/ h",
    available:      "Disponible :",
    verified:       "Vérifié",
  },
  joinCta: {
    badge:  "Nous développons notre réseau",
    title:  "Rejoignez notre réseau d'experts",
    body:   "Êtes-vous un professionnel expérimenté basé en Israël ? Associez-vous à AssistILL et connectez-vous avec des clients internationaux.",
    trust1: "Vérifié et protégé par NDA",
    trust2: "Clientèle premium",
    trust3: "500+ professionnels actifs",
    cta:    "Rejoindre en tant que professionnel",
  },
  footer: {
    tagline: "Votre partenaire de confiance en Israël",
    rights:  "Tous droits réservés.",
  },
};

const es: Translations = {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: "Su brújula empresarial en Israel. Ya sea que llegue solo o en grupo, cubrimos todo — desde orientación empresarial compleja hasta una red de seguridad profesional en cada paso, sin sorpresas.",
    PERSONAL_SOCIAL:       "A partir de ahora, nunca estás solo. Aquí comienzan las conexiones reales y entrañables — desde una cerveza al final del día hasta alguien que simplemente esté ahí para ti.",
    LANGUAGE_TRANSLATION:  "Rompiendo barreras lingüísticas. Su forma de ser escuchado y comprendido exactamente como es necesario, en cualquier situación, con servicios de traducción y acompañamiento lingüístico profesionales.",
    MENTORING_EDUCATION:   "Creciendo en cada paso del camino. Mentoría personal de carrera y apoyo académico que lo impulsa hacia adelante y lo guía hacia sus próximas metas.",
  },
  nav: {
    howItWorks:    "Cómo funciona",
    findMatch:     "Encontrar coincidencia",
    signIn:        "Iniciar sesión",
    becomePartner: "Ser socio o profesional",
  },
  hero: {
    badge:        "Profesionales verificados y con antecedentes",
    tagline:      "Tu socio de confianza en Israel",
    headline:     "Encuentra el profesional adecuado en Israel",
    headlinePre:  "Encuentra el",
    headlineEm:   "profesional adecuado",
    headlinePost: "en Israel",
    subtitle:     "Busca por categoría, ciudad o idioma — y conéctate hoy con un experto verificado.",
    ctaSecondary: "Unirse como profesional",
    browseAll:    "Ver todos los profesionales ↓",
    specialties:  "especialidades",
    stat1Value: "500+",  stat1Label: "Profesionales verificados",
    stat2Value: "4.9★",  stat2Label: "Calificación media",
    stat3Value: "100%",  stat3Label: "Antecedentes verificados",
  },
  howItWorks: {
    badge:      "El proceso",
    title:      "Cómo funciona",
    subtitle:   "Del descubrimiento a la reserva en tres sencillos pasos.",
    step1Title: "Buscar y filtrar",
    step1Desc:  "Explore profesionales por categoría, ciudad, idioma y habilidad.",
    step2Title: "Seleccionar y cotizar",
    step2Desc:  "Use nuestra calculadora de precios transparente para una cotización instantánea sin cargos ocultos.",
    step3Title: "Reservar y conectar",
    step3Desc:  "Cada profesional pasa verificación de antecedentes y es aprobado. Reserve con confianza.",
  },
  search: {
    badge:          "Encuentre su coincidencia",
    title:          "Explorar profesionales",
    subtitle:       "Seleccione una categoría, elija la especialidad y filtre por ciudad e idioma.",
    whatLooking:    "¿Qué está buscando?",
    specialty:      "Especialidad",
    specialtyHint:  "(seleccione área primero)",
    location:       "Ubicación",
    language:       "Idioma",
    searchBusiness: "Buscar profesionales",
    findConnection: "Encuentra tu conexión",
    clearFilters:   "Borrar filtros",
    viewProfile:    "Ver perfil y cotización",
    perHour:        "/ hora",
    available:      "Disponible:",
    verified:       "Verificado",
  },
  joinCta: {
    badge:  "Estamos creciendo nuestra red",
    title:  "Únase a nuestra red de expertos",
    body:   "¿Es usted un profesional experimentado basado en Israel? Asóciese con AssistILL y conéctese con clientes internacionales.",
    trust1: "Totalmente verificado y protegido por NDA",
    trust2: "Clientela premium",
    trust3: "500+ profesionales activos",
    cta:    "Unirse como profesional",
  },
  footer: {
    tagline: "Tu socio de confianza en Israel",
    rights:  "Todos los derechos reservados.",
  },
};

const zh: Translations = {
  categoryDescriptions: {
    BUSINESS_PROFESSIONAL: "您在以色列的商业指南针。无论您独自出行还是团队前来，我们确保一切就绪——从复杂的商务指导到专业安全网络，在每一步陪伴您，零意外。",
    PERSONAL_SOCIAL:       "从今起，您不再孤单。这里是真实温暖连接的起点——从傍晚小酌一杯，到身边有人简单地陪伴您。",
    LANGUAGE_TRANSLATION:  "打破语言障碍。无论何种场合，通过专业翻译和语言陪伴服务，确保您被准确听见和理解。",
    MENTORING_EDUCATION:   "在每一步中成长。个人职业指导和学术支持，推动您前进，引导您实现下一个目标。",
  },
  nav: {
    howItWorks:    "工作原理",
    findMatch:     "寻找匹配",
    signIn:        "登录",
    becomePartner: "成为合作伙伴",
  },
  hero: {
    badge:        "经过验证和背景调查的专业人员",
    tagline:      "您在以色列的可信赖合作伙伴",
    headline:     "在以色列找到合适的专业人员",
    headlinePre:  "在以色列找到",
    headlineEm:   "合适的",
    headlinePost: "专业人员",
    subtitle:     "按类别、城市或语言浏览——立即与经认证的专家建立联系。",
    ctaSecondary: "以专业人员身份加入",
    browseAll:    "浏览所有专业人员 ↓",
    specialties:  "专业",
    stat1Value: "500+",  stat1Label: "认证专业人员",
    stat2Value: "4.9★",  stat2Label: "平均评分",
    stat3Value: "100%",  stat3Label: "背景已调查",
  },
  howItWorks: {
    badge:      "流程",
    title:      "工作原理",
    subtitle:   "三个简单步骤，从发现到预订。",
    step1Title: "搜索和筛选",
    step1Desc:  "按类别、城市、语言和技能浏览专业人员，智能筛选器精准匹配您的需求。",
    step2Title: "选择和报价",
    step2Desc:  "使用我们的透明定价计算器获取即时报价，无任何隐藏费用。",
    step3Title: "预订和联系",
    step3Desc:  "每位专业人员均经过背景调查和管理员批准。放心预订，受NDA政策保护。",
  },
  search: {
    badge:          "找到您的匹配",
    title:          "浏览专业人员",
    subtitle:       "选择服务类别，缩小专业范围，然后按城市和语言筛选。",
    whatLooking:    "您在寻找什么？",
    specialty:      "专业",
    specialtyHint:  "(请先选择领域)",
    location:       "位置",
    language:       "语言",
    searchBusiness: "搜索专业人员",
    findConnection: "找到您的联系",
    clearFilters:   "清除筛选",
    viewProfile:    "查看资料与报价",
    perHour:        "/ 小时",
    available:      "可用：",
    verified:       "已认证",
  },
  joinCta: {
    badge:  "我们正在扩大网络",
    title:  "加入我们的专家网络",
    body:   "您是驻以色列的资深专业人员吗？与AssistILL合作，与需要您专业知识的国际客户建立联系。",
    trust1: "完全验证，受NDA保护",
    trust2: "优质客户",
    trust3: "500+活跃专业人员",
    cta:    "以专业人员身份加入",
  },
  footer: {
    tagline: "您在以色列的可信赖合作伙伴",
    rights:  "版权所有。",
  },
};

export const TRANSLATIONS: Record<LocaleCode, Translations> = { en, he, fr, es, zh };

export function getTranslations(locale: LocaleCode): Translations {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en;
}
