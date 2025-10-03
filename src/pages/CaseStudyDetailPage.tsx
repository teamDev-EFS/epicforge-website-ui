import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { CheckCircle, TrendingUp, Users, Clock, Download } from 'lucide-react';
import { ReviewSchema, HowToSchema } from '../components/SEOSchemas';

const CaseStudyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const caseStudy = {
    id,
    title: 'E-Commerce Platform: 350% Traffic Growth',
    client: 'TechRetail Solutions',
    industry: 'E-Commerce',
    duration: '6 Months',
    heroImage: '/api/placeholder/1200/600',
    challenge: 'TechRetail was struggling with low organic traffic and poor conversion rates. Their existing website wasn\'t optimized for modern search engines or AI platforms like ChatGPT.',
    solution: 'We implemented our comprehensive AI SEO strategy combined with UX redesign and voice search optimization.',
    results: [
      { metric: 'Organic Traffic', value: '+350%', icon: TrendingUp },
      { metric: 'Conversion Rate', value: '+127%', icon: CheckCircle },
      { metric: 'AI Search Visibility', value: '+280%', icon: Users },
      { metric: 'Load Speed', value: '-60%', icon: Clock }
    ],
    steps: [
      {
        name: 'Technical Audit & Strategy',
        text: 'Conducted comprehensive technical SEO audit and developed custom AI SEO strategy targeting LLM platforms'
      },
      {
        name: 'Website Redesign',
        text: 'Rebuilt entire frontend with modern React architecture, optimized images, and implemented lazy loading'
      },
      {
        name: 'Content Optimization',
        text: 'Created conversational Q&A content optimized for ChatGPT and voice search with structured schema markup'
      },
      {
        name: 'AI Chatbot Integration',
        text: 'Deployed intelligent chatbot with voice capabilities for 24/7 customer support and lead qualification'
      },
      {
        name: 'Continuous Optimization',
        text: 'Ongoing A/B testing, performance monitoring, and content updates based on AI search trends'
      }
    ],
    testimonial: {
      text: 'EpicForge transformed our entire digital presence. The 350% traffic growth was beyond our expectations, and the AI chatbot alone has generated over 200 qualified leads!',
      author: 'John Smith',
      role: 'CEO, TechRetail Solutions',
      rating: 5
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50/20 pt-32 pb-20">
      <HowToSchema
        name={`How ${caseStudy.client} Achieved ${caseStudy.results[0].value} Growth`}
        description={caseStudy.solution}
        steps={caseStudy.steps}
      />
      <ReviewSchema
        itemName={`${caseStudy.client} Project`}
        ratingValue={caseStudy.testimonial.rating}
        reviewCount={1}
        reviews={[
          {
            author: caseStudy.testimonial.author,
            rating: caseStudy.testimonial.rating,
            datePublished: '2024-12-01',
            reviewBody: caseStudy.testimonial.text
          }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 rounded-full text-white text-sm font-semibold mb-4">
            Case Study
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {caseStudy.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <span><strong>Client:</strong> {caseStudy.client}</span>
            <span><strong>Industry:</strong> {caseStudy.industry}</span>
            <span><strong>Duration:</strong> {caseStudy.duration}</span>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-teal-400 to-cyan-600 h-96 flex items-center justify-center"
        >
          <span className="text-white text-8xl font-bold opacity-20">EFS</span>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {caseStudy.results.map((result, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-2 border-teal-100 text-center">
              <result.icon className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{result.value}</div>
              <div className="text-sm text-gray-600">{result.metric}</div>
            </div>
          ))}
        </motion.div>

        {/* Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Challenge</h2>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-200">
            <p className="text-lg text-gray-700 leading-relaxed">{caseStudy.challenge}</p>
          </div>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl border-2 border-teal-200 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{caseStudy.solution}</p>
          </div>

          <div className="space-y-4">
            {caseStudy.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.name}</h3>
                  <p className="text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-12 rounded-2xl text-white shadow-2xl">
            <div className="flex items-center mb-6">
              {[...Array(caseStudy.testimonial.rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>
            <p className="text-2xl font-medium mb-6 leading-relaxed">
              "{caseStudy.testimonial.text}"
            </p>
            <div>
              <div className="font-bold text-lg">{caseStudy.testimonial.author}</div>
              <div className="text-indigo-200">{caseStudy.testimonial.role}</div>
            </div>
          </div>
        </motion.section>

        {/* Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center bg-gradient-to-r from-teal-600 to-cyan-600 p-12 rounded-2xl text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Want Similar Results?</h2>
          <p className="text-xl mb-8 opacity-90">Download the full case study PDF or schedule a free consultation</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-teal-800 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <span>Schedule Consultation</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyDetailPage;
