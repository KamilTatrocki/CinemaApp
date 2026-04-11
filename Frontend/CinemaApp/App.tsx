import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import MovieDetailScreen from './src/views/screens/MovieDetailScreen';
import ScreeningsScreen from './src/views/screens/ScreeningsScreen';
import SeatSelectionScreen from './src/views/screens/SeatSelectionScreen';
import TicketSelectionScreen from './src/views/screens/TicketSelectionScreen';
import BookingReviewScreen from './src/views/screens/BookingReviewScreen';
import PaymentScreen from './src/views/screens/PaymentScreen';
import PaymentConfirmationScreen from './src/views/screens/PaymentConfirmationScreen';

import { AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaperProvider>
            <NavigationIndependentTree>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="MainTabs" component={TabNavigator} />
                  <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
                  <Stack.Screen name="Screenings" component={ScreeningsScreen} />
                  <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
                  <Stack.Screen name="TicketSelection" component={TicketSelectionScreen} />
                  <Stack.Screen name="BookingReview" component={BookingReviewScreen} />
                  <Stack.Screen name="Payment" component={PaymentScreen} />
                  <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </NavigationIndependentTree>
          </PaperProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
