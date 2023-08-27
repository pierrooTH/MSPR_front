import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupForm from './signupForm';
import ProductScreen from './productScreen';
import QrCode from './components/qrCode';
import ProductDetails from './components/productDetails';
import ARProduct from './components/ARProduct';
const Stack = createNativeStackNavigator();

const App = () => {
    
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Product'>
        <Stack.Screen  name="Home" component={SignupForm} options={{headerShown: false}} />
        <Stack.Screen  name="QrCode" component={QrCode} options={{headerShown: false}}/>
        <Stack.Screen  name="Product" component={ProductScreen} options={{title: 'Liste des articles', headerStyle: {backgroundColor: '#5C4F2D'}, headerTitleStyle: {
            color: 'white',
          },}}/>
        <Stack.Screen  name="Details" component={ProductDetails} options={{title: 'Informations du produit', headerStyle: {backgroundColor: '#5C4F2D'}, headerTitleStyle: {
            color: 'white',
          },}}/>
        <Stack.Screen  name="AR" component={ARProduct} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

