import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface RevolutButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function RevolutButton({ 
  title, 
  variant = 'primary', 
  loading = false,
  size = 'md',
  style, 
  disabled,
  ...props 
}: RevolutButtonProps) {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#007AFF',
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: '#2C2C2E',
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#2C2C2E',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {
          backgroundColor: '#007AFF',
          borderWidth: 0,
        };
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: 10, paddingHorizontal: 16 };
      case 'md':
        return { paddingVertical: 14, paddingHorizontal: 24 };
      case 'lg':
        return { paddingVertical: 18, paddingHorizontal: 32 };
      default:
        return { paddingVertical: 14, paddingHorizontal: 24 }; // fallback to 'md'
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'md':
        return 16;
      case 'lg':
        return 18;
      default:
        return 16; // fallback to 'md'
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
        return '#FFFFFF';
      case 'ghost':
        return '#8E8E93';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity 
      style={[
        { 
          borderRadius: 12,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          opacity: disabled || loading ? 0.5 : 1,
          ...getButtonStyle(),
          ...getPadding(),
        }, 
        style
      ]} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator 
          color={getTextColor()} 
          size="small" 
          style={{ marginRight: 8 }} 
        />
      )}
      <Text 
        style={{ 
          color: getTextColor(), 
          fontWeight: '600',
          fontSize: getTextSize(),
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}