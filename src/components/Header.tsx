import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: 'home', section: 'hero' },
    { key: 'features', section: 'features' },
    { key: 'process', section: 'process' },
    { key: 'clients', section: 'clients' },
    { key: 'services', section: 'services' },
    { key: 'team', section: 'team' },
    { key: 'contact', section: 'contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-teal-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/Gemini_Generated_Image_5lyx5m5lyx5m5lyx.png"
                  alt="EpicForge"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const span = document.createElement('span');
                      span.className = 'text-white font-bold text-xl';
                      span.textContent = 'E';
                      parent.appendChild(span);
                    }
                  }}
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-indigo-400 transition-all">
                EpicForge Software
              </span>
              <div className="text-xs text-teal-400 font-medium flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Forging the Future</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(item.section)}
                className="relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 group"
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => scrollToSection('contact')}
              className="ml-4 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl">
                {t('nav.getStarted')}
              </div>
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-slate-900/98 backdrop-blur-xl border-t border-teal-500/20 rounded-b-2xl"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.section)}
                    className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-indigo-600/20 rounded-lg transition-all duration-200 font-medium border border-transparent hover:border-teal-500/30"
                  >
                    {t(`nav.${item.key}`)}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  {t('nav.getStarted')}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
