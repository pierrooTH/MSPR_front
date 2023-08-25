import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
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
    <View style={{padding: 20, backgroundColor: '#5C4F2D', flex: 1}}>
      <View style={{marginTop: 50}}>
        <Image
          style={styles.img}
          source={require('./assets/logo_payetonkawa-5.png')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 40,
            color: 'white',
          }}>
          Paye ton Kawa!
        </Text>

        <View style={{marginTop: 30, display: 'flex', flexDirection: 'column'}}>
          <View
            style={{
              display: 'flex',
              gap: 10,
              flexDirection: 'row',
              width: '100%',
            }}>
            <View style={{width: '49%'}}>
              <Text style={{marginBottom: 10, color: 'white'}}>Prénom</Text>
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
              <Text style={{marginBottom: 10, color: 'white'}}>Nom</Text>
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
          <Text style={{marginBottom: 10, color: 'white'}}>Email</Text>
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
        <TouchableOpacity
          onPress={submitBtn}
          style={styles.appButtonContainer}
          testID="submit-button">
          <Text style={styles.appButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text
            testID="error-message"
            style={{color: 'red', textAlign: 'center', marginTop: 10}}>
            {errorMessage}
          </Text>
        ) : null}
      </View>
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
  img: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 150,
    height: 150,
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
