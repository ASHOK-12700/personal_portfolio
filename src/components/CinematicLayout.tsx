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
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  
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

    // Create GSAP quickTo tweens with minimal smoothing for instant tracking
    // Tighter durations for near-instant tracking while keeping smoothness
    const ringX = gsap.quickTo(cursorRingRef.current, 'x', { duration: 0.03, ease: 'linear', force3D: true });
    const ringY = gsap.quickTo(cursorRingRef.current, 'y', { duration: 0.03, ease: 'linear', force3D: true });
    
    const dotX = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.006, ease: 'linear', force3D: true });
    const dotY = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.006, ease: 'linear', force3D: true });

    const spotlightX = gsap.quickTo(spotlightRef.current, 'x', { duration: 0.04, ease: 'linear', force3D: true });
    const spotlightY = gsap.quickTo(spotlightRef.current, 'y', { duration: 0.04, ease: 'linear', force3D: true });

    const parallaxX = gsap.quickTo(parallaxLayerRef.current, 'x', { duration: 0.12, ease: 'linear', force3D: true });
    const parallaxY = gsap.quickTo(parallaxLayerRef.current, 'y', { duration: 0.12, ease: 'linear', force3D: true });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Update custom cursor positions (center offsets tuned for instant feel)
      ringX(clientX - 4);
      ringY(clientY - 4);
      
      dotX(clientX - 1);
      dotY(clientY - 1);

      // Update spotlight position
      spotlightX(clientX);
      spotlightY(clientY);

      // Update parallax layer coordinates (very subtle shifting)
      const pX = (clientX - window.innerWidth / 2) * 0.02;
      const pY = (clientY - window.innerHeight / 2) * 0.02;
      parallaxX(pX);
      parallaxY(pY);
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
          setCursorLabel(prev => prev !== label ? label : prev);
        }

        // Apply luxury monochrome feedback to cursor (scale to 2.0 for spotlight expansion)
        gsap.to(cursorRingRef.current, {
          scale: 2.0,
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          borderWidth: '1px',
          duration: 0.12,
          overwrite: 'auto'
        });
        gsap.to(cursorDotRef.current, {
          scale: 0,
          opacity: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.12,
          overwrite: 'auto'
        });

        // Magnetic effect if it has the "magnetic" class
        if (interactiveEl.classList.contains('magnetic')) {
          const rect = interactiveEl.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(interactiveEl, {
            x: relX * 0.18,
            y: relY * 0.18,
            duration: 0.18,
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
        setCursorLabel(prev => prev !== '' ? '' : prev);

        // Reset cursor to original style quickly
        gsap.to(cursorRingRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: '1px',
          duration: 0.14,
          overwrite: 'auto'
        });
        gsap.to(cursorDotRef.current, {
          scale: 1,
          opacity: 1,
          backgroundColor: 'rgb(243, 244, 246)',
          duration: 0.12,
          overwrite: 'auto'
        });

        // Reset magnetic elements
        if (interactiveEl.classList.contains('magnetic')) {
          gsap.to(interactiveEl, {
            x: 0,
            y: 0,
            duration: 0.22,
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

      {/* Cinematic Vignette Overlay */}
      <div className="cinematic-vignette" />

      {/* Animated Gradient Mesh System Background */}
      {!reduceMotion && (
        <div className="gradient-mesh">
          <div className="gradient-mesh-orb mesh-orb-1" />
          <div className="gradient-mesh-orb mesh-orb-2" />
          <div className="gradient-mesh-orb mesh-orb-3" />
          <div className="gradient-mesh-orb mesh-orb-4" />
        </div>
      )}

      {/* 3D Parallax Ambient Depth Layer (12-18 particles max global backdrop particles) */}
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {Array.from({ length: isMobile ? 6 : 15 }).map((_, i) => {
            const size = i % 3 === 0 ? 'w-1 h-1' : i % 3 === 1 ? 'w-1.5 h-1.5' : 'w-2 h-2';
            const blur = i % 2 === 0 ? 'blur-[0.5px]' : 'blur-[1px]';
            const anim = i % 3 === 0 ? 'animate-particle-1' : i % 3 === 1 ? 'animate-particle-2' : 'animate-particle-3';
            const top = `${(i * 7 + 13) % 100}%`;
            const left = `${(i * 13 + 7) % 100}%`;
            const delay = `${-(i * 1.5)}s`;
            return (
              <div
                key={i}
                className={`absolute rounded-full bg-white/20 ${size} ${blur} ${anim}`}
                style={{
                  top,
                  left,
                  animationDelay: delay,
                }}
              />
            );
          })}
        </div>
      )}

      {/* 3D Parallax Blurred Ambient Light Orbs */}
      {!isMobile && !reduceMotion && !isLoading && (
        <div ref={parallaxLayerRef} className="absolute inset-0 pointer-events-none z-[2] overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.03] blur-[150px]" />
          <div className="absolute bottom-[25%] right-[20%] w-[450px] h-[450px] rounded-full bg-violet-500/[0.025] blur-[160px]" />
          <div className="absolute top-[55%] left-[65%] w-[350px] h-[350px] rounded-full bg-cyan-500/[0.025] blur-[130px]" />
        </div>
      )}

      {/* Mouse Backlight Spotlight behind typography (monochrome & soft) */}
      {!isMobile && !reduceMotion && !isLoading && (
        <div
          ref={spotlightRef}
          className="fixed top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.003) 40%, rgba(0,0,0,0) 70%)',
            mixBlendMode: 'screen',
            willChange: 'transform',
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
