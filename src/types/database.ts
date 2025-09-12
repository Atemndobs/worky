export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: 'handyman' | 'customer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          user_type: 'handyman' | 'customer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: 'handyman' | 'customer'
          created_at?: string
          updated_at?: string
        }
      }
      handyman_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          hourly_rate: number
          region: string
          skills: string[]
          description: string | null
          phone: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          hourly_rate: number
          region: string
          skills: string[]
          description?: string | null
          phone?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          hourly_rate?: number
          region?: string
          skills?: string[]
          description?: string | null
          phone?: string | null
          created_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          handyman_id: string
          start_time: string
          end_time: string
          status: 'open' | 'booked' | 'auction' | 'canceled'
          created_at: string
        }
        Insert: {
          id?: string
          handyman_id: string
          start_time: string
          end_time: string
          status?: 'open' | 'booked' | 'auction' | 'canceled'
          created_at?: string
        }
        Update: {
          id?: string
          handyman_id?: string
          start_time?: string
          end_time?: string
          status?: 'open' | 'booked' | 'auction' | 'canceled'
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          slot_id: string
          customer_id: string
          handyman_id: string
          status: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price: number
          work_description: string | null
          customer_address: string
          created_at: string
        }
        Insert: {
          id?: string
          slot_id: string
          customer_id: string
          handyman_id: string
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price: number
          work_description?: string | null
          customer_address: string
          created_at?: string
        }
        Update: {
          id?: string
          slot_id?: string
          customer_id?: string
          handyman_id?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price?: number
          work_description?: string | null
          customer_address?: string
          created_at?: string
        }
      }
    }
  }
}

export type UserType = 'handyman' | 'customer'
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled'
export type SlotStatus = 'open' | 'booked' | 'auction' | 'canceled'