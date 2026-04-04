import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { payBooking } from '../../api/bookingApi';
import { useAuth } from '../../context/AuthContext';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { reservation } = route.params as any;
  const { token } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!token) return;
    setIsProcessing(true);
    try {
      const confirmedReservation = await payBooking(reservation.id, token);
      navigation.reset({
        index: 0,
        routes: [
          { name: 'MainTabs' as never },
          { name: 'PaymentConfirmation' as never, params: { reservation: confirmedReservation } as never }
        ],
      });
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formattedPrice = reservation.totalPrice ? `$${reservation.totalPrice.toFixed(2)}` : '$0.00';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.costContainer}>
          <Text style={styles.totalLabel}>Total to Pay</Text>
          <Text style={styles.totalAmount}>{formattedPrice}</Text>
        </View>

        <View style={styles.reservationDetail}>
          <View style={styles.detailRow}>
              <MaterialCommunityIcons name="movie-roll" size={20} color="#555" />
              <Text style={styles.detailText}>{reservation.movieTitle}</Text>
          </View>
          <View style={styles.detailRow}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color="#555" />
              <Text style={styles.detailText}>{new Date(reservation.screeningTime).toLocaleString()}</Text>
          </View>
          <View style={styles.detailRow}>
              <MaterialCommunityIcons name="ticket-confirmation" size={20} color="#555" />
              <Text style={styles.detailText}>Reservation ID: #{reservation.id}</Text>
          </View>
        </View>

        <View style={styles.paymentMethod}>
          <Text style={styles.paymentMethodTitle}>Payment Method</Text>
          <View style={styles.cardInfo}>
            <MaterialCommunityIcons name="credit-card-outline" size={32} color="#000" />
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton} 
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
             <ActivityIndicator color="#FFF" />
          ) : (
             <Text style={styles.payButtonText}>PAY</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  costContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  totalLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  reservationDetail: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  paymentMethod: {
    marginTop: 10,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardNumber: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
  payButton: {
    backgroundColor: '#00D1B2',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#00D1B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  payButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: 2,
  },
});

export default PaymentScreen;
