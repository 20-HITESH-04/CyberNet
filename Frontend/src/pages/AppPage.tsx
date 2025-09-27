import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Scene3D } from '@/components/3d/Scene3D';
import { Sidebar } from '@/components/Sidebar';
import { AdGeneration } from '@/components/sections/AdGeneration';
import { Optimization } from '@/components/sections/Optimization';
import { CTRScore } from '@/components/sections/CTRScore';
import { GlowButton } from '@/components/ui/GlowButton';

const AppPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('generation');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'generation':
        return <AdGeneration />;
      case 'optimization':
        return <Optimization />;
      case 'ctr':
        return <CTRScore />;
      default:
        return <AdGeneration />;
    }
  };

  return (
    <div className="min-h-screen bg-animated relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D 
          showNeuralNetwork={false}
          showFloatingShapes={true}
          showParticles={true}
          className="opacity-20"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card m-6 p-4 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <GlowButton
                variant="secondary"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Landing
              </GlowButton>
              
              <motion.h1
                className="text-2xl font-bold"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(0, 255, 255, 0.5)",
                    "0 0 20px rgba(138, 43, 226, 0.5)",
                    "0 0 10px rgba(255, 0, 255, 0.5)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                AI Deep Learning Platform
              </motion.h1>

              <div className="w-32" /> {/* Spacer for centering */}
            </div>
          </motion.header>

          {/* Content Area */}
          <motion.main
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 glass-card m-6 mt-0 p-8 border border-white/10 overflow-hidden"
          >
            {renderActiveSection()}
          </motion.main>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute top-1/4 right-20 w-6 h-6 rounded-full bg-primary/30 glow-cyan"
        animate={{ 
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 left-20 w-4 h-4 rounded-full bg-secondary/30 glow-purple"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 0.8, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-accent/20 glow-pink"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default AppPage;