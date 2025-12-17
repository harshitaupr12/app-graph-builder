import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  NodeTypes,
  BackgroundVariant,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppStore } from '../../stores/useAppStore';
import { useFlowStore } from '../../stores/useFlowStore';
import { useAppGraph } from '../../hooks/useAppGraph';
import { ServiceNode as ServiceNodeComponent } from './ServiceNode';

const nodeTypes: NodeTypes = {
  service: ServiceNodeComponent,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'hsl(var(--primary))',
  },
};

export const FlowCanvas = () => {
  const { selectedAppId, selectedNodeId, setSelectedNodeId } = useAppStore();
  const { nodes, edges, setNodes, setEdges } = useFlowStore();
  const { data: graphData, isLoading, isError } = useAppGraph(selectedAppId);

  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes);
      setEdges(graphData.edges);
    }
  }, [graphData, setNodes, setEdges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId && !isInputField) {
        e.preventDefault();
        setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));
        setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
        setSelectedNodeId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, setNodes, setEdges, setSelectedNodeId]);

  if (!selectedAppId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20">
        <div className="text-center p-8 rounded-lg border-2 border-dashed border-border bg-card">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <LayersIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium">Select an app to view its graph</p>
          <p className="text-xs text-muted-foreground mt-1">Choose from the apps panel on the right</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm font-medium text-foreground">Loading graph...</p>
          <p className="text-xs text-muted-foreground mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20">
        <div className="text-center p-8 rounded-lg border-2 border-destructive/50 bg-card">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircleIcon className="w-8 h-8 text-destructive" />
          </div>
          <p className="text-destructive font-medium">Failed to load graph</p>
          <p className="text-xs text-muted-foreground mt-1">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-muted/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        minZoom={0.5}
        maxZoom={2}
        className="bg-muted/5"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1.5}
          color="hsl(var(--muted-foreground))"
          className="opacity-30"
        />
        <Controls className="bg-card border border-border rounded-lg shadow-lg" />
        <MiniMap 
          className="bg-card border border-border rounded-lg shadow-lg"
          nodeColor={(node) => {
            const serviceNode = node as any;
            if (serviceNode.data?.status === 'healthy') return 'hsl(var(--primary))';
            if (serviceNode.data?.status === 'degraded') return '#eab308';
            if (serviceNode.data?.status === 'down') return '#ef4444';
            return 'hsl(var(--muted))';
          }}
        />
      </ReactFlow>
    </div>
  );
};

// Import missing icons
import { LayersIcon, AlertCircleIcon } from 'lucide-react';
