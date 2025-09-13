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
          default_auction_duration: number
          min_bid_increment: number
          calendar_integration_enabled: boolean
          auto_confirm_calendar_bookings: boolean
          created_at: string
          updated_at: string
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
          default_auction_duration?: number
          min_bid_increment?: number
          calendar_integration_enabled?: boolean
          auto_confirm_calendar_bookings?: boolean
          created_at?: string
          updated_at?: string
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
          default_auction_duration?: number
          min_bid_increment?: number
          calendar_integration_enabled?: boolean
          auto_confirm_calendar_bookings?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      time_slots: {
        Row: {
          id: string
          handyman_id: string
          start_time: string
          end_time: string
          status: 'open' | 'booked' | 'auction' | 'canceled'
          calendar_event_id: string | null
          is_synced_to_calendar: boolean
          booking_type: 'calendar' | 'auction' | 'both'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          handyman_id: string
          start_time: string
          end_time: string
          status?: 'open' | 'booked' | 'auction' | 'canceled'
          calendar_event_id?: string | null
          is_synced_to_calendar?: boolean
          booking_type?: 'calendar' | 'auction' | 'both'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          handyman_id?: string
          start_time?: string
          end_time?: string
          status?: 'open' | 'booked' | 'auction' | 'canceled'
          calendar_event_id?: string | null
          is_synced_to_calendar?: boolean
          booking_type?: 'calendar' | 'auction' | 'both'
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          slot_id: string | null
          customer_id: string
          handyman_id: string
          status: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price: number
          work_description: string | null
          customer_address: string
          booking_type: 'calendar' | 'auction'
          auction_id: string | null
          winning_bid_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slot_id?: string | null
          customer_id: string
          handyman_id: string
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price: number
          work_description?: string | null
          customer_address: string
          booking_type?: 'calendar' | 'auction'
          auction_id?: string | null
          winning_bid_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slot_id?: string | null
          customer_id?: string
          handyman_id?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'canceled'
          total_price?: number
          work_description?: string | null
          customer_address?: string
          booking_type?: 'calendar' | 'auction'
          auction_id?: string | null
          winning_bid_amount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      auctions: {
        Row: {
          id: string
          handyman_id: string
          title: string
          description: string | null
          service_type: string
          region: string
          start_time: string
          end_time: string
          starting_price: number
          reserve_price: number | null
          current_highest_bid: number
          current_highest_bidder_id: string | null
          bid_increment: number
          ends_at: string
          status: 'active' | 'ended' | 'cancelled'
          winner_id: string | null
          auto_extend: boolean
          auto_extend_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          handyman_id: string
          title: string
          description?: string | null
          service_type: string
          region: string
          start_time: string
          end_time: string
          starting_price: number
          reserve_price?: number | null
          current_highest_bid?: number
          current_highest_bidder_id?: string | null
          bid_increment?: number
          ends_at: string
          status?: 'active' | 'ended' | 'cancelled'
          winner_id?: string | null
          auto_extend?: boolean
          auto_extend_minutes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          handyman_id?: string
          title?: string
          description?: string | null
          service_type?: string
          region?: string
          start_time?: string
          end_time?: string
          starting_price?: number
          reserve_price?: number | null
          current_highest_bid?: number
          current_highest_bidder_id?: string | null
          bid_increment?: number
          ends_at?: string
          status?: 'active' | 'ended' | 'cancelled'
          winner_id?: string | null
          auto_extend?: boolean
          auto_extend_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
      auction_bids: {
        Row: {
          id: string
          auction_id: string
          bidder_id: string
          bid_amount: number
          bid_time: string
          is_winning_bid: boolean
          created_at: string
        }
        Insert: {
          id?: string
          auction_id: string
          bidder_id: string
          bid_amount: number
          bid_time?: string
          is_winning_bid?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          auction_id?: string
          bidder_id?: string
          bid_amount?: number
          bid_time?: string
          is_winning_bid?: boolean
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'auction_outbid' | 'auction_won' | 'auction_ended' | 'auction_lost' | 'booking_confirmed' | 'booking_cancelled' | 'booking_completed' | 'calendar_booking_request' | 'auction_ending_soon'
          title: string
          message: string
          data: any | null
          read_at: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'auction_outbid' | 'auction_won' | 'auction_ended' | 'auction_lost' | 'booking_confirmed' | 'booking_cancelled' | 'booking_completed' | 'calendar_booking_request' | 'auction_ending_soon'
          title: string
          message: string
          data?: any | null
          read_at?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'auction_outbid' | 'auction_won' | 'auction_ended' | 'auction_lost' | 'booking_confirmed' | 'booking_cancelled' | 'booking_completed' | 'calendar_booking_request' | 'auction_ending_soon'
          title?: string
          message?: string
          data?: any | null
          read_at?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      calendar_integrations: {
        Row: {
          id: string
          handyman_id: string
          calendar_provider: 'google' | 'apple' | 'outlook' | 'other'
          external_calendar_id: string
          calendar_name: string | null
          access_token_encrypted: string | null
          refresh_token_encrypted: string | null
          sync_enabled: boolean
          last_sync_at: string | null
          sync_frequency_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          handyman_id: string
          calendar_provider: 'google' | 'apple' | 'outlook' | 'other'
          external_calendar_id: string
          calendar_name?: string | null
          access_token_encrypted?: string | null
          refresh_token_encrypted?: string | null
          sync_enabled?: boolean
          last_sync_at?: string | null
          sync_frequency_minutes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          handyman_id?: string
          calendar_provider?: 'google' | 'apple' | 'outlook' | 'other'
          external_calendar_id?: string
          calendar_name?: string | null
          access_token_encrypted?: string | null
          refresh_token_encrypted?: string | null
          sync_enabled?: boolean
          last_sync_at?: string | null
          sync_frequency_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      place_auction_bid: {
        Args: {
          auction_id_param: string
          bidder_id_param: string
          bid_amount_param: number
        }
        Returns: any
      }
      close_expired_auctions: {
        Args: {}
        Returns: void
      }
    }
  }
}

// Enhanced type exports for the user journeys
export type UserType = 'handyman' | 'customer'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'canceled'
export type BookingType = 'calendar' | 'auction'

export type SlotStatus = 'open' | 'booked' | 'auction' | 'canceled'
export type SlotBookingType = 'calendar' | 'auction' | 'both'

export type AuctionStatus = 'active' | 'ended' | 'cancelled'

export type NotificationType = 
  | 'auction_outbid'
  | 'auction_won'
  | 'auction_ended' 
  | 'auction_lost'
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_completed'
  | 'calendar_booking_request'
  | 'auction_ending_soon'

export type CalendarProvider = 'google' | 'apple' | 'outlook' | 'other'

// Combined types for API responses
export interface AuctionWithBids extends Database['public']['Tables']['auctions']['Row'] {
  auction_bids: Database['public']['Tables']['auction_bids']['Row'][]
  handyman_profiles: Database['public']['Tables']['handyman_profiles']['Row']
}

export interface BookingWithDetails extends Database['public']['Tables']['bookings']['Row'] {
  handyman_profiles?: Database['public']['Tables']['handyman_profiles']['Row']
  auctions?: Database['public']['Tables']['auctions']['Row']
  time_slots?: Database['public']['Tables']['time_slots']['Row']
}

export interface HandymanWithProfile extends Database['public']['Tables']['users']['Row'] {
  handyman_profiles: Database['public']['Tables']['handyman_profiles']['Row']
}

// Auction bid placement response
export interface BidPlacementResult {
  success: boolean
  bid_id?: string
  new_highest_bid?: number
  error?: string
}

// Real-time subscription payloads
export interface AuctionUpdatePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: Database['public']['Tables']['auctions']['Row']
  old?: Database['public']['Tables']['auctions']['Row']
}

export interface BidUpdatePayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: Database['public']['Tables']['auction_bids']['Row']
  old?: Database['public']['Tables']['auction_bids']['Row']
}

export interface NotificationPayload {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new?: Database['public']['Tables']['notifications']['Row']
  old?: Database['public']['Tables']['notifications']['Row']
}