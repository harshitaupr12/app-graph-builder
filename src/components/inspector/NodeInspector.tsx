import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Activity, Cpu, HardDrive, Network, Clock, AlertCircle, Edit2, Trash2, Save } from 'lucide-react';
import { ServiceNodeData } from '../../types';

interface NodeInspectorProps {
  node: { id: string; data: ServiceNodeData } | null;
  onClose: () => void;
  onUpdate: (updates: Partial<ServiceNodeData>) => void;
  onDelete: () => void;
}

export function NodeInspector({ node, onClose, onUpdate, onDelete }: NodeInspectorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState('');

  if (!node) return null;

  const { data } = node;
  const cpu = data?.cpu || 0;
  const memory = data?.memory || 0;
  const requests = data?.requests || 0;
  const status = data?.status || 'healthy';
  const label = data?.label || 'Service';

  const handleStartEdit = () => {
    setEditedLabel(label);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedLabel.trim()) {
      onUpdate({ label: editedLabel.trim() });
    }
    setIsEditing(false);
  };

  const statusColors = {
    healthy: 'text-emerald-500 bg-emerald-500/10',
    degraded: 'text-amber-500 bg-amber-500/10',
    down: 'text-red-500 bg-red-500/10',
  };

  return (
    <motion.div
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="absolute right-0 top-0 bottom-0 w-80 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-l border-gray-200/50 dark:border-gray-700/50 shadow-2xl z-10 flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Service Details
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={onDelete}
              className="w-8 h-8 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 flex items-center justify-center transition-colors group"
            >
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-red-600" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Node ID: {node.id}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Service Name - Editable */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Service Name
          </label>
          {isEditing ? (
            <div className="mt-1 flex items-center gap-2">
              <input
                type="text"
                value={editedLabel}
                onChange={(e) => setEditedLabel(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
              />
              <button
                onClick={handleSaveEdit}
                className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Save className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <div className="mt-1 flex items-center justify-between group">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {label}
              </p>
              <button
                onClick={handleStartEdit}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-all"
              >
                <Edit2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Status
          </label>
          <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${statusColors[status]}`}>
            <div className="w-2 h-2 rounded-full bg-current" />
            <span className="text-sm font-medium capitalize">{status}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Performance Metrics
          </h3>

          <MetricCard icon={Cpu} label="CPU Usage" value={`${cpu}%`} progress={cpu} color="blue" />
          <MetricCard icon={HardDrive} label="Memory Usage" value={`${memory}%`} progress={memory} color="purple" />
          <MetricCard icon={Network} label="Requests/sec" value={requests.toLocaleString()} color="green" />
        </div>

        {/* Additional Info */}
        <div className="space-y-3">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Additional Information
          </h3>

          <InfoRow icon={Clock} label="Uptime" value="99.9%" />
          <InfoRow icon={Activity} label="Response Time" value="45ms" />
          <InfoRow icon={AlertCircle} label="Error Rate" value="0.01%" />
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-2">
          <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
            View Logs
          </button>
          <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
            Restart Service
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  progress, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  progress?: number; 
  color: 'blue' | 'purple' | 'green';
}) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
      </div>
      {progress !== undefined && (
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
          />
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}
