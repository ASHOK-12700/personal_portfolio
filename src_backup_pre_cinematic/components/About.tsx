import React from 'react';
import { motion } from 'framer-motion';

export const VelocityMarquee: React.FC = () => {
  const row1Skills = [
    'DevOps',
    'AWS Cloud',
    'Python',
    'Java',
    'React.js',
    'Docker',
    'Linux Systems',
    'Network Security',
    'Voice Assistant AI',
    'Android Kotlin',
  ];

  const row2Skills = [
    'CI/CD Pipelines',
    'Terraform IaC',
    'Kubernetes Basics',
    'MongoDB',
    'Firebase',
    'IEEE 802.11 Protocols',
    'MERN Stack',
    'Full-Stack Web',
    'Speech Analysis',
    'IoT Firmware',
  ];

  return (
    <div className="w-full overflow-hidden py-10 border-y border-white/10 bg-[#07070a]/50 select-none">
      {/* Row 1 — Solid Text Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden mb-4">
        <div className="animate-marquee flex items-center gap-8">
          {[...row1Skills, ...row1Skills, ...row1Skills].map((skill, idx) => (
            <span key={idx} className="flex items-center gap-8 font-mono text-sm md:text-base font-semibold text-white/90 uppercase tracking-widest">
              <span>{skill}</span>
              <span className="text-red-accent font-serif-italic text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — Outlined Text Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee-reverse flex items-center gap-8">
          {[...row2Skills, ...row2Skills, ...row2Skills].map((skill, idx) => (
            <span key={idx} className="flex items-center gap-8 font-mono text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest">
              <span>{skill}</span>
              <span className="text-white/30 font-serif-italic text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const About: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Velocity Marquee */}
      <div className="mb-20">
        <VelocityMarquee />
      </div>

      {/* About Section Header & Composition matching reference */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Header */}
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
            <span className="text-red-accent mr-2">01</span> About
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
            DevOps is how I build — AI is how I{' '}
            <em className="font-serif-italic font-normal text-red-accent">
              scale.
            </em>
          </h2>
          <p className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            MEMBER // SIET COMPUTER SCIENCE DEPT
          </p>
        </div>

        {/* Right Content & Story */}
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
          <p>
            I am currently pursuing my{' '}
            <strong className="text-white font-medium">B.Tech in Computer Science Engineering (3rd Year)</strong> at
            Srinivasa Institute of Engineering and Technology. My passion lies at the intersection of infrastructure automation and intelligent interactive systems.
          </p>
          <p>
            From configuring <strong className="text-white font-medium">AWS cloud architecture</strong>, scaling Docker container networks, and establishing CI/CD automation pipelines to engineering low-level IoT wireless defense firmware (ESP8266 Wi-Fi Shield) and native Android AI voice assistants (Max Assistant), I focus on building reliable, modern tech solutions.
          </p>
          
          {/* Key Metrics / Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="editorial-card p-4 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">1st Prize</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-1">VSM Expo (Wi-Fi Shield)</div>
            </div>

            <div className="editorial-card p-4 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">2nd Prize</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-1">Aditya College Expo</div>
            </div>

            <div className="editorial-card p-4 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">13</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-1">Verified Credentials</div>
            </div>

            <div className="editorial-card p-4 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">3rd Year</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-1">B.Tech CSE · SIET</div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <a
              href="#work"
              className="inline-flex text-xs uppercase tracking-widest font-mono py-3 px-8 bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white rounded-full transition-all duration-300 font-semibold"
            >
              Explore My Work →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
