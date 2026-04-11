import { useState } from 'react';
import { createBooking } from '../api/bookingApi';
import { useAuth } from '../context/AuthContext';
import { BookingRequest } from '../models/BookingModels';

export const useBookingReviewViewModel = () => {
  const { token, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBooking = async (screeningId: number, tickets: any[], onSuccess: (reservation: any) => void, onError: (msg: string) => void) => {
    if (!isAuthenticated || !token) {
      onError('You must be logged in to create a reservation. Please log in from the Profile tab and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const request: BookingRequest = {
        screeningId,
        tickets,
      };
      
      const reservation = await createBooking(request, token);
      onSuccess(reservation);
    } catch (err: any) {
      onError(err.message || 'There was an issue creating your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleBooking,
  };
};
