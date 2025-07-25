'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CircularHighlightProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  pulseEffect?: boolean;
}

export default function CircularHighlight({
  size = 350, // Default size of 350px
  color = '#4cc9f0', // Default color - soft blue
  secondaryColor = '#7209b7', // Secondary color - cosmic purple
  intensity = 'medium',
  className = '',
  pulseEffect = true,
}: CircularHighlightProps) {
  // Determine opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case 'low':
        return 0.15;
      case 'high':
        return 0.35;
      case 'medium':
      default:
        return 0.25;
    }
  };

  // Parse color to RGB for gradient
  const getRgbFromHex = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const primaryRgb = getRgbFromHex(color);
  const secondaryRgb = getRgbFromHex(secondaryColor);
  const baseOpacity = getOpacity();

  // Use state to track mobile screen status
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [mobileScale, setMobileScale] = useState(1);
  
  // Effect to handle window resize and check for mobile screens
  useEffect(() => {
    // Initial check
    const checkMobileScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
      setMobileScale(isMobile ? 0.65 : 1); // Scale down by 35% on mobile devices
    };
    
    // Check immediately
    checkMobileScreen();
    
    // Set up event listener for resize
    window.addEventListener('resize', checkMobileScreen);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobileScreen);
  }, []);
  
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ zIndex: 1 }}>
      {/* Outer glow layer */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: `${size * 1.2 * mobileScale}px`,
          height: `${size * 1.2 * mobileScale}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, ${baseOpacity * 0.2}) 0%,
            rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, ${baseOpacity * 0.1}) 50%,
            rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0) 100%
          )`,
          filter: 'blur(15px)',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: pulseEffect ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: pulseEffect ? Infinity : 0,
          repeatType: 'reverse',
        }}
      />
      
      {/* Middle layer */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: `${size * mobileScale}px`,
          height: `${size * mobileScale}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${baseOpacity}) 0%,
            rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${baseOpacity * 0.7}) 40%,
            rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${baseOpacity * 0.3}) 70%,
            rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0) 100%
          )`,
          filter: 'blur(8px)',
          boxShadow: `0 0 ${(size * mobileScale)/8}px rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${baseOpacity * 0.5})`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      
      {/* Inner core */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: `${size * 0.5 * mobileScale}px`,
          height: `${size * 0.5 * mobileScale}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${baseOpacity * 1.5}) 0%,
            rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, ${baseOpacity}) 70%,
            rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0) 100%
          )`,
          filter: 'blur(5px)',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: 1, 
          scale: pulseEffect ? [1, 0.95, 1] : 1,
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: pulseEffect ? Infinity : 0,
          repeatType: 'reverse',
          delay: 0.5,
        }}
      />
    </div>
  );
}