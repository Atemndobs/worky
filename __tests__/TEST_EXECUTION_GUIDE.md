# Test Execution Guide - atemndobs@gmail.com Login Tests

This guide explains how to run the comprehensive login tests for the specific user `atemndobs@gmail.com`.

## 🚀 Quick Start

### Install Testing Dependencies
```bash
npm install
```

### Run the Specific User Test
```bash
npm run test:atemndobs
```

### Run All Tests
```bash
npm test
```

## 📋 Test Overview

### Test Files Created
1. **`auth-login-atemndobs.test.ts`** - Unit tests with mocks
2. **`integration-login-atemndobs.test.ts`** - Integration tests against real database
3. **`setup.ts`** - Global test configuration and mocks

### Test Coverage Areas

#### 1. Authentication Flow Tests ✅
- ✅ Successful login with correct credentials
- ✅ Failed login with invalid password
- ✅ Network error handling
- ✅ Session management (existing, expired)
- ✅ User profile fetching after authentication
- ✅ Logout functionality

#### 2. Role-Based Navigation Tests ✅
- ✅ Handyman user type identification
- ✅ Navigation to HandymanTabs (not CustomerTabs)
- ✅ Access to handyman-specific features
- ✅ Handyman screen list validation

#### 3. User Journey Integration Tests ✅
- ✅ Handyman profile data validation
- ✅ Auction creation permissions
- ✅ Calendar integration readiness
- ✅ Business profile setup verification

#### 4. Database Integration Tests ✅
- ✅ Real database authentication (optional)
- ✅ Row Level Security (RLS) validation  
- ✅ Database function access testing
- ✅ Real-time subscription setup

## 🏃‍♂️ Running Different Test Types

### 1. Unit Tests (Mocked - Safe to Run)
```bash
# Run specific user test
npm run test:atemndobs

# Run with coverage report
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### 2. Integration Tests (Real Database - Use Caution)
```bash
# Set environment variables first
export TEST_USER_PASSWORD="actualPasswordForAtemndobs"
export RUN_INTEGRATION_TESTS="true"

# Run integration tests
npm run test:integration
```

**⚠️ Warning**: Integration tests connect to real Supabase database!

## 🔧 Test Configuration

### Environment Variables
```bash
# Required for integration tests
TEST_USER_PASSWORD="user_actual_password"
RUN_INTEGRATION_TESTS="true"

# Optional - Override default Supabase config
EXPO_PUBLIC_SUPABASE_URL="your-project-url"
EXPO_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### Jest Configuration (`jest.config.js`)
- **Preset**: react-native
- **Test Environment**: jsdom
- **Timeout**: 10 seconds
- **Coverage**: Enabled for src/ directory
- **Module Mapping**: @ alias for src/

## 📊 Expected Test Results

### Unit Tests Should Show:
```
✅ Login Test - atemndobs@gmail.com
  ✅ Successful Login Flow (4 tests)
  ✅ Login Error Scenarios (3 tests) 
  ✅ Session Management (3 tests)
  ✅ Role-Based Navigation (1 test)
  ✅ User Journey Integration (2 tests)

Total: 13 tests passing
```

### Integration Tests Should Show:
```
✅ Integration Test - atemndobs@gmail.com Login
  ✅ Real Database Login Tests (2 tests)
  ✅ Database Functions Tests (1 test)
  ✅ Real-time Subscriptions Test (1 test)

Total: 4 tests passing (or skipped if integration disabled)
```

## 🧪 Test Data Used

### User Profile
- **Email**: atemndobs@gmail.com
- **User Type**: handyman
- **ID**: 12345678-1234-5678-9012-123456789012

### Handyman Profile
- **Business**: Atem Services
- **Rate**: CHF 45.00/hour
- **Region**: Zurich
- **Skills**: plumbing, electrical, general_maintenance
- **Auction Duration**: 60 minutes default
- **Bid Increment**: CHF 5.00 minimum

## 🔍 Test Scenarios Covered

### ✅ Authentication Scenarios
1. **Valid Login**: Correct email/password → Success
2. **Invalid Password**: Wrong password → Error message
3. **Network Issues**: Connection problems → Error handling
4. **Session Recovery**: Existing valid session → Auto-login
5. **Session Expiry**: Expired session → Re-authentication required

### ✅ User Type & Navigation
1. **Handyman Identification**: user_type = 'handyman'
2. **Navigation Route**: HandymanTabs (not CustomerTabs)
3. **Available Screens**: Dashboard, Calendar, Auctions, Bookings, Profile
4. **Feature Access**: Can create auctions, manage calendar, view earnings

### ✅ Database Integration
1. **Profile Fetching**: Retrieves handyman_profiles data
2. **RLS Security**: Only sees own data, can view public auctions
3. **Function Access**: Can call place_auction_bid() function
4. **Real-time**: Subscription to notifications table works

## 🚨 Troubleshooting

### Common Issues

#### 1. "Module not found" errors
```bash
# Install missing dependencies
npm install

# Clear cache
npm start -- --clear
```

#### 2. Integration tests failing
```bash
# Check if user exists in database
# Verify password is correct
# Ensure RUN_INTEGRATION_TESTS=true is set
```

#### 3. Mock errors in unit tests
```bash
# Check setup.ts file is being loaded
# Verify jest.config.js points to correct setup file
```

#### 4. Timeout errors
```bash
# Increase timeout in jest.config.js
# Check network connectivity for integration tests
```

### Test Environment Setup
```bash
# 1. Ensure all dependencies installed
npm install

# 2. Verify Jest configuration
npx jest --showConfig

# 3. Run tests with verbose output
npm test -- --verbose

# 4. Check test file syntax
npx tsc --noEmit __tests__/*.ts
```

## 📈 Coverage Goals

### Target Coverage Areas:
- **Authentication Flow**: 95%+
- **User Profile Management**: 90%+
- **Navigation Logic**: 100%
- **Error Handling**: 85%+

### Generate Coverage Report:
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## 🎯 Success Criteria

### Unit Tests Pass When:
- ✅ All 13 test cases pass
- ✅ No console errors during execution
- ✅ Mocks properly isolate external dependencies
- ✅ Test execution completes under 30 seconds

### Integration Tests Pass When:
- ✅ Real authentication succeeds with valid credentials
- ✅ User profile data matches expected structure
- ✅ RLS policies properly restrict data access
- ✅ Database functions are callable and respond correctly
- ✅ Real-time subscriptions establish successfully

## 📝 Next Steps After Tests Pass

1. **Verify Database Setup**: Ensure all tables and functions exist
2. **Test Other User Types**: Create similar tests for customer users
3. **Add Auction Flow Tests**: Test auction creation and bidding
4. **Calendar Integration Tests**: Test calendar sync functionality
5. **End-to-End Tests**: Add full user journey testing

## 🤝 Contributing

When adding new tests:
1. Follow existing naming conventions
2. Add proper TypeScript types
3. Include both success and error scenarios
4. Update this guide with new test information
5. Ensure tests can run in CI/CD environment

The login tests for `atemndobs@gmail.com` provide a comprehensive foundation for validating the authentication system and user journey functionality.