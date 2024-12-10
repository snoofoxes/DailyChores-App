import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '' && password.trim() !== '') {
      onSubmit(name, password);
      setName(''); 
      setPassword(''); 
    } else {
      alert('Name and Password cannot be empty');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Add User" onPress={handleSubmit} color="#2C6E49" />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    backgroundColor: '#F9F9F9',
  },
});

export default UserForm;
