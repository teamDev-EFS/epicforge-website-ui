import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import ServicesShowcase from "../components/ServicesShowcase";
import ProcessSection from "../components/ProcessSection";
import TechBanner from "../components/TechBanner";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import UrgencyBanner from "../components/UrgencyBanner";
import ScheduleSection from "../components/ScheduleSection";
import FAQSection from "../components/FAQSection";
import Team from "../components/Team";
import ContactForm from "../components/ContactForm";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <ServicesShowcase />
      <ProcessSection />
      <TechBanner />
      <section id="portfolio-preview" className="py-0">
        <Portfolio />
      </section>
      <Testimonials />
      <UrgencyBanner />
      <ScheduleSection />
      <FAQSection />
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
