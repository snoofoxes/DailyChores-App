import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import AssignmentForm from '../../components/AssignmentForm';
import AssignmentList from '../../components/AssignmentList';

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://192.168.82.42:8000/assignments/');
        const data = await response.json();
        setAssignments(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch assignments');
      }
    };

    fetchAssignments();
  }, []);

  const addAssignment = async (assignment) => {
    try {
      const response = await fetch('http://192.168.82.42:8000/assignments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      });

      if (response.ok) {
        const newAssignment = await response.json();
        setAssignments((prevAssignments) => [...prevAssignments, newAssignment]);
      } else {
        Alert.alert('Error', 'Failed to add assignment');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add assignment');
    }
  };

  const updateAssignment = async (updatedAssignment) => {
    try {
      const response = await fetch(
        `http://192.168.82.42:8000/assignments/${updatedAssignment.id}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAssignment),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setAssignments((prevAssignments) =>
          prevAssignments.map((assignment) =>
            assignment.id === updated.id ? updated : assignment
          )
        );
      } else {
        Alert.alert('Error', 'Failed to update assignment');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update assignment');
    }
  };

  const deleteAssignment = async (id) => {
    try {
      const response = await fetch(`http://192.168.82.42:8000/assignments/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAssignments((prevAssignments) =>
          prevAssignments.filter((assignment) => assignment.id !== id)
        );
      } else {
        Alert.alert('Error', 'Failed to delete assignment');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to delete assignment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignment Manage</Text>

      {/* Assignment creation form */}
      <View style={styles.formContainer}>
        <AssignmentForm onSubmit={addAssignment} />
      </View>

      {/* Assignment list */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {assignments.length > 0 ? (
          <AssignmentList
            assignments={assignments}
            onUpdateAssignment={updateAssignment}
            onDeleteAssignment={deleteAssignment}
          />
        ) : (
          <Text style={styles.emptyText}>No assignments available. Add one above!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F5F2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C6E49',
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

export default AssignmentManagement;
