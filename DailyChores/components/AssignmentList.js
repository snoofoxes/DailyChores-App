import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';

const AssignmentList = ({ assignments, onUpdateAssignment, onDeleteAssignment }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedAssignment, setUpdatedAssignment] = useState({});

  const openUpdateModal = (assignment) => {
    setSelectedAssignment(assignment);
    setUpdatedAssignment(assignment); 
    setUpdateModalVisible(true);
  };

  const handleUpdate = () => {
    onUpdateAssignment(updatedAssignment);
    setUpdateModalVisible(false);
  };

  const handleDelete = () => {
    onDeleteAssignment(selectedAssignment.id);
    setUpdateModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Main Modal */}
      <TouchableOpacity
        style={styles.showButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.showButtonText}>SHOW ASSIGNMENTS</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Assignments</Text>
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <TouchableOpacity
                  key={assignment.id}
                  style={styles.assignmentItem}
                  onPress={() => openUpdateModal(assignment)}
                >
                  <Text style={styles.assignmentName}>
                    {assignment.user_name} - {assignment.chore_name}
                  </Text>
                  <Text style={styles.assignmentDescription}>
                    Status: {assignment.status}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noAssignmentsText}>No assignments available</Text>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Update/Delete Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Assignment</Text>
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={updatedAssignment.status}
              onChangeText={(text) => setUpdatedAssignment({ ...updatedAssignment, status: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Time"
              value={updatedAssignment.start_time}
              onChangeText={(text) => setUpdatedAssignment({ ...updatedAssignment, start_time: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="End Time"
              value={updatedAssignment.end_time}
              onChangeText={(text) => setUpdatedAssignment({ ...updatedAssignment, end_time: text })}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                <Text style={styles.saveButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setUpdateModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  showButton: {
    backgroundColor: '#2C6E49',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  showButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2C6E49',
  },
  assignmentItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    width: '100%',
  },
  assignmentName: {
    fontSize: 16,
    color: '#2C6E49',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#555',
  },
  noAssignmentsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#2C6E49',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  deleteButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2C6E49',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default AssignmentList;
