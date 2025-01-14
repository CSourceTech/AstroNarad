import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/Images';

const SignUp = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!name || !mobile || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Sign Up</Text> */}
      <Image source={Images.Background} style={styles.Background}/>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        placeholderTextColor={"black"}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
        placeholderTextColor={"black"}
        value={mobile}
        onChangeText={setMobile}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor={"black"}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}> Already have an account? <Text style={styles.loginTextBold} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#E9AD00', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    Background: {
      position: 'absolute',
      top: 0,
      left: 0,
    //   width: '100%',
      height: '100%',
      resizeMode: 'cover',
      opacity: 0.55, 
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      width: '90%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 20,
      backgroundColor: '#fff',
      color: '#000',
      fontSize: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    button: {
      width: '90%',
      height: 50,
      backgroundColor: '#FF5722', // Updated button color
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowColor: '#FF5722',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginLink: {
      marginTop: 20,
    },
    loginText: {
      fontSize: 14,
      color: '#555',
      textAlign: 'center',
      fontWeight: '800',
      top: 15
    },
    loginTextBold: {
      fontWeight: 'bold',
      color: 'red',
    fontWeight:'900',
    },
  });
  
export default SignUp;
