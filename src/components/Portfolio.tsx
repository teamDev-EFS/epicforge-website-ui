import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Award, TrendingUp, Users, Zap, Smartphone, GraduationCap } from "lucide-react";
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
  metrics: { label: string; value: string; icon: React.ElementType }[];
  liveUrl?: string;
  featured: boolean;
  gradient: string;
  accent: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-80, 80], [6, -6]);
  const rotY = useTransform(mx, [-80, 80], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      ref={cardRef}
      style={{ perspective: "900px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY,
          background: "rgba(17, 24, 39, 0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="group relative rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-400"
        whileHover={{ boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.15)" } as any}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden" style={{ background: "rgba(15,23,42,0.8)" }}>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
          />
          {!imgError && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
              <span className="text-white/80 text-5xl font-black tracking-tight select-none">
                {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
              </span>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span
              className="backdrop-blur-sm text-white/90 px-3 py-1 rounded-full text-xs font-semibold"
              style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {project.category}
            </span>
          </div>
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className={`bg-gradient-to-r ${project.gradient} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md`}>
                <Award className="w-3 h-3" />
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{ backgroundImage: `linear-gradient(135deg, ${project.accent}, #a78bfa)` } as any}
          >
            {project.title}
          </h3>
          <p className="text-sm font-semibold mb-3" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-grow">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ color: "#94a3b8", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${project.gradient} text-white mb-1.5 shadow-sm`}>
                  <metric.icon className="w-4 h-4" />
                </div>
                <div className="text-base font-bold text-white">{metric.value}</div>
                <div className="text-xs text-slate-500">{metric.label}</div>
              </div>
            ))}
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-semibold text-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 mt-auto`}
            >
              View Live Project
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PROJECTS: Project[] = [
  {
    id: "2", title: "ForgeOrion", subtitle: "AI-Powered Workflow Automation Platform",
    description: "Enterprise-grade workflow automation platform powering operations across India & Korea. AI-driven decisioning, real-time analytics, and multi-tenant architecture.",
    image: ForgeOrionImage, category: "SaaS Platform",
    tags: ["AI/ML", "Automation", "Enterprise", "Real-time"],
    metrics: [{ label: "Active Users", value: "10K+", icon: Users }, { label: "Automation Rate", value: "85%", icon: Zap }, { label: "ROI Increase", value: "240%", icon: TrendingUp }],
    liveUrl: "https://forgeorion.com", featured: true,
    gradient: "from-indigo-600 to-violet-600", accent: "#818cf8",
  },
  {
    id: "3", title: "NamasteExim", subtitle: "Export Import Business Platform",
    description: "Comprehensive export-import platform with inventory management, order tracking, and international trade documentation. Streamlining global commerce operations.",
    image: NamasteEximImage, category: "E-Commerce",
    tags: ["Export/Import", "E-Commerce", "Inventory", "Global Trade"],
    metrics: [{ label: "Orders Processed", value: "5K+", icon: Users }, { label: "Countries Served", value: "25+", icon: Award }, { label: "Efficiency Gain", value: "65%", icon: Zap }],
    liveUrl: "https://namasteeximventures.com", featured: true,
    gradient: "from-emerald-500 to-teal-600", accent: "#34d399",
  },
  {
    id: "4", title: "The11EximOverseas", subtitle: "International Trade Management System",
    description: "Advanced export-import management platform with real-time tracking, customs integration, and multi-currency support.",
    image: The11EximImage, category: "E-Commerce",
    tags: ["International Trade", "Customs", "Multi-Currency", "Tracking"],
    metrics: [{ label: "Trade Volume", value: "$2M+", icon: TrendingUp }, { label: "Customs Clearance", value: "98%", icon: Award }, { label: "Processing Time", value: "-70%", icon: Zap }],
    liveUrl: "https://the11eximoverseas.com", featured: true,
    gradient: "from-violet-600 to-indigo-600", accent: "#a78bfa",
  },
  {
    id: "5", title: "VysyarajuJewellers-Connect", subtitle: "Jewellery CRM & HRM Platform",
    description: "Comprehensive CRM and HRM solution for VysyaRaju Jewellers. Employee management, customer relationship tracking, and sales analytics.",
    image: VysyarajuJewellersImage, category: "Custom Software",
    tags: ["CRM", "HRM", "Jewellery", "Analytics"],
    metrics: [{ label: "Employees Managed", value: "5000+", icon: Users }, { label: "Customer Base", value: "50K+", icon: Award }, { label: "Sales Growth", value: "+45%", icon: TrendingUp }],
    liveUrl: "https://www.vysyarajujewellers.com/", featured: false,
    gradient: "from-amber-500 to-orange-500", accent: "#fbbf24",
  },
  {
    id: "6", title: "SunAutoFlow AI", subtitle: "AI-Powered Automation & Integration Platform",
    description: "Intelligent automation platform for business processes and system integrations. AI-driven workflow optimization, API management, and real-time monitoring.",
    image: SunAutoFlowImage, category: "AI Solution",
    tags: ["AI Automation", "Integration", "Workflow", "API Management"],
    metrics: [{ label: "Processes Automated", value: "500+", icon: Zap }, { label: "Integration APIs", value: "50+", icon: Award }, { label: "Time Saved", value: "80%", icon: TrendingUp }],
    liveUrl: "https://sunautoflow.com/", featured: false,
    gradient: "from-rose-500 to-pink-600", accent: "#fb7185",
  },
  {
    id: "7", title: "TrustGlobeExports", subtitle: "Global Export Management System",
    description: "Comprehensive export management platform with document automation, compliance tracking, and international shipping integration.",
    image: TrustGlobeImage, category: "E-Commerce",
    tags: ["Export Management", "Compliance", "Documentation", "Shipping"],
    metrics: [{ label: "Exports Processed", value: "1K+", icon: Users }, { label: "Compliance Rate", value: "99%", icon: Award }, { label: "Documentation Time", value: "-60%", icon: Zap }],
    liveUrl: "https://www.trustglobeexports.com/", featured: false,
    gradient: "from-slate-500 to-slate-700", accent: "#94a3b8",
  },
  {
    id: "8", title: "CareNestGlobal", subtitle: "Multi-Vendor Marketplace Platform",
    description: "Premium multi-vendor marketplace where brands meet discerning customers. Zero commission for 30 days, bank-grade security, and 24/7 premium support.",
    image: CareNestImage, category: "Marketplace",
    tags: ["Multi-Vendor", "E-Commerce", "Premium Brands", "Security"],
    metrics: [{ label: "Vendors", value: "500+", icon: Users }, { label: "Products", value: "10K+", icon: Award }, { label: "Security Score", value: "A+", icon: Zap }],
    liveUrl: "https://carenest.com", featured: true,
    gradient: "from-cyan-500 to-blue-600", accent: "#22d3ee",
  },
  {
    id: "9", title: "InnovateAITechnologies", subtitle: "AI & Blockchain Technology Solutions",
    description: "Cutting-edge AI and blockchain technology platform delivering innovative solutions for enterprise clients. Smart contracts and decentralized applications.",
    image: InnovateAIImage, category: "AI Solution",
    tags: ["AI/ML", "Blockchain", "Smart Contracts", "Enterprise"],
    metrics: [{ label: "AI Models Deployed", value: "100+", icon: Zap }, { label: "Blockchain Transactions", value: "1M+", icon: Award }, { label: "Client Satisfaction", value: "98%", icon: TrendingUp }],
    liveUrl: "https://innovateaitechnologies.com/", featured: true,
    gradient: "from-purple-600 to-pink-600", accent: "#c084fc",
  },
  {
    id: "10", title: "AdOn Auto — B Creations", subtitle: "Mobile App · Auto-Rickshaw Advertising",
    description: "Hyperlocal out-of-home advertising platform that turns auto-rickshaws into moving billboards. Geo-targeted ad campaigns across city routes.",
    image: "", category: "Mobile App",
    tags: ["Mobile App", "AdTech", "Hyperlocal", "OOH Advertising"],
    metrics: [{ label: "Autos Onboarded", value: "500+", icon: Smartphone }, { label: "Brand Campaigns", value: "50+", icon: Award }, { label: "Daily Impressions", value: "100K+", icon: TrendingUp }],
    featured: true,
    gradient: "from-yellow-500 to-amber-600", accent: "#fbbf24",
  },
  {
    id: "11", title: "EximGTH — Global Trade House", subtitle: "EdTech Platform · International Trade Education",
    description: "India's premier EdTech platform for international trade education. Certified courses, live mentorship, and a global business network.",
    image: "", category: "EdTech Platform",
    tags: ["EdTech", "International Trade", "E-Learning", "Certification"],
    metrics: [{ label: "Learners Enrolled", value: "2K+", icon: GraduationCap }, { label: "Courses Offered", value: "20+", icon: Award }, { label: "Countries Reached", value: "15+", icon: Users }],
    liveUrl: "https://eximgth.com/", featured: true,
    gradient: "from-teal-500 to-emerald-600", accent: "#2dd4bf",
  },
];

const CATEGORIES = ["all", "SaaS Platform", "E-Commerce", "Custom Software", "AI Solution", "Mobile App", "EdTech Platform", "Marketplace"];

const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden" style={{ background: "#0f172a" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Ambient */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Live Projects & Case Studies</span>
          </div>
          <h2
            className="font-black text-white mb-5 leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Powering Industry Leaders
            <span
              className="block text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
            >
              Across the Globe
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From AI-powered automation to enterprise-grade custom software — our solutions drive measurable results.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5 mb-14"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
              style={selectedCategory === cat ? {
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
              } : {
                background: "rgba(255,255,255,0.05)",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                  e.currentTarget.style.color = "#818cf8";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#94a3b8";
                }
              }}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
