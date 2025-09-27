// import { motion } from 'framer-motion';
// import { Brain, Zap, BarChart3 } from 'lucide-react';

// interface SidebarProps {
//   activeSection: string;
//   onSectionChange: (section: string) => void;
// }

// const sidebarItems = [
//   { id: 'generation', label: 'Ad Generation', icon: Brain },
//   { id: 'optimization', label: 'Optimization', icon: Zap },
//   { id: 'ctr', label: 'CTR Score', icon: BarChart3 },
// ];

// export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
//   return (
//     <motion.div
//       initial={{ x: -300, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="w-64 h-full glass-card p-6 border-r border-white/10"
//     >
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.6 }}
//         className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
//       >
//         AI Platform
//       </motion.h2>

//       <div className="space-y-4">
//         {sidebarItems.map((item, index) => {
//           const Icon = item.icon;
//           const isActive = activeSection === item.id;
          
//           return (
//             <motion.div
//               key={item.id}
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
//               whileHover={{ x: 10 }}
//               onClick={() => onSectionChange(item.id)}
//               className={`sidebar-item ${isActive ? 'active' : ''}`}
//             >
//               <motion.div
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//                 className="p-2"
//               >
//                 <Icon size={24} className="text-primary" />
//               </motion.div>
              
//               <span className="font-medium">{item.label}</span>
              
//               {isActive && (
//                 <motion.div
//                   layoutId="activeIndicator"
//                   className="absolute right-2 w-2 h-2 rounded-full bg-primary glow-cyan"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Animated decoration */}
//       <motion.div
//         className="mt-12 space-y-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1, duration: 1 }}
//       >
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ delay: 1.2 + i * 0.2, duration: 0.8 }}
//             style={{ width: `${100 - i * 20}%` }}
//           />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };



// src/components/Sidebar.tsx

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

// Define the types for the props the component will receive
interface SidebarProps {
  tabs: {
    name: string;
    icon: LucideIcon;
  }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ tabs, activeTab, setActiveTab }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-900/50 border-r border-white/10 p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-10 mt-4">AdAstra</h1>
      <nav className="flex flex-col gap-2">
        {/* Map over the 'tabs' prop to create a button for each item */}
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === tab.name
                ? "text-white"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {activeTab === tab.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary/30 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <tab.icon size={20} className="relative z-10" />
            <span className="relative z-10">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};