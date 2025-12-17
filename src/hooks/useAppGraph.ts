import { useQuery } from '@tanstack/react-query';
import { GraphData } from '../types';

export const useAppGraph = (appId: string | null) => {
  return useQuery<GraphData>({
    queryKey: ['graph', appId],
    queryFn: async () => {
      if (!appId) throw new Error('No app selected');
      const response = await fetch(`/api/apps/${appId}/graph`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph');
      }
      return response.json();
    },
    enabled: !!appId,
  });
};
