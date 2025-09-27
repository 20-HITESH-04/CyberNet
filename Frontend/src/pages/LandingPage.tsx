import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Scene3D } from '@/components/3d/Scene3D';
import { GlowButton } from '@/components/ui/GlowButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { useEffect } from 'react';
import neuralNetworkImg from '@/assets/neural-network.jpg';
import aiParticlesImg from '@/assets/ai-particles.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  // MotionValues for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Tilt transforms
  const tiltX = useTransform(mouseX, [0, 1], [-15, 15]);
  const tiltY = useTransform(mouseY, [0, 1], [15, -15]);

  // Parallax translation
  const translateX = useTransform(mouseX, [0, 1], [-20, 20]);
  const translateY = useTransform(mouseY, [0, 1], [-20, 20]);

  return (
    <div className="min-h-screen bg-animated relative overflow-hidden perspective">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D 
          showNeuralNetwork={true}
          showFloatingShapes={true}
          showParticles={true}
          className="opacity-30"
        />
      </div>

      {/* Animated Parallax Background */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `url(${neuralNetworkImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          translateX: translateX,
          translateY: translateY,
          scale: 1.05
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          style={{ rotateX: tiltY, rotateY: tiltX }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Hero Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight"
            animate={{
              textShadow: [
                "0px 0px 20px rgba(0,255,255,0.8)",
                "0px 0px 35px rgba(138,43,226,0.7)",
                "0px 0px 25px rgba(255,0,255,0.8)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
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
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-foreground/80 leading-relaxed"
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
                document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
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
            {[
              { icon: "🧠", title: "AI Generation", desc: "Create stunning content with advanced AI algorithms" },
              { icon: "⚡", title: "Optimization", desc: "Enhance and optimize your content for maximum impact" },
              { icon: "📊", title: "Analytics", desc: "Get detailed insights with CTR scoring and analysis" }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
              >
                <AnimatedCard delay={0.2 * i} className="p-6 hover:shadow-2xl">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.desc}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
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
          <AnimatedCard className="p-8 text-center relative overflow-hidden">
            <h3 className="text-3xl font-bold mb-6">See It In Action</h3>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="aspect-video rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center relative"
            >
              <img 
                src={aiParticlesImg} 
                alt="AI Demo" 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-primary/30 flex items-center justify-center shadow-lg backdrop-blur-sm"
                >
                  <span className="text-4xl">▶️</span>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedCard>
        </motion.div>
      </div>

      {/* Floating 3D Elements */}
      <motion.div
        className="absolute top-32 left-20"
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl shadow-2xl blur-sm" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-24"
        animate={{ y: [0, 25, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full shadow-xl blur-sm" />
      </motion.div>
    </div>
  );
};

export default LandingPage;



