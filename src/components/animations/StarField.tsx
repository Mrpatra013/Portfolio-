'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface StarFieldProps {
  starCount?: number;
  maxSize?: number;
  className?: string;
  darkBackground?: boolean;
}

export default function StarField({
  starCount = 80, // Reduced star count
  maxSize = 2, // Smaller stars
  className = '',
  darkBackground = true
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize stars
      const initializeStars = () => {
        starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * maxSize + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.01
      }));
      };

      initializeStars();
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw darker background if enabled
      if (darkBackground) {
        ctx.fillStyle = 'rgba(2, 3, 12, 0.95)'; // Very dark blue, almost black
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Center highlight removed as requested
      }
      
      // Draw and update stars
      starsRef.current.forEach(star => {
        // Update position
        star.y += star.speed;
        
        // Reset if star goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [starCount, maxSize, darkBackground]);
  


  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0"
    />
  );
}