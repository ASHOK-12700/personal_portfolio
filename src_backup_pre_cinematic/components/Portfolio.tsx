import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Smartphone, Cpu, ShieldCheck, Trash2, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';

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

interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  github: string;
  live?: string;
  highlights: string[];
  architecture: string;
  isFlagship?: boolean;
}

const projects: Project[] = [
  {
    id: 'max-assistant',
    number: '01',
    category: 'FLAGSHIP ANDROID AI',
    title: 'Max Assistant for Android',
    subtitle: 'Personal Android Voice Assistant & Automation Agent',
    description:
      'A personal Android voice assistant engineered natively in Kotlin to perform daily tasks through natural voice commands. Inspired by modern AI assistants, Max Assistant provides app control, calling/messaging automation, reminders, system routines, and intelligent intent parsing.',
    tags: ['Android Native', 'Kotlin', 'SpeechRecognizer', 'Text-to-Speech (TTS)', 'Wake-Word Engine', 'AI Intent Parser'],
    icon: Smartphone,
    github: 'https://github.com/ashok-12700',
    isFlagship: true,
    highlights: [
      'Hands-free wake-word detection & continuous voice pipeline',
      'App launching shortcuts, automated phone call triggers & SMS sending',
      'Custom reminder schedules, routines, and system setting controls',
      'Hybrid local intent parsing with cloud LLM fallback for low latency',
    ],
    architecture:
      'Built as a native Android application using Kotlin. Leverages Android SpeechRecognizer for on-device voice capturing, TextToSpeech for verbal feedback, BroadcastReceivers for system automation, and an intent parsing engine to execute background device actions.',
  },
  {
    id: 'research-ai',
    number: '02',
    category: 'FLAGSHIP WEB AI PLATFORM',
    title: 'ResearchAI — AI Mock Interview Platform',
    subtitle: 'AI Interview Simulator & Candidate Evaluator',
    description:
      'An AI-powered interview preparation platform designed to simulate realistic technical and HR interview rounds. Candidates practice domain-specific questions, receive instant speech clarity and sentiment feedback, get technical answers graded, and track their progress over time.',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Speech Analysis', 'LLM Prompting', 'Interview Automation'],
    icon: Cpu,
    github: 'https://github.com/ashok-12700',
    isFlagship: true,
    highlights: [
      'Adaptive technical & HR question generation tailored to candidate role',
      'Real-time speech clarity, pacing, and sentiment analysis feedback',
      'Automated technical grading with detailed hint breakdowns & ideal answers',
      'Comprehensive session history, scoring analytics, and progress tracking',
    ],
    architecture:
      'Architected with a React + TypeScript single-page application frontend. Integrates dynamic LLM prompt orchestration for adaptive question flows, combined with Web Speech API for real-time speech-to-text processing and structured candidate evaluation.',
  },
  {
    id: 'wifi-shield',
    number: '03',
    category: 'IoT & NETWORK SECURITY',
    title: 'Public Wi-Fi Security System (ESP8266 Wi-Fi Shield)',
    subtitle: '1st Prize Winner · VSM College Project Expo',
    description:
      'A low-cost, compact IoT module built on ESP8266 NodeMCU that actively detects and mitigates public Wi-Fi security threats in real time. Analyzing IEEE 802.11 management frames, it protects user privacy against Deauth attacks, Rogue Access Points (Evil Twins), and Beacon floods.',
    tags: ['Python', 'ESP8266 NodeMCU', 'Arduino C++', 'IEEE 802.11 Protocols', 'Network Defense', 'Packet Filtering'],
    icon: ShieldCheck,
    github: 'https://github.com/ashok-12700',
    highlights: [
      'Real-time Deauthentication frame detection and automated packet rejection',
      'Rogue Access Point (Evil Twin) detection using RSSI signal fingerprinting',
      'Beacon flood anomaly tracking with onboard OLED status telemetry',
      'High-efficiency circular ring buffer in firmware preventing RAM overflow',
    ],
    architecture:
      'Hardware layer utilizes ESP8266 NodeMCU running customized C++ firmware for low-level packet capture, communicating with a Python control client. Intercepts management frames directly at MAC layer with hardware interrupt handlers.',
  },
  {
    id: 'clean-coin',
    number: '04',
    category: 'ECO-FRIENDLY IoT & WEB PLATFORM',
    title: 'Smart Waste Management with CleanCoin',
    subtitle: 'CleanCoin Recycling App & IoT Hub',
    description:
      'An eco-friendly system incentivizing responsible waste recycling through digital currency. Integrating smart weight-sensing dustbins with a mobile React web catalog, it tracks deposit weights in real time and allocates digital coins to user ledgers.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript API', 'Firebase Cloud', 'IoT Load Cell Sensors'],
    icon: Trash2,
    github: 'https://github.com/ashok-12700',
    live: 'https://cleancoin.lovable.app',
    highlights: [
      'Smart load-cell weight calibration with instant cloud database sync',
      'CleanCoin digital wallet interface with complete transaction history',
      'Interactive recycling rewards catalog with QR redemption keys',
      'Timestamp throttling & weight change validation preventing deposit spoofing',
    ],
    architecture:
      'Multi-tier IoT system using Arduino load-cell weight sensors communicating over REST APIs with a React.js client web app backed by Firebase Cloud Services.',
  },
];

