import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { TrendingUp, FileText, Gauge, Search, Users, Briefcase, Zap } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  gradient: string;
}

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const stats: StatItem[] = [
    {
      icon: TrendingUp,
      value: 350,
      suffix: '%',
      label: t('stats.traffic'),
      gradient: 'from-teal-600 to-cyan-600'
    },
    {
      icon: FileText,
      value: 35,
      suffix: '+',
      label: t('stats.articles'),
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Gauge,
      value: 85,
      suffix: '+',
      label: t('stats.speed'),
      gradient: 'from-green-600 to-teal-600'
    },
    {
      icon: Search,
      value: 22,
      suffix: '+',
      label: t('stats.indexed'),
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  const secondaryStats = [
    { label: t('stats.clients'), value: '57+', icon: Users },
    { label: t('stats.delivered'), value: '15+', icon: Briefcase },
    { label: t('stats.active'), value: '10+', icon: Zap }
  ];

  return (
    <section id="stats" className="py-24 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="text-xl text-gray-300">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              inView={inView}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {secondaryStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-indigo-600 mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: StatItem;
  inView: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, inView, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep === steps) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring', bounce: 0.5 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <stat.icon className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
        >
          <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2`}>
            {count}{stat.suffix}
          </div>
          <div className="text-gray-300 font-medium">
            {stat.label}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Stats;
