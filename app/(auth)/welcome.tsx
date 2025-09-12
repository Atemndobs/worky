import { View, StyleSheet, Image, Pressable, Modal, ScrollView, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  const handleSignUp = () => {
    router.push('/(auth)/register');
  };

  return (
    <ThemedView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={[styles.logoContainer, isDark && styles.logoContainerDark]}>
              <Image
                source={require('@/assets/images/icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <ThemedText type="title" style={styles.title}>
              Welcome to Worky
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Find trusted local handymen or offer your services
            </ThemedText>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                pressed && styles.buttonPressed
              ]}
              onPress={handleSignIn}
            >
              <ThemedText style={styles.buttonText} type="button">
                Sign In
              </ThemedText>
            </Pressable>
            
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.buttonPressed
              ]}
              onPress={() => setShowUserTypeSelection(true)}
            >
              <ThemedText 
                style={[styles.buttonText, styles.secondaryButtonText]} 
                type="button"
              >
                Create Account
              </ThemedText>
            </Pressable>
            
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <ThemedText style={styles.dividerText} type="defaultSemiBold">
                or continue with
              </ThemedText>
              <View style={styles.divider} />
            </View>
            
            <View style={styles.socialButtonsContainer}>
              <Pressable 
                style={[styles.socialButton, isDark && styles.socialButtonDark]}
                onPress={() => {}}
              >
                <Ionicons name="logo-google" size={24} color={isDark ? '#fff' : '#4285F4'} />
              </Pressable>
              <Pressable 
                style={[styles.socialButton, isDark && styles.socialButtonDark]}
                onPress={() => {}}
              >
                <Ionicons name="logo-apple" size={24} color={isDark ? '#fff' : '#000'} />
              </Pressable>
              <Pressable 
                style={[styles.socialButton, isDark && styles.socialButtonDark]}
                onPress={() => {}}
              >
                <Ionicons name="logo-facebook" size={24} color={isDark ? '#fff' : '#1877F2'} />
              </Pressable>
            </View>
          </View>

          <Modal
            visible={showUserTypeSelection}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setShowUserTypeSelection(false)}
            accessible={true}
            accessibilityViewIsModal={true}
          >
            <Pressable 
              style={styles.modalOverlay}
              onPress={() => setShowUserTypeSelection(false)}
              accessible={false}
            >
              <Pressable 
                style={styles.modalContent}
                onPress={() => {}}
                accessible={true}
                accessibilityLabel="Choose your account type"
              >
                <ThemedText type="defaultSemiBold" style={styles.modalTitle}>
                  Choose Your Account Type
                </ThemedText>
                
                <Pressable
                  style={[
                    styles.modalButton,
                    { backgroundColor: '#007AFF' }
                  ]}
                  onPress={() => {
                    setShowUserTypeSelection(false);
                    router.push('/(auth)/register?type=handyman');
                  }}
                >
                  <ThemedText style={[styles.modalButtonText, { color: '#fff' }]} type="defaultSemiBold">
                    I&apos;m a Handyman
                  </ThemedText>
                  <ThemedText style={[styles.modalButtonDescription, { color: '#fff' }]} type="default">
                    List your available time slots and earn money
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={[
                    styles.modalButton,
                    { backgroundColor: '#fff', borderColor: '#007AFF', borderWidth: 2 }
                  ]}
                  onPress={() => {
                    setShowUserTypeSelection(false);
                    router.push('/(auth)/register?type=customer');
                  }}
                >
                  <ThemedText style={[styles.modalButtonText, { color: '#007AFF' }]} type="defaultSemiBold">
                    I&apos;m a Customer
                  </ThemedText>
                  <ThemedText style={[styles.modalButtonDescription, { color: '#007AFF' }]} type="default">
                    Find immediate help for urgent tasks
                  </ThemedText>
                </Pressable>

                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setShowUserTypeSelection(false)}
                >
                  <ThemedText style={[styles.cancelButtonText, { color: '#007AFF' }]} type="defaultSemiBold">
                    Cancel
                  </ThemedText>
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText} type="defaultSemiBold">
              By continuing, you agree to our{' '}
              <ThemedText 
                style={[styles.link, isDark && styles.linkDark]} 
                type="defaultSemiBold"
                onPress={() => {}}
              >
                Terms of Service
              </ThemedText>{' '}
              and{' '}
              <ThemedText 
                style={[styles.link, isDark && styles.linkDark]} 
                type="defaultSemiBold"
                onPress={() => {}}
              >
                Privacy Policy
              </ThemedText>
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  logoContainerDark: {
    backgroundColor: '#2a2a2a',
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
    maxWidth: '90%',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  dividerText: {
    marginHorizontal: 12,
    opacity: 0.7,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonDark: {
    backgroundColor: '#333',
  },
  footer: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 18,
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'none',
  },
  linkDark: {
    color: '#0a84ff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalButtonText: {
    fontSize: 16,
    marginBottom: 4,
  },
  modalButtonDescription: {
    fontSize: 14,
    opacity: 0.9,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 16,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
});