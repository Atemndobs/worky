---
type: always_apply
---

# TypeScript and Coding Standards

## Language Preferences
- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Use proper typing for all variables, parameters, and return values

## Component Development
- Use functional components with hooks
- Use React Context for state management instead of Redux/MobX
- Follow existing patterns in the codebase
- Use ThemedText and ThemedView for consistent UI

## Service Development
- Create services in `lib/` directory with `*-service.ts` naming
- Use async/await for asynchronous operations
- Handle errors appropriately with try/catch
- Follow existing service patterns

## Styling
- Use StyleSheet for styling
- Use Themed components for consistent dark/light mode
- Follow existing styling patterns in the codebase
- Ensure accessibility (touch targets ≥44px, labels for inputs)

## Performance
- Memoize heavy lists with useMemo or React.memo
- Avoid unnecessary re-renders
- Keep bundle size lean
- Use useCallback for event handlers passed to child components

## Example Patterns

Component example:
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText, ThemedView } from '@/components/ThemedText';

interface Props {
  title: string;
  onPress: () => void;
}

export const MyComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      <TouchableOpacity onPress={onPress}>
        <ThemedText>Press me</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

Service example:
```typescript
import { supabase } from '@/lib/supabase';

interface Slot {
  id: string;
  handyman_id: string;
  start_time: string;
  end_time: string;
}

export const slotService = {
  async getAvailableSlots(): Promise<Slot[]> {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('status', 'open');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  },
};
```