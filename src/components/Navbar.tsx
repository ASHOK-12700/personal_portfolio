import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScroll } from './ScrollContainer';

const navLinks = [
  { name: 'Intro', index: 0 },
  { name: 'About', index: 1 },
  { name: 'Skills', index: 2 },
  { name: 'Projects', index: 3 },
  { name: 'Contact', index: 4 },
  { name: 'Certificates', index: 5 }
];

export const Navbar: React.FC = () => {
  const { activeSection, scrollToSection } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isCertificatesRoute, setIsCertificatesRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      setIsCertificatesRoute(
        hash === '#/certificates' || 
        hash === '#/certifications' || 
        path === '/certificates' || 
        path === '/certifications'
      );
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleNavClick = (linkIndex: number) => {
    if (linkIndex === 5) {
      window.location.hash = '#/certificates';
      window.dispatchEvent(new Event('popstate'));
    } else {
      scrollToSection(linkIndex);
    }
  };

  const isLinkActive = (linkIndex: number) => {
    if (isCertificatesRoute) {
      return linkIndex === 5;
    }
    return activeSection === linkIndex;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] py-4 px-6 md:px-12 select-none pointer-events-none">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-full py-2.5 px-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.5)] pointer-events-auto transition-colors duration-300">
        
        {/* Left Side Logo */}
        <div 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2 cursor-pointer group magnetic"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500">
            <img
              src="https://i.postimg.cc/hGcfBpXG/Gemini-Generated-Image-3a15ma3a15ma3a15.png"
              alt="Logo"
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
          </div>
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300">
            Ashok <span className="text-gray-400 font-light lowercase">srinivas</span>
          </div>
        </div>

        {/* Right Side: Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.index}
              onClick={() => handleNavClick(link.index)}
              className={`text-[10px] uppercase tracking-widest font-bold font-sans transition-all duration-500 relative py-1 cursor-pointer hover:-translate-y-[1px] hover:scale-[1.03] ${
                isLinkActive(link.index) ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {isLinkActive(link.index) && (
                <span className="absolute bottom-[-2px] left-0 w-full h-[1.5px] bg-gradient-to-r from-white/60 via-white to-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 w-full h-screen bg-black/95 backdrop-blur-xl z-[-1] flex flex-col justify-center items-center pointer-events-auto transition-opacity duration-300">
          <div className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <button
                key={link.index}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => handleNavClick(link.index), 200);
                }}
                className={`text-lg uppercase tracking-widest font-bold font-sans transition-all duration-300 ${
                  isLinkActive(link.index) ? 'text-white border-b border-white pb-1' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

