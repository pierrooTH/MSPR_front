import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';

export default function ProductDetails({route, navigation}) {
  const {name, id, price, description, stock} = route.params;
  const [ar, setAr] = useState('');

  const changeArModel = useCallback(() => {
    id === 1 ? setAr('https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-3.usdz') : id === 2 ? setAr("https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker_Low_Poly-2.usdz") : setAr("https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-2.usdz")          
  }, [id]);

  useEffect(() => {
    changeArModel()
  }, [])
  
  return (
    <View style={{flex: 1, padding: 20}}>
      <Image style={styles.img}
        source={ id === 1 ? require('../assets/coffee_maker_3.png') : id === 2 ? require('../assets/coffee_low_poly.png') : require('../assets/coffee_maker2.png')} />
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

      <TouchableOpacity onPress={() => navigation.navigate('AR', {ar: ar})} style={styles.appButtonContainer}>
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
