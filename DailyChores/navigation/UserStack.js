import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDashboard from '../screens/User/UserDashboard';
import AssignedChores from '../screens/User/AssignedChores';

const Stack = createNativeStackNavigator();

const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="UserDashboard" 
      component={UserDashboard} 
      options={{ 
        headerShown: true,
        title: 'Family Member' 
      }}
    />
    <Stack.Screen 
      name="AssignedChores" 
      component={AssignedChores} 
      options={{ 
        headerShown: true,
        title: 'Assigned Chores' 
      }}
    />
  </Stack.Navigator>
);

export default UserStack;
