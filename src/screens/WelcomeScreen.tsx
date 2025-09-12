import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import RevolutCard from '../components/ui/GlassCard';
import RevolutButton from '../components/ui/GlassButton';

const { width, height } = Dimensions.get('window');

type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
          <View style={{ 
            alignItems: 'center', 
            marginBottom: 60,
          }}>
            <Text style={{ 
              fontSize: 42, 
              fontWeight: '700', 
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: 12,
              letterSpacing: -1,
            }}>
              Worky
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: '#8E8E93',
              textAlign: 'center',
              fontWeight: '400',
              lineHeight: 22,
            }}>
              Find handymen or offer your services{'\n'}across Switzerland
            </Text>
          </View>

          <View style={{ 
            width: '100%',
            gap: 12,
          }}>
            <RevolutCard variant="elevated" style={{ marginBottom: 8 }}>
              <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#007AFF',
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Text style={{ fontSize: 20 }}>🔧</Text>
                </View>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: 6,
                }}>
                  I need help
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#8E8E93',
                  textAlign: 'center',
                  marginBottom: 24,
                  lineHeight: 20,
                }}>
                  Find skilled handymen for urgent tasks
                </Text>
                <RevolutButton
                  title="Find Handyman"
                  variant="primary"
                  onPress={() => navigation.navigate('Register', { userType: 'customer' })}
                  style={{ width: '100%' }}
                />
              </View>
            </RevolutCard>

            <RevolutCard variant="elevated">
              <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#30D158',
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Text style={{ fontSize: 20 }}>👷‍♂️</Text>
                </View>
                <Text style={{ 
                  fontSize: 20, 
                  fontWeight: '600', 
                  color: '#FFFFFF',
                  marginBottom: 6,
                }}>
                  I offer services
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#8E8E93',
                  textAlign: 'center',
                  marginBottom: 24,
                  lineHeight: 20,
                }}>
                  List your availability and earn money
                </Text>
                <RevolutButton
                  title="Offer Services"
                  variant="secondary"
                  onPress={() => navigation.navigate('Register', { userType: 'handyman' })}
                  style={{ width: '100%' }}
                />
              </View>
            </RevolutCard>
          </View>

          <View style={{ 
            marginTop: 48,
            alignItems: 'center',
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#8E8E93',
              marginBottom: 16,
            }}>
              Already have an account?
            </Text>
            <RevolutButton
              title="Sign In"
              variant="ghost"
              size="sm"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}