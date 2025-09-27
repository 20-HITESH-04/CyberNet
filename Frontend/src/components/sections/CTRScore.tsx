// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { BarChart3, Upload, TrendingUp } from 'lucide-react';
// import { GlowButton } from '@/components/ui/GlowButton';
// import { AnimatedCard } from '@/components/ui/AnimatedCard';
// import { ChatBubble } from '@/components/ui/ChatBubble';

// interface CTRResult {
//   id: string;
//   input: string;
//   score: number;
//   timestamp: Date;
// }

// export const CTRScore = () => {
//   const [input, setInput] = useState('');
//   const [results, setResults] = useState<CTRResult[]>([]);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   // file input ref
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleAnalyze = async () => {
//     if (!input.trim()) return;

//     setIsAnalyzing(true);

//     // Simulate analysis
//     setTimeout(() => {
//       const result: CTRResult = {
//         id: Date.now().toString(),
//         input: input,
//         score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
//         timestamp: new Date(),
//       };
//       setResults(prev => [...prev, result]);
//       setInput('');
//       setIsAnalyzing(false);
//     }, 3000);
//   };

//   const handleFileButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click(); // open system file picker
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         // just showing file name for now, can also display content if text
//         setInput(file.name + ' uploaded');
//       };
//       // If you expect text files, use readAsText. For images use readAsDataURL.
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-6"
//       >
//         <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
//           <BarChart3 className="text-accent" />
//           CTR Score Analysis
//         </h2>
//         <p className="text-muted-foreground">
//           Get detailed analytics and CTR predictions for your content
//         </p>
//       </motion.div>

//       {/* Input Methods */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2 }}
//         className="mb-6"
//       >
//         <AnimatedCard className="p-6">
//           <div className="space-y-4">
//             {/* Text Input */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Text or Image Analysis
//               </label>
//               <div className="flex gap-4">
//                 <textarea
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Enter your ad copy or description..."
//                   className="flex-1 h-20 bg-transparent border border-white/20 rounded-lg p-3 resize-none focus:outline-none focus:border-accent/50 transition-colors"
//                 />
//                 <div className="flex flex-col gap-2">
//                   {/* hidden file input */}
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />

//                   {/* Upload button */}
//                   <GlowButton
//                     onClick={handleFileButtonClick}
//                     variant="secondary"
//                     size="sm"
//                     className="h-fit"
//                   >
//                     <Upload size={16} className="mr-2" />
//                     Upload
//                   </GlowButton>

//                   {/* Analyze button */}
//                   <GlowButton
//                     onClick={handleAnalyze}
//                     disabled={!input.trim() || isAnalyzing}
//                     size="sm"
//                     className="h-fit"
//                   >
//                     Analyze
//                   </GlowButton>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </AnimatedCard>
//       </motion.div>

//       {/* Results Area */}
//       <div className="flex-1 overflow-y-auto">
//         {results.length === 0 && !isAnalyzing && (
//           <AnimatedCard className="p-8 text-center">
//             <div className="text-6xl mb-4">📊</div>
//             <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
//             <p className="text-muted-foreground">
//               Upload content or enter text to get CTR predictions
//             </p>
//           </AnimatedCard>
//         )}

//         {isAnalyzing && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex justify-center mb-6"
//           >
//             <AnimatedCard className="p-6 text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
//                 className="w-12 h-12 mx-auto mb-4 border-4 border-accent border-t-transparent rounded-full"
//               />
//               <p className="text-lg">Analyzing CTR potential...</p>
//             </AnimatedCard>
//           </motion.div>
//         )}

//         <div className="space-y-6">
//           {results.map((result, index) => (
//             <motion.div
//               key={result.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="flex gap-6"
//             >
//               {/* Input */}
//               <div className="flex-1">
//                 <ChatBubble isUser={true}>
//                   <div className="flex items-center gap-3 mb-2">
//                     <BarChart3 size={20} />
//                     <span className="font-medium">Analysis Input</span>
//                   </div>
//                   <p>{result.input}</p>
//                 </ChatBubble>
//               </div>

//               {/* Results */}
//               <div className="flex-1">
//                 <ChatBubble isUser={false}>
//                   <div className="flex items-center gap-3 mb-4">
//                     <TrendingUp size={20} className="text-accent" />
//                     <span className="font-medium">CTR Analysis</span>
//                   </div>

//                   {/* CTR Score */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
//                     className="mb-4"
//                   >
//                     <div className="text-center p-4 bg-accent/20 rounded-lg border border-accent/30">
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1 }}
//                         className="text-3xl font-bold text-accent mb-2"
//                       >
//                         {result.score}%
//                       </motion.div>
//                       <p className="text-sm text-muted-foreground">
//                         Predicted CTR
//                       </p>
//                     </div>
//                   </motion.div>

