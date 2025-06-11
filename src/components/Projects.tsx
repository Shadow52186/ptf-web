"use client";
import React, { useState, useEffect, useRef } from "react";

// External Link Icon as SVG
const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17l9.2-9.2M17 17V7h-10"/>
  </svg>
);

// GitHub Icon
const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

// Globe Icon
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const projects = [
  {
    title: "RS-SHOP",
    desc: "A game account marketplace with secure login, payment system, and admin dashboard.",
    link: "https://www.rs-shop.site/",
    type: "web",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-blue-500 to-cyan-500",
    status: "Live"
  },
  {
    title: "Lost Memories (Roblox)",
    desc: "A psychological story-driven game for NSC, featuring AI NPCs and puzzle mechanics.",
    link: "404",
    type: "game",
    tech: ["Roblox Studio", "Lua", "AI", "Game Design"],
    gradient: "from-purple-500 to-pink-500",
    status: "Published"
  },
  {
    title: "AI Speech Transcriber",
    desc: "A speech-to-text web app using Whisper, optimized for Thai language meetings.",
    link: "404",
    type: "github",
    tech: ["Python", "Whisper", "FastAPI", "React"],
    gradient: "from-green-500 to-emerald-500",
    status: "Open Source"
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
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

  const getProjectIcon = (type) => {
    switch (type) {
      case 'github':
        return <GithubIcon />;
      case 'game':
        return <GlobeIcon />;
      default:
        return <GlobeIcon />;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative px-6 py-20 text-center overflow-hidden" 
      id="projects"
    >
      {/* Background animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px',
               transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
             }}>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `translate(${mousePosition.x * (i + 1) * 15}px, ${mousePosition.y * (i + 1) * 15}px) rotate(${Date.now() * 0.001 + i}rad)`,
              animation: `float ${4 + i}s ease-in-out infinite`
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
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
        }}
      >
        <div className="relative inline-block mb-4">
          <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
            Portfolio
          </span>
          <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-transform duration-1000 delay-500 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
        </div>
        
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          My 
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Projects</span>
        </h3>
        
        <p className={`text-gray-400 mb-12 max-w-2xl mx-auto text-lg transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Explore some of the projects I've built and contributed to, showcasing my technical skills and creativity.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`group relative bg-gradient-to-br from-black/60 to-gray-900/60 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-lg transition-all duration-700 hover:border-white/20 hover:shadow-2xl cursor-pointer text-left overflow-hidden ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-20 opacity-0'
            }`}
            style={{
              transitionDelay: `${600 + i * 150}ms`,
              transform: `translate(${mousePosition.x * (i % 2 === 0 ? 6 : -6)}px, ${mousePosition.y * (i % 2 === 0 ? 6 : -6)}px) ${
                isVisible ? 'translateY(0)' : 'translateY(80px)'
              }`
            }}
            onMouseEnter={() => setHoveredProject(i)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Gradient background overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
            
            {/* Animated border */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
            
            {/* Status badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white opacity-80`}>
              {project.status}
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Project icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${project.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center">
                  <div className={`bg-gradient-to-br ${project.gradient} bg-clip-text text-transparent`}>
                    {getProjectIcon(project.type)}
                  </div>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h4>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {project.desc}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-2 py-1 text-xs font-medium rounded-lg bg-gradient-to-r ${project.gradient} bg-opacity-20 text-white/70 backdrop-blur-sm border border-white/10`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25`}
              >
                <span>View Project</span>
                <ExternalLinkIcon />
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
              </a>

              {/* Hover line indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform origin-left transition-transform duration-300 ${
                hoveredProject === i ? 'scale-x-100' : 'scale-x-0'
              } rounded-full`}></div>
            </div>

            {/* Floating particles on hover */}
            {hoveredProject === i && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, j) => (
                  <div
                    key={j}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${project.gradient} rounded-full`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${j * 0.1}s`,
                      animation: 'ping 1.5s ease-in-out infinite'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div 
        className={`mt-16 transition-all duration-1000 delay-1200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
        }}
      >
        <a
          href="https://github.com/Shadow52186"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
        >
          <GithubIcon />
          <span>View All Projects on GitHub</span>
          <ExternalLinkIcon />
          
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Projects;