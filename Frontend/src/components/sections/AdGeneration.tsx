import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { ChatBubble } from '@/components/ui/ChatBubble';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const AdGeneration = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Generated image will appear here based on your prompt...',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Sparkles className="text-primary" />
          Ad Generation
        </h2>
        <p className="text-muted-foreground">
          Create stunning ads with AI-powered generation
        </p>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 flex gap-6">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-4">
          {messages.length === 0 && (
            <AnimatedCard className="p-8 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">Ready to Create</h3>
              <p className="text-muted-foreground">
                Enter your prompt to generate amazing ad content
              </p>
            </AnimatedCard>
          )}
          
          {messages.map((message, index) => (
            <ChatBubble 
              key={message.id} 
              isUser={message.isUser}
              delay={index * 0.1}
            >
              <p>{message.text}</p>
              {!message.isUser && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="mt-4 p-4 bg-muted/20 rounded-lg border border-primary/20"
                >
                  <div className="text-center text-muted-foreground">
                    [Generated Image Placeholder]
                  </div>
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mt-2 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </ChatBubble>
          ))}

          {isGenerating && (
            <ChatBubble isUser={false}>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                />
                <span>Generating your ad...</span>
              </div>
            </ChatBubble>
          )}
        </div>
      </div>

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <AnimatedCard className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your ad concept..."
                className="w-full h-20 bg-transparent border border-white/20 rounded-lg p-3 resize-none focus:outline-none focus:border-primary/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="flex flex-col justify-end">
              <GlowButton
                onClick={handleSubmit}
                disabled={!input.trim() || isGenerating}
                className="h-fit"
              >
                <Send size={20} />
              </GlowButton>
            </div>
          </div>
        </AnimatedCard>
      </motion.div>
    </div>
  );
};