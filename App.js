import React, { useState, useEffect, useMemo } from 'react';
import PasswordsPage from './pages/PasswordsPage'
import AddPasswordPage from './pages/AddPasswordPage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native'
import SettingsPage from './pages/SettingsPage'

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
            <Stack.Screen name="Passwords" component={PasswordsPage} options={({ navigation }) => ({
              headerLeft: () => null,
              headerRight: () => <Button title="Settings" onPress={() => navigation.navigate("Settings")} />
            })} />
            <Stack.Screen name="Add Password" component={AddPasswordPage}/>
            <Stack.Screen name="Settings" component={SettingsPage}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
