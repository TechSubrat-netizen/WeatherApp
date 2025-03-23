import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Page2({ name, setName, city, setCity, onPrevious, navigation, qrData }) {
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    if (city && city.trim() !== '') {
      setLoadingWeather(true);
      setWeatherError('');
      const apiKey = "3eb1dca52d3838ef8fdac702ead19922";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || 'Error fetching weather data');
            });
          }
          return response.json();
        })
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Weather API Error:", error.message);
          setWeatherError(error.message);
        })
        .finally(() => {
          setLoadingWeather(false);
        });
    }
  }, [city]);

  const handleSubmit = async () => {
    const details = { qrData, name, city };
    try {
      await AsyncStorage.setItem('userDetails', JSON.stringify(details));
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to save details. Please try again.');
      console.error('Error saving details:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* City Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter City Name"
        value={city}
        onChangeText={setCity}
      />

      {/* Name Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Weather Data Display */}
      {loadingWeather && <ActivityIndicator size="small" color="#0000ff" />}
      {weatherError !== '' && <Text style={styles.errorText}>{weatherError}</Text>}
      {weather && (
        <View style={styles.weatherPreview}>
          <Text>Weather in {weather.name}:</Text>
          <Text>Temp: {weather.main.temp} °C</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Button title="Previous" onPress={onPrevious} />
        <Button title="Submit" onPress={handleSubmit} disabled={!name || city.trim() === ''} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 20, 
    borderColor: 'gray', 
    borderRadius: 8, 
    backgroundColor: '#ffffff',
  },
  weatherPreview: { 
    marginVertical: 10, 
    padding: 10, 
    backgroundColor: '#e3f2fd', 
    borderRadius: 8 
  },
  errorText: { color: 'red', marginVertical: 10 },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 20 
  },
});
