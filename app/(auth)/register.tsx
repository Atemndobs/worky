import { ErrorMessage } from '@/components/ErrorMessage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from '@/components/ui/GlassView';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const { type } = useLocalSearchParams<{ type: 'handyman' | 'customer' }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, error, clearError } = useAuth();
  const colorScheme = useColorScheme();

  const userType = type || 'customer';

  const handleFieldChange = (setter: (value: string) => void) => (text: string) => {
    setter(text);
    if (error) clearError(); // Clear error when user starts typing
  };

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
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password, userType);
    setIsLoading(false);

    if (error) {
      // Error will be handled by AuthContext and displayed via ErrorMessage
      console.log('Registration error:', error.message);
    } else {
      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={['#F8FBFF', '#F2F6FB', '#EDF2F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <ThemedView variant="container" style={styles.page}>
          <GlassView style={styles.glassCard}>
            <View style={styles.header}>
              <ThemedText type="h1">Create {userType === 'handyman' ? 'Handyman' : 'Customer'} Account</ThemedText>
              <ThemedText style={styles.subtitle}>
                {userType === 'handyman'
                  ? 'Join our platform to offer your services and earn money'
                  : 'Find skilled handymen for your urgent tasks'}
              </ThemedText>
            </View>

            <ErrorMessage error={error} />

            <View style={styles.fieldGroup}>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={18} color={Colors[colorScheme ?? 'light'].tabIconDefault} style={styles.leadingIcon} />
                <TextInput
                  style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                  value={email}
                  onChangeText={handleFieldChange(setEmail)}
                  placeholder="Email"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color={Colors[colorScheme ?? 'light'].tabIconDefault} style={styles.leadingIcon} />
                <TextInput
                  style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                  value={password}
                  onChangeText={handleFieldChange(setPassword)}
                  placeholder="Password (min. 6 characters)"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color={Colors[colorScheme ?? 'light'].tabIconDefault} style={styles.leadingIcon} />
                <TextInput
                  style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                  value={confirmPassword}
                  onChangeText={handleFieldChange(setConfirmPassword)}
                  placeholder="Confirm password"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                />
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.cta,
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  opacity: pressed || isLoading ? 0.9 : 1,
                  transform: [{ translateY: pressed ? 1 : 0 }],
                },
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </Pressable>

            <View style={styles.footerRow}>
              <ThemedText style={{ opacity: 0.8 }}>Already have an account?</ThemedText>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <ThemedText type="defaultSemiBold" style={styles.link}>Sign in</ThemedText>
              </Pressable>
            </View>
          </GlassView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingVertical: 24 },
  page: { flex: 1 },
  glassCard: { padding: 22, gap: 18, maxWidth: 520, alignSelf: 'center' },
  header: { gap: 6, alignItems: 'center' },
  subtitle: { opacity: 0.75, textAlign: 'center' },
  fieldGroup: { gap: 14 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  leadingIcon: { marginRight: 10, opacity: 0.8 },
  input: { flex: 1, height: '100%', fontSize: 16 },
  cta: { height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  footerRow: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  link: { fontSize: 14, fontWeight: '600', color: Colors.light.tint },
});
