import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import RevolutCard from '../../components/ui/GlassCard';
import RevolutButton from '../../components/ui/GlassButton';

const { width, height } = Dimensions.get('window');

export default function CustomerDashboard() {
  const { user, signOut } = useAuth();

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
              marginBottom: 8,
              letterSpacing: -0.5,
            }}>
              🔧 Browse Services
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#8E8E93',
              textAlign: 'center',
            }}>
              Welcome, {user?.email}
            </Text>
          </View>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Search for Handymen
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#8E8E93',
              marginBottom: 20,
            }}>
              Find available handymen in your area for immediate assistance
            </Text>
            <RevolutButton
              title="Browse Available Slots"
              variant="primary"
              style={{ width: '100%' }}
              onPress={() => {/* Navigate to browse */}}
            />
          </RevolutCard>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Swiss Regions
            </Text>
            <View style={{ gap: 12 }}>
              {['Zurich', 'Bern', 'Geneva', 'Basel'].map((region) => (
                <RevolutButton
                  key={region}
                  title={region}
                  variant="secondary"
                  size="sm"
                  style={{ width: '100%' }}
                  onPress={() => {/* Filter by region */}}
                />
              ))}
            </View>
          </RevolutCard>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Your Bookings
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#8E8E93',
              textAlign: 'center',
              paddingVertical: 20,
            }}>
              No bookings yet
            </Text>
            <RevolutButton
              title="View All Bookings"
              variant="secondary"
              style={{ width: '100%' }}
              onPress={() => {/* Navigate to bookings */}}
            />
          </RevolutCard>

          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <RevolutButton
              title="Sign Out"
              variant="ghost"
              size="sm"
              onPress={signOut}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
