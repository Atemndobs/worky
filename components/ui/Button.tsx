import React from 'react';
import { Platform, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  style,
}: ButtonProps) {
  const scheme = useColorScheme() ?? 'light';

  return (
    <Pressable
      accessibilityRole={Platform.OS === 'web' ? 'button' : undefined}
      disabled={disabled}
      onPress={onPress}
      style={({ hovered, pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles(variant, scheme),
        Platform.OS === 'web' && { cursor: disabled ? 'not-allowed' : 'pointer' },
        hovered && !disabled && hoverStyles(variant, scheme),
        pressed && !disabled && { opacity: 0.9 },
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      <Text style={[styles.label, labelStyles(variant, scheme)]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
  },
  label: {
    fontWeight: '600',
    fontSize: Platform.OS === 'web' ? 14 : 15,
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  sm: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  md: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  lg: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
};

function variantStyles(variant: Variant, scheme: 'light' | 'dark'): ViewStyle {
  const c = Colors[scheme];
  switch (variant) {
    case 'primary':
      return { backgroundColor: c.primary, borderColor: 'transparent' };
    case 'secondary':
      return { backgroundColor: c.surface, borderColor: c.border };
    case 'ghost':
      return { backgroundColor: 'transparent', borderColor: c.border };
    case 'danger':
      return { backgroundColor: c.danger, borderColor: 'transparent' };
  }
}

function hoverStyles(variant: Variant, scheme: 'light' | 'dark'): ViewStyle {
  const c = Colors[scheme];
  switch (variant) {
    case 'primary':
      return { transform: [{ translateY: -1 }] };
    case 'secondary':
      return { backgroundColor: scheme === 'light' ? '#EEF1F3' : '#262A2D' };
    case 'ghost':
      return { backgroundColor: c.surface };
    case 'danger':
      return { transform: [{ translateY: -1 }] };
  }
}

function labelStyles(variant: Variant, scheme: 'light' | 'dark') {
  const c = Colors[scheme];
  switch (variant) {
    case 'primary':
    case 'danger':
      return { color: '#000' };
    case 'secondary':
    case 'ghost':
      return { color: c.text };
  }
}

