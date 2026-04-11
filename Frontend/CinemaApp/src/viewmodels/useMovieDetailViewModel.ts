import { useQuery } from '@tanstack/react-query';
import { fetchMovieById } from '../api/movieApi';

export const useMovieDetailViewModel = (movieId: number | undefined) => {
  const { data: movie, isLoading, isError, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => {
      if (!movieId) throw new Error("Movie ID is required");
      return fetchMovieById(movieId);
    },
    enabled: !!movieId,
  });

  return {
    movie,
    isLoading,
    isError,
    error,
  };
};
