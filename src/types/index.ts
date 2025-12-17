export interface App {
  id: string;
  name: string;
  description?: string;
}

export interface ServiceNode {
  id: string;
  type: 'service';
  position: { x: number; y: number };
  data: {
    label: string;
    status: 'healthy' | 'degraded' | 'down';
    sliderValue: number;
    description?: string;
  };
}

export interface GraphData {
  nodes: ServiceNode[];
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}
