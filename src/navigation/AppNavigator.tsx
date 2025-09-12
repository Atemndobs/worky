import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

// Import screens (we'll create these next)
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HandymanDashboard from '../screens/handyman/HandymanDashboard';
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import ProfileScreen from '../screens/shared/ProfileScreen';
import BookingsScreen from '../screens/shared/BookingsScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { userType: 'handyman' | 'customer' };
  HandymanTabs: undefined;
  CustomerTabs: undefined;
};

export type HandymanTabParamList = {
  Dashboard: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type CustomerTabParamList = {
  Browse: undefined;
  Bookings: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const HandymanTab = createBottomTabNavigator<HandymanTabParamList>();
const CustomerTab = createBottomTabNavigator<CustomerTabParamList>();

function HandymanTabs() {
  return (
    <HandymanTab.Navigator
      screenOptions={{
        tabBarBackground: () => (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFillObject} />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(16, 16, 16, 0.6)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.06)',
          elevation: 0,
        },
        headerShown: false,
      }}
    >
      <HandymanTab.Screen
        name="Dashboard"
        component={HandymanDashboard}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />
      <HandymanTab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
        }}
      />
      <HandymanTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </HandymanTab.Navigator>
  );
}

function CustomerTabs() {
  return (
    <CustomerTab.Navigator
      screenOptions={{
        tabBarBackground: () => (
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFillObject} />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(16, 16, 16, 0.6)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.06)',
          elevation: 0,
        },
        headerShown: false,
      }}
    >
      <CustomerTab.Screen
        name="Browse"
        component={CustomerDashboard}
        options={{
          tabBarLabel: 'Browse',
        }}
      />
      <CustomerTab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
        }}
      />
      <CustomerTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </CustomerTab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, userType, loading } = useAuth();

  if (loading) {
    // We'll create a loading screen component later
    return null;
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        {!user ? (
          // Auth screens
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Authenticated screens
          <>
            {userType === 'handyman' ? (
              <Stack.Screen name="HandymanTabs" component={HandymanTabs} />
            ) : (
              <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}