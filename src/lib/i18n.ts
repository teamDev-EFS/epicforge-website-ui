import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        contact: 'Contact'
      },
      hero: {
        headline: 'We Build AI Systems & Custom Software That Automate Your Workflow, Boost Revenue & Generate Qualified Leads',
        subheadline: 'Without hiring.',
        description: 'Tailor-made tools and intelligent agents that bring you more calls, close more deals, and replace repetitive work.',
        subtitle: 'Built for founders, fast-growing teams & modern enterprises.',
        proudCreators: 'Proud creators of ForgeOrion.com — our intelligent workflow platform.',
        ctaAI: 'Talk to Our AI Assistant',
        ctaAISubtext: 'Get your quote in 2 minutes — multilingual, voice-enabled',
        ctaCall: 'Schedule Strategy Call',
        ctaCallSubtext: 'Guaranteed lead roadmap in 30 min'
      },
      features: {
        title: 'Why Clients Choose EpicForgeSoftware',
        aiAssistants: {
          title: 'AI Assistants That Book Calls',
          description: 'Trained on your pitch, live in 4 languages — working 24/7 to qualify and convert leads.'
        },
        customSoftware: {
          title: 'Custom Software Solutions',
          description: 'CRMs, portals, mobile/web apps, dashboards — built exactly to your workflow and business needs.'
        },
        forgeOrion: {
          title: 'ForgeOrion Platform',
          description: 'Our automation product. Build flows, assign rules, see live ops — no code needed.'
        },
        guarantee: {
          title: 'We Guarantee Results',
          description: 'Every build reduces manual labor, increases conversions, and generates measurable ROI.'
        }
      },
      about: {
        title: 'Built by Founders. Fueled by Vision. Engineered for Scale.',
        description: 'EpicForgeSoftware builds custom SaaS and AI systems designed, delivered, and scaled directly by its founders.',
        whyChoose: 'Why Clients Choose Us',
        reasons: [
          'No project bloat. Just clear execution.',
          'Speak to engineers, not salespeople.',
          'Systems built to grow with you — not crash under pressure.',
          "You'll know what you're getting before you pay."
        ],
        companyDescription: "We're a results-first AI & software company — not a dev shop with buzzwords. From automating $10/hr jobs to deploying smart booking tools, we build systems that make businesses move faster. Our first product, ForgeOrion.com, powers intelligent operations in India & Korea. Now, we help clients in Health, Legal, Auto & SaaS — across India, Korea and the U.S."
      },
      team: {
        title: 'Leadership Team',
        subtitle: 'Meet the founders who build, deliver, and scale every solution',
        ceo: {
          name: 'Aditya Vardhan Nagamalli',
          title: 'Chief Executive Officer',
          description: 'Leads strategy, product vision, client growth, and GTM. Founder of ForgeOrion and multiple creator brands.'
        },
        cto: {
          name: 'Avinash Kumar Nagumalli',
          title: 'Chief Technology Officer',
          description: 'Owns full-stack development, technical architecture, and system scalability. Expert in fast, stable software delivery.'
        },
        coo: {
          name: 'Harsha Vardhan Nagamalli',
          title: 'Chief Operating Officer',
          description: 'Oversees operations, finance, delivery pipelines, and project execution. Ensures on-time, on-budget delivery.'
        }
      },
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        company: 'Company Name',
        businessType: 'Business Type',
        budget: 'Project Budget',
        problem: 'What problem can we solve for you?',
        submit: 'Get My Custom Solution',
        submitting: 'Submitting...',
        success: 'Thank you! We\'ll be in touch within 24 hours.',
        error: 'Something went wrong. Please try again.'
      },
      chat: {
        greeting: 'Hi! I\'m your AI assistant. I can help you get a quote for your project. Would you like to speak or type?',
        askName: 'Great! Let\'s start. What\'s your name?',
        askEmail: 'Nice to meet you, {{name}}! What\'s your email address?',
        askBudget: 'What\'s your budget range for this project?',
        askProject: 'What type of project are you looking for?',
        askTimeline: 'When would you like to get started?',
        qualified: 'Perfect! Based on your needs, I\'d like to connect you with our team. Let me schedule a strategy call for you.',
        calendlyTrigger: 'Opening calendar...'
      },
      footer: {
        contact: 'Contact: info@epicforgesoftware.com',
        rights: 'All Rights Reserved by EpicForgeSoftware • © 2025',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        about: 'Nosotros',
        services: 'Servicios',
        contact: 'Contacto'
      },
      hero: {
        headline: 'Construimos Sistemas de IA y Software Personalizado que Automatizan tu Flujo de Trabajo, Aumentan Ingresos y Generan Clientes Calificados',
        subheadline: 'Sin contratar.',
        description: 'Herramientas hechas a medida y agentes inteligentes que te traen más llamadas, cierran más tratos y reemplazan el trabajo repetitivo.',
        subtitle: 'Construido para fundadores, equipos de rápido crecimiento y empresas modernas.',
        proudCreators: 'Orgullosos creadores de ForgeOrion.com — nuestra plataforma de flujo de trabajo inteligente.',
        ctaAI: 'Habla con Nuestro Asistente IA',
        ctaAISubtext: 'Obtén tu cotización en 2 minutos — multilingüe, habilitado por voz',
        ctaCall: 'Agendar Llamada Estratégica',
        ctaCallSubtext: 'Hoja de ruta garantizada en 30 min'
      },
      features: {
        title: 'Por Qué los Clientes Eligen EpicForgeSoftware',
        aiAssistants: {
          title: 'Asistentes IA que Reservan Llamadas',
          description: 'Entrenados en tu propuesta, en vivo en 4 idiomas — trabajando 24/7 para calificar y convertir leads.'
        },
        customSoftware: {
          title: 'Soluciones de Software Personalizadas',
          description: 'CRMs, portales, apps móviles/web, dashboards — construidos exactamente para tu flujo de trabajo.'
        },
        forgeOrion: {
          title: 'Plataforma ForgeOrion',
          description: 'Nuestro producto de automatización. Construye flujos, asigna reglas, ve operaciones en vivo — sin código.'
        },
        guarantee: {
          title: 'Garantizamos Resultados',
          description: 'Cada construcción reduce trabajo manual, aumenta conversiones y genera ROI medible.'
        }
      },
      about: {
        title: 'Construido por Fundadores. Impulsado por Visión. Diseñado para Escalar.',
        description: 'EpicForgeSoftware construye sistemas SaaS e IA personalizados diseñados, entregados y escalados directamente por sus fundadores.',
        whyChoose: 'Por Qué los Clientes Nos Eligen',
        reasons: [
          'Sin inflación de proyectos. Solo ejecución clara.',
          'Habla con ingenieros, no con vendedores.',
          'Sistemas construidos para crecer contigo — no para fallar bajo presión.',
          'Sabrás lo que obtienes antes de pagar.'
        ],
        companyDescription: 'Somos una empresa de IA y software que prioriza resultados — no una tienda de desarrollo con palabras de moda.'
      },
      team: {
        title: 'Equipo de Liderazgo',
        subtitle: 'Conoce a los fundadores que construyen, entregan y escalan cada solución',
        ceo: {
          name: 'Aditya Vardhan Nagamalli',
          title: 'Director Ejecutivo',
          description: 'Lidera estrategia, visión de producto, crecimiento de clientes y GTM. Fundador de ForgeOrion.'
        },
        cto: {
          name: 'Avinash Kumar Nagumalli',
          title: 'Director de Tecnología',
          description: 'Posee desarrollo full-stack, arquitectura técnica y escalabilidad del sistema.'
        },
        coo: {
          name: 'Harsha Vardhan Nagamalli',
          title: 'Director de Operaciones',
          description: 'Supervisa operaciones, finanzas, pipelines de entrega y ejecución de proyectos.'
        }
      },
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        phone: 'Número de Teléfono',
        company: 'Nombre de la Empresa',
        businessType: 'Tipo de Negocio',
        budget: 'Presupuesto del Proyecto',
        problem: '¿Qué problema podemos resolver para ti?',
        submit: 'Obtener Mi Solución Personalizada',
        submitting: 'Enviando...',
        success: '¡Gracias! Nos pondremos en contacto en 24 horas.',
        error: 'Algo salió mal. Por favor, inténtalo de nuevo.'
      },
      chat: {
        greeting: '¡Hola! Soy tu asistente de IA. Puedo ayudarte a obtener una cotización para tu proyecto. ¿Te gustaría hablar o escribir?',
        askName: '¡Genial! Empecemos. ¿Cuál es tu nombre?',
        askEmail: '¡Mucho gusto, {{name}}! ¿Cuál es tu dirección de correo electrónico?',
        askBudget: '¿Cuál es tu rango de presupuesto para este proyecto?',
        askProject: '¿Qué tipo de proyecto estás buscando?',
        askTimeline: '¿Cuándo te gustaría comenzar?',
        qualified: '¡Perfecto! Basado en tus necesidades, me gustaría conectarte con nuestro equipo. Permíteme programar una llamada estratégica.',
        calendlyTrigger: 'Abriendo calendario...'
      },
      footer: {
        contact: 'Contacto: info@epicforgesoftware.com',
        rights: 'Todos los Derechos Reservados por EpicForgeSoftware • © 2025',
        privacy: 'Política de Privacidad',
        terms: 'Términos de Servicio'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        contact: 'Contact'
      },
      hero: {
        headline: 'Nous Construisons des Systèmes IA et des Logiciels Personnalisés qui Automatisent votre Flux de Travail, Augmentent les Revenus et Génèrent des Prospects Qualifiés',
        subheadline: 'Sans embaucher.',
        description: 'Outils sur mesure et agents intelligents qui vous apportent plus d\'appels, concluent plus d\'affaires et remplacent le travail répétitif.',
        subtitle: 'Conçu pour les fondateurs, les équipes en croissance rapide et les entreprises modernes.',
        proudCreators: 'Fiers créateurs de ForgeOrion.com — notre plateforme de flux de travail intelligente.',
        ctaAI: 'Parlez à Notre Assistant IA',
        ctaAISubtext: 'Obtenez votre devis en 2 minutes — multilingue, activé par la voix',
        ctaCall: 'Planifier Appel Stratégique',
        ctaCallSubtext: 'Feuille de route garantie en 30 min'
      },
      features: {
        title: 'Pourquoi les Clients Choisissent EpicForgeSoftware',
        aiAssistants: {
          title: 'Assistants IA qui Réservent des Appels',
          description: 'Formés sur votre pitch, en direct dans 4 langues — travaillant 24h/24 pour qualifier et convertir les prospects.'
        },
        customSoftware: {
          title: 'Solutions Logicielles Personnalisées',
          description: 'CRM, portails, applications mobiles/web, tableaux de bord — construits exactement selon votre flux de travail.'
        },
        forgeOrion: {
          title: 'Plateforme ForgeOrion',
          description: 'Notre produit d\'automatisation. Construisez des flux, assignez des règles, voyez les opérations en direct — sans code.'
        },
        guarantee: {
          title: 'Nous Garantissons les Résultats',
          description: 'Chaque construction réduit le travail manuel, augmente les conversions et génère un ROI mesurable.'
        }
      },
      about: {
        title: 'Construit par des Fondateurs. Alimenté par la Vision. Conçu pour l\'Échelle.',
        description: 'EpicForgeSoftware construit des systèmes SaaS et IA personnalisés conçus, livrés et mis à l\'échelle directement par ses fondateurs.',
        whyChoose: 'Pourquoi les Clients Nous Choisissent',
        reasons: [
          'Pas de gonflement de projet. Juste une exécution claire.',
          'Parlez aux ingénieurs, pas aux vendeurs.',
          'Systèmes construits pour grandir avec vous — pas pour s\'effondrer sous la pression.',
          'Vous saurez ce que vous obtenez avant de payer.'
        ],
        companyDescription: 'Nous sommes une entreprise d\'IA et de logiciels axée sur les résultats — pas un atelier de développement avec des mots à la mode.'
      },
      team: {
        title: 'Équipe de Direction',
        subtitle: 'Rencontrez les fondateurs qui construisent, livrent et mettent à l\'échelle chaque solution',
        ceo: {
          name: 'Aditya Vardhan Nagamalli',
          title: 'Directeur Général',
          description: 'Dirige la stratégie, la vision produit, la croissance client et le GTM. Fondateur de ForgeOrion.'
        },
        cto: {
          name: 'Avinash Kumar Nagumalli',
          title: 'Directeur Technique',
          description: 'Possède le développement full-stack, l\'architecture technique et la scalabilité du système.'
        },
        coo: {
          name: 'Harsha Vardhan Nagamalli',
          title: 'Directeur des Opérations',
          description: 'Supervise les opérations, les finances, les pipelines de livraison et l\'exécution des projets.'
        }
      },
      form: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        phone: 'Numéro de Téléphone',
        company: 'Nom de l\'Entreprise',
        businessType: 'Type d\'Entreprise',
        budget: 'Budget du Projet',
        problem: 'Quel problème pouvons-nous résoudre pour vous ?',
        submit: 'Obtenir Ma Solution Personnalisée',
        submitting: 'Envoi en cours...',
        success: 'Merci ! Nous vous contacterons dans les 24 heures.',
        error: 'Quelque chose s\'est mal passé. Veuillez réessayer.'
      },
      chat: {
        greeting: 'Salut ! Je suis votre assistant IA. Je peux vous aider à obtenir un devis pour votre projet. Souhaitez-vous parler ou taper ?',
        askName: 'Parfait ! Commençons. Quel est votre nom ?',
        askEmail: 'Ravi de vous rencontrer, {{name}} ! Quelle est votre adresse email ?',
        askBudget: 'Quelle est votre fourchette budgétaire pour ce projet ?',
        askProject: 'Quel type de projet recherchez-vous ?',
        askTimeline: 'Quand aimeriez-vous commencer ?',
        qualified: 'Parfait ! Basé sur vos besoins, j\'aimerais vous connecter avec notre équipe. Permettez-moi de programmer un appel stratégique.',
        calendlyTrigger: 'Ouverture du calendrier...'
      },
      footer: {
        contact: 'Contact : info@epicforgesoftware.com',
        rights: 'Tous Droits Réservés par EpicForgeSoftware • © 2025',
        privacy: 'Politique de Confidentialité',
        terms: 'Conditions de Service'
      }
    }
  },
  ko: {
    translation: {
      nav: {
        home: '홈',
        about: '회사소개',
        services: '서비스',
        contact: '연락처'
      },
      hero: {
        headline: '워크플로우를 자동화하고, 수익을 증대시키며, 자격을 갖춘 리드를 생성하는 AI 시스템과 맞춤형 소프트웨어를 구축합니다',
        subheadline: '채용 없이.',
        description: '더 많은 통화를 가져오고, 더 많은 거래를 성사시키며, 반복적인 작업을 대체하는 맞춤형 도구와 지능형 에이전트.',
        subtitle: '창업자, 빠르게 성장하는 팀 및 현대 기업을 위해 구축되었습니다.',
        proudCreators: 'ForgeOrion.com의 자랑스러운 창조자 — 우리의 지능형 워크플로우 플랫폼.',
        ctaAI: 'AI 어시스턴트와 대화하기',
        ctaAISubtext: '2분 안에 견적 받기 — 다국어, 음성 지원',
        ctaCall: '전략 통화 예약',
        ctaCallSubtext: '30분 안에 보장된 리드 로드맵'
      },
      features: {
        title: '고객이 EpicForgeSoftware를 선택하는 이유',
        aiAssistants: {
          title: '통화를 예약하는 AI 어시스턴트',
          description: '당신의 피치로 훈련되어, 4개 언어로 라이브 — 24시간 연중무휴로 리드를 자격화하고 전환합니다.'
        },
        customSoftware: {
          title: '맞춤형 소프트웨어 솔루션',
          description: 'CRM, 포털, 모바일/웹 앱, 대시보드 — 정확히 당신의 워크플로우에 맞게 구축.'
        },
        forgeOrion: {
          title: 'ForgeOrion 플랫폼',
          description: '우리의 자동화 제품. 플로우 구축, 규칙 할당, 라이브 운영 확인 — 코드 불필요.'
        },
        guarantee: {
          title: '결과를 보장합니다',
          description: '모든 구축은 수동 작업을 줄이고, 전환을 증가시키며, 측정 가능한 ROI를 생성합니다.'
        }
      },
      about: {
        title: '창업자에 의해 구축됨. 비전으로 추진됨. 확장을 위해 설계됨.',
        description: 'EpicForgeSoftware는 창업자가 직접 설계, 제공 및 확장하는 맞춤형 SaaS 및 AI 시스템을 구축합니다.',
        whyChoose: '고객이 우리를 선택하는 이유',
        reasons: [
          '프로젝트 부풀리기 없음. 명확한 실행만.',
          '영업사원이 아닌 엔지니어와 대화.',
          '당신과 함께 성장하도록 구축된 시스템 — 압박 하에서 무너지지 않음.',
          '지불하기 전에 무엇을 얻을지 알 수 있습니다.'
        ],
        companyDescription: '우리는 결과 우선의 AI 및 소프트웨어 회사입니다 — 유행어를 사용하는 개발 상점이 아닙니다.'
      },
      team: {
        title: '리더십 팀',
        subtitle: '모든 솔루션을 구축, 제공 및 확장하는 창립자들을 만나보세요',
        ceo: {
          name: 'Aditya Vardhan Nagamalli',
          title: '최고경영자',
          description: '전략, 제품 비전, 고객 성장 및 GTM을 이끕니다. ForgeOrion의 창립자.'
        },
        cto: {
          name: 'Avinash Kumar Nagumalli',
          title: '최고기술책임자',
          description: '풀스택 개발, 기술 아키텍처 및 시스템 확장성을 담당합니다.'
        },
        coo: {
          name: 'Harsha Vardhan Nagamalli',
          title: '최고운영책임자',
          description: '운영, 재무, 배송 파이프라인 및 프로젝트 실행을 감독합니다.'
        }
      },
      form: {
        name: '성명',
        email: '이메일 주소',
        phone: '전화번호',
        company: '회사명',
        businessType: '비즈니스 유형',
        budget: '프로젝트 예산',
        problem: '어떤 문제를 해결해 드릴까요?',
        submit: '맞춤형 솔루션 받기',
        submitting: '제출 중...',
        success: '감사합니다! 24시간 내에 연락드리겠습니다.',
        error: '문제가 발생했습니다. 다시 시도해 주세요.'
      },
      chat: {
        greeting: '안녕하세요! 저는 AI 어시스턴트입니다. 프로젝트 견적을 도와드릴 수 있습니다. 음성으로 말씀하시겠습니까, 아니면 타이핑하시겠습니까?',
        askName: '좋습니다! 시작해보겠습니다. 성함이 어떻게 되시나요?',
        askEmail: '만나서 반갑습니다, {{name}}님! 이메일 주소를 알려주세요.',
        askBudget: '이 프로젝트의 예산 범위는 어떻게 되시나요?',
        askProject: '어떤 유형의 프로젝트를 찾고 계신가요?',
        askTimeline: '언제 시작하고 싶으신가요?',
        qualified: '완벽합니다! 귀하의 요구사항을 바탕으로 저희 팀과 연결해드리고 싶습니다. 전략 통화를 예약해드리겠습니다.',
        calendlyTrigger: '캘린더 열기...'
      },
      footer: {
        contact: '연락처: info@epicforgesoftware.com',
        rights: 'EpicForgeSoftware의 모든 권리 보유 • © 2025',
        privacy: '개인정보처리방침',
        terms: '서비스 약관'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;