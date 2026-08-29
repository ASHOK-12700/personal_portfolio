import React from 'react';
import { motion } from 'framer-motion';

export const Journey: React.FC = () => {
  const chapters = [
    {
      year: '2016 – 2021',
      title: 'Secondary Foundations',
      place: 'ZPHS High School · G. Vemavaram',
      story: 'Built foundational academic discipline and problem-solving skills in mathematics and physical sciences, laying the groundwork for a technical path.',
      bridge: 'The initial step before entering computing.',
    },
    {
      year: '2021 – 2023',
      title: 'Pre-Engineering Mathematics & Physics',
      place: 'VVS Narayana Raju Junior College',
      story: 'Completed Intermediate Education (MPC) with a strong focus on advanced algebra, calculus, and mechanics, preparing for formal computer science engineering.',
      bridge: 'Developing the analytical mindset required for complex systems.',
    },
    {
      year: '2023 – Present',
      title: 'B.Tech in Computer Science Engineering',
      place: 'Srinivasa Institute of Engineering & Technology (SIET)',
      story: 'Pursuing B.Tech CSE (3rd Year). Mastered core algorithms, data structures, operating systems, computer networking, and cloud system architectures.',
      bridge: 'Translating computer science theory into real software.',
    },
    {
      year: '2024',
      title: 'Industry Internships & Full-Stack Deployment',
      place: 'Shadowfox Technologies & Smart Bridge',
      story: 'Completed Web Development Internship at Shadowfox Technologies building responsive web portals. Completed MERN Stack Internship at Smart Bridge deploying a full-stack Doctor Booking platform.',
      bridge: 'Real-world software engineering across full-stack architectures.',
    },
    {
      year: '2024 – 2025',
      title: 'IoT Security & Hackathon Achievements',
      place: 'VSM College Expo · Aditya College Expo · Bangalore Hackathon',
      story: 'Earned 1st Prize at VSM College Project Expo for ESP8266 Wi-Fi Shield device, 2nd Prize at Aditya College Expo, 1st Prize at SIET Quiz League, and participated in the Agentic AI Hackathon in Bangalore.',
      bridge: 'Hardware packet filtering defense meets AI agent workflows.',
    },
    {
      year: '2026',
      title: 'Cloud Infrastructure & AI Engineering',
      place: 'AWS · Docker · Kotlin Android · React AI',
      story: 'Focused on AWS cloud scaling, Docker container pipelines, Linux automation, native Android voice assistant engineering (Max Assistant), and AI interview simulation (ResearchAI).',
      bridge: 'Where cloud infrastructure, DevOps pipelines, and AI converge.',
    },
  ];

  return (
    <section id="journey" className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">02</span> My Journey
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          From Engineering Foundations to Cloud &amp; AI — the chapters of my{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            craft.
          </em>
        </h2>
      </div>

      {/* Chapters Stack matching reference blueprint */}
      <div className="relative border-l border-white/10 pl-6 md:pl-12 space-y-16">
        {chapters.map((chap, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-[#050507] border-2 border-red-accent group-hover:scale-125 transition-transform duration-300" />

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
              <span className="text-3xl md:text-4xl font-bold font-mono text-white/40 group-hover:text-red-accent transition-colors duration-300">
                {chap.year}
              </span>
              <span className="text-xs uppercase tracking-widest font-mono text-gray-400">
                {chap.place}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight font-sans mb-3">
              {chap.title}
            </h3>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-3xl">
              {chap.story}
            </p>

            <div className="mt-3 text-xs font-mono text-gray-400 flex items-center gap-2">
              <span className="text-red-accent font-serif-italic">→</span>
              <span>{chap.bridge}</span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Journey;
