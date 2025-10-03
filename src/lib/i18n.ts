import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        features: 'Features',
        process: 'Process',
        clients: 'Clients',
        contact: 'Contact'
      },
      hero: {
        headline: 'Website, AI SEO & Automation — All Working Together to Grow Your Brand',
        subheadline: 'We design futuristic, conversion-first websites + AI systems that deliver more traffic, higher conversions, and measurable growth — on Google, ChatGPT and everywhere your customers search.',
        primaryCTA: 'Get a Free AI Audit',
        secondaryCTA: 'Book a Demo',
        whatsappCTA: 'WhatsApp',
        supportingText: 'Fast builds • LLM SEO • Voice search • Multilingual chat • Quote automation'
      },
      features: {
        title: 'What We Build',
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
          cta: 'Request Quote'
        },
        aiSEO: {
          title: 'AI SEO & LLM Optimization',
          description: 'Rank on Google, ChatGPT, and voice search platforms',
          cta: 'Free Site Audit'
        },
        voiceSearch: {
          title: 'Voice Search + Chatbot',
          description: 'Let customers speak to your site in any language',
          cta: 'Live Demo'
        },
        automation: {
          title: 'Automation & WhatsApp Quoting',
          description: 'Smart forms that generate and send quotes instantly',
          cta: 'Integrate Now'
        }
      },
      testimonials: {
        title: 'What Our Clients Say',
        rating: '4.8 out of 5',
        reviewCount: '38+ Reviews',
        viewGoogle: 'View All Google Reviews'
      },
      form: {
        title: 'Request Your Free AI Audit',
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
      footer: {
        quickActions: 'Quick Actions',
        freeAudit: 'Request Free Audit',
        bookDemo: 'Book a Demo',
        subscribe: 'Subscribe for AI SEO Tips',
        contact: 'Contact: info@epicforgesoftware.com',
        rights: 'All Rights Reserved by EpicForgeSoftware • © 2025',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
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
