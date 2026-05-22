import React from 'react';
import { motion } from 'framer-motion';
import { useScroll } from './ScrollContainer';
import { ArrowDown, Cpu, Cloud, Smartphone, Heart } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend Engineering',
    icon: Cpu,
    skills: [
      { name: 'React', level: 'Expert' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'Tailwind CSS', level: 'Expert' }
    ]
  },
  {
    title: 'Mobile & Backend',
    icon: Smartphone,
    skills: [
      { name: 'Kotlin', level: 'Intermediate' },
      { name: 'Android Dev', level: 'Advanced' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Firebase', level: 'Intermediate' }
    ]
  },
  {
    title: 'Cloud & DevOps Systems',
    icon: Cloud,
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', level: 'Advanced' },
      { name: 'Docker & Containers', level: 'Advanced' },
      { name: 'CI/CD Pipelines', level: 'Advanced' },
      { name: 'Terraform (IaC)', level: 'Intermediate' },
      { name: 'Kubernetes basics', level: 'Intermediate' },
      { name: 'Linux Systems & Git', level: 'Expert' }
    ]
  },
  {
    title: 'Design & Methodologies',
    icon: Heart,
    skills: [
      { name: 'Canva Design', level: 'Expert' },
      { name: 'UI/UX & Branding', level: 'Advanced' },
      { name: 'Ai Automation', level: 'Advanced' },
      { name: 'Fast Learner', level: 'Native' },
      { name: 'Problem-solving', level: 'Native' }
    ]
  }
];

export const Skills: React.FC = () => {
  const { scrollToSection } = useScroll();

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-6 md:px-12 py-10 relative z-10 text-gray-100 select-none">
      
      {/* Top spacing helper */}
      <div className="h-16" />

      {/* Skills body container */}
      <div className="w-full max-w-6xl flex flex-col justify-center my-auto z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-cinematic text-gray-400 font-semibold mb-3"
          >
            02. Professional Vectors
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent font-sans"
          >
            Technical Skills
          </motion.h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-white/30 to-transparent rounded-full" />
        </div>

        {/* Skill Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel border border-white/5 bg-[#08080a]/60 p-5 rounded-2xl flex flex-col text-left transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)] group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-white/5">
                <category.icon size={18} className="flex-shrink-0 text-white/40 group-hover:text-white/80 transition-colors duration-300" />
                <h3 className="text-sm uppercase tracking-widest font-bold text-white/70 group-hover:text-white transition-colors duration-300">{category.title}</h3>
              </div>

              {/* Skills Chips Grid */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255,255,255,0.15)',
                      backgroundColor: 'rgba(255,255,255,0.03)'
                    }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="interactive-card px-4 py-2 border border-white/5 bg-black/40 backdrop-blur-md rounded-xl flex flex-col justify-center cursor-default transition-all duration-300 relative group"
                  >
                    <span className="text-[11px] sm:text-xs font-semibold text-gray-300 transition-colors group-hover:text-white">
                      {skill.name}
                    </span>
                    <span className="text-[8px] text-gray-500 uppercase tracking-widest font-medium font-sans">
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Floating Next Experience indicator */}
      <motion.button
        onClick={() => scrollToSection(3)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-300 font-sans text-[9px] uppercase tracking-cinematic py-2 z-10"
      >
        <span>Next Experience</span>
        <ArrowDown size={12} className="text-white/40" />
      </motion.button>

    </div>
  );
};
export default Skills;
