import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import TechBanner from "../components/TechBanner";
import Portfolio from "../components/Portfolio";
import Team from "../components/Team";
import ContactForm from "../components/ContactForm";

const HomePage: React.FC = () => {
  const faqs = [
    {
      question: "What services does EpicForge Software provide?",
      answer:
        "We provide AI-driven website development, IT solutions, enterprise automation, AI SEO optimization, voice assistants, chatbots, and custom software development services.",
    },
    {
      question: "How can AI SEO help my business rank on ChatGPT and Google?",
      answer:
        "Our AI SEO service optimizes your content for both traditional search engines and Large Language Models (LLMs) like ChatGPT. We use structured data, conversational content formats, and advanced schema markup to ensure your brand appears in AI-generated search results.",
    },
    {
      question:
        "What makes EpicForge Software different from other IT companies?",
      answer:
        "We combine cutting-edge AI technology with proven development practices. Our solutions have helped clients achieve 350% traffic growth, automate 85% of workflows, and rank on both Google and AI platforms like ChatGPT.",
    },
  ];

  const reviews = [
    {
      author: "John Smith",
      rating: 5,
      datePublished: "2024-01-15",
      reviewBody:
        "EpicForge transformed our online presence with their AI SEO strategy. We've seen a 350% increase in organic traffic!",
    },
    {
      author: "Sarah Johnson",
      rating: 5,
      datePublished: "2024-02-20",
      reviewBody:
        "The automation solutions they built saved us countless hours. Truly innovative work!",
    },
  ];

  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <TechBanner />
      <section id="portfolio-preview" className="py-20">
        <Portfolio />
      </section>
      <section id="team-preview">
        <Team />
      </section>
      <section id="contact">
        <ContactForm />
      </section>
    </main>
  );
};

export default HomePage;
