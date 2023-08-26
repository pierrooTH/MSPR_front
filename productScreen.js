import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function ProductScreen({route, navigation}) {
  const [dataProduct, setDataProduct] = useState([]);

  const productData = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      try {
        const response = await axios.get('http://192.168.1.15:4000/products', {
          headers: {
            token: value,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        });
        if (response.status === 200) {
          //alert(response)
          setDataProduct(response.data);
        } else {
          setDataProduct([]);
        }
      } catch (error) {
        Alert.alert(error);
      }
    } else {
      navigation.replace('Home')
    }
    
  };

  useEffect(() => {
    productData();
  }, []);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Home');
    } catch (e) {
      Alert.alert(e);
    }
  };
  console.log(dataProduct);
  const dataPr =
    dataProduct.length > 0
      ? dataProduct.map(d => {
          return (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                margin: 10,
                padding: 20,
              }}
              testID={`product-name-${d.product_detail.id}`}
              key={d.product_detail.id}>
              <Text
                style={{
                  lineHeight: 20,
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginBottom: 10,
                }}>
                {d.name}
              </Text>
              <Text style={{lineHeight: 20, marginBottom: 10}}>
                {d.product_detail.description}
              </Text>
              <Text style={{lineHeight: 20, marginBottom: 10}}>
                {d.stock} products in stock
              </Text>
              <Text style={{lineHeight: 20, fontSize: 20}}>
                {d.product_detail.price}$
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Details', {
                    name: d.name,
                    id: d.product_detail.id,
                    description: d.product_detail.description,
                    stock: d.stock,
                    price: d.product_detail.price,
                  })
                }
                style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>GO</Text>
              </TouchableOpacity>
            </View>
          );
        })
      : [];

  if (dataProduct.length > 0) {
    return (
      <View>
        <ScrollView>
          {dataPr}
          <View>
            <TouchableOpacity
              style={{
                marginBottom: 30,
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#5C4F2D',
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                width: '95%',
              }}
              onPress={() => removeValue()}>
              <Text style={styles.appButtonText}>Deconnexion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}} testID="product-screen">
        <Text>Chargement...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#E8801E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30,
  },

  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
