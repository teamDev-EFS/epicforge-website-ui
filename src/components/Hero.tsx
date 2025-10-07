import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Network,
  Brain,
  Shield,
} from "lucide-react";

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20"
    >
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
            ease: "easeInOut",
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
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
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
              <span className="text-sm font-semibold text-cyan-300">
                Empowering the Future of Business through AI, Blockchain, and
                Intelligent Automation.
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Growth Engine
              </span>
              <br />
              Behind Top Brands
            </h1>

            {/* Services Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              <span className="px-3 sm:px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-xs sm:text-sm font-medium">
                Website
              </span>
              <span className="px-3 sm:px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-xs sm:text-sm font-medium">
                AI Chatbot
              </span>
              <span className="px-3 sm:px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-xs sm:text-sm font-medium">
                AI Automation
              </span>
              <span className="px-3 sm:px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full text-gray-300 text-xs sm:text-sm font-medium">
                Omnipresence
              </span>
            </div>

            {/* Description - Minimal */}
            <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl">
              At EpicForgeSoftware, we empower brands to grow faster and
              smarter. We combine AI SEO, next-generation website development,
              and strategic brand automation to build visibility, credibility,
              and client trust across every digital touchpoint.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold text-sm sm:text-base md:text-lg shadow-2xl hover:shadow-blue-500/50 transition-all w-full sm:w-auto"
            >
              Request 1:1 Call
            </motion.button>
          </motion.div>

          {/* Mobile Visual Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:hidden mt-8"
          >
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 rounded-2xl border border-cyan-500/20">
              {/* Mobile Central Logo */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 overflow-hidden">
                  <img
                    src="/EFS_latest_app_icon-1.png"
                    alt="EpicForge Software Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </motion.div>

              {/* Mobile Service Icons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-cyan-500/30">
                  <Brain className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-cyan-200 text-sm font-medium">
                    AI Intelligence
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-purple-500/30">
                  <Network className="w-8 h-8 text-purple-400 mb-2" />
                  <span className="text-purple-200 text-sm font-medium">
                    Blockchain
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-green-500/30">
                  <Shield className="w-8 h-8 text-green-400 mb-2" />
                  <span className="text-green-200 text-sm font-medium">
                    Security
                  </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-yellow-500/30">
                  <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                  <span className="text-yellow-200 text-sm font-medium">
                    Automation
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual Diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Visual Card */}
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-8 sm:p-12 lg:p-16 rounded-3xl border border-cyan-500/20 min-h-[400px] sm:min-h-[500px]">
              {/* Central Logo/Icon - Large with Yellow Border */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Yellow animated border */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-44 h-44 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                >
                  <div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-yellow-400 border-r-yellow-400"
                    style={{ borderRadius: "45% 55% 50% 50%" }}
                  ></div>
                </motion.div>

                {/* Logo container */}
                <div className="relative w-36 h-36 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/50 overflow-hidden">
                  <img
                    src="/Gemini_Generated_Image_5lyx5m5lyx5m5lyx copy.png"
                    alt="EpicForge Software Logo"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </motion.div>

              {/* WordPress Icon - Top Right */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-8 right-12 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-lg mb-2">
                  <svg
                    className="w-8 h-8 text-cyan-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Wordpress
                </span>
              </motion.div>

              {/* React JS Icon - Top Right 2 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-8 right-40 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-slate-700/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 shadow-lg mb-2">
                  <div className="text-cyan-400 text-2xl">⚛</div>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  React JS
                </span>
              </motion.div>

              {/* AI Automation Pill - Left - Enhanced Premium */}
              <motion.div
                animate={{
                  x: [-8, 8, -8],
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(168, 85, 247, 0.6)",
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-4 top-32 px-6 py-4 bg-gradient-to-r from-purple-600/40 to-pink-600/40 backdrop-blur-md rounded-full border-2 border-purple-400/60 shadow-2xl shadow-purple-500/30"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
                  >
                    <Brain className="w-3 h-3 text-white" />
                  </motion.div>
                  <span className="text-purple-100 text-sm font-bold">
                    AI Automation
                  </span>
                </div>
                {/* Premium glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-sm -z-10"></div>
              </motion.div>

              {/* Websites Pill - Right */}
              <motion.div
                animate={{ x: [8, -8, 8] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute right-4 top-40 px-5 py-3 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-full border border-cyan-500/40 shadow-lg"
              >
                <span className="text-cyan-200 text-sm font-semibold">
                  Websites
                </span>
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
                <span className="text-xs text-gray-400 font-medium">
                  Javascript
                </span>
              </motion.div>

              {/* Framer Badge - Bottom Right 2 */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-12 right-48 flex items-center space-x-2 text-gray-400 text-xs"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="font-medium">Framer</span>
              </motion.div>

              {/* Blockchain Network Icon - Top Left - Enhanced Premium */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 30px rgba(139, 92, 246, 0.4)",
                    "0 0 60px rgba(139, 92, 246, 0.8)",
                    "0 0 30px rgba(139, 92, 246, 0.4)",
                  ],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute top-16 left-8 flex flex-col items-center"
              >
                <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-purple-400/60 shadow-2xl shadow-purple-500/40 mb-3">
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Network className="w-10 h-10 text-purple-300" />
                  </motion.div>
                  {/* Animated chain links around the network icon */}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-3xl border-2 border-purple-400/30"
                  />
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-1 rounded-2xl border border-purple-300/20"
                  />
                </div>
                <div className="text-center">
                  <span className="text-purple-200 text-sm font-bold block">
                    Blockchain
                  </span>
                  <span className="text-purple-400/70 text-xs">Network</span>
                </div>
                {/* Premium glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl blur-lg -z-10 scale-150"></div>
              </motion.div>

              {/* AI Intelligence Icon - Bottom Left - Enhanced Premium */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                  boxShadow: [
                    "0 0 25px rgba(6, 182, 212, 0.4)",
                    "0 0 50px rgba(6, 182, 212, 0.8)",
                    "0 0 25px rgba(6, 182, 212, 0.4)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-16 left-12 flex flex-col items-center"
              >
                <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/40 mb-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Brain className="w-10 h-10 text-cyan-300" />
                  </motion.div>
                  {/* Animated neural network pattern */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-3xl border border-cyan-300/30"
                  />
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute inset-1 rounded-2xl border border-cyan-200/20"
                  />
                </div>
                <div className="text-center">
                  <span className="text-cyan-200 text-sm font-bold block">
                    AI Intelligence
                  </span>
                  <span className="text-cyan-400/70 text-xs">
                    Neural Network
                  </span>
                </div>
                {/* Premium glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-lg -z-10 scale-150"></div>
              </motion.div>

              {/* Security Shield Icon - Top Center */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute top-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-green-500/40 shadow-lg mb-2">
                  <Shield className="w-7 h-7 text-green-400" />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Security
                </span>
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
                    <span className="text-gray-300 text-sm font-medium">
                      Stats
                    </span>
                  </div>
                  <Target className="w-4 h-4 text-gray-500" />
                </div>

                <div className="text-5xl font-bold text-white mb-1">33</div>
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
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Premium AI and Blockchain connecting lines */}
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="15%"
                  y2="25%"
                  stroke="url(#blockchainGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="40%"
                  stroke="url(#aiGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="20%"
                  y2="75%"
                  stroke="url(#aiIntelligenceGradient)"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                {/* Regular connecting lines */}
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="80%"
                  y2="20%"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                />
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="20%"
                  stroke="url(#gradient5)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                <defs>
                  {/* Premium AI and Blockchain gradients */}
                  <linearGradient
                    id="blockchainGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                    <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#a855f7" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="aiGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
                    <stop offset="30%" stopColor="#a855f7" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="aiIntelligenceGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="70%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  {/* Regular gradients */}
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="gradient5"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Ambient Glow Effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>

              {/* Premium AI and Blockchain Ambient Effects */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-16 left-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl -z-10"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-16 left-12 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl -z-10"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute left-4 top-32 w-24 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
