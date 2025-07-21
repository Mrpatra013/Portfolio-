'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

// Skill categories with their respective skills
const skillCategories = [
  {
    title: 'Frontend Technologies',
    icon: '🚀',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'React.js', level: 88 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Bootstrap', level: 80 },
      { name: 'Responsive Design', level: 95 },
    ],
    color: 'var(--accent-primary)'
  },
  {
    title: 'AI-Powered Development Tools',
    icon: '🤖',
    skills: [
      { name: 'Trae', level: 85 },
      { name: 'Windsurf', level: 80 },
      { name: 'Cursor', level: 88 },
      { name: 'GitHub Copilot', level: 90 },
    ],
    color: 'var(--accent-secondary)'
  },
  {
    title: 'AI Communication & Productivity',
    icon: '💬',
    skills: [
      { name: 'ChatGPT', level: 92 },
      { name: 'Claude', level: 85 },
      { name: 'DeepSeek', level: 80 },
      { name: 'Grok', level: 78 },
    ],
    color: 'var(--accent-tertiary)'
  }
];

// Skill bar component
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-medium text-accent-highlight">{level}%</span>
      </div>
      <div className="w-full h-2 bg-space-dark/50 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full" 
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Skill category card component
function SkillCategory({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard 
        className="h-full" 
        glowColor={category.color}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">{category.icon}</span>
          <h3 className="text-xl font-bold" style={{ color: category.color }}>{category.title}</h3>
        </div>
        
        <div className="space-y-4">
          {category.skills.map((skill, idx) => (
            <SkillBar 
              key={skill.name} 
              name={skill.name} 
              level={skill.level} 
              color={category.color} 
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-accent-primary">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-accent-secondary mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Leveraging modern technologies and AI-powered tools to create exceptional web experiences
          </p>
        </motion.div>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-40 h-40 bg-accent-secondary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-60 h-60 bg-accent-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}