import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing 3D Render Engine...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2400; // 2.4 seconds total duration
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const textSequence = [
      { threshold: 15, text: 'Mapping coordinates and grid nodes...' },
      { threshold: 40, text: 'Loading DevOps & cloud architecture pipeline...' },
      { threshold: 65, text: 'Compiling IoT security circular ring buffers...' },
      { threshold: 85, text: 'Initializing AI SpeechRecognizer modules...' },
      { threshold: 98, text: 'Stitching visual chapters...' },
    ];

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min((step / steps) * 100, 100);
      setProgress(currentProgress);

      const matchingText = textSequence.find((seq) => currentProgress <= seq.threshold);
      if (matchingText) {
        setStatusText(matchingText.text);
      } else if (currentProgress >= 100) {
        setStatusText('Experience Ready.');
      }

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const name = "ASHOK SRINIVAS";
  const nameArray = name.split("");

  // Z-axis fly-through animation container
  const containerVariants = {
    exit: {
      opacity: [1, 1, 0],
      scale: 1.05,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9, rotateX: 30 },
    animate: (idx: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.0,
        delay: idx * 0.05 + 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: (idx: number) => {
      // Calculate directions to fly past the camera (Z-depth)
      const mid = nameArray.length / 2;
      const xOffset = (idx - mid) * 120; // spread outwards
      return {
        opacity: 0,
        scale: 6, // zoom into camera
        x: xOffset,
        z: 800, // Z-depth translation simulate 3D flyby
        rotateX: -45,
        filter: 'blur(8px)',
        transition: {
          duration: 0.9,
          delay: idx * 0.02,
          ease: [0.76, 0, 0.24, 1],
        },
      };
    },
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 1, scale: 1 }}
          exit="exit"
          className="fixed inset-0 bg-[#050507] z-[99999] flex flex-col justify-center items-center select-none overflow-hidden"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Noise overlay */}
          <div className="grain-overlay opacity-[0.015]" />

          {/* Cinematic lighting backdrop */}
          <div className="absolute w-[450px] h-[450px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Letter Stagger reveal */}
          <div className="mb-10 overflow-hidden flex justify-center items-center select-none">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.25em] text-white flex select-none font-sans uppercase">
              {nameArray.map((letter, idx) => (
                <motion.span
                  key={idx}
                  custom={idx}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={letter === " " ? "mr-6" : "inline-block origin-center"}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Technical Progress indicator */}
          <div className="flex flex-col items-center gap-3 relative z-10">
            <div className="w-56 sm:w-72 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-red-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            <div className="flex flex-col items-center gap-1">
              <motion.span 
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono text-center h-4 max-w-xs truncate"
              >
                {statusText}
              </motion.span>

              <span className="text-[10px] text-red-accent/60 font-mono tracking-widest font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Subtitle footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute bottom-8 text-[9px] uppercase tracking-[0.3em] text-gray-500 font-mono"
          >
            PORTFOLIO BLUEPRINT // ASHOK SRINIVAS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
