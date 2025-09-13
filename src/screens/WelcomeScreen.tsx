import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { UserType } from '../types'
import { RootStackParamList } from '../navigation/AppNavigator'

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>

const { width, height } = Dimensions.get('window')

export function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenNavigationProp>()

  const handleSelectUserType = (userType: UserType) => {
    navigation.navigate('Auth', { userType })
  }

  return (
    <ImageBackground
      source={require('../../assets/gradient-background.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            {/* Logo/Brand */}
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Bolo</Text>
              <Text style={styles.subtitleText}>
                Connect with skilled handymen instantly
              </Text>
            </View>

            {/* User Type Selection */}
            <View style={styles.selectionContainer}>
              <Text style={styles.selectionTitle}>
                Choose your role
              </Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleSelectUserType('handyman')}
                  style={styles.userTypeButton}
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonIcon}>🔧</Text>
                    <View style={styles.buttonTextContainer}>
                      <Text style={styles.buttonTitle}>I'm a Handyman</Text>
                      <Text style={styles.buttonSubtitle}>Offer your services</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSelectUserType('customer')}
                  style={styles.userTypeButton}
                >
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonIcon}>🏠</Text>
                    <View style={styles.buttonTextContainer}>
                      <Text style={styles.buttonTitle}>I need help</Text>
                      <Text style={styles.buttonSubtitle}>Find skilled handymen</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                By continuing, you agree to our Terms & Service
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 32,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    fontSize: 16,
  },
  selectionContainer: {
    marginBottom: 32,
  },
  selectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  userTypeButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    height: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  buttonTextContainer: {
    alignItems: 'flex-start',
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  buttonSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  footerContainer: {
    textAlign: 'center',
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
    textAlign: 'center',
  },
})
