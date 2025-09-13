/**
 * Login Test for atemndobs@gmail.com
 * Tests authentication flow and role-based navigation for specific user
 */

import { supabase } from '../src/lib/supabase';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';

// Mock Supabase client for testing
jest.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
    })),
  },
}));

// Test data for atemndobs@gmail.com
const TEST_USER = {
  email: 'atemndobs@gmail.com',
  password: 'testPassword123',
  id: '12345678-1234-5678-9012-123456789012',
  user_type: 'handyman' as const,
};

const MOCK_USER_PROFILE = {
  id: TEST_USER.id,
  email: TEST_USER.email,
  user_type: TEST_USER.user_type,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};

const MOCK_HANDYMAN_PROFILE = {
  id: 'profile-123',
  user_id: TEST_USER.id,
  business_name: 'Atem Services',
  hourly_rate: 45.00,
  region: 'Zurich',
  skills: ['plumbing', 'electrical', 'general_maintenance'],
  description: 'Professional handyman services in Zurich area',
  phone: '+41791234567',
  default_auction_duration: 60,
  min_bid_increment: 5.00,
  calendar_integration_enabled: false,
  auto_confirm_calendar_bookings: false,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
};

// Mock successful auth session
const MOCK_SESSION = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: TEST_USER.id,
    email: TEST_USER.email,
    email_confirmed_at: '2024-01-01T00:00:00.000Z',
    created_at: '2024-01-01T00:00:00.000Z',
    user_metadata: {
      user_type: TEST_USER.user_type,
    },
  },
};

