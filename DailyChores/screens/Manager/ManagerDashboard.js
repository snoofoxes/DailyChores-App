import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const ManagerDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>

      {/* Main content area */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to the Manager Dashboard</Text>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ManagerDashboard')}
        >
          <Icon name="home" size={30} color="#5F6B68" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('UserManagement')}
        >
          <Icon name="diversity-1" size={30} color="#5F6B68" />
          <Text style={styles.navButtonText}>Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ChoreManagement')}
        >
          <Icon name="ballot" size={30} color="#5F6B68" />
          <Text style={styles.navButtonText}>Chores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('AssignmentManagement')}
        >
          <Icon name="dry-cleaning" size={30} color="#5F6B68" />
          <Text style={styles.navButtonText}>Assign</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFEC',  
    justifyContent: 'space-between',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#16423C',  
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#5F6B68', 
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',  
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderColor: '#ccc',
    borderTopWidth: 1,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 14,
    color: '#5F6B68',  
    marginTop: 5,
  },
});

export default ManagerDashboard;
