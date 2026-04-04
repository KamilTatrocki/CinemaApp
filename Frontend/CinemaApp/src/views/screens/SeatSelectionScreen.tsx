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
  screenIndicator: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  screenBar: {
    width: '80%',
    height: 6,
    backgroundColor: '#CCC',
    borderRadius: 3,
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  screenText: {
    color: '#666',
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
    color: '#555',
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
    backgroundColor: '#DDD',
    marginHorizontal: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  seatOccupied: {
    backgroundColor: '#999',
  },
  seatSelected: {
    backgroundColor: '#0000FF',
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
      backgroundColor: '#DDD',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  footerInfo: {
    flex: 1,
  },
  selectedCountText: {
    color: '#111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  disabledButton: {
    backgroundColor: '#AAA',
  },
  nextButtonText: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
  },
});

export default SeatSelectionScreen;
