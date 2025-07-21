'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypeWriter({ 
  text, 
  delay = 100,
  className = '',
  onComplete
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, delay, isComplete, onComplete, text]);

  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      {currentIndex < text.length && (
        <motion.span 
          className="inline-block w-[0.1em] h-[1.2em] bg-accent-primary ml-1 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </motion.span>
  );
}