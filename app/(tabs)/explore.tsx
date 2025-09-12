import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Card } from '@/components/ui/Card';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.page}>
      <View style={styles.header}>
        <ThemedText type="h1">Explore</ThemedText>
        <ThemedText style={styles.subheader}>Find available slots and nearby handymen.</ThemedText>
      </View>

      <View style={styles.grid}>
        <Card>
          <ThemedText type="h3">Coming Soon</ThemedText>
          <ThemedText>
            This screen will show search, filters, and real-time availability.
          </ThemedText>
        </Card>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, gap: 24, paddingVertical: 24 },
  header: { gap: 6 },
  subheader: { opacity: 0.8 },
  grid: { gap: 16 },
});
