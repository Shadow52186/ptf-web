"use client";
import React, { useState, useEffect, useMemo } from "react";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const fullText = "TINNAPAT SAELEE";
  
  // ✅ Fix: Move titles to useMemo to prevent dependency warnings
  const titles = useMemo(() => [
    "Full-Stack Developer",
    "UI/UX Designer", 
    "Creative Coder",
    "Problem Solver"
  ], []);
  
  const [currentTitle, setCurrentTitle] = useState(0);
  const [titleText, setTitleText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);

  // Typing animation for name
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, fullText]);

  // ✅ Fix: Add titles to dependency array
  useEffect(() => {
    if (!isTyping) {
      const currentTitleText = titles[currentTitle];
      
      if (titleIndex < currentTitleText.length) {
        const timeout = setTimeout(() => {
          setTitleText(currentTitleText.slice(0, titleIndex + 1));
          setTitleIndex(titleIndex + 1);
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Wait then switch to next title
        const timeout = setTimeout(() => {
          setTitleIndex(0);
          setTitleText("");
          setCurrentTitle((prev) => (prev + 1) % titles.length);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [titleIndex, currentTitle, titles, isTyping]);

  // ✅ Fix: Intersection Observer with proper cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const heroElement = document.getElementById('hero-section');
    const currentElement = heroElement; // Copy ref to variable
    
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial size
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      id="hero-section"
      className="h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden"
    >
      {/* Floating elements with subtle tech colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full opacity-30 transition-transform duration-1000 ease-out
              ${isVisible ? 'animate-bounce' : ''}`}
            style={{
              background: [
                '#00d4ff', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#3b82f6'
              ][i % 6],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
              boxShadow: `0 0 15px ${[
                '#00d4ff', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#3b82f6'
              ][i % 6]}`,
              transform: `translate(${mousePosition.x * (i + 1) * (!isMobile ? 2 : 0.5)}px, ${mousePosition.y * (i + 1) * (!isMobile ? 2 : 0.5)}px) translateY(${Math.sin(Date.now() * 0.001 + i) * (!isMobile ? 10 : 5)}px)`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div 
        className={`text-center transition-all duration-1000 transform pt-16 md:pt-0 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          transform: `translate(${mousePosition.x * (!isMobile ? 8 : 2)}px, ${mousePosition.y * (!isMobile ? 8 : 2)}px) ${
            isVisible ? 'translateY(0)' : 'translateY(40px)'
          }`
        }}
      >
        
        {/* Enhanced name with subtle tech accent */}
        <div 
          className="relative mb-4 md:mb-6"
          style={{
            transform: `translate(${mousePosition.x * (!isMobile ? 5 : 2)}px, ${mousePosition.y * (!isMobile ? 5 : 2)}px) rotate(${mousePosition.x * (!isMobile ? 0.5 : 0.2)}deg)`
          }}
        >
          <h1 className={`text-2xl sm:text-3xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-lg mb-2 md:mb-3 transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
          }`}
          style={{
            textShadow: '0 0 30px rgba(0, 212, 255, 0.3)'
          }}>
            {displayText}
            <span className={`inline-block w-0.5 h-6 sm:h-8 md:h-18 lg:h-20 bg-cyan-400 ml-1 md:ml-2 ${
              currentIndex >= fullText.length ? 'animate-pulse' : 'animate-ping'
            }`}
            style={{
              boxShadow: '0 0 20px #00d4ff'
            }} />
          </h1>
          
          {/* Subtle glowing effect */}
          <div className={`absolute inset-0 text-2xl sm:text-3xl md:text-7xl lg:text-8xl font-bold text-cyan-300 opacity-20 blur-sm transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-20' : '-translate-y-20 opacity-0'
          }`}>
            {displayText}
          </div>
        </div>

        {/* Enhanced title with tech accent */}
        <div 
          className="h-6 sm:h-8 mb-4 md:mb-8"
          style={{
            transform: `translate(${mousePosition.x * (!isMobile ? 3 : 1)}px, ${mousePosition.y * (!isMobile ? 3 : 1)}px)`
          }}
        >
          <p className={`text-cyan-300 text-sm sm:text-base md:text-2xl lg:text-3xl font-medium transition-all duration-1000 delay-300 ${
            !isTyping && isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
          style={{
            textShadow: '0 0 20px rgba(0, 212, 255, 0.4)'
          }}>
            {titleText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* Enhanced description */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
          }`}
          style={{
            transform: `translate(${mousePosition.x * (!isMobile ? 4 : 1)}px, ${mousePosition.y * (!isMobile ? 4 : 1)}px)`
          }}
        >
          <p className="text-gray-300 text-xs sm:text-sm md:text-xl lg:text-2xl mb-6 md:mb-10 max-w-xs sm:max-w-lg md:max-w-3xl mx-auto leading-relaxed px-2 md:px-0"
             style={{
               textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
             }}>
            Crafting digital experiences with modern technologies and creative solutions. 
            Let&apos;s build something <span className="text-cyan-300 font-semibold">amazing</span> together.
          </p>
        </div>

        {/* Experience Cards with minimal tech enhancement */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto px-2 md:px-0 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Years of Experience */}
          <div 
            className={`relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg md:rounded-2xl p-3 md:p-6 hover:border-cyan-400/50 transition-all duration-1000 delay-800 hover:shadow-lg ${
              isVisible ? '-translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
              transform: `translate(${mousePosition.x * (!isMobile ? 3 : 0.5)}px, ${mousePosition.y * (!isMobile ? 3 : 0.5)}px) rotate(${Math.sin(Date.now() * 0.001) * (!isMobile ? 0.3 : 0.1)}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-cyan-400 mb-1 md:mb-2"
                   style={{ textShadow: '0 0 15px rgba(0, 212, 255, 0.5)' }}>2+</div>
              <div className="text-white font-semibold mb-0.5 md:mb-1 text-xs md:text-base">Years</div>
              <div className="text-gray-400 text-xs md:text-sm">Experience</div>
            </div>
          </div>

          {/* Projects Completed */}
          <div 
            className={`relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-indigo-500/30 rounded-lg md:rounded-2xl p-3 md:p-6 hover:border-indigo-400/50 transition-all duration-1000 delay-900 hover:shadow-lg ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)',
              transform: `translate(${mousePosition.x * (!isMobile ? 2 : 0.5)}px, ${mousePosition.y * (!isMobile ? 2 : 0.5)}px) rotate(${Math.sin(Date.now() * 0.001 + 1) * (!isMobile ? 0.3 : 0.1)}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-indigo-400 mb-1 md:mb-2"
                   style={{ textShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}>15+</div>
              <div className="text-white font-semibold mb-0.5 md:mb-1 text-xs md:text-base">Projects</div>
              <div className="text-gray-400 text-xs md:text-sm">Completed</div>
            </div>
          </div>

          {/* Technologies */}
          <div 
            className={`relative bg-gradient-to-br from-emerald-900/30 to-blue-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-lg md:rounded-2xl p-3 md:p-6 hover:border-emerald-400/50 transition-all duration-1000 delay-1000 hover:shadow-lg sm:col-span-2 md:col-span-1 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
            style={{
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)',
              transform: `translate(${mousePosition.x * (!isMobile ? 4 : 0.5)}px, ${mousePosition.y * (!isMobile ? 4 : 0.5)}px) rotate(${Math.sin(Date.now() * 0.001 + 2) * (!isMobile ? 0.3 : 0.1)}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-4xl font-bold text-emerald-400 mb-1 md:mb-2"
                   style={{ textShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }}>10+</div>
              <div className="text-white font-semibold mb-0.5 md:mb-1 text-xs md:text-base">Technologies</div>
              <div className="text-gray-400 text-xs md:text-sm">Mastered</div>
            </div>
          </div>
        </div>

        {/* Action Area with minimal enhancement */}
        <div 
          className={`flex flex-col items-center gap-3 md:gap-6 mt-4 md:mt-8 px-2 md:px-0 transition-all duration-1000 delay-1100 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-15 opacity-0'
          }`}
          style={{
            transform: `translate(${mousePosition.x * (!isMobile ? 4 : 1)}px, ${mousePosition.y * (!isMobile ? 4 : 1)}px)`
          }}
        >
          {/* Quick Links with subtle tech accents */}
          <div 
            className="flex flex-wrap justify-center gap-2 md:gap-4 text-gray-400"
            style={{
              transform: `translate(${mousePosition.x * (!isMobile ? 2 : 0.5)}px, ${mousePosition.y * (!isMobile ? 2 : 0.5)}px)`
            }}
          >
            <a href="#projects" className="flex items-center gap-1 md:gap-2 hover:text-cyan-400 transition-colors group text-xs md:text-sm"
               style={{ transform: `translate(${mousePosition.x * (!isMobile ? 1 : 0)}px, ${mousePosition.y * (!isMobile ? 1 : 0)}px)` }}>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-400 rounded-full group-hover:animate-pulse"
                   style={{ boxShadow: '0 0 8px #00d4ff' }}></div>
              <span>Portfolio</span>
            </a>
            <span className="text-gray-600 text-xs md:text-sm">•</span>
            <a href="#about" className="flex items-center gap-1 md:gap-2 hover:text-indigo-400 transition-colors group text-xs md:text-sm"
               style={{ transform: `translate(${mousePosition.x * (!isMobile ? 1 : 0)}px, ${mousePosition.y * (!isMobile ? 1 : 0)}px)` }}>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-400 rounded-full group-hover:animate-pulse"
                   style={{ boxShadow: '0 0 8px #6366f1' }}></div>
              <span>About Me</span>
            </a>
            <span className="text-gray-600 text-xs md:text-sm">•</span>
            <a href="#skills" className="flex items-center gap-1 md:gap-2 hover:text-emerald-400 transition-colors group text-xs md:text-sm"
               style={{ transform: `translate(${mousePosition.x * (!isMobile ? 1 : 0)}px, ${mousePosition.y * (!isMobile ? 1 : 0)}px)` }}>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full group-hover:animate-pulse"
                   style={{ boxShadow: '0 0 8px #10b981' }}></div>
              <span>Skills</span>
            </a>
            <span className="text-gray-600 text-xs md:text-sm">•</span>
            <a href="#contact" className="flex items-center gap-1 md:gap-2 hover:text-orange-400 transition-colors group text-xs md:text-sm"
               style={{ transform: `translate(${mousePosition.x * (!isMobile ? 1 : 0)}px, ${mousePosition.y * (!isMobile ? 1 : 0)}px)` }}>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-400 rounded-full group-hover:animate-pulse"
                   style={{ boxShadow: '0 0 8px #f97316' }}></div>
              <span>Contact</span>
            </a>
          </div>

         {/* Social Connect with subtle enhancement */}
          <div 
            className="flex items-center gap-3 md:gap-4"
            style={{
              transform: `translate(${mousePosition.x * (!isMobile ? 3 : 1)}px, ${mousePosition.y * (!isMobile ? 3 : 1)}px)`
            }}
          >
            <span className="text-gray-400 text-xs md:text-sm"
                  style={{ transform: `translate(${mousePosition.x * (!isMobile ? 2 : 0.5)}px, ${mousePosition.y * (!isMobile ? 2 : 0.5)}px)` }}>Connect with me</span>
            <div className="flex gap-2 md:gap-3"
                 style={{ transform: `translate(${mousePosition.x * (!isMobile ? 3 : 1)}px, ${mousePosition.y * (!isMobile ? 3 : 1)}px)` }}>
              
              {/* Instagram */}
              <a href="https://www.instagram.com/quax.tix/" className="group relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-600/20 to-orange-600/20 backdrop-blur-sm border border-pink-500/30 rounded-full flex items-center justify-center hover:border-pink-400 transition-all duration-300 hover:scale-110"
                 style={{ boxShadow: '0 0 15px rgba(236, 72, 153, 0.2)' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-pink-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div className="absolute inset-0 bg-pink-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              
              {/* Facebook */}
              <a href="https://www.facebook.com/eurotinnapat.saelee" className="group relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-500/30 rounded-full flex items-center justify-center hover:border-blue-400 transition-all duration-300 hover:scale-110"
                 style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <div className="absolute inset-0 bg-blue-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
              
              {/* Discord */}
              <a href="https://discord.gg/dE3x8jjPCC" className="group relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600/20 to-purple-800/20 backdrop-blur-sm border border-indigo-500/30 rounded-full flex items-center justify-center hover:border-indigo-400 transition-all duration-300 hover:scale-110"
                 style={{ boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)' }}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <div className="absolute inset-0 bg-indigo-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator with subtle enhancement */}
      <div 
        className={`absolute bottom-6 md:bottom-8 left-1/2 transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          transform: `translate(-50%, ${isMobile ? '0px' : `${mousePosition.y * 2}px`})`
        }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-xs md:text-sm mb-1 md:mb-2">Scroll down</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-cyan-400/50 rounded-full flex justify-center"
               style={{ boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' }}>
            <div className="w-0.5 h-2 md:w-1 md:h-3 bg-cyan-400 rounded-full mt-1 md:mt-2 animate-bounce"
                 style={{ boxShadow: '0 0 8px #00d4ff' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;