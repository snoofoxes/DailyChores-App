import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManagerDashboard from '../screens/Manager/ManagerDashboard';
import UserManagement from '../screens/Manager/UserManagement';
import ChoreManagement from '../screens/Manager/ChoreManagement';
import AssignmentManagement from '../screens/Manager/AssignmentManagement';

const Stack = createNativeStackNavigator();

const ManagerStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ManagerDashboard" 
      component={ManagerDashboard} 
      options={{ 
        headerShown: true,
        title: 'Family Head | Dashboard'
      }}
    />
    <Stack.Screen 
      name="UserManagement" 
      component={UserManagement} 
      options={{ 
        headerShown: true,
        title: 'Family Members'
      }}
    />
    <Stack.Screen 
      name="ChoreManagement" 
      component={ChoreManagement} 
      options={{ 
        headerShown: true,
        title: 'Chores' 
      }}
    />
  <Stack.Screen
    name="AssignmentManagement"
    component={AssignmentManagement}
    options={{ 
      headerShown: true,
      title: 'Assign Chores' 
    }}/>
  </Stack.Navigator>
);

export default ManagerStack;
