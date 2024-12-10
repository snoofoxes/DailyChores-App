import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const AssignedChores = () => {
  const [chores, setChores] = useState([]);
  const userId = 7; // Ensure this is the correct user ID

  useEffect(() => {
    // Fetch the user's assigned chores from the backend
    axios.get(`http://192.168.82.42:8000/assignments/user/${userId}`)
      .then(response => setChores(response.data))
      .catch(error => console.log(error));
  }, [userId]);

  const markChoreComplete = (assignmentId) => {
    axios.put(`http://192.168.82.42:8000/assignments/${assignmentId}/complete`)
      .then(() => {
        // Update the status of the chore in the local state to reflect the completion
        setChores(chores.map(chore => 
          chore.id === assignmentId ? { ...chore, status: 'Completed' } : chore
        ));
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigned Chores</Text>
      {chores.length === 0 ? (
        <Text style={styles.noChoresText}>No chores assigned yet!</Text>
      ) : (
        <FlatList
          data={chores}
          renderItem={({ item }) => (
            <View style={styles.choreContainer}>
              <Text style={styles.choreText}>Chore: {item.description}</Text>
              <Text style={styles.choreText}>Start: {item.start_time}</Text>
              <Text style={styles.choreText}>End: {item.end_time}</Text>
              <Text style={styles.choreText}>Status: {item.status}</Text>
              {item.status !== 'Completed' && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => markChoreComplete(item.id)}
                >
                  <Text style={styles.buttonText}>Mark as Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E9EFEC',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#16423C',
  },
  choreContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  choreText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#16423C',
  },
  noChoresText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A9C89',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#16423C',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E9EFEC',
    fontSize: 18,
  },
});

export default AssignedChores;
