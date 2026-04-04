import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { useUserViewModel } from '../../viewmodels/useUserViewModel';
import { useAuthViewModel } from '../../viewmodels/useAuthViewModel';
import { Ticket } from '../../models/Ticket';
import LoginView from '../components/Auth/LoginView';
import RegisterView from '../components/Auth/RegisterView';
import TicketItem from '../components/TicketItem';

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
