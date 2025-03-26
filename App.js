// App.js
/**
 * Main entry point for the Chat Application.
 * This file sets up the React Navigation structure and routes.
 *
 * Platforms: Android, iOS, Windows, MacOS
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './components/ChatScreen';
import FriendsScreen from './components/FriendsScreen';
import AdminPanel from './components/AdminPanel';
import ServerSettings from './components/ServerSettings';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

enableScreens();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={ChatScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="Admin" component={AdminPanel} />
        <Tab.Screen name="Servers" component={ServerSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
