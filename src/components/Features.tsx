"use client";
import React, { useState, useEffect, useRef } from "react";

// Icons as SVG components
const Code2Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="13,17 18,12 13,7"></polyline>
    <polyline points="11,17 6,12 11,7"></polyline>
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
  </svg>
);

const BrushIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path>
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path>
  </svg>
);

const FigmaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path>
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path>
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path>
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path>
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21h6"></path>
    <path d="M12 3a6 6 0 0 0-6 6c0 1 .2 2 .6 2.8L9 15h6l2.4-3.2c.4-.8.6-1.8.6-2.8a6 6 0 0 0-6-6Z"></path>
    <path d="M9 18h6"></path>
  </svg>
);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const features = [
  { 
    icon: <Code2Icon />, 
    title: "Web Development", 
    desc: "Building modern, responsive websites using React & Next.js.",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: <FigmaIcon />, 
    title: "UI/UX Design", 
    desc: "Designing intuitive and beautiful user interfaces.",
    color: "from-purple-500 to-pink-500"
  },
  { 
    icon: <RocketIcon />, 
    title: "Performance", 
    desc: "Optimizing performance for smooth and fast experiences.",
    color: "from-orange-500 to-red-500"
  },
  { 
    icon: <BrushIcon />, 
    title: "Styling", 
    desc: "Tailwind CSS, animations, glassmorphism and more.",
    color: "from-green-500 to-emerald-500"
  },
  { 
    icon: <LightbulbIcon />, 
    title: "Creative Thinking", 
    desc: "Turning ideas into elegant digital solutions.",
    color: "from-yellow-500 to-orange-500"
  },
  { 
    icon: <GithubIcon />, 
    title: "Version Control", 
    desc: "Using Git & GitHub to manage code and collaborate.",
    color: "from-gray-500 to-slate-500"
  },
];

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Fix: Intersection Observer with proper cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentRef = sectionRef.current; // Copy ref to variable

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative px-6 py-20 text-center overflow-hidden" 
      id="features"
    >
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
              transform: `translate(${mousePosition.x * (i + 1) * 10}px, ${mousePosition.y * (i + 1) * 10}px)`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div 
        className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      >
        <div className="relative inline-block mb-4">
          <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
            My Expertise
          </span>
          <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-transform duration-1000 delay-500 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
        </div>
        
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          What I 
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Do</span>
        </h3>
        
        <p className={`text-gray-400 mb-12 max-w-2xl mx-auto text-lg transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Here&apos;s what I bring to every project I work on, combining creativity with technical expertise.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`group relative bg-gradient-to-br from-black/50 to-gray-900/50 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}
            style={{
              transitionDelay: `${600 + i * 100}ms`,
              transform: `translate(${mousePosition.x * (i % 2 === 0 ? 5 : -5)}px, ${mousePosition.y * (i % 2 === 0 ? 5 : -5)}px) ${
                isVisible ? 'translateY(0)' : 'translateY(80px)'
              }`
            }}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
            
            {/* Glowing border effect */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-black/80 rounded-2xl flex items-center justify-center">
                  <div className={`text-2xl bg-gradient-to-br ${feature.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h4>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.desc}
              </p>

              {/* Hover indicator */}
              <div className={`absolute -bottom-2 left-6 right-6 h-1 bg-gradient-to-r ${feature.color} transform origin-left transition-transform duration-300 ${
                hoveredCard === i ? 'scale-x-100' : 'scale-x-0'
              } rounded-full`}></div>
            </div>

            {/* Floating particles on hover */}
            {hoveredCard === i && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${j * 0.2}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom decoration */}
      <div 
        className={`mt-16 flex justify-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
        }}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;