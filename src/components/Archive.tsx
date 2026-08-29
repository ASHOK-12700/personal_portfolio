import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

interface ArchiveItem {
  id: number;
  title: string;
  category: string;
  img: string;
}

const archiveItems: ArchiveItem[] = [
  {
    id: 1,
    title: 'Public Wi-Fi Security 1st Prize Award Certificate',
    category: 'Project Expo · VSM College',
    img: 'https://i.postimg.cc/zv1ZRPK6/Whats-App-Image-2025-12-19-at-4-03-33-PM.jpg',
  },
  {
    id: 2,
    title: 'Google Cloud Platform Certification',
    category: 'JNTU Kakinada Workshop',
    img: 'https://i.postimg.cc/ncCMkXDk/gcp.jpg',
  },
  {
    id: 3,
    title: 'Agentic AI Hackathon Bangalore',
    category: 'AI Hackathon Milestone',
    img: 'https://i.postimg.cc/KvPLLkhS/agentic-ai.jpg',
  },
  {
    id: 4,
    title: 'AWS & DevOps Workshop Certification',
    category: 'Mohan Babu University',
    img: 'https://i.postimg.cc/0NLhLHWQ/mbu.png',
  },
  {
    id: 5,
    title: 'Public Wi-Fi Security 2nd Prize Award',
    category: 'Project Expo · Aditya College',
    img: 'https://i.postimg.cc/prnb9MmJ/Whats-App-Image-2025-12-19-at-4-03-34-PM.jpg',
  },
  {
    id: 6,
    title: 'Web Development Internship Certification',
    category: 'Shadowfox Technologies',
    img: 'https://i.postimg.cc/mDP2Sqcz/Whats-App-Image-2025-12-19-at-4-03-36.jpg',
  },
];

export const Archive: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<ArchiveItem | null>(null);

  return (
    <section id="archive" className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">06</span> Visual Collection
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          Archive &amp;{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            Visuals.
          </em>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          An editorial compilation of verified project milestones, hardware security achievements, and engineering credentials.
        </p>
      </div>

      {/* Grid matching reference blueprint */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {archiveItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedImg(item)}
            className="editorial-card rounded-2xl p-3 cursor-pointer group relative overflow-hidden"
          >
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/90 relative">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 size={24} className="text-white" />
              </div>
            </div>

            <div className="p-3">
              <p className="text-[10px] font-mono text-gray-400 uppercase">{item.category}</p>
              <h3 className="text-sm font-semibold text-white font-sans truncate mt-0.5">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#0a0a0f] border border-white/15 rounded-3xl p-6 shadow-2xl text-left"
            >
              <button
                type="button"
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="aspect-[4/3] w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-4">
                <img src={selectedImg.img} alt={selectedImg.title} className="max-w-full max-h-full object-contain" />
              </div>

              <p className="text-xs font-mono text-red-accent uppercase">{selectedImg.category}</p>
              <h3 className="text-xl font-bold text-white font-sans mt-1">{selectedImg.title}</h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Archive;
