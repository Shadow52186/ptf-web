"use client";
import React, { useState, useEffect, useRef } from "react";

// Icons as SVG components
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22,2 15,22 11,13 2,9"></polygon>
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Simple form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all fields');
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Use EmailJS to send email
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_303p0ge', // Your EmailJS service ID
          template_id: 'template_ldeu0iv', // Your EmailJS template ID
          user_id: 'SkqtcmzvI9RZ_MirA', // Your EmailJS public key
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            to_email: 'tinnapat.ts@gmail.com',
            message: formData.message,
            reply_to: formData.email,
            subject: `New Contact Message from ${formData.name}`
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MailIcon />,
      title: "Email",
      info: "tinnapat.ts@gmail.com",
      gradient: "from-blue-500 to-cyan-500",
      link: "mailto:tinnapat.ts@gmail.com"
    },
    {
      icon: <BriefcaseIcon />,
      title: "Contact for Work",
      info: "0936983985",
      gradient: "from-green-500 to-emerald-500",
      link: "tel:0936983985"
    },
    {
      icon: <PhoneIcon />,
      title: "Available",
      info: "Mon - Fri, 9AM - 6PM",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative px-6 py-20 text-center overflow-hidden" 
      id="contact"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `translate(${mousePosition.x * (i + 1) * 8}px, ${mousePosition.y * (i + 1) * 8}px)`,
              animation: `twinkle ${2 + i * 0.5}s ease-in-out infinite`
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
            Contact
          </span>
          <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform transition-transform duration-1000 delay-500 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`}></div>
        </div>
        
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Let&apos;s Work 
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Together</span>
        </h3>
        
        <p className={`text-gray-400 mb-12 max-w-2xl mx-auto text-lg transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Form */}
        <div 
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
          }}
        >
          <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-black/60 to-gray-900/60 p-6 rounded-3xl backdrop-blur-lg border border-white/10 text-left shadow-2xl hover:border-white/20 transition-all duration-500">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
            
            <div className="relative z-10">
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center animate-fadeIn">
                  ✅ Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center animate-fadeIn">
                  ❌ Failed to send message. Please try again or contact me directly at tinnapat.ts@gmail.com
                </div>
              )}

              {/* Name Field */}
              <div className="relative mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  className={`w-full p-4 rounded-xl bg-black/40 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    focusedField === 'name' 
                      ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'name' ? 'opacity-100' : ''
                }`}></div>
              </div>

              {/* Email Field */}
              <div className="relative mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  className={`w-full p-4 rounded-xl bg-black/40 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm ${
                    focusedField === 'email' 
                      ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'email' ? 'opacity-100' : ''
                }`}></div>
              </div>

              {/* Message Field */}
              <div className="relative mb-4">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={6}
                  value={formData.message}
                  className={`w-full p-4 rounded-xl bg-black/40 border-2 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none backdrop-blur-sm resize-none ${
                    focusedField === 'message' 
                      ? 'border-blue-400 shadow-lg shadow-blue-400/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                  focusedField === 'message' ? 'opacity-100' : ''
                }`}></div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden mb-4"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <SendIcon />
                    </>
                  )}
                </span>
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transform scale-0 group-hover:scale-100 transition-all duration-300 rounded-xl"></div>
                
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* EmailJS Setup Information */}
              <div className="text-xs text-gray-500 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p>📧 Feel free to contact me via email for professional inquiries</p>
              </div>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div 
          className={`transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
          style={{
            transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`
          }}
        >
          <div className="space-y-6">
            <div className="text-left mb-8">
              <h4 className="text-2xl font-bold text-white mb-4">Get in Touch</h4>
              <p className="text-gray-400 leading-relaxed">
                Ready to start your next project? Drop me a message and let&apos;s discuss how I can help bring your vision to life.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className={`group relative bg-gradient-to-br from-black/40 to-gray-900/40 p-5 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-lg ${
                    info.link ? 'cursor-pointer' : ''
                  } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{
                    transitionDelay: `${900 + i * 100}ms`
                  }}
                  onClick={() => info.link && window.open(info.link, '_self')}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  <div className="relative z-10 flex items-center space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center text-white">
                        {info.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h5 className="text-white font-semibold text-lg mb-1">{info.title}</h5>
                      <p className="text-gray-400 text-sm">{info.info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Contact;