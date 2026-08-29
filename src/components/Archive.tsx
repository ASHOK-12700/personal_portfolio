import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, X, Award, ExternalLink, Calendar, Briefcase, Trophy, Sparkles } from 'lucide-react';

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  img: string;
  date: string;
  category: 'cloud' | 'internship' | 'awards' | 'foundations';
  skills: string[];
  desc: string;
  link?: string;
}

export const certificatesList: CertificateItem[] = [
  {
    id: 1,
    title: 'Google Cloud Platform',
    issuer: 'JNTU Kakinada Workshop',
    img: 'https://i.postimg.cc/ncCMkXDk/gcp.jpg',
    date: 'December 2024',
    category: 'cloud',
    skills: ['GCP', 'Virtual Machines', 'Cloud Databases'],
    desc: 'Hands-on certification workshop at JNTU Kakinada, mastering core GCP cloud databases, deployment tools, and virtual machine instances.',
  },
  {
    id: 2,
    title: 'Web Development Internship',
    issuer: 'Shadowfox Technologies',
    img: 'https://i.postimg.cc/mDP2Sqcz/Whats-App-Image-2025-12-19-at-4-03-36.jpg',
    date: 'November 2024',
    category: 'internship',
    skills: ['React.js', 'Tailwind CSS', 'Frontend Portals'],
    desc: 'Completed multi-stage internship projects designing dental systems, full portfolios, and responsive ecommerce applications.',
  },
  {
    id: 3,
    title: 'MERN Stack Internship',
    issuer: 'Smart Bridge (Govt Platform)',
    img: 'https://i.postimg.cc/R0DvqRPS/Whats-App-Image-2025-12-19-at-4-03-35-PM.jpg',
    date: 'October 2024',
    category: 'internship',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    desc: 'One-month hands-on full-stack virtual training ending with the deployment of a database-driven Doctor Appointment scheduler.',
  },
  {
    id: 4,
    title: 'Public Wi-Fi Security (1st Prize)',
    issuer: 'Project Expo - VSM College',
    img: 'https://i.postimg.cc/zv1ZRPK6/Whats-App-Image-2025-12-19-at-4-03-33-PM.jpg',
    date: 'February 2024',
    category: 'awards',
    skills: ['ESP8266', '802.11 Protocols', 'DeAuth Defense'],
    desc: 'Earned 1st Prize in Project Expo for developing a modular Wi-Fi Shield using ESP8266 to block beacon flooding and traffic interception.',
  },
  {
    id: 5,
    title: 'Public Wi-Fi Security (2nd Prize)',
    issuer: 'Project Expo - Aditya College',
    img: 'https://i.postimg.cc/prnb9MmJ/Whats-App-Image-2025-12-19-at-4-03-34-PM.jpg',
    date: 'February 2024',
    category: 'awards',
    skills: ['Packet Sniffing', 'Wireless Protection', 'Firmware'],
    desc: 'Recognized with 2nd Prize for implementing high-efficiency networking protocols protecting user access layers.',
  },
  {
    id: 6,
    title: 'Agentic AI Hackathon Participation',
    issuer: 'Hackathon - Bangalore',
    img: 'https://i.postimg.cc/KvPLLkhS/agentic-ai.jpg',
    date: 'January 2025',
    category: 'foundations',
    skills: ['LLMs', 'Agentic Workflows', 'API Automation'],
    desc: 'Participated in the competitive Agentic AI hackathon in Bangalore, architecting complex LLM automation workflows and APIs.',
  },
  {
    id: 7,
    title: 'AWS & DevOps Workshop',
    issuer: 'Mohan Babu University',
    img: 'https://i.postimg.cc/0NLhLHWQ/mbu.png',
    date: 'September 2024',
    category: 'cloud',
    skills: ['AWS', 'DevOps', 'Cloud Scaling', 'Automation'],
    desc: 'Acquired real-world insights into AWS cloud scaling, automation triggers, infrastructure scripting, and core DevOps methodologies.',
  },
  {
    id: 8,
    title: 'GenAI Powered by Data Analytics',
    issuer: 'Tata (Forage Simulation)',
    img: 'https://i.postimg.cc/254xScjT/forage.jpg',
    date: 'August 2024',
    category: 'foundations',
    skills: ['Generative AI', 'Analytics', 'Business Reports'],
    desc: 'Simulated business analytics deliverables, transforming visual metrics into high-level intelligence reports for corporate decision layers.',
  },
  {
    id: 9,
    title: 'Big Data Foundations',
    issuer: 'Infosys',
    img: 'https://i.postimg.cc/90S9pZXk/Whats-App-Image-2025-12-22-at-1-28-24-PM.jpg',
    date: 'July 2024',
    category: 'foundations',
    skills: ['Big Data', 'MapReduce', 'Hadoop', 'Databases'],
    desc: 'Comprehensive coursework covering Big Data structures, MapReduce algorithms, Hadoop cluster concepts, and distributed databases.',
  },
  {
    id: 10,
    title: 'Graphic Design Essentials',
    issuer: 'Canva Essentials Course',
    img: 'https://i.postimg.cc/763tjPJW/Whats-App-Image-2025-12-22-at-1-28-23-PM.jpg',
    date: 'June 2024',
    category: 'foundations',
    skills: ['Typography', 'Layout Dynamics', 'Branding'],
    desc: 'Studied core typography hierarchies, layout dynamics, palette harmonics, and digital banners within canvas design systems.',
  },
  {
    id: 11,
    title: 'AI for Beginners',
    issuer: 'HP LIFE Certification',
    img: 'https://i.postimg.cc/TY65RdLW/ai-begginers.jpg',
    date: 'May 2024',
    category: 'foundations',
    skills: ['Artificial Intelligence', 'Deep Learning', 'Ethical AI'],
    desc: 'Accredited course in artificial intelligence foundations, deep learning frameworks, neural nodes, and general ethical AI standards.',
  },
  {
    id: 12,
    title: 'AI Skills Passport',
    issuer: 'EY & Microsoft',
    img: 'https://i.postimg.cc/RhT8JCMY/IMG-20251226-WA0007.jpg',
    date: 'April 2024',
    category: 'foundations',
    skills: ['Azure AI', 'Predictive Modeling', 'Process Automation'],
    desc: 'Collaborative certification with Microsoft, exploring predictive models, cognitive tools, and cloud business automation processes.',
  },
  {
    id: 13,
    title: 'SIET Quiz Competition (1st Prize)',
    issuer: 'SIET Academic League',
    img: 'https://i.postimg.cc/qRKgTSkv/quiz.jpg',
    date: 'March 2024',
    category: 'awards',
    skills: ['Algorithms', 'Networking', 'Problem Solving'],
    desc: 'Secured first prize in the college-wide technical quiz event, resolving algorithms, network architectures, and code optimization puzzles.',
  },
];

