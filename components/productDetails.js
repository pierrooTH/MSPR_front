import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function ProductDetails({route, navigation}) {
  const {name, price, description, stock} = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/coffee-machine-image.png')}
      />
      <Text style={styles.title}>{name}</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Product description :</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.stockText}>{stock} products in stock</Text>
        <Text style={styles.priceText}>{price.split('.')[0]}$</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AR')}
        style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Product AR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  img: {
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    height: 300,
    marginBottom: 15,
  },
  title: {
    lineHeight: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  descriptionContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  descriptionText: {
    lineHeight: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockText: {
    lineHeight: 20,
    marginBottom: 10,
  },
  priceText: {
    lineHeight: 20,
    fontSize: 20,
  },
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
