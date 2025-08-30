---
type: model_decision
description: When working with file structure, routing, or navigation
---

# File Structure and Navigation

## Project Structure
```
app/
├── (auth)/              # Authentication flow
│   ├── welcome.tsx      # Landing page with user type selection
│   ├── login.tsx        # Sign in screen
│   ├── register.tsx     # Sign up screen
│   ├── region-selection.tsx    # Swiss region selection
│   └── work-type-selection.tsx # Handyman work type setup
├── (handyman)/          # Handyman-specific screens
│   ├── dashboard.tsx    # Stats and overview
│   ├── time-slots.tsx   # Create and manage time slots
│   ├── bookings.tsx     # View and manage bookings
│   └── profile.tsx      # Business profile management
├── (customer)/          # Customer-specific screens
│   ├── dashboard.tsx    # Browse available slots
│   ├── bookings.tsx     # View booking history
│   └── profile.tsx      # Personal profile
├── (tabs)/              # Main app navigation
└── index.tsx            # Root routing logic
```

## Routing Guidelines
- Use expo-router for navigation
- Keep file-based routing consistent
- Don't rename existing routes without updating links/imports
- Use minimal React Navigation primitives where needed

## Component Structure
- Reuse existing components in `components/` directory
- Use `ThemedText` and `ThemedView` for consistent styling
- Follow existing UI patterns in the codebase
- Place new constants in `constants/` directory

## Service Structure
- Place service files in `lib/` directory
- Use naming pattern `*-service.ts` (e.g., `auction-service.ts`)
- Follow existing service patterns in the codebase

## Context Structure
- Use existing `contexts/AuthContext.tsx` for authentication state
- Create new contexts only when necessary
- Follow existing context patterns in the codebase