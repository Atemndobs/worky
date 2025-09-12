import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    // Web-forward extended types (non-breaking)
    | 'h1'
    | 'h2'
    | 'h3'
    | 'caption';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        baseFont,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        // Extended types
        type === 'h1' ? styles.h1 : undefined,
        type === 'h2' ? styles.h2 : undefined,
        type === 'h3' ? styles.h3 : undefined,
        type === 'caption' ? styles.caption : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

// Provide a system font stack on web for better rendering
const baseFont = Platform.select({
  web: {
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
    letterSpacing: 0.2,
  },
  default: {},
});

const styles = StyleSheet.create({
  default: {
    fontSize: Platform.OS === 'web' ? 15 : 16,
    lineHeight: Platform.OS === 'web' ? 22 : 24,
  },
  defaultSemiBold: {
    fontSize: Platform.OS === 'web' ? 15 : 16,
    lineHeight: Platform.OS === 'web' ? 22 : 24,
    fontWeight: '600',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 28 : 32,
    fontWeight: 'bold',
    lineHeight: Platform.OS === 'web' ? 32 : 32,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 18 : 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: Platform.OS === 'web' ? 26 : 30,
    fontSize: Platform.OS === 'web' ? 15 : 16,
    color: '#0a7ea4',
  },
  // Extended types for web-first design
  h1: {
    fontSize: Platform.OS === 'web' ? 34 : 34,
    lineHeight: Platform.OS === 'web' ? 40 : 40,
    fontWeight: '800',
  },
  h2: {
    fontSize: Platform.OS === 'web' ? 28 : 28,
    lineHeight: Platform.OS === 'web' ? 34 : 34,
    fontWeight: '700',
  },
  h3: {
    fontSize: Platform.OS === 'web' ? 22 : 22,
    lineHeight: Platform.OS === 'web' ? 28 : 28,
    fontWeight: '600',
  },
  caption: {
    fontSize: Platform.OS === 'web' ? 12 : 12,
    lineHeight: Platform.OS === 'web' ? 16 : 16,
    color: '#687076',
  },
});
