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
