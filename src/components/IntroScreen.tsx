"use client";
import React, { useState, useEffect, useMemo } from "react";

const IntroScreen = ({ onEnter }: { onEnter: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // ✅ Fix: Move introTexts to useMemo to prevent dependency warnings
  const introTexts = useMemo(() => [
    "Hello! I'm Tinnapat Saelee",
    "17 years old, Grade 12 student",
    "Full-Stack Developer",
    "Welcome to my Portfolio"
  ], []);

  useEffect(() => {
    setIsVisible(true);
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    // Prevent scroll on wheel event
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    // Prevent scroll on touch events
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    // Prevent scroll on keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ✅ Fix: Add introTexts to dependency array
  useEffect(() => {
    if (textIndex < introTexts.length) {
      const currentText = introTexts[textIndex];
      let charIndex = 0;
      
      const typeText = () => {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, 80);
        } else {
          setTimeout(() => {
            if (textIndex < introTexts.length - 1) {
              setTextIndex(textIndex + 1);
              setDisplayText("");
            }
          }, 1000);
        }
      };
      
      setTimeout(typeText, 300);
    }
  }, [textIndex, introTexts]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 relative w-screen h-screen ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ 
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #16213e 35%, #0f051d 100%)'
    }}>
      {/* Animated Space Nebula */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div 
          className="absolute opacity-15 transition-transform duration-700 ease-out"
          style={{
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%',
            background: `
              radial-gradient(circle at 20% 30%, rgba(156, 39, 176, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(103, 58, 183, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 70%, rgba(142, 36, 170, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(74, 20, 140, 0.3) 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px) rotate(${Date.now() * 0.00002}rad)`,
            animation: 'nebula-float 30s ease-in-out infinite alternate'
          }}
        />
      </div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div 
          className="absolute inset-0 opacity-8 transition-transform duration-500 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(rgba(156, 39, 176, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(156, 39, 176, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 6}px)`,
            width: '120%',
            height: '120%',
            left: '-10%',
            top: '-10%'
          }}
        />
        
        {/* Secondary tech grid */}
        <div 
          className="absolute inset-0 opacity-4 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(rgba(103, 58, 183, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(103, 58, 183, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
            width: '120%',
            height: '120%',
            left: '-10%',
            top: '-10%'
          }}
        />
      </div>

      {/* Floating Space Objects */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        {[...Array(12)].map((_, i) => (
          <div
            key={`space-object-${i}`}
            className="absolute opacity-25 transition-transform duration-1000 ease-out"
            style={{
              width: `${25 + (i % 4) * 12}px`,
              height: `${25 + (i % 4) * 12}px`,
              background: i % 3 === 0 
                ? `conic-gradient(from ${i * 45}deg, #9c27b0, #673ab7, #3f51b5, #9c27b0)`
                : `linear-gradient(${i * 60}deg, rgba(156, 39, 176, 0.7), rgba(103, 58, 183, 0.5))`,
              left: `${8 + (i % 4) * 20}%`,
              top: `${8 + Math.floor(i / 4) * 28}%`,
              transform: `
                translate(${mousePosition.x * (i + 1) * 4}px, ${mousePosition.y * (i + 1) * 4}px) 
                rotate(${i * 24 + mousePosition.x * 10 + Date.now() * 0.00005}deg)
              `,
              borderRadius: i % 2 === 0 ? '50%' : '15%',
              boxShadow: `0 0 25px ${['#9c27b0', '#673ab7', '#3f51b5'][i % 3]}`,
              border: i % 4 === 0 ? '1px solid rgba(156, 39, 176, 0.2)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Animated Tech Lines */}
      <div className="absolute inset-0 pointer-events-none w-full h-full">
        {[...Array(6)].map((_, i) => (
          <div
            key={`tech-line-${i}`}
            className="absolute opacity-12 transition-transform duration-800 ease-out"
            style={{
              width: i % 2 === 0 ? '1px' : '100%',
              height: i % 2 === 0 ? '120%' : '1px',
              background: `linear-gradient(${i % 2 === 0 ? 'to bottom' : 'to right'}, 
                transparent, 
                ${['#9c27b0', '#673ab7', '#3f51b5'][i % 3]}, 
                transparent)`,
              left: i % 2 === 0 ? `${20 + i * 12}%` : '0%',
              top: i % 2 === 0 ? '-10%' : `${15 + i * 12}%`,
              transform: i % 2 === 0 
                ? `translateX(${mousePosition.x * (i + 1) * 2}px) rotate(${mousePosition.y * 1}deg)`
                : `translateY(${mousePosition.y * (i + 1) * 2}px) rotate(${mousePosition.x * 1}deg)`,
              transformOrigin: 'center center'
            }}
          />
        ))}
      </div>

      {/* Pulsating Orbs */}
      <div className="absolute inset-0 overflow-hidden w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full opacity-15 transition-transform duration-1000 ease-out"
            style={{
              width: `${60 + i * 25}px`,
              height: `${60 + i * 25}px`,
              background: `radial-gradient(circle, 
                ${['rgba(156, 39, 176, 0.3)', 'rgba(103, 58, 183, 0.3)', 'rgba(63, 81, 181, 0.3)'][i % 3]} 0%, 
                transparent 70%)`,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 3}px, ${mousePosition.y * (i + 1) * 3}px)`,
              animation: `pulse-orb ${4 + i * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div 
        className="text-center relative z-20 max-w-4xl px-6"
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
        }}
      >
        {/* Profile Image/Avatar */}
        <div className="mb-8">
          <div 
            className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 p-1 animate-pulse"
            style={{
              transform: `rotate(${mousePosition.x * 10}deg) scale(${1 + Math.abs(mousePosition.y) * 0.1})`,
              boxShadow: '0 0 40px rgba(156, 39, 176, 0.6), 0 0 80px rgba(103, 58, 183, 0.4)'
            }}
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
          </div>
        </div>

        {/* Typing Text */}
        <div className="mb-12 h-40 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 min-h-[4rem] flex items-center justify-center"
              style={{ textShadow: '0 0 20px rgba(156, 39, 176, 0.8)' }}>
            {displayText}
            <span className="animate-ping ml-2" style={{ color: '#9c27b0' }}>|</span>
          </h1>
          
          <p 
            className="text-purple-200 text-lg md:text-xl opacity-80"
            style={{
              transform: `translateY(${mousePosition.y * 3}px)`,
              textShadow: '0 0 15px rgba(103, 58, 183, 0.6)'
            }}
          >
            Crafting digital experiences with modern technologies
          </p>
        </div>

        {/* Enter Button - แสดงทันที */}
        <div className="animate-fade-in">
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-semibold rounded-full hover:scale-110 transition-all duration-300 overflow-hidden border border-purple-400/30"
            style={{ 
              boxShadow: '0 0 40px rgba(156, 39, 176, 0.6), 0 0 80px rgba(103, 58, 183, 0.3)',
              transform: `translateY(${mousePosition.y * 2}px)`
            }}
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-lg">Enter Portfolio</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          {/* Alternative Skip Text */}
          <p className="mt-6 text-purple-300 text-sm">
            or press <kbd className="px-2 py-1 bg-purple-900/50 border border-purple-500/30 rounded text-xs">Enter</kbd> to continue
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes nebula-float {
          0% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(15px, -10px) rotate(120deg) scale(1.05);
          }
          66% {
            transform: translate(-10px, 15px) rotate(240deg) scale(0.95);
          }
          100% {
            transform: translate(5px, -5px) rotate(360deg) scale(1);
          }
        }
        
        @keyframes pulse-orb {
          0% {
            transform: scale(1) translateY(0px);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1) translateY(-5px);
            opacity: 0.25;
          }
          100% {
            transform: scale(1) translateY(0px);
            opacity: 0.15;
          }
        }
        
        @keyframes star-drift {
          0% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(1px) translateY(-0.5px);
          }
          50% {
            transform: translateX(0px) translateY(-1px);
          }
          75% {
            transform: translateX(-1px) translateY(-0.5px);
          }
          100% {
            transform: translateX(0px) translateY(0px);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;