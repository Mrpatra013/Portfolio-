'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TypeWriter from '../animations/TypeWriter';
import GlowButton from '../ui/GlowButton';
import CircularHighlight from '../ui/CircularHighlight';
import MultiOrbitPlanets from '../animations/MultiOrbitPlanets';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const [isNameTyped, setIsNameTyped] = useState(false);
  const [isRoleTyped, setIsRoleTyped] = useState(false);
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
      {/* Circular highlight in the center */}
      <CircularHighlight 
        size={600}
        color="#4cc9f0"
        secondaryColor="#7209b7"
        intensity="medium"
        pulseEffect={true}
        className="opacity-85"
      />
      
      {/* Orbiting planets animation */}
      <MultiOrbitPlanets className="z-5" />
      
      {/* Hero content */}
      <motion.div
        className="z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Greeting */}
        <motion.p 
          className="text-accent-highlight mb-4 text-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Hello, I am
        </motion.p>
        
        {/* Name with typewriter effect */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 w-full">
          <TypeWriter 
            text="Sahil Patra" 
            delay={150}
            className="text-foreground"
            onComplete={() => setIsNameTyped(true)}
          />
        </h1>
        
        {/* Role with typewriter effect, starts after name is typed */}
        {isNameTyped && (
          <h2 className="text-2xl md:text-3xl mb-8 text-accent-primary w-full">
            <TypeWriter 
              text="Frontend Developer" 
              delay={100}
              onComplete={() => setIsRoleTyped(true)}
            />
          </h2>
        )}
        
        {/* CTA Buttons, appear after role is typed */}
        {isRoleTyped && (
          <motion.div 
            className="flex flex-row gap-4 justify-center items-center w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlowButton href="#projects" variant="primary">
              View My Work
            </GlowButton>
            <GlowButton 
              href="#contact" 
              variant="outline"
              className="sm:px-6 sm:py-2 px-4 py-1.5 text-xs sm:text-sm border-2"
            >
              Contact Me
            </GlowButton>
          </motion.div>
        )}
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isRoleTyped ? 1 : 0,
          y: isRoleTyped ? [0, 10, 0] : 0 
        }}
        transition={{ 
          delay: 1, 
          duration: 1.5, 
          repeat: Infinity,
          repeatType: "loop" 
        }}
      >
        <ArrowDown className="text-accent-primary w-6 h-6" />
      </motion.div>
    </section>
  );
}