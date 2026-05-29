import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Palette, Server, Globe, GraduationCap, Briefcase, Award, X, ArrowDown 
} from 'lucide-react';
import { useScroll } from './ScrollContainer';

const focusAreas = [
  { icon: Code, title: 'Web Developer', desc: 'Developing fluid, pixel-perfect, and modern interactive applications.' },
  { icon: Palette, title: 'Creative Design', desc: 'Crafting luxury UI layouts, wireframes, banners, and digital assets.' },
  { icon: Server, title: 'DevOps & AWS', desc: 'Automating pipelines with Docker, Git, CI/CD, and deploying on AWS cloud.' },
  { icon: Globe, title: '3D Web Experiences', desc: 'Designing high-performance, immersive visual canvases (R3F, Three.js).' }
];

const educationList = [
  { degree: 'B.Tech - Computer Science Engineering (3rd Year)', school: 'Srinivasa Institute of Engineering and Technology', year: '2023 - Present' },
  { degree: 'Intermediate Education (MPC)', school: 'VVS Narayana Raju Junior College', year: '2021 - 2023' },
  { degree: 'Secondary Schooling', school: 'ZPHS High School, G. Vemavaram', year: '2016 - 2021' }
];

const internshipList = [
  { role: 'Web Development Intern', company: 'Shadowfox Technologies', desc: 'Developed responsive client interfaces including e-commerce structures, medical portals, and portfolio projects.' },
  { role: 'MERN Stack Intern', company: 'Smart Bridge', desc: 'Created full-stack deployment architectures (MongoDB, Express, React, Node.js) for Doctor Booking systems.' }
];

const certificates = [
  {
    title: "Google Cloud Platform",
    issuer: "JNTU Kakinada Workshop",
    img: "https://i.postimg.cc/ncCMkXDk/gcp.jpg",
    desc: "Hands-on certification workshop at JNTU Kakinada, mastering core GCP cloud databases, deployment tools, and virtual machine instances."
  },
  {
    title: "Web Development Internship",
    issuer: "Shadowfox Technologies",
    img: "https://i.postimg.cc/mDP2Sqcz/Whats-App-Image-2025-12-19-at-4-03-36.jpg",
    desc: "Completed multi-stage internship projects, designing dental systems, full portfolios, and responsive ecommerce applications."
  },
  {
    title: "MERN Stack Internship",
    issuer: "Smart Bridge (Govt Platform)",
    img: "https://i.postimg.cc/R0DvqRPS/Whats-App-Image-2025-12-19-at-4-03-35-PM.jpg",
    desc: "One-month hands-on full-stack virtual training ending with the deployment of a database-driven Doctor Appointment scheduler."
  },
  {
    title: "Public Wi-Fi Security (1st Prize)",
    issuer: "Project Expo - VSM College",
    img: "https://i.postimg.cc/zv1ZRPK6/Whats-App-Image-2025-12-19-at-4-03-33-PM.jpg",
    desc: "Earned 1st Prize in Project Expo for developing a modular Wi-Fi Shield using ESP8266 to block beacon flooding and traffic interception."
  },
  {
    title: "Public Wi-Fi Security (2nd Prize)",
    issuer: "Project Expo - Aditya College",
    img: "https://i.postimg.cc/prnb9MmJ/Whats-App-Image-2025-12-19-at-4-03-34-PM.jpg",
    desc: "Recognized with 2nd Prize for implementing high-efficiency networking protocols protecting user access layers."
  },
  {
    title: "Agentic AI Hackathon Participation",
    issuer: "Hackathon - Bangalore",
    img: "https://i.postimg.cc/KvPLLkhS/agentic-ai.jpg",
    desc: "Participated in the competitive Agentic AI hackathon in Bangalore, architecting complex LLM automation workflows and APIs."
  },
  {
    title: "AWS & DevOps Workshop",
    issuer: "Mohan Babu University",
    img: "https://i.postimg.cc/0NLhLHWQ/mbu.png",
    desc: "Acquired real-world insights into AWS cloud scaling, automation triggers, infrastructure scripting, and core DevOps methodologies."
  },
  {
    title: "GenAI Powered by Data Analytics",
    issuer: "Tata (Forage Simulation)",
    img: "https://i.postimg.cc/254xScjT/forage.jpg",
    desc: "Simulated business analytics deliverables, transforming visual metrics into high-level intelligence reports for corporate decision layers."
  },
  {
    title: "Big Data Foundations",
    issuer: "Infosys",
    img: "https://i.postimg.cc/90S9pZXk/Whats-App-Image-2025-12-22-at-1-28-24-PM.jpg",
    desc: "Comprehensive coursework covering Big Data structures, MapReduce algorithms, Hadoop cluster concepts, and distributed databases."
  },
  {
    title: "Graphic Design Essentials",
    issuer: "Canva Essentials Course",
    img: "https://i.postimg.cc/763tjPJW/Whats-App-Image-2025-12-22-at-1-28-23-PM.jpg",
    desc: "Studied core typography hierarchies, layout dynamics, palette harmonics, and digital banners within canvas design systems."
  },
  {
    title: "AI for Beginners",
    issuer: "HP LIFE Certification",
    img: "https://i.postimg.cc/TY65RdLW/ai-begginers.jpg",
    desc: "Accredited course in artificial intelligence foundations, deep learning frameworks, neural nodes, and general ethical AI standards."
  },
  {
    title: "AI Skills Passport",
    issuer: "EY & Microsoft",
    img: "https://i.postimg.cc/RhT8JCMY/IMG-20251226-WA0007.jpg",
    desc: "Collaborative certification with Microsoft, exploring predictive models, cognitive tools, and cloud business automation processes."
  },
  {
    title: "SIET Quiz Competition (1st Prize)",
    issuer: "SIET Academic League",
    img: "https://i.postimg.cc/qRKgTSkv/quiz.jpg",
    desc: "Secured first prize in the college-wide technical quiz event, resolving algorithms, network architectures, and code optimization puzzles."
  }
];

