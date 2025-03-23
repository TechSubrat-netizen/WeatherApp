import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SeeDetails({ navigation }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userDetails')
      .then((data) => {
        if (data) {
          setDetails(JSON.parse(data));
        }
      })
      .catch((error) => console.error('Error reading details:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}></Text>
      {details ? (
        <View style={styles.detailsContainer}>
          <Text>QR Code Data: {details.qrData}</Text>
          <Text>City: {details.city}</Text>
          <Text>Name: {details.name}</Text>
        </View>
      ) : (
        <Text>No data found.</Text>
      )}
      <Button title="Go Back" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  detailsContainer: { marginBottom: 20 },
});
