import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, ActivityIndicator, Card, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Movie } from '../../models/Movie';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2; // Subtracting padding

interface MovieCardProps {
  item: Movie;
}

const MovieCard = ({ item }: MovieCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.2:8080';
  let finalImageUrl = item.mediaUrl ? `${baseUrl}${item.mediaUrl}` : item.imageUrl;

  if (item.mediaUrl && item.mediaUrl.startsWith('http')) {
    finalImageUrl = item.mediaUrl;
  }

  const navigation = useNavigation<any>();

  return (
    <Card style={styles.card} mode="contained" onPress={() => navigation.navigate('MovieDetail', { movie: item })}>
      <Surface style={styles.imagePlaceholder} elevation={1}>
        {finalImageUrl && !imageError ? (
          <>
            {isLoading && (
              <View style={[StyleSheet.absoluteFill, styles.center]}>
                <ActivityIndicator color="#AAA" />
              </View>
            )}
            <Image
              source={{ uri: finalImageUrl }}
              style={styles.image}
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
              onLoadEnd={() => setIsLoading(false)}
            />
          </>
        ) : (
          <View style={styles.noImageContainer}>
            <MaterialCommunityIcons name="movie-open-outline" size={48} color="#CCC" />
            <Text variant="labelSmall" style={{ color: '#AAA', marginTop: 8, textAlign: 'center' }}>
              No Photo{"\n"}({item.status})
            </Text>
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
};

const styles = StyleSheet.create({
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
});

export default MovieCard;
