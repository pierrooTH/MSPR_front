import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function ProductDetails({route, navigation}) {
  const {name, id, price, description, stock} = route.params;
  return (
    <View style={{flex: 1, padding: 20}}>
      <Image style={styles.img}
        source={require('../assets/coffee-machine-image.png')} />
      <Text
        style={{
          lineHeight: 20,
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 10,
        }}>
        {name}
      </Text>

      <View style={{marginTop: 15, marginBottom: 15}}>
        <Text style={{fontWeight: 'bold'}}>Product description :</Text>
        <Text style={{lineHeight: 20, marginBottom: 10}}>{description}</Text>
      </View>

      <View>
        <Text style={{lineHeight: 20, marginBottom: 10}}>
          {stock} products in stock
        </Text>
        <Text style={{lineHeight: 20, fontSize: 20}}>{price.split('.')[0]}$</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('AR')} style={styles.appButtonContainer}>
       <Text style={styles.appButtonText}>Product AR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 300,
    marginBottom: 15
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#E8801E",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 30
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