//                   {/* Chart Placeholder */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 1.2 }}
//                     className="p-4 bg-muted/20 rounded-lg border border-accent/20"
//                   >
//                     <div className="text-center text-muted-foreground mb-3">
//                       Performance Chart
//                     </div>
//                     <div className="h-32 bg-gradient-to-t from-accent/20 to-transparent rounded flex items-end justify-center space-x-2">
//                       {[...Array(7)].map((_, i) => (
//                         <motion.div
//                           key={i}
//                           initial={{ height: 0 }}
//                           animate={{ height: `${Math.random() * 80 + 20}%` }}
//                           transition={{ delay: 1.5 + i * 0.1, duration: 0.6 }}
//                           className="w-4 bg-accent/60 rounded-t"
//                         />
//                       ))}
//                     </div>
//                   </motion.div>
//                 </ChatBubble>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };



import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { BarChart3, Upload, TrendingUp } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ChatBubble } from "@/components/ui/ChatBubble";

interface CTRResult {
  id: string;
  adText: string;
  userAge: number;
  predictedCTR: number;
  timestamp: Date;
}

export const CTRScore = () => {
  const [adText, setAdText] = useState("Limited time offer! Get 20% off the QuantumBook Pro.");
  const [userAge, setUserAge] = useState(35);
  const [results, setResults] = useState<CTRResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const BACKEND_URL = "http://127.0.0.1:5000";

  const handleAnalyze = async () => {
    if (!adText.trim()) return;
    setIsAnalyzing(true);

    try {
      const requestData = {
        ad_text: adText,
        user_data: {
          user_age: userAge,
          country: "US",
          ads_seen_today: 10,
          product_id: "QB01",
          price: 1299,
          time_of_day: "afternoon",
        },
      };

      const res = await fetch(`${BACKEND_URL}/predict-ctr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const result: CTRResult = {
        id: Date.now().toString(),
        adText: adText,
        userAge: userAge,
        predictedCTR: data.predicted_ctr_percentage,
        timestamp: new Date(),
      };

      setResults((prev) => [result, ...prev]);
    } catch (err) {
      console.error("Error analyzing CTR:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open system file picker
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Use file content as adText if it's text
        if (typeof reader.result === "string") {
          setAdText(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <BarChart3 className="text-accent" />
          CTR Score Analysis
        </h2>
        <p className="text-muted-foreground">
          Get detailed analytics and CTR predictions for your content
        </p>
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <AnimatedCard className="p-6 space-y-4">
          {/* Ad Text Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Ad Text</label>
            <textarea
              value={adText}
              onChange={(e) => setAdText(e.target.value)}
              placeholder="Enter your ad copy..."
              className="w-full h-20 bg-transparent border border-white/20 rounded-lg p-3 resize-none focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          {/* User Age Input */}
          <div>
            <label className="block text-sm font-medium mb-2">User Age</label>
            <input
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(Number(e.target.value))}
              className="w-full bg-transparent border border-white/20 rounded-lg p-3 focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>

          <div className="flex gap-4">
            {/* File Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <GlowButton
              onClick={handleFileButtonClick}
              variant="secondary"
              size="sm"
              className="h-fit"
            >
              <Upload size={16} className="mr-2" />
              Upload File
            </GlowButton>

            {/* Analyze Button */}
            <GlowButton
              onClick={handleAnalyze}
              disabled={!adText.trim() || isAnalyzing}
              size="sm"
              className="h-fit"
            >
              Analyze CTR
            </GlowButton>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center mb-6"
          >
            <AnimatedCard className="p-6 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4 border-4 border-accent border-t-transparent rounded-full"
              />
              <p className="text-lg">Analyzing CTR potential...</p>
            </AnimatedCard>
          </motion.div>
        )}

        {results.map((result) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-6"
          >
            {/* Input Bubble */}
            <div className="flex-1">
              <ChatBubble isUser={true}>
                <div className="font-medium mb-2">Ad Text</div>
                <p>{result.adText}</p>
                <div className="text-sm text-muted-foreground">
                  User Age: {result.userAge}
                </div>
              </ChatBubble>
            </div>

            {/* Output Bubble */}
            <div className="flex-1">
              <ChatBubble isUser={false}>
                <div className="font-medium mb-2">Predicted CTR</div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-accent"
                >
                  {result.predictedCTR}%
                </motion.div>
              </ChatBubble>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
