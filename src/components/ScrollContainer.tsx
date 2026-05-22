import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './Navbar';

interface ScrollContextType {
  activeSection: number;
  scrollToSection: (index: number) => void;
  sectionsCount: number;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollContainer');
  }
  return context;
};

interface ScrollContainerProps {
  children: React.ReactNode;
}

const getLightingBackground = (index: number) => {
  switch (index) {
    case 0: // Hero: deep blue luxury atmosphere
      return 'radial-gradient(circle at 20% 30%, rgba(29, 78, 216, 0.05) 0%, rgba(0,0,0,0) 60%), radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.04) 0%, rgba(0,0,0,0) 60%)';
    case 1: // About: neutral charcoal cinematic mood
      return 'radial-gradient(circle at 50% 50%, rgba(63, 63, 70, 0.03) 0%, rgba(0,0,0,0) 70%), radial-gradient(circle at 10% 90%, rgba(39, 39, 42, 0.02) 0%, rgba(0,0,0,0) 50%)';
    case 2: // Skills: subtle teal technical ambience
      return 'radial-gradient(circle at 85% 20%, rgba(13, 148, 136, 0.03) 0%, rgba(0,0,0,0) 60%), radial-gradient(circle at 15% 80%, rgba(14, 116, 144, 0.02) 0%, rgba(0,0,0,0) 60%)';
    case 3: // Projects: focused high-contrast dark lighting
      return 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.015) 0%, rgba(0,0,0,0) 50%)';
    case 4: // Contact: soft emotional indigo/purple fade
      return 'radial-gradient(circle at 75% 30%, rgba(147, 51, 234, 0.04) 0%, rgba(0,0,0,0) 60%), radial-gradient(circle at 20% 70%, rgba(99, 102, 241, 0.03) 0%, rgba(0,0,0,0) 60%)';
    default:
      return 'none';
  }
};

export const ScrollContainer: React.FC<ScrollContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const sectionsCount = childrenArray.length;

  const isScrollingRef = useRef(false);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 2. Programmatically scroll to a specific section
  const scrollToSection = (index: number) => {
    if (!containerRef.current || index < 0 || index >= sectionsCount) return;
    
    isScrollingRef.current = true;
    setActiveSection(index);

    const height = containerRef.current.clientHeight;
    
    containerRef.current.scrollTo({
      top: index * height,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });

    // Reset lock after scroll animation finishes (faster if reduced motion)
    setTimeout(() => {
      isScrollingRef.current = false;
    }, reduceMotion ? 100 : 800);
  };

  // 3. Track scrolling manually for mobile / touch which don't use Lenis
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      if (height === 0) return;
      
      const newIndex = Math.round(scrollTop / height);
      if (newIndex !== activeSection && newIndex >= 0 && newIndex < sectionsCount) {
        setActiveSection(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeSection, sectionsCount]);

  // 4. Initialize Lenis inertia scrolling for desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip Lenis on mobile/touch interfaces or if reduced motion is enabled
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    if (isMobileDevice || reduceMotion) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      duration: 1.1, // Cinematic transition length
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    let animationFrameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    lenis.on('scroll', () => {
      if (isScrollingRef.current) return;
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      if (height === 0) return;
      
      const newIndex = Math.round(scrollTop / height);
      if (newIndex !== activeSection && newIndex >= 0 && newIndex < sectionsCount) {
        setActiveSection(newIndex);
      }
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection, sectionsCount, reduceMotion]);

  return (
    <ScrollContext.Provider value={{ activeSection, scrollToSection, sectionsCount }}>
      {/* Floating navigation header */}
      <Navbar />

      {/* Cinematic Lighting Evolution Overlay */}
      {!reduceMotion && (
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ background: getLightingBackground(activeSection) }}
        />
      )}

      <div 
        ref={containerRef} 
        className="snap-container w-full h-screen overflow-y-auto scroll-smooth relative"
      >
        <div className="w-full flex flex-col">
          {childrenArray.map((child, index) => (
            <div 
              key={index} 
              className="snap-section w-full h-screen flex-shrink-0 relative overflow-hidden"
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </ScrollContext.Provider>
  );
};

export default ScrollContainer;