export const Archive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'awards' | 'experience' | 'certificates'>('awards');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  
  // Certificate specific controls
  const [certFilter, setCertFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const cardsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const awards = [
    {
      title: 'Public Wi-Fi Security 1st Prize',
      place: 'Project Expo · VSM College',
      date: 'Feb 2024',
      details: 'Earned top place honors for designing a hardware ESP8266 packet injection mitigation shield that detects and blocks active Deauth attacks.',
      icon: Trophy,
    },
    {
      title: 'Public Wi-Fi Security 2nd Prize',
      place: 'Project Expo · Aditya College',
      date: 'Feb 2024',
      details: 'Awarded 2nd Prize for implementing RSSI signal fingerprinting models to detect rogue access points and Evil Twins in network layers.',
      icon: Award,
    },
    {
      title: 'SIET Quiz Competition (1st Prize)',
      place: 'Academic League · SIET AP',
      date: 'March 2024',
      details: 'Secured 1st Prize resolving high-speed algorithms, network topologies, and programming efficiency trivia.',
      icon: Trophy,
    },
    {
      title: 'Agentic AI Hackathon Bangalore',
      place: 'Milestone Hub · Bangalore',
      date: 'Jan 2025',
      details: 'Participated in a high-stakes AI hackathon, coding modular LLM workflow orchestration loops and REST endpoint handlers.',
      icon: Sparkles,
    },
  ];

  const internships = [
    {
      role: 'Web Development Intern',
      company: 'Shadowfox Technologies',
      date: 'Nov 2024',
      details: 'Designed and deployed responsive web portals, dental clinics databases interfaces, and responsive ecommerce mockups in React & Tailwind CSS.',
      skills: ['React.js', 'Tailwind CSS', 'Responsive Layouts', 'REST APIs'],
    },
    {
      role: 'MERN Stack Intern',
      company: 'Smart Bridge (Govt Virtual Program)',
      date: 'Oct 2024',
      details: 'Acquired hands-on full-stack virtual training. Successfully engineered and deployed a functional Doctor Appointment booking scheduler database.',
      skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    },
  ];

  const filteredCerts = certificatesList.filter((cert) => {
    const matchesCat = certFilter === 'all' || cert.category === certFilter;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section 
      ref={containerRef}
      id="archive" 
      className="relative w-full py-28 px-6 md:px-12 max-w-7xl mx-auto text-left bg-[#050507]"
    >
      {/* Section Header */}
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">04 //</span> Verified Records
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          Achievements &amp;<br />
          <em className="font-serif-italic font-normal text-red-accent">
            Credentials.
          </em>
        </h2>
      </div>

      {/* Tabs Controller */}
      <div className="flex border-b border-white/10 gap-8 mb-12 font-mono text-xs uppercase tracking-widest overflow-x-auto pb-4">
        {[
          { id: 'awards', label: '01 / Awards & Hackathons' },
          { id: 'experience', label: '02 / Experience / Internships' },
          { id: 'certificates', label: '03 / Certifications Gallery' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'awards' | 'experience' | 'certificates')}
            className={`transition-colors whitespace-nowrap relative pb-2 ${
              activeTab === tab.id ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.span layoutId="activeTabUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-red-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Scenes */}
      <motion.div style={{ y: cardsY }} className="w-full relative z-10 transform-gpu">
        
        {/* Awards Scene */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="editorial-card p-6 sm:p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-accent/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-red-accent group-hover:scale-110 transition-transform">
                    <item.icon size={22} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                      <span>{item.place}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Experience Scene */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            {internships.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="editorial-card p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column */}
                  <div className="md:col-span-4 space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-red-accent/80 font-bold block">
                      PROFESSIONAL TRAINING
                    </span>
                    <h3 className="text-xl font-bold text-white font-sans">
                      {item.role}
                    </h3>
                    <div className="font-mono text-xs text-gray-400 flex items-center gap-2">
                      <Briefcase size={12} className="text-gray-500" />
                      <span>{item.company}</span>
                    </div>
                    <div className="font-mono text-[10px] text-gray-500 flex items-center gap-2">
                      <Calendar size={12} className="text-gray-500" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="md:col-span-8 space-y-4">
                    <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                      {item.details}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {item.skills.map((s, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-mono text-gray-300 px-2.5 py-1 bg-white/5 border border-white/10 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Certificates Scene */}
        {activeTab === 'certificates' && (
          <div className="space-y-8">
            
            {/* Filter controls */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-6 border-b border-white/5">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All (13)' },
                  { id: 'cloud', label: 'Cloud' },
                  { id: 'internship', label: 'Internships' },
                  { id: 'awards', label: 'Awards' },
                  { id: 'foundations', label: 'Foundations' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCertFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-colors ${
                      certFilter === cat.id
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter credentials..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-8 pr-4 py-1.5 text-[10px] text-white placeholder-gray-600 focus:outline-none focus:border-white/20 font-mono"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  onClick={() => setSelectedCert(cert)}
                  className="editorial-card rounded-2xl p-4 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Uncropped bounding frame */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/90 border border-white/15 mb-4 relative flex items-center justify-center p-1.5">
                      <img
                        src={cert.img}
                        alt={cert.title}
                        className="max-w-full max-h-full object-contain group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>

                    <div className="text-[9px] font-mono text-gray-500 mb-1 flex items-center justify-between">
                      <span>{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-sans group-hover:text-red-accent transition-colors truncate">
                      {cert.title}
                    </h3>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {cert.skills.map((s, idx) => (
                        <span key={idx} className="text-[8px] font-mono text-gray-400 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-gray-500 group-hover:text-white transition-colors">
                    <span>INSPECT CREDENTIAL</span>
                    <span>↗</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </motion.div>

      {/* Fullscreen uncropped Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8"
            >
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white z-10"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Full Uncropped View */}
                <div className="md:col-span-7 aspect-[4/3] bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-2">
                  <img
                    src={selectedCert.img}
                    alt={selectedCert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-red-accent uppercase mb-2">
                      <Award size={14} />
                      <span>{selectedCert.issuer}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mb-4">{selectedCert.date}</p>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {selectedCert.desc}
                    </p>

                    <div className="space-y-2">
                      <p className="text-[9px] font-mono uppercase text-gray-500">VERIFIED SKILLS</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((s, idx) => (
                          <span key={idx} className="text-xs font-mono text-white px-2.5 py-1 bg-white/5 border border-white/10 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(null)}
                      className="px-5 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase rounded-full hover:bg-gray-200"
                    >
                      Close Lightbox
                    </button>
                    {selectedCert.link && (
                      <a
                        href={selectedCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Vault Link</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Archive;
