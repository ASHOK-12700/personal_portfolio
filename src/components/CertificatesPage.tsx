import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Award, ExternalLink, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';

export interface CertificateItem {
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

interface CertificatesPageProps {
  navigateHome?: () => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ navigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const filtered = certificatesList.filter((cert) => {
    const matchesCat = selectedCategory === 'all' || cert.category === selectedCategory;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-left">
      <Navbar />

      {/* Back to Home Button */}
      <div className="mb-8">
        <a
          href="#home"
          onClick={(e) => {
            if (navigateHome) {
              e.preventDefault();
              navigateHome();
            }
          }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Portfolio</span>
        </a>
      </div>

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">05</span> Credentials &amp; Achievements
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
          Accredited{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            Certifications.
          </em>
        </h1>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          Verified academic certifications, industry internships, project expo awards, and technical hackathon milestones.
        </p>
      </div>

      {/* Controls: Categories & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-white/10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All (13)' },
            { id: 'cloud', label: 'Cloud & DevOps' },
            { id: 'internship', label: 'Internships' },
            { id: 'awards', label: 'Awards & Expos' },
            { id: 'foundations', label: 'Foundations & AI' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search credentials..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/30 font-mono"
          />
        </div>
      </div>

      {/* Grid of Certificates matching reference blueprint aspect ratio rules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActiveCert(cert)}
            className="editorial-card rounded-2xl p-4 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Preserved Aspect Ratio Container */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/90 border border-white/10 mb-4 relative">
                <img
                  src={cert.img}
                  alt={cert.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="text-[10px] font-mono text-gray-400 mb-1 flex items-center justify-between">
                <span>{cert.issuer}</span>
                <span>{cert.date}</span>
              </div>

              <h3 className="text-base font-bold text-white font-sans group-hover:text-red-accent transition-colors line-clamp-1">
                {cert.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {cert.skills.map((s, idx) => (
                  <span key={idx} className="text-[9px] font-mono text-gray-300 px-2 py-0.5 bg-white/5 border border-white/10 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 group-hover:text-white">
              <span>Inspect Credential</span>
              <span>↗</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
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
                onClick={() => setActiveCert(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white z-10"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Full Uncropped Image View */}
                <div className="md:col-span-7 aspect-[4/3] bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center p-2">
                  <img
                    src={activeCert.img}
                    alt={activeCert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-red-accent uppercase mb-2">
                      <Award size={14} />
                      <span>{activeCert.issuer}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mb-2">
                      {activeCert.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400 mb-4">{activeCert.date}</p>

                    <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {activeCert.desc}
                    </p>

                    <div className="space-y-2">
                      <p className="text-[10px] font-mono uppercase text-gray-400">VERIFIED SKILLS</p>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCert.skills.map((s, idx) => (
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
                      onClick={() => setActiveCert(null)}
                      className="px-6 py-2.5 bg-white text-black font-semibold text-xs font-mono uppercase rounded-full hover:bg-gray-200"
                    >
                      Close Lightbox
                    </button>
                    {activeCert.link && (
                      <a
                        href={activeCert.link}
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
    </div>
  );
};

export default CertificatesPage;
