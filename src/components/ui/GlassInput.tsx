import React from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface RevolutInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function RevolutInput({ 
  label,
  error,
  style, 
  ...props 
}: RevolutInputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ 
          color: '#FFFFFF', 
          fontSize: 14, 
          fontWeight: '500',
          marginBottom: 8,
        }}>
          {label}
        </Text>
      )}
      <View style={[
        {
          backgroundColor: '#1C1C1E',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: error ? '#FF453A' : '#2C2C2E',
        }, 
        style
      ]}>
        <TextInput
          style={{
            paddingVertical: 16,
            paddingHorizontal: 16,
            color: '#FFFFFF',
            fontSize: 16,
            minHeight: 52,
          }}
          placeholderTextColor="#8E8E93"
          {...props}
        />
      </View>
      {error && (
        <Text style={{ 
          color: '#FF453A', 
          fontSize: 12, 
          marginTop: 6,
          marginLeft: 4,
        }}>
          {error}
        </Text>
      )}
    </View>
  );
}