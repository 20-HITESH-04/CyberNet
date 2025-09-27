import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover3d?: boolean;
}

export const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  hover3d = true 
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover3d ? {
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      } : undefined}
      className={`glass-card perspective transform-3d ${className}`}
    >
      {children}
    </motion.div>
  );
};