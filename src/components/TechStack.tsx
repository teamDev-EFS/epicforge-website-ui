import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cpu, Database, Cloud, Smartphone, Brain, Shield } from 'lucide-react';

interface Technology {
  name: string;
  category: string;
  icon?: string;
  gradient: string;
}

const TechStack: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    {
      title: 'Frontend & Mobile',
      icon: Smartphone,
      gradient: 'from-blue-600 to-cyan-600',
      technologies: [
        { name: 'React', category: 'Web' },
        { name: 'Next.js', category: 'Web' },
        { name: 'TypeScript', category: 'Language' },
        { name: 'React Native', category: 'Mobile' },
        { name: 'Flutter', category: 'Mobile' },
        { name: 'Tailwind CSS', category: 'Styling' }
      ]
    },
    {
      title: 'Backend & APIs',
      icon: Cpu,
      gradient: 'from-purple-600 to-pink-600',
      technologies: [
        { name: 'Node.js', category: 'Runtime' },
        { name: 'Python', category: 'Language' },
        { name: 'Go', category: 'Language' },
        { name: 'GraphQL', category: 'API' },
        { name: 'REST APIs', category: 'API' },
        { name: 'Microservices', category: 'Architecture' }
      ]
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      gradient: 'from-green-600 to-teal-600',
      technologies: [
        { name: 'OpenAI GPT-4', category: 'LLM' },
        { name: 'TensorFlow', category: 'ML' },
        { name: 'PyTorch', category: 'ML' },
        { name: 'Langchain', category: 'AI Framework' },
        { name: 'Computer Vision', category: 'AI' },
        { name: 'NLP', category: 'AI' }
      ]
    },
    {
      title: 'Database & Storage',
      icon: Database,
      gradient: 'from-yellow-600 to-orange-600',
      technologies: [
        { name: 'PostgreSQL', category: 'SQL' },
        { name: 'MongoDB', category: 'NoSQL' },
        { name: 'Redis', category: 'Cache' },
        { name: 'Firebase', category: 'BaaS' },
        { name: 'Elasticsearch', category: 'Search' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      gradient: 'from-indigo-600 to-purple-600',
      technologies: [
        { name: 'AWS', category: 'Cloud' },
        { name: 'Google Cloud', category: 'Cloud' },
        { name: 'Docker', category: 'Container' },
        { name: 'Kubernetes', category: 'Orchestration' },
        { name: 'CI/CD', category: 'Pipeline' },
        { name: 'Terraform', category: 'IaC' }
      ]
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      gradient: 'from-red-600 to-pink-600',
      technologies: [
        { name: 'OAuth 2.0', category: 'Auth' },
        { name: 'JWT', category: 'Auth' },
        { name: 'GDPR', category: 'Compliance' },
        { name: 'SOC 2', category: 'Compliance' },
        { name: 'Encryption', category: 'Security' },
        { name: 'Penetration Testing', category: 'Security' }
      ]
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23000000%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Cpu className="w-4 h-4" />
            <span>Enterprise Technology Stack</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Built on
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mt-2">
              World-Class Technology
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We leverage cutting-edge frameworks, cloud infrastructure, and AI platforms to build scalable, secure, and future-proof solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-full opacity-50"></div>

                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {category.title}
                </h3>

                <div className="space-y-3">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 + techIndex * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 transition-all duration-300 group/tech"
                    >
                      <span className="font-semibold text-gray-900 group-hover/tech:text-transparent group-hover/tech:bg-clip-text group-hover/tech:bg-gradient-to-r group-hover/tech:from-blue-600 group-hover/tech:to-purple-600 transition-all duration-300">
                        {tech.name}
                      </span>
                      <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-lg">
                        {tech.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <p className="text-lg text-gray-700 font-medium mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
                Always Evolving.
              </span>{' '}
              We continuously adopt emerging technologies to keep your solutions ahead of the curve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
