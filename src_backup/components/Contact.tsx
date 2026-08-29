import React, { useRef, useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Download, Loader2, ArrowUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useScroll } from './ScrollContainer';

// Resume accordion/modal removed — simplified to a single resume button below.

export const Contact: React.FC = () => {
  const { scrollToSection } = useScroll();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    if (!formRef.current) return;

    // EmailJS credentials lookup
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
      // Elegant warning instead of a crash, prompting them to set env variables
      setStatus({
        type: 'error',
        message: 'Telemetry keys offline. Please configure VITE_EMAILJS service, template, and public key variables inside your .env configuration.'
      });
      setIsLoading(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus({
          type: 'success',
          message: 'Message transmitted successfully.'
        });
        formRef.current?.reset();
      }, (error) => {
        setStatus({
          type: 'error',
          message: `Transmission failure: ${error.text || 'Unknown Error'}. Please retry.`
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-10 relative z-10 text-gray-100 select-none">
      
      {/* Top spacing helper */}
      <div className="h-16" />

      {/* Main Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto z-10 items-center">
        
        {/* Left Side: Telemetry / Coordinates Data */}
        <div className="lg:col-span-5 flex flex-col text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-3"
          >
            04. Ending Scene
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans heading-premium"
          >
            Get In Touch
          </motion.h2>

          {/* Telemetry coordinate details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 mb-8 text-xs sm:text-sm text-gray-400 font-light max-w-md mx-auto lg:mx-0"
          >
            {/* Email block */}
            <div className="group glass-panel p-4 rounded-xl flex items-center gap-4 border border-white/10 bg-white/[0.02] hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="p-2 bg-white/5 rounded-lg text-white/60 group-hover:text-white transition-colors duration-300">
                <Mail size={16} />
              </div>
              <div className="text-left font-mono">
                <p className="text-[9px] uppercase tracking-widest text-gray-500">EMAIL CHANNEL</p>
                <a href="mailto:ashoksriivassivakiran.143@gmail.com" className="text-gray-300 hover:text-white transition-colors block text-[11px] sm:text-xs">
                  ashoksriivassivakiran.143@gmail.com
                </a>
              </div>
            </div>

            {/* Phone block */}
            <div className="group glass-panel p-4 rounded-xl flex items-center gap-4 border border-white/10 bg-white/[0.02] hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="p-2 bg-white/5 rounded-lg text-white/60 group-hover:text-white transition-colors duration-300">
                <Phone size={16} />
              </div>
              <div className="text-left font-mono">
                <p className="text-[9px] uppercase tracking-widest text-gray-500">VOICE MATRIX</p>
                <p className="text-gray-300 text-[11px] sm:text-xs">+91 95817 20429 / +91 99665 75468</p>
              </div>
            </div>

            {/* Geo block */}
            <div className="group glass-panel p-4 rounded-xl flex items-center gap-4 border border-white/10 bg-white/[0.02] hover:border-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.03)] transition-all duration-300">
              <div className="p-2 bg-white/5 rounded-lg text-white/60 group-hover:text-white transition-colors duration-300">
                <MapPin size={16} />
              </div>
              <div className="text-left font-mono">
                <p className="text-[9px] uppercase tracking-widest text-gray-500">COORDINATES</p>
                <p className="text-gray-300 text-[11px] sm:text-xs">East Godavari, AP, IN</p>
                <p className="text-[9px] text-gray-500 font-mono">[GEO // 16.7335° N, 82.2144° E]</p>
              </div>
            </div>
          </motion.div>

          {/* Resume button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="flex justify-center lg:justify-start"
          >
            <a
              id="resume-link"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-white/5 transition-all duration-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer font-sans"
              data-cursor-label="Resume"
            >
              <Download size={14} />
              <span><a href="https://drive.google.com/file/d/1uEC2wq-CMXKWZ6HTXe31ysjQf-h56SYw/view?usp=drive_link">View My Resume</a></span>
            </a>
          </motion.div>
        </div>

        {/* Right Side: Sleek Contact Form */}
        <div className="lg:col-span-7 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-panel p-6 sm:p-8 rounded-3xl w-full text-left relative overflow-hidden"
          >
            {/* Ambient form backlight overlay */}
            <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

            <form ref={formRef} onSubmit={sendEmail} className="space-y-4 relative z-10">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">Your Identity</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-indigo-500/30 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] focus:bg-white/[0.04] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600 font-sans relative z-10"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">Email Channel</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter your email address"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-indigo-500/30 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] focus:bg-white/[0.04] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600 font-sans relative z-10"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">Subject Matrix</label>
                <input
                  type="text"
                  name="user_subject"
                  required
                  placeholder="Enter message subject"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-indigo-500/30 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] focus:bg-white/[0.04] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600 font-sans relative z-10"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1.5 font-mono">Transmission Description</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Write a message or project brief..."
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-indigo-500/30 focus:shadow-[0_0_20px_rgba(124,58,237,0.15)] focus:bg-white/[0.04] rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none transition-all duration-300 placeholder-gray-600 h-28 resize-none font-sans relative z-10"
                />
              </div>

              {/* Status Alert */}
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3.5 rounded-xl text-xs font-light leading-snug font-mono ${
                      status.type === 'success' ? 'bg-white/5 border border-white/10 text-white' : 'bg-red-950/20 border border-red-900/30 text-red-400'
                    }`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="magnetic w-full py-3.5 luxury-btn luxury-btn-primary rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-95 shadow-md shadow-white/5"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-black" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} className="text-black" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

      </div>

      {/* Floating restart indicator */}
      <motion.button
        onClick={() => scrollToSection(0)}
        whileHover={reduceMotion ? {} : { y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10 group cursor-pointer"
      >
        <ArrowUp size={12} className="text-white/50 group-hover:text-white transition-colors duration-300" />
        <span>Return to Begin</span>
      </motion.button>

      {/* Resume preview removed — use the resume link/button above. */}

    </div>
  );
};
export default Contact;
