import { useQuery } from '@tanstack/react-query';
import { App } from '../types';

export const useApps = () => {
  return useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const response = await fetch('/api/apps');
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }
      return response.json();
    },
  });
};
