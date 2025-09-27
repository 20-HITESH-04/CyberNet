// import { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { Image as ImageIcon, Zap, Sparkles } from "lucide-react";
// import { AnimatedCard } from "@/components/ui/AnimatedCard";
// import { ChatBubble } from "@/components/ui/ChatBubble";
// import { Button } from "@/components/ui/button";
// import ReactMarkdown from "react-markdown";

// interface OptimizationResult {
//   id: string;
//   type: "image" | "text";
//   original: string; // Local preview or raw text
//   optimized: string; // Backend feedback / improved creative
//   timestamp: Date;
// }

// export const Optimization = () => {
//   const [results, setResults] = useState<OptimizationResult[]>([]);
//   const [isOptimizing, setIsOptimizing] = useState(false);
//   const [textInput, setTextInput] = useState("");

//   const imageInputRef = useRef<HTMLInputElement | null>(null);

//   const BACKEND_URL = "http://localhost:5000"; // update if deployed

//   // Open system file picker
//   const openFilePicker = () => {
//     if (imageInputRef.current) imageInputRef.current.click();
//   };

//   // Handle image upload
//   // Handle image upload
// const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const file = e.target.files?.[0];
//   e.currentTarget.value = "";
//   if (!file) return;

//   const id = Date.now().toString();
//   const localPreview = URL.createObjectURL(file);

//   // setResults((prev) => [
//   //   {
//   //     id,
//   //     type: "image",
//   //     original: localPreview,
//   //     optimized: "Optimizing...",
//   //     timestamp: new Date(),
//   //   },
//   //   ...prev,
//   // ]);

//   setResults((prev) =>
//   prev.map((r) =>
//     r.id === id
//       ? {
//           ...r,
//           optimized: data.feedback_text,   // ✅ show Gemini feedback
//           // Optionally also show the improved image
//           improvedImage: data.improved_creative_path,
//         }
//       : r
//   )
// );

//   setIsOptimizing(true);

//   try {
//     const formData = new FormData();
//     formData.append("file", file); // ✅ send file properly

//     const res = await fetch(`${BACKEND_URL}/get-creative-feedback`, {
//       method: "POST",
//       body: formData, // ✅ no JSON here
//     });

//     const data = await res.json();

//     setResults((prev) =>
//       prev.map((r) =>
//         r.id === id ? { ...r, optimized: data.feedback_text } : r
//       )
//     );
//   } catch (err) {
//     console.error(err);
//     setResults((prev) =>
//       prev.map((r) =>
//         r.id === id ? { ...r, optimized: "Failed to optimize image" } : r
//       )
//     );
//   } finally {
//     setIsOptimizing(false);
//   }
// };

//   // Handle text optimization
//   const handleTextOptimize = async () => {
//     if (!textInput.trim()) return;

//     const id = Date.now().toString();

//     setResults((prev) => [
//       {
//         id,
//         type: "text",
//         original: textInput,
//         optimized: "Optimizing...",
//         timestamp: new Date(),
//       },
//       ...prev,
//     ]);
//     setIsOptimizing(true);

//     try {
//       const res = await fetch(`${BACKEND_URL}/get-creative-feedback`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           creative_type: "text",
//           creative_data: textInput,
//         }),
//       });

//       const data = await res.json();

//       setResults((prev) =>
//         prev.map((r) =>
//           r.id === id ? { ...r, optimized: data.feedback_text } : r
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setResults((prev) =>
//         prev.map((r) =>
//           r.id === id ? { ...r, optimized: "Failed to optimize text" } : r
//         )
//       );
//     } finally {
//       setIsOptimizing(false);
//       setTextInput("");
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-6"
//       >
//         <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
//           <Zap className="text-secondary" />
//           Optimization
//         </h2>
//         <p className="text-muted-foreground">
//           Enhance your content with AI-powered optimization
//         </p>
//       </motion.div>

//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={imageInputRef}
//         onChange={handleImageChange}
//         className="hidden"
//       />

//       {/* Upload image card */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div
//           onClick={openFilePicker}
//           className="cursor-pointer p-6 rounded-lg border border-dashed border-white/10 hover:bg-muted/10"
//         >
//           <div className="text-center">
//             <ImageIcon size={32} className="mx-auto mb-2 text-secondary" />
//             <h3 className="font-semibold">Upload Image</h3>
//             <p className="text-muted-foreground text-sm">Click to upload</p>
//           </div>
//         </div>
//       </div>

//       {/* Text input */}
//       <div className="mb-8">
//         <textarea
//           value={textInput}
//           onChange={(e) => setTextInput(e.target.value)}
//           placeholder="Write or paste your text here..."
//           rows={4}
//           className="w-full rounded-md border border-white/10 bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
//         />
//         <div className="mt-2 text-right">
//           <Button
//             onClick={handleTextOptimize}
//             disabled={!textInput.trim() || isOptimizing}
//           >
//             <Sparkles size={16} className="mr-2" />
//             Optimize Text
//           </Button>
//         </div>
//       </div>

//       {/* Results */}
//       <div className="flex-1 overflow-y-auto space-y-6">
//         {isOptimizing && (
//           <AnimatedCard className="p-6 text-center">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-12 h-12 mx-auto mb-4 border-4 border-secondary border-t-transparent rounded-full"
//             />
//             <p className="text-lg">Optimizing your content...</p>
//           </AnimatedCard>
//         )}

//         {results.map((result) => (
//           <div key={result.id} className="flex gap-6">
//             {/* Original */}
//             <div className="flex-1">
//               <ChatBubble isUser={true}>
//                 <div className="font-medium mb-2">Original {result.type}</div>
//                 {result.type === "image" ? (
//                   <img
//                     src={result.original}
//                     alt="upload"
//                     className="max-h-40 rounded mx-auto"
//                   />
//                 ) : (
//                   <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
//                     {result.original}
//                   </pre>
//                 )}
//               </ChatBubble>
//             </div>

//             {/* Optimized */}
//             <div className="flex-1">
//               <ChatBubble isUser={false}>
//                 <div className="font-medium mb-2">Optimized {result.type}</div>
//                 {result.type === "image" ? (
//                   <img
//                     src={result.optimized}
//                     alt="optimized"
//                     className="max-h-40 rounded mx-auto"
//                   />
//                 ) : (
//                   <div className="prose prose-invert max-w-none text-sm">
//                     <ReactMarkdown>{result.optimized}</ReactMarkdown>
//                   </div>
//                 )}
//               </ChatBubble>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };




import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Zap, Sparkles } from "lucide-react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface OptimizationResult {
  id: string;
  type: "image" | "text";
  original: string; // Local preview or raw text
  optimized: string; // Backend feedback
  improvedImage?: string; // optional improved image
  timestamp: Date;
}

