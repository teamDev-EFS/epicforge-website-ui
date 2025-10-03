import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        features: 'Features',
        process: 'Our Process',
        clients: 'Case Studies',
        services: 'Services',
        portfolio: 'Portfolio',
        team: 'Team',
        about: 'About',
        blog: 'Blog',
        contact: 'Contact',
        help: 'Help',
        getStarted: 'Get Free Audit'
      },
      hero: {
        badge: 'AI-Powered Growth Engine',
        headline: 'Website, AI SEO & Automation — All Working Together to Grow Your Brand',
        subheadline: 'We design futuristic, conversion-first websites + AI systems that deliver more traffic, higher conversions, and measurable growth — on Google, ChatGPT and everywhere your customers search.',
        ctaAI: 'Get a Free AI Audit',
        ctaCall: 'Book a Demo (WhatsApp)',
        primaryCTA: 'Get a Free AI Audit',
        secondaryCTA: 'Book a Demo',
        whatsappCTA: 'WhatsApp',
        supportingText: 'Fast builds • LLM SEO • Voice search • Multilingual chat • Quote automation',
        cyclingWords: ['Traffic.', 'Leads.', 'Rankings.', 'Growth.']
      },
      features: {
        title: 'What We Build',
        subtitle: 'Six core services that transform your digital presence',
        aiAssistants: {
          title: 'AI Assistants & Chatbots',
          description: 'Intelligent conversational AI that engages visitors, qualifies leads, and provides 24/7 customer support with voice and text capabilities.',
          cta: 'Learn More'
        },
        customSoftware: {
          title: 'Custom Software Development',
          description: 'Tailored enterprise solutions built with cutting-edge technologies to automate workflows and scale your operations efficiently.',
          cta: 'Learn More'
        },
        forgeOrion: {
          title: 'ForgeOrion AI Platform',
          description: 'Our proprietary AI-powered platform that combines SEO optimization, content generation, and predictive analytics for exponential growth.',
          cta: 'Learn More'
        },
        guarantee: {
          title: 'Results Guarantee',
          description: 'We stand behind our work with measurable KPIs and guaranteed results. If we don\'t deliver, you don\'t pay — simple as that.',
          cta: 'Learn More'
        },
        aiSEO: {
          title: 'AI SEO & LLM Rankings',
          description: 'We optimize for Google\'s AI insights and ChatGPT-style results so your brand shows up where modern searchers ask questions.',
          cta: 'See Use Case'
        },
        design: {
          title: 'Futuristic UX & Conversion Design',
          description: 'CTA-driven pages, micro-interactions, and modular layouts that convert visitors into leads.',
          cta: 'View Designs'
        },
        voice: {
          title: 'Voice & Multilingual Search',
          description: 'Natural voice search in multiple languages — let prospects speak to your site and get instant answers.',
          cta: 'Try Demo'
        },
        chatbot: {
          title: 'AI Chatbot + Voice Assistant',
          description: 'Contextual chatbot that answers queries, qualifies leads, and books projects — with voice input and output.',
          cta: 'Live Demo'
        },
        automation: {
          title: 'Automated Quotation & Project Booking',
          description: 'Intelligent forms generate quotes and send them via WhatsApp and email automatically.',
          cta: 'See How'
        },
        analytics: {
          title: 'Analytics & Growth Engine',
          description: 'Full funnel tracking, A/B experiments, and automated workflows to compress time-to-value.',
          cta: 'Learn More'
        }
      },
      stats: {
        title: 'Real Results from Real Clients',
        subtitle: 'Proven with LLM SEO and modern UX',
        traffic: 'Organic Traffic Growth',
        articles: 'Blog Articles Published',
        speed: 'Mobile Speed Score',
        indexed: 'Pages in Google AI Insights',
        clients: 'Clients',
        delivered: 'Projects Delivered',
        active: 'Active Projects'
      },
      process: {
        title: 'Our 5-Step Digital Revival Strategy',
        subtitle: 'A proven framework that transforms your online presence',
        step1: {
          title: 'Redesign & Speed Optimization',
          description: 'Fast, modular frontends, critical CSS, lazy load assets, CDN, and image optimization.',
          percent: '20%'
        },
        step2: {
          title: 'On-Page SEO & Keyword Targeting',
          description: 'Semantic content, structured data, schema for LLM consumption, intent mapping.',
          percent: '25%'
        },
        step3: {
          title: 'Blogging & Content Marketing',
          description: 'Conversational long-form, FAQ hubs, and long-tail LLM focused articles.',
          percent: '20%'
        },
        step4: {
          title: 'Advanced Technical & Local SEO',
          description: 'Core Web Vitals, hreflang, local schema, Maps & review integration.',
          percent: '15%'
        },
        step5: {
          title: 'AI Chatbot, Quiz & Smart Forms',
          description: 'Lead qualification, voice search, automated quotes + WhatsApp messaging flows.',
          percent: '20%'
        }
      },
      clients: {
        title: 'Client Success Stories',
        subtitle: 'Real transformations from real businesses',
        viewAll: 'View All Case Studies'
      },
      services: {
        title: 'Productized Services',
        subtitle: 'Choose what fits your growth stage',
        websiteDesign: {
          title: 'Website Design & Development',
          description: 'Conversion-first, fast, and optimized for modern search',
          features: ['Custom Design', 'Mobile Responsive', 'Speed Optimized', 'SEO Ready'],
          cta: 'Request Quote'
        },
        aiSEO: {
          title: 'AI SEO & LLM Optimization',
          description: 'Rank on Google, ChatGPT, and voice search platforms',
          features: ['LLM Optimization', 'Schema Markup', 'Content Strategy', 'Technical SEO'],
          cta: 'Free Site Audit'
        },
        voiceSearch: {
          title: 'Voice Search + Chatbot',
          description: 'Let customers speak to your site in any language',
          features: ['Voice Recognition', 'Multi-language', 'AI Responses', 'Lead Capture'],
          cta: 'Live Demo'
        },
        automation: {
          title: 'Automation & WhatsApp Quoting',
          description: 'Smart forms that generate and send quotes instantly',
          features: ['Auto Quotation', 'WhatsApp Integration', 'Email Automation', 'CRM Sync'],
          cta: 'Integrate Now'
        }
      },
      team: {
        title: 'Meet Our Elite Team',
        subtitle: 'World-class experts driving your digital transformation',
        viewProfile: 'View Profile',
        ceo: {
          name: 'ADITYA VARDHAN NAGAMALLI',
          title: 'CEO | FOUNDER',
          description: 'Visionary leader with 10+ years in AI and enterprise solutions'
        },
        cto: {
          name: 'AVINASH KUMAR NAGUMALLI',
          title: 'CTO | CO-FOUNDER',
          description: 'Technology architect specializing in scalable AI systems'
        },
        coo: {
          name: 'HARSHA VARDHAN NAGAMALLI',
          title: 'COO | CO-FOUNDER',
          description: 'Operations expert driving global expansion and client success'
        }
      },
      about: {
        title: 'About EpicForge Software',
        subtitle: 'Forging the Future of Innovation',
        mission: 'Our Mission',
        missionText: 'To empower businesses worldwide with AI-driven solutions that automate workflows, amplify growth, and deliver measurable ROI.',
        vision: 'Our Vision',
        visionText: 'To be the global #1 authority in AI-powered IT services, recognized for futuristic innovation and client success.',
        values: 'Our Values',
        innovation: 'Innovation First',
        innovationText: 'Pushing boundaries with cutting-edge AI and automation',
        results: 'Results Driven',
        resultsText: 'Every project measured by real business outcomes',
        partnership: 'True Partnership',
        partnershipText: 'Your success is our success — we grow together'
      },
      testimonials: {
        title: 'What Our Clients Say',
        rating: '4.8 out of 5',
        reviewCount: '38+ Reviews',
        viewGoogle: 'View All Google Reviews'
      },
      form: {
        title: 'Request Your Free AI Audit',
        subtitle: 'Get a comprehensive analysis of your current digital presence and discover opportunities for AI-powered growth',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        company: 'Company Name',
        website: 'Current Website URL',
        goals: 'Your Growth Goals',
        submit: 'Get My Free Audit',
        submitting: 'Submitting...',
        success: 'Thank you! We\'ll send your audit within 24 hours.',
        error: 'Something went wrong. Please try again.'
      },
      chat: {
        title: 'AI Assistant',
        subtitle: 'Ask me anything about our services',
        placeholder: 'Type your message or speak...',
        send: 'Send',
        greeting: 'Hello! I\'m your AI assistant. How can I help you today?',
        voiceButton: 'Voice Input',
        listeninghelp: 'Listening...',
        needHelp: 'Need Help? Click here!'
      },
      footer: {
        tagline: 'Forging the Future of Innovation',
        quickActions: 'Quick Actions',
        freeAudit: 'Request Free Audit',
        bookDemo: 'Book a Demo',
        subscribe: 'Subscribe for AI SEO Tips',
        navigation: 'Navigation',
        company: 'Company',
        legal: 'Legal',
        contact: 'Contact Us',
        email: 'info@epicforgesoftware.com',
        phone: '+1 (555) 123-4567',
        address: 'Global HQ: San Francisco, CA',
        rights: 'All Rights Reserved by EpicForgeSoftware',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        socials: 'Follow Us'
      },
      cta: {
        floating: {
          whatsapp: 'Chat with our AI — Get a Quick Quote',
          audit: 'Get Free Audit'
        }
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        features: 'Características',
        portfolio: 'Portafolio',
        about: 'Acerca de',
        blog: 'Blog',
        contact: 'Contacto',
        help: 'Ayuda',
        getStarted: 'Auditoría Gratis'
      },
      hero: {
        ctaAI: 'Obtener Auditoría AI Gratis',
        ctaCall: 'Reservar Demo (WhatsApp)'
      },
      features: {
        title: 'Lo Que Construimos',
        aiAssistants: {
          title: 'Asistentes AI y Chatbots',
          description: 'IA conversacional inteligente que involucra a los visitantes, califica leads y proporciona soporte 24/7.',
          cta: 'Aprende Más'
        },
        customSoftware: {
          title: 'Desarrollo de Software Personalizado',
          description: 'Soluciones empresariales personalizadas con tecnologías de vanguardia.',
          cta: 'Aprende Más'
        },
        forgeOrion: {
          title: 'Plataforma ForgeOrion AI',
          description: 'Nuestra plataforma propietaria que combina SEO, generación de contenido y analítica predictiva.',
          cta: 'Aprende Más'
        },
        guarantee: {
          title: 'Garantía de Resultados',
          description: 'Respaldamos nuestro trabajo con KPIs medibles y resultados garantizados.',
          cta: 'Aprende Más'
        }
      },
      chat: {
        title: 'Asistente AI',
        subtitle: 'Pregúntame sobre nuestros servicios',
        placeholder: 'Escribe o habla...',
        greeting: '¡Hola! Soy tu asistente AI. ¿Cómo puedo ayudarte?'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        features: 'Fonctionnalités',
        portfolio: 'Portfolio',
        about: 'À propos',
        blog: 'Blog',
        contact: 'Contact',
        help: 'Aide',
        getStarted: 'Audit Gratuit'
      },
      hero: {
        ctaAI: 'Obtenir Audit AI Gratuit',
        ctaCall: 'Réserver Démo (WhatsApp)'
      },
      features: {
        title: 'Ce Que Nous Construisons',
        aiAssistants: {
          title: 'Assistants IA et Chatbots',
          description: 'IA conversationnelle intelligente qui engage les visiteurs et qualifie les prospects 24/7.',
          cta: 'En Savoir Plus'
        },
        customSoftware: {
          title: 'Développement Logiciel Sur Mesure',
          description: 'Solutions d\'entreprise personnalisées avec des technologies de pointe.',
          cta: 'En Savoir Plus'
        },
        forgeOrion: {
          title: 'Plateforme ForgeOrion AI',
          description: 'Notre plateforme propriétaire combinant SEO, génération de contenu et analyses prédictives.',
          cta: 'En Savoir Plus'
        },
        guarantee: {
          title: 'Garantie de Résultats',
          description: 'Nous soutenons notre travail avec des KPI mesurables et des résultats garantis.',
          cta: 'En Savoir Plus'
        }
      },
      chat: {
        title: 'Assistant IA',
        subtitle: 'Posez-moi des questions sur nos services',
        placeholder: 'Tapez ou parlez...',
        greeting: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ?'
      }
    }
  },
  ja: {
    translation: {
      nav: {
        home: 'ホーム',
        features: '機能',
        portfolio: 'ポートフォリオ',
        about: '会社概要',
        blog: 'ブログ',
        contact: 'お問い合わせ',
        help: 'ヘルプ',
        getStarted: '無料監査'
      },
      hero: {
        ctaAI: '無料AI監査を取得',
        ctaCall: 'デモを予約 (WhatsApp)'
      },
      features: {
        title: '私たちが構築するもの',
        aiAssistants: {
          title: 'AIアシスタントとチャットボット',
          description: '訪問者と対話し、リードを評価し、24時間365日のサポートを提供するインテリジェントな会話型AI。',
          cta: '詳細を見る'
        },
        customSoftware: {
          title: 'カスタムソフトウェア開発',
          description: '最先端技術でワークフローを自動化するカスタマイズされたエンタープライズソリューション。',
          cta: '詳細を見る'
        },
        forgeOrion: {
          title: 'ForgeOrion AIプラットフォーム',
          description: 'SEO最適化、コンテンツ生成、予測分析を組み合わせた独自のAIプラットフォーム。',
          cta: '詳細を見る'
        },
        guarantee: {
          title: '結果保証',
          description: '測定可能なKPIと保証された結果で私たちの仕事を支援します。',
          cta: '詳細を見る'
        }
      },
      chat: {
        title: 'AIアシスタント',
        subtitle: 'サービスについて質問する',
        placeholder: '入力または話す...',
        greeting: 'こんにちは！AIアシスタントです。どのようにお手伝いできますか？'
      }
    }
  },
  ko: {
    translation: {
      nav: {
        home: '홈',
        features: '기능',
        portfolio: '포트폴리오',
        about: '회사 소개',
        blog: '블로그',
        contact: '연락처',
        help: '도움말',
        getStarted: '무료 감사'
      },
      hero: {
        ctaAI: '무료 AI 감사 받기',
        ctaCall: '데모 예약 (WhatsApp)'
      },
      features: {
        title: '우리가 만드는 것',
        aiAssistants: {
          title: 'AI 어시스턴트 및 챗봇',
          description: '방문자와 소통하고 리드를 평가하며 24/7 고객 지원을 제공하는 지능형 대화형 AI.',
          cta: '자세히 알아보기'
        },
        customSoftware: {
          title: '맞춤형 소프트웨어 개발',
          description: '최첨단 기술로 워크플로를 자동화하는 맞춤형 엔터프라이즈 솔루션.',
          cta: '자세히 알아보기'
        },
        forgeOrion: {
          title: 'ForgeOrion AI 플랫폼',
          description: 'SEO 최적화, 콘텐츠 생성 및 예측 분석을 결합한 독자적인 AI 플랫폼.',
          cta: '자세히 알아보기'
        },
        guarantee: {
          title: '결과 보장',
          description: '측정 가능한 KPI와 보장된 결과로 우리의 작업을 지원합니다.',
          cta: '자세히 알아보기'
        }
      },
      chat: {
        title: 'AI 어시스턴트',
        subtitle: '서비스에 대해 질문하세요',
        placeholder: '입력하거나 말하세요...',
        greeting: '안녕하세요! AI 어시스턴트입니다. 무엇을 도와드릴까요?'
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
