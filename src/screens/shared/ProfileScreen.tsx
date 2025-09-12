import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import RevolutCard from '../../components/ui/GlassCard';
import RevolutButton from '../../components/ui/GlassButton';

export default function ProfileScreen() {
  const { user, userType, signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={{ 
            paddingHorizontal: 20,
            paddingVertical: 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ 
            alignItems: 'center', 
            marginBottom: 40,
          }}>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: '700', 
              color: '#FFFFFF',
              textAlign: 'center',
              letterSpacing: -0.5,
            }}>
              👤 Profile
            </Text>
          </View>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Account Details
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#FFFFFF',
              marginBottom: 8,
            }}>
              Email: {user?.email}
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Account Type: {userType?.charAt(0).toUpperCase()}{userType?.slice(1)}
            </Text>
          </RevolutCard>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Profile Settings
            </Text>
            <RevolutButton
              title="Edit Profile"
              variant="primary"
              style={{ marginBottom: 12, width: '100%' }}
              onPress={() => {/* Navigate to edit profile */}}
            />
            <RevolutButton
              title="Notification Settings"
              variant="secondary"
              style={{ marginBottom: 12, width: '100%' }}
              onPress={() => {/* Navigate to notification settings */}}
            />
            <RevolutButton
              title="Privacy Settings"
              variant="secondary"
              style={{ width: '100%' }}
              onPress={() => {/* Navigate to privacy settings */}}
            />
          </RevolutCard>

          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <RevolutButton
              title="Sign Out"
              variant="ghost"
              onPress={signOut}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}