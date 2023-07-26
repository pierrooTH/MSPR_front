import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function SignupForm({ navigation }) {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

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
                    value=""
                    placeholder={"Ex. John"}
                    onChangeText={(text) => setFirstname(text)}
                />
            </View>
            <View style={{ width: '49%'}}>
            <Text style={{marginBottom: 10}}>Nom</Text>
            <TextInput
                style={styles.input}
                name="lastname"
                value=""
                placeholder={"Ex. Doe"}   
                onChangeText={(text) => setLastname(text)}
            />
            </View>
        </View>  
            <Text style={{marginBottom: 10}}>Email</Text>
            <TextInput
                style={styles.input}
                name="mail"
                value=""
                placeholder={"Ex. john.doe@gmail.com"}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize={"none"}
            />
      </View>
      <Button title={"S'inscrire"} onPress={() => navigation.navigate('QrCode')} />
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