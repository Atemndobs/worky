import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RevolutCard from '../../components/ui/GlassCard';

export default function BookingsScreen() {
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
              📅 My Bookings
            </Text>
          </View>

          <RevolutCard variant="elevated">
            <Text style={{ 
              fontSize: 16, 
              color: '#8E8E93',
              textAlign: 'center',
              paddingVertical: 40,
            }}>
              No bookings found
            </Text>
          </RevolutCard>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}