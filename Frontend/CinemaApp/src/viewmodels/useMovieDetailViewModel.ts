import React from 'react';
import { useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useVideoPlayer } from 'expo-video';
import { fetchMovieById } from '../api/movieApi';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../api/config';
import { Movie } from '../models/Movie';


const resolveUrl = (path: string | undefined | null): string => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_URL}${path}`;
};



export const useMovieDetailViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { isAuthenticated } = useAuth();

  const initialMovie = (route.params as any)?.movie as Movie | undefined;

  const { data: movieDetails, isLoading, isError, error } = useQuery({
    queryKey: ['movie', initialMovie?.id],
    queryFn: () => {
      if (!initialMovie?.id) throw new Error('Movie ID is required');
      return fetchMovieById(initialMovie.id);
    },
    enabled: !!initialMovie?.id,
  });


  const displayMovie = movieDetails ?? initialMovie;

  const imageUrl = resolveUrl(initialMovie?.imageUrl);
  const mediaUrl = resolveUrl(displayMovie?.mediaUrl);
  const onBookPress = () => {
    if (isAuthenticated) {
      navigation.navigate('Screenings', { movieId: displayMovie?.id });
    } else {
      navigation.navigate('MainTabs', { screen: 'Account' });
    }
  };

  const onBackPress = () => navigation.goBack();

  return {
    displayMovie,
    imageUrl,
    mediaUrl,
    isLoading,
    isError,
    error,
    onBookPress,
    onBackPress,
  };
};




export const useTrailerPlayerViewModel = (url: string) => {
  const isFocused = useIsFocused();

  const player = useVideoPlayer(url, (p) => {
    p.loop = true;
  });

  React.useEffect(() => {
    if (isFocused) {
      player.play();
    } else {
      player.pause();
    }
  }, [isFocused, player]);

  return { player };
};
