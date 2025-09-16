'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  external?: boolean;
}

export default function EnhancedButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  external = false
}: EnhancedButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = `
    relative overflow-hidden font-semibold rounded-xl
    transition-all duration-300 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
    transform-gpu will-change-transform
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-500 to-pink-500
      hover:from-purple-600 hover:to-pink-600
      text-white shadow-lg hover:shadow-xl
      shadow-purple-500/25 hover:shadow-purple-500/40
    `,
    secondary: `
      bg-transparent border-2 border-purple-500
      hover:bg-purple-500/10 text-purple-400
      hover:text-purple-300 hover:border-purple-400
    `,
    ghost: `
      bg-white/5 backdrop-blur-sm border border-white/10
      hover:bg-white/10 hover:border-white/20
      text-white/80 hover:text-white
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  const handleClick = () => {
    if (disabled) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    
    if (onClick) onClick();
    if (href && !external) {
      window.location.href = href;
    } else if (href && external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.05, 
        y: disabled ? 0 : -2 
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95 
      }}
      onClick={handleClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {/* Shimmer Effect */}
      <div className={`
        absolute inset-0 -translate-x-full transition-transform duration-700
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        ${!disabled ? 'group-hover:translate-x-full' : ''}
      `} />

      {/* Ripple Effect */}
      {isClicked && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-white/20 rounded-full"
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Background glow for primary variant */}
      {variant === 'primary' && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-xl" />
      )}
    </motion.button>
  );
}