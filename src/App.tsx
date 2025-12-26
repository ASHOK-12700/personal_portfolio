
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Portfolio />
            <Education />
            <Contact />
        </div>
    );
}

export default App;
