import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/movieApi';
import { fetchPromotions } from '../api/promotionApi';

type TabParamList = {
  Home: undefined;
  Movies: undefined;
  Account: undefined;
};

export const useHomeViewModel = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError, error: moviesError } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchMovies(),
  });

  const { data: promotions, isLoading: isPromotionsLoading, isError: isPromotionsError, error: promotionsError } = useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions,
  });

  const onViewMoreMovies = () => navigation.navigate('Movies');

  return {
    movies: movies || [],
    promotions: promotions || [],
    isLoading: isMoviesLoading || isPromotionsLoading,
    isError: isMoviesError || isPromotionsError,
    error: moviesError || promotionsError,
    onViewMoreMovies,
  };
};
