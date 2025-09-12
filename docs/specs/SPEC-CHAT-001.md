# SPEC-CHAT-001 — Booking Chat

**Version:** 0.1  
**Date:** 2025-08-30  
**Status:** Draft

## Overview

1:1 chat scoped to a booking, realtime, trust-building communication between customer and handyman during and after service delivery.

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
- Send messages to my assigned handyman during the booking
- Receive notifications when the handyman responds
- Share photos of the work area (phase 2)
- Access chat history after booking completion

**As a handyman, I want to:**
- Communicate with customers about booking details
- Receive notifications for new customer messages
- Share progress photos (phase 2)
- Maintain professional communication records

## Data & Access

### Data Model
- **Conversation:** One per booking
- **Messages:** sender_id, content, timestamp, optional media reference
- **Access Control:** Only booking customer and assigned handyman can read/write

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
- Primary: Booking Details screen
- Secondary: Booking list with unread indicators

### Interface Components
- Message composer with text input
- Message history with sender identification
- Read/delivered status indicators
- Push notification handling

### Navigation Flow
1. Customer/Handyman → Booking Details
2. Tap "Chat" button
3. Enter chat interface
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

### Access Control
- **Risk:** Chat access after handyman reassignment
- **Mitigation:** Archive old conversations, create new ones for reassignments

### Content Moderation
- **Risk:** Inappropriate content or abuse
- **Mitigation:** Basic reporting mechanism (phase 2), content retention policy

### Data Retention
- **Risk:** Indefinite message storage
- **Mitigation:** Define retention policy (e.g., 90 days post-completion)

## Telemetry

### Key Metrics
- Message delivery latency (target: <2s)
- Unread message counts per user
- Notification open rates
- Chat engagement per booking

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

1. **Retention Duration:** How long should messages be retained after booking completion?
2. **Media Size Limits:** Maximum file size for photo sharing in phase 2?
3. **Reporting Flow:** How should users report inappropriate content?
4. **Offline Support:** Should messages queue when offline and send when reconnected?
5. **Message Editing:** Allow message edits within a time window?

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
