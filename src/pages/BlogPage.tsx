import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
}

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "AI SEO",
    "Web Development",
    "Automation",
    "Case Studies",
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "how-ai-seo-ranks-chatgpt",
      title: "How to Rank Your Business on ChatGPT with AI SEO",
      excerpt:
        "Learn the exact strategies we use to get our clients featured in ChatGPT responses and AI-generated search results.",
      author: "Aditya Vardhan",
      date: "2024-12-15",
      category: "AI SEO",
      readTime: "8 min read",
      image: "/api/placeholder/800/400",
    },
    {
      id: "2",
      slug: "voice-search-optimization-2024",
      title: "Voice Search Optimization: The Complete 2024 Guide",
      excerpt:
        "Voice search is transforming how customers find businesses. Here's how to optimize your website for Alexa, Siri, and Google Assistant.",
      author: "Avinash Kumar",
      date: "2024-12-10",
      category: "AI SEO",
      readTime: "10 min read",
      image: "/api/placeholder/800/400",
    },
    {
      id: "3",
      slug: "350-percent-traffic-growth-case-study",
      title: "How We Achieved 350% Traffic Growth in 6 Months",
      excerpt:
        "A deep dive into the exact LLM SEO strategies that helped our client dominate their industry.",
      author: "Harsha Vardhan",
      date: "2024-12-05",
      category: "Case Studies",
      readTime: "12 min read",
      image: "/api/placeholder/800/400",
    },
    {
      id: "4",
      slug: "ai-chatbot-lead-generation",
      title: "AI Chatbots That Convert: Boosting Lead Quality by 200%",
      excerpt:
        "Discover how our intelligent chatbots with voice capabilities qualify leads and book consultations automatically.",
      author: "Aditya Vardhan",
      date: "2024-11-28",
      category: "Automation",
      readTime: "7 min read",
      image: "/api/placeholder/800/400",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      question: "What is LLM SEO and why is it important?",
      answer:
        "LLM SEO optimizes your content for Large Language Models like ChatGPT and Google AI. It's crucial because millions of users now get answers directly from AI assistants rather than traditional search engines.",
    },
    {
      question: "How long does it take to see results from AI SEO?",
      answer:
        "Most clients see initial improvements in 2-3 months, with significant traffic growth (200-350%) within 6 months. Results vary based on industry and current website state.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/30 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 px-4 py-2 rounded-full text-white text-sm font-semibold mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            <span>AI-Powered Insights</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-indigo-600 mb-6">
            Blog & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Expert insights on AI SEO, automation, and cutting-edge web
            development strategies
          </p>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-white border-2 border-gray-200 text-gray-900 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-teal-500"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-gray-100 hover:border-teal-500"
            >
              {/* Image */}
              <div className="relative h-64 bg-gradient-to-br from-teal-400 to-cyan-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <span className="text-white text-6xl font-bold opacity-20">
                    EFS
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {post.category}
                </span>

                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="font-medium">{post.readTime}</span>
                </div>

                {/* Read More */}
                <button className="flex items-center space-x-2 text-teal-600 font-semibold group-hover:text-teal-700">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
