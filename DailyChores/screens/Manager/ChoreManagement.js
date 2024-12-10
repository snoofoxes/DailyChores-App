import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import ChoreForm from '../../components/ChoreForm';
import ChoreList from '../../components/ChoreList';

const ChoreManagement = () => {
  const [chores, setChores] = useState([]);
  const [selectedChore, setSelectedChore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const fetchChores = async () => {
      const response = await fetch('http://192.168.82.42:8000/chores/');
      const data = await response.json();
      setChores(data);
    };

    fetchChores();
  }, []);

  const addChore = async (chore) => {
    const response = await fetch('http://192.168.82.42:8000/chores/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chore),
    });

    if (response.ok) {
      const newChore = await response.json();
      setChores((prevChores) => [...prevChores, newChore]);
    } else {
      alert('Failed to add chore');
    }
  };

  const updateChore = async () => {
    const updatedChore = { ...selectedChore, name: updatedName, description: updatedDescription };
    const response = await fetch(`http://192.168.82.42:8000/chores/${selectedChore.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedChore),
    });

    if (response.ok) {
      setChores((prevChores) =>
        prevChores.map((chore) => (chore.id === selectedChore.id ? updatedChore : chore))
      );
      setModalVisible(false);
      setSelectedChore(null);
    } else {
      alert('Failed to update chore');
    }
  };

  const deleteChore = async (choreId) => {
    const response = await fetch(`http://192.168.82.42:8000/chores/${choreId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setChores((prevChores) => prevChores.filter((chore) => chore.id !== choreId));
    } else {
      alert('Failed to delete chore');
    }
  };

  const openUpdateModal = (chore) => {
    setSelectedChore(chore);
    setUpdatedName(chore.name);
    setUpdatedDescription(chore.description);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Chores</Text>
      <ChoreForm onSubmit={addChore} />
      <ScrollView style={styles.scrollContainer}>
        {chores.map((chore) => (
          <View key={chore.id} style={styles.choreItem}>
            <Text style={styles.choreName}>{chore.name}</Text>
            <Text style={styles.choreDescription}>{chore.description}</Text>

            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => openUpdateModal(chore)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteChore(chore.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Update Modal */}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Update Chore</Text>
              <TextInput
                style={styles.input}
                placeholder="Chore Name"
                value={updatedName}
                onChangeText={setUpdatedName}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Chore Description"
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
                multiline
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={updateChore}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    width: '100%',
  },
  choreItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  choreName: {
    fontSize: 18,
    color: '#2C6E49',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  choreDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  updateButton: {
    backgroundColor: '#2C6E49',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#E9EFEC',
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#16423C',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderColor: '#2C6E49',
    borderWidth: 1,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#16423C',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
});

export default ChoreManagement;
