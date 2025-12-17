import { motion } from 'framer-motion';
import { LayoutDashboard, Workflow, Database, Code, Layers, GitBranch } from 'lucide-react';
import { useStore } from '../../store/useStore';

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'canvas', icon: Workflow, label: 'Canvas' },
  { id: 'data', icon: Database, label: 'Data' },
  { id: 'code', icon: Code, label: 'Code' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'version', icon: GitBranch, label: 'Version' },
];

export function LeftSidebar() {
  const { activeView, setActiveView } = useStore();

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="w-16 border-r border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 flex flex-col items-center py-4 gap-2"
    >
      {navItems.map((item, index) => {
        const isActive = activeView === item.id;
        return (
          <motion.button
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => setActiveView(item.id)}
            className={`
              group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all
              ${isActive 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            <item.icon 
              className={`w-5 h-5 transition-colors ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200'
              }`} 
            />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              {item.label}
            </div>

            {/* Active Indicator */}
            {isActive && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full"
              />
            )}
          </motion.button>
        );
      })}

      {/* Bottom Spacer */}
      <div className="flex-1" />

      {/* Status Indicator */}
      <div className="w-11 h-11 rounded-xl flex items-center justify-center">
        <div className="relative">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
      </div>
    </motion.aside>
  );
}
