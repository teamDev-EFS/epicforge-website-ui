import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Filter, ExternalLink, Calendar, Tag } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tech: string[];
  image: string;
  description: string;
  link: string;
}

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'AI Websites', 'Automation', 'IT Consulting', 'Mobile Apps', 'Enterprise'];

  const projects: Project[] = [
    {
      id: 1,
      title: 'AI-Powered E-Commerce Platform',
      category: 'AI Websites',
      year: '2024',
      tech: ['React', 'AI/ML', 'Node.js'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      description: '350% traffic growth with LLM SEO optimization',
      link: '/case-studies/1'
    },
    {
      id: 2,
      title: 'Enterprise Automation Suite',
      category: 'Automation',
      year: '2024',
      tech: ['Python', 'RPA', 'AI'],
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg',
      description: 'Automated 85% of manual workflows',
      link: '/case-studies/2'
    },
    {
      id: 3,
      title: 'Global SaaS Dashboard',
      category: 'Enterprise',
      year: '2023',
      tech: ['Vue.js', 'PostgreSQL', 'AWS'],
      image: 'https://images.pexels.com/photos/7735700/pexels-photo-7735700.jpeg',
      description: 'Real-time analytics for 10K+ users',
      link: '/case-studies/3'
    },
    {
      id: 4,
      title: 'Healthcare Mobile App',
      category: 'Mobile Apps',
      year: '2024',
      tech: ['React Native', 'Firebase'],
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg',
      description: 'HIPAA-compliant telemedicine solution',
      link: '/case-studies/4'
    },
    {
      id: 5,
      title: 'FinTech AI Assistant',
      category: 'AI Websites',
      year: '2023',
      tech: ['Python', 'TensorFlow', 'ChatGPT'],
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      description: 'AI-powered financial advisory chatbot',
      link: '/case-studies/5'
    },
    {
      id: 6,
      title: 'Supply Chain Optimization',
      category: 'IT Consulting',
      year: '2024',
      tech: ['SAP', 'Blockchain', 'IoT'],
      image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg',
      description: 'Reduced costs by 40% with smart logistics',
      link: '/case-studies/6'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our collection of cutting-edge projects that have transformed businesses globally
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <div className="flex items-center space-x-2 text-yellow-500">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-yellow-500/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={project.link}
                    className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <span>View Case Study</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Meta Info */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{project.category}</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
