import React, { useState } from 'react';
import { View, Text, Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';
import RevolutCard from '../../components/ui/GlassCard';
import RevolutButton from '../../components/ui/GlassButton';
import RevolutInput from '../../components/ui/GlassInput';

const { width, height } = Dimensions.get('window');

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={{ 
              flex: 1, 
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 40,
            }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ 
              alignItems: 'center', 
              marginBottom: 60,
            }}>
              <Text style={{ 
                fontSize: 32, 
                fontWeight: '700', 
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 8,
                letterSpacing: -0.5,
              }}>
                Welcome Back
              </Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#8E8E93',
                textAlign: 'center',
              }}>
                Sign in to continue to Worky
              </Text>
            </View>

            <RevolutCard variant="elevated" style={{ width: width - 48 }}>
              <View style={{ paddingVertical: 8 }}>
                <RevolutInput
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <RevolutInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <RevolutButton
                  title="Sign In"
                  variant="primary"
                  loading={loading}
                  onPress={handleLogin}
                  style={{ marginTop: 8, width: '100%' }}
                />

                <View style={{ 
                  marginTop: 32,
                  alignItems: 'center',
                }}>
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#8E8E93',
                    marginBottom: 16,
                  }}>
                    Don't have an account?
                  </Text>
                  <RevolutButton
                    title="Go to Welcome"
                    variant="ghost"
                    size="sm"
                    onPress={() => navigation.navigate('Welcome')}
                  />
                </View>
              </View>
            </RevolutCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}