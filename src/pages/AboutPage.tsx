import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Award, Lightbulb, TrendingUp, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const team = [
    {
      name: 'ADITYA VARDHAN NAGAMALLI',
      role: 'CEO | FOUNDER',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Visionary leader with 10+ years in AI and enterprise solutions',
      linkedin: '#'
    },
    {
      name: 'AVINASH KUMAR NAGUMALLI',
      role: 'CTO | CO-FOUNDER',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      bio: 'Technology architect specializing in scalable AI systems',
      linkedin: '#'
    },
    {
      name: 'HARSHA VARDHAN NAGAMALLI',
      role: 'COO | CO-FOUNDER',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
      bio: 'Operations expert driving global expansion and client success',
      linkedin: '#'
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: t('about.innovation'),
      description: t('about.innovationText'),
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      icon: TrendingUp,
      title: t('about.results'),
      description: t('about.resultsText'),
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: Users,
      title: t('about.partnership'),
      description: t('about.partnershipText'),
      gradient: 'from-orange-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 mb-6">
              {t('about.title')}
            </h1>
            <p className="text-2xl text-yellow-400 font-semibold mb-8">
              {t('about.subtitle')}
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl font-bold text-yellow-400">{t('about.mission')}</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('about.missionText')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-3xl font-bold text-amber-400">{t('about.vision')}</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t('about.visionText')}
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl font-bold text-center text-white mb-12">{t('about.values')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
              Meet Our Elite Leadership
            </h2>
            <p className="text-center text-gray-300 text-lg mb-16">
              World-class experts forging the future of innovation
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition duration-500" />
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-yellow-500/20">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-sm font-bold rounded-full mb-4">
                        {member.role}
                      </div>
                      <p className="text-gray-400 mb-6">{member.bio}</p>
                      <a
                        href={member.linkedin}
                        className="inline-block px-6 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/20 transition-all font-semibold"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 backdrop-blur-sm px-8 py-4 rounded-full border border-yellow-500/20">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-lg">
                Recognized as a Global Leader in AI-Driven IT Solutions
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
