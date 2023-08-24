import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';

export default function SignupForm({navigation}) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Ajout du state pour le message d'erreur

  const submitBtn = async () => {
    try {
      if (!email || !firstname || !lastname) {
        setErrorMessage('Veuillez remplir tous les champs.'); // Afficher le message d'erreur
        // Alert.alert('Veuillez remplir tous les champs.');
        return;
      }

      const response = await axios.post('http://192.168.1.15:4000/users', {
        email: email,
        firstname: firstname,
        lastname: lastname,
      });

      if (response.status === 201) {
        navigation.navigate('QrCode', {email: email});
      } else {
        Alert.alert('Erreur!');
      }
    } catch (e) {
      setErrorMessage(e.message); // Gérer les erreurs de manière appropriée
      // Alert.alert(e.message);
    }
  };

  return (
    <View style={{marginTop: 50, padding: 20}}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>
        Paye ton Kawa!
      </Text>
      <View style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
        <View
          style={{
            display: 'flex',
            gap: 10,
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{width: '49%'}}>
            <Text style={{marginBottom: 10}}>Prénom</Text>
            <TextInput
              style={styles.input}
              name="firstname"
              value={firstname}
              placeholder={'Ex. John'}
              onChangeText={text => setFirstname(text)}
              placeholderTextColor={'gray'}
              testID="firstname-input" // Attribut testID ajouté
            />
          </View>
          <View style={{width: '49%'}}>
            <Text style={{marginBottom: 10}}>Nom</Text>
            <TextInput
              style={styles.input}
              name="lastname"
              value={lastname}
              placeholder={'Ex. Doe'}
              onChangeText={text => setLastname(text)}
              placeholderTextColor={'gray'}
              testID="lastname-input" // Attribut testID ajouté
            />
          </View>
        </View>
        <Text style={{marginBottom: 10}}>Email</Text>
        <TextInput
          style={styles.input}
          name="mail"
          value={email}
          placeholder={'Ex. john.doe@gmail.com'}
          onChangeText={text => setEmail(text)}
          placeholderTextColor={'gray'}
          autoCapitalize={'none'}
          testID="mail-input" // Attribut testID ajouté
        />
      </View>
      <Button testID="submit-button" title={"S'inscrire"} onPress={submitBtn} />
      {errorMessage ? (
        <Text
          testID="error-message"
          style={{color: 'red', textAlign: 'center', marginTop: 10}}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
});
