import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, Zap } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { ChatBubble } from '@/components/ui/ChatBubble';

interface OptimizationResult {
  id: string;
  type: 'image' | 'text';
  original: string;
  optimized: string;
  timestamp: Date;
}

export const Optimization = () => {
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleUpload = async (type: 'image' | 'text') => {
    setIsOptimizing(true);
    
    // Simulate upload and optimization
    setTimeout(() => {
      const result: OptimizationResult = {
        id: Date.now().toString(),
        type,
        original: `Original ${type} uploaded`,
        optimized: `Optimized ${type} will appear here...`,
        timestamp: new Date(),
      };
      setResults(prev => [...prev, result]);
      setIsOptimizing(false);
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
          <Zap className="text-secondary" />
          Optimization
        </h2>
        <p className="text-muted-foreground">
          Enhance your content with AI-powered optimization
        </p>
      </motion.div>

      {/* Upload Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.02, rotateY: 5 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleUpload('image')}
          className="upload-card perspective transform-3d"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center glow-cyan"
            >
              <Image size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
            <p className="text-muted-foreground">
              Optimize your images for better performance
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
              <Upload size={16} />
              Click to upload
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, rotateY: -5 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleUpload('text')}
          className="upload-card perspective transform-3d"
        >
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center glow-purple"
            >
              <FileText size={32} />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Upload Text</h3>
            <p className="text-muted-foreground">
              Enhance your text content with AI
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-secondary">
              <Upload size={16} />
              Click to upload
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto">
        {results.length === 0 && !isOptimizing && (
          <AnimatedCard className="p-8 text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Ready to Optimize</h3>
            <p className="text-muted-foreground">
              Upload your content to start optimization
            </p>
          </AnimatedCard>
        )}

        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <AnimatedCard className="p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4 border-4 border-secondary border-t-transparent rounded-full"
              />
              <p className="text-lg">Optimizing your content...</p>
            </AnimatedCard>
          </motion.div>
        )}

        <div className="space-y-6">
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6"
            >
              {/* Original */}
              <div className="flex-1">
                <ChatBubble isUser={true}>
                  <div className="flex items-center gap-3 mb-2">
                    {result.type === 'image' ? <Image size={20} /> : <FileText size={20} />}
                    <span className="font-medium">Original {result.type}</span>
                  </div>
                  <p>{result.original}</p>
                  <div className="mt-3 p-3 bg-muted/20 rounded-lg">
                    <div className="text-center text-muted-foreground">
                      [{result.type === 'image' ? 'Image' : 'Text'} Placeholder]
                    </div>
                  </div>
                </ChatBubble>
              </div>

              {/* Optimized */}
              <div className="flex-1">
                <ChatBubble isUser={false}>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap size={20} className="text-secondary" />
                    <span className="font-medium">Optimized {result.type}</span>
                  </div>
                  <p>{result.optimized}</p>
                  <div className="mt-3 p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                    <div className="text-center text-muted-foreground">
                      [Optimized {result.type === 'image' ? 'Image' : 'Text'} Placeholder]
                    </div>
                  </div>
                </ChatBubble>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};