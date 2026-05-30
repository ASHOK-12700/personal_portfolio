import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { useScroll } from './ScrollContainer';
import gsap from 'gsap';

const roles = [
  'Immersive Systems Engineer',
  'DevOps Specialist',
  'Cinematic Frontend Developer',
  'Cloud Architecture Creator',
  'Modern Interactive Designer'
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

    // Dynamic light reflection coordinates inside card
    const shineX = e.clientX - rect.left;
    const shineY = e.clientY - rect.top;
    card.style.setProperty('--shine-x', `${shineX}px`);
    card.style.setProperty('--shine-y', `${shineY}px`);

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
      
      {/* Dynamic ambient spotlight backlighting - restrained luxury */}
      {!reduceMotion && (
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-950/20 via-midnight/5 to-transparent blur-[180px] z-0" />
      )}

      {/* Top spacing helper */}
      <div className="h-12" />

      {/* Hero content grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 items-center my-auto z-10">
        
        {/* Left Side: Typography Identity */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="col-span-1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left"
        >
          
          {/* Tagline */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-4"
          >
            DevOps + Cinematic Frontend Developer
          </motion.div>

          {/* Luxury cinematic headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 flex flex-col gap-1 leading-none text-white font-sans">
            <div className="overflow-hidden py-1">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: "105%" },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 heading-premium"
              >
                Ashok Srinivas
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: "105%" },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="block text-2xl sm:text-3xl md:text-4xl font-light text-gray-400 tracking-wide-luxury"
              >
                Siva Kiran
              </motion.span>
            </div>
          </h1>

          {/* Animated active role indicator */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="h-10 flex items-center mb-6 overflow-hidden text-lg sm:text-xl md:text-2xl font-light text-gray-300"
          >
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
          </motion.div>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
            className="text-sm sm:text-base paragraph-premium max-w-lg mb-8"
          >
            Crafting elegant digital environments combining modern{' '}
            <span className="text-gradient-silver">web design</span>, dynamic interactive mechanics, and robust{' '}
            <span className="text-gradient-cyan">DevOps infrastructure</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8"
          >
            <button
              onClick={() => scrollToSection(3)}
              className="magnetic px-8 py-3.5 luxury-btn luxury-btn-primary rounded-full text-xs uppercase tracking-wider font-bold shadow-md transition-all duration-200 active:scale-95 cursor-pointer"
              data-cursor-label="Explore"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection(4)}
              className="magnetic px-8 py-3.5 luxury-btn rounded-full text-xs uppercase tracking-wider font-bold text-gray-200 transition-all duration-200 backdrop-blur-md active:scale-95 cursor-pointer"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social connections */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 1 } }
            }}
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

        </motion.div>

        {/* Right Side: Immersive 3D Tilt Card Frame */}
        <div 
          ref={cardOuterRef}
          className="col-span-1 md:col-span-5 flex items-center justify-center py-6 perspective-1000 z-10"
        >
          {/* Subtle Ambient Backlight Glow behind the card */}
          {!reduceMotion && (
            <div className="absolute w-80 h-[460px] rounded-full bg-gradient-to-tr from-indigo-600/12 via-violet-600/8 to-cyan-500/6 blur-[120px] pointer-events-none z-0 translate-y-[-20px]" />
          )}

          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95, y: 15 }}
            animate={reduceMotion ? { opacity: 1, scale: 1 } : { 
              opacity: 1, 
              scale: 1, 
              y: [0, -8, 0],
              transition: {
                y: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                default: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
              }
            }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-64 h-96 sm:w-72 sm:h-[420px] rounded-3xl overflow-hidden cinematic-card border border-white/5 shadow-2xl flex flex-col justify-end p-6 cursor-pointer"
            style={{ 
              transformStyle: reduceMotion ? 'flat' : 'preserve-3d',
              willChange: 'transform'
            }}
          >
            {/* Absolute Background Image inside Card */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
              style={{ transform: reduceMotion ? 'none' : 'translateZ(-15px)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-75 z-10" />
              {/* Premium cinematic reflection highlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-15" />
              {/* Realistic Glass Shine Spotlight Overlay */}
              {!reduceMotion && (
                <div 
                  className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle 180px at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 80%)`,
                    mixBlendMode: 'overlay',
                  }}
                />
              )}
              <img
                src="https://i.postimg.cc/SND65KHx/my-photo.jpg"
                alt="Ashok Srinivas Siva Kiran"
                className="w-full h-full object-cover grayscale-[20%] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>

            {/* Glowing border detail */}
            <div className="absolute inset-0 w-full h-full pointer-events-none border border-white/5 group-hover:border-white/15 transition-all duration-500 rounded-3xl z-20" />

            {/* Layered Text Reveal on Image */}
            <div 
              className="relative z-20 transition-all duration-300 group-hover:translate-y-[-5px]"
              style={{ transform: reduceMotion ? 'none' : 'translateZ(25px)' }}
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
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10 cursor-pointer"
      >
        <span>Next Experience</span>
        <ArrowDown size={12} className="text-white/40" />
      </motion.button>

    </div>
  );
};
export default Hero;
