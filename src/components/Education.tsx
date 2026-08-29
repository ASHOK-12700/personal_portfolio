import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Chapter {
  num: string;
  year: string;
  title: string;
  place: string;
  story: string;
  bridge: string;
}

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire section which will have 300vh height
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const chapters: Chapter[] = [
    {
      num: "01",
      year: '2016 – 2021',
      title: 'Secondary Foundations',
      place: 'ZPHS High School · G. Vemavaram',
      story: 'Built foundational academic discipline and problem-solving skills in mathematics and physical sciences, laying the groundwork for a technical path.',
      bridge: 'The initial step before entering computing.',
    },
    {
      num: "02",
      year: '2021 – 2023',
      title: 'Pre-Engineering Mathematics & Physics',
      place: 'VVS Narayana Raju Junior College',
      story: 'Completed Intermediate Education (MPC) with a strong focus on advanced algebra, calculus, and mechanics, preparing for formal computer science engineering.',
      bridge: 'Developing the analytical mindset required for complex systems.',
    },
    {
      num: "03",
      year: '2023 – Present',
      title: 'B.Tech in Computer Science Engineering',
      place: 'Srinivasa Institute of Engineering & Technology (SIET)',
      story: 'Pursuing B.Tech CSE (3rd Year). Mastered core algorithms, data structures, operating systems, computer networking, and cloud system architectures.',
      bridge: 'Translating computer science theory into real software.',
    },
  ];

  // We map scroll progress (0 to 1) to active states for the progress bar and chapter indicator
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Chapter 1 transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 0.95, 0.7]);
  const y1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [0, -40, -150]);
  const rotateX1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [0, -5, -20]);
  const z1 = useTransform(scrollYProgress, [0, 0.28, 0.35], [0, -30, -200]);

  // Chapter 2 transforms
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35, 0.62, 0.69],
    [0, 0, 1, 1, 0]
  );
  const scale2 = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35, 0.62, 0.69],
    [0.75, 0.85, 1, 0.95, 0.7]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35, 0.62, 0.69],
    [150, 60, 0, -40, -150]
  );
  const rotateX2 = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35, 0.62, 0.69],
    [20, 10, 0, -5, -20]
  );
  const z2 = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35, 0.62, 0.69],
    [-200, -100, 0, -30, -200]
  );

  // Chapter 3 transforms
  const opacity3 = useTransform(scrollYProgress, [0, 0.62, 0.69, 1], [0, 0, 1, 1]);
  const scale3 = useTransform(scrollYProgress, [0, 0.62, 0.69, 1], [0.75, 0.85, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0, 0.62, 0.69, 1], [150, 60, 0, 0]);
  const rotateX3 = useTransform(scrollYProgress, [0, 0.62, 0.69, 1], [20, 10, 0, 0]);
  const z3 = useTransform(scrollYProgress, [0, 0.62, 0.69, 1], [-200, -100, 0, 0]);

  // Combine transforms arrays to easily render
  const chapterTransforms = [
    { opacity: opacity1, scale: scale1, y: y1, rotateX: rotateX1, z: z1 },
    { opacity: opacity2, scale: scale2, y: y2, rotateX: rotateX2, z: z2 },
    { opacity: opacity3, scale: scale3, y: y3, rotateX: rotateX3, z: z3 },
  ];

  return (
    <div ref={sectionRef} id="education" className="relative w-full h-[300vh]">
      {/* Sticky viewport container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#050507] flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pt-16 pb-12">
          
          {/* Left Column: Fixed Header and Timeline Progress Indicator */}
          <div className="lg:col-span-4 flex flex-col justify-between h-auto lg:h-[65%] border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-10">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-accent inline-block" />
                <span className="text-red-accent font-semibold">02 //</span> Chronology
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
                Academic<br />
                <em className="font-serif-italic font-normal text-red-accent">
                  Milestones.
                </em>
              </h2>
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-sm">
                Scroll to progress through my education pathway. Visualized as chapter stages of academic development.
              </p>
            </div>

            {/* Technical Progress Timeline */}
            <div className="hidden lg:flex items-center gap-6 mt-12">
              <div className="relative h-32 w-[2px] bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-red-accent origin-top"
                  style={{ height: progressLineHeight }}
                />
              </div>
              <div className="font-mono text-[10px] space-y-4 text-gray-500">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full border border-red-accent ${scrollYProgress.get() < 0.33 ? 'bg-red-accent' : ''}`} />
                  <span>CHAPTER 01</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full border border-red-accent ${(scrollYProgress.get() >= 0.33 && scrollYProgress.get() < 0.66) ? 'bg-red-accent' : ''}`} />
                  <span>CHAPTER 02</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full border border-red-accent ${scrollYProgress.get() >= 0.66 ? 'bg-red-accent' : ''}`} />
                  <span>CHAPTER 03</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Chapter Scene */}
          <div 
            className="lg:col-span-8 relative w-full h-[60vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {chapters.map((chap, idx) => {
              const trans = chapterTransforms[idx];
              return (
                <motion.div
                  key={idx}
                  style={{
                    opacity: trans.opacity,
                    scale: trans.scale,
                    y: trans.y,
                    rotateX: trans.rotateX,
                    z: trans.z,
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute w-full max-w-2xl bg-[#09090e]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl transition-shadow duration-500 hover:shadow-red-accent/5"
                >
                  {/* Subtle Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-accent/5 rounded-full blur-[80px] pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="font-mono text-xs text-red-accent tracking-widest font-semibold">
                      CHAPTER {chap.num} // EDUCATION
                    </span>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white/20">
                      {chap.year}
                    </span>
                  </div>

                  {/* Institution Details */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white font-sans mb-2">
                    {chap.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mb-6 uppercase tracking-wider">
                    {chap.place}
                  </p>

                  {/* Story Description */}
                  <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-8">
                    {chap.story}
                  </p>

                  {/* Connector Bridge */}
                  <div className="flex items-center gap-2 border-t border-white/5 pt-4 text-xs font-mono text-gray-400">
                    <span className="text-red-accent">✦</span>
                    <span className="italic">{chap.bridge}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Education;
