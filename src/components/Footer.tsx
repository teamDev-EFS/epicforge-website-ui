import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import LanguageDropdown from './LanguageDropdown';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo and Contact */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">EpicForgeSoftware</span>
                  <div className="text-sm text-blue-400 font-medium">Forging the Future of Innovation</div>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-400 mb-6 max-w-md leading-relaxed"
              >
                We build AI systems and custom software that automate workflows, boost revenue, and generate qualified leads — without hiring.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>info@epicforgesoftware.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>India • Korea • United States</span>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { key: 'home', section: 'hero' },
                  { key: 'about', section: 'about' },
                  { key: 'services', section: 'features' },
                  { key: 'contact', section: 'contact' }
                ].map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(item.section)}
                    className="block text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    {t(`nav.${item.key}`)}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Language & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <div className="space-y-4">
                <LanguageDropdown />
                
                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://forgeorion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span>ForgeOrion Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                
                <div className="space-y-2">
                  <button className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 text-left">
                    {t('footer.privacy')}
                  </button>
                  <button className="block text-gray-400 hover:text-white text-sm transition-colors duration-200 text-left">
                    {t('footer.terms')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t('footer.rights')}
            </p>
            
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.open('https://calendly.com/team-dev-epicforgesoftware/30min', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                Book a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;