import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    localStorage.setItem('preferred-language', langCode);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.10)",
          color: "#cbd5e1",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(99,102,241,0.15)";
          e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        }}
      >
        <Globe className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span className="hidden sm:inline text-sm font-semibold text-slate-300">{currentLanguage.name}</span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50"
              style={{
                background: "rgba(10, 15, 26, 0.98)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
                  style={{
                    background: currentLanguage.code === language.code ? "rgba(99,102,241,0.12)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (currentLanguage.code !== language.code)
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (currentLanguage.code !== language.code)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{language.flag}</span>
                    <span className="text-slate-300 text-sm font-semibold">{language.name}</span>
                  </div>
                  {currentLanguage.code === language.code && (
                    <Check className="w-4 h-4 text-indigo-400" />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
