import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageCircle, Calendar, Bot } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentWord, setCurrentWord] = useState(0);
  const cyclingWords = ['Traffic.', 'Leads.', 'Rankings.', 'Growth.'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % cyclingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/yourphonenumber?text=Hi%20EpicForge!%20I%20need%20a%20quick%20quote', '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-[700px] h-[700px] bg-indigo-500/20 rounded-full blur-3xl"
        />

        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        {/* Diagonal moving lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '200%'], y: ['-50%', '50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
            style={{ top: '30%' }}
          />
          <motion.div
            animate={{ x: ['200%', '-100%'], y: ['50%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
            style={{ top: '70%' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 backdrop-blur-md border border-teal-400/20 rounded-full px-6 py-3 mb-10 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-semibold text-white">AI-Powered Growth Engine</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-teal-400 rounded-full"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[1.1]">
              {t('hero.headline')}
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-5xl mx-auto"
          >
            {t('hero.subheadline')}
          </motion.p>

          {/* Dynamic Cycling Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12 h-20"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400"
              >
                {cyclingWords[currentWord]}
              </motion.span>
            </div>
          </motion.div>

          {/* CTA Buttons - Matching Screenshot Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary CTA - AI Audit */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center space-x-3">
                <Bot className="w-6 h-6" />
                <span>{t('hero.ctaAI')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Secondary CTA - Book Demo */}
            <motion.button
              onClick={openWhatsApp}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-slate-800/50 backdrop-blur-md border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-700/50 hover:border-white/30 transition-all duration-300 flex items-center space-x-3 shadow-xl"
            >
              <Calendar className="w-6 h-6" />
              <span>{t('hero.ctaCall')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Supporting Features Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-sm md:text-base text-gray-400 font-medium"
          >
            {t('hero.supportingText')}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
