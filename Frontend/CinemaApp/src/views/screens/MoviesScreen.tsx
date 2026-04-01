import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMoviesViewModel } from '../../viewmodels/useMoviesViewModel';

import { Movie } from '../../models/Movie';
import MovieCard from '../components/MovieCard';



const MoviesScreen = () => {
  const { movies, isLoading, isError, error } = useMoviesViewModel();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating={true} color="#333" size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#FF5252" />
        <Text variant="headlineSmall" style={styles.errorText}>Error loading movies</Text>
        <Text variant="bodyMedium">{(error as any)?.message || 'Something went wrong'}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieCard item={item} />;

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.header}>
        Cinema Name
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: '#FF5252',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default MoviesScreen;
