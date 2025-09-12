import React, { useState } from 'react';
import { View, Text, Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../contexts/AuthContext';
import RevolutCard from '../../components/ui/GlassCard';
import RevolutButton from '../../components/ui/GlassButton';
import RevolutInput from '../../components/ui/GlassInput';

const { width, height } = Dimensions.get('window');

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const { signUp } = useAuth();
  
  const userType = route.params.userType;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      await signUp(email, password, userType);
      Alert.alert(
        'Success', 
        'Account created successfully! Please check your email to verify your account.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeTitle = () => {
    return userType === 'handyman' ? 'Handyman' : 'Customer';
  };

  const getUserTypeEmoji = () => {
    return userType === 'handyman' ? '👷‍♂️' : '🔧';
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
                fontSize: 48, 
                fontWeight: 'bold', 
                color: 'white',
                marginBottom: 8,
              }}>
                {getUserTypeEmoji()}
              </Text>
              <Text style={{ 
                fontSize: 32, 
                fontWeight: '700', 
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 8,
                letterSpacing: -0.5,
              }}>
                Join as {getUserTypeTitle()}
              </Text>
              <Text style={{ 
                fontSize: 16, 
                color: '#8E8E93',
                textAlign: 'center',
              }}>
                Create your account to get started
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

                <RevolutInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <RevolutButton
                  title="Create Account"
                  variant="primary"
                  loading={loading}
                  onPress={handleRegister}
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
            </RevolutCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}