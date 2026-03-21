import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import { useUserViewModel } from '../../viewmodels/useUserViewModel';

const AccountScreen = () => {
  const { user, isLoading, isError, error } = useUserViewModel();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text variant="headlineSmall" style={{ color: 'red' }}>Error loading account</Text>
        <Text>{(error as any)?.message || 'Something went wrong'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: user?.avatarUrl }} />
        <Title style={styles.name}>{user?.name}</Title>
        <Paragraph>{user?.email}</Paragraph>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Settings</Title>
            <Paragraph>Manage your profile and preferences.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained-tonal" style={styles.button}>Edit Profile</Button>
          </Card.Actions>
        </Card>

        <Button 
          mode="contained" 
          onPress={() => console.log('Log out')} 
          style={styles.logoutButton}
          buttonColor="#B00020"
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 50,
    backgroundColor: 'white',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  button: {
    width: '100%',
  },
  logoutButton: {
    marginTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
