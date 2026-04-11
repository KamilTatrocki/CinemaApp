import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchScreenings } from '../api/bookingApi';
import { ScreeningResponse } from '../models/BookingModels';

export const useScreeningsViewModel = (movieId: number) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { data: screenings, isLoading, isError } = useQuery({
    queryKey: ['screenings', movieId],
    queryFn: () => fetchScreenings(movieId),
    enabled: !!movieId,
  });

  // Group by date and then by cinema
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

  return {
    isLoading,
    isError,
    screenings,
    dates,
    activeDate,
    activeScreeningsByCinema,
    setSelectedDate
  };
};
