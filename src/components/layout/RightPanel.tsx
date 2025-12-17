import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AppSelector } from '../AppSelector';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RightPanel({ isOpen, onClose }: RightPanelProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const panel = (
    <div className="h-full flex flex-col backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-l border-gray-200/50 dark:border-gray-800/50">
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Applications</h2>
          {isMobile && (
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Select an application to visualize its services
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AppSelector />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 md:hidden shadow-2xl"
            >
              {panel}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return <aside className="w-80 hidden md:block">{panel}</aside>;
}
