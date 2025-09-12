import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  children: React.ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <View style={styles.container}>
      {/* Base dark layer */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={["#000000", "#0a0a0a"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Subtle glossy sheen from top */}
        <LinearGradient
          colors={["rgba(255,255,255,0.06)", "rgba(255,255,255,0)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.25 }}
          style={styles.gloss}
        />

        {/* Soft diagonal color glow for glassy look */}
        <LinearGradient
          colors={["rgba(88, 101, 242, 0.12)", "rgba(255, 0, 128, 0.08)", "rgba(0,0,0,0)"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      {/* App content */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
  },
});