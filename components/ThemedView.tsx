import { Platform, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // Optional variant to control layout behavior, esp. on web
  variant?: 'container' | 'plain';
};

export function ThemedView({ style, lightColor, darkColor, variant, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const isWeb = Platform.OS === 'web';
  const resolvedVariant = variant ?? (isWeb ? 'container' : 'plain');

  const containerStyle = isWeb && resolvedVariant === 'container'
    ? {
        // Modern web-centered layout defaults
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
        paddingHorizontal: 24,
        backgroundColor,
      }
    : { backgroundColor };

  return <View style={[containerStyle, style]} {...otherProps} />;
}
