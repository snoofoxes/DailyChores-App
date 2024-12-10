import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

const ChoreList = ({ chores, onUpdate, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChore, setSelectedChore] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  const openUpdateModal = (chore) => {
    setSelectedChore(chore);
    setUpdatedName(chore.name);
    setUpdatedDescription(chore.description);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    onUpdate({ ...selectedChore, name: updatedName, description: updatedDescription });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {chores.length > 0 ? (
        chores.map((chore) => (
          <View key={chore.id} style={styles.choreItem}>
            <Text style={styles.choreName}>{chore.name}</Text>
            <Text style={styles.choreDescription}>{chore.description}</Text>

            {/* Update Button */}
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => openUpdateModal(chore)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(chore.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noChoresText}>No chores available</Text>
      )}

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
                  onPress={handleUpdate}
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
    padding: 16,
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    elevation: 4,
    marginTop: 10,
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
  noChoresText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
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

export default ChoreList;
