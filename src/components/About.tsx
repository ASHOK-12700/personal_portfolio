
import { motion } from 'framer-motion';
import { Code, Palette, Server, Globe } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 bg-gray-800 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-blue-500/30 transition-colors shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 text-white">Who Am I?</h3>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                I am currently pursuing my <span className="text-blue-400">B.Tech in Computer Science Engineering (3rd year)</span> at Srinivasa Institute of Engineering and Technology. I enjoy developing innovative websites, designing visually appealing brochures, and deploying applications using <span className="text-purple-400">DevOps practices</span>.
                            </p>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                I am particularly passionate about <span className="text-blue-400">AWS and DevOps</span>, focusing on version control, containerization, CI/CD pipelines, and cloud deployment. I specialize in creating modern, responsive, and visually engaging 3D portfolio websites using the latest web technologies.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I am seeking full-time opportunities and freelance projects where I can apply my skills and grow as a professional.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            { icon: Code, title: "Web Developer", desc: "Building responsive modern apps" },
                            { icon: Palette, title: "Creative Design", desc: "UI/UX & Branding" },
                            { icon: Server, title: "DevOps", desc: "CI/CD & Cloud Infrastructure" },
                            { icon: Globe, title: "3D & Interactive", desc: "Immersive Web Experiences" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, translateY: -5 }}
                                className="bg-gray-700/30 p-6 rounded-xl border border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/50 transition-all cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                                    <item.icon size={28} />
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
