import { useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchSeats } from '../api/bookingApi';

export const useSeatSelectionViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const screeningId = (route.params as any)?.screeningId as number;

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data: seats, isLoading, isError } = useQuery({
    queryKey: ['seats', screeningId],
    queryFn: () => fetchSeats(screeningId),
    enabled: !!screeningId,
  });

  const toggleSeat = (seatId: number) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  
  const rows = (seats || []).reduce((acc: Record<string, any[]>, seat: any) => {
    if (!acc[seat.rowLabel]) {
      acc[seat.rowLabel] = [];
    }
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {});

  
  const sortedRowKeys = Object.keys(rows).sort();

  const onProceedToTickets = () =>
    navigation.navigate('TicketSelection', { screeningId, selectedSeats });

  const onBackPress = () => navigation.goBack();

  return {
    isLoading,
    isError,
    seats,
    selectedSeats,
    toggleSeat,
    rows,
    sortedRowKeys,
    onProceedToTickets,
    onBackPress,
  };
};
