import { create } from 'zustand';
import { Node, Edge } from '@xyflow/react';

interface StoreState {
  selectedAppId: string | null;
  setSelectedApp: (appId: string) => void;
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  deleteNode: (nodeId: string) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedAppId: null,
  setSelectedApp: (appId) => set({ selectedAppId: appId }),
  
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNodeData: (nodeId, data) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId 
        ? { ...node, data: { ...node.data, ...data } }
        : node
    )
  })),
  
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    edges: state.edges.filter(edge => 
      edge.source !== nodeId && edge.target !== nodeId
    )
  })),

  activeView: 'canvas',
  setActiveView: (view) => set({ activeView: view }),
}));
