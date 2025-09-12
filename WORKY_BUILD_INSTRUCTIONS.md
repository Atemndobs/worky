# 🔧 **Worky - Complete Build Instructions for v0/Lovable**

## **📱 App Overview**
**Worky** is a spontaneous handyman booking platform for Switzerland where handymen list last-minute availability and customers book instantly. Features auction system for high-demand slots.

## **🎯 Core Features to Build**

### **Phase 1 - MVP (Build First)**
- ✅ Authentication (handyman/customer roles)
- ✅ Handyman: Create time slots, manage bookings, dashboard
- ✅ Customer: Browse slots, instant booking, booking management  
- ✅ Real-time updates via Supabase
- ✅ Swiss region selection
- ✅ Mobile-responsive design

### **Phase 2 - Advanced Features**
- 🔄 Auction system for overlapping bookings
- 💬 In-app chat between customer/handyman
- ⭐ Reviews and ratings system
- 📅 Calendar integration (ICS export)

---

## **🛠️ Technology Stack**

### **Frontend Framework**
```bash
# Use React with TypeScript
- React 18+ with TypeScript
- Vite for build tool
- React Router for navigation
```

### **UI Components**
```bash
# Modern UI with shadcn/ui
- @shadcn/ui components
- Tailwind CSS for styling
- Lucide React for icons
- React Hook Form for forms
- Zod for validation
```

### **Backend & Database**
```bash
# Supabase for backend
- Supabase (PostgreSQL + Auth + Realtime)
- @supabase/supabase-js client
- Row Level Security (RLS) policies
```

### **Mobile Optimization**
```bash
# Progressive Web App
- PWA capabilities
- Mobile-first responsive design
- Touch-friendly interactions
- Offline support
```

---

## **📦 Dependencies to Install**

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "@supabase/supabase-js": "^2.39.0",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2",
    "zod": "^3.22.4",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.445.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.10",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## **🏗️ Project Structure**

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── auth/              # Authentication components
│   ├── handyman/          # Handyman-specific components
│   ├── customer/          # Customer-specific components
│   ├── shared/            # Shared components
│   └── layout/            # Layout components
├── pages/
│   ├── auth/              # Login, register, welcome
│   ├── handyman/          # Dashboard, slots, bookings
│   ├── customer/          # Browse, bookings, profile
│   └── shared/            # Settings, profile
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configs
│   ├── supabase.ts        # Supabase client
│   ├── auth.ts            # Auth utilities
│   └── utils.ts           # General utilities
├── types/                 # TypeScript type definitions
└── styles/                # Global styles
```

---

## **🗄️ Database Schema (Supabase SQL)**

### **1. Core Tables**
```sql
-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) CHECK (user_type IN ('handyman', 'customer')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Handyman profiles
CREATE TABLE handyman_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  region VARCHAR(100) NOT NULL,
  skills TEXT[] NOT NULL,
  description TEXT,
  phone VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time slots
CREATE TABLE time_slots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  handyman_id UUID REFERENCES users(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) CHECK (status IN ('open', 'booked', 'auction', 'canceled')) DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  handyman_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')) DEFAULT 'pending',
  total_price DECIMAL(10,2) NOT NULL,
  work_description TEXT,
  customer_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **2. Phase 2 Tables (Add Later)**
```sql
-- Auctions (Phase 2)
CREATE TABLE auctions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
  starting_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  winner_id UUID REFERENCES users(id),
  status VARCHAR(20) CHECK (status IN ('active', 'completed', 'canceled')) DEFAULT 'active',
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat system (Phase 2)
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews (Phase 2)
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  handyman_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **3. Row Level Security (RLS)**
```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE handyman_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Handyman profiles
CREATE POLICY "Anyone can view handyman profiles" ON handyman_profiles FOR SELECT TO authenticated;
CREATE POLICY "Handymen can manage own profile" ON handyman_profiles FOR ALL USING (auth.uid() = user_id);

-- Time slots
CREATE POLICY "Anyone can view open slots" ON time_slots FOR SELECT TO authenticated;
CREATE POLICY "Handymen can manage own slots" ON time_slots FOR ALL USING (auth.uid() = handyman_id);

-- Bookings
CREATE POLICY "Users can view own bookings" ON bookings 
  FOR SELECT TO authenticated 
  USING (auth.uid() = customer_id OR auth.uid() = handyman_id);
CREATE POLICY "Customers can create bookings" ON bookings 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = customer_id);
```

---

## **🎨 UI Components with shadcn/ui**

### **1. Install shadcn/ui**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input form select toast tabs badge avatar
```

### **2. Key Component Examples**

#### **Time Slot Card**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star } from "lucide-react"

interface TimeSlotCardProps {
  slot: {
    id: string
    start_time: string
    end_time: string
    handyman_name: string
    hourly_rate: number
    location: string
    rating: number
    skills: string[]
  }
  onBook: (slotId: string) => void
}

