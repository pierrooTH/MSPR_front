import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrCode({navigation, route}) {
  const {email} = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      Alert.alert(e);
    }
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    axios
      .post('http://192.168.1.14:4000/auth', {email: email, token: data})
      .then(res => {
        if (res.status === 201) {
          storeData(data);
          navigation.replace('Product', {token: data});
        }
      })
      .catch(e => Alert.alert(e.message));
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex: 1}} testID="qrcode-component">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
