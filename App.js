import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './screens/SignUpScreen';
import UserDetails from './components/UserDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUpScreen">
          <Stack.Screen 
            name="SignUpScreen" 
            component={SignUpScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
