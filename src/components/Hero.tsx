import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Award, Cpu, GraduationCap } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden text-left"
    >
      {/* Subtle Ambient Backlight Glows matching reference blueprint */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Technical Micro Plus Signs */}
      <span className="absolute top-36 left-8 text-white/10 font-mono text-xl pointer-events-none">+</span>
      <span className="absolute top-48 right-12 text-white/10 font-mono text-xl pointer-events-none">+</span>

      {/* Top Headline Content */}
      <div className="relative z-10 max-w-4xl pt-4">
        {/* Kicker / Micro-label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-red-accent inline-block animate-pulse" />
          Cloud Architecture &amp; DevOps Engineer · AI Builder
        </motion.p>

        {/* Oversized Display Headline matching reference blueprint typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-sans"
        >
          <span className="block">
            Cloud &amp; AI systems that feel{' '}
            <em className="font-serif-italic font-normal text-white hover:text-red-accent transition-colors duration-500">
              effortless.
            </em>
          </span>
          <span className="block mt-1">
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
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-400 font-light leading-relaxed max-w-2xl"
        >
          Pursuing B.Tech CSE at SIET. Specializing in AWS cloud infrastructure, automated Docker &amp; CI/CD pipelines, IoT wireless security, and intelligent voice assistants.
        </motion.p>

        {/* Action Buttons matching reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group px-7 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest font-mono rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-white/5"
          >
            <span>Explore Work</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#journey"
            className="group px-7 py-3.5 border border-white/15 text-white font-semibold text-xs uppercase tracking-widest font-mono rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-300 flex items-center gap-2"
          >
            <Play size={12} className="fill-current text-red-accent" />
            <span>See My Journey</span>
          </a>
        </motion.div>
      </div>

      {/* Stage Row with Portrait Arch & Key Highlights matching reference blueprint */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-12"
      >
        {/* Left Side Stats */}
        <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-4">
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
        </div>

        {/* Center Stage Portrait Frame */}
        <div className="md:col-span-6 flex justify-center items-center py-4 relative">
          {/* Arch Backdrop SVG Line matching reference */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-t-full border border-white/10 bg-white/[0.01]" />
          </div>

          <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full overflow-hidden border border-white/15 shadow-2xl bg-black/60 group">
            <img
              src="https://i.postimg.cc/SND65KHx/my-photo.jpg"
              alt="Ashok Srinivas Siva Kiran"
              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-0 w-full text-center px-4">
              <p className="text-xs font-mono font-bold text-white tracking-widest uppercase">Ashok Srinivas</p>
              <p className="text-[10px] font-mono text-gray-400">DevOps &amp; Cloud Specialist</p>
            </div>
          </div>
        </div>

        {/* Right Side Stats */}
        <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-4">
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
        </div>
      </motion.div>

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
