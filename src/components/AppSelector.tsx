import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Loader2, CheckCircle2, Server } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Application } from '../types';

export function AppSelector() {
  const { data: apps, isLoading } = useQuery<Application[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const response = await fetch('/api/apps');
      if (!response.ok) throw new Error('Failed to fetch apps');
      return response.json();
    },
  });

  const { selectedAppId, setSelectedApp } = useStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {apps?.map((app, index) => {
        const isSelected = selectedAppId === app.id;
        return (
          <motion.button
            key={app.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedApp(app.id)}
            className={`
              w-full p-4 rounded-xl text-left transition-all
              backdrop-blur-sm border
              ${isSelected
                ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                : 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/80 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                ${isSelected 
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/30' 
                  : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'
                }
              `}>
                <Server className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold text-sm ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {app.name}
                  </h3>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {app.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
