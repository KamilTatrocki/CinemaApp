import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserViewModel } from '../../viewmodels/useUserViewModel';
import { useAuthViewModel } from '../../viewmodels/useAuthViewModel';
import { Ticket } from '../../models/Ticket';
import LoginView from '../components/Auth/LoginView';
import RegisterView from '../components/Auth/RegisterView';

const TicketItem = ({ ticket }: { ticket: Ticket }) => {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL') + ' ' + date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => setExpanded(!expanded)}
      style={styles.ticketWrapper}
    >
      <View style={styles.ticketTop}>
        <View style={styles.ticketHeader}>
          <Text style={styles.movieTitle}>{ticket.movieTitle}</Text>
          <MaterialCommunityIcons name={expanded ? "chevron-up" : "chevron-down"} size={24} color="#888" />
        </View>
        <Text style={styles.cinemaNameText}>{ticket.cinemaName}</Text>
        <Text style={styles.timeText}>{formatDate(ticket.screeningTime)}</Text>
      </View>

      {expanded && (
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
      )}
    </TouchableOpacity>
  );
};

const AccountScreen = () => {
  const { tickets, isLoading: isTicketsLoading } = useUserViewModel();
  const {
    isAuthenticated,
    user,
    handleLogin,
    handleRegister,
    logout,
    isLoading: isAuthLoading,
    error: authError
  } = useAuthViewModel();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.authContainer}>
        {authMode === 'login' ? (
          <LoginView
            onLogin={(email, pass) => handleLogin({ email, password: pass })}
            onSwitchToRegister={() => setAuthMode('register')}
            isLoading={isAuthLoading}
            error={authError}
          />
        ) : (
          <RegisterView
            onRegister={(name, email, pass) => handleRegister({ fullName: name, email, password: pass })}
            onSwitchToLogin={() => setAuthMode('login')}
            isLoading={isAuthLoading}
            error={authError}
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.userInfo}>
          <Text variant="displaySmall" style={styles.title}>
            Your tickets
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <Button
          mode="contained"
          onPress={logout}
          style={styles.logoutButton}
          buttonColor="#B00020"
          textColor="white"
        >
          Logout
        </Button>
      </View>

      {isTicketsLoading ? (
        <View style={styles.center}>
          <ActivityIndicator animating={true} size="large" color="#0000FF" />
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={({ item }) => <TicketItem ticket={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No tickets found</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EDF8',
    paddingHorizontal: 20,
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 5,
  },
  userEmail: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  logoutButton: {
    borderRadius: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default AccountScreen;