export const Optimization = () => {
  const [results, setResults] = useState<OptimizationResult[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [textInput, setTextInput] = useState("");

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const BACKEND_URL = "http://localhost:5000"; // update if deployed

  // Open system file picker
  const openFilePicker = () => {
    if (imageInputRef.current) imageInputRef.current.click();
  };

  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.currentTarget.value = "";
    if (!file) return;

    const id = Date.now().toString();
    const localPreview = URL.createObjectURL(file);

    // show placeholder while optimizing
    setResults((prev) => [
      {
        id,
        type: "image",
        original: localPreview,
        optimized: "Optimizing...",
        timestamp: new Date(),
      },
      ...prev,
    ]);

    setIsOptimizing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BACKEND_URL}/get-creative-feedback`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setResults((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                optimized: data.feedback_text || "No feedback received",
                improvedImage: data.improved_creative_path
                  ? `${BACKEND_URL}${data.improved_creative_path}`
                  : undefined,
              }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      setResults((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, optimized: "Failed to optimize image" }
            : r
        )
      );
    } finally {
      setIsOptimizing(false);
    }
  };

  // Handle text optimization
  const handleTextOptimize = async () => {
    if (!textInput.trim()) return;

    const id = Date.now().toString();

    setResults((prev) => [
      {
        id,
        type: "text",
        original: textInput,
        optimized: "Optimizing...",
        timestamp: new Date(),
      },
      ...prev,
    ]);
    setIsOptimizing(true);

    try {
      const res = await fetch(`${BACKEND_URL}/get-creative-feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creative_type: "text",
          creative_data: textInput,
        }),
      });

      const data = await res.json();

      setResults((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, optimized: data.feedback_text || "No feedback received" }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      setResults((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, optimized: "Failed to optimize text" }
            : r
        )
      );
    } finally {
      setIsOptimizing(false);
      setTextInput("");
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
          <Zap className="text-secondary" />
          Optimization
        </h2>
        <p className="text-muted-foreground">
          Enhance your content with AI-powered optimization
        </p>
      </motion.div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload image card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          onClick={openFilePicker}
          className="cursor-pointer p-6 rounded-lg border border-dashed border-white/10 hover:bg-muted/10"
        >
          <div className="text-center">
            <ImageIcon size={32} className="mx-auto mb-2 text-secondary" />
            <h3 className="font-semibold">Upload Image</h3>
            <p className="text-muted-foreground text-sm">Click to upload</p>
          </div>
        </div>
      </div>

      {/* Text input */}
      <div className="mb-8">
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Write or paste your text here..."
          rows={4}
          className="w-full rounded-md border border-white/10 bg-transparent p-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="mt-2 text-right">
          <Button
            onClick={handleTextOptimize}
            disabled={!textInput.trim() || isOptimizing}
          >
            <Sparkles size={16} className="mr-2" />
            Optimize Text
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {isOptimizing && (
          <AnimatedCard className="p-6 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 mx-auto mb-4 border-4 border-secondary border-t-transparent rounded-full"
            />
            <p className="text-lg">Optimizing your content...</p>
          </AnimatedCard>
        )}

        {results.map((result) => (
          <div key={result.id} className="flex gap-6">
            {/* Original */}
            <div className="flex-1">
              <ChatBubble isUser={true}>
                <div className="font-medium mb-2">Original {result.type}</div>
                {result.type === "image" ? (
                  <img
                    src={result.original}
                    alt="upload"
                    className="max-h-40 rounded mx-auto"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                    {result.original}
                  </pre>
                )}
              </ChatBubble>
            </div>

            {/* Optimized */}
            <div className="flex-1">
              <ChatBubble isUser={false}>
                <div className="font-medium mb-2">Optimized {result.type}</div>
                {result.type === "image" ? (
                  <div>
                    <div className="prose prose-invert max-w-none text-sm mb-3">
                      <ReactMarkdown>{result.optimized}</ReactMarkdown>
                    </div>
                    {result.improvedImage && (
                      <img
                        src={result.improvedImage}
                        alt="improved"
                        className="max-h-40 rounded mx-auto"
                      />
                    )}
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-sm">
                    <ReactMarkdown>{result.optimized}</ReactMarkdown>
                  </div>
                )}
              </ChatBubble>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
