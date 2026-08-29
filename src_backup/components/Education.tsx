
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, X } from 'lucide-react';

const Education = () => {
    const [showCertificates, setShowCertificates] = useState(false);
    const [activeCert, setActiveCert] = useState<number | null>(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const certificates = [
        {
            img: "https://i.postimg.cc/ncCMkXDk/gcp.jpg",
            desc: "I attended a hands-on workshop at JNTU Kakinada, where I gained practical exposure to Google Cloud Platform (GCP). The workshop provided real-time experience in understanding cloud concepts and working with cloud-based services. It enhanced my knowledge of deploying and managing applications in a cloud environment and strengthened my interest in cloud technologies."
        },
        {
            img: "https://i.postimg.cc/mDP2Sqcz/Whats-App-Image-2025-12-19-at-4-03-36.jpg",
            desc: "I completed a Web Development internship at Shadowfox Technologies, where I gained practical experience in building responsive and user-friendly websites. During the internship, I developed multiple projects including a personal portfolio website, an e-commerce website, and a dental clinic website. This experience helped me strengthen my frontend development skills and understand real-world web project workflows."
        },
        {
            img: "https://i.postimg.cc/R0DvqRPS/Whats-App-Image-2025-12-19-at-4-03-35-PM.jpg",
            desc: "I completed a one-month virtual internship at Smart Bridge, where I gained hands-on experience in full-stack MERN development. During the internship, I learned both frontend and backend concepts and worked with databases in a real-time environment. As a final project, I successfully developed a Doctor Appointment Booking Application, which strengthened my practical understanding of full-stack application development."
        },
        {
            img: "https://i.postimg.cc/zv1ZRPK6/Whats-App-Image-2025-12-19-at-4-03-33-PM.jpg",
            desc: "I participated in a Project Expo at VSM Engineering College, where our team presented a project in the domain of Public Wi-Fi Security. The project focused on improving network safety and protecting user data in public Wi-Fi environments. Our innovative approach and practical implementation helped us secure First Prize in the competition."
        },
        {
            img: "https://i.postimg.cc/prnb9MmJ/Whats-App-Image-2025-12-19-at-4-03-34-PM.jpg",
            desc: "I participated in a Project Expo at Aditya Engineering College, where our team presented a project based on the Public Wi-Fi Security domain. The project addressed common security threats in public wireless networks and focused on protecting user data. Due to the innovation and practical impact of our solution, we were awarded Second Prize in the competition."
        },
        {
            img: "https://i.postimg.cc/KvPLLkhS/agentic-ai.jpg",
            desc: "I applied for and participated in the Agenti AI Hackathon held in Bangalore, where I gained exposure to innovative AI-based problem-solving and competitive development environments. Although my project was not selected in the final round, the experience helped me understand real-world hackathon workflows, teamwork, and time-bound development. I received a Participation Certificate, recognizing my active involvement in the event."
        },
        {
            img: "https://i.postimg.cc/0NLhLHWQ/mbu.png",
            desc: "I attended a hands-on workshop at Mohan Babu University, where I gained practical knowledge of Amazon Web Services (AWS) and core DevOps concepts. The workshop provided real-time exposure to cloud services, automation practices, and deployment workflows. It helped me understand how modern applications are built, automated, and managed efficiently in cloud environments."
        },
        {
            img: "https://i.postimg.cc/254xScjT/forage.jpg",
            desc: "I completed the GenAI Powered by Data Analytics Job Simulation offered by Tata (Forage), where I gained hands-on experience working with real-world data scenarios. The program involved analyzing data, generating insights, and solving business problems similar to client-based projects. This experience strengthened my understanding of data-driven decision-making and practical analytical workflows."
        },
        {
            img: "https://i.postimg.cc/90S9pZXk/Whats-App-Image-2025-12-22-at-1-28-24-PM.jpg",
            desc: "I successfully completed a Big Data course offered by Infosys, where I gained a foundational understanding of big data concepts, data processing, and analytics. The course helped me learn how large-scale data is managed and analyzed in real-world scenarios, strengthening my interest in data-driven technologies."
        },
        {
            img: "https://i.postimg.cc/763tjPJW/Whats-App-Image-2025-12-22-at-1-28-23-PM.jpg",
            desc: "I successfully completed the Graphic Design Essentials course on Canva, where I gained practical knowledge of designing visually appealing content. During the course, I learned to work with design elements, posters, typography, layouts, and creative text styles. This certification strengthened my ability to create professional graphics and digital designs for real-world use."
        },
        {
            img: "https://i.postimg.cc/TY65RdLW/ai-begginers.jpg",
            desc: "I successfully completed the AI for Beginners course offered by HP LIFE, where I gained a clear understanding of the fundamentals of Artificial Intelligence. The course introduced key AI concepts, real-world applications, and how AI is used to solve practical problems. This certification strengthened my foundational knowledge and interest in emerging technologies."
        },
        {
            img: "https://i.postimg.cc/RhT8JCMY/IMG-20251226-WA0007.jpg",
            desc: "I successfully completed the AI Skills Passport course offered by EY in collaboration with Microsoft, where I gained foundational knowledge of Artificial Intelligence and its practical applications. The course helped me understand core AI concepts, real-world use cases, and the impact of AI in modern industries. This certification strengthened my awareness of future-ready digital skills."
        },
        {
            img: "https://i.postimg.cc/qRKgTSkv/quiz.jpg",
            desc: "I secured First Prize in a Quiz Competition conducted at Srinivasa Institute of Engineering and Technology. The competition tested technical knowledge, logical thinking, and problem-solving skills. This achievement reflects my strong grasp of concepts and active participation in academic activities."
        }
    ];

    return (
        <section id="education" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-6 text-white">
                        Experience & Education
                    </h2>
                    <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Experience Column */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <Briefcase className="text-blue-400" size={32} />
                            <h3 className="text-2xl font-bold text-white">Internships</h3>
                        </div>
                        <div className="space-y-8 relative border-l-2 border-gray-700 ml-4 pl-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900"></div>
                                <h4 className="text-xl font-bold text-white">Web Development Intern</h4>
                                <p className="text-blue-400 mb-2">Shadowfox Technologies</p>
                                <p className="text-gray-400 text-sm mb-4">Hands-on experience with modern web development. Built Personal Portfolio, E-commerce, and Health Clinic websites.</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-[41px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900"></div>
                                <h4 className="text-xl font-bold text-white">MERN Stack Intern</h4>
                                <p className="text-blue-400 mb-2">Smart Bridge (Govt Platform)</p>
                                <p className="text-gray-400 text-sm mb-4">Developed Doctor Appointment Booking app. Worked with MongoDB, Express, React, Node.js.</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <GraduationCap className="text-purple-400" size={32} />
                            <h3 className="text-2xl font-bold text-white">Education</h3>
                        </div>
                        <div className="space-y-8 relative border-l-2 border-gray-700 ml-4 pl-8">
                            {[
                                {
                                    degree: "B.Tech - Computer Science Engineering",
                                    school: "Srinivasa Institute of Engineering and Technology",
                                    year: "Expected 2027",
                                    desc: "Currently in 3rd Year"
                                },
                                {
                                    degree: "Intermediate Education",
                                    school: "VVS Narayana Raju Junior College",
                                    year: "2021 - 2023",
                                    desc: " Stream in MPC"
                                },
                                {
                                    degree: "Secondary Education",
                                    school: "ZPHS High School, G. Vemavaram",
                                    year: "2016 - 2021",
                                    desc: "Schooling"
                                }
                            ].map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="absolute -left-[41px] top-0 w-6 h-6 bg-purple-500 rounded-full border-4 border-gray-900"></div>
                                    <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                                    <p className="text-purple-400 mb-1">{edu.school}</p>
                                    <p className="text-gray-500 text-sm">{edu.year}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Achievements Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 bg-gray-800 p-8 rounded-2xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Award className="text-yellow-400" size={32} />
                        <h3 className="text-2xl font-bold text-white">Achievements & Certifications</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Web Development Internship - Shadowfox",
                            "MERN Stack Internship - Smart Bridge",
                            "AWS Participation - Mohan Babu University",
                            "Google Cloud Workshop - JNTU Kakinada",
                            "1st Prize - Project Expo (VSM)",
                            "2nd Prize - Project Expo (Aditya)"
                        ].map((cert, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                {cert}
                            </div>
                        ))}
                        <button
                            onClick={() => setShowCertificates(!showCertificates)}
                            className="col-span-1 md:col-span-2 lg:col-span-3 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1 justify-center mx-auto"
                        >
                            {showCertificates ? 'Hide Certifications' : 'View My Certifications'}
                        </button>
                    </div>

                    <AnimatePresence>
                        {showCertificates && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-12 bg-black p-8 rounded-3xl overflow-hidden"
                            >
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {certificates.map((cert, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => {
                                                setActiveCert(activeCert === index ? null : index);
                                                setSelectedImg(cert.img);
                                            }}
                                            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activeCert === index
                                                ? 'bg-gray-900 border-blue-500 shadow-xl shadow-blue-500/20 scale-105'
                                                : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                                                }`}
                                        >
                                            <div className={`relative overflow-hidden rounded-xl mb-4 h-48 transition-all duration-300 group`}>
                                                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 ${activeCert === index ? 'opacity-0' : 'opacity-100'}`} />
                                                <img
                                                    src={cert.img}
                                                    alt="Certificate"
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <p className={`text-sm leading-relaxed transition-colors duration-300 ${activeCert === index ? 'text-gray-200' : 'text-gray-400'}`}>
                                                {cert.desc}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox Modal */}
                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImg(null)}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        >
                            <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                                <button
                                    onClick={() => setSelectedImg(null)}
                                    className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors"
                                >
                                    <X size={32} />
                                </button>
                                <img
                                    src={selectedImg}
                                    alt="Certificate Full View"
                                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-gray-800"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
};

export default Education;
