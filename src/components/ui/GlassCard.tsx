import React from 'react';
import { View, ViewProps } from 'react-native';

interface RevolutCardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  children: React.ReactNode;
}

export default function RevolutCard({ 
  variant = 'default',
  children, 
  style, 
  ...props 
}: RevolutCardProps) {
  const getCardStyle = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: '#1C1C1E',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          elevation: 8,
        };
      case 'outlined':
        return {
          backgroundColor: '#000',
          borderWidth: 1,
          borderColor: '#2C2C2E',
        };
      default:
        return {
          backgroundColor: '#1C1C1E',
        };
    }
  };

  return (
    <View 
      style={[
        {
          borderRadius: 12,
          padding: 20,
          ...getCardStyle(),
        }, 
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
}