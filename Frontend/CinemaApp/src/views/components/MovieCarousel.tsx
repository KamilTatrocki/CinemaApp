import React, { useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Movie } from '../../models/Movie';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.65;
const SPACING = 10;
const FULL_ITEM_WIDTH = ITEM_WIDTH + SPACING * 2;

interface MovieCarouselProps {
  movies: Movie[] | null | undefined;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  if (!movies || movies.length === 0) {
    return (
      <View style={[styles.center, { height: ITEM_WIDTH * 1.5 }]}>
        <Text>No movies available.</Text>
      </View>
    );
  }

  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

  return (
    <View>
      <Animated.FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: (width - FULL_ITEM_WIDTH) / 2 }}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_ITEM_WIDTH,
            index * FULL_ITEM_WIDTH,
            (index + 1) * FULL_ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1, 0.85],
            extrapolate: 'clamp',
          });

          let finalImageUrl = item.mediaUrl ? `${baseUrl}${item.mediaUrl}` : item.imageUrl;
          if (item.mediaUrl && item.mediaUrl.startsWith('http')) {
            finalImageUrl = item.mediaUrl;
          }

          return (
            <View style={styles.movieItemContainer}>
              <Animated.View style={[styles.movieImageContainer, { transform: [{ scale }] }]}>
                {finalImageUrl ? (
                  <Image source={{ uri: finalImageUrl }} style={styles.movieImage} />
                ) : (
                  <View style={styles.noImageContainer}>
                    <Text style={{ color: '#aaa' }}>No Image</Text>
                  </View>
                )}
              </Animated.View>
            </View>
          );
        }}
      />
      <View style={styles.paginationContainer}>
        {movies.slice(0, 5).map((_, index) => {
          const dotPosition = Animated.divide(scrollX, FULL_ITEM_WIDTH);
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieItemContainer: {
    width: FULL_ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },
});

export default MovieCarousel;
