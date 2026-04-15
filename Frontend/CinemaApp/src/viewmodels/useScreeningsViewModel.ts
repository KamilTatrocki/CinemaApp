import { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchScreenings } from '../api/bookingApi';
import { ScreeningResponse } from '../models/BookingModels';

export const useScreeningsViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const movieId = (route.params as any)?.movieId as number;

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data: screenings, isLoading, isError } = useQuery({
    queryKey: ['screenings', movieId],
    queryFn: () => fetchScreenings(movieId),
    enabled: !!movieId,
  });

  
  const screeningsByDate = (screenings || []).reduce((acc, screening) => {
    const date = new Date(screening.startTime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {};
    }
    const cinema = screening.cinemaName;
    if (!acc[date][cinema]) {
      acc[date][cinema] = [];
    }
    acc[date][cinema].push(screening);
    return acc;
  }, {} as Record<string, Record<string, ScreeningResponse[]>>);

  const dates = Object.keys(screeningsByDate);
  const activeDate = selectedDate || dates[0];
  const activeScreeningsByCinema = screeningsByDate[activeDate] || {};

  const onSelectScreening = (screeningId: number) =>
    navigation.navigate('SeatSelection', { screeningId });

  const onBackPress = () => navigation.goBack();

  return {
    isLoading,
    isError,
    screenings,
    dates,
    activeDate,
    activeScreeningsByCinema,
    setSelectedDate,
    onSelectScreening,
    onBackPress,
  };
};
