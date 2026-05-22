import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScroll } from './ScrollContainer';

const navLinks = [
  { name: 'Intro', index: 0 },
  { name: 'About', index: 1 },
  { name: 'Skills', index: 2 },
  { name: 'Projects', index: 3 },
  { name: 'Contact', index: 4 }
];

export const Navbar: React.FC = () => {
  const { activeSection, scrollToSection } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 select-none pointer-events-none">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center bg-black/40 border border-white/5 backdrop-blur-md rounded-full py-2.5 px-6 shadow-xl pointer-events-auto transition-colors duration-300">
        
        {/* Left Side Logo */}
        <div 
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 cursor-pointer group magnetic"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors duration-500">
            <img
              src="https://i.postimg.cc/hGcfBpXG/Gemini-Generated-Image-3a15ma3a15ma3a15.png"
              alt="Logo"
              className="w-full h-full object-cover"
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
              onClick={() => scrollToSection(link.index)}
              className={`text-[10px] uppercase tracking-widest font-bold font-sans transition-all duration-200 relative py-1 cursor-pointer ${
                activeSection === link.index ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {link.name}
              {activeSection === link.index && (
                <span className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-white rounded-full" />
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
                  setTimeout(() => scrollToSection(link.index), 200);
                }}
                className={`text-lg uppercase tracking-widest font-bold font-sans transition-all duration-300 ${
                  activeSection === link.index ? 'text-white border-b border-white pb-1' : 'text-gray-500 hover:text-gray-300'
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
