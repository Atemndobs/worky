/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // Extended tokens for modern web UI
    surface: '#F8F9FA',
    muted: '#868E96',
    border: '#E9ECEF',
    primary: '#0a7ea4',
    success: '#2BA272',
    danger: '#D64545',
    warning: '#E3A008',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Extended tokens for modern web UI
    surface: '#1C1F21',
    muted: '#A1A8AD',
    border: '#2A2E31',
    primary: '#7ED3F7',
    success: '#5AD7A0',
    danger: '#FF7B7B',
    warning: '#FFD166',
  },
};
