import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, TrendingUp, Zap, Target } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-400/30 rounded-full px-5 py-2.5 mb-8"
            >
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">✓ Best Brand Building Growth Agency</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Growth Engine</span>
              <br />
              Behind Top Brands
            </h1>

            {/* Services Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-sm font-medium">
                Website
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-sm font-medium">
                AI Chatbot
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-sm font-medium">
                AI Automation
              </span>
              <span className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-sm font-medium">
                Omnipresence
              </span>
            </div>

            {/* Description - Minimal */}
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl">
              As the growth engine behind top brands, we scale businesses through AI SEO, cutting-edge websites, and strategic brand building. A future-ready presence that keeps your brand visible, credible, and chosen by clients.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all"
            >
              Request 1:1 Call
            </motion.button>
          </motion.div>

          {/* Right Side - Visual Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Visual Card */}
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-16 rounded-3xl border border-cyan-500/20 min-h-[500px]">

              {/* Central Logo/Icon - Large */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 z-20"
              >
                <div className="text-white text-6xl font-black">R</div>
              </motion.div>

              {/* WordPress Icon - Top Right */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-12 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-lg mb-2">
                  <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                    <circle cx="5" cy="12" r="1"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">Wordpress</span>
              </motion.div>

              {/* React JS Icon - Top Right 2 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 right-40 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-lg mb-2">
                  <div className="text-cyan-400 text-2xl">⚛</div>
                </div>
                <span className="text-xs text-gray-400 font-medium">React JS</span>
              </motion.div>

              {/* AI Automation Pill - Left */}
              <motion.div
                animate={{ x: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-32 px-5 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-full border border-purple-500/40 shadow-lg"
              >
                <span className="text-purple-200 text-sm font-semibold">AI Automation</span>
              </motion.div>

              {/* Websites Pill - Right */}
              <motion.div
                animate={{ x: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-4 top-40 px-5 py-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-full border border-cyan-500/40 shadow-lg"
              >
                <span className="text-cyan-200 text-sm font-semibold">Websites</span>
              </motion.div>

              {/* JavaScript Icon - Bottom Right */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-12 right-20 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-yellow-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-yellow-500/40 shadow-lg mb-2">
                  <div className="text-yellow-400 text-xl font-bold">JS</div>
                </div>
                <span className="text-xs text-gray-400 font-medium">Javascript</span>
              </motion.div>

              {/* Framer Badge - Bottom Right 2 */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 right-48 flex items-center space-x-2 text-gray-400 text-xs"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-medium">Framer</span>
              </motion.div>

              {/* Stats Card - Bottom Left */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-xl p-5 rounded-2xl border border-cyan-500/30 w-56 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">Stats</span>
                  </div>
                  <Target className="w-4 h-4 text-gray-500" />
                </div>

                <div className="text-5xl font-bold text-white mb-1">32</div>
                <div className="text-sm text-gray-400 mb-4">Total project</div>

                <div className="space-y-2.5">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">65% Done</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">25% Pending</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-orange-400 rounded-full"></div>
                    <span className="text-xs text-gray-300">45% To Do</span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                <motion.line
                  x1="50%" y1="50%" x2="80%" y2="20%"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.line
                  x1="50%" y1="50%" x2="20%" y2="40%"
                  stroke="url(#gradient2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Ambient Glow Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
