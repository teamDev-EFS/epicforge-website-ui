import React, { useEffect } from 'react';
import './lib/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Portfolio from './components/Portfolio';
import TechStack from './components/TechStack';
import About from './components/About';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Portfolio />
      <TechStack />
      <About />
      <Team />
      <ContactForm />
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;