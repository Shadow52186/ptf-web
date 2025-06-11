// components/NavBar.tsx (ต้องเป็น .tsx ไม่ใช่ .jsx)
"use client";
import React, { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);

      // Update active section based on scroll position
      const sections = ["home", "features", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#features", id: "features" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // เอา TypeScript type annotations ออก เพื่อใช้กับ .jsx ได้
  const handleNavClick = (href, id) => {
    setActiveSection(id);
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20" 
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home", "home");
              }}
              className="group flex items-center space-x-2"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
              <span className="hidden sm:block text-white font-bold text-xl group-hover:text-blue-400 transition-colors">
                Tinnapat
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                    activeSection === item.id
                      ? "text-blue-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-transform duration-300 ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0"
                  }`}></div>
                  
                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#projects", "projects");
              }}
              className="group relative px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact", "contact");
              }}
              className="group relative px-6 py-2 text-sm font-semibold text-blue-400 border-2 border-blue-400 rounded-full hover:bg-blue-400/10 hover:border-blue-300 hover:text-blue-300 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group relative w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 flex flex-col justify-center items-center hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300"
            >
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 my-1 ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-black/50 backdrop-blur-lg rounded-b-2xl border-x border-b border-white/10 mt-2">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  {item.name}
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </a>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#projects", "projects");
                }}
                className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                View Work
              </a>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contact", "contact");
                }}
                className="block w-full text-center px-4 py-3 text-sm font-semibold text-blue-400 border-2 border-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// ใช้ default export
export default NavBar;