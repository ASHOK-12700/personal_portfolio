import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from './ScrollContainer';
import { Github, ExternalLink, Wifi, Trash2, ArrowDown, X, Layers, AlertCircle, Compass } from 'lucide-react';

const projects = [
  {
    title: 'Public Wi-Fi Security System',
    subtitle: 'WiFi Shield ESP8266 Device',
    description: 'Public Wi-Fi networks are vulnerable to traffic sniffing and fake access points. WiFi Shield is a low-cost, compact IoT module built on ESP8266 that detects and mitigates common wireless threats in real time. Leveraging DeAuth, Beacon, and Probe frames, it defends user privacy and safety dynamically.',
    tags: ['Python', 'IoT / ESP8266', 'Network Security', 'IEEE 802.11 Protocols'],
    icon: Wifi,
    status: 'Completed Deployment',
    statusType: 'stable',
    codeLink: 'https://github.com/ashok-12700',
    detailsLink: 'https://github.com/ashok-12700',
    architecture: 'Hardware layer utilizing an ESP8266 NodeMCU running customized Arduino/C++ firmware for low-level packet capture, interfacing with a Python control client. The system intercepts IEEE 802.11 management frames, analyzing traffic anomalies directly at the network interface layer.',
    challenge: 'Analyzing packets on low-power ESP8266 microcontrollers often leads to buffer overflow and frame drops. Implementing an efficient packet filtering mechanism in firmware was critical to maintain high detection rates without overloading the hardware.',
    solution: 'Engineered a lightweight circular ring buffer and ring-fenced processing cycles by using hardware interrupts. Unnecessary packets were discarded at the MAC layer, reducing RAM usage by 40% and preventing device crashes.',
    features: [
      'Real-time Deauthentication frame detection and mitigation',
      'Rogue Access Point (Evil Twin) detection using RSSI fingerprinting',
      'Beacon flood anomaly tracking and automated alert triggers',
      'Onboard OLED display status monitor and LED indicators'
    ]
  },
  {
    title: 'Smart Waste Management with Clean Coin',
    subtitle: 'CleanCoin Recycling App',
    description: 'CleanCoin is an eco-friendly system incentivizing responsible waste recycling through digital coins. Integrating smart weight-sensing dustbins with an automated mobile catalog, it tracks and validates waste deposits in real time, motivating positive environmental behavior change and promoting green habits.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript API', 'Eco-friendly IoT'],
    icon: Trash2,
    status: 'Ongoing Development',
    statusType: 'active',
    codeLink: 'https://github.com/ashok-12700',
    detailsLink: 'https://cleancoin.lovable.app',
    architecture: 'A multi-tier system composed of a React.js client web application interfacing with Firebase Cloud Services. IoT-enabled waste bins track deposit weights via load cell sensors calibrated with an Arduino board, communicating data via REST endpoints to compute digital currency credits.',
    challenge: 'Ensuring transaction integrity when depositing waste, specifically preventing users from spoofing weight deposits or claiming Clean Coins repeatedly.',
    solution: 'Designed a secure validation handshake combining physical load-cell change detection with a cloud-side timestamp throttle. Transactions must be signed by the local IoT node before credits are allocated in the user\'s ledger.',
    features: [
      'Smart load-cell weight calibration and real-time synchronization',
      'CleanCoin digital wallet interface with transaction history logs',
      'Interactive recycling rewards catalog and QR redemption keys',
      'Geo-located smart bin status indicators mapping fill-levels'
    ]
  }
];

