import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeats } from '../api/bookingApi';

export const useSeatSelectionViewModel = (screeningId: number) => {
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

  // Group seats by row
  const rows = (seats || []).reduce((acc: Record<string, any[]>, seat: any) => {
    if (!acc[seat.rowLabel]) {
      acc[seat.rowLabel] = [];
    }
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {});

  // Sort rows Alphabetically A-Z and seats numerically
  const sortedRowKeys = Object.keys(rows).sort();

  return {
    isLoading,
    isError,
    seats,
    selectedSeats,
    toggleSeat,
    rows,
    sortedRowKeys
  };
};
