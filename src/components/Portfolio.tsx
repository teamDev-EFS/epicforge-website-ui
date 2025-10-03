import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Award, TrendingUp, Users, Zap } from 'lucide-react';

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
    threshold: 0.1
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projects: Project[] = [
    {
      id: '1',
      title: 'ForgeOrion',
      subtitle: 'Intelligent Workflow Automation Platform',
      description: 'Enterprise-grade workflow automation platform powering operations across India & Korea. Built with AI-driven decisioning, real-time analytics, and multi-tenant architecture.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'SaaS Platform',
      tags: ['AI/ML', 'Automation', 'Enterprise', 'Real-time'],
      metrics: [
        { label: 'Active Users', value: '10K+', icon: Users },
        { label: 'Automation Rate', value: '85%', icon: Zap },
        { label: 'ROI Increase', value: '240%', icon: TrendingUp }
      ],
      liveUrl: 'https://forgeorion.com',
      featured: true,
      gradient: 'from-blue-600 via-cyan-500 to-teal-500'
    },
    {
      id: '2',
      title: 'HealthCare AI Assistant',
      subtitle: 'Multilingual Patient Booking System',
      description: 'AI-powered healthcare assistant handling 5,000+ patient interactions monthly. Supports 4 languages with voice recognition and automated appointment scheduling.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'AI Assistant',
      tags: ['Healthcare', 'AI Chat', 'Voice AI', 'Multilingual'],
      metrics: [
        { label: 'Conversations', value: '5K+/mo', icon: Users },
        { label: 'Booking Rate', value: '78%', icon: Award },
        { label: 'Response Time', value: '<2s', icon: Zap }
      ],
      featured: true,
      gradient: 'from-green-600 via-emerald-500 to-teal-500'
    },
    {
      id: '3',
      title: 'Legal CRM Pro',
      subtitle: 'Case Management & Client Portal',
      description: 'Custom-built legal practice management system with document automation, client portal, and billing integration. Serving 100+ legal professionals.',
      image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Custom Software',
      tags: ['Legal Tech', 'CRM', 'Document AI', 'Portal'],
      metrics: [
        { label: 'Cases Managed', value: '2,500+', icon: Award },
        { label: 'Time Saved', value: '60%', icon: Zap },
        { label: 'User Satisfaction', value: '94%', icon: TrendingUp }
      ],
      featured: true,
      gradient: 'from-purple-600 via-violet-500 to-indigo-500'
    },
    {
      id: '4',
      title: 'Auto Dealership Dashboard',
      subtitle: 'Inventory & Sales Intelligence',
      description: 'Real-time automotive inventory management with predictive analytics, lead scoring, and automated follow-ups. Increased sales conversions by 45%.',
      image: 'https://images.pexels.com/photos/3807386/pexels-photo-3807386.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Custom Software',
      tags: ['Automotive', 'Analytics', 'CRM', 'Real-time'],
      metrics: [
        { label: 'Sales Increase', value: '+45%', icon: TrendingUp },
        { label: 'Lead Response', value: '<5min', icon: Zap },
        { label: 'Inventory Tracked', value: '5K+', icon: Award }
      ],
      featured: false,
      gradient: 'from-orange-600 via-amber-500 to-yellow-500'
    },
    {
      id: '5',
      title: 'E-Commerce AI Optimizer',
      subtitle: 'Conversion & Personalization Engine',
      description: 'Machine learning-powered product recommendations and dynamic pricing engine. Boosted average order value by 38% for retail clients.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'AI Solution',
      tags: ['E-Commerce', 'ML', 'Personalization', 'Optimization'],
      metrics: [
        { label: 'AOV Increase', value: '+38%', icon: TrendingUp },
        { label: 'Conversion Rate', value: '+22%', icon: Award },
        { label: 'Products Analyzed', value: '50K+', icon: Zap }
      ],
      featured: false,
      gradient: 'from-pink-600 via-rose-500 to-red-500'
    },
    {
      id: '6',
      title: 'Logistics Command Center',
      subtitle: 'Fleet & Route Optimization',
      description: 'AI-driven logistics platform with real-time GPS tracking, predictive maintenance, and route optimization. Managing 500+ vehicles daily.',
      image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=1200',
      category: 'Custom Software',
      tags: ['Logistics', 'IoT', 'AI Optimization', 'Fleet Management'],
      metrics: [
        { label: 'Fuel Saved', value: '32%', icon: TrendingUp },
        { label: 'Fleet Size', value: '500+', icon: Users },
        { label: 'On-time Rate', value: '96%', icon: Award }
      ],
      featured: false,
      gradient: 'from-slate-600 via-gray-500 to-zinc-500'
    }
  ];

  const categories = ['all', 'SaaS Platform', 'AI Assistant', 'Custom Software', 'AI Solution'];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            From AI-powered automation to enterprise-grade custom software—our solutions drive measurable results for forward-thinking companies.
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
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
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
                className={`group relative ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
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

                  <div className="p-6">
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
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} text-white mb-2`}>
                            <metric.icon className="w-5 h-5" />
                          </div>
                          <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-gradient-to-r ${project.gradient} text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
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