const WiFiShieldSimulator: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    '[SYS] Initializing WiFi Shield ESP8266 controller...',
    '[SYS] Hardware configuration: NodeMCU v1.0. Channels 1-13.',
    '[SYS] Monitoring 802.11 management frames...',
    '[SCAN] Channel 1 scan completed. 4 Access Points found.',
    '[SCAN] Active SSID: SIET_STUDENT_WIFI | RSSI: -62dBm | SEC: WPA2'
  ]);
  const [isSniffing, setIsSniffing] = useState(true);
  const [threatCount, setThreatCount] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSniffing) return;

    const logTemplates = [
      () => `[SCAN] Checking Channel ${(Math.random() * 11 + 1).toFixed(0)}...`,
      () => `[BEACON] SSID: rogue_unsecured_wifi | RSSI: -48dBm | FLAG: Spoof suspected.`,
      () => `[SHIELD] DEAUTH PACKET FLURRY DETECTED. Executing interrupt defensive protocols!`,
      () => `[ALERT] Deauth source identified: MAC [A4:82:C3:E9:10:DF]. Blocking frame injection.`,
      () => `[SHIELD] Rogue frames discarded at MAC layer. Channel stability restored.`,
      () => `[SCAN] Active AP list refreshed. SIET_STUDENT_WIFI verified stable.`,
      () => `[SYS] Recalibrating circular ring buffer. RAM load at 32%. Core temperature normal.`,
      () => `[MONITOR] Sniffing Probe Request from client MAC [4C:5E:0C:B2:D1:4F]... Encrypting.`,
      () => `[SHIELD] EVIL TWIN SSID detected matching VSM_College_WiFi. Blocking associations.`
    ];

    const timer = setInterval(() => {
      const randomTemplate = logTemplates[Math.floor(Math.random() * logTemplates.length)]();
      setLogs(prev => {
        const next = [...prev, randomTemplate];
        return next.slice(-40);
      });

      if (randomTemplate.includes('ALERT') || randomTemplate.includes('SHIELD') || randomTemplate.includes('DEAUTH')) {
        setThreatCount(c => c + 1);
      }
    }, 1800);

    return () => clearInterval(timer);
  }, [isSniffing]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full glass-panel border border-white/10 rounded-2xl p-5 bg-black/40 text-left font-mono relative overflow-hidden select-none">
      <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSniffing ? 'bg-emerald-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isSniffing ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="text-white/60 tracking-wider">ESP8266 WIRELESS SHIELD TELEMETRY</span>
        </div>
        <button 
          onClick={() => setIsSniffing(!isSniffing)}
          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 text-[9px] uppercase tracking-wider transition-colors cursor-pointer"
        >
          {isSniffing ? 'Pause Telemetry' : 'Resume Sniffing'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">DEFENSE MODE</p>
          <p className="text-xs font-bold text-white tracking-widest mt-0.5 font-mono">ACTIVE</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">THREATS BLOCKED</p>
          <p className="text-xs font-bold text-emerald-400 mt-0.5 font-mono">{threatCount}</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">SHIELD INTEGRITY</p>
          <p className="text-xs font-bold text-cyan-400 mt-0.5 font-mono">99.8%</p>
        </div>
      </div>

      <div 
        ref={terminalRef}
        className="w-full h-40 overflow-y-auto bg-black/60 border border-white/5 rounded-xl p-3.5 space-y-1.5 text-[10px] text-gray-400 leading-normal scrollbar-none font-mono"
      >
        {logs.map((log, index) => {
          let color = 'text-gray-400';
          if (log.includes('ALERT') || log.includes('DEAUTH')) {
            color = 'text-red-400 font-semibold';
          } else if (log.includes('SHIELD')) {
            color = 'text-cyan-400 font-semibold';
          } else if (log.includes('SCAN')) {
            color = 'text-white/60';
          } else if (log.includes('SYS')) {
            color = 'text-gray-500';
          }
          return (
            <div key={index} className={`${color} break-all`}>
              {log}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CleanCoinSimulator: React.FC = () => {
  const [balance, setBalance] = useState(12.4);
  const [load, setLoad] = useState(0.0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [selectedItem, setSelectedItem] = useState<'plastic' | 'glass' | 'aluminum'>('plastic');
  const [ledger, setLedger] = useState<Array<{ name: string; weight: number; coins: number; time: string }>>([
    { name: 'Plastic Bottle', weight: 0.45, coins: 1.35, time: '14:20:05' },
    { name: 'Aluminum Can', weight: 0.20, coins: 0.80, time: '12:04:12' }
  ]);

  const items = {
    plastic: { name: 'Plastic Bottle', weight: 0.40, coins: 1.20, icon: '🥤' },
    glass: { name: 'Glass Jar', weight: 0.60, coins: 1.80, icon: '🫙' },
    aluminum: { name: 'Aluminum Can', weight: 0.25, coins: 1.00, icon: '🥫' }
  };

  const handleDeposit = () => {
    if (isCalibrating) return;
    setIsCalibrating(true);

    setTimeout(() => {
      const active = items[selectedItem];
      setLoad(active.weight);
      setBalance(prev => parseFloat((prev + active.coins).toFixed(2)));
      
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setLedger(prev => [
        {
          name: active.name,
          weight: active.weight,
          coins: active.coins,
          time: timeStr
        },
        ...prev
      ]);
      
      setIsCalibrating(false);
      
      setTimeout(() => {
        setLoad(0.0);
      }, 3000);

    }, 2000);
  };

  return (
    <div className="w-full glass-panel border border-white/10 rounded-2xl p-5 bg-black/40 text-left relative overflow-hidden select-none">
      <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 text-[10px]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isCalibrating ? 'bg-amber-400' : 'bg-emerald-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isCalibrating ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <span className="text-white/60 font-mono tracking-wider">CLEANCOIN IoT CALIBRATION HUB</span>
        </div>
        <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">NODE ONLINE</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">LOAD CELL WEIGHT</p>
          <p className="text-xs font-bold text-white font-mono mt-0.5">
            {isCalibrating ? 'CALIBRATING...' : `${load.toFixed(2)} kg`}
          </p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">WALLET BALANCE</p>
          <p className="text-xs font-bold text-emerald-400 font-mono mt-0.5">{balance.toFixed(2)} CC</p>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
          <p className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">COIN MULTIPLIER</p>
          <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">3.00x</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch mb-4">
        <div className="flex flex-col justify-between space-y-3 bg-white/[0.01] border border-white/5 p-3.5 rounded-xl">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">SELECT RECYCLABLE ITEM</span>
          <div className="flex justify-between gap-1.5">
            {(['plastic', 'glass', 'aluminum'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedItem(type)}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all duration-300 border flex flex-col items-center gap-1 cursor-pointer ${
                  selectedItem === type 
                    ? 'bg-white/10 border-white/30 text-white' 
                    : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-sm">{items[type].icon}</span>
                <span className="font-sans text-[8px] uppercase tracking-wider">{type}</span>
              </button>
            ))}
          </div>
          <button
            onClick={handleDeposit}
            disabled={isCalibrating}
            className="w-full py-2.5 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow"
          >
            {isCalibrating ? (
              <span>CALIBRATING LOAD CELLS...</span>
            ) : (
              <span>Deposit {items[selectedItem].name}</span>
            )}
          </button>
        </div>

        <div className="flex flex-col space-y-2 bg-white/[0.01] border border-white/5 p-3.5 rounded-xl justify-between">
          <span className="text-[9px] text-gray-500 uppercase tracking-wider font-sans">RECENT TRANSACTION LEDGER</span>
          <div className="space-y-1.5 max-h-[85px] overflow-y-auto scrollbar-none text-[9px] font-mono text-gray-400">
            {ledger.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-white/[0.02] pb-1">
                <span className="text-white/60">{item.name}</span>
                <span className="text-gray-500 font-sans">{item.time}</span>
                <span className="text-emerald-400">+{item.coins.toFixed(2)} CC</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Portfolio: React.FC = () => {
  const { scrollToSection } = useScroll();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-10 relative z-10 text-gray-100 select-none">
      
      {/* Top spacing helper */}
      <div className="h-16" />

      {/* Projects Showcase block */}
      <div className="w-full max-w-6xl flex flex-col justify-center my-auto z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-3"
          >
            03. Case Studies
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans heading-premium"
          >
            Featured Work
          </motion.h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-white/30 to-transparent rounded-full" />
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group interactive-card cinematic-card p-8 rounded-3xl flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-500 hover:border-white/15"
              data-cursor-label="Explore"
            >
              {/* Soft Spotlight background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              {/* Subtle ambient light indicator inside the card */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none group-hover:bg-indigo-500/12 transition-all duration-700" />

              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-white/70 transition-all duration-300 group-hover:scale-105 group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                    <project.icon size={22} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-white/[0.04] border border-white/10 text-gray-300 rounded-full flex items-center gap-1.5 font-mono shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
                    <span className="relative flex h-1.5 w-1.5">
                      {project.statusType === 'active' ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </>
                      ) : (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                        </>
                      )}
                    </span>
                    {project.status}
                  </span>
                </div>

                {/* Typography info */}
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-1.5 block font-sans">
                  {project.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags and CTA Links */}
              <div className="relative z-10">
                {/* Outlined tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="text-[9px] sm:text-[10px] text-gray-300 font-light border border-white/10 bg-white/[0.03] px-2.5 py-1 rounded-md font-mono shadow-[inset_0_1.5px_0px_rgba(255,255,255,0.03)] group-hover:border-white/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-5 border-t border-white/5 pt-4">
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="magnetic flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors py-1 cursor-pointer font-sans"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                  <a
                    href={project.detailsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="magnetic flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors py-1 cursor-pointer font-sans"
                  >
                    <ExternalLink size={14} />
                    <span>Live Showcase</span>
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
             {/* Modal Box */}
             <motion.div
               initial={{ opacity: 0, scale: 0.96, y: 15 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.96, y: 15 }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-black/60 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_30px_60px_rgba(0,0,0,0.9)] relative select-text"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close button */}
               <button
                 onClick={() => setSelectedProject(null)}
                 className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 z-10 cursor-pointer shadow-lg"
               >
                <X size={16} />
              </button>

              {/* Grid content */}
              <div className="p-8 md:p-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
                        {selectedProject.subtitle}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 bg-white/5 border border-white/5 text-gray-300 rounded-full flex items-center gap-1.5">
                        <span className="relative flex h-1 w-1">
                          {selectedProject.statusType === 'active' ? (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-500"></span>
                            </>
                          ) : (
                            <>
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1 w-1 bg-white"></span>
                            </>
                          )}
                        </span>
                        {selectedProject.status}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={selectedProject.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <Github size={14} />
                      <span>Source Code</span>
                    </a>
                    <a
                      href={selectedProject.detailsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      <span>Live Showcase</span>
                    </a>
                  </div>
                </div>

                {/* Staggered Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Description, Features */}
                  <div className="md:col-span-7 space-y-8">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-3 flex items-center gap-2">
                        <Compass size={12} className="text-white/60" />
                        <span>Project Overview</span>
                      </h4>
                      <p className="text-sm text-gray-300 font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-4 flex items-center gap-2">
                        <Layers size={12} className="text-white/60" />
                        <span>Key Functionalities</span>
                      </h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-3 text-xs text-gray-400 font-light leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-4 flex items-center gap-2">
                        <Layers size={12} className="text-white/60" />
                        <span>Interactive Telemetry Sandbox</span>
                      </h4>
                      {selectedProject.title.toLowerCase().includes('security') ? (
                        <WiFiShieldSimulator />
                      ) : (
                        <CleanCoinSimulator />
                      )}
                    </div>
                  </div>

                  {/* Right Column: Architecture, Challenge/Solution, Tech Tags */}
                  <div className="md:col-span-5 space-y-8">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-3 flex items-center gap-2">
                        <Layers size={12} className="text-white/60" />
                        <span>System Architecture</span>
                      </h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                        {selectedProject.architecture}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-3 flex items-center gap-2">
                        <AlertCircle size={12} className="text-white/60" />
                        <span>Engineering Challenge</span>
                      </h4>
                      <div className="text-xs text-gray-400 font-light leading-relaxed space-y-3">
                        <div>
                          <strong className="text-white/70 block mb-1">The Problem:</strong>
                          {selectedProject.challenge}
                        </div>
                        <div>
                          <strong className="text-white/70 block mb-1">The Solution:</strong>
                          {selectedProject.solution}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-bold mb-3">
                        Technologies Leveraged
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] text-white/70 border border-white/10 bg-white/5 px-3 py-1 rounded-md font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Next Experience indicator */}
      <motion.button
        onClick={() => scrollToSection(4)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10"
      >
        <span>Next Experience</span>
        <ArrowDown size={12} className="text-white/40" />
      </motion.button>

    </div>
  );
};
export default Portfolio;
