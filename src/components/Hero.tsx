import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useScroll } from './ScrollContainer';
import gsap from 'gsap';

const roles = [
  'Web Developer',
  'Creative Designer',
  'DevOps Enthusiast',
  'CSE Student',
  'AWS Cloud Engineer',
  'AWS Solution Architecture'
];

export const Hero: React.FC = () => {
  const { scrollToSection } = useScroll();
  const [roleIndex, setRoleIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardOuterRef = useRef<HTMLDivElement>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Loop through roles with a cinematic slow reveal
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  // High-performance 3D Mouse Tilt Card effect (disabled in reduced motion)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    
    // Calculate relative mouse coordinates (-0.5 to 0.5 range)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Tilt angle controls (restrained values)
    const tiltX = y * -12; 
    const tiltY = x * 12;  

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    // Shadow & reflection lighting drift
    gsap.to(card, {
      boxShadow: `${-x * 30}px ${-y * 30}px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.03)`,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.8)',
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-12 relative z-10 text-gray-100 select-none">
      
      {/* Dynamic ambient spotlight backlighting - restrained */}
      {!reduceMotion && (
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-white/[0.01] blur-[150px] z-0" />
      )}

      {/* Top spacing helper */}
      <div className="h-16" />

      {/* Hero content grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 items-center my-auto z-10">
        
        {/* Left Side: Typography Identity */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Tagline */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-4"
          >
            Creative Developer & DevOps Engineer
          </motion.div>

          {/* Luxury cinematic headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 flex flex-col gap-1 leading-none text-white font-sans">
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400"
            >
              Ashok Srinivas
            </motion.span>
            <motion.span
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-400 tracking-wide-luxury"
            >
              Siva Kiran
            </motion.span>
          </h1>

          {/* Animated active role indicator */}
          <div className="h-10 flex items-center mb-6 overflow-hidden text-lg sm:text-xl md:text-2xl font-light text-gray-300">
            <span className="text-gray-500 mr-2.5 font-sans">Specializing in</span>
            <div className="relative h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="font-medium text-white"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg mb-8 font-light"
          >
            Crafting elegant digital environments combining modern{' '}
            <span className="text-white font-medium">web design</span>, dynamic interactive mechanics, and robust{' '}
            <span className="text-white font-medium">DevOps infrastructure</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8"
          >
            <button
              onClick={() => scrollToSection(3)}
              className="magnetic px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-white/5 transition-all duration-200 active:scale-95"
              data-cursor-label="Explore"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection(4)}
              className="magnetic px-8 py-3 border border-white/5 bg-white/5 hover:bg-white/10 rounded-full text-xs uppercase tracking-wider font-bold text-gray-200 transition-all duration-200 backdrop-blur-md active:scale-95"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social connections */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-6 text-gray-400"
          >
            <a
              href="https://github.com/ashok-12700"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/ashoksrinivassivakiran"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:ashoksrinivassivakiran.143@gmail.com"
              className="magnetic hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/5"
            >
              <Mail size={18} />
            </a>
          </motion.div>

        </div>

        {/* Right Side: Immersive 3D Tilt Card Frame */}
        <div 
          ref={cardOuterRef}
          className="col-span-1 md:col-span-5 flex items-center justify-center py-6 perspective-1000 z-10"
        >
          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-64 h-96 sm:w-72 sm:h-[420px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col justify-end p-6 cursor-pointer"
            style={{ 
              transformStyle: reduceMotion ? 'flat' : 'preserve-3d',
              willChange: 'transform'
            }}
          >
            {/* Absolute Background Image inside Card */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out select-none"
              style={{ transform: reduceMotion ? 'none' : 'translateZ(-10px)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />
              <img
                src="https://i.postimg.cc/SND65KHx/my-photo.jpg"
                alt="Ashok Srinivas Siva Kiran"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Glowing borders on hover - monochrome */}
            <div className="absolute inset-0 w-full h-full pointer-events-none border border-transparent group-hover:border-white/10 transition-colors duration-500 rounded-3xl z-20" />

            {/* Layered Text Reveal on Image */}
            <div 
              className="relative z-20 transition-all duration-300 group-hover:translate-y-[-5px]"
              style={{ transform: reduceMotion ? 'none' : 'translateZ(20px)' }}
            >
              <p className="text-white font-bold text-lg tracking-wide">Ashok Srinivas</p>
              <p className="text-xs text-gray-400 font-medium font-sans">Passionating on DevOps with AWS</p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Next Experience indicator */}
      <motion.button
        onClick={() => scrollToSection(1)}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0.1 } : { duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10"
      >
        <span>Next Experience</span>
        <ArrowDown size={12} className="text-white/60" />
      </motion.button>

    </div>
  );
};
export default Hero;
