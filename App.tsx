import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler';
import AppBackground from './src/components/layout/AppBackground';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppBackground>
        <StatusBar style="light" />
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </AppBackground>
    </SafeAreaProvider>
  );
}