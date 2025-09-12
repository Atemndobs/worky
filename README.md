# Worky - Spontaneous Handyman Booking Platform 🔧

[![React Native](https://img.shields.io/badge/React%20Native-0.79.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2053-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)

A cross-platform mobile application where handymen manage their availability through calendar integration and create auctions for premium service slots. Customers can book directly through integrated calendars or participate in real-time auctions for high-demand time slots.

## 🎯 Core Concept

**For Handymen:**
- 📅 Set calendar availability for direct customer booking
- 🏆 Create auctions for premium and high-demand time slots
- 💰 Set starting bids, auction duration, and reserve prices
- 📊 Real-time dashboard with auction performance and earnings
- ⚡ Instant notifications for auction bids and calendar bookings
- 🎯 Revenue optimization through auction-based pricing

**For Customers:**
- 📅 Book directly through handyman's integrated calendar system
- 🏆 Participate in real-time auctions for premium service slots
- 💰 Place competitive bids with automatic outbid notifications
- ⏰ Monitor auction countdown timers and bidding activity
- 📍 Search by business name, location, skills, or auction status
- 💳 Budget management with maximum bid limits

## 🛠️ Technology Stack

### **Frontend**
- **Framework:** React Native 0.79.6 with Expo SDK 53
- **Language:** TypeScript 5.8.3
- **Navigation:** Expo Router (file-based routing)
- **Styling:** React Native StyleSheet + Themed Components
- **State Management:** React Context + Hooks

### **Backend**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Real-time:** Supabase Realtime subscriptions
- **Security:** Row Level Security (RLS) policies

### **Current Integrations**
- **Auctions:** Real-time bidding system with Supabase Realtime
- **Calendar:** External calendar integration for direct booking
- **Notifications:** Real-time auction and booking notifications

### **Future Integrations**
- **Payments:** Stripe (Phase 3)
- **Analytics:** Expo Analytics

## 🚀 Getting Started

### Prerequisites

- **Node.js** (latest LTS version)
- **npm** or **yarn**
- **Git**
- **Expo CLI** (installed globally or via npx)
- **Supabase account** (free tier available)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/peterpan123468-collab/worky.git
   cd worky
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Supabase:**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL commands from `database/schema.sql` in your Supabase SQL editor
   - Get your project URL and anon key from Settings > API

4. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Supabase credentials:
   EXPO_PUBLIC_SUPABASE_URL=your-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start the development server:**
   ```bash
   npx expo start
   ```

6. **Run on your device:**
   - **iOS Simulator:** Press `i` or run `npm run ios`
   - **Android Emulator:** Press `a` or run `npm run android`
   - **Web Browser:** Press `w` or run `npm run web`
   - **Physical Device:** Scan QR code with Expo Go app

## 📱 App Structure

```
app/
├── (auth)/              # Authentication flow
│   ├── welcome.tsx      # Landing page with user type selection
│   ├── login.tsx        # Sign in screen
│   ├── register.tsx     # Sign up screen
│   ├── region-selection.tsx    # Swiss region selection
│   └── work-type-selection.tsx # Handyman work type setup
├── (handyman)/          # Handyman-specific screens
│   ├── dashboard.tsx    # Calendar status and auction performance
│   ├── calendar.tsx     # Set and manage calendar availability
│   ├── auctions.tsx     # Create and manage auctions
│   ├── bookings.tsx     # View calendar bookings and auction wins
│   └── profile.tsx      # Business profile management
├── (customer)/          # Customer-specific screens
│   ├── dashboard.tsx    # Browse auctions and calendar slots
│   ├── auctions.tsx     # Active bids and auction participation
│   ├── bookings.tsx     # Calendar bookings and auction wins
│   └── profile.tsx      # Personal profile and bidding history
├── (tabs)/              # Main app navigation
└── index.tsx            # Root routing logic
```

## 🗄️ Database Schema

| Table | Description | Status |
|-------|-------------|--------|
| `users` | User accounts and types | ✅ Complete |
| `handyman_profiles` | Business info, rates, skills | ✅ Complete |
| `time_slots` | Available appointment slots (calendar integration) | ✅ Complete |
| `bookings` | Booking records from calendar and auctions | ✅ Complete |
| `auctions` | Real-time auction system | 🚧 In Development |
| `auction_bids` | Real-time bid history and tracking | 🚧 In Development |
| `notifications` | Auction and booking notifications | 🚧 Schema ready |

## 🎯 Development Roadmap

### ✅ Phase 1 - Calendar Integration (Complete)
- [x] User authentication system
- [x] Role-based navigation (handyman/customer)
- [x] Swiss region selection
- [x] Basic app structure and theming
- [x] Database schema with RLS policies
- [x] Calendar availability management
- [x] Direct calendar booking system
- [x] Real-time booking notifications

### 🚧 Phase 2 - Auction System (In Development)
- [x] Real-time auction infrastructure
- [x] Auction creation by handymen
- [ ] **In Progress:** Real-time bidding interface
- [ ] **In Progress:** Auction countdown timer
- [ ] **In Progress:** Automatic winner selection
- [ ] **In Progress:** Comprehensive bid notification system
- [ ] **Pending:** Auction analytics and performance tracking

### 💳 Phase 3 - Payment Integration (Future)
- [ ] Stripe Connect integration
- [ ] Secure payment processing
- [ ] Automated payout system
- [ ] Transaction history and receipts
- [ ] Refund management

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # Web browser

# Code quality
npm run lint         # ESLint checking
npx expo doctor      # Project health check

# Dependencies
npx expo install --check  # Update to compatible versions
```

### Project Commands

```bash
# Clear cache and restart
npx expo start --clear

# Reset project (removes example code)
npm run reset-project

# Check for updates
npx expo install --fix
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🌍 Supported Regions

**Target Market:** Switzerland 🇨🇭

- German-speaking Switzerland
- French-speaking Switzerland  
- Italian-speaking Switzerland
- Alpine Region

**MVP Work Types:**
- 🔧 Plumbing (Sanitary Work)
- ⚡ Electrical Work
- 🔥 Heating & HVAC
- 🪚 Carpentry & Furniture Assembly
- 🎨 Painting & Renovation

## 🔒 Security Features

- ✅ Row Level Security (RLS) policies
- ✅ Environment variable protection
- ✅ Secure authentication with Supabase
- ✅ Input validation and sanitization
- ✅ HTTPS-only communication
- 🔄 Rate limiting (planned)
- 🔄 Data encryption at rest (planned)

## 📊 Current Status

**Development Stage:** MVP Phase 1 (75% complete)

**What's Working:**
- ✅ User registration and authentication
- ✅ Role-based navigation (handyman/customer)
- ✅ Real-time database connections
- ✅ Cross-platform compatibility (iOS, Android, Web)
- ✅ Themed UI components
- ✅ Calendar availability management
- ✅ Direct calendar booking system
- ✅ Auction creation and management

**In Development:**
- 🚧 Real-time auction bidding interface
- 🚧 Auction countdown and automatic winner selection
- 🚧 Comprehensive notification system
- 🚧 Auction analytics dashboard
- 🚧 Budget management for customers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use ESLint configuration
- Write tests for new features
- Update documentation
- Follow the established project structure

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo Team](https://expo.dev/) for the amazing development platform
- [Supabase](https://supabase.com/) for the backend infrastructure
- [React Native Community](https://reactnative.dev/) for the framework

## 🔗 Resources

- **Documentation:**
  - [Expo Docs](https://docs.expo.dev/)
  - [Supabase Docs](https://supabase.com/docs)
  - [React Native Docs](https://reactnative.dev/docs/getting-started)

- **Community:**
  - [Expo Discord](https://chat.expo.dev/)
  - [React Native Community](https://reactnative.dev/community/overview)
  - [Supabase Discord](https://discord.supabase.com/)

---

**Built with ❤️ for the Swiss handyman community**