import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ChatBubbleProps {
  children: ReactNode;
  isUser?: boolean;
  delay?: number;
}

export const ChatBubble = ({ children, isUser = false, delay = 0 }: ChatBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 100 : -100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'}>
        {children}
      </div>
    </motion.div>
  );
};