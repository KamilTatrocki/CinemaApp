import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchTicketTypes } from '../../api/bookingApi';
import { TicketTypeResponse } from '../../models/BookingModels';

const TicketSelectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { screeningId, selectedSeats } = route.params as any;

  const { data: ticketTypes, isLoading, isError } = useQuery({
    queryKey: ['ticketTypes'],
    queryFn: fetchTicketTypes,
  });

  const [ticketAssignments, setTicketAssignments] = useState<Record<number, number>>({});

  useEffect(() => {
    // default all seats to the first ticket type
    if (ticketTypes && ticketTypes.length > 0 && selectedSeats.length > 0) {
      if (Object.keys(ticketAssignments).length === 0) {
        const initialAssignments: Record<number, number> = {};
        selectedSeats.forEach((seatId: number) => {
          initialAssignments[seatId] = ticketTypes[0].id;
        });
        setTicketAssignments(initialAssignments);
      }
    }
  }, [ticketTypes, selectedSeats]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  if (isError || !ticketTypes) {
    return (
      <View style={styles.center}>
        <Text>Error loading ticket types.</Text>
      </View>
    );
  }

  const setTicketTypeForSeat = (seatId: number, typeId: number) => {
    setTicketAssignments(prev => ({ ...prev, [seatId]: typeId }));
  };

  const proceedToReview = () => {
    const tickets = selectedSeats.map((seatId: number) => ({
      seatId,
      ticketTypeId: ticketAssignments[seatId]
    }));
    
    navigation.navigate('BookingReview', { 
      screeningId, 
      tickets 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Ticket Types</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Assign a ticket type for each selected seat.</Text>

        {selectedSeats.map((seatId: number, index: number) => (
          <View key={seatId} style={styles.seatTicketContainer}>
            <Text style={styles.seatLabel}>Seat {index + 1} (ID: {seatId})</Text>
            
            <View style={styles.typesRow}>
              {ticketTypes.map(type => {
                const isActive = ticketAssignments[seatId] === type.id;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[styles.typeButton, isActive && styles.typeButtonActive]}
                    onPress={() => setTicketTypeForSeat(seatId, type.id)}
                  >
                    <Text style={[styles.typeButtonText, isActive && styles.typeButtonTextActive]}>
                      {type.name}
                    </Text>
                    {type.discountPercentage > 0 && (
                      <Text style={[styles.discountText, isActive && styles.discountTextActive]}>
                        -{type.discountPercentage}%
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={proceedToReview}>
          <Text style={styles.nextButtonText}>REVIEW BOOKING</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EDF8',
  },
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  seatTicketContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  seatLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  typesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#4DEEEA',
    borderColor: '#4DEEEA',
  },
  typeButtonText: {
    color: '#555',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#000',
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 10,
    color: '#FF6B6B',
    marginTop: 4,
    fontWeight: 'bold',
  },
  discountTextActive: {
    color: '#D90000',
  },
  footer: {
    padding: 24,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default TicketSelectionScreen;
