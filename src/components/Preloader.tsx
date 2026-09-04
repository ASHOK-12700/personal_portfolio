import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryHeading } from '../shaders/neuform-isolated/NeuformIsolatedEffects';
import '../shaders/threeui.css';

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
        }, 600);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Exit transition representing camera zooming in / entering the site
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.08,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isDone && (
        <motion.div
          variants={containerVariants}
          initial={{ opacity: 1, scale: 1 }}
          exit="exit"
          className="fixed inset-0 bg-[#000000] z-[99999] flex flex-col justify-between items-center select-none overflow-hidden py-12"
        >
          {/* Subtle noise texture */}
          <div className="grain-overlay opacity-[0.015]" />

          {/* Spacer */}
          <div />

          {/* ThreeUI GalleryHeading Integration as the main name visual */}
          <div className="w-full h-[60vh] relative flex items-center justify-center">
            <GalleryHeading
              variant="falling-diagonal"
              mode="dark"
              font="sans"
              weight="700"
              headlineSize={1.20}
              hue={0}
              saturation={1.00}
              brightness={1.00}
              style={{ pointerEvents: 'none' }}
            />
          </div>

          {/* Technical Progress indicator at the bottom */}
          <div className="flex flex-col items-center gap-3 relative z-10 w-full px-6 max-w-sm mb-6">
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden rounded-full">
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
                animate={{ opacity: 0.5, y: 0 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
