'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrbitingPlanet from './OrbitingPlanet';

interface MultiOrbitPlanetsProps {
  className?: string;
}

export default function MultiOrbitPlanets({ className = '' }: MultiOrbitPlanetsProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Define planet colors to match the space theme
  const planetColors = [
    { primary: '#4cc9f0', secondary: '#7209b7' }, // Electric blue & Cosmic purple
    { primary: '#f72585', secondary: '#4361ee' }, // Pink & Stellar blue
    { primary: '#72efdd', secondary: '#3a0ca3' }, // Neon teal & Deep purple
    { primary: '#ff9e00', secondary: '#ff0054' }, // Orange & Red
    { primary: '#5390d9', secondary: '#7400b8' }, // Blue & Purple
    { primary: '#80ffdb', secondary: '#6930c3' }, // Mint & Violet
    { primary: '#ffbe0b', secondary: '#fb5607' }, // Yellow & Orange
    { primary: '#ff477e', secondary: '#7209b7' }, // Pink & Purple
  ];

  useEffect(() => {
    setMounted(true);
    
    // Check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      {/* Get screen size and determine if mobile */}
      {typeof window !== 'undefined' && (
        <>
          {/* Mercury (innermost orbit) */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 30 : 50}
            planetSize={window.innerWidth < 768 ? 4 : 6}
            orbitSpeed={8}
            primaryColor={planetColors[3].primary}
            secondaryColor={planetColors[3].secondary}
            glowIntensity="medium"
            orbitWidth={0.8}
            orbitColor="rgba(255, 255, 255, 0.3)"
            orbitOpacity={0.7}
          />

          {/* Venus */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 50 : 80}
            planetSize={window.innerWidth < 768 ? 6 : 9}
            orbitSpeed={12}
            primaryColor={planetColors[6].primary}
            secondaryColor={planetColors[6].secondary}
            glowIntensity="medium"
            orbitWidth={0.8}
            orbitColor="rgba(255, 255, 255, 0.28)"
            orbitOpacity={0.65}
          />
          
          {/* Earth */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 70 : 110}
            planetSize={window.innerWidth < 768 ? 8 : 12}
            orbitSpeed={15}
            primaryColor={planetColors[0].primary}
            secondaryColor={planetColors[0].secondary}
            glowIntensity="high"
            orbitWidth={1}
            orbitColor="rgba(255, 255, 255, 0.25)"
            orbitOpacity={0.6}
          />
          
          {/* Mars */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 90 : 140}
            planetSize={window.innerWidth < 768 ? 7 : 10}
            orbitSpeed={20}
            primaryColor={planetColors[7].secondary}
            secondaryColor={planetColors[7].primary}
            glowIntensity="medium"
            orbitWidth={1}
            orbitColor="rgba(255, 255, 255, 0.22)"
            orbitOpacity={0.55}
          />
          
          {/* Jupiter (largest planet) */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 115 : 180}
            planetSize={window.innerWidth < 768 ? 10 : 16}
            orbitSpeed={25}
            primaryColor={planetColors[1].primary}
            secondaryColor={planetColors[1].secondary}
            glowIntensity="high"
            orbitWidth={1.2}
            orbitColor="rgba(255, 255, 255, 0.2)"
            orbitOpacity={0.5}
          />
          
          {/* Saturn */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 140 : 220}
            planetSize={window.innerWidth < 768 ? 9 : 14}
            orbitSpeed={30}
            primaryColor={planetColors[6].primary}
            secondaryColor={planetColors[3].primary}
            glowIntensity="high"
            orbitWidth={1.2}
            orbitColor="rgba(255, 255, 255, 0.18)"
            orbitOpacity={0.45}
          />
          
          {/* Uranus */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 165 : 250}
            planetSize={window.innerWidth < 768 ? 8 : 12}
            orbitSpeed={35}
            primaryColor={planetColors[4].primary}
            secondaryColor={planetColors[4].secondary}
            glowIntensity="medium"
            orbitWidth={1.2}
            orbitColor="rgba(255, 255, 255, 0.15)"
            orbitOpacity={0.4}
          />
          
          {/* Neptune */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 185 : 280}
            planetSize={window.innerWidth < 768 ? 7 : 11}
            orbitSpeed={40}
            primaryColor={planetColors[0].primary}
            secondaryColor={planetColors[5].secondary}
            glowIntensity="medium"
            orbitWidth={1.2}
            orbitColor="rgba(255, 255, 255, 0.12)"
            orbitOpacity={0.35}
          />
          
          {/* Pluto (still a planet in our hearts) */}
          <OrbitingPlanet 
            orbitRadius={window.innerWidth < 768 ? 200 : 300}
            planetSize={window.innerWidth < 768 ? 3 : 5}
            orbitSpeed={45}
            primaryColor={planetColors[2].primary}
            secondaryColor={planetColors[7].secondary}
            glowIntensity="low"
            orbitWidth={0.8}
            orbitColor="rgba(255, 255, 255, 0.1)"
            orbitOpacity={0.3}
          />
        </>
      )}
    </div>
  );
}
