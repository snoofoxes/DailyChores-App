import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ChoreForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (name && description) {
      // Call the onSubmit function passed as a prop with the new chore details
      onSubmit({ name, description });
      setName(''); // Clear the input after submitting
      setDescription('');
    } else {
      alert('Please enter both name and description');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Enter Chore Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter chore name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Enter Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter chore description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    width: '100%',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2C6E49',
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  submitButton: {
    backgroundColor: '#2C6E49',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChoreForm;
