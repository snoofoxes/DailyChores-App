import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RoleSelection from '../screens/RoleSelection';
import UserLogin from '../screens/User/UserLogin';
import ManagerLogin from '../screens/Manager/ManagerLogin';
import ManagerStack from './ManagerStack'; 
import UserStack from './UserStack'; 
import Register from '../screens/Register';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
  }, []);

  const handleLogin = (type) => {
    setUserType(type); 
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Role Selection Screen */}
        <Stack.Screen
          name="RoleSelection"
          options={{ headerShown: false }}
        >
          {(props) => <RoleSelection {...props} setUserType={setUserType} />}
        </Stack.Screen>

        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} 
        />

        {/* Manager Login Screen */}
        <Stack.Screen
          name="ManagerLogin"
          options={{ headerShown: false }} 
        >
          {(props) => <ManagerLogin {...props} onLogin={() => handleLogin('manager')} />}
        </Stack.Screen>

        {/* User Login Screen */}
        <Stack.Screen
          name="UserLogin"
          options={{ headerShown: false }} 
        >
          {(props) => <UserLogin {...props} onLogin={() => handleLogin('user')} />}
        </Stack.Screen>

        {/* Conditional navigation based on user type */}
        {userType === 'manager' && (
          <Stack.Screen name="ManagerStack" component={ManagerStack} options={{ headerShown: false }} />
        )}

        {userType === 'user' && (
          <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
