'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Planet {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  distance: number;
  rotationRadius: number;
}

export default function FloatingPlanets() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const planetsRef = useRef<Planet[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Initialize planets
      const planetColors = [
        '#4cc9f0', // Electric blue
        '#7209b7', // Cosmic purple
        '#72efdd', // Neon teal
        '#f72585', // Pink
        '#4361ee', // Stellar blue
      ];
      
      planetsRef.current = Array.from({ length: 5 }, (_, i) => ({
        x: 0,
        y: 0,
        size: Math.random() * 20 + 10, // Larger size for planets
        color: planetColors[i % planetColors.length],
        speed: Math.random() * 0.001 + 0.0005,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 100 + 150,
        rotationRadius: Math.random() * 100 + (i * 40) + 80 // Smaller orbit radiuses
      }));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw and update planets
      planetsRef.current.forEach(planet => {
        // Update position in orbit
        planet.angle += planet.speed;
        planet.x = centerX + Math.cos(planet.angle) * planet.rotationRadius;
        planet.y = centerY + Math.sin(planet.angle) * planet.rotationRadius;
        
        // Draw planet
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
        
        // Create gradient for planet
        const gradient = ctx.createRadialGradient(
          planet.x, planet.y, 0,
          planet.x, planet.y, planet.size
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw orbit path with enhanced visibility
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.rotationRadius, 0, Math.PI * 2);
        
        // Create gradient for orbit path
        const orbitGradient = ctx.createLinearGradient(
          centerX - planet.rotationRadius, centerY,
          centerX + planet.rotationRadius, centerY
        );
        
        // Use white color for orbits
        orbitGradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
        orbitGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
        orbitGradient.addColorStop(1, 'rgba(255, 255, 255, 0.03)');
        
        ctx.strokeStyle = orbitGradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Add subtle glow to orbit
        ctx.beginPath();
        ctx.arc(centerX, centerY, planet.rotationRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.size + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(planet.color.slice(1, 3), 16)}, ${parseInt(planet.color.slice(3, 5), 16)}, ${parseInt(planet.color.slice(5, 7), 16)}, 0.1)`;
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
  }, []);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-5 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
  );
}