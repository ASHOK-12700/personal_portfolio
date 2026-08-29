import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, ArrowLeft, Calendar, ExternalLink, Layers, Search, 
  X, Briefcase, GraduationCap, Trophy, ShieldCheck, HelpCircle 
} from 'lucide-react';
import gsap from 'gsap';
import Navbar from './Navbar';

interface CertificatesPageProps {
  navigateHome: () => void;
}

const certificatesList = [
  {
    title: "Google Cloud Platform",
    issuer: "JNTU Kakinada Workshop",
    img: "https://i.postimg.cc/ncCMkXDk/gcp.jpg",
    date: "December 2024",
    category: "cloud",
    skills: ["Google Cloud Platform", "Virtual Machines", "Cloud Databases"],
    desc: "Hands-on certification workshop at JNTU Kakinada, mastering core GCP cloud databases, deployment tools, and virtual machine instances.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Web Development Internship",
    issuer: "Shadowfox Technologies",
    img: "https://i.postimg.cc/mDP2Sqcz/Whats-App-Image-2025-12-19-at-4-03-36.jpg",
    date: "November 2024",
    category: "internship",
    skills: ["React.js", "Tailwind CSS", "Frontend Architecture", "Client Portals"],
    desc: "Completed multi-stage internship projects, designing dental systems, full portfolios, and responsive ecommerce applications.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "MERN Stack Internship",
    issuer: "Smart Bridge (Govt Platform)",
    img: "https://i.postimg.cc/R0DvqRPS/Whats-App-Image-2025-12-19-at-4-03-35-PM.jpg",
    date: "October 2024",
    category: "internship",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"],
    desc: "One-month hands-on full-stack virtual training ending with the deployment of a database-driven Doctor Appointment scheduler.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Public Wi-Fi Security (1st Prize)",
    issuer: "Project Expo - VSM College",
    img: "https://i.postimg.cc/zv1ZRPK6/Whats-App-Image-2025-12-19-at-4-03-33-PM.jpg",
    date: "February 2024",
    category: "awards",
    skills: ["ESP8266 NodeMCU", "IEEE 802.11 Protocols", "Network Defense", "Arduino C++"],
    desc: "Earned 1st Prize in Project Expo for developing a modular Wi-Fi Shield using ESP8266 to block beacon flooding and traffic interception.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Public Wi-Fi Security (2nd Prize)",
    issuer: "Project Expo - Aditya College",
    img: "https://i.postimg.cc/prnb9MmJ/Whats-App-Image-2025-12-19-at-4-03-34-PM.jpg",
    date: "February 2024",
    category: "awards",
    skills: ["Packet Sniffing Detection", "IEEE Wireless Protection", "Firmware Engineering"],
    desc: "Recognized with 2nd Prize for implementing high-efficiency networking protocols protecting user access layers.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Agentic AI Hackathon Participation",
    issuer: "Hackathon - Bangalore",
    img: "https://i.postimg.cc/KvPLLkhS/agentic-ai.jpg",
    date: "January 2025",
    category: "hackathon",
    skills: ["Large Language Models", "Agentic Workflows", "API Integrations", "System Automation"],
    desc: "Participated in the competitive Agentic AI hackathon in Bangalore, architecting complex LLM automation workflows and APIs.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "AWS & DevOps Workshop",
    issuer: "Mohan Babu University",
    img: "https://i.postimg.cc/0NLhLHWQ/mbu.png",
    date: "September 2024",
    category: "cloud",
    skills: ["Amazon Web Services", "DevOps Foundations", "Cloud Automation", "Infrastructure-as-Code"],
    desc: "Acquired real-world insights into AWS cloud scaling, automation triggers, infrastructure scripting, and core DevOps methodologies.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "GenAI Powered by Data Analytics",
    issuer: "Tata (Forage Simulation)",
    img: "https://i.postimg.cc/254xScjT/forage.jpg",
    date: "August 2024",
    category: "simulation",
    skills: ["Generative AI", "Business Intelligence", "Analytics reporting", "Client Deliverables"],
    desc: "Simulated business analytics deliverables, transforming visual metrics into high-level intelligence reports for corporate decision layers.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Big Data Foundations",
    issuer: "Infosys",
    img: "https://i.postimg.cc/90S9pZXk/Whats-App-Image-2025-12-22-at-1-28-24-PM.jpg",
    date: "July 2024",
    category: "foundations",
    skills: ["Big Data Structures", "MapReduce Algorithms", "Hadoop Cluster Basics", "Distributed Databases"],
    desc: "Comprehensive coursework covering Big Data structures, MapReduce algorithms, Hadoop cluster concepts, and distributed databases.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "Graphic Design Essentials",
    issuer: "Canva Essentials Course",
    img: "https://i.postimg.cc/763tjPJW/Whats-App-Image-2025-12-22-at-1-28-23-PM.jpg",
    date: "June 2024",
    category: "foundations",
    skills: ["Visual Hierarchy", "Typography Dynamics", "Branding Design", "Canvas layouts"],
    desc: "Studied core typography hierarchies, layout dynamics, palette harmonics, and digital banners within canvas design systems.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE Certification",
    img: "https://i.postimg.cc/TY65RdLW/ai-begginers.jpg",
    date: "May 2024",
    category: "foundations",
    skills: ["Artificial Intelligence Foundations", "Deep Learning basics", "Ethical AI Standards"],
    desc: "Accredited course in artificial intelligence foundations, deep learning frameworks, neural nodes, and general ethical AI standards.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "AI Skills Passport",
    issuer: "EY & Microsoft",
    img: "https://i.postimg.cc/RhT8JCMY/IMG-20251226-WA0007.jpg",
    date: "April 2024",
    category: "foundations",
    skills: ["Cognitive Cloud Tools", "Predictive Modeling", "Process Automation", "Microsoft Azure AI"],
    desc: "Collaborative certification with Microsoft, exploring predictive models, cognitive tools, and cloud business automation processes.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  },
  {
    title: "SIET Quiz Competition (1st Prize)",
    issuer: "SIET Academic League",
    img: "https://i.postimg.cc/qRKgTSkv/quiz.jpg",
    date: "March 2024",
    category: "awards",
    skills: ["Data Structures", "Algorithm Optimization", "Computer Networking", "Problem Solving"],
    desc: "Secured first prize in the college-wide technical quiz event, resolving algorithms, network architectures, and code optimization puzzles.",
    link: "https://github.com/ASHOK-12700/my-vault.git"
  }
];

const categories = [
  { id: 'all', name: 'All Credentials', icon: Layers },
  { id: 'internship', name: 'Internships', icon: Briefcase },
  { id: 'cloud', name: 'Cloud & DevOps', icon: ShieldCheck },
  { id: 'awards', name: 'Awards & Expos', icon: Trophy },
  { id: 'foundations', name: 'Foundations & AI', icon: GraduationCap }
];

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ navigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImg, setSelectedImg] = useState<{ img: string; desc: string; title: string; issuer: string; date: string } | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const particlesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Set page title & smooth scroll to top & adaptive overlays
  useEffect(() => {
    document.title = "Certifications & Achievements | Ashok Srinivas";
    window.scrollTo(0, 0);

    const root = document.documentElement;
    root.style.setProperty('--vignette-opacity', '0.15');
    root.style.setProperty('--mesh-orb-opacity', '0.08');

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    return () => {
      document.title = "Ashok Srinivas | Creative Portfolio";
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // GSAP micro-interaction: Subtle particles animation in background
  useEffect(() => {
    if (reduceMotion || !particlesRef.current) return;

    const ctx = gsap.context(() => {
      const particles = particlesRef.current?.querySelectorAll('.particle');
      particles?.forEach((p) => {
        gsap.to(p, {
          y: 'random(-40, 40)',
          x: 'random(-40, 40)',
          opacity: 'random(0.1, 0.4)',
          duration: 'random(4, 9)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  // Card Mouse Tilt Animation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    if (reduceMotion) return;
    const card = cardRefs.current.get(id);
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateX: y * -6,
      rotateY: x * 6,
      transformPerspective: 800,
      scale: 1.01,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = (id: number) => {
    const card = cardRefs.current.get(id);
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  // Filter certificates based on search query & selected category
  const filteredCertificates = certificatesList.filter((cert) => {
    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory || (selectedCategory === 'cloud' && cert.category === 'hackathon');
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#030303] text-gray-100 font-sans pb-24 relative select-none cinematic-scrollbar overflow-y-auto">
      
      {/* Persisted Floating Navigation */}
      <Navbar />

      {/* Background Static Film Jitter Overlay */}
      <div className="cinematic-noise" />

      {/* Subtle Ambient Backlights */}
      {!reduceMotion && (
        <>
          <div className="fixed top-[-10%] left-[20%] w-[60vw] h-[60vh] rounded-full bg-white/[0.015] blur-[150px] pointer-events-none z-0" />
          <div className="fixed bottom-[10%] right-[10%] w-[50vw] h-[50vh] rounded-full bg-white/[0.01] blur-[120px] pointer-events-none z-0" />
        </>
      )}

      {/* Floating particles - restrained */}
      {!reduceMotion && (
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {Array.from({ length: isMobile ? 6 : 15 }).map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3
              }}
            />
          ))}
        </div>
      )}

      {/* Header Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 sm:pt-20 relative z-10">
        
        {/* Back Link */}
        <button 
          onClick={navigateHome}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors duration-300 group mb-12 cursor-pointer py-2 border-b border-transparent hover:border-white/10"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Return To Landing</span>
        </button>

        {/* Hero Section */}
        <div className="text-left mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-3.5 flex items-center gap-2"
          >
            <Award size={14} className="text-white/60" />
            <span>Telemetry Showcase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans uppercase leading-none heading-premium"
          >
            Certifications & Achievements
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-400 font-light leading-relaxed font-sans"
          >
            A curated portfolio of accredited qualifications, corporate simulations, technical hackathons, 
            and engineering milestones verified across industry standards.
          </motion.p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-end mb-12 border-b border-white/5 pb-8 relative z-20">
          {/* Search Box */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query skills or credentials..."
              className="w-full bg-white/[0.02] border border-white/10 focus:border-indigo-500/30 focus:shadow-[0_0_15px_rgba(124,58,237,0.15)] rounded-full pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:bg-white/[0.04] transition-all duration-300 placeholder-gray-600 font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Certificates Grid */}
        <AnimatePresence mode="wait">
          {filteredCertificates.length > 0 ? (
            <motion.div 
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {filteredCertificates.map((cert, idx) => (
                <div
                  key={idx}
                  ref={(el) => { if (el) cardRefs.current.set(idx, el); }}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  onClick={() => setSelectedImg({ img: cert.img, desc: cert.desc, title: cert.title, issuer: cert.issuer, date: cert.date })}
                  className="group interactive-card cinematic-card p-5 rounded-3xl cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xl relative select-none hover:border-white/15"
                  style={{ transformStyle: reduceMotion ? 'flat' : 'preserve-3d', willChange: 'transform' }}
                  data-cursor-label="Inspect"
                >
                  {/* Internal spotlight reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />

                  <div>
                    {/* Image frame */}
                    <div 
                      className="w-full h-44 overflow-hidden rounded-2xl mb-4 relative bg-gray-950 border border-white/10"
                      style={{ transform: reduceMotion ? 'none' : 'translateZ(-10px)' }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                      <img
                        src={cert.img}
                        alt={cert.title}
                        className="w-full h-full object-cover grayscale-[25%] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.01] transition-all duration-700"
                      />
                    </div>

                    {/* Meta date */}
                    <div 
                      className="flex items-center gap-1.5 text-gray-500 mb-2 font-mono text-[9px]"
                      style={{ transform: reduceMotion ? 'none' : 'translateZ(5px)' }}
                    >
                      <Calendar size={10} />
                      <span>{cert.date}</span>
                    </div>

                    {/* Typography */}
                    <h3 
                      className="text-base font-bold text-white mb-1 group-hover:text-white tracking-tight font-sans line-clamp-1"
                      style={{ transform: reduceMotion ? 'none' : 'translateZ(10px)' }}
                    >
                      {cert.title}
                    </h3>
                    <p 
                      className="text-xs text-gray-400 font-sans font-medium mb-3.5"
                      style={{ transform: reduceMotion ? 'none' : 'translateZ(8px)' }}
                    >
                      {cert.issuer}
                    </p>

                    {/* Skill chips */}
                    <div 
                      className="flex flex-wrap gap-1.5 mb-6"
                      style={{ transform: reduceMotion ? 'none' : 'translateZ(5px)' }}
                    >
                      {cert.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="text-[8px] sm:text-[9px] text-indigo-200 border border-indigo-500/10 bg-indigo-950/20 px-2 py-0.5 rounded-md font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div 
                    className="flex justify-between items-center border-t border-white/5 pt-3.5 mt-auto relative z-10"
                    style={{ transform: reduceMotion ? 'none' : 'translateZ(5px)' }}
                  >
                    <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold group-hover:text-gray-400 transition-colors">
                      Spotlight Inspection
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="magnetic p-1.5 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5 rounded-full text-gray-400 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>

                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="w-full py-20 flex flex-col items-center justify-center text-center text-gray-500 font-mono text-xs gap-3 border border-dashed border-white/5 rounded-3xl bg-[#08080a]"
            >
              <HelpCircle size={28} className="text-gray-600" />
              <span>No credentials matching query parameters were found.</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Lightbox Modal - Luxury Fullscreen Presentation */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-[12px] md:backdrop-blur-[24px] p-4"
          >
             <motion.div
               initial={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
               transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
               onClick={(e) => e.stopPropagation()}
               className="relative max-w-4xl w-full bg-black/60 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center"
             >
               {/* Close Button */}
               <button
                 onClick={() => setSelectedImg(null)}
                 className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all duration-200 z-50 cursor-pointer border border-white/5 hover:border-white/10 hover:bg-white/10"
               >
                <X size={18} />
              </button>

              {/* Image Frame */}
              <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-auto md:h-[400px] overflow-hidden rounded-2xl bg-black border border-white/5 shadow-2xl">
                <img
                  src={selectedImg.img}
                  alt={selectedImg.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Frame */}
              <div className="w-full md:w-2/5 flex flex-col justify-center text-left">
                <div className="flex items-center gap-1 text-gray-500 mb-2 font-mono text-[9px]">
                  <Calendar size={10} />
                  <span>{selectedImg.date}</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-1.5">Credential Spotlight</span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">{selectedImg.title}</h4>
                <p className="text-xs text-gray-400 font-sans font-medium mb-4">{selectedImg.issuer}</p>
                
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">{selectedImg.desc}</p>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedImg(null)}
                    className="px-6 py-2.5 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-wider font-bold text-gray-200 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CertificatesPage;
