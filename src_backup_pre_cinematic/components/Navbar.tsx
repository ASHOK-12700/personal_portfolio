import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Toolkit', href: '#toolkit' },
    { name: 'Work', href: '#work' },
    { name: 'Certificates', href: '#/certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050507]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo matching reference */}
        <a
          href="#home"
          className="text-lg md:text-xl font-bold tracking-tight text-white font-sans flex items-center gap-1 group"
        >
          <span>ASHOK</span>
          <span className="text-red-accent font-serif-italic text-2xl group-hover:scale-125 transition-transform duration-300">
            .
          </span>
        </a>

        {/* Desktop Links with Text Roll animation matching reference */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '').replace('/', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-mono relative py-1 group ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                    {link.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white font-semibold"
                  >
                    {link.name}
                  </span>
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-accent rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="https://drive.google.com/file/d/1uEC2wq-CMXKWZ6HTXe31ysjQf-h56SYw/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs uppercase tracking-widest font-mono px-4 py-2 border border-white/15 rounded-full text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            Resume ↗
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sheet */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#050507]/95 backdrop-blur-2xl z-40 flex flex-col p-8 border-t border-white/10">
          <nav className="flex flex-col gap-6 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg uppercase tracking-widest font-mono text-gray-300 hover:text-white border-b border-white/5 pb-3"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1uEC2wq-CMXKWZ6HTXe31ysjQf-h56SYw/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-center text-xs uppercase tracking-widest font-mono py-3 bg-white text-black font-bold rounded-full"
            >
              View Resume ↗
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
