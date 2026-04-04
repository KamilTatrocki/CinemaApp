import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchSeats } from '../../api/bookingApi';

const SeatSelectionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const screeningId = (route.params as any)?.screeningId;

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const { data: seats, isLoading, isError } = useQuery({
    queryKey: ['seats', screeningId],
    queryFn: () => fetchSeats(screeningId),
    enabled: !!screeningId,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  if (isError || !seats) {
    return (
        <View style={styles.center}>
          <Text>Error loading seats.</Text>
        </View>
    );
  }

  const toggleSeat = (seatId: number) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const proceedToTickets = () => {
    navigation.navigate('TicketSelection', { screeningId, selectedSeats });
  };

  // Group seats by row
  const rows = seats.reduce((acc, seat) => {
    if (!acc[seat.rowLabel]) {
      acc[seat.rowLabel] = [];
    }
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {} as Record<string, typeof seats>);

  // Sort rows Alphabetically A-Z and seats numerically
  const sortedRowKeys = Object.keys(rows).sort();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Seats</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.screenIndicator}>
          <View style={styles.screenBar} />
          <Text style={styles.screenText}>SCREEN</Text>
        </View>

        <View style={styles.seatingArea}>
          {sortedRowKeys.map(rowLabel => {
            const rowSeats = rows[rowLabel].sort((a, b) => a.seatNumber - b.seatNumber);
            return (
              <View key={rowLabel} style={styles.row}>
                <Text style={styles.rowLabel}>{rowLabel}</Text>
                <View style={styles.seatsContainer}>
                  {rowSeats.map(seat => {
                    const isSelected = selectedSeats.includes(seat.id);
                    return (
                      <TouchableOpacity
                        key={seat.id}
                        disabled={seat.occupied}
                        onPress={() => toggleSeat(seat.id)}
                        style={[
                          styles.seat,
                          seat.occupied && styles.seatOccupied,
                          isSelected && styles.seatSelected,
                          seat.type === 'VIP' && !seat.occupied && !isSelected && styles.seatVIP
                        ]}
                      />
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        
        <View style={styles.legend}>
            <View style={styles.legendItem}><View style={[styles.seatLegend, styles.seatAvailable]}/><Text>Available</Text></View>
            <View style={styles.legendItem}><View style={[styles.seatLegend, styles.seatSelected]}/><Text>Selected</Text></View>
            <View style={styles.legendItem}><View style={[styles.seatLegend, styles.seatOccupied]}/><Text>Occupied</Text></View>
            <View style={styles.legendItem}><View style={[styles.seatLegend, styles.seatVIP]}/><Text>VIP</Text></View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.selectedCountText}>{selectedSeats.length} seats selected</Text>
        </View>
        <TouchableOpacity 
          style={[styles.nextButton, selectedSeats.length === 0 && styles.disabledButton]} 
          disabled={selectedSeats.length === 0}
          onPress={proceedToTickets}
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
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
    backgroundColor: '#1C1C27',
  },
  container: {
    flex: 1,
    backgroundColor: '#1C1C27',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A38',
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
  screenIndicator: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  screenBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#555',
    borderRadius: 3,
    shadowColor: '#4DEEEA',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  screenText: {
    color: '#888',
    marginTop: 12,
    fontSize: 12,
    letterSpacing: 4,
  },
  seatingArea: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rowLabel: {
    color: '#888',
    width: 24,
    fontSize: 14,
    fontWeight: 'bold',
  },
  seatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  seat: {
    width: 28,
    height: 28,
    backgroundColor: '#444',
    marginHorizontal: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  seatOccupied: {
    backgroundColor: '#222',
  },
  seatSelected: {
    backgroundColor: '#4DEEEA',
  },
  seatVIP: {
    backgroundColor: '#FFBE0B',
  },
  legend: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 40,
      flexWrap: 'wrap'
  },
  legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
  },
  seatLegend: {
      width: 16,
      height: 16,
      borderRadius: 4,
      marginRight: 8,
  },
  seatAvailable: {
      backgroundColor: '#444',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#2A2A38',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  footerInfo: {
    flex: 1,
  },
  selectedCountText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4DEEEA',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  disabledButton: {
    backgroundColor: '#555',
  },
  nextButtonText: {
    color: '#000',
    fontWeight: '900',
    fontSize: 16,
  },
});

export default SeatSelectionScreen;
