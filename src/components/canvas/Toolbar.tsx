import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, Layout, RefreshCw } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export function Toolbar() {
  const { zoomIn, zoomOut, fitView, setCenter } = useReactFlow();

  const handleReset = () => {
    fitView({ padding: 0.2, duration: 800 });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 p-1.5 rounded-xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
    >
      <ToolButton icon={ZoomOut} onClick={() => zoomOut()} tooltip="Zoom Out" />
      <ToolButton icon={ZoomIn} onClick={() => zoomIn()} tooltip="Zoom In" />
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
      <ToolButton icon={Maximize2} onClick={handleReset} tooltip="Fit View" />
      <ToolButton icon={Layout} onClick={handleReset} tooltip="Reset Layout" />
      <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
      <ToolButton icon={RefreshCw} onClick={handleReset} tooltip="Refresh" />
    </motion.div>
  );
}

function ToolButton({ 
  icon: Icon, 
  onClick, 
  tooltip 
}: { 
  icon: React.ElementType; 
  onClick: () => void; 
  tooltip: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
    >
      <Icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        {tooltip}
      </div>
    </button>
  );
}
