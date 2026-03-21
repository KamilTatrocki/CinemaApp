import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from '../api/homeApi';

export const useHomeViewModel = () => {
  const { data: homeData, isLoading, isError, error } = useQuery({
    queryKey: ['homeData'],
    queryFn: fetchHomeData,
  });

  return {
    homeData,
    isLoading,
    isError,
    error,
  };
};
