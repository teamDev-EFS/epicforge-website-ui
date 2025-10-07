import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Target, Eye, Award, Lightbulb, TrendingUp, Users } from "lucide-react";

// Import team member images
import adityaImage from "../assets/images/Aditya Vardhan Nagamalli.png";
import avinashImage from "../assets/images/Avinash Kumar Nagumalli.jpeg";
import harshaImage from "../assets/images/Harsha Vardhan Nagamalli.png";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const team = [
    {
      name: "ADITYA VARDHAN NAGAMALLI",
      role: "CEO | FOUNDER",
      image: adityaImage,
      bio: "Visionary leader with 10+ years in AI and enterprise solutions. Aditya founded EpicForgeSoftware with a single idea: technology should not just power businesses, it should inspire them.",
      vision: [
        "Build AI-driven products that scale globally.",
        "Transform businesses through automation & innovation.",
        "Position EpicForgeSoftware as a global IT leader.",
      ],
      mission: [
        "Deliver futuristic digital solutions that feel simple and human.",
        "Bring AI + creativity together to build trust-driven brands.",
        "Make technology a partner, not a barrier, for enterprises.",
      ],
      quote:
        "Every project we deliver is not just code it's a step closer to shaping the future of Intelligent enterprises.",
      linkedin: "https://www.linkedin.com/in/adityavardhanceo/",
    },
    {
      name: "AVINASH KUMAR NAGUMALLI",
      role: "CTO | CO-FOUNDER",
      image: avinashImage,
      bio: "Technology architect specializing in scalable AI systems and cutting-edge software development. Avinash is the backbone of EpicForge's innovation lab, turning ideas into secure, enterprise-grade platforms.",
      vision: [
        "Engineer AI products that redefine industries.",
        "Push the boundaries of scalable architecture.",
        "Build resilient ecosystems for clients worldwide.",
      ],
      mission: [
        "Ensure every product is future-proof and robust.",
        "Make AI integration seamless and business-friendly.",
        "Transform code into long-lasting business assets.",
      ],
      quote:
        "Great technology isn't just built it's engineered to inspire trust and deliver impact.",
      linkedin: "https://linkedin.com/in/avinash-kumar-nagumalli",
    },
    {
      name: "HARSHA VARDHAN NAGAMALLI",
      role: "COO | CO-FOUNDER",
      image: harshaImage,
      bio: "Operations expert driving global expansion and client success. Harsha blends strategic execution with people-first leadership, ensuring EpicForge delivers excellence across borders.",
      vision: [
        "Expand EpicForgeSoftware into a global household name.",
        "Redefine client success through measurable outcomes.",
        "Build long-term trust through flawless operations.",
      ],
      mission: [
        "Drive global partnerships with impact.",
        "Build client experiences that go beyond delivery.",
        "Align execution with the company's bold vision.",
      ],
      quote: "Client success isn't just our metric it's our identity.",
      linkedin: "https://www.linkedin.com/in/harsha-vardhan-nagamalli/",
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: t("about.innovation"),
      description: t("about.innovationText"),
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: TrendingUp,
      title: t("about.results"),
      description: t("about.resultsText"),
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Users,
      title: t("about.partnership"),
      description: t("about.partnershipText"),
      gradient: "from-orange-500 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle geometric patterns */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-50/20 to-blue-50/20 rounded-full blur-3xl" />

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-6">
              {t("about.title")}
            </h1>
            <p className="text-2xl text-slate-700 font-semibold mb-8">
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {t("about.mission")}
                </h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                {t("about.missionText")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {t("about.vision")}
                </h2>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                {t("about.visionText")}
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
            <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
              {t("about.values")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
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
            <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 mb-4">
              Meet Our Elite Leadership
            </h2>
            <p className="text-center text-slate-600 text-lg mb-16">
              World-class experts forging the future of innovation
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className="group relative flex flex-col h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500" />
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{
                          objectPosition:
                            member.name === "ADITYA VARDHAN NAGAMALLI"
                              ? "center 2%"
                              : member.name === "HARSHA VARDHAN NAGAMALLI"
                              ? "center 22%"
                              : "center 5%",
                          objectFit: "cover",
                          transform:
                            member.name === "ADITYA VARDHAN NAGAMALLI"
                              ? "scale(1.3)"
                              : "scale(1.2)",
                          transformOrigin:
                            member.name === "ADITYA VARDHAN NAGAMALLI"
                              ? "center 35%"
                              : member.name === "HARSHA VARDHAN NAGAMALLI"
                              ? "center 35%"
                              : "center 25%",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />

                      {/* Professional Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          GQ Featured
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {member.name}
                        </h3>
                        <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full mb-4 shadow-lg">
                          {member.role}
                        </div>
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {member.bio}
                        </p>
                      </div>

                      {/* Vision & Mission */}
                      <div className="space-y-4 mb-6 flex-grow">
                        {/* Vision */}
                        <div>
                          <h4 className="text-blue-600 font-semibold text-sm mb-2 flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            Vision
                          </h4>
                          <ul className="space-y-1">
                            {member.vision.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-slate-600 text-xs flex items-start"
                              >
                                <span className="text-blue-500 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mission */}
                        <div>
                          <h4 className="text-purple-600 font-semibold text-sm mb-2 flex items-center">
                            <Target className="w-4 h-4 mr-2" />
                            Mission
                          </h4>
                          <ul className="space-y-1">
                            {member.mission.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-slate-600 text-xs flex items-start"
                              >
                                <span className="text-purple-500 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="mb-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
                          <p className="text-slate-700 text-sm italic text-center">
                            "{member.quote}"
                          </p>
                        </div>
                      </div>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl border border-blue-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all font-semibold text-center group-hover:scale-105"
                      >
                        View LinkedIn Profile
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
            transition={{ duration: 0.8, delay: 2.0 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full border border-slate-200/50 shadow-lg">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-slate-900 font-semibold text-lg">
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
