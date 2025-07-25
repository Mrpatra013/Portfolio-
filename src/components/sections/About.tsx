'use client';

import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Section title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-accent-primary">About</span> Me
          </h2>
          <div className="h-1 w-20 bg-accent-secondary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image side */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full opacity-75 blur-sm animate-pulse-slow"></div>
              <div className="relative bg-space-dark p-2 rounded-full w-[250px] h-[250px] overflow-hidden">
                <Image
                  src="/projects/profile.jpg"
                  alt="Sahil Patra"
                  width={250}
                  height={250}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-5 -right-5 w-12 h-12 bg-accent-tertiary rounded-full opacity-80"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop' }}
              />
              <motion.div 
                className="absolute -bottom-3 -left-3 w-8 h-8 bg-accent-highlight rounded-full opacity-60"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop', delay: 1 }}
              />
            </div>
          </motion.div>
          
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard className="p-8" glowIntensity="low">
              <h3 className="text-2xl font-bold mb-4 text-accent-highlight">Frontend Developer</h3>
              
              <p className="mb-4 text-foreground/90">
                Hello! I&apos;m <span className="text-accent-primary font-semibold">Sahil Patra</span>, a passionate frontend developer with a love for creating beautiful, responsive, and user-friendly web experiences.
              </p>
              
              <p className="mb-6 text-foreground/90">
                I specialize in modern web technologies and leverage AI-powered development tools to build efficient and innovative solutions. My approach combines technical expertise with creative problem-solving to deliver exceptional digital experiences.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="mb-2"><span className="text-accent-primary font-semibold">Name:</span> Sahil Patra</p>
                  <p className="mb-2"><span className="text-accent-primary font-semibold">Experience:</span> 3+ Years</p>
                </div>
                <div>
                  <p className="mb-2"><span className="text-accent-primary font-semibold">Location:</span> Remote</p>
                  <p className="mb-2"><span className="text-accent-primary font-semibold">Availability:</span> Full-time</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}