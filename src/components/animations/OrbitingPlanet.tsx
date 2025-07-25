'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OrbitingPlanetProps {
  orbitRadius?: number;
  planetSize?: number;
  orbitSpeed?: number;
  primaryColor?: string;
  secondaryColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  className?: string;
  orbitWidth?: number;
  orbitColor?: string;
  orbitOpacity?: number;
}

export default function OrbitingPlanet({
  orbitRadius = 200, // Default orbit radius in pixels (increased)
  planetSize = 30, // Default planet size (increased)
  orbitSpeed = 10, // Seconds per revolution
  primaryColor = '#4cc9f0', // Default primary color - soft blue
  secondaryColor = '#7209b7', // Default secondary color - cosmic purple
  glowIntensity = 'medium',
  className = '',
  orbitWidth = 2,
  orbitColor = 'rgba(255, 255, 255, 0.25)',
  orbitOpacity = 0.6,
}: OrbitingPlanetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Determine glow intensity
  const getGlowIntensity = () => {
    switch (glowIntensity) {
      case 'low': return 0.2;
      case 'high': return 0.6;
      case 'medium':
      default: return 0.4;
    }
  };
  
  // Parse color to RGB values
  const getRgbFromHex = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const primaryRgb = getRgbFromHex(primaryColor);
  const secondaryRgb = getRgbFromHex(secondaryColor);
  const glowStrength = getGlowIntensity();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      const size = orbitRadius * 2 + planetSize * 4; // Make canvas large enough for orbit + planet + glow
      canvas.width = size;
      canvas.height = size;
    };
    
    setCanvasSize();
    
    // Animation variables
    let angle = 0;
    let animationId: number;
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw orbit with glow effect
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = orbitColor;
      ctx.lineWidth = orbitWidth * 0.7; // Thinner line
      ctx.stroke();
      
      // Add enhanced glow to orbit
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${orbitOpacity * 0.5})`;
      ctx.lineWidth = orbitWidth * 2; // Reduced from 3x to 2x
      ctx.filter = 'blur(1.5px)'; // Slightly less blur
      ctx.stroke();
      ctx.filter = 'none';
      
      // Calculate planet position
      const planetX = centerX + Math.cos(angle) * orbitRadius;
      const planetY = centerY + Math.sin(angle) * orbitRadius;
      
      // Enhanced outer glow (larger radius)
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize * 3, 0, Math.PI * 2);
      const outerGlow = ctx.createRadialGradient(
        planetX, planetY, 0,
        planetX, planetY, planetSize * 3
      );
      outerGlow.addColorStop(0, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.5})`);
      outerGlow.addColorStop(0.5, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.2})`);
      outerGlow.addColorStop(1, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0)`);
      ctx.fillStyle = outerGlow;
      ctx.fill();
      
      // Middle glow (more intense)
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize * 2, 0, Math.PI * 2);
      const middleGlow = ctx.createRadialGradient(
        planetX, planetY, 0,
        planetX, planetY, planetSize * 2
      );
      middleGlow.addColorStop(0, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.7})`);
      middleGlow.addColorStop(0.7, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.3})`);
      middleGlow.addColorStop(1, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0)`);
      ctx.fillStyle = middleGlow;
      ctx.fill();
      
      // Inner glow
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize * 1.2, 0, Math.PI * 2);
      const innerGlow = ctx.createRadialGradient(
        planetX, planetY, 0,
        planetX, planetY, planetSize * 1.2
      );
      innerGlow.addColorStop(0, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 1.2})`);
      innerGlow.addColorStop(0.5, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.8})`);
      innerGlow.addColorStop(1, `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${glowStrength * 0.4})`);
      ctx.fillStyle = innerGlow;
      ctx.fill();
      
      // Draw planet core (solid, no border)
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetSize, 0, Math.PI * 2);
      const planetGradient = ctx.createRadialGradient(
        planetX, planetY, 0,
        planetX, planetY, planetSize
      );
      planetGradient.addColorStop(0, primaryColor);
      planetGradient.addColorStop(0.8, primaryColor);
      planetGradient.addColorStop(1, primaryColor); // Use primary color all the way through
      ctx.fillStyle = planetGradient;
      ctx.filter = 'blur(1px)'; // Slightly blur the planet edge to avoid hard borders
      ctx.fill();
      ctx.filter = 'none';
      
      // Update angle for next frame
      angle += (Math.PI * 2) / (60 * orbitSpeed); // 60fps * seconds per revolution
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [orbitRadius, planetSize, orbitSpeed, primaryColor, secondaryColor, glowIntensity, orbitWidth, orbitColor, orbitOpacity]);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute pointer-events-none ${className}`}
      style={{
        zIndex: 5,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    />
  );
}
