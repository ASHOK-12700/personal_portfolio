
import { motion } from 'framer-motion';
import { ExternalLink, Github, Wifi, Trash2 } from 'lucide-react';

const Portfolio = () => {
    const projects = [
        {
            title: "Public Wi-Fi Security System",
            description: "Public Wi-Fi networks are often insecure and vulnerable to attacks such as fake access points and traffic interception. WiFi Shield is a low-cost, compact device using the ESP8266 that detects and mitigates common Wi-Fi threats in real time. By leveraging DeAuth, Beacon, and Probe protocols, it enhances user privacy and safety while using public networks.",
            tags: ["Python", "IoT", "ESP8266 module", "Network Security", "HTML/CSS"],
            icon: Wifi,
            color: "from-red-500 to-orange-500",
            status: "Completed Deployment"
        },
        {
            title: "Smart Waste Management with Clean Coin",
            description: "CleanCoin is a smart waste management system that encourages people to dispose of waste responsibly by rewarding them with digital coins. Using smart dustbins and a mobile app, it tracks proper waste disposal in real time. The goal is to promote cleanliness, reduce pollution, and build a sustainable, green future through positive behavior change",
            tags: ["React.js", "Tailwind CSS & HTML ", "JavaScript", "Eco-friendly"],
            icon: Trash2,
            color: "from-green-400 to-emerald-600",
            status: "Ongoing Development",
            link: "https://cleancoin.lovable.app"
        }
    ];

    return (
        <section id="portfolio" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
                        see my projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-600 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group hover:shadow-orange-500/20 transition-all duration-300 border border-gray-700"
                        >
                            <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} bg-opacity-20`}>
                                        <project.icon className="text-white" size={24} />
                                    </div>
                                    <span className="px-3 py-1 text-xs font-semibold bg-gray-800 rounded-full text-gray-400 border border-gray-700">
                                        {project.status}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-md">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
                                        <Github size={20} /> Code
                                    </button>
                                    {project.link ? (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
                                        >
                                            <ExternalLink size={20} /> Details
                                        </a>
                                    ) : (
                                        <button className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors">
                                            <ExternalLink size={20} /> Details
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
