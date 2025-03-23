import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function Page1({ qrData, setQrData, onNext }) {
  // Called when a QR code is successfully scanned
  const onQRCodeRead = (e) => {
    setQrData(e.data);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner onRead={onQRCodeRead} />
      <TextInput
        style={styles.input}
        placeholder="QR Code Data"
        value={qrData}
        onChangeText={setQrData}
      />
      <Button title="Next" onPress={onNext} disabled={qrData === ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 20 },
});
