import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Smartphone, Cpu, Heart } from 'lucide-react';

export const Skills: React.FC = () => {
  const categories = [
    {
      title: 'Cloud & DevOps Systems',
      icon: Cloud,
      skills: [
        { name: 'AWS (EC2, S3, Lambda)', level: 'Advanced' },
        { name: 'Docker & Containers', level: 'Advanced' },
        { name: 'CI/CD Pipelines', level: 'Advanced' },
        { name: 'Terraform (IaC)', level: 'Intermediate' },
        { name: 'Kubernetes basics', level: 'Intermediate' },
        { name: 'Linux Systems & Git', level: 'Expert' },
        { name: 'Network Security Protocols', level: 'Intermediate' },
      ],
    },
    {
      title: 'Programming & Backend',
      icon: Smartphone,
      skills: [
        { name: 'Python', level: 'Advanced' },
        { name: 'Java', level: 'Intermediate' },
        { name: 'Node.js & Express', level: 'Basic' },
        { name: 'MongoDB', level: 'Basic' },
        { name: 'Firebase Cloud', level: 'Intermediate' },
      ],
    },
    {
      title: 'Frontend Engineering',
      icon: Cpu,
      skills: [
        { name: 'React.js', level: 'Intermediate' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'JavaScript (ES6+)', level: 'Intermediate' },
        { name: 'Tailwind CSS', level: 'Intermediate' },
        { name: 'HTML5 & CSS3', level: 'Advanced' },
      ],
    },
    {
      title: 'AI & Methodologies',
      icon: Heart,
      skills: [
        { name: 'Android Kotlin Voice AI', level: 'Intermediate' },
        { name: 'LLM Prompt Engineering', level: 'Intermediate' },
        { name: 'Speech Synthesis (TTS)', level: 'Intermediate' },
        { name: 'Canva Design & Assets', level: 'Intermediate' },
        { name: 'Technical Problem Solving', level: 'Native' },
      ],
    },
  ];

  return (
    <section id="toolkit" className="relative w-full py-24 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-mono mb-3">
          <span className="text-red-accent mr-2">03</span> Toolkit
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
          My Technical{' '}
          <em className="font-serif-italic font-normal text-red-accent">
            Stack.
          </em>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-400 font-light leading-relaxed">
          The verified tools, cloud platforms, programming languages, and frameworks I use to build, automate, and deploy production software.
        </p>
        <p className="mt-2 text-xs font-mono text-gray-500">
          18 TECHNOLOGIES · 4 CORE DISCIPLINES
        </p>
      </div>

      {/* Grid of Skill Cards matching reference blueprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, catIdx) => (
          <motion.div
            key={catIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            className="editorial-card p-6 md:p-8 rounded-3xl relative overflow-hidden group"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-red-accent border border-white/10 group-hover:scale-110 transition-transform">
                <cat.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-sans">
                {cat.title}
              </h3>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-3">
              {cat.skills.map((s, sIdx) => (
                <div
                  key={sIdx}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
                >
                  <span className="text-xs font-medium text-white">{s.name}</span>
                  <span className="text-[9px] font-mono uppercase text-gray-400 mt-0.5">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
