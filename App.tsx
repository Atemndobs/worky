import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/contexts/AuthContext'
import { AppNavigator } from './src/navigation/AppNavigator'
import { runConnectionTests } from './src/utils/test-connection'
// import './global.css' // Temporarily disabled to avoid build hanging

export default function App() {
  useEffect(() => {
    // Test Supabase connection on app startup
    runConnectionTests()
  }, [])

  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  )
}
