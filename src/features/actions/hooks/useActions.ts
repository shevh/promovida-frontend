import { useQuery } from '@tanstack/react-query';
import { actionsApi } from '../api/actionsApi';

export const useActions = () => {
  return useQuery({
    queryKey: ['actions'],
    queryFn: actionsApi.list,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};