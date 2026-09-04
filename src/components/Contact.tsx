import React, { useState, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, FileText, ArrowUp } from 'lucide-react';
import { VoidField } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Scroll link letter slides
  const line1X = useTransform(scrollYProgress, [0, 0.9], [-100, 0]);
  const line2X = useTransform(scrollYProgress, [0, 0.9], [100, 0]);
  const elementsScale = useTransform(scrollYProgress, [0.3, 0.95], [0.92, 1]);
  const elementsOpacity = useTransform(scrollYProgress, [0.3, 0.9], [0, 1]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:ashoksrinivassivakiran.143@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative w-full py-28 px-6 md:px-12 max-w-7xl mx-auto text-left overflow-hidden bg-[#050507]"
    >
      {/* Background ThreeUI VoidField for ambient space effect */}
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none z-0">
        <VoidField mode="dark" />
      </div>

      {/* High-Impact Statement */}
      <div className="mb-24 relative z-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse" />
          <span className="text-red-accent mr-1">05 //</span> Final Scene
        </p>

        <h2 className="text-5xl sm:text-8xl lg:text-9.5xl font-extrabold tracking-tighter text-white leading-none font-sans uppercase">
          <motion.span style={{ x: line1X }} className="block overflow-visible transform-gpu">
            LET&apos;S BUILD
          </motion.span>
          <motion.span style={{ x: line2X }} className="block mt-2 text-right lg:text-center text-red-accent overflow-visible transform-gpu">
            SOMETHING{' '}
            <em className="font-serif-italic font-normal text-white lowercase text-5xl sm:text-8xl lg:text-[7.5rem]">
              great.
            </em>
          </motion.span>
        </h2>
      </div>

      <motion.div 
        style={{ scale: elementsScale, opacity: elementsOpacity }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 transform-gpu"
      >
        {/* Left Columns - Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white font-sans mb-3">Direct Contact Channels</h3>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Available for full-time cloud engineering, DevOps automation roles, and innovative tech collaborations.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Email */}
            <a
              href="mailto:ashoksrinivassivakiran.143@gmail.com"
              className="editorial-card p-4 rounded-2xl flex items-center gap-4 group block hover:border-white/30"
            >
              <div className="p-3 rounded-xl bg-white/5 text-red-accent border border-white/10 group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div className="overflow-hidden">
                <div className="text-[9px] uppercase text-gray-500">EMAIL CHANNEL</div>
                <div className="text-white font-semibold truncate">ashoksrinivassivakiran.143@gmail.com</div>
              </div>
            </a>

            {/* Phone */}
            <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-indigo-400 border border-white/10">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[9px] uppercase text-gray-500">VOICE CONTACT</div>
                <div className="text-white font-semibold">+91 95817 20429 / +91 99665 75468</div>
              </div>
            </div>

            {/* Location */}
            <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 text-emerald-400 border border-white/10">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[9px] uppercase text-gray-500">LOCATION &amp; COORDINATES</div>
                <div className="text-white font-semibold">East Godavari, Andhra Pradesh, India</div>
                <div className="text-[9px] text-gray-500">[16.7335° N, 82.2144° E]</div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
            <a
              href="https://github.com/ashok-12700"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-gray-300 hover:text-white hover:border-white/30 flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon size={12} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/ashok-srinivas-siva-kiran-3647a4315"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-gray-300 hover:text-white hover:border-white/30 flex items-center gap-1.5 transition-colors"
            >
              <LinkedinIcon size={12} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1uEC2wq-CMXKWZ6HTXe31ysjQf-h56SYw/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white text-black rounded-full text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-gray-200 flex items-center gap-1.5 transition-colors"
            >
              <FileText size={12} />
              <span>Resume ↗</span>
            </a>
          </div>
        </div>

        {/* Right Columns - Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="editorial-card p-6 sm:p-8 rounded-3xl space-y-5 relative overflow-hidden"
          >
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-mono text-gray-500 mb-2">
                YOUR NAME / ORGANIZATION
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 focus:border-red-accent/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none font-sans placeholder-gray-700 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-mono text-gray-500 mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 focus:border-red-accent/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none font-sans placeholder-gray-700 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-mono text-gray-500 mb-2">
                SUBJECT
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Message topic or inquiry"
                className="w-full bg-white/5 border border-white/10 focus:border-red-accent/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none font-sans placeholder-gray-700 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-mono text-gray-500 mb-2">
                MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your project details or message..."
                className="w-full bg-white/5 border border-white/10 focus:border-red-accent/50 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none font-sans placeholder-gray-700 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow"
            >
              <Send size={12} />
              <span>{submitted ? 'Opening Mail Client...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 border-t border-white/5 bg-[#030305] text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-gray-500">
        <div>
          <span className="text-white font-semibold">ASHOK SRINIVAS SIVA KIRAN</span>
          <span className="mx-2">·</span>
          <span>© 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#education" className="hover:text-white transition-colors">Education</a>
          <a href="#toolkit" className="hover:text-white transition-colors">Skills</a>
          <a href="#work" className="hover:text-white transition-colors">Projects</a>
          <a href="#archive" className="hover:text-white transition-colors">Achievements</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <a
          href="#home"
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
};

export default Contact;
