import React, { createContext, useContext, useState, ReactNode } from 'react'
import { UserType } from '../types'

interface AuthContextType {
  userType: UserType | null
  isAuthenticated: boolean
  setUserType: (userType: UserType) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userType, setUserTypeState] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setUserType = (newUserType: UserType) => {
    setUserTypeState(newUserType)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUserTypeState(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        userType,
        isAuthenticated,
        setUserType,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
