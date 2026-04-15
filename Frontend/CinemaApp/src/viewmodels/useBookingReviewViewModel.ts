import { useState } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { createBooking } from '../api/bookingApi';
import { useAuth } from '../context/AuthContext';
import { BookingRequest } from '../models/BookingModels';

export const useBookingReviewViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { token, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { screeningId, tickets } = route.params as { screeningId: number; tickets: any[] };

  const onBackPress = () => navigation.goBack();

  const onBookPress = async () => {
    if (!isAuthenticated || !token) {
      Alert.alert(
        'Booking Error',
        'You must be logged in to create a reservation. Please log in from the Profile tab and try again.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const request: BookingRequest = { screeningId, tickets };
      const reservation = await createBooking(request, token);
      navigation.navigate('Payment', { reservation });
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'There was an issue creating your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    tickets,
    onBookPress,
    onBackPress,
  };
};
