import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, ActivityIndicator, Title, Paragraph } from 'react-native-paper';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';

const HomeScreen = () => {
  const { homeData, isLoading, isError, error } = useHomeViewModel();

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
        <Text variant="headlineSmall" style={{ color: 'red' }}>Error loading data</Text>
        <Text>{(error as any)?.message || 'Something went wrong'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Title style={styles.welcomeText}>{homeData?.title || 'Welcome'}</Title>
      <Paragraph style={styles.subtitle}>{homeData?.subtitle}</Paragraph>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Quick Stats</Title>
          <Paragraph>We have {homeData?.featuredMoviesCount || 0} movies featured today!</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
    paddingTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
    elevation: 4,
  },
});

export default HomeScreen;
