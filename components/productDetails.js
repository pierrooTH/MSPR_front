import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

export default function ProductDetails({route, navigation}) {
  const {name, id, price, description, stock} = route.params;
  const [ar, setAr] = useState('');

  const changeArModel = useCallback(() => {
    // id === 1
    //   ? setAr(
    //       'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-3.usdz',
    //     )
    //   : id === 2
    //   ? setAr(
    //       'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker_Low_Poly-2.usdz',
    //     )
    //   : setAr(
    //       'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-2.usdz',
    //     );
    if (id === 1) {
      if (Platform.OS === 'android') {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-3.glb',
        );
      } else {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-3.usdz',
        );
      }
    } else if (id === 2) {
      if (Platform.OS === 'android') {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/coffee_maker_low_poly.glb',
        );
      } else {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker_Low_Poly-2.usdz',
        );
      }
    } else if (id === 3) {
      if (Platform.OS === 'android') {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/coffee_maker.glb',
        );
      } else {
        setAr(
          'https://github.com/pierrooTH/MSPR_front/raw/develop/3DModels2/Coffee_Maker-2.usdz',
        );
      }
    }
  }, [id]);

  useEffect(() => {
    changeArModel();
  }, []);

  return (
    <View style={{flex: 1, padding: 20}}>
      <Image
        testID="product-details-image"
        style={styles.img}
        source={
          id === 1
            ? require('../assets/coffee_maker_3.png')
            : id === 2
            ? require('../assets/coffee_low_poly.png')
            : require('../assets/coffee_maker2.png')
        }
      />
      <Text
        style={{
          lineHeight: 20,
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom: 10,
        }}>
        {name}
      </Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Product description :</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.stockText}>{stock} products in stock</Text>
        <Text style={styles.priceText}>{price.split('.')[0]}$</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AR', {ar: ar})}
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
    height: 400,
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