export const About: React.FC<{ navigateToCertificates?: () => void }> = ({ navigateToCertificates }) => {
  const { scrollToSection } = useScroll();
  const [activeTab, setActiveTab] = useState<'focus' | 'timeline' | 'certificates'>('focus');
  const [selectedImg, setSelectedImg] = useState<{ img: string; desc: string; title: string } | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-10 relative z-10 text-gray-100 select-none">
      
      {/* Top spacing helper */}
      <div className="h-16" />

      {/* Main split grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 my-auto z-10 items-center">
        
        {/* Left Panel: The Story/Identity */}
        <div className="lg:col-span-5 flex flex-col text-center lg:text-left">
          <motion.div
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-3"
          >
            01. Personal Identity
          </motion.div>
          <motion.h2
            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans heading-premium"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-xs sm:text-sm paragraph-premium max-w-md mx-auto lg:mx-0"
          >
            <p>
              I am currently pursuing my{' '}
              <span className="text-gradient-silver">B.Tech in Computer Science Engineering (3rd Year)</span> at
              Srinivasa Institute of Engineering and Technology. I thrive at the intersection of creation and automation.
            </p>
            <p>
              My key focus lies in <span className="text-gradient-indigo">DevOps, cloud architecture (AWS)</span>, 
              and crafting immersive 3D frontend interfaces. I enjoy establishing clean version controls, scaling container architectures, and implementing continuous integration pipelines.
            </p>
            <p>
              I am highly driven to apply my knowledge to full-time opportunities and creative freelance commissions where I can help automate architectures and design high-end interactive systems.
            </p>
          </motion.div>
        </div>

        {/* Right Panel: Layered Interactive System */}
        <div className="lg:col-span-7 w-full flex flex-col items-center">
          
          {/* Glass Tab Headers */}
          <div className="flex border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-full p-1 mb-6 max-w-md w-full justify-between z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)]">
            {(['focus', 'timeline', 'certificates'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-3 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold rounded-full transition-all duration-300 relative ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white/[0.08] backdrop-blur-lg border border-white/15 rounded-full z-0 shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                    transition={reduceMotion ? { duration: 0.1 } : { type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'focus' ? 'Focus Areas' : tab === 'timeline' ? 'Timelines' : 'Accreditations'}
                </span>
              </button>
            ))}
          </div>

          {/* Interactive Tab Body */}
          <div className="w-full min-h-[310px] flex items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Focus Areas */}
              {activeTab === 'focus' && (
                <motion.div
                  key="focus"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                >
                  {focusAreas.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl flex gap-4 cursor-default text-left items-start"
                    >
                      <div className="p-2 bg-white/5 rounded-xl text-white flex-shrink-0">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1.5">{item.title}</h4>
                        <p className="text-[11px] sm:text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab 2: Timeline */}
              {activeTab === 'timeline' && (
                <motion.div
                  key="timeline"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full text-left"
                >
                  {/* Education timeline */}
                  <div className="glass-panel p-5 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-white/80">
                      <GraduationCap size={16} />
                      <h4 className="text-xs uppercase tracking-widest font-bold font-sans">Academic Path</h4>
                    </div>
                    <div className="space-y-4 pl-4 border-l border-white/15 relative">
                      {educationList.map((edu, idx) => (
                        <div key={idx} className="relative group">
                          {/* Silver-White indicator */}
                          <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-white to-gray-300 shadow-[0_0_8px_rgba(255,255,255,0.7)] group-hover:scale-125 transition-transform duration-200" />
                          <h5 className="text-[11px] sm:text-xs font-semibold text-white leading-tight">{edu.degree}</h5>
                          <p className="text-[10px] text-gray-400 font-light">{edu.school}</p>
                          <span className="text-[9px] text-gray-500 font-mono">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience timeline */}
                  <div className="glass-panel p-5 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2 text-white/80">
                      <Briefcase size={16} />
                      <h4 className="text-xs uppercase tracking-widest font-bold font-sans">Internships</h4>
                    </div>
                    <div className="space-y-4 pl-4 border-l border-indigo-500/20 relative">
                      {internshipList.map((intern, idx) => (
                        <div key={idx} className="relative group">
                          {/* Silver-Gray indicator */}
                          <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 shadow-[0_0_8px_rgba(99,102,241,0.6)] group-hover:scale-125 transition-transform duration-200" />
                          <h5 className="text-[11px] sm:text-xs font-semibold text-white leading-tight">{intern.role}</h5>
                          <p className="text-[10px] text-gray-300 font-light">{intern.company}</p>
                          <p className="text-[9px] sm:text-[10px] text-gray-400 font-light mt-1 leading-snug">{intern.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Accreditations */}
              {activeTab === 'certificates' && (
                <motion.div
                  key="certificates"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col items-center gap-6"
                >
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-mono flex items-center gap-2 justify-center">
                    <Award size={12} className="text-white/60" />
                    <span>Featured Credentials (click to inspect)</span>
                  </div>
                  
                  {/* Featured Grid (4-5 items) */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {certificates.slice(0, 4).map((cert, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImg({ img: cert.img, desc: cert.desc, title: cert.title })}
                        className="interactive-card cinematic-card group relative bg-[#08080a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer text-left p-3.5 shadow-lg flex flex-col justify-between"
                        data-cursor-label="View"
                      >
                        <div>
                          <div className="w-full h-24 overflow-hidden rounded-xl mb-3 relative bg-gray-950">
                            <div className="absolute inset-0 bg-black/45 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                            <img
                              src={cert.img}
                              alt={cert.title}
                              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
                            />
                          </div>
                          <h5 className="text-[11px] sm:text-xs font-bold text-white tracking-tight line-clamp-1">{cert.title}</h5>
                          <p className="text-[9px] sm:text-[10px] text-gray-400 font-sans truncate mt-0.5">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Button */}
                  <button
                    onClick={() => navigateToCertificates?.()}
                    className="magnetic px-8 py-3.5 luxury-btn rounded-full text-[10px] uppercase tracking-wider font-bold text-gray-200 transition-all duration-200 mt-2 z-20 cursor-pointer active:scale-95 shadow-lg shadow-black/40"
                  >
                    View All Certificates
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Floating Next Experience indicator */}
      <motion.button
        onClick={() => scrollToSection(2)}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? { duration: 0.1 } : { duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10"
      >
        <span>Next Experience</span>
        <ArrowDown size={12} className="text-white/60" />
      </motion.button>

      {/* Dynamic Lightbox Modal - Luxury Fullscreen Presentation */}
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
              className="relative max-w-4xl w-full glass-panel border border-white/10 rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/5 p-2 rounded-full transition-all duration-200 z-50 cursor-pointer"
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
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Credential Spotlight</span>
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">{selectedImg.title}</h4>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">{selectedImg.desc}</p>
                
                <button 
                  onClick={() => setSelectedImg(null)}
                  className="px-6 py-2.5 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-wider font-bold text-gray-200 self-start hover:bg-white/10 transition-colors"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default About;
