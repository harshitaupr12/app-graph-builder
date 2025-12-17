import { Node, Edge } from '@xyflow/react';

export interface Application {
  id: string;
  name: string;
  description: string;
}

export interface ServiceNodeData {
  label: string;
  status: 'healthy' | 'degraded' | 'down';
  cpu: number;
  memory: number;
  requests: number;
}

export type ServiceNode = Node<ServiceNodeData, 'service'>;

export interface GraphData {
  nodes: ServiceNode[];
  edges: Edge[];
}
