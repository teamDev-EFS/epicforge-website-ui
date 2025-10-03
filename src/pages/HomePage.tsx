import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import ContactForm from '../components/ContactForm';

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <section id="portfolio-preview" className="py-20 bg-slate-900">
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
