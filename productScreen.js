import {View, Text, ScrollView, Button} from 'react-native';
import React, {useEffect, useState, FlatList, TouchableOpacity} from 'react';
import axios from 'axios';

export default function ProductScreen({route, navigation}) {
  const [dataProduct, setDataProduct] = useState([]);
  const {token, email} = route.params;

  const productData = async () => {
    try {
      const response = await axios.get('http://192.168.1.15:4000/products', {
        headers: {
          token: token,
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
      alert(error);
    }
  };

  useEffect(() => {
    productData();
  }, []);

  const Item = ({name, details, id, stock}) => (
    <View>
      <Text>{name}</Text>
      <Text>{details.price}</Text>
      <Text>{details.description}</Text>
      <Text>{stock}</Text>
    </View>
  );

  const dataPr =
    dataProduct.length > 0
      ? dataProduct.map(d => {
          return (
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 5,
                margin: 10,
                padding: 20,
              }}
              key={d.id}>
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
                {d.description}
              </Text>
              <Text style={{lineHeight: 20, marginBottom: 10}}>
                {d.stock} products in stock
              </Text>
              <Text style={{lineHeight: 20, fontSize: 20}}>
                {d.price.split('.')[0]}$
              </Text>
              <Button
                title="GO"
                onPress={() =>
                  navigation.navigate('Details', {
                    name: d.name,
                    id: d.id,
                    description: d.description,
                    stock: d.stock,
                    price: d.price,
                  })
                }></Button>
            </View>
          );
        })
      : [];

  if (dataProduct.length > 0) {
    return (
      <View>
        {/* <Text>{token}</Text> */}
        <ScrollView>{dataPr}</ScrollView>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <Text>Chargement...</Text>
      </View>
    );
  }
}
