import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function HomeScreen() {
  const { session, userType, hasSelectedRegion, hasCompletedWorkSetup, isLoading } = useAuth();

  // Check if user should be here - but don't create navigation loops
  useEffect(() => {
    console.log('🏠 TABS INDEX - Auth check (no auto-redirect):', {
      session: !!session,
      userType,
      hasSelectedRegion,
      hasCompletedWorkSetup,
      isLoading
    });
  }, [session, userType, hasSelectedRegion, hasCompletedWorkSetup, isLoading]);

  // If user shouldn't be here, show message instead of redirecting
  if (!isLoading && (!session || !userType || !hasSelectedRegion || (userType === 'handyman' && !hasCompletedWorkSetup))) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Authentication Required</ThemedText>
        <ThemedText style={styles.subtitle}>Please complete your profile setup first.</ThemedText>
        <Pressable 
          style={styles.redirectButton}
          onPress={() => {
            console.log('🔄 Manual redirect to main auth flow');
            router.replace('/');
          }}
        >
          <ThemedText style={styles.buttonText}>Go to Profile Setup</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  // Authenticated and set up: simple, clean home content (no template)
  return (
    <ThemedView style={styles.page}>
      <View style={styles.headerSection}>
        <ThemedText type="h1">Welcome to Worky</ThemedText>
        <ThemedText style={styles.subheader}>
          Book handymen instantly or manage your slots with ease.
        </ThemedText>
      </View>

      <View style={styles.grid}>
        <Card>
          <ThemedText type="h3">Profile Status</ThemedText>
          <ThemedText>
            Account Type: {userType === 'customer' ? 'Customer' : 'Handyman'}
          </ThemedText>
          <ThemedText>Region: {hasSelectedRegion ? 'Selected' : 'Not Selected'}</ThemedText>
          {userType === 'handyman' && (
            <ThemedText>
              Setup: {hasCompletedWorkSetup ? 'Complete' : 'Incomplete'}
            </ThemedText>
          )}
        </Card>

        <Card>
          <ThemedText type="h3">Next Steps</ThemedText>
          {userType === 'customer' ? (
            <Button title="Explore Available Slots" onPress={() => router.push('/(customer)/dashboard')} />
          ) : (
            <Button title="Manage Time Slots" onPress={() => router.push('/(handyman)/time-slots')} />
          )}
        </Card>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  page: {
    flex: 1,
    gap: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  redirectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerSection: {
    gap: 6,
  },
  subheader: {
    opacity: 0.8,
  },
  grid: {
    gap: 16,
  },
});
