import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Book,
  Video,
} from "lucide-react";

const HelpPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Book,
      faqs: [
        {
          question: "How do I get started with EpicForge Software?",
          answer:
            "Simply book a free consultation call or request an AI audit through our website. Our team will analyze your needs and create a custom solution proposal within 24 hours.",
        },
        {
          question: "What information do I need to provide for a quote?",
          answer:
            "We need basic information about your business, project goals, timeline, and budget range. Our AI chatbot can guide you through the process interactively.",
        },
      ],
    },
    {
      category: "AI SEO Services",
      icon: Search,
      faqs: [
        {
          question: "What is LLM SEO and how does it work?",
          answer:
            "LLM SEO optimizes your content for Large Language Models like ChatGPT, Perplexity, and Google AI Overview. We use structured data, conversational Q&A formatting, and schema markup to ensure AI systems cite your brand as an authority.",
        },
        {
          question: "How long does it take to see results from AI SEO?",
          answer:
            "Most clients see initial improvements in 2-3 months, with significant traffic growth (200-350%) within 6 months. Results vary based on industry competitiveness and current website state.",
        },
        {
          question: "Do you optimize for voice search?",
          answer:
            "Yes! Our AI SEO includes voice search optimization for platforms like Alexa, Google Assistant, and Siri. We structure content to answer natural language queries effectively.",
        },
      ],
    },
    {
      category: "Development & Automation",
      icon: MessageCircle,
      faqs: [
        {
          question: "What technologies do you use for website development?",
          answer:
            "We use modern technologies including React, Next.js, TypeScript, Node.js, Python, and cloud platforms like AWS and Supabase. Our tech stack is customized based on project requirements.",
        },
        {
          question: "Can you integrate AI chatbots into existing websites?",
          answer:
            "Absolutely! Our AI chatbots with voice assistant capabilities can be integrated into any website platform including WordPress, Shopify, custom applications, and more.",
        },
        {
          question: "What kind of automation can you build?",
          answer:
            "We build workflow automation, data processing pipelines, AI-powered decision systems, quotation generators, CRM integrations, email automation, and custom business logic automation.",
        },
      ],
    },
    {
      category: "Pricing & Plans",
      icon: HelpCircle,
      faqs: [
        {
          question: "How much do your services cost?",
          answer:
            "Pricing varies based on project scope. Website development starts at $5,000, AI SEO packages start at $2,000/month, and enterprise automation projects are quoted custom. Contact us for a detailed proposal.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes, we offer flexible payment plans including milestone-based payments for projects and monthly subscriptions for ongoing services like AI SEO and maintenance.",
        },
      ],
    },
  ];

  const allFaqs = faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 mb-6">
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Find answers to common questions or chat with our AI assistant for
            instant help
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-gradient-to-br from-teal-600/20 to-cyan-600/20 backdrop-blur-sm p-6 rounded-xl border border-teal-500/20 hover:border-teal-500/50 transition-all cursor-pointer">
            <MessageCircle className="w-12 h-12 text-teal-400 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">
              Chat with AI Assistant
            </h3>
            <p className="text-gray-400 text-sm">
              Get instant answers to your questions
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition-all cursor-pointer">
            <Book className="w-12 h-12 text-indigo-400 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">
              Browse Documentation
            </h3>
            <p className="text-gray-400 text-sm">
              Explore our comprehensive guides
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20 hover:border-pink-500/50 transition-all cursor-pointer">
            <Video className="w-12 h-12 text-pink-400 mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">
              Watch Tutorials
            </h3>
            <p className="text-gray-400 text-sm">
              Learn from video walkthroughs
            </p>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <category.icon className="w-8 h-8 text-teal-400" />
                <h2 className="text-3xl font-bold text-white">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = catIndex * 100 + faqIndex;
                  const isExpanded = expandedFaq === globalIndex;

                  return (
                    <motion.div
                      key={faqIndex}
                      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-teal-500/30 transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(isExpanded ? null : globalIndex)
                        }
                        className="w-full flex items-center justify-between p-6 text-left"
                      >
                        <span className="text-white font-semibold text-lg pr-4">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-teal-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center bg-gradient-to-r from-teal-600/10 to-indigo-600/10 backdrop-blur-sm p-12 rounded-2xl border border-teal-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Our team is here to help. Get in touch for personalized support.
          </p>
          <button className="bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
