import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Title, HelperText } from 'react-native-paper';
import { ValidationErrors } from '../../../viewmodels/useAuthViewModel';

interface RegisterViewProps {
  onRegister: (fullName: string, email: string, pass: string) => void;
  onSwitchToLogin: () => void;
  isLoading: boolean;
  error: string | null;
  validationErrors?: ValidationErrors;
}

const RegisterView: React.FC<RegisterViewProps> = ({
  onRegister,
  onSwitchToLogin,
  isLoading,
  error,
  validationErrors = {},
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create an account to manage your tickets.</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        label="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        mode="outlined"
        autoCapitalize="words"
        error={!!validationErrors.fullName}
      />
      {validationErrors.fullName && (
        <HelperText type="error" visible style={styles.helperText}>
          {validationErrors.fullName}
        </HelperText>
      )}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        error={!!validationErrors.email}
      />
      {validationErrors.email && (
        <HelperText type="error" visible style={styles.helperText}>
          {validationErrors.email}
        </HelperText>
      )}
      
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        error={!!validationErrors.password}
      />
      {validationErrors.password && (
        <HelperText type="error" visible style={styles.helperText}>
          {validationErrors.password}
        </HelperText>
      )}

      <Button
        mode="contained"
        onPress={() => onRegister(fullName, email, password)}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Create Account
      </Button>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text style={styles.linkText}>Login</Text>
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
    marginBottom: 4,
    backgroundColor: 'white',
  },
  helperText: {
    marginBottom: 8,
    paddingHorizontal: 0,
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

export default RegisterView;

