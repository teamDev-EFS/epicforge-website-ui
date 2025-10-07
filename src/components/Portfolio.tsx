import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Award, TrendingUp, Users, Zap } from "lucide-react";
import ForgeOrionImage from "../assets/images/forgeorion.png";
import NamasteEximImage from "../assets/images/NamasteEximVentures.png";
import The11EximImage from "../assets/images/The11EximOverseas.png";
import TrustGlobeImage from "../assets/images/TrustGlobeExports.png";
import CareNestImage from "../assets/images/CareNest.png";
import VysyarajuJewellersImage from "../assets/images/Vysyarajujewellers.png";
import SunAutoFlowImage from "../assets/images/Sunautoflow.png";
import InnovateAIImage from "../assets/images/InnovateAI.png";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
    icon: React.ElementType;
  }[];
  liveUrl?: string;
  featured: boolean;
  gradient: string;
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const projects: Project[] = [
    {
      id: "1",
      title: "ForgeOrion",
      subtitle: "AI-Powered Workflow Automation Platform",
      description:
        "Enterprise-grade workflow automation platform powering operations across India & Korea. Built with AI-driven decisioning, real-time analytics, and multi-tenant architecture.",
      image: ForgeOrionImage,
      category: "SaaS Platform",
      tags: ["AI/ML", "Automation", "Enterprise", "Real-time"],
      metrics: [
        { label: "Active Users", value: "10K+", icon: Users },
        { label: "Automation Rate", value: "85%", icon: Zap },
        { label: "ROI Increase", value: "240%", icon: TrendingUp },
      ],
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
      metrics: [
        { label: "Orders Processed", value: "5K+", icon: Users },
        { label: "Countries Served", value: "25+", icon: Award },
        { label: "Efficiency Gain", value: "65%", icon: Zap },
      ],
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
      metrics: [
        { label: "Trade Volume", value: "$2M+", icon: TrendingUp },
        { label: "Customs Clearance", value: "98%", icon: Award },
        { label: "Processing Time", value: "-70%", icon: Zap },
      ],
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
      metrics: [
        { label: "Employees Managed", value: "5000+", icon: Users },
        { label: "Customer Base", value: "50K+", icon: Award },
        { label: "Sales Growth", value: "+45%", icon: TrendingUp },
      ],
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
      metrics: [
        { label: "Processes Automated", value: "500+", icon: Zap },
        { label: "Integration APIs", value: "50+", icon: Award },
        { label: "Time Saved", value: "80%", icon: TrendingUp },
      ],
      liveUrl: "https://epicforgesoftware.com/contact",
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
      metrics: [
        { label: "Exports Processed", value: "1K+", icon: Users },
        { label: "Compliance Rate", value: "99%", icon: Award },
        { label: "Documentation Time", value: "-60%", icon: Zap },
      ],
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
      metrics: [
        { label: "Vendors", value: "500+", icon: Users },
        { label: "Products", value: "10K+", icon: Award },
        { label: "Security Score", value: "A+", icon: Zap },
      ],
      liveUrl: "https://epicforgesoftware.com/contact",
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
      metrics: [
        { label: "AI Models Deployed", value: "100+", icon: Zap },
        { label: "Blockchain Transactions", value: "1M+", icon: Award },
        { label: "Client Satisfaction", value: "98%", icon: TrendingUp },
      ],
      liveUrl: "https://epicforgesoftware.com/contact",
      featured: true,
      gradient: "from-violet-600 via-purple-500 to-pink-500",
    },
  ];

  const categories = [
    "all",
    "SaaS Platform",
    "E-Commerce",
    "Custom Software",
    "AI Solution",
    "Marketplace",
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="portfolio"
      className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200"
              }`}
            >
              {category === "all" ? "All Projects" : category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    ></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>Featured</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm font-semibold text-blue-600 mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className="text-center">
                            <div
                              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} text-white mb-2`}
                            >
                              <metric.icon className="w-5 h-5" />
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {metric.value}
                            </div>
                            <div className="text-xs text-gray-500">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 mt-auto`}
                      >
                        <span>View Live Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
