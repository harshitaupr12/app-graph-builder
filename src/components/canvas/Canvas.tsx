import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, NodeMouseHandler, addEdge, Connection } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Layers, Plus } from 'lucide-react';
import { ServiceNode } from './ServiceNode';
import { CustomEdge } from './CustomEdge';
import { Toolbar } from './Toolbar';
import { NodeInspector } from '../inspector/NodeInspector';
import { useStore } from '../../store/useStore';
import { GraphData, ServiceNodeData } from '../../types';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  service: ServiceNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

export function Canvas() {
  const selectedAppId = useStore((state) => state.selectedAppId);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<{ id: string; data: ServiceNodeData } | null>(null);

  const { data: graphData, isLoading } = useQuery<GraphData>({
    queryKey: ['graph', selectedAppId],
    queryFn: async () => {
      if (!selectedAppId) return null;
      const response = await fetch(`/api/apps/${selectedAppId}/graph`);
      return response.json();
    },
    enabled: !!selectedAppId,
  });

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes || []);
      const customEdges = (graphData.edges || []).map(edge => ({
        ...edge,
        type: 'custom',
        data: { label: 'HTTP' },
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      }));
      setEdges(customEdges);
    }
  }, [graphData, setNodes, setEdges]);

  const onNodeClick: NodeMouseHandler = useCallback((event, node) => {
    setSelectedNode({ id: node.id, data: node.data as ServiceNodeData });
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        type: 'custom',
        data: { label: 'HTTP' },
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const handleAddNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'service',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: {
        label: 'New Service',
        status: 'healthy' as const,
        cpu: 0,
        memory: 0,
        requests: 0,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleUpdateNode = useCallback((nodeId: string, updates: Partial<ServiceNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...updates } }
          : node
      )
    );
  }, [setNodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  if (!selectedAppId) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md px-6"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
            <Layers className="w-10 h-10 text-gray-600 dark:text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Select an app to view its graph
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose from the apps panel on the right
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900"
        minZoom={0.5}
        maxZoom={2}
      >
        <Background 
          gap={16} 
          size={1} 
          className="opacity-50 dark:opacity-30" 
        />
        <Controls 
          className="!bg-white/80 dark:!bg-gray-900/80 !border-gray-200/50 dark:!border-gray-700/50 backdrop-blur-xl !shadow-lg" 
          showInteractive={false}
        />
      </ReactFlow>

      {/* Add Node Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        onClick={handleAddNode}
        className="absolute top-6 left-6 z-10 w-10 h-10 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
      >
        <Plus className="w-5 h-5 text-white" />
      </motion.button>

      {/* Floating Toolbar */}
      <Toolbar />

      {/* Inspector Panel */}
      {selectedNode && (
        <NodeInspector 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)}
          onUpdate={(updates) => handleUpdateNode(selectedNode.id, updates)}
          onDelete={() => handleDeleteNode(selectedNode.id)}
        />
      )}
    </div>
  );
}
