import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { useHomeViewModel } from '../../viewmodels/useHomeViewModel';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import MovieCarousel from '../components/MovieCarousel';

type TabParamList = {
  Home: undefined;
  Movies: undefined;
  Account: undefined;
};

const HomeScreen = () => {
  const { movies, promotions, isLoading, isError, error } = useHomeViewModel();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} size="large" color="#0000ff" />
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
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.header}>
        Cinema Name
      </Text>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.headerRight}>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Movies')}
            style={styles.viewMoreButton}
            labelStyle={styles.viewMoreButtonText}
            buttonColor="#0000FF"
          >
            View more movies
          </Button>
        </View>

        <MovieCarousel movies={movies} />

        <Text style={styles.promotionsTitle}>promotions</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.promotionsList}
        >
          {promotions && promotions.length > 0 ? (
            promotions.map(promo => (
              <View key={promo.id} style={styles.promotionCard}>
                <Image 
                  source={{ uri: 'https://img.icons8.com/color/96/popcorn.png' }} 
                  style={styles.promotionImage} 
                  resizeMode="contain"
                />
                <Text style={styles.promotionTitle} numberOfLines={1}>{promo.title}</Text>
              </View>
            ))
          ) : (
            <Text style={{ marginLeft: 16, color: '#666' }}>No promotions available.</Text>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    paddingBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerRight: {
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  viewMoreButton: {
    borderRadius: 8,
  },
  viewMoreButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  promotionsTitle: {
    fontSize: 18,
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  promotionsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  promotionCard: {
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  promotionImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  promotionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;

