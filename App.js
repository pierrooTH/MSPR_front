import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupForm from './signupForm';
import ProductScreen from './productScreen';
import QrCode from './components/qrCode';
import ProductDetails from './components/productDetails';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Product">
        <Stack.Screen  name="Home" component={SignupForm} options={{headerShown: false}} />
        <Stack.Screen  name="Product" component={ProductScreen} options={{title: 'Produits'}}/>
        <Stack.Screen  name="QrCode" component={QrCode} options={{headerShown: false}}/>
        <Stack.Screen  name="Details" component={ProductDetails} options={{title: 'Informations du produit'}}/>
        {/* <Stack.Screen  name="AR" component={ArProduct} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
