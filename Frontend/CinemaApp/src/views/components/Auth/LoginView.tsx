import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';

interface LoginViewProps {
  onLogin: (email: string, pass: string) => void;
  onSwitchToRegister: () => void;
  isLoading: boolean;
  error: string | null;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin, onSwitchToRegister, isLoading, error }) => {
  const [email, setEmail] = useState('test@op.pl');
  const [password, setPassword] = useState('123456');

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={() => onLogin(email, password)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Login
      </Button>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={onSwitchToRegister}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginView;