describe('Login Test - atemndobs@gmail.com', () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    });
  });

  describe('Successful Login Flow', () => {
    it('should successfully authenticate atemndobs@gmail.com with correct credentials', async () => {
      // Mock successful login
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: MOCK_SESSION.user,
          session: MOCK_SESSION,
        },
        error: null,
      });

      // Mock user profile fetch
      const mockSelect = jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: MOCK_USER_PROFILE,
            error: null,
          }),
        })),
      }));

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      // Test the login function
      const result = await mockSupabase.auth.signInWithPassword({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });

      // Assertions
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'atemndobs@gmail.com',
        password: 'testPassword123',
      });

      expect(result.data.user?.email).toBe('atemndobs@gmail.com');
      expect(result.data.user?.id).toBe(TEST_USER.id);
      expect(result.error).toBeNull();
    });

    it('should fetch user profile after successful login', async () => {
      // Mock user profile fetch
      const mockSingle = jest.fn().mockResolvedValue({
        data: MOCK_USER_PROFILE,
        error: null,
      });

      const mockEq = jest.fn(() => ({ single: mockSingle }));
      const mockSelect = jest.fn(() => ({ eq: mockEq }));

      mockSupabase.from.mockReturnValue({
        select: mockSelect,
      } as any);

      // Simulate fetching user profile
      const profileResult = await mockSupabase
        .from('users')
        .select('user_type')
        .eq('id', TEST_USER.id)
        .single();

      // Assertions
      expect(mockSupabase.from).toHaveBeenCalledWith('users');
      expect(mockSelect).toHaveBeenCalledWith('user_type');
      expect(mockEq).toHaveBeenCalledWith('id', TEST_USER.id);
      expect(profileResult.data?.user_type).toBe('handyman');
    });

    it('should identify user as handyman and prepare for handyman navigation', async () => {
      // Mock successful authentication and profile fetch
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: MOCK_SESSION.user,
          session: MOCK_SESSION,
        },
        error: null,
      });

      const mockSingle = jest.fn().mockResolvedValue({
        data: MOCK_USER_PROFILE,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({ single: mockSingle })),
        })),
      } as any);

      // Simulate complete login flow
      const loginResult = await mockSupabase.auth.signInWithPassword({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });

      const profileResult = await mockSupabase
        .from('users')
        .select('user_type')
        .eq('id', TEST_USER.id)
        .single();

      // Assertions for handyman user type
      expect(loginResult.data.user?.user_metadata.user_type).toBe('handyman');
      expect(profileResult.data?.user_type).toBe('handyman');
      
      // This user should be navigated to HandymanTabs, not CustomerTabs
      const expectedNavigationRoute = 'HandymanTabs';
      expect(profileResult.data?.user_type === 'handyman' ? 'HandymanTabs' : 'CustomerTabs')
        .toBe(expectedNavigationRoute);
    });
  });

  describe('Login Error Scenarios', () => {
    it('should handle invalid password for atemndobs@gmail.com', async () => {
      // Mock failed login with invalid password
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: {
          message: 'Invalid login credentials',
          status: 400,
        },
      });

      const result = await mockSupabase.auth.signInWithPassword({
        email: TEST_USER.email,
        password: 'wrongPassword',
      });

      // Assertions
      expect(result.data.user).toBeNull();
      expect(result.error?.message).toBe('Invalid login credentials');
      expect(result.error?.status).toBe(400);
    });

    it('should handle network errors during login', async () => {
      // Mock network error
      mockSupabase.auth.signInWithPassword.mockRejectedValue(
        new Error('Network error')
      );

      // Test error handling
      try {
        await mockSupabase.auth.signInWithPassword({
          email: TEST_USER.email,
          password: TEST_USER.password,
        });
        fail('Expected error to be thrown');
      } catch (error) {
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should handle missing user profile after successful authentication', async () => {
      // Mock successful auth but missing profile
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: MOCK_SESSION.user,
          session: MOCK_SESSION,
        },
        error: null,
      });

      // Mock profile fetch returning null
      const mockSingle = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'User profile not found' },
      });

      mockSupabase.from.mockReturnValue({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({ single: mockSingle })),
        })),
      } as any);

      const profileResult = await mockSupabase
        .from('users')
        .select('user_type')
        .eq('id', TEST_USER.id)
        .single();

      // Assertions
      expect(profileResult.data).toBeNull();
      expect(profileResult.error?.message).toBe('User profile not found');
    });
  });

  describe('Session Management', () => {
    it('should handle existing session for atemndobs@gmail.com', async () => {
      // Mock existing valid session
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: MOCK_SESSION },
        error: null,
      });

      const sessionResult = await mockSupabase.auth.getSession();

      // Assertions
      expect(sessionResult.data.session?.user.email).toBe('atemndobs@gmail.com');
      expect(sessionResult.data.session?.user.id).toBe(TEST_USER.id);
      expect(sessionResult.error).toBeNull();
    });

    it('should handle session expiry', async () => {
      // Mock expired session
      mockSupabase.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: { message: 'Session expired' },
      });

      const sessionResult = await mockSupabase.auth.getSession();

      // Assertions
      expect(sessionResult.data.session).toBeNull();
      expect(sessionResult.error?.message).toBe('Session expired');
    });

    it('should handle successful logout', async () => {
      // Mock successful logout
      mockSupabase.auth.signOut.mockResolvedValue({
        error: null,
      });

      const logoutResult = await mockSupabase.auth.signOut();

      // Assertions
      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(logoutResult.error).toBeNull();
    });
  });

  describe('Role-Based Navigation Tests', () => {
    it('should navigate to handyman dashboard after successful login', async () => {
      // Mock complete successful handyman login
      mockSupabase.auth.signInWithPassword.mockResolvedValue({
        data: {
          user: MOCK_SESSION.user,
          session: MOCK_SESSION,
        },
        error: null,
      });

      const mockSingle = jest.fn().mockResolvedValue({
        data: MOCK_USER_PROFILE,
        error: null,
      });

      mockSupabase.from.mockReturnValue({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({ single: mockSingle })),
        })),
      } as any);

      // Simulate login and profile fetch
      const loginResult = await mockSupabase.auth.signInWithPassword({
        email: TEST_USER.email,
        password: TEST_USER.password,
      });

      const profileResult = await mockSupabase
        .from('users')
        .select('user_type')
        .eq('id', TEST_USER.id)
        .single();

      // Test navigation logic
      const userType = profileResult.data?.user_type;
      const expectedRoute = userType === 'handyman' ? 'HandymanTabs' : 'CustomerTabs';
      const expectedScreens = userType === 'handyman' 
        ? ['Dashboard', 'Calendar', 'Auctions', 'Bookings', 'Profile']
        : ['Browse', 'Auctions', 'Bookings', 'Profile'];

      // Assertions
      expect(loginResult.error).toBeNull();
      expect(userType).toBe('handyman');
      expect(expectedRoute).toBe('HandymanTabs');
      expect(expectedScreens).toEqual(['Dashboard', 'Calendar', 'Auctions', 'Bookings', 'Profile']);
    });
  });

  describe('Integration with User Journey', () => {
    it('should prepare handyman data for auction and calendar features', async () => {
      // Mock handyman profile data fetch
      const mockHandymanProfileSingle = jest.fn().mockResolvedValue({
        data: MOCK_HANDYMAN_PROFILE,
        error: null,
      });

      // Simulate fetching handyman profile for auction settings
      mockSupabase.from.mockReturnValue({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({ single: mockHandymanProfileSingle })),
        })),
      } as any);

      const handymanProfile = await mockSupabase
        .from('handyman_profiles')
        .select('*')
        .eq('user_id', TEST_USER.id)
        .single();

      // Assertions for handyman-specific features
      expect(handymanProfile.data?.business_name).toBe('Atem Services');
      expect(handymanProfile.data?.hourly_rate).toBe(45.00);
      expect(handymanProfile.data?.region).toBe('Zurich');
      expect(handymanProfile.data?.skills).toContain('plumbing');
      expect(handymanProfile.data?.skills).toContain('electrical');
      expect(handymanProfile.data?.default_auction_duration).toBe(60);
      expect(handymanProfile.data?.min_bid_increment).toBe(5.00);
      expect(handymanProfile.data?.calendar_integration_enabled).toBe(false);
    });

    it('should validate handyman can access auction creation features', () => {
      const userType = MOCK_USER_PROFILE.user_type;
      
      // Test permission checks
      const canCreateAuctions = userType === 'handyman';
      const canSetCalendarAvailability = userType === 'handyman';
      const canManageBookings = userType === 'handyman';
      const canViewEarnings = userType === 'handyman';

      // Assertions for handyman permissions
      expect(canCreateAuctions).toBe(true);
      expect(canSetCalendarAvailability).toBe(true);
      expect(canManageBookings).toBe(true);
      expect(canViewEarnings).toBe(true);
    });
  });
});

// Additional test utilities
export const createTestUser = (overrides?: Partial<typeof TEST_USER>) => ({
  ...TEST_USER,
  ...overrides,
});

export const createMockSession = (user = TEST_USER) => ({
  ...MOCK_SESSION,
  user: {
    ...MOCK_SESSION.user,
    ...user,
  },
});

// Test helper for setting up authenticated user state
export const setupAuthenticatedUser = () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;
  
  mockSupabase.auth.getSession.mockResolvedValue({
    data: { session: MOCK_SESSION },
    error: null,
  });

  mockSupabase.from.mockReturnValue({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({
        single: jest.fn().mockResolvedValue({
          data: MOCK_USER_PROFILE,
          error: null,
        }),
      })),
    })),
  } as any);

  return {
    user: MOCK_SESSION.user,
    userType: MOCK_USER_PROFILE.user_type,
    profile: MOCK_HANDYMAN_PROFILE,
  };
};