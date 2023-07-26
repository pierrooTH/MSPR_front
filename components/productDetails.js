import { View, Text, Button } from 'react-native'
import React from 'react'

export default function ProductDetails({route, navigation}) {
    const {name, id, price, description, stock} = route.params
  return (
    <View style={{flex: 1, padding: 20}}>

       <Text style={{lineHeight: 20, fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>{name}</Text>
              <Text style={{lineHeight: 20, marginBottom: 10}}>{description}</Text>
              
              <Text style={{lineHeight: 20, marginBottom: 10}}>{stock} products in stock</Text>
              <Text style={{lineHeight: 20, fontSize: 20}}>{price.split('.')[0]}$</Text>

        <Button title='Réalité augmentée du produit' onPress={() => navigation.navigate('AR')} />
    </View>
  )
}