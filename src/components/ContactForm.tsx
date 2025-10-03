import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Bot, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { saveLead, Lead } from '../lib/supabase';

const ContactForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    budget: '',
    problem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        business_type: formData.businessType,
        budget: formData.budget,
        project_type: 'Custom Software',
        problem: formData.problem,
        language: i18n.language,
        source: 'form',
        qualified: formData.budget !== '' && formData.problem !== ''
      };
      
      await saveLead(leadData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        businessType: '',
        budget: '',
        problem: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openCalendly = () => {
    window.open('https://calendly.com/team-dev-epicforgesoftware/30min', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Send className="w-4 h-4" />
            <span>Get In Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your custom AI solution or software build. Choose your preferred way to connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Connect</h3>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="relative w-full bg-transparent text-white p-6 font-semibold text-lg shadow-2xl flex items-center space-x-4">
                    <Bot className="w-8 h-8" />
                    <div className="text-left">
                      <div className="text-xl">{t('hero.ctaAI')}</div>
                      <div className="text-sm opacity-90">{t('hero.ctaAISubtext')}</div>
                    </div>
                  </button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group"
                >
                  <button
                    onClick={openCalendly}
                    className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white p-6 rounded-2xl font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center space-x-4"
                  >
                    <Calendar className="w-8 h-8" />
                    <div className="text-left">
                      <div className="text-xl">{t('hero.ctaCall')}</div>
                      <div className="text-sm opacity-90">{t('hero.ctaCallSubtext')}</div>
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Free Strategy Call Includes:
              </h4>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Bottleneck analysis for your business
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Custom AI/software recommendations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  Clear project scope and timeline
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Transparent pricing discussion
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Send Us Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('form.name')}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('form.email')}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('form.phone')}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('form.company')}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800">{t('form.businessType')}</option>
                    <option value="health" className="bg-gray-800">Health</option>
                    <option value="saas" className="bg-gray-800">SaaS</option>
                    <option value="legal" className="bg-gray-800">Legal</option>
                    <option value="retail" className="bg-gray-800">Retail</option>
                    <option value="auto" className="bg-gray-800">Auto</option>
                    <option value="logistics" className="bg-gray-800">Logistics</option>
                    <option value="other" className="bg-gray-800">Other</option>
                  </select>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800">{t('form.budget')}</option>
                    <option value="5k-15k" className="bg-gray-800">$5K - $15K</option>
                    <option value="15k-50k" className="bg-gray-800">$15K - $50K</option>
                    <option value="50k-100k" className="bg-gray-800">$50K - $100K</option>
                    <option value="100k+" className="bg-gray-800">$100K+</option>
                  </select>
                </div>

                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder={t('form.problem')}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                  </span>
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{t('form.success')}</span>
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{t('form.error')}</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;