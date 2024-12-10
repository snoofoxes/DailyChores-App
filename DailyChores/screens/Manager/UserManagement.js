import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserForm from '../../components/UserForm';
import UserList from '../../components/UserList';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://192.168.82.42:8000/users/');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const addUser = async (name, password) => {
    try {
      const response = await fetch('http://192.168.82.42:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),  
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);  
        console.log('User added successfully:', newUser); 
      } else {
        alert('Failed to add user');
        console.log('Failed to add user. Response:', response); 
      }
    } catch (error) {
      console.error('Error adding user:', error); 
      alert('Failed to add user');
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`http://192.168.82.42:8000/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedUser.name, password: updatedUser.password }),
      });

      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://192.168.82.42:8000/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Family</Text>

      {/* User creation form */}
      <UserForm onSubmit={addUser} />

      {/* User list */}
      <ScrollView style={styles.scrollContainer}>
        <UserList users={users} onUpdate={updateUser} onDelete={deleteUser} />
      </ScrollView>
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
});

export default UserManagement;
