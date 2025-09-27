import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Scene3D } from '@/components/3d/Scene3D';
import { GlowButton } from '@/components/ui/GlowButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import neuralNetworkImg from '@/assets/neural-network.jpg';
import aiParticlesImg from '@/assets/ai-particles.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-animated relative overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D 
          showNeuralNetwork={true}
          showFloatingShapes={true}
          showParticles={true}
          className="opacity-30"
        />
      </div>

      {/* Background Images with Parallax */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `url(${neuralNetworkImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Hero Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 perspective transform-3d"
            animate={{
              textShadow: [
                "0 0 20px rgba(0, 255, 255, 0.8)",
                "0 0 40px rgba(138, 43, 226, 0.8)",
                "0 0 20px rgba(255, 0, 255, 0.8)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              AI Deep Learning
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-4xl font-light mb-6 text-muted-foreground"
          >
            Advanced Intelligence Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-foreground/80"
          >
            Experience the future of AI with our cutting-edge deep learning platform. 
            Generate, optimize, and analyze with unprecedented accuracy and speed.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <GlowButton
              size="lg"
              onClick={() => navigate('/app')}
              className="min-w-[200px]"
            >
              Get Started
            </GlowButton>
            
            <GlowButton
              variant="secondary"
              size="lg"
              onClick={() => {
                // Navigate to a demo section or modal
                document.getElementById('demo-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="min-w-[200px]"
            >
              View Demo
            </GlowButton>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <AnimatedCard delay={0.2} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
                <p className="text-muted-foreground">
                  Create stunning content with advanced AI algorithms
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.4} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Optimization</h3>
                <p className="text-muted-foreground">
                  Enhance and optimize your content for maximum impact
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.6} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  Get detailed insights with CTR scoring and analysis
                </p>
              </div>
            </AnimatedCard>
          </motion.div>
        </motion.div>

        {/* Demo Section */}
        <motion.div
          id="demo-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <AnimatedCard className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-6">See It In Action</h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center">
              <img 
                src={aiParticlesImg} 
                alt="AI Demo" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <span className="text-4xl">▶️</span>
                </motion.div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 glow-cyan" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20"
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 rounded-full bg-secondary/20 glow-purple" />
      </motion.div>
    </div>
  );
};

export default LandingPage;