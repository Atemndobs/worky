import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export interface GlassViewProps extends PropsWithChildren {
  style?: ViewStyle | ViewStyle[];
  intensity?: number; // 0-100
}

export function GlassView({ children, style, intensity = 30 }: GlassViewProps) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  // Shared glass surface style
  const surface: ViewStyle = {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: scheme === 'light' ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.12)',
    backgroundColor: scheme === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(22,22,24,0.55)',
  };

  if (Platform.OS === 'web') {
    return (
      <View
        style={[
          surface,
          styles.webGlass,
          { color: c.text },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={intensity} tint={scheme === 'dark' ? 'dark' : 'light'} style={[surface, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  webGlass: {
    // Provide a frosted glass effect on web
    backdropFilter: 'saturate(160%) blur(16px)' as any,
  },
});

