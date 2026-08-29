import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cloud, Code, Layout, Heart } from 'lucide-react';

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Hook into scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax horizontal shifts for marquee rows driven by scroll
  const row1X = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const row2X = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const row3X = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const row4X = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Skew/depth parameters based on scroll
  const skewX = useTransform(scrollYProgress, [0, 1], [-12, -6]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 8]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-18, -10]);

  const categories = [
    {
      title: 'Cloud & DevOps Systems',
      icon: Cloud,
      skills: [
        'AWS (EC2, S3, Lambda)',
        'Docker & Containers',
        'CI/CD Pipelines',
        'Terraform (IaC)',
        'Kubernetes basics',
        'Linux Systems & Git',
        'Network Security Protocols',
      ],
      xTranslation: row1X,
      direction: 'normal',
      color: 'text-red-accent border-red-500/20 bg-red-950/10',
    },
    {
      title: 'Programming & Backend',
      icon: Code,
      skills: [
        'Python',
        'Java',
        'Node.js & Express',
        'MongoDB',
        'Firebase Cloud',
      ],
      xTranslation: row2X,
      direction: 'reverse',
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-950/10',
    },
    {
      title: 'Frontend Engineering',
      icon: Layout,
      skills: [
        'React.js',
        'TypeScript',
        'JavaScript (ES6+)',
        'Tailwind CSS',
        'HTML5 & CSS3',
      ],
      xTranslation: row3X,
      direction: 'normal',
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/10',
    },
    {
      title: 'AI & Methodologies',
      icon: Heart,
      skills: [
        'Android Kotlin Voice AI',
        'LLM Prompt Engineering',
        'Speech Synthesis (TTS)',
        'Canva Design & Assets',
        'Technical Problem Solving',
      ],
      xTranslation: row4X,
      direction: 'reverse',
      color: 'text-amber-400 border-amber-500/20 bg-amber-950/10',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="toolkit"
      className="relative w-full py-28 px-6 md:px-12 max-w-7xl mx-auto text-left overflow-hidden bg-[#050507]"
      style={{ perspective: '1600px' }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-accent/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="mb-20 max-w-3xl relative z-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">03 //</span> Core Stack
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          Technical{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            Toolkit.
          </em>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          The verified tools, cloud platforms, programming languages, and frameworks I use to build, automate, and deploy production software.
        </p>
        <p className="mt-2 text-xs font-mono text-gray-500">
          22 TECHNOLOGIES · 4 CORE DISCIPLINES
        </p>
      </div>

      {/* 3D Angled Marquee Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          skewX,
          transformStyle: 'preserve-3d',
        }}
        className="w-full space-y-6 md:space-y-8 select-none py-10 origin-center transform-gpu"
      >
        {categories.map((cat, catIdx) => {
          const isRev = cat.direction === 'reverse';
          return (
            <motion.div
              key={catIdx}
              style={{ x: cat.xTranslation, transformStyle: 'preserve-3d' }}
              className="relative flex whitespace-nowrap overflow-visible group"
            >
              {/* Row Header Label floating on Z-depth */}
              <div 
                className="absolute left-4 -top-6 z-20 font-mono text-[9px] uppercase tracking-widest text-gray-500 bg-[#050507] px-2 py-0.5 border border-white/5 rounded-md"
                style={{ transform: 'translateZ(30px)' }}
              >
                <cat.icon size={10} className="inline mr-1 text-red-accent" />
                {cat.title}
              </div>

              {/* Infinite Marquee Track */}
              <div className={`flex items-center gap-4 ${isRev ? 'animate-marquee-reverse' : 'animate-marquee'} marquee-track`}>
                {[...cat.skills, ...cat.skills, ...cat.skills, ...cat.skills].map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ scale: 1.06, rotateZ: isRev ? -1 : 1, translateZ: 40 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-mono tracking-wider font-semibold shadow-lg backdrop-blur-md flex items-center gap-3 cursor-pointer ${cat.color}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <span>{skill}</span>
                    <span className="text-red-accent text-sm">✦</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
