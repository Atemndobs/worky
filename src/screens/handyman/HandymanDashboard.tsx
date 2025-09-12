import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import RevolutCard from '../../components/ui/GlassCard';
import RevolutButton from '../../components/ui/GlassButton';

const { width, height } = Dimensions.get('window');

export default function HandymanDashboard() {
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
              👷‍♂️ Dashboard
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#8E8E93',
              textAlign: 'center',
            }}>
              Welcome back, {user?.email}
            </Text>
          </View>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Quick Stats
            </Text>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ 
                  fontSize: 24, 
                  fontWeight: 'bold', 
                  color: '#FFFFFF',
                }}>
                  0
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#8E8E93',
                  textAlign: 'center',
                }}>
                  Active Slots
                </Text>
              </View>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ 
                  fontSize: 24, 
                  fontWeight: 'bold', 
                  color: '#FFFFFF',
                }}>
                  0
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#8E8E93',
                  textAlign: 'center',
                }}>
                  Bookings
                </Text>
              </View>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ 
                  fontSize: 24, 
                  fontWeight: 'bold', 
                  color: '#FFFFFF',
                }}>
                  CHF 0
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#8E8E93',
                  textAlign: 'center',
                }}>
                  Earnings
                </Text>
              </View>
            </View>
          </RevolutCard>

          <RevolutCard variant="elevated" style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Quick Actions
            </Text>
            <RevolutButton
              title="Create New Time Slot"
              variant="primary"
              style={{ marginBottom: 12, width: '100%' }}
              onPress={() => {/* Navigate to create slot */}}
            />
            <RevolutButton
              title="Manage Profile"
              variant="secondary"
              style={{ width: '100%' }}
              onPress={() => {/* Navigate to profile */}}
            />
          </RevolutCard>

          <RevolutCard variant="elevated">
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '600', 
              color: '#FFFFFF',
              marginBottom: 16,
            }}>
              Recent Activity
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: '#8E8E93',
              textAlign: 'center',
              paddingVertical: 20,
            }}>
              No recent activity yet
            </Text>
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
