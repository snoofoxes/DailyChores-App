import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ActivityIndicator } from 'react-native';

const UserDashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChoreDescription, setSelectedChoreDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://192.168.82.42:8000/chores/search/?query=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setErrorMessage('Error fetching chores.');
      }
    } catch (error) {
      setErrorMessage('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchChoreDescription = async (choreId) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`http://192.168.82.42:8000/chores/${choreId}/description`);
      if (response.ok) {
        const data = await response.json();
        setSelectedChoreDescription(data.description);
        setIsModalVisible(true);
      } else {
        setErrorMessage('Error fetching chore description.');
      }
    } catch (error) {
      setErrorMessage('Network error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Dashboard</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a chore"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#16423C" />}

      {/* Error message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Show Search Results */}
      {searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {searchResults.map((chore) => (
            <TouchableOpacity
              key={chore.id}
              style={styles.resultText}
              onPress={() => fetchChoreDescription(chore.id)}
            >
              <Text style={styles.resultText}>{chore.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        !loading && <Text>No results found</Text>
      )}

      {/* Modal for Chore Description */}
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chore Description</Text>
          <Text>{selectedChoreDescription}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AssignedChores')}
      >
        <Text style={styles.buttonText}>View Assigned Chores</Text>
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
    backgroundColor: '#E9EFEC', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#16423C',
  },
  button: {
    backgroundColor: '#16423C',
    padding: 14,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#E9EFEC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '80%',
    padding: 10,
    borderColor: '#16423C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultsContainer: {
    width: '80%',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: '#16423C',
    marginBottom: 5,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserDashboard;
