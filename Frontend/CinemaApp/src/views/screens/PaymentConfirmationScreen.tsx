import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePaymentConfirmationViewModel } from '../../viewmodels/usePaymentConfirmationViewModel';

const PaymentConfirmationScreen = () => {
  const { reservation, onViewTickets, onGoHome } = usePaymentConfirmationViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="check-decagram" size={100} color="#00D1B2" />
        </View>

        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.message}>
          Your tickets for <Text style={{ fontWeight: 'bold' }}>{reservation.movieTitle}</Text> have been successfully booked.
        </Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailText}>Reservation ID: {reservation.id}</Text>
          <Text style={styles.detailText}>Status: {reservation.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={onViewTickets}
        >
          <Text style={styles.doneButtonText}>VIEW TICKETS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={onGoHome}
        >
          <Text style={styles.homeButtonText}>GO TO HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 30,
    backgroundColor: 'rgba(0, 209, 178, 0.1)',
    borderRadius: 80,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  detailsBox: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    fontFamily: 'monospace'
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  doneButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 16,
  },
  doneButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
  homeButton: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  homeButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentConfirmationScreen;
