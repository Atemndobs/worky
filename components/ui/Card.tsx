import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { shadowPresets } from '@/utils/shadows';

interface CardProps extends PropsWithChildren {
  padded?: boolean;
}

export function Card({ children, padded = true }: CardProps) {
  const scheme = useColorScheme() ?? 'light';
  return (
    <View
      style={[
        styles.base,
        Platform.OS === 'web' ? shadowPresets.small : {},
        { backgroundColor: Colors[scheme].surface, borderColor: Colors[scheme].border },
        padded && styles.padded,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    borderWidth: 1,
  },
  padded: {
    padding: 16,
  },
});

