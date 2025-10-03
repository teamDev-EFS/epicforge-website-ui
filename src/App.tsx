import React, { useEffect } from 'react';
import './lib/i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Team from './components/Team';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

function App() {
  useEffect(() => {
    // Smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <About />
      <Team />
      <ContactForm />
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;