'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';

// Project data
const projects = [
  {
    title: 'Burger Builder',
    description: 'A dynamic burger customization app built with HTML, CSS, and JavaScript. Users can build their perfect burger by adding or removing ingredients in real-time, with a sleek and intuitive interface.',
    image: '/projects/project-1.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    github: 'https://github.com/Mrpatra013/BURGER',
    demo: '/work/BURGER/index.html',
    color: '#f72585'
  },
  {
    title: '3D Hero Page',
    description: 'An immersive 3D hero section built with Three.js and WebGL. Features interactive 3D elements, smooth animations, and a modern design that showcases advanced web graphics capabilities.',
    image: '/projects/project-2.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Animation'],
    github: 'https://github.com/Mrpatra013/3D_HERO_PAGE',
    demo: '/work/3D-HERO PAGE/index.html',
    color: '#4cc9f0'
  },
  {
    title: 'Lazerev',
    description: 'A sleek and modern web application showcasing advanced CSS animations and interactive user interfaces. Built with attention to detail and focus on user experience.',
    image: '/projects/project-3.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Animation'],
    github: 'https://github.com/Mrpatra013/lazerev',
    demo: '/work/lazerev/index.html',
    color: '#7209b7'
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <GlassCard 
        className={`h-full overflow-hidden group relative rounded-2xl ${
          isHovered ? 'glow-border' : ''
        }`}
        style={{
          background: 'rgba(13, 14, 14, 0.7)',
        }}
        glowIntensity="low"
        whileHover={{ 
          y: -10, 
          transition: { duration: 0.2 },
        }}
      >
        {/* Project image */}
        <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Project description */}
        <p className="text-foreground/80 mb-4 line-clamp-3">{project.description}</p>
        
        {/* Project tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs rounded-full bg-space-dark/50 border border-white/10 transition-colors duration-300"
              style={{ 
                color: project.color,
                borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Project links */}
        <div className="flex justify-between mt-auto pt-2 border-t border-white/10"
          style={{
            borderColor: isHovered ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.a 
            href={project.github} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            <span>Code</span>
          </motion.a>
          
          <motion.a 
            href={project.demo} 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-foreground/70 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={16} />
            <span>Live Demo</span>
          </motion.a>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="projects" className="py-20 px-4 relative">
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
            My <span className="text-accent-primary">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-accent-secondary mx-auto rounded-full mb-6"></div>
          <p className="max-w-2xl mx-auto text-foreground/80">
            Explore my recent work showcasing my skills and experience
          </p>
        </motion.div>
        
        {/* Projects grid */}
        {isClient && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        )}
        
        {/* View more projects button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-space-dark/50 border border-accent-primary/30 text-accent-primary hover:bg-space-dark hover:border-accent-primary transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(76, 201, 240, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/3 -right-20 w-40 h-40 bg-accent-highlight/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 -left-20 w-60 h-60 bg-accent-tertiary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </section>
  );
}