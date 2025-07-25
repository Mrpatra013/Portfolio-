'use client';

import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function GlowButton({ 
  children, 
  href, 
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  onClick
}: GlowButtonProps) {
  const baseStyles = "px-6 py-2 rounded-full font-medium text-sm inline-flex items-center transition-all duration-300 cursor-pointer";
  const variantStyles = {
    primary: "bg-accent-primary text-space-dark hover:bg-accent-primary/90",
    outline: "border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-space-dark"
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  // Handle smooth scrolling for anchor links
  const handleClick = (e: React.MouseEvent) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
    
    // Call the provided onClick handler if it exists
    if (onClick) {
      onClick();
    }
  };
  
  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClassName}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      type={type} 
      className={combinedClassName} 
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
