"use client";
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import CanvasRain from "../components/CanvasRain";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import NavBar from "../components/NavBar";
import IntroScreen from "../components/IntroScreen";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  if (typeof window !== 'undefined') {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (hasSeenIntro === "true") {
      setShowIntro(false);
    }

    setIsLoaded(true);

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && showIntro) {
        handleEnterPortfolio();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }
}, []);


  const handleEnterPortfolio = () => {
  sessionStorage.setItem("hasSeenIntro", "true");
  setShowIntro(false);
};

  // Loading state
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-400"></div>
          <p className="text-purple-200 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Introduction Screen - Always shown first */}
      {showIntro && <IntroScreen onEnter={handleEnterPortfolio} />}

      {/* Main Website */}
      <main className={`relative overflow-hidden bg-black text-white font-sans transition-all duration-1000 ${
        showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <CanvasRain />

        {/* NavBar Component */}
        <NavBar />

        {/* Content with proper IDs for navigation */}
        <div className="relative pt-24">
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>

          {/* Features Section */}
          <section id="features">
            <Features />
          </section>

          {/* Projects Section */}
          <section id="projects">
            <Projects />
          </section>

          {/* Contact Section */}
          <section id="contact">
            <Contact />
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}