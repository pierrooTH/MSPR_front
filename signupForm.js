import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';

export default function SignupForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const submitBtn = async () => {
      try {
        const response = await axios.post('http://192.168.1.14:4000/users', {
        email: email,
        firstname: firstname,
        lastname: lastname
      });

      if (response.status === 201) {
        navigation.navigate('QrCode', {email: email});
      } else {
        Alert.alert('Erreur!')
      }
      } catch (e) {
        Alert.alert(e.message)
      }
    }

  return (
    <View style={{marginTop: 50, padding: 20}}>

      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40}}>Paye ton Kawa!</Text>
      <View style={{marginTop: 10, display: 'flex', flexDirection: 'column'}}>
        <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
            <View style={{ width: '49%'}}>
                <Text style={{marginBottom: 10}}>Prénom</Text>
                <TextInput
                    style={styles.input}
                    name="firstname"
                    value={firstname}
                    placeholder={"Ex. John"}
                    onChangeText={(text) => setFirstname(text)}
                />
            </View>
            <View style={{ width: '49%'}}>
            <Text style={{marginBottom: 10}}>Nom</Text>
            <TextInput
                style={styles.input}
                name="lastname"
              value={lastname}
                placeholder={"Ex. Doe"}   
                onChangeText={(text) => setLastname(text)}
            />
            </View>
        </View>  
            <Text style={{marginBottom: 10}}>Email</Text>
            <TextInput
                style={styles.input}
                name="mail"
    value={email}
                placeholder={"Ex. john.doe@gmail.com"}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}
            />
      </View>
      <Button title={"S'inscrire"} onPress={submitBtn} />
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