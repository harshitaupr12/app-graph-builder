import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import { ServiceNodeData } from '../../types';

export const ServiceNode = memo(({ data, selected }: NodeProps<ServiceNodeData>) => {
  // Safe defaults
  const label = data?.label || 'Service';
  const status = data?.status || 'healthy';
  const cpu = data?.cpu || 0;
  const memory = data?.memory || 0;
  const requests = data?.requests || 0;

  const statusConfig = {
    healthy: {
      dot: 'bg-emerald-400',
      glow: 'shadow-emerald-400/20',
    },
    degraded: {
      dot: 'bg-amber-400',
      glow: 'shadow-amber-400/20',
    },
    down: {
      dot: 'bg-red-400',
      glow: 'shadow-red-400/20',
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2.5 h-2.5 !bg-gray-400 dark:!bg-gray-600 !border-2 !border-white dark:!border-gray-800" 
      />
      
      <div
        className={`
          min-w-[200px] rounded-xl overflow-hidden
          backdrop-blur-xl bg-white/80 dark:bg-gray-900/80
          border border-gray-200/50 dark:border-gray-700/50
          shadow-lg shadow-black/5 dark:shadow-black/20
          transition-all duration-200
          ${selected 
            ? 'ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/10' 
            : 'hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30'
          }
        `}
      >
        {/* Header */}
        <div className="relative px-4 py-3 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {label}
            </h3>
            <div className={`w-2 h-2 rounded-full ${config.dot} shadow-md ${config.glow}`} />
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-3 space-y-2.5">
          {/* CPU */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">CPU</span>
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{cpu}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${cpu}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Memory</span>
              <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{memory}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${memory}%` }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
              />
            </div>
          </div>

          {/* Requests */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-500">Requests/s</span>
            <span className="text-xs font-mono font-medium text-gray-900 dark:text-gray-100">
              {requests.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2.5 h-2.5 !bg-gray-400 dark:!bg-gray-600 !border-2 !border-white dark:!border-gray-800" 
      />
    </motion.div>
  );
});

ServiceNode.displayName = 'ServiceNode';
