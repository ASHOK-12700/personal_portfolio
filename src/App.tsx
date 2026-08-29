import React, { useState, useEffect } from 'react';
import CinematicLayout from './components/CinematicLayout';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import CertificatesPage from './components/CertificatesPage';
import Archive from './components/Archive';
import Contact, { Footer } from './components/Contact';

function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (
      hash === '#/certificates' ||
      hash === '#/certifications' ||
      hash === '#certificates' ||
      path === '/certificates' ||
      path === '/certifications'
    ) {
      return '/certificates';
    }
    return '/';
  });

  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (
        hash === '#/certificates' ||
        hash === '#/certifications' ||
        hash === '#certificates' ||
        path === '/certificates' ||
        path === '/certifications'
      ) {
        setCurrentPath('/certificates');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Track active section for navbar highlight
  useEffect(() => {
    if (currentPath === '/certificates') return;

    const sections = ['home', 'about', 'journey', 'toolkit', 'work', 'archive', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const navigateHome = () => {
    window.location.hash = '';
    window.history.pushState(null, '', '/');
    setCurrentPath('/');
  };

  return (
    <CinematicLayout>
      {currentPath === '/certificates' ? (
        <CertificatesPage navigateHome={navigateHome} />
      ) : (
        <div className="w-full min-h-screen">
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Journey />
            <Skills />
            <Portfolio />
            <Archive />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </CinematicLayout>
  );
}

export default App;
