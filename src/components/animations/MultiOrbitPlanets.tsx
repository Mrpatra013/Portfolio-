'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OrbitingPlanet from './OrbitingPlanet';

interface MultiOrbitPlanetsProps {
  className?: string;
}

export default function MultiOrbitPlanets({ className = '' }: MultiOrbitPlanetsProps) {
  const [mounted, setMounted] = useState(false);
  
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
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      {/* Mercury (innermost orbit) */}
      <OrbitingPlanet 
        orbitRadius={50}
        planetSize={6}
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
        orbitRadius={80}
        planetSize={9}
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
        orbitRadius={110}
        planetSize={12}
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
        orbitRadius={140}
        planetSize={10}
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
        orbitRadius={180}
        planetSize={16}
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
        orbitRadius={220}
        planetSize={14}
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
        orbitRadius={250}
        planetSize={12}
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
        orbitRadius={280}
        planetSize={11}
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
        orbitRadius={300}
        planetSize={5}
        orbitSpeed={45}
        primaryColor={planetColors[2].primary}
        secondaryColor={planetColors[7].secondary}
        glowIntensity="low"
        orbitWidth={0.8}
        orbitColor="rgba(255, 255, 255, 0.1)"
        orbitOpacity={0.3}
      />
    </div>
  );
}
