'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function GlowButton({ 
  children, 
  href, 
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false
}: GlowButtonProps) {
  const baseStyles = "px-6 py-2 rounded-full font-medium text-sm inline-flex items-center transition-all duration-300";
  const variantStyles = {
    primary: "bg-accent-primary text-space-dark hover:bg-accent-primary/90",
    outline: "border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-space-dark"
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} className={combinedClassName} disabled={disabled}>
      {children}
    </button>
  );
}