import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Preloader from './Preloader';

interface CinematicLayoutProps {
  children: React.ReactNode;
}

export const CinematicLayout: React.FC<CinematicLayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(true);
  const [cursorLabel, setCursorLabel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  // 1. Detect device type to toggle custom cursor
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // 2. Detect prefers-reduced-motion settings
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 3. Animate Cursor & Spotlight using GSAP quickTo (only if not mobile and not reduced motion)
  useEffect(() => {
    if (isMobile || reduceMotion || isLoading) {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    // Apply cursor-active class to body to hide standard cursor on desktop
    document.body.classList.add('custom-cursor-active');

    // Create GSAP quickTo tweens with smooth deceleration easing
    const ringX = gsap.quickTo(cursorRingRef.current, 'x', { duration: 0.25, ease: 'power3.out' });
    const ringY = gsap.quickTo(cursorRingRef.current, 'y', { duration: 0.25, ease: 'power3.out' });
    
    const dotX = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.06, ease: 'power2.out' });
    const dotY = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.06, ease: 'power2.out' });

    const spotlightX = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
    const spotlightY = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update custom cursor positions (ring has small offset to center it)
      ringX(clientX - 16);
      ringY(clientY - 16);
      
      dotX(clientX - 3);
      dotY(clientY - 3);

      // Update spotlight position
      spotlightX(clientX);
      spotlightY(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Hover listeners for magnetic / scaling animations
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('a, button, input, textarea, [role="button"], .interactive-card');
      
      if (interactiveEl) {
        const label = interactiveEl.getAttribute('data-cursor-label');
        if (label) {
          setCursorLabel(label);
        }

        // Apply luxury monochrome feedback to cursor (scale to 1.4)
        gsap.to(cursorRingRef.current, {
          scale: 1.4,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          borderWidth: '1px',
          duration: 0.2,
          overwrite: 'auto'
        });
        gsap.to(cursorDotRef.current, {
          scale: 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.2,
          overwrite: 'auto'
        });

        // Magnetic effect if it has the "magnetic" class
        if (interactiveEl.classList.contains('magnetic')) {
          const rect = interactiveEl.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(interactiveEl, {
            x: relX * 0.2,
            y: relY * 0.2,
            duration: 0.25,
            ease: 'power2.out'
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest('a, button, input, textarea, [role="button"], .interactive-card');
      
      if (interactiveEl) {
        setCursorLabel('');

        // Reset cursor to original style
        gsap.to(cursorRingRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '1px',
          duration: 0.25,
          overwrite: 'auto'
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          backgroundColor: 'rgb(243, 244, 246)',
          duration: 0.25,
          overwrite: 'auto'
        });

        // Reset magnetic elements
        if (interactiveEl.classList.contains('magnetic')) {
          gsap.to(interactiveEl, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power3.out'
          });
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile, reduceMotion, isLoading]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#030303] select-none">
      {/* Preloader Experience */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Cinematic Jittering Noise Film Texture Overlay */}
      <div className="cinematic-noise" />

      {/* Ambient static lighting fallback or slow floating orbs (disabled in reduced motion) */}
      {!reduceMotion && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] rounded-full ambient-glow-blue pointer-events-none z-0" />
          <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vh] rounded-full ambient-glow-purple pointer-events-none z-0" />
        </>
      )}

      {/* Mouse Backlight Spotlight behind typography (monochrome & soft) */}
      {!isMobile && !reduceMotion && !isLoading && (
        <div
          ref={spotlightRef}
          className="fixed top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.003) 40%, rgba(0,0,0,0) 70%)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Interactive Custom Cursor elements */}
      {!isMobile && !reduceMotion && !isLoading && (
        <>
          <div
            ref={cursorRingRef}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gray-400/40 pointer-events-none z-[9999] flex items-center justify-center transition-opacity duration-300"
            style={{ willChange: 'transform' }}
          >
            {cursorLabel && (
              <span className="text-[7px] tracking-wider uppercase font-semibold text-white/70 font-sans pointer-events-none select-none absolute">
                {cursorLabel}
              </span>
            )}
          </div>
          <div
            ref={cursorDotRef}
            className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gray-100 pointer-events-none z-[9999]"
            style={{ willChange: 'transform' }}
          />
        </>
      )}

      {/* Main Experience content layout */}
      <div className="relative w-full h-full z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default CinematicLayout;
