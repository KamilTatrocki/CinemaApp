import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/movieApi';
import { Movie } from '../models/Movie';

export const useMoviesViewModel = () => {
  const { data: movies, isLoading, isError, error, refetch } = useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: () => fetchMovies(),
  });

  return {
    movies: movies || [],
    isLoading,
    isError,
    error,
    refreshMovies: refetch,
  };
};
