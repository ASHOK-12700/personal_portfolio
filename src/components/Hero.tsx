import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Shield, Award, Cpu, GraduationCap } from 'lucide-react';
import { CloudField } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hook into scroll progress of the hero section itself
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // 3D parallax scroll translations
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const leftStatsY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const rightStatsY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const photoZ = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [0, -6]);

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[110vh] w-full flex flex-col justify-between pt-36 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden text-left"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Background Glows with slow parallax scrolling */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" 
      />
      <motion.div 
        style={{ y: bgY }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none z-0" 
      />

      {/* Decorative Technical Micro Grid Marks */}
      <span className="absolute top-36 left-8 text-white/10 font-mono text-xl pointer-events-none select-none">+</span>
      <span className="absolute top-48 right-12 text-white/10 font-mono text-xl pointer-events-none select-none">+</span>

      {/* Top Headline Content */}
      <motion.div 
        style={{ y: textY, scale: textScale, opacity: textOpacity, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-4xl pt-4"
      >
        {/* Kicker / Micro-label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-6 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-red-accent inline-block animate-pulse" />
          Cloud Architecture &amp; DevOps Engineer · AI Builder
        </motion.p>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7.5xl font-extrabold tracking-tight text-white leading-[1.08] font-sans"
        >
          <span className="block">
            Cloud &amp; AI systems that feel{' '}
            <em className="font-serif-italic font-normal text-white hover:text-red-accent transition-colors duration-500">
              effortless.
            </em>
          </span>
          <span className="block mt-2">
            Architecture that{' '}
            <em className="font-serif-italic font-normal text-red-accent">
              isn&apos;t.
            </em>
          </span>
        </motion.h1>

        {/* Subtitle statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-2xl"
        >
          Pursuing B.Tech CSE at SIET. Specializing in AWS cloud infrastructure, automated Docker &amp; CI/CD pipelines, IoT wireless security, and intelligent voice assistants.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group px-8 py-4 bg-white text-black font-semibold text-xs uppercase tracking-widest font-mono rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/5"
          >
            <span>Explore Work</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#education"
            className="group px-8 py-4 border border-white/15 text-white font-semibold text-xs uppercase tracking-widest font-mono rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
          >
            <Play size={12} className="fill-current text-red-accent" />
            <span>See My Education</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Stage Row with Portrait Arch & Key Highlights */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-16">
        {/* Left Side Stats */}
        <motion.div 
          style={{ y: leftStatsY }}
          className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-4"
        >
          <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-red-accent border border-white/10">
              <Cpu size={20} />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">4+</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Flagship Projects</div>
            </div>
          </div>

          <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-indigo-400 border border-white/10">
              <Shield size={20} />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">13+</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">Certifications</div>
            </div>
          </div>
        </motion.div>

        {/* Center Stage Portrait Frame */}
        <motion.div 
          style={{ y: photoY, z: photoZ, rotateY: photoRotate }}
          className="md:col-span-6 flex justify-center items-center py-4 relative transform-gpu"
        >
          {/* Arch Backdrop with embedded ThreeUI CloudField */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-68 h-84 sm:w-76 sm:h-100 rounded-t-full border border-white/10 bg-black/40 overflow-hidden relative">
              <div className="absolute inset-0 opacity-[0.35]">
                <CloudField mode="dark" />
              </div>
            </div>
          </div>

          {/* Floating Portrait Image with 3D layers styling */}
          <div className="relative w-58 h-76 sm:w-66 sm:h-84 rounded-t-full overflow-hidden border border-white/15 shadow-2xl bg-black/60 group">
            <img
              src="https://i.postimg.cc/SND65KHx/my-photo.jpg"
              alt="Ashok Srinivas Siva Kiran"
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-5 left-0 w-full text-center px-4">
              <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">Ashok Srinivas</p>
              <p className="text-[10px] font-mono text-gray-400">DevOps &amp; Cloud Specialist</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side Stats */}
        <motion.div 
          style={{ y: rightStatsY }}
          className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-4"
        >
          <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-amber-400 border border-white/10">
              <Award size={20} />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">1st Prize</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">VSM Expo (Wi-Fi Shield)</div>
            </div>
          </div>

          <div className="editorial-card p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-emerald-400 border border-white/10">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="text-xl font-bold font-mono text-white">B.Tech CSE</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono">3rd Year Student · SIET</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-6 text-xs font-mono text-gray-500">
        <span>EST. 2023 // SIET AP</span>
        <a href="#about" className="flex items-center gap-2 hover:text-white transition-colors">
          <span>Scroll to Explore</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
