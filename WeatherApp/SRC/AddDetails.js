import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Page1 from './Page1'
import Page2 from './Page2';

export default function AddDetails({ navigation }) {
  // Shared state for the multi-step form
  const [step, setStep] = useState(1);
  const [qrData, setQrData] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('Select City');

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <Page1 qrData={qrData} setQrData={setQrData} onNext={() => setStep(2)} />
      ) : (
        <Page2
          name={name}
          setName={setName}
          city={city}
          setCity={setCity}
          onPrevious={() => setStep(1)}
          navigation={navigation}
          qrData={qrData}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
