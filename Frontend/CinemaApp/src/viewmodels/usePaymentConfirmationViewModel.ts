import { useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { API_URL } from '../api/config';

export const usePaymentConfirmationViewModel = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { reservation } = route.params as any;

  /** Start audio on focus, unload on blur. */
  useFocusEffect(
    useCallback(() => {
      let sound: Audio.Sound | undefined;

      async function playSound() {
        try {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: `${API_URL}/uploads/Karaluch.mp3` },
            { shouldPlay: true, isLooping: true }
          );
          sound = newSound;
        } catch (error) {
          console.log('Error playing sound:', error);
        }
      }

      playSound();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [])
  );

  const onViewTickets = () => navigation.navigate('MainTabs', { screen: 'Account' });
  const onGoHome = () => navigation.navigate('MainTabs');

  return {
    reservation,
    onViewTickets,
    onGoHome,
  };
};