export function TimeSlotCard({ slot, onBook }: TimeSlotCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{slot.handyman_name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{slot.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {slot.location}
        </div>
        <div className="flex flex-wrap gap-1">
          {slot.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">CHF {slot.hourly_rate}/hr</span>
          <Button onClick={() => onBook(slot.id)}>
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

#### **Mobile Navigation**
```tsx
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Calendar, MessageSquare, User } from "lucide-react"

export function MobileNavigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16">
          <TabsTrigger value="dashboard" className="flex-col gap-1">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex-col gap-1">
            <Calendar className="h-5 w-5" />
            <span className="text-xs">Bookings</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex-col gap-1">
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-col gap-1">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
```

---

## **🔐 Authentication Setup**

### **1. Supabase Client**
```tsx
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: 'handyman' | 'customer'
          created_at: string
        }
      }
      // Add other table types
    }
  }
}
```

### **2. Auth Context**
```tsx
// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  userType: 'handyman' | 'customer' | null
  loading: boolean
  signUp: (email: string, password: string, userType: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userType, setUserType] = useState<'handyman' | 'customer' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserType(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserType(session.user.id)
        } else {
          setUserType(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserType = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('user_type')
      .eq('id', userId)
      .single()
    
    if (data) {
      setUserType(data.user_type)
    }
  }

  const signUp = async (email: string, password: string, userType: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { user_type: userType }
      }
    })
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUserType(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      userType,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

---

## **📱 Page Components**

### **1. Welcome Page (User Type Selection)**
```tsx
// pages/auth/Welcome.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Worky</h1>
          <p className="text-gray-600 mt-2">Find handymen or offer your services</p>
        </div>
        
        <div className="space-y-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate('/register/customer')}>
            <CardHeader className="text-center">
              <User className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <CardTitle>I need help</CardTitle>
              <CardDescription>Find handymen for urgent tasks</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate('/register/handyman')}>
            <CardHeader className="text-center">
              <Wrench className="h-12 w-12 mx-auto mb-2 text-green-600" />
              <CardTitle>I offer services</CardTitle>
              <CardDescription>List your availability and earn money</CardDescription>
            </CardHeader>
          </Card>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Button variant="link" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
```

### **2. Customer Dashboard**
```tsx
// pages/customer/Dashboard.tsx
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimeSlotCard } from "@/components/TimeSlotCard"
import { supabase } from '@/lib/supabase'
import { Search, Filter } from "lucide-react"

export function CustomerDashboard() {
  const [slots, setSlots] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedSkill, setSelectedSkill] = useState('all')

  useEffect(() => {
    fetchTimeSlots()
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('time_slots')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'time_slots'
      }, () => {
        fetchTimeSlots()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchTimeSlots = async () => {
    const { data } = await supabase
      .from('time_slots')
      .select(`
        *,
        handyman_profiles!inner(
          business_name,
          hourly_rate,
          region,
          skills
        )
      `)
      .eq('status', 'open')
      .gte('start_time', new Date().toISOString())
      .order('start_time')
    
    setSlots(data || [])
  }

  const handleBook = async (slotId: string) => {
    // Implement booking logic
    const slot = slots.find(s => s.id === slotId)
    // Navigate to booking form or show modal
  }

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.handyman_profiles.business_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === 'all' || 
      slot.handyman_profiles.region === selectedRegion
    const matchesSkill = selectedSkill === 'all' || 
      slot.handyman_profiles.skills.includes(selectedSkill)
    
    return matchesSearch && matchesRegion && matchesSkill
  })

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search handymen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="zurich">Zurich</SelectItem>
            <SelectItem value="bern">Bern</SelectItem>
            <SelectItem value="geneva">Geneva</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSlots.map((slot) => (
          <TimeSlotCard
            key={slot.id}
            slot={{
              id: slot.id,
              start_time: slot.start_time,
              end_time: slot.end_time,
              handyman_name: slot.handyman_profiles.business_name,
              hourly_rate: slot.handyman_profiles.hourly_rate,
              location: slot.handyman_profiles.region,
              rating: 4.5, // Calculate from reviews
              skills: slot.handyman_profiles.skills
            }}
            onBook={handleBook}
          />
        ))}
      </div>
    </div>
  )
}
```

### **3. Handyman Dashboard**
```tsx
// pages/handyman/Dashboard.tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export function HandymanDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    activeSlots: 0,
    pendingBookings: 0,
    totalEarnings: 0,
    completedJobs: 0
  })
  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    if (user) {
      fetchStats()
      fetchRecentBookings()
    }
  }, [user])

  const fetchStats = async () => {
    // Fetch various statistics
    const [slotsResult, bookingsResult, earningsResult] = await Promise.all([
      supabase.from('time_slots').select('*').eq('handyman_id', user.id).eq('status', 'open'),
      supabase.from('bookings').select('*').eq('handyman_id', user.id).eq('status', 'pending'),
      supabase.from('bookings').select('total_price').eq('handyman_id', user.id).eq('status', 'completed')
    ])
    
    setStats({
      activeSlots: slotsResult.data?.length || 0,
      pendingBookings: bookingsResult.data?.length || 0,
      totalEarnings: earningsResult.data?.reduce((sum, b) => sum + Number(b.total_price), 0) || 0,
      completedJobs: earningsResult.data?.length || 0
    })
  }

  const fetchRecentBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        users!bookings_customer_id_fkey(email)
      `)
      .eq('handyman_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
    
    setRecentBookings(data || [])
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Slots</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSlots}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBookings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CHF {stats.totalEarnings}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedJobs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{booking.users.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={
                    booking.status === 'pending' ? 'secondary' :
                    booking.status === 'confirmed' ? 'default' :
                    booking.status === 'completed' ? 'success' : 'destructive'
                  }>
                    {booking.status}
                  </Badge>
                  <p className="text-sm font-medium">CHF {booking.total_price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## **🔄 Real-time Features**

### **Real-time Slot Updates**
```tsx
// hooks/useRealTimeSlots.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useRealTimeSlots() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    fetchSlots()

    const subscription = supabase
      .channel('time_slots_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'time_slots'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setSlots(prev => [...prev, payload.new])
        } else if (payload.eventType === 'UPDATE') {
          setSlots(prev => prev.map(slot => 
            slot.id === payload.new.id ? payload.new : slot
          ))
        } else if (payload.eventType === 'DELETE') {
          setSlots(prev => prev.filter(slot => slot.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchSlots = async () => {
    const { data } = await supabase
      .from('time_slots')
      .select('*')
      .eq('status', 'open')
    setSlots(data || [])
  }

  return slots
}
```

---

## **📱 Mobile Responsive Design**

### **Tailwind CSS Configuration**
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### **Mobile-First Components**
```tsx
// Mobile-optimized layout
export function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        {/* Header content */}
      </header>
      
      <main className="pb-20 md:pb-4">
        {children}
      </main>
      
      <MobileNavigation />
    </div>
  )
}
```

---

## **🚀 Implementation Steps**

### **Phase 1 - Core MVP (Week 1-2)**
1. **Setup Project**: Initialize with Vite + React + TypeScript
2. **Install Dependencies**: shadcn/ui, Supabase, React Router
3. **Setup Database**: Create tables, RLS policies, triggers
4. **Authentication**: Implement auth flow with role selection
5. **Basic UI**: Welcome, login, register pages
6. **Handyman Features**: Dashboard, create slots, manage bookings
7. **Customer Features**: Browse slots, instant booking
8. **Real-time**: Implement live updates with Supabase

### **Phase 2 - Enhanced Features (Week 3-4)**
1. **Auction System**: Add auction logic and UI
2. **Chat System**: Real-time messaging between users
3. **Reviews**: Rating and review system
4. **Calendar Integration**: ICS export functionality
5. **Mobile Optimization**: PWA, touch interactions
6. **Polish**: Animations, loading states, error handling

### **Phase 3 - Production Ready (Week 5-6)**
1. **Testing**: Unit tests, integration tests
2. **Performance**: Optimize bundle size, lazy loading
3. **Security**: Additional validation, rate limiting
4. **Deployment**: Vercel/Netlify deployment
5. **Monitoring**: Error tracking, analytics

---

## **⚙️ Environment Setup**

### **.env File**
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_APP_URL=http://localhost:5173
```

### **Package.json Scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

---

## **🎯 Key Success Factors**

### **1. Mobile-First Design**
- Touch-friendly buttons (min 44px)
- Optimized for one-handed use
- Fast loading on mobile networks
- PWA capabilities for app-like experience

### **2. Real-time User Experience**
- Instant slot availability updates
- Live booking notifications
- Real-time auction bidding
- Seamless synchronization across devices

### **3. Swiss Market Focus**
- Multi-language support (German, French, Italian)
- Swiss region selection
- CHF currency formatting
- Local business regulations compliance

### **4. Security & Trust**
- Secure authentication flow
- Data protection compliance
- User verification systems
- Transparent rating system

---

## **🚨 Critical Considerations**

### **Performance**
- Implement lazy loading for large lists
- Optimize image loading and caching
- Use React.memo for expensive components
- Implement proper error boundaries

### **Accessibility**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### **SEO & Discovery**
- Server-side rendering consideration
- Meta tags optimization
- Structured data for local businesses
- Google Business integration

This comprehensive guide provides everything needed to build Worky from scratch using modern web technologies with mobile-first design principles. The architecture is scalable, the UI is modern with shadcn/ui, and the real-time features provide an excellent user experience.