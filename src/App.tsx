
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ScrollContainer from './components/ScrollContainer';
import CinematicLayout from './components/CinematicLayout';

function App() {
  return (
    <CinematicLayout>
      <ScrollContainer>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </ScrollContainer>
    </CinematicLayout>
  );
}

export default App;

