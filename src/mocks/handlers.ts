import { http, HttpResponse } from 'msw';
import { Application, GraphData } from '../types';

const apps: Application[] = [
  {
    id: 'prod-api',
    name: 'Production API',
    description: 'Main production service',
  },
  {
    id: 'analytics',
    name: 'Analytics Service',
    description: 'Data analytics pipeline',
  },
  {
    id: 'auth',
    name: 'Auth Service',
    description: 'Authentication system',
  },
];

const graphData: Record<string, GraphData> = {
  'prod-api': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 100, y: 100 },
        data: {
          label: 'API Gateway',
          status: 'healthy',
          cpu: 45,
          memory: 62,
          requests: 1250,
        },
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 400, y: 100 },
        data: {
          label: 'Database',
          status: 'healthy',
          cpu: 30,
          memory: 78,
          requests: 850,
        },
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 250, y: 300 },
        data: {
          label: 'Cache Layer',
          status: 'degraded',
          cpu: 65,
          memory: 45,
          requests: 2100,
        },
      },
    ],
    edges: [
      {
        id: 'e1-2',
        source: 'node-1',
        target: 'node-2',
      },
      {
        id: 'e1-3',
        source: 'node-1',
        target: 'node-3',
      },
      {
        id: 'e3-2',
        source: 'node-3',
        target: 'node-2',
      },
    ],
  },
  analytics: {
    nodes: [
      {
        id: 'node-a1',
        type: 'service',
        position: { x: 150, y: 150 },
        data: {
          label: 'Data Ingestion',
          status: 'healthy',
          cpu: 55,
          memory: 70,
          requests: 980,
        },
      },
      {
        id: 'node-a2',
        type: 'service',
        position: { x: 400, y: 150 },
        data: {
          label: 'Processing Engine',
          status: 'healthy',
          cpu: 75,
          memory: 85,
          requests: 450,
        },
      },
    ],
    edges: [
      {
        id: 'ea1-a2',
        source: 'node-a1',
        target: 'node-a2',
      },
    ],
  },
  auth: {
    nodes: [
      {
        id: 'node-auth1',
        type: 'service',
        position: { x: 200, y: 200 },
        data: {
          label: 'Auth Server',
          status: 'healthy',
          cpu: 25,
          memory: 40,
          requests: 1500,
        },
      },
    ],
    edges: [],
  },
};

export const handlers = [
  http.get('/api/apps', () => {
    return HttpResponse.json(apps);
  }),

  http.get('/api/apps/:id/graph', ({ params }) => {
    const { id } = params;
    const data = graphData[id as string] || { nodes: [], edges: [] };
    return HttpResponse.json(data);
  }),
];