export const Portfolio: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Header matching reference blueprint */}
      <div className="mb-20 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">04</span> Featured Work
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          Selected{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            Projects.
          </em>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          Major engineering achievements across Android AI Voice Assistants, Web AI Platforms, IoT Network Security, and Cloud Applications.
        </p>
      </div>

      {/* Large Project Presentation Layout matching reference blueprint */}
      <div className="space-y-24">
        {projects.map((proj) => (
          <motion.article
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`editorial-card rounded-3xl p-8 lg:p-12 relative overflow-hidden group ${
              proj.isFlagship ? 'border-red-accent/30 bg-[#09090e]/80' : ''
            }`}
          >
            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-accent/5 blur-[100px] pointer-events-none group-hover:bg-red-accent/10 transition-all duration-700" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  {/* Category & Number Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl lg:text-5xl font-bold font-mono text-white/30 group-hover:text-red-accent transition-colors duration-500">
                      {proj.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-mono px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-xs font-mono uppercase text-gray-400 mb-1">
                    {proj.subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-sans mb-4 group-hover:text-white transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-8">
                    {proj.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
                        <CheckCircle2 size={16} className="text-red-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tag Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {proj.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono text-gray-300 px-3 py-1 bg-white/5 border border-white/10 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveProject(proj)}
                    className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-widest font-mono rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/40 font-mono text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
                  >
                    <GithubIcon size={14} />
                    <span>Source Code</span>
                  </a>

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-white/15 text-gray-300 hover:text-white hover:border-white/40 font-mono text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      <span>Live Site</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Media / Feature Frame */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="w-full aspect-[4/3] rounded-2xl border border-white/15 bg-black/80 overflow-hidden relative group-hover:border-white/30 transition-all duration-500 flex flex-col justify-between p-6 shadow-2xl">
                  {/* Decorative Frame Elements */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] text-gray-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse" />
                      SYSTEM STATUS // ACTIVE
                    </span>
                    <span>{proj.id.toUpperCase()}</span>
                  </div>

                  <div className="my-auto text-center px-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 inline-block text-red-accent mb-3">
                      <proj.icon size={36} />
                    </div>
                    <h4 className="text-lg font-bold text-white font-sans">{proj.title}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-1">{proj.subtitle}</p>
                  </div>

                  <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>ARCHITECTURE TYPE</span>
                    <span className="text-gray-300">PRODUCTION VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Fullscreen Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-left my-8"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-red-accent mb-2 uppercase tracking-widest">
                <span>{activeProject.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans mb-1">
                {activeProject.title}
              </h3>
              <p className="text-xs font-mono text-gray-400 mb-6">{activeProject.subtitle}</p>

              <div className="space-y-6 text-sm text-gray-300 font-light leading-relaxed">
                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-white mb-2 tracking-widest">
                    OVERVIEW &amp; OBJECTIVE
                  </h4>
                  <p>{activeProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-white mb-2 tracking-widest">
                    SYSTEM ARCHITECTURE
                  </h4>
                  <p className="bg-white/5 p-4 rounded-xl border border-white/10 font-mono text-xs text-gray-300">
                    {activeProject.architecture}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-mono font-bold text-white mb-2 tracking-widest">
                    KEY CAPABILITIES
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-mono text-gray-300">
                        <span className="text-red-accent">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-end gap-4">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <GithubIcon size={14} />
                  <span>Source Code ↗</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
