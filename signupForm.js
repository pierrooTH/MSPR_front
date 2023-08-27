import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

<<<<<<< Updated upstream
export default function signupForm() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
=======
export default function SignupForm({navigation}) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout du state pour le message d'erreur

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null && navigation) {
        navigation.replace('Product');
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData().catch(console.error);
  }, []);

  const submitBtn = async () => {
    try {
      if (!email || !firstname || !lastname) {
        setErrorMessage('Veuillez remplir tous les champs.'); // Afficher le message d'erreur
        // Alert.alert('Veuillez remplir tous les champs.');
        return;
      }

      const response = await axios.post('http://192.168.1.14:4000/users', {
        email: email,
        firstname: firstname,
        lastname: lastname,
      });

      if (response.status === 201 && navigation) {
        navigation.navigate('QrCode', {email: email});
      } else {
        Alert.alert('Erreur!');
      }
    } catch (e) {
      setErrorMessage('Erreur!'); // Gérer les erreurs de manière appropriée
      // Alert.alert(e.message);
    }
  };
>>>>>>> Stashed changes

  return (
    <View style={{marginTop: 50, padding: 20}}>

      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>Paye ton Kawa!</Text>
      <View style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
        <View style={{display: 'flex', flexDirection: 'row', gap: '10px', width: '100%'}}>
            <View style={{ width: '49%'}}>
                <Text style={{marginBottom: 10}}>Prénom</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"Ex. John"}
                    onChangeText={(text) => setFirstname(text)}
                />
            </View>
            <View style={{ width: '49%'}}>
            <Text style={{marginBottom: 10}}>Nom</Text>
            <TextInput
                style={styles.input}
                placeholder={"Ex. Doe"}   
                onChangeText={(text) => setLastname(text)}
            />
            </View>
        </View>  
            <Text style={{marginBottom: 10}}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder={"Ex. john.doe@gmail.com"}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}
            />
      </View>
      <Button title={"Sign Up"} onPress={() => {}} />
    </View>
  )
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 5
    },
  });