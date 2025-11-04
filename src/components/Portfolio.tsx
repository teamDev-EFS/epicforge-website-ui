import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Award, ChevronLeft, ChevronRight } from "lucide-react";
import ForgeOrionImage from "../assets/images/forgeorion.png";
import NamasteEximImage from "../assets/images/NamasteEximVentures.png";
import The11EximImage from "../assets/images/The11EximOverseas.png";
import TrustGlobeImage from "../assets/images/TrustGlobeExports.png";
import CareNestImage from "../assets/images/CareNest.png";
import VysyarajuJewellersImage from "../assets/images/Vysyarajujewellers.png";
import SunAutoFlowImage from "../assets/images/Sunautoflow.png";
import InnovateAIImage from "../assets/images/InnovateAI.png";
const SafetyPlusImage = new URL(
  "../assets/images/SafetyPlus Protection SaaS with Admin Portal.png",
  import.meta.url
).href;

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  liveUrl?: string;
  featured: boolean;
  gradient: string;
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const projects: Project[] = [
    {
      id: "0",
      title: "Safety Plus Co Protection",
      subtitle: "Protection Website + Admin Control Panel",
      description:
        "Dynamic marketing website backed by a complete admin control panel for content and lead management. Built for performance, SEO, and ease of operations.",
      image: SafetyPlusImage,
      category: "SaaS Platform",
      tags: ["SaaS", "Admin Portal", "CMS", "Dynamic"],
      liveUrl: "https://safetyplus.co.in",
      featured: true,
      gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    },
    {
      id: "1",
      title: "ForgeOrion",
      subtitle: "AI-Powered Workflow Automation Platform",
      description:
        "Enterprise-grade workflow automation platform powering operations across India & Korea. Built with AI-driven decisioning, real-time analytics, and multi-tenant architecture.",
      image: ForgeOrionImage,
      category: "SaaS Platform",
      tags: ["AI/ML", "Automation", "Enterprise", "Real-time"],
      liveUrl: "https://forgeorion.com",
      featured: true,
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
    },
    {
      id: "2",
      title: "NamasteExim",
      subtitle: "Export Import Business Platform",
      description:
        "Comprehensive export-import business platform with inventory management, order tracking, and international trade documentation. Streamlining global commerce operations.",
      image: NamasteEximImage,
      category: "E-Commerce",
      tags: ["Export/Import", "E-Commerce", "Inventory", "Global Trade"],
      liveUrl: "https://namasteeximventures.com",
      featured: true,
      gradient: "from-green-600 via-emerald-500 to-teal-500",
    },
    {
      id: "3",
      title: "The11EximOverseas",
      subtitle: "International Trade Management System",
      description:
        "Advanced export-import management platform with real-time tracking, customs integration, and multi-currency support. Facilitating seamless international trade operations.",
      image: The11EximImage,
      category: "E-Commerce",
      tags: ["International Trade", "Customs", "Multi-Currency", "Tracking"],
      liveUrl: "https://the11eximoverseas.com",
      featured: true,
      gradient: "from-purple-600 via-violet-500 to-indigo-500",
    },
    {
      id: "4",
      title: "VysyarajuJewellers-Connect",
      subtitle: "Jewellery Employee Management CRM & HRM",
      description:
        "Comprehensive CRM and HRM solution for VysyaRaju Jewellers. Features employee management, customer relationship tracking, inventory management, and sales analytics.",
      image: VysyarajuJewellersImage,
      category: "Custom Software",
      tags: ["CRM", "HRM", "Jewellery", "Analytics"],
      liveUrl: "https://www.vysyarajujewellers.com/",
      featured: false,
      gradient: "from-orange-600 via-amber-500 to-yellow-500",
    },
    {
      id: "5",
      title: "SunAutoFlow AI",
      subtitle: "AI-Powered Automation & Integration Platform",
      description:
        "Intelligent automation platform for business processes and system integrations. Features AI-driven workflow optimization, API management, and real-time monitoring.",
      image: SunAutoFlowImage,
      category: "AI Solution",
      tags: ["AI Automation", "Integration", "Workflow", "API Management"],
      liveUrl: "https://sunautoflow.com/",
      featured: false,
      gradient: "from-pink-600 via-rose-500 to-red-500",
    },
    {
      id: "6",
      title: "TrustGlobeExports",
      subtitle: "Global Export Management System",
      description:
        "Comprehensive export management platform with document automation, compliance tracking, and international shipping integration. Streamlining global export operations.",
      image: TrustGlobeImage,
      category: "E-Commerce",
      tags: ["Export Management", "Compliance", "Documentation", "Shipping"],
      liveUrl: "https://www.trustglobeexports.com/",
      featured: false,
      gradient: "from-slate-600 via-gray-500 to-zinc-500",
    },
    {
      id: "7",
      title: "CareNestGlobal",
      subtitle: "Multi-Vendor Marketplace Platform",
      description:
        "The world's most sophisticated multi-vendor marketplace where premium brands meet discerning customers. Features zero commission for 30 days, bank-grade security, and 24/7 premium support.",
      image: CareNestImage,
      category: "Marketplace",
      tags: ["Multi-Vendor", "E-Commerce", "Premium Brands", "Security"],
      liveUrl: "https://carenest.com",
      featured: true,
      gradient: "from-indigo-600 via-blue-500 to-cyan-500",
    },
    {
      id: "8",
      title: "InnovateAITechnologies",
      subtitle: "AI & Blockchain Technology Solutions",
      description:
        "Cutting-edge AI and blockchain technology platform delivering innovative solutions for enterprise clients. Features advanced machine learning algorithms, smart contracts, and decentralized applications.",
      image: InnovateAIImage,
      category: "AI Solution",
      tags: ["AI/ML", "Blockchain", "Smart Contracts", "Enterprise"],
      liveUrl: "https://innovateaitechnologies.com/",
      featured: true,
      gradient: "from-violet-600 via-purple-500 to-pink-500",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="portfolio"
      className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Award className="w-4 h-4" />
            <span>Live Projects & Case Studies</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Powering Industry Leaders
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mt-2">
              Across the Globe
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From AI-powered automation to enterprise-grade custom software—our
            solutions drive measurable results for forward-thinking companies.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                  <img
                    src={projects[currentIndex].image}
                    alt={projects[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-xs font-semibold">
                          {projects[currentIndex].category}
                        </span>
                        {projects[currentIndex].featured && (
                          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>Featured</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {projects[currentIndex].title}
                      </h3>
                      <p className="text-lg md:text-xl text-blue-200 font-semibold mb-4">
                        {projects[currentIndex].subtitle}
                      </p>
                      <p className="text-white/90 mb-6 text-base md:text-lg leading-relaxed">
                        {projects[currentIndex].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[currentIndex].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {projects[currentIndex].liveUrl && (
                        <a
                          href={projects[currentIndex].liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r ${projects[currentIndex].gradient} text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                        >
                          <span>View Live Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
