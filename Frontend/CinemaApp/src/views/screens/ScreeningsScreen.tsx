import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Text, List } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useScreeningsViewModel } from '../../viewmodels/useScreeningsViewModel';

const ScreeningsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const movieId = (route.params as any)?.movieId;
  
  const {
    isLoading,
    isError,
    screenings,
    dates,
    activeDate,
    activeScreeningsByCinema,
    setSelectedDate
  } = useScreeningsViewModel(movieId);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  if (isError || !screenings) {
    return (
      <View style={styles.center}>
        <Text>Error loading screenings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Screening</Text>
      </View>

      {dates.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noScreeningText}>No screenings available for this movie.</Text>
        </View>
      ) : (
        <>
          <View style={styles.datesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dates.map((date) => (
                <TouchableOpacity
                  key={date}
                  style={[styles.dateButton, activeDate === date && styles.dateButtonActive]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateText, activeDate === date && styles.dateTextActive]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView style={styles.screeningsList}>
            {Object.entries(activeScreeningsByCinema).map(([cinemaName, screenings]) => (
              <List.Accordion
                key={cinemaName}
                title={cinemaName}
                titleStyle={styles.accordionTitle}
                left={props => <List.Icon {...props} icon="domain" />}
                style={styles.accordion}
              >
                <View style={styles.screeningsGrid}>
                  {screenings.map((screening) => {
                    const time = new Date(screening.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <TouchableOpacity
                        key={screening.id}
                        style={styles.timeBadge}
                        onPress={() => navigation.navigate('SeatSelection', { screeningId: screening.id })}
                      >
                        <Text style={styles.timeBadgeText}>{time}</Text>
                        <Text style={styles.hallBadgeText}>{screening.hallName}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </List.Accordion>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8EDF8',
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EDF8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  datesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  dateButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  dateButtonActive: {
    backgroundColor: '#0000FF',
  },
  dateText: {
    fontWeight: '600',
    color: '#333',
  },
  dateTextActive: {
    color: '#FFF',
  },
  screeningsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noScreeningText: {
    fontSize: 16,
    color: '#555',
  },
  accordion: {
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderRadius: 8,
  },
  accordionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  screeningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  timeBadge: {
    backgroundColor: '#0000FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 6,
    alignItems: 'center',
    minWidth: 80,
  },
  timeBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hallBadgeText: {
    color: '#E0E0FF',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ScreeningsScreen;
