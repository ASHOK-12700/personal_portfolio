import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds loader duration
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min((step / steps) * 100, 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.03,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const name = "ASHOK SRINIVAS";
  const nameArray = name.split("");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 1, scale: 1 }}
          exit="exit"
          className="fixed inset-0 bg-[#030303] z-[99999] flex flex-col justify-center items-center select-none"
        >
          {/* Subtle noise texture */}
          <div className="cinematic-noise opacity-[0.015]" />

          {/* Letter Stagger reveal */}
          <div className="mb-8 overflow-hidden flex justify-center items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extralight tracking-[0.35em] text-white flex select-none font-sans">
              {nameArray.map((letter, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: idx * 0.04 + 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={letter === " " ? "mr-4" : ""}
                >
                  {letter}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Thin Progress bar */}
          <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="mt-4 text-[9px] uppercase tracking-[0.25em] text-gray-400 font-mono"
          >
            Creative Portfolio // 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
