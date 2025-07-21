import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
}

export default function GlassCard({ 
  children, 
  className = '',
  glowColor = 'var(--accent-primary)',
  glowIntensity = 'medium',
  ...motionProps
}: GlassCardProps) {
  // Map intensity to actual values
  const intensityMap = {
    low: '0.05',
    medium: '0.1',
    high: '0.15'
  };
  
  const intensity = intensityMap[glowIntensity];
  
  return (
    <motion.div 
      className={`relative backdrop-blur-md bg-space-dark/30 border border-white/10 rounded-xl p-6 ${className}`}
      style={{
        boxShadow: `0 0 20px ${intensity} ${glowColor}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}