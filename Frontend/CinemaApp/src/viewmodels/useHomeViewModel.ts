import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/movieApi';
import { fetchPromotions } from '../api/promotionApi';

export const useHomeViewModel = () => {
  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError, error: moviesError } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchMovies(),
  });

  const { data: promotions, isLoading: isPromotionsLoading, isError: isPromotionsError, error: promotionsError } = useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions,
  });

  return {
    movies: movies || [],
    promotions: promotions || [],
    isLoading: isMoviesLoading || isPromotionsLoading,
    isError: isMoviesError || isPromotionsError,
    error: moviesError || promotionsError,
  };
};
