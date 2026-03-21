import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ActivityIndicator, Button, Avatar } from 'react-native-paper';
import { useUserViewModel } from '../../viewmodels/useUserViewModel';
import { useAuthViewModel } from '../../viewmodels/useAuthViewModel';
import { Ticket } from '../../models/Ticket';
import LoginView from '../components/Auth/LoginView';
import RegisterView from '../components/Auth/RegisterView';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL') + ' ' + date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

  const renderTicket = ({ item }: { item: Ticket }) => (
    <View style={styles.ticketCard}>
      <View style={styles.ticketInfo}>
        <Text variant="headlineSmall" style={styles.cinemaName}>
          {item.cinemaName}
        </Text>
        <Text variant="bodyMedium" style={styles.screeningTime}>
          {formatDate(item.screeningTime)}
        </Text>
      </View>
      <View style={styles.qrContainer}>
        <Image
          source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${item.qrCodeToken}` }}
          style={styles.qrCode}
        />
      </View>
    </View>
  );

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
          <ActivityIndicator animating={true} size="large" color="#6200ee" />
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
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
    backgroundColor: '#FFFFFF',
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
    paddingBottom: 20,
  },
  ticketCard: {
    backgroundColor: '#9DB4FF',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  ticketInfo: {
    flex: 1,
  },
  cinemaName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 28,
  },
  screeningTime: {
    color: '#333',
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  qrContainer: {
    backgroundColor: '#FFF',
    padding: 4,
    borderRadius: 4,
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF1F9',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default AccountScreen;
