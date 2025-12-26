
import { motion } from 'framer-motion';

const Skills = () => {
    const skillCategories = [
        {
            title: "Programming & Development",
            skills: ["Full‑Stack Web Development", "Backend API Development", "Frontend Engineering", "Database Design & Management", "Application Security & Authentication", "Domain naming bsics", "Ai automation", "Prompt Engineering"]
        },
        {
            title: "Web & Creative Design",
            skills: ["Canva", "Product UI/UX Design", "Branding & Visual Design", "UI/UX Design", "Marketing & Banner Design", "Brand & Logo Design"]
        },
        {
            title: "DevOps & Cloud",
            skills: ["Git & Version Control", "Docker & Containers", "Kubernetes basics ", "Linux & System Basics", "CI/CD Pipelines", "AWS (EC2, S3, Lambda)", "Infrastructure as Code (Terraform)", "Monitoring & Logging", "DevSecOps Basics (Security in DevOps)"]
        },
        {
            title: "Soft Skills",
            skills: ["Communication", "Fast Learner", "Problem-solving", "Creativity", "Adapatability", "Emotional Intelligence"]
        }
    ];

    return (
        <section id="skills" className="py-20 bg-gray-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        Technical Skills
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all hover:transform hover:-translate-y-2"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2 inline-block">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-gray-700 rounded-full text-sm font-medium text-gray-300 hover:bg-green-500/20 hover:text-green-400 transition-colors border border-gray-600 hover:border-green-500/50"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
