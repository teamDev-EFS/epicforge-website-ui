import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, FileSearch, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FloatingCTA: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/yourphonenumber?text=Hi%20EpicForge!%20I%20need%20a%20quick%20quote%20for%20my%20project', '_blank');
  };

  const handleAuditClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-40 flex flex-col items-end space-y-4"
        >
          {/* Expanded Menu */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {/* Free Audit Button */}
                <motion.button
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleAuditClick}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white pl-6 pr-16 py-4 rounded-full shadow-2xl flex items-center space-x-3 transition-all duration-300">
                    <FileSearch className="w-5 h-5" />
                    <span className="font-bold whitespace-nowrap">{t('cta.floating.audit')}</span>
                  </div>
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 50, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={handleWhatsAppClick}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                  <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white pl-6 pr-16 py-4 rounded-full shadow-2xl flex items-center space-x-3 transition-all duration-300">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-bold whitespace-nowrap">{t('cta.floating.whatsapp')}</span>
                  </div>
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 via-amber-600 to-orange-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse transition duration-300" />
            <div className="relative w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-7 h-7 text-black" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <MessageCircle className="w-7 h-7 text-black" />
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          {/* Tooltip */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute right-20 bottom-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none"
            >
              <span className="text-sm font-semibold">Need Help? Click here!</span>
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-3 h-3 bg-slate-900 rotate-45" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
