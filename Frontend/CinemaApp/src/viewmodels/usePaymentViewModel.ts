import { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { payBooking } from '../api/bookingApi';
import { useAuth } from '../context/AuthContext';

export const usePaymentViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { token } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const { reservation } = route.params as any;

  const formattedPrice = reservation?.totalPrice
    ? `$${reservation.totalPrice.toFixed(2)}`
    : '$0.00';

  const formattedScreeningTime = reservation?.screeningTime
    ? new Date(reservation.screeningTime).toLocaleString()
    : '';

  const onBackPress = () => navigation.goBack();

  const onPayPress = async () => {
    if (!token) return;
    setIsProcessing(true);
    try {
      const confirmedReservation = await payBooking(reservation.id, token);
      navigation.reset({
        index: 0,
        routes: [
          { name: 'MainTabs' as never },
          { name: 'PaymentConfirmation' as never, params: { reservation: confirmedReservation } as never },
        ],
      });
    } catch {
      Alert.alert('Payment Error', 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    reservation,
    formattedPrice,
    formattedScreeningTime,
    onPayPress,
    onBackPress,
  };
};
