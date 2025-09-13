import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { UserType } from '../types'
import { RootStackParamList } from '../navigation/AppNavigator'
import { useAuth } from '../contexts/AuthContext'

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>
type AuthScreenRouteProp = RouteProp<RootStackParamList, 'Auth'>

export function AuthScreen() {
  const navigation = useNavigation<AuthScreenNavigationProp>()
  const route = useRoute<AuthScreenRouteProp>()
  const { setUserType } = useAuth()
  const { userType } = route.params
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup')
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: '',
    email: '',
    phoneNumber: '(775) 351-6501',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setUserType(userType)
      if (userType === 'handyman') {
        navigation.navigate('HandymanDashboard')
      } else {
        navigation.navigate('CustomerDashboard')
      }
    }, 2000)
  }

  const userTypeTitle = userType === 'handyman' ? 'Handyman' : 'Customer'
  const userTypeIcon = userType === 'handyman' ? '🔧' : '🏠'

  return (
    <ImageBackground
      source={require('../../assets/gradient-background.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Header with tabs and close button */}
              <View style={styles.header}>
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    onPress={() => setActiveTab('signup')}
                    style={[
                      styles.tab,
                      activeTab === 'signup' && styles.activeTab
                    ]}
                  >
                    <Text style={[
                      styles.tabText,
                      activeTab === 'signup' && styles.activeTabText
                    ]}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setActiveTab('signin')}
                    style={[
                      styles.tab,
                      activeTab === 'signin' && styles.activeTab
                    ]}
                  >
                    <Text style={[
                      styles.tabText,
                      activeTab === 'signin' && styles.activeTabText
                    ]}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  onPress={() => navigation.goBack()} 
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Title - Only show for sign in */}
              {activeTab === 'signin' && (
                <Text style={styles.title}>
                  Welcome back
                </Text>
              )}

              {/* Form */}
              <View style={styles.formContainer}>
                {activeTab === 'signup' && (
                  <View style={styles.nameRow}>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        value={formData.firstName}
                        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                        placeholder="First name"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        value={formData.lastName}
                        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                        placeholder="Last name"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <Text style={styles.inputIcon}>✉</Text>
                  <TextInput
                    style={[styles.input, styles.inputWithIcon]}
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    placeholder="Enter your email"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {activeTab === 'signup' && (
                  <View style={styles.inputContainer}>
                    <View style={styles.flagContainer}>
                      <View style={styles.flag}>
                        <View style={styles.flagRed} />
                        <View style={styles.flagBlue} />
                        <View style={styles.flagWhite} />
                      </View>
                      <Text style={styles.inputIcon}>▼</Text>
                    </View>
                    <TextInput
                      style={[styles.input, styles.inputWithIcon]}
                      value={formData.phoneNumber}
                      onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                      placeholder="Phone number"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      keyboardType="phone-pad"
                    />
                  </View>
                )}

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.password}
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                  >
                    <Text style={styles.inputIcon}>
                      {showPassword ? '👁' : '👁‍🗨'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {activeTab === 'signup' && (
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={formData.confirmPassword}
                      onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                      placeholder="Confirm password"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      secureTextEntry={!showPassword}
                    />
                  </View>
                )}

                {activeTab === 'signin' && (
                  <View style={styles.optionsRow}>
                    <TouchableOpacity style={styles.checkboxContainer}>
                      <View style={styles.checkbox} />
                      <Text style={styles.checkboxText}>Remember me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.forgotPassword}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isLoading}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>
                  {isLoading ? 'Please wait...' : (activeTab === 'signup' ? 'Create an account' : 'Sign in')}
                </Text>
              </TouchableOpacity>

              {/* Social Login */}
              <View style={styles.socialContainer}>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>
                    {activeTab === 'signup' ? 'OR SIGN IN WITH' : 'OR CONTINUE WITH'}
                  </Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtons}>
                  <TouchableOpacity style={styles.socialButton}>
                    <View style={styles.googleIcon}>
                      <Text style={styles.googleText}>G</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.appleIcon}>🍎</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButtonText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'normal',
    color: '#ffffff',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 32,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 16,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  flagContainer: {
    position: 'absolute',
    left: 16,
    top: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  flagRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: 16,
    backgroundColor: '#ef4444',
  },
  flagBlue: {
    position: 'absolute',
    top: 0,
    left: 8,
    width: 8,
    height: 16,
    backgroundColor: '#3b82f6',
  },
  flagWhite: {
    position: 'absolute',
    top: 0,
    left: 16,
    width: 8,
    height: 16,
    backgroundColor: '#ffffff',
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginRight: 8,
  },
  checkboxText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  forgotPassword: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  socialContainer: {
    marginBottom: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285f4',
  },
  appleIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
})
