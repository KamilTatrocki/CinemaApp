import React from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Text, ActivityIndicator, Card, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMoviesViewModel } from '../../viewmodels/useMoviesViewModel';

import { Movie } from '../../models/Movie';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2; // Subtracting padding

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

  const renderItem = ({ item }: { item: Movie }) => (
    <Card style={styles.card} mode="contained">
      <Surface style={styles.imagePlaceholder} elevation={1}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.noImageContainer}>
            <MaterialCommunityIcons name="movie-open-outline" size={48} color="#CCC" />
            <Text variant="labelSmall" style={{ color: '#AAA', marginTop: 8 }}>{item.status}</Text>
          </View>
        )}
      </Surface>
      <Text variant="titleMedium" style={styles.movieTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text variant="labelSmall" style={styles.movieMeta}>
        {item.releaseYear} • {item.durationMinutes} min
      </Text>
    </Card>
  );

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
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 1.5,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontWeight: '600',
    color: '#000',
    lineHeight: 20,
  },
  movieMeta: {
    color: '#666',
    marginTop: 4,
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
