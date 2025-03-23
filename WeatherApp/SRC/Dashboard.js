import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({ navigation }) {
  const [userDetails, setUserDetails] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  // Fetch stored details from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('userDetails')
      .then((data) => {
        if (data) {
          const details = JSON.parse(data);
          setUserDetails(details);
          // If there is a city stored, fetch the weather
          if (details.city && details.city !== 'Select City') {
            fetchWeather(details.city);
          }
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchWeather = (city) => {
    setLoadingWeather(true);
    setWeatherError('');
    const apiKey = '3eb1dca52d3838ef8fdac702ead19922';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching weather data');
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        setWeatherError(err.message);
      })
      .finally(() => {
        setLoadingWeather(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather</Text>

      {/* Weather Section */}
      <View style={styles.weatherSection}>
        <Text style={styles.sectionHeader}>Weather Info</Text>
        {loadingWeather ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : weather ? (
          <View>
            <Text>City: {weather.name}</Text>
            <Text>Temperature: {weather.main.temp} °C</Text>
            <Text>Condition: {weather.weather[0].description}</Text>
          </View>
        ) : weatherError ? (
          <Text style={{ color: 'red' }}>{weatherError}</Text>
        ) : (
          <Text>No weather info available.</Text>
        )}
      </View>

      {/* Section for navigating to Add/See Details */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionHeader}>Details</Text>
        <Button title="Add Details" onPress={() => navigation.navigate('AddDetails')} />
        <View style={{ marginVertical: 10 }} />
        <Button title="See Details" onPress={() => navigation.navigate('SeeDetails')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  weatherSection: { marginBottom: 30 },
  sectionHeader: { fontSize: 18, marginBottom: 10 },
  detailsSection: {},
});
