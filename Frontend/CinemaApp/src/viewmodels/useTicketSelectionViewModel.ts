import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTicketTypes } from '../api/bookingApi';

export const useTicketSelectionViewModel = (selectedSeats: number[]) => {
  const { data: ticketTypes, isLoading, isError } = useQuery({
    queryKey: ['ticketTypes'],
    queryFn: fetchTicketTypes,
  });

  const [ticketAssignments, setTicketAssignments] = useState<Record<number, number>>({});

  useEffect(() => {
    // default all seats to the first ticket type
    if (ticketTypes && ticketTypes.length > 0 && selectedSeats && selectedSeats.length > 0) {
      if (Object.keys(ticketAssignments).length === 0) {
        const initialAssignments: Record<number, number> = {};
        selectedSeats.forEach((seatId: number) => {
          initialAssignments[seatId] = ticketTypes[0].id;
        });
        setTicketAssignments(initialAssignments);
      }
    }
  }, [ticketTypes, selectedSeats]);

  const setTicketTypeForSeat = (seatId: number, typeId: number) => {
    setTicketAssignments(prev => ({ ...prev, [seatId]: typeId }));
  };

  return {
    isLoading,
    isError,
    ticketTypes,
    ticketAssignments,
    setTicketTypeForSeat,
  };
};
