import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://192.168.82.42:8000/register/manager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Registration successful', 'You can now log in');
        navigation.navigate('ManagerLogin');
      } else {
        const errorData = await response.json();
        Alert.alert('Registration failed', errorData.message || 'Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration failed', 'There was an error. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Family Head | Register</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ManagerLogin')}>
        <Text style={styles.registerText}>Already have an account? Login here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E9EFEC',  // Background color as per your palette
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#16423C',  // Title color as per your palette
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#6A9C89',  // Border color as per your palette
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#16423C',  // Text color as per your palette
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#16423C',  // Button color as per your palette
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#E9EFEC',  // Button text color as per your palette
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#6A9C89',  // Register link color as per your palette
    fontSize: 16,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});

export default Register;
