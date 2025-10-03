import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Clock, Send, Mail, Calendar } from 'lucide-react';
import QuotationCalculator from '../components/QuotationCalculator';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-6">
            Ready to Transform Your Business?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your custom AI solution or software build. Choose your preferred way to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Contact Info & Quick Connect */}
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">Phone</h3>
                    <p className="text-white text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">Location</h3>
                    <p className="text-white text-lg">Global HQ: San Francisco, CA</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">Business Hours</h3>
                    <p className="text-white text-lg">Mon-Fri: 9AM - 6PM PST</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Connect Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Quick Connect</h3>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-indigo-500/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span>Get a Free AI Audit</span>
                  </div>
                  <span className="text-xs text-indigo-200">hero.ctaAISubtext</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://wa.me/15551234567', '_blank')}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-green-500/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>Book a Demo (WhatsApp)</span>
                  </div>
                  <span className="text-xs text-green-200">hero.ctaCallSubtext</span>
                </motion.button>
              </div>

              <div className="mt-8 bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-indigo-500/20">
                <h4 className="text-cyan-400 font-semibold mb-4 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>Free Strategy Call includes:</span>
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>Bottleneck analysis for your business</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>Custom AI/Software recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>Clear project scope and timeline</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>Transparent pricing discussion</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <MapPin className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg font-medium">Global Presence - Serving Clients Worldwide</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Forms */}
          <div className="space-y-8">
            {/* Quotation Calculator */}
            <QuotationCalculator />

            {/* Traditional Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Send Us Details</h3>
              <p className="text-gray-400 mb-6">Fill out the form and we'll get back within 24 hours</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all appearance-none">
                    <option>How did you find us?</option>
                    <option>Google Search</option>
                    <option>ChatGPT</option>
                    <option>Social Media</option>
                    <option>Referral</option>
                  </select>
                  <select className="bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all appearance-none">
                    <option>Budget Range</option>
                    <option>$5k - $10k</option>
                    <option>$10k - $25k</option>
                    <option>$25k - $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>

                <textarea
                  placeholder="Describe your project or problem..."
                  rows={4}
                  className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500 resize-none"
                ></textarea>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center space-x-3"
                >
                  <span>Get My Free Audit</span>
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
