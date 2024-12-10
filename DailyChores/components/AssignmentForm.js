import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const AssignmentForm = () => {
  const navigation = useNavigation(); 
  const [users, setUsers] = useState([]);
  const [chores, setChores] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedChore, setSelectedChore] = useState('');
  const [startTime, setStartTime] = useState(null); // Store Date object
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetch('http://192.168.82.42:8000/users/')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    fetch('http://192.168.82.42:8000/chores/')
      .then((response) => response.json())
      .then((data) => setChores(data))
      .catch((error) => console.error('Error fetching chores:', error));
  }, []);

  const handleConfirm = (date) => {
    setStartTime(date);
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    if (!selectedUser || !selectedChore || !startTime) {
      Alert.alert('Validation Error', 'All fields are required!');
      return;
    }

    const assignment = {
      user_id: parseInt(selectedUser, 10),
      chore_id: parseInt(selectedChore, 10),
      start_time: startTime.toISOString(), 
      end_time: new Date(startTime.getTime() + 60 * 60 * 1000).toISOString(), // Add 1 hour
      status: 'Pending',
    };

    console.log('Assignment payload:', assignment); 

    fetch('http://192.168.82.42:8000/assignments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignment),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('Success', 'Chore assigned successfully!');
          navigation.goBack(); 
        } else {
          response.json().then((error) => {
            console.error('Backend error:', error); 
            Alert.alert('Error', error.detail || 'Failed to assign chore.');
          });
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
        Alert.alert('Network Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign a Chore</Text>

      <Text style={styles.label}>Select User:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedUser}
          onValueChange={(itemValue) => setSelectedUser(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a User" value="" />
          {users.map((user) => (
            <Picker.Item key={user.id} label={user.name} value={user.id.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Select Chore:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedChore}
          onValueChange={(itemValue) => setSelectedChore(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a Chore" value="" />
          {chores.map((chore) => (
            <Picker.Item key={chore.id} label={chore.name} value={chore.id.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Start Time:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setDatePickerVisibility(true)}
      >
        <Text style={styles.dateButtonText}>
          {startTime ? startTime.toLocaleString() : 'Select Start Time'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Assign Chore</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C6E49',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2C6E49',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AssignmentForm;
