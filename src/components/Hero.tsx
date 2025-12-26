import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const roles = ['Web Developer', 'Creative Designer', 'DevOps Enthusiast', 'CSE Student', 'EC2 service', 'S3 service', 'AWS solution architecture', 'AWS cloud engineer'];

const Hero = () => {
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="min-h-screen relative overflow-hidden bg-gray-950 flex items-center justify-center pt-20">

            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Side: Text Content */}
                <div className="text-center md:text-left order-2 md:order-1">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            Ashok Srinivas
                        </span>
                        <br />
                        <span className="text-4xl md:text-6xl text-gray-300">Siva Kiran</span>
                    </h1>

                    <div className="text-2xl md:text-3xl font-medium text-blue-300 mb-6 h-12 flex items-center justify-center md:justify-start">
                        <span className="mr-2">I am a</span>
                        <span className="text-purple-400 overflow-hidden whitespace-nowrap border-r-4 border-purple-400 pr-1 animate-typing">
                            {roles[currentRole]}
                        </span>
                    </div>

                    <p className="text-lg md:text-xl text-gray-400 font-light mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Passionate Computer Science Engineering student crafting digital experiences with <span className="text-blue-400 font-medium">web development</span>, <span className="text-purple-400 font-medium">design</span>, and <span className="text-green-400 font-medium">DevOps</span>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
                        <a
                            href="#portfolio"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-blue-500/25 text-white"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 rounded-full font-semibold transition-all text-white backdrop-blur-sm"
                        >
                            Get In Touch
                        </a>
                    </div>

                    <div className="flex justify-center md:justify-start gap-6">
                        <a href="https://github.com/ashok-12700" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <Github size={24} />
                        </a>
                        <a href="https://linkedin.com/in/ashoksrinivassivakiran" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:ashoksrinivassivakiran.143@gmail.com" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
                            <Mail size={24} />
                        </a>
                    </div>
                </div>

                {/* Right Side: Interactive Image Card */}
                <div className="flex items-center justify-center order-1 md:order-2 perspective-1000">
                    <div className="group relative w-72 h-[450px] md:w-80 md:h-[500px] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">

                        {/* Image Container with Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-800 border-2 border-gray-700 group-hover:border-transparent transition-colors duration-300">
                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                            <img
                                src="https://i.postimg.cc/SND65KHx/my-photo.jpg"
                                alt="Ashok Srinivas Siva Kiran"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Text overlay on image (optional, adds more 3D feel) */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                                <p className="text-white font-bold text-lg">Ashok Srinivas</p>
                                <p className="text-blue-300 text-sm">Passionating on Devops with AWS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
