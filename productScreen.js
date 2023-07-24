import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function ProductScreen() {
    const [dataProduct, setDataProduct] = useState([
       { name: "Produit 1",
        description: "Donec efficitur purus at mauris posuere, vel feugiat lectus tristique. Etiam ornare pulvinar accumsan.",},
        {name: "Produit 2",
        description: "Donec efficitur purus at mauris posuere, vel feugiat lectus tristique. Etiam ornare pulvinar accumsan.",},
        {name: "Produit 3",
        description: "Donec efficitur purus at mauris posuere, vel feugiat lectus tristique. Etiam ornare pulvinar accumsan.",},
       { name: "Produit 4",
        description: "Donec efficitur purus at mauris posuere, vel feugiat lectus tristique. Etiam ornare pulvinar accumsan.",},
       { name: "Produit 5",
        description: "Donec efficitur purus at mauris posuere, vel feugiat lectus tristique. Etiam ornare pulvinar accumsan."},
        
]) 
    const data = dataProduct.length > 0 ? dataProduct.map(d => {
        return(
            <View style={{backgroundColor: '#fff', borderRadius: 5, margin: 10, padding: 20, }} key={d.name}>
            <Text style={{lineHeight: 20}}>{d.name}</Text>
            <Text style={{lineHeight: 20, marginTop: 5}}>{d.description}</Text>
            </View>
        )

    })  : []
  return (
    <View>
      {data}
    </View>
  )
}