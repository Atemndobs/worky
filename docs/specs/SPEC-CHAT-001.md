# SPEC-CHAT-001 — Booking Chat

**Version:** 0.1  
**Date:** 2025-08-30  
**Status:** Draft

## Overview

1:1 chat scoped to a booking (both calendar bookings and auction wins), enabling real-time, trust-building communication between customer and handyman. Supports both pre-service coordination and post-service follow-up.

## Goals

- Fast communication between booking parties
- Easy media (photo) sharing (phase 2)
- Push notifications for new messages
- Build trust through direct communication

## Non-Goals

- Group chats
- Cross-booking threads
- Public messaging
- Complex moderation tools (phase 1)

## User Stories

**As a customer, I want to:**
- Send messages to my handyman for both calendar bookings and auction wins
- Receive notifications when the handyman responds
- Communicate pre-service requirements and questions
- Share photos of the work area (phase 2)
- Access chat history after booking completion
- Distinguish between different booking types in chat context

**As a handyman, I want to:**
- Communicate with customers about booking details (calendar and auction bookings)
- Receive notifications for new customer messages
- Coordinate timing and requirements pre-service
- Share progress photos (phase 2)
- Maintain professional communication records
- Access chat for both direct bookings and auction wins

## Data & Access

### Data Model
- **Conversation:** One per booking (calendar booking or auction win)
- **Messages:** sender_id, content, timestamp, optional media reference
- **Booking Context:** Reference to booking type (calendar vs auction) and booking details
- **Access Control:** Only booking customer and assigned handyman can read/write
- **Booking Status Integration:** Chat availability based on booking confirmation status

### Database Schema
```sql
-- conversations table (one per booking)
conversations (
  id uuid PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- messages table
messages (
  id uuid PRIMARY KEY,
  conversation_id uuid REFERENCES conversations(id),
  sender_id uuid REFERENCES users(id),
  content text NOT NULL,
  media_url text, -- phase 2
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);
```

### RLS Policies
- Users can only access conversations for their own bookings
- Messages visible only to conversation participants

## UX

### Entry Points
- Primary: Booking Details screen (both calendar and auction bookings)
- Secondary: Booking list with unread indicators and booking type labels
- Context-aware: Different entry points for calendar bookings vs auction wins
- Dashboard integration: Quick access from handyman/customer dashboards

### Interface Components
- Message composer with text input
- Message history with sender identification
- Read/delivered status indicators
- Push notification handling

### Navigation Flow
**Calendar Bookings:**
1. Customer books → Chat available after handyman confirmation
2. Handyman confirms → Chat activated for both parties

**Auction Wins:**
1. Customer wins auction → Chat immediately available
2. Auto-confirmation means instant chat activation

**General Flow:**
1. Navigate to Booking Details (any type)
2. Tap "Chat" button (if booking confirmed)
3. Enter chat interface with booking context
4. Send/receive messages in realtime

## Technical Implementation

### Transport
- **Primary:** Supabase Realtime Channels
- **Future:** Pluggable adapter for Stream/Firebase

### Realtime Updates
- Subscribe to conversation channel on chat entry
- Broadcast new messages to all participants
- Update read status in realtime

### Notifications
- Push notifications for new messages when app backgrounded
- Local notifications for foreground message alerts

## Risks

### Booking Type Confusion
- **Risk:** Users confused about chat availability for different booking types
- **Mitigation:** Clear UI indicating when chat is available based on booking status

### Confirmation Status Complexity
- **Risk:** Chat timing different for calendar vs auction bookings
- **Mitigation:** Consistent rules: calendar requires confirmation, auctions auto-activate chat

### Access Control
- **Risk:** Chat access after handyman reassignment or booking cancellation
- **Mitigation:** Archive old conversations, clear access rules per booking status

### Content Moderation
- **Risk:** Inappropriate content or abuse
- **Mitigation:** Basic reporting mechanism (phase 2), content retention policy

### Data Retention
- **Risk:** Indefinite message storage across booking types
- **Mitigation:** Define retention policy (e.g., 90 days post-completion) for all booking types

## Telemetry

### Key Metrics
- Message delivery latency (target: <2s)
- Unread message counts per user
- Notification open rates
- Chat engagement per booking type (calendar vs auction)
- Chat activation timing (calendar confirmation vs auction win)
- Communication effectiveness across booking types

### Analytics Events
- `chat_message_sent`
- `chat_message_delivered`
- `chat_notification_opened`
- `chat_conversation_started`

## Rollout Plan

### Phase 1 (MVP)
- Text-only messaging
- Basic realtime delivery
- Simple push notifications
- Entry from Booking Details

### Phase 2
- Photo sharing
- Rich media support
- Enhanced notifications

### Phase 3
- File attachments
- Message search
- Advanced moderation tools

### Phase 4
- Automated messages
- Template responses
- Analytics dashboard

## Open Questions

1. **Chat Availability Rules:** Should calendar bookings allow chat before confirmation?
2. **Booking Type Context:** How to display booking type context within chat interface?
3. **Confirmation Messaging:** Should system messages indicate booking type and confirmation status?
4. **Retention Duration:** How long should messages be retained after booking completion?
5. **Cross-booking Communication:** Should handymen/customers chat across multiple booking types?
6. **Offline Support:** Should messages queue when offline and send when reconnected?
7. **Message Editing:** Allow message edits within a time window?

## Dependencies

- Supabase Realtime channels
- Push notification service
- Booking system integration
- User authentication context

## Success Criteria

- 90% of bookings with at least one chat message
- <2 second message delivery latency
- >70% notification open rate
- Zero data breaches or unauthorized access incidents
