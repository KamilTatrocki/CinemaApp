import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { fetchTicketTypes } from '../api/bookingApi';

export const useTicketSelectionViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { screeningId, selectedSeats } = route.params as { screeningId: number; selectedSeats: number[] };

  const { data: ticketTypes, isLoading, isError } = useQuery({
    queryKey: ['ticketTypes'],
    queryFn: fetchTicketTypes,
  });

  const [ticketAssignments, setTicketAssignments] = useState<Record<number, number>>({});

  useEffect(() => {

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

  const onProceedToReview = () => {
    const tickets = selectedSeats.map((seatId: number) => ({
      seatId,
      ticketTypeId: ticketAssignments[seatId],
    }));
    navigation.navigate('BookingReview', { screeningId, tickets });
  };

  const onBackPress = () => navigation.goBack();

  return {
    isLoading,
    isError,
    ticketTypes,
    selectedSeats,
    ticketAssignments,
    setTicketTypeForSeat,
    onProceedToReview,
    onBackPress,
  };
};
