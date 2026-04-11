import { useState } from 'react';
import { payBooking } from '../api/bookingApi';
import { useAuth } from '../context/AuthContext';

export const usePaymentViewModel = () => {
  const { token } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (reservationId: number, onSuccess: (reservation: any) => void, onError: () => void) => {
    if (!token) return;
    setIsProcessing(true);
    try {
      const confirmedReservation = await payBooking(reservationId, token);
      onSuccess(confirmedReservation);
    } catch (error) {
      onError();
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    handlePayment,
  };
};
