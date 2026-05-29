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
    // Return fallback to prevent crashing when rendered outside ScrollContainer (e.g. on deep pages)
    return {
      activeSection: -1,
      scrollToSection: (index: number) => {
        // Fallback action: if certificates page, go back to landing page and save target index
        const hash = window.location.hash;
        const path = window.location.pathname;
        const isCertificatesPage = hash === '#/certificates' || hash === '#/certifications' || path === '/certificates' || path === '/certifications';
        if (isCertificatesPage) {
          sessionStorage.setItem('scrollTargetSection', String(index));
          window.location.hash = '';
          window.history.pushState(null, '', '/');
          window.dispatchEvent(new Event('popstate'));
        }
      },
      sectionsCount: 5
    };
  }
  return context;
};

interface ScrollContainerProps {
  children: React.ReactNode;
}

const getLightingBackground = (index: number) => {
  switch (index) {
    case 0: // Hero: deep blue & indigo luxury atmosphere
      return 'radial-gradient(circle at 20% 30%, rgba(79, 70, 229, 0.12) 0%, rgba(30, 58, 138, 0.04) 40%, rgba(0,0,0,0) 70%), radial-gradient(circle at 80% 80%, rgba(30, 58, 138, 0.1) 0%, rgba(0,0,0,0) 60%)';
    case 1: // About: neutral silver-indigo atmosphere
      return 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.08) 0%, rgba(203, 213, 225, 0.03) 40%, rgba(0,0,0,0) 75%), radial-gradient(circle at 10% 90%, rgba(79, 70, 229, 0.06) 0%, rgba(0,0,0,0) 60%)';
    case 2: // Skills: technical cyan ambience
      return 'radial-gradient(circle at 85% 20%, rgba(6, 182, 212, 0.1) 0%, rgba(14, 116, 144, 0.03) 50%, rgba(0,0,0,0) 70%), radial-gradient(circle at 15% 80%, rgba(6, 182, 212, 0.08) 0%, rgba(0,0,0,0) 60%)';
    case 3: // Projects: focused high-contrast dark lighting
      return 'radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(30, 58, 138, 0.03) 45%, rgba(0,0,0,0) 70%)';
    case 4: // Contact: soft emotional violet/indigo fade
      return 'radial-gradient(circle at 75% 30%, rgba(124, 58, 237, 0.12) 0%, rgba(79, 70, 229, 0.06) 45%, rgba(0,0,0,0) 75%), radial-gradient(circle at 20% 70%, rgba(124, 58, 237, 0.08) 0%, rgba(0,0,0,0) 60%)';
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

  // 2b. Check if there is a target section queued from the Certificates page
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTargetSection');
    if (target !== null) {
      sessionStorage.removeItem('scrollTargetSection');
      const index = parseInt(target, 10);
      setTimeout(() => {
        scrollToSection(index);
      }, 400); // Allow browser rendering / page transition to complete
    }
  }, []);

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
