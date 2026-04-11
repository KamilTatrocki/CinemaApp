import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ticket } from '../../models/Ticket';

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (contentHeight === 0) return;
    const isExpanding = !expanded;
    setExpanded(isExpanding);

    Animated.spring(animation, {
      toValue: isExpanding ? 1 : 0,
      friction: 8,
      tension: 50,
      useNativeDriver: false,
    }).start();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL') + ' ' + date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const animatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
    extrapolate: 'clamp',
  });

  const animatedOpacity = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0.1, 1],
    extrapolate: 'clamp',
  });

  const renderTicketBottom = () => (
    <View style={styles.ticketBottom}>
      <View style={styles.dottedDivider}>
        <View style={styles.holeLeft} />
        <View style={styles.dashedLine} />
        <View style={styles.holeRight} />
      </View>
      
      <View style={styles.detailsContent}>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>ROW</Text>
            <Text style={styles.detailValue}>{ticket.rowLabel}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>SEAT</Text>
            <Text style={styles.detailValue}>{ticket.seatNumber}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>TYPE</Text>
            <Text style={styles.detailValue}>{ticket.ticketTypeName}</Text>
          </View>
        </View>
        
        <View style={styles.qrSection}>
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.qrCodeToken}` }}
              style={styles.qrCodeLarge}
            />
          </View>
          <Text style={styles.statusText}>Status: {ticket.reservationStatus}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={toggleExpand}
      style={styles.ticketWrapper}
    >
      <View style={styles.ticketTop}>
        <View style={styles.ticketHeader}>
          <Text style={styles.movieTitle}>{ticket.movieTitle}</Text>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#888" />
          </Animated.View>
        </View>
        <Text style={styles.cinemaNameText}>{ticket.cinemaName}</Text>
        <Text style={styles.timeText}>{formatDate(ticket.screeningTime)}</Text>
      </View>

      {contentHeight === 0 && (
        <View 
          style={styles.hiddenMeasuringView}
          onLayout={(e) => {
            setContentHeight(e.nativeEvent.layout.height);
          }}
        >
          {renderTicketBottom()}
        </View>
      )}

      <Animated.View style={{ height: animatedHeight, opacity: animatedOpacity, overflow: 'hidden' }}>
        {renderTicketBottom()}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ticketWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  ticketTop: {
    padding: 24,
    backgroundColor: '#0000FF',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  movieTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
    marginRight: 12,
  },
  cinemaNameText: {
    fontSize: 14,
    color: '#E0E0FF',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#4DEEEA',
    fontWeight: 'bold',
  },
  ticketBottom: {
    backgroundColor: '#FFF',
  },
  dottedDivider: {
    height: 30,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  holeLeft: {
    position: 'absolute',
    left: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8EDF8',
    zIndex: 1,
  },
  holeRight: {
    position: 'absolute',
    right: -15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E8EDF8',
    zIndex: 1,
  },
  dashedLine: {
    height: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
    marginHorizontal: 20,
  },
  detailsContent: {
    padding: 24,
    paddingTop: 0,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },
  qrSection: {
    alignItems: 'center',
  },
  qrContainer: {
    padding: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  qrCodeLarge: {
    width: 150,
    height: 150,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0000FF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  hiddenMeasuringView: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    zIndex: -1,
  },
});

export default TicketItem;
