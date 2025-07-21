'use client';

import { motion } from 'framer-motion';
import { SpaceLogoIcon } from './SpaceLogoIcon';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and copyright */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpaceLogoIcon width={30} height={30} />
            <p className="text-foreground/70">
              © {currentYear} Sahil Patra. All rights reserved.
            </p>
          </motion.div>
          
          {/* Made with */}
          <motion.div 
            className="flex items-center gap-1 text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              <Heart size={16} className="text-accent-secondary fill-accent-secondary" />
            </motion.div>
            <span>using Next.js & Tailwind CSS</span>
          </motion.div>
        </div>
      </div>
      
      {/* Star particles at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
      
      {/* Small star particles */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = `${Math.random() * 100}%`;
        const top = `${Math.random() * 100}%`;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left,
              top,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: animationDuration,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        );
      })}
    </footer>
  );
}