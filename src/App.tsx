import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ScrollContainer from './components/ScrollContainer';
import CinematicLayout from './components/CinematicLayout';
import CertificatesPage from './components/CertificatesPage';

function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#/certificates' || hash === '#/certifications' || path === '/certificates' || path === '/certifications') {
      return '/certificates';
    }
    return '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#/certificates' || hash === '#/certifications' || path === '/certificates' || path === '/certifications') {
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

  const navigateTo = (path: string) => {
    if (path === '/certificates') {
      window.location.hash = '#/certificates';
      setCurrentPath('/certificates');
    } else {
      window.location.hash = '';
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      // Dispatch manual popstate to ensure clean trigger
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <CinematicLayout>
      {currentPath === '/certificates' ? (
        <CertificatesPage navigateHome={() => navigateTo('/')} />
      ) : (
        <ScrollContainer>
          <Hero />
          <About navigateToCertificates={() => navigateTo('/certificates')} />
          <Skills />
          <Portfolio />
          <Contact />
        </ScrollContainer>
      )}
    </CinematicLayout>
  );
}

export default App;


