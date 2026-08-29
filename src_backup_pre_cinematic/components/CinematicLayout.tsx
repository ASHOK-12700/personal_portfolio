import React, { useEffect, useState } from 'react';

interface CinematicLayoutProps {
  children: React.ReactNode;
}

export const CinematicLayout: React.FC<CinematicLayoutProps> = ({ children }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  return (
    <div className={`relative w-full min-h-screen bg-[#050507] text-white ${isDesktop ? 'custom-cursor-active' : ''}`}>
      {/* Subtle Grain Overlay */}
      <div className="grain-overlay" />

      {/* High-Performance Lightweight Custom Cursor on Desktop */}
      {isDesktop && (
        <div
          className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/40 pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)` }}
        />
      )}

      {/* Main Experience Layout */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default CinematicLayout;
