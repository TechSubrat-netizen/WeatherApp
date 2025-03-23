/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Dashboard from './SRC/Dashboard';
import AddDetails from './SRC/AddDetails';
import SeeDetails from './SRC/SeeDEtails';

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddDetails" component={AddDetails}/>
        <Stack.Screen name="SeeDetails" component={SeeDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

