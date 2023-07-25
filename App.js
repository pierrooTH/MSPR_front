import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupForm from './signupForm';
import ProductScreen from './productScreen';
import ArProduct from './ARProduct';
import QrCode from './components/qrCode';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  name="Home" component={SignupForm} options={{headerShown: false}} />
        <Stack.Screen  name="Product" component={ProductScreen} options={{title: 'Produits'}}/>
        <Stack.Screen  name="QrCode" component={QrCode} options={{headerShown: false}}/>
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
