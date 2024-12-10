import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [userType, setUserType] = useState(null);

  return <AppNavigator userType={userType} setUserType={setUserType} />;
};

export default App;
