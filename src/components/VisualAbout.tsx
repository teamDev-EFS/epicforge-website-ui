import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Zap, Target } from 'lucide-react';

const VisualAbout: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">✓ Best Brand Building Growth Agency</span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Growth Engine</span>
              <br />
              Behind Top Brands
            </h2>

            {/* Services Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
                Website
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
                AI Chatbot
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
                AI Automation
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium">
                Omnipresence
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              As the growth engine behind top brands, we scale businesses through AI
              SEO, cutting-edge websites, and strategic brand building. A future-ready
              presence that keeps your brand visible, credible, and chosen by clients.
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
            >
              Request 1:1 Call
            </motion.button>
          </motion.div>

          {/* Right Side - Visual Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-12 rounded-3xl border border-cyan-500/20 relative">
              {/* Central Logo/Icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl z-10">
                <div className="text-white text-5xl font-bold">R</div>
              </div>

              {/* Tech Icons Around Center - WordPress */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-8 right-8 w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30"
              >
                <div className="text-cyan-400 text-xs font-bold">WP</div>
                <span className="absolute -top-2 -right-2 text-xs text-gray-400">Wordpress</span>
              </motion.div>

              {/* React JS */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-8 right-28 w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30"
              >
                <div className="text-cyan-400 text-xs font-bold">⚛</div>
                <span className="absolute -top-2 -right-2 text-xs text-gray-400">React JS</span>
              </motion.div>

              {/* AI Automation */}
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-8 top-24 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full border border-purple-500/30"
              >
                <span className="text-purple-300 text-sm font-semibold">AI Automation</span>
              </motion.div>

              {/* Websites */}
              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute right-8 top-32 px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm rounded-full border border-cyan-500/30"
              >
                <span className="text-cyan-300 text-sm font-semibold">Websites</span>
              </motion.div>

              {/* JavaScript Icon */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-8 right-16 w-16 h-16 bg-yellow-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-yellow-500/30"
              >
                <div className="text-yellow-400 text-xl font-bold">JS</div>
                <span className="absolute -bottom-6 left-0 text-xs text-gray-400">Javascript</span>
              </motion.div>

              {/* Framer */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-8 right-40 text-gray-400 text-xs flex items-center space-x-1"
              >
                <Zap className="w-4 h-4" />
                <span>Framer</span>
              </motion.div>

              {/* Stats Card */}
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm p-4 rounded-2xl border border-cyan-500/30 w-48">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-400 text-sm">Stats</span>
                  </div>
                  <Target className="w-4 h-4 text-gray-500" />
                </div>

                <div className="text-5xl font-bold text-white mb-1">32</div>
                <div className="text-sm text-gray-400 mb-3">Total project</div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">65% Done</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">25% Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">45% To Do</span>
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 200 200 Q 250 150, 300 180"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisualAbout;
