// src/components/EthicalGuardrail.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { AnimatedCard } from '@/components/ui/AnimatedCard';

interface FairnessResult {
  score: number;
  explanation: string;
}

export const EthicalGuardrail = () => {
  const [adCopy, setAdCopy] = useState('');
  const [result, setResult] = useState<FairnessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const BACKEND_URL = "http://127.0.0.1:5000";

  const handleAnalyze = async () => {
    if (!adCopy.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`${BACKEND_URL}/check-fairness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad_copy: adCopy }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `Server error: ${res.statusText}`);
      }
      
      setResult({ score: data.score, explanation: data.explanation });

    } catch (err: any) {
      setError(err.message || 'Failed to analyze ad copy.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 2) return 'text-red-500';
    if (score <= 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ShieldCheck className="text-primary" />
          Ethical Guardrail
        </h2>
        <p className="text-muted-foreground">
          Analyze ad copy for fairness and ethical concerns.
        </p>
      </motion.div>

      <AnimatedCard className="p-6 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Ad Copy</label>
          <textarea
            value={adCopy}
            onChange={(e) => setAdCopy(e.target.value)}
            placeholder="Enter your ad copy to check for ethical concerns..."
            className="w-full h-24 bg-transparent border border-white/20 rounded-lg p-3 resize-none focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <GlowButton
          onClick={handleAnalyze}
          disabled={!adCopy.trim() || isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Check Fairness'}
        </GlowButton>
      </AnimatedCard>

      <div className="flex-1 overflow-y-auto">
        {isAnalyzing && (
          <AnimatedCard className="p-6 text-center">
             <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 mx-auto mb-4 border-2 border-primary border-t-transparent rounded-full"
              />
            <p>Analyzing for ethical concerns...</p>
          </AnimatedCard>
        )}

        {error && (
            <AnimatedCard className="p-6 text-center bg-red-900/20 border-red-500/30">
                <p className="text-red-400">{error}</p>
            </AnimatedCard>
        )}

        {result && (
          <AnimatedCard className="p-6">
            <h3 className="text-xl font-semibold mb-4">Analysis Result</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score} / 5
              </div>
              <div className="text-sm text-muted-foreground">(1 = High Concern, 5 = Looks Good)</div>
            </div>
            <div>
              <p className="font-medium">Explanation:</p>
              <p className="text-muted-foreground">{result.explanation}</p>
            </div>
          </AnimatedCard>
        )}
      </div>
    </div>
  );
};