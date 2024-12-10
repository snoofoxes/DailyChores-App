import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const UserList = ({ users, onUpdate, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedPassword(user.password);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    onUpdate({ ...selectedUser, name: updatedName, password: updatedPassword });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        users.map((user) => (
          <View key={user.id} style={styles.userItem}>
            <Text style={styles.userName}>{user.name}</Text>

            {/* Update Button */}
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() => openUpdateModal(user)}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(user.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noUsers}>No users available</Text>
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
              <Text style={styles.modalTitle}>Update User</Text>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                value={updatedName}
                onChangeText={setUpdatedName}
              />
              <TextInput
                style={styles.input}
                placeholder="User Password"
                value={updatedPassword}
                onChangeText={setUpdatedPassword}
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
    padding: 15,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
    backgroundColor: '#F9F9F9',
    borderRadius: 6,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  noUsers: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#2C6E49',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 6,
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
    borderRadius: 6,
    borderColor: '#2C6E49',
    borderWidth: 1,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#16423C',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
});

export default UserList;
