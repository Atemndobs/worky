import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { AuthScreen } from '../screens/AuthScreen'
import { HandymanDashboard } from '../screens/HandymanDashboard'
import { CustomerDashboard } from '../screens/CustomerDashboard'
import { UserType } from '../types'

export type RootStackParamList = {
  Welcome: undefined
  Auth: { userType: UserType }
  HandymanDashboard: undefined
  CustomerDashboard: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="HandymanDashboard" component={HandymanDashboard} />
        <Stack.Screen name="CustomerDashboard" component={CustomerDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
