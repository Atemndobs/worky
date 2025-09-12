import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassView } from '@/components/ui/GlassView';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, error, clearError } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) clearError();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (error) clearError();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn(email, password);
      if (!result.error) {
        router.replace('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <LinearGradient
        colors={
          isDark
            ? ['#0B0C0D', '#0F1214', '#121416']
            : ['#F8FBFF', '#F2F6FB', '#EDF2F7']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ThemedView variant="container" style={styles.page}>
          <GlassView style={styles.glassCard}>
            <View style={styles.headerArea}>
              <ThemedText type="h1">Sign in</ThemedText>
              <ThemedText style={styles.muted}>Welcome back to Worky</ThemedText>
            </View>

            {error && (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={20} color="#FF3B30" style={{ marginRight: 8 }} />
                <ThemedText style={{ color: '#FF3B30' }}>{error}</ThemedText>
              </View>
            )}

            <View style={styles.fieldGroup}>
              <View style={styles.inputRow}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={Colors[colorScheme ?? 'light'].tabIconDefault}
                  style={styles.leadingIcon}
                />
                <TextInput
                  style={[styles.input, { color: Colors[colorScheme ?? 'light'].text }]}
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={Colors[colorScheme ?? 'light'].tabIconDefault}
                  style={styles.leadingIcon}
                />
                <TextInput
                  style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, flex: 1 }]}
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Password"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={10} style={styles.trailingIcon}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={Colors[colorScheme ?? 'light'].tabIconDefault}
                  />
                </Pressable>
              </View>

              <Pressable onPress={() => router.push('/(auth)/forgot-password')} hitSlop={10}>
                <ThemedText style={[styles.link, { color: Colors[colorScheme ?? 'light'].tint }]}>Forgot password?</ThemedText>
              </Pressable>
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
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <ThemedText type="defaultSemiBold" style={{ color: '#000' }}>
                  Sign In
                </ThemedText>
              )}
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={[styles.hr, { borderColor: Colors[colorScheme ?? 'light'].border }]} />
              <ThemedText style={{ opacity: 0.7 }}>or</ThemedText>
              <View style={[styles.hr, { borderColor: Colors[colorScheme ?? 'light'].border }]} />
            </View>

            <View style={styles.socialRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    borderColor: Colors[colorScheme ?? 'light'].border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                onPress={() => handleSocialLogin('Apple')}
              >
                <Ionicons name="logo-apple" size={20} color={isDark ? '#fff' : '#000'} />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    borderColor: Colors[colorScheme ?? 'light'].border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.socialButton,
                  {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    borderColor: Colors[colorScheme ?? 'light'].border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
              </Pressable>
            </View>

            <View style={styles.footerRow}>
              <ThemedText style={{ opacity: 0.8 }}>Don’t have an account?</ThemedText>
              <Pressable onPress={() => router.push('/(auth)/welcome')} hitSlop={10}>
                <ThemedText type="defaultSemiBold" style={[styles.link, { color: Colors[colorScheme ?? 'light'].tint }]}>Sign up</ThemedText>
              </Pressable>
            </View>
          </GlassView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  kav: { flex: 1 },
  page: { flex: 1, paddingVertical: 32 },
  glassCard: {
    padding: 22,
    gap: 18,
    // Subtle inner layout width for large screens
    maxWidth: 480,
    alignSelf: 'center',
  },
  headerArea: { gap: 6, alignItems: 'center' },
  muted: { opacity: 0.75 },
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
  trailingIcon: { marginLeft: 8, padding: 4 },
  input: { flex: 1, height: '100%', fontSize: 16 },
  link: { fontSize: 14, fontWeight: '600' },
  cta: {
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hr: { flex: 1, borderTopWidth: 1 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 59, 48, 0.12)',
    borderRadius: 12,
    padding: 10,
  },
});
