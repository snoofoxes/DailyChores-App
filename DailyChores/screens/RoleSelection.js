import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoleSelection = ({ setUserType, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DAILY CHORES</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUserType('manager');
            navigation.navigate('ManagerLogin');
          }}
        >
          <Text style={styles.buttonText}>Family Head</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setUserType('user');
            navigation.navigate('UserLogin');
          }}
        >
          <Text style={styles.buttonText}>Family Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E9EFEC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16423C', 
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10, 
    width: '80%', 
  },
  button: {
    backgroundColor: '#16423C', 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#E9EFEC', 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelection;
