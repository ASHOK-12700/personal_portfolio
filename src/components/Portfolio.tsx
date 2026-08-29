import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Hook into scroll progress of the entire portfolio section (height 400vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate active project index from scroll progress
  const activeIdx = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0, 1, 2, 3]);

  // Project 01 (Max Assistant) Transforms
  const op1 = useTransform(scrollYProgress, [0, 0.2, 0.26], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.2, 0.26], [1, 1.05, 0.8]);
  const rotY1 = useTransform(scrollYProgress, [0, 0.2, 0.26], [8, -8, -15]);
  const y1 = useTransform(scrollYProgress, [0, 0.2, 0.26], [0, -20, -100]);
  const z1 = useTransform(scrollYProgress, [0, 0.2, 0.26], [0, 50, -200]);

  // Project 02 (ResearchAI) Transforms
  const op2 = useTransform(scrollYProgress, [0.18, 0.25, 0.45, 0.52], [0, 1, 1, 0]);
  const scale2 = useTransform(scrollYProgress, [0.18, 0.25, 0.45, 0.52], [0.8, 1, 1.02, 0.8]);
  const rotY2 = useTransform(scrollYProgress, [0.18, 0.25, 0.45, 0.52], [-15, 8, -8, 15]);
  const y2 = useTransform(scrollYProgress, [0.18, 0.25, 0.45, 0.52], [100, 0, -20, -100]);
  const z2 = useTransform(scrollYProgress, [0.18, 0.25, 0.45, 0.52], [-150, 0, 40, -150]);

  // Project 03 (Wi-Fi Security) Transforms
  const op3 = useTransform(scrollYProgress, [0.44, 0.5, 0.7, 0.76], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.44, 0.5, 0.7, 0.76], [0.8, 1, 1.02, 0.8]);
  const rotX3 = useTransform(scrollYProgress, [0.44, 0.5, 0.7, 0.76], [15, 0, -5, -15]);
  const y3 = useTransform(scrollYProgress, [0.44, 0.5, 0.7, 0.76], [100, 0, -20, -100]);
  const z3 = useTransform(scrollYProgress, [0.44, 0.5, 0.7, 0.76], [-150, 0, 40, -150]);

  // Project 04 (CleanCoin) Transforms
  const op4 = useTransform(scrollYProgress, [0.69, 0.75, 1], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.69, 0.75, 1], [0.8, 1, 1]);
  const rotY4 = useTransform(scrollYProgress, [0.69, 0.75, 1], [15, -8, 0]);
  const y4 = useTransform(scrollYProgress, [0.69, 0.75, 1], [100, 0, 0]);
  const z4 = useTransform(scrollYProgress, [0.69, 0.75, 1], [-150, 0, 0]);

  const pTransforms = [
    { op: op1, scale: scale1, rotY: rotY1, rotX: 0, y: y1, z: z1 },
    { op: op2, scale: scale2, rotY: rotY2, rotX: 0, y: y2, z: z2 },
    { op: op3, scale: scale3, rotY: 0, rotX: rotX3, y: y3, z: z3 },
    { op: op4, scale: scale4, rotY: rotY4, rotX: 0, y: y4, z: z4 },
  ];

  return (
    <div ref={sectionRef} id="work" className="relative w-full h-[400vh]">
      {/* Sticky layout framing */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050507] flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16 pb-12">
          
          {/* Left Side Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between h-auto lg:h-[75%] border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-10 relative z-20 bg-[#050507]/90">
            {projects.map((proj, idx) => {
              const trans = pTransforms[idx];
              return (
                <motion.div
                  key={proj.id}
                  style={{
                    opacity: trans.op,
                    y: trans.y,
                    pointerEvents: scrollYProgress.get() >= (idx * 0.25) && scrollYProgress.get() < ((idx + 1) * 0.25) ? 'auto' : 'none',
                  }}
                  className="absolute inset-x-0 top-0 pr-0 lg:pr-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl sm:text-5xl font-extrabold font-mono text-white/20">
                      {proj.number}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-mono px-3 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full font-semibold">
                      {proj.category}
                    </span>
                  </div>

                  <p className="text-[10px] font-mono uppercase text-red-accent/80 tracking-widest mb-1.5">
                    {proj.subtitle}
                  </p>
                  <h3 className="text-2xl sm:text-3.5xl font-bold text-white tracking-tight font-sans mb-4">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6">
                    {proj.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-gray-400">
                        <CheckCircle2 size={14} className="text-red-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] font-mono text-gray-400 px-2 py-0.5 bg-white/5 border border-white/10 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => setActiveProject(proj)}
                      className="px-5 py-2.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest font-mono rounded-full hover:bg-gray-200 transition-colors flex items-center gap-1.5 shadow"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={12} />
                    </button>

                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-white/15 text-gray-400 hover:text-white hover:border-white/30 font-mono text-[10px] uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5"
                    >
                      <GithubIcon size={12} />
                      <span>Code</span>
                    </a>

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 border border-white/15 text-gray-400 hover:text-white hover:border-white/30 font-mono text-[10px] uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Static Bottom indicator placeholder */}
            <div className="mt-auto pt-6 text-[10px] font-mono text-gray-500 flex items-center justify-between relative z-10">
              <span>SELECTED PROJECTS // FOUR SCENES</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((num) => (
                  <span
                    key={num}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      Math.floor(activeIdx.get()) === num ? 'bg-red-accent' : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Visual Stage */}
          <div 
            className="lg:col-span-6 relative w-full h-[40vh] sm:h-[35vh] lg:h-[70vh] flex items-center justify-center"
            style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
          >
            {/* Project 01 — 3D Mobile Frame Mockup */}
            <motion.div
              style={{
                opacity: op1,
                scale: scale1,
                rotateY: rotY1,
                z: z1,
                transformStyle: 'preserve-3d',
              }}
              className="absolute w-52 h-88 sm:w-60 sm:h-100 border-4 border-white/10 bg-[#09090e] rounded-[2.5rem] shadow-2xl flex flex-col p-3 overflow-hidden transform-gpu"
            >
              {/* Phone Notch */}
              <div className="w-20 h-4 bg-black border border-white/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-indigo-900 rounded-full" />
              </div>

              {/* Screen Content Mockup */}
              <div className="flex-1 rounded-[1.8rem] bg-black border border-white/5 flex flex-col p-4 justify-between font-mono relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-accent/10 rounded-full blur-[40px] pointer-events-none" />
                
                {/* Upper bar */}
                <div className="flex items-center justify-between text-[8px] text-gray-500 border-b border-white/5 pb-2">
                  <span>MAX VOICE AI v1.0</span>
                  <span className="text-red-accent">ACTIVE</span>
                </div>

                {/* AI Speech Wave lines */}
                <div className="flex flex-col gap-2 my-auto">
                  <div className="text-[10px] text-white/60 mb-2">Intent Parser logs:</div>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="h-full w-24 bg-red-accent" />
                  </div>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div animate={{ x: [100, -100] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="h-full w-20 bg-indigo-500" />
                  </div>
                  <div className="text-[9px] text-gray-500 mt-2">Listening for: "Max, check Docker status..."</div>
                </div>

                {/* Micro tech info */}
                <div className="text-[8px] text-gray-600 flex justify-between border-t border-white/5 pt-2">
                  <span>LATENCY: 140ms</span>
                  <span>KOTLIN CORE</span>
                </div>
              </div>
            </motion.div>

            {/* Project 02 — 3D Browser Frame Mockup */}
            <motion.div
              style={{
                opacity: op2,
                scale: scale2,
                rotateY: rotY2,
                z: z2,
                transformStyle: 'preserve-3d',
              }}
              className="absolute w-72 h-56 sm:w-100 sm:h-76 border border-white/10 bg-[#09090e] rounded-2xl shadow-2xl flex flex-col overflow-hidden transform-gpu"
            >
              {/* Browser bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#050507]">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="w-40 sm:w-56 h-4 bg-white/5 rounded-md border border-white/10 text-[8px] font-mono text-center text-gray-500 flex items-center justify-center select-none truncate">
                  researchai.siet.edu/mock-interview
                </div>
                <span className="w-3" />
              </div>

              {/* Browser Body Mockup */}
              <div className="flex-1 p-4 flex flex-col justify-between font-mono text-left bg-black text-[9px]">
                <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-gray-400">
                  <span>ROUND 01: SYSTEM DESIGN</span>
                  <span className="text-indigo-400 font-bold">SCORE: 88/100</span>
                </div>

                {/* Dashboard layout */}
                <div className="grid grid-cols-3 gap-2 flex-1 items-stretch">
                  <div className="col-span-2 border border-white/5 rounded-lg p-2 bg-white/[0.02] flex flex-col justify-between">
                    <span className="text-gray-500">LLM Evaluation:</span>
                    <span className="text-white text-[8px] line-clamp-2">"Response exhibits excellent understanding of database sharding and caching strategies..."</span>
                    <span className="text-red-accent font-bold mt-1 text-[8px]">Graded: High Clarity</span>
                  </div>
                  <div className="border border-white/5 rounded-lg p-2 bg-white/[0.02] flex flex-col justify-between items-center text-center">
                    <span className="text-gray-500">SPeech metrics</span>
                    <span className="text-white text-xs font-bold font-sans">135 WPM</span>
                    <span className="text-emerald-400 font-bold text-[8px]">Ideal Pace</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] text-gray-600">
                  <span>TS FRONTEND PLATFORM</span>
                  <span>WEBSPEECH CAPTURE</span>
                </div>
              </div>
            </motion.div>

            {/* Project 03 — 3D Hardware Telemetry / Security Grid */}
            <motion.div
              style={{
                opacity: op3,
                scale: scale3,
                rotateX: rotX3,
                z: z3,
                transformStyle: 'preserve-3d',
              }}
              className="absolute w-72 h-56 sm:w-100 sm:h-76 border border-red-500/20 bg-[#09090e] rounded-2xl shadow-2xl flex flex-col overflow-hidden p-4 transform-gpu"
            >
              {/* Telemetry Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 font-mono text-[9px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-accent animate-pulse" />
                  ESP8266 W-FI SHIELD // PACKET CAPTURE
                </span>
                <span>RSSI MONITOR</span>
              </div>

              {/* Hardware Telemetry Mockup */}
              <div className="flex-1 grid grid-cols-3 gap-3 my-4 font-mono text-left text-[9px]">
                <div className="border border-white/10 rounded-xl p-3 bg-white/[0.01] flex flex-col justify-between">
                  <span className="text-gray-500">DEAUTH FLOOD</span>
                  <span className="text-red-accent font-bold text-base">BLOCKED</span>
                  <span className="text-[7px] text-gray-500">Circular Buffer active</span>
                </div>

                <div className="border border-white/10 rounded-xl p-3 bg-white/[0.01] flex flex-col justify-between">
                  <span className="text-gray-500">ROGUE AP</span>
                  <span className="text-white font-bold text-xs">0 DETECTED</span>
                  <span className="text-[7px] text-gray-500">RSSI fingerprinting</span>
                </div>

                <div className="border border-white/10 rounded-xl p-3 bg-white/[0.01] flex flex-col justify-between">
                  <span className="text-gray-500">CHANNEL STATUS</span>
                  <span className="text-indigo-400 font-bold text-xs">CH 06: SECURE</span>
                  <span className="text-[7px] text-gray-500">802.11 monitor mode</span>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-600">
                <span>FIRMWARE LAYER: ARDUINO C++</span>
                <span>CONTROL LAYER: PYTHON</span>
              </div>
            </motion.div>

            {/* Project 04 — 3D Product/IoT Dashboard */}
            <motion.div
              style={{
                opacity: op4,
                scale: scale4,
                rotateY: rotY4,
                z: z4,
                transformStyle: 'preserve-3d',
              }}
              className="absolute w-72 h-56 sm:w-100 sm:h-76 border border-white/10 bg-[#09090e] rounded-2xl shadow-2xl flex flex-col overflow-hidden p-4 transform-gpu"
            >
              {/* CleanCoin Dashboard Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 font-mono text-[9px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  CLEANCOIN IoT HUB // ACTIVE
                </span>
                <span>DEPOSIT LEDGER</span>
              </div>

              {/* Eco Ledger Mockup */}
              <div className="flex-1 grid grid-cols-2 gap-3 my-4 font-mono text-left text-[9px]">
                {/* Weight sensor calibrated scale */}
                <div className="border border-white/10 rounded-xl p-3 bg-white/[0.01] flex flex-col justify-between">
                  <span className="text-gray-500">LOAD CELL SCALE</span>
                  <div>
                    <span className="text-white font-bold text-lg">0.72</span>
                    <span className="text-gray-500 ml-1 text-[8px]">KG DEPOSITED</span>
                  </div>
                  <span className="text-[7px] text-emerald-400 font-bold">Stable Calibration</span>
                </div>

                {/* Digital Wallet coins ledger */}
                <div className="border border-white/10 rounded-xl p-3 bg-white/[0.01] flex flex-col justify-between">
                  <span className="text-gray-500">WALLET BALANCE</span>
                  <div>
                    <span className="text-emerald-400 font-bold text-lg">45.0</span>
                    <span className="text-gray-500 ml-1 text-[8px]">CLEAN COINS</span>
                  </div>
                  <span className="text-[7px] text-gray-500">Ledger authenticated</span>
                </div>
              </div>

              {/* Bottom Info bar */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-[8px] font-mono text-gray-600">
                <span>DATABASE LAYER: FIREBASE</span>
                <span>API THROTTLING: ACTIVE</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Case Study Fullscreen Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
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
    </div>
  );
};

export default Portfolio;
