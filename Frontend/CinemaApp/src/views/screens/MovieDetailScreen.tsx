import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMovieDetailViewModel } from '../../viewmodels/useMovieDetailViewModel';
import { TrailerVideo } from '../components/TrailerVideo';

const { width, height } = Dimensions.get('window');


const MovieDetailScreen = () => {
  const {
    displayMovie,
    imageUrl: finalImageUrl,
    mediaUrl: finalMediaUrl,
    onBookPress,
    onBackPress,
  } = useMovieDetailViewModel();

  if (!displayMovie) {
    return (
      <View style={styles.center}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: 100 }}>
   
        <View style={styles.bannerContainer}>
          {finalImageUrl ? (
            <Image source={finalImageUrl} style={styles.bannerImage} contentFit="cover" transition={200} cachePolicy="memory-disk" />
          ) : (
            <View style={[styles.bannerImage, { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' }]}>
              <MaterialCommunityIcons name="movie" size={64} color="#666" />
            </View>
          )}

    
          <View style={styles.bannerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{displayMovie.title}</Text>
              <Text style={styles.subtitleText}>{displayMovie.durationMinutes} min • Rating {displayMovie.rating}/10</Text>
            </View>
          </View>
        </View>

      
        <View style={styles.infoSection}>
          <Text style={styles.yearText}>{displayMovie.releaseYear}</Text>
        </View>

        
        <View style={styles.trailerSection}>
          {finalMediaUrl ? (
            <TrailerVideo url={finalMediaUrl} />
          ) : finalImageUrl ? (
            <Image source={finalImageUrl} style={styles.trailerImage} contentFit="cover" transition={200} cachePolicy="memory-disk" />
          ) : (
            <View style={[styles.trailerImage, { backgroundColor: '#444' }]} />
          )}
          {!finalMediaUrl && (
            <View style={styles.trailerOverlay}>
              <Text style={styles.trailerTitle}>OFFICIAL</Text>
              <Text style={styles.trailerSubtitle}>TRAILER</Text>
            </View>
          )}
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            {displayMovie.description || "No description available."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={onBookPress}
        >
          <Text style={styles.bookButtonText}>BOOK TICKETS NOW</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EDF8',
  },
  bannerContainer: {
    width: '100%',
    height: height * 0.45,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
  },
  backButton: {
    marginTop: 50,
    marginLeft: 16,
    backgroundColor: '#FFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitleText: {
    fontSize: 14,
    color: '#DDD',
    marginTop: 4,
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#E8EDF8',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  directorText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  trailerSection: {
    width: '100%',
    height: height * 0.25,
    position: 'relative',
  },
  trailerImage: {
    width: '100%',
    height: '100%',
  },
  trailerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  trailerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  trailerSubtitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 2,
  },
  descriptionSection: {
    padding: 16,
    backgroundColor: '#E8EDF8',
    paddingBottom: 40,
  },
  actorsText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  bookButton: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MovieDetailScreen;
