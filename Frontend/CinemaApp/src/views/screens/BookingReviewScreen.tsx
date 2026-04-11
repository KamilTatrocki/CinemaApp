import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBookingReviewViewModel } from '../../viewmodels/useBookingReviewViewModel';

const BookingReviewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { screeningId, tickets } = route.params as { screeningId: number, tickets: any[] };
  
  const { isSubmitting, handleBooking } = useBookingReviewViewModel();

  const onBookPress = () => {
    handleBooking(
      screeningId,
      tickets,
      (reservation) => navigation.navigate('Payment', { reservation }),
      (errorMsg) => Alert.alert('Booking Error', errorMsg)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Booking</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Tickets Count:</Text>
             <Text style={styles.summaryValue}>{tickets.length}</Text>
          </View>
          <View style={styles.summaryRow}>
             <Text style={styles.summaryLabel}>Status:</Text>
             <Text style={styles.summaryValuePending}>Ready to Reserve</Text>
          </View>
          
          <View style={styles.divider} />
          <Text style={styles.infoText}>
            By creating a reservation, your seats will be locked. To finalize the purchase, proceed to payment on the next screen.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.bookButton} 
          onPress={onBookPress}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
             <ActivityIndicator color="#000" />
          ) : (
             <Text style={styles.bookButtonText}>CREATE RESERVATION</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDF8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#1C1C27',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  summaryValuePending: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: '#1C1C27',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bookButton: {
    backgroundColor: '#4DEEEA',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },
  bookButtonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default BookingReviewScreen;
