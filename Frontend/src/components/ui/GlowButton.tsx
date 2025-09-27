import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const GlowButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = "",
  disabled = false
}: GlowButtonProps) => {
  const baseClasses = "relative font-semibold rounded-xl transition-all duration-300 perspective transform-3d";
  
  const variantClasses = {
    primary: "btn-hero",
    secondary: "btn-secondary"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{
        scale: 0.95,
        rotateX: -5,
        rotateY: -5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            "0 0 4px rgba(0, 255, 255, 0.5)",
            "0 0 8px rgba(138, 43, 226, 0.7)",
            "0 0 4px rgba(255, 0, 255, 0.5)",
            "0 0 8px rgba(0, 255, 255, 0.7)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
      
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-75"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(138, 43, 226, 0.2))",
            "linear-gradient(45deg, rgba(138, 43, 226, 0.2), rgba(255, 0, 255, 0.2))",
            "linear-gradient(45deg, rgba(255, 0, 255, 0.2), rgba(0, 255, 255, 0.2))",
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.button>
  );
};