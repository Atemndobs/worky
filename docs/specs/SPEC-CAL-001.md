# SPEC-CAL-001 — Calendar Integration

**Version:** 0.1  
**Date:** 2025-08-30  
**Status:** Draft

## Overview

ICS export functionality so bookings sync to user calendars, enabling customers to add bookings to their personal calendars and handymen to export upcoming commitments.

## Goals

- One-tap "Add to Calendar" for customers
- Simple export for handymen's upcoming bookings
- Cross-platform calendar compatibility
- Accurate timezone handling (Europe/Zurich)

## Non-Goals

- Two-way calendar synchronization
- Conflict resolution with existing calendar events
- Calendar availability checking
- Complex recurring event patterns

## User Stories

**As a customer, I want to:**
- Add my booking to my personal calendar with one tap
- See booking details in my calendar app
- Receive calendar reminders before the appointment
- Have accurate time and location information

**As a handyman, I want to:**
- Export my upcoming bookings to my calendar
- View my schedule in my preferred calendar app
- Get reminders for upcoming appointments
- See customer contact information in calendar events

**As a platform user, I want to:**
- Calendar events that work across Google/Apple/Outlook
- Automatic timezone conversion to my local settings
- Proper event updates when bookings change

## Data & Access

### Event Data Sources
- **Booking Information:** Date, time, duration, location, description
- **Customer Data:** Name, contact information (for handyman events)
- **Handyman Data:** Name, contact information (for customer events)
- **Work Details:** Service type, special instructions

### ICS Event Structure
```
BEGIN:VEVENT
UID:booking-{booking_id}@worky.ch
DTSTART;TZID=Europe/Zurich:{start_datetime}
DTEND;TZID=Europe/Zurich:{end_datetime}
SUMMARY:{service_type} - {handyman_name}
DESCRIPTION:{work_description}\n\nBooking ID: {booking_id}
LOCATION:{customer_address}
ORGANIZER:mailto:noreply@worky.ch
ATTENDEE:mailto:{customer_email}
ATTENDEE:mailto:{handyman_email}
STATUS:CONFIRMED
END:VEVENT
```

### Access Control
- Customers: Can generate ICS for their own bookings
- Handymen: Can generate ICS for their assigned bookings
- No access to other users' calendar data

## UX

### Customer Interface
- **Location:** Booking Details screen
- **Action:** "Add to Calendar" button
- **Behavior:** Downloads ICS file or opens calendar app
- **States:** Available after booking confirmation

### Handyman Interface
- **Location:** Handyman Schedule/Dashboard
- **Action:** "Export Schedule" button
- **Behavior:** Downloads ICS with upcoming bookings
- **Filter:** Next 30 days by default, configurable

### User Flow
1. **Customer:** Booking Details → "Add to Calendar" → Download/Open ICS
2. **Handyman:** Schedule → "Export Calendar" → Select date range → Download ICS

## Technical Implementation

### ICS Generation
- Server-side generation for security
- UTC storage → Europe/Zurich conversion
- Standard RFC 5545 compliance
- Unique UIDs for event identification

### File Delivery
- Direct download for web users
- Deep link to calendar apps on mobile
- Proper MIME type (`text/calendar`)
- Filename convention: `worky-booking-{id}.ics`

### Timezone Handling
- Store all times in UTC in database
- Convert to Europe/Zurich for ICS output
- Include VTIMEZONE component in ICS
- Handle daylight saving transitions

## Risks

### Schedule Changes
- **Risk:** Bookings rescheduled after calendar export
- **Mitigation:** Manual re-export required (phase 1), feed URLs (phase 2)

### Timezone Confusion
- **Risk:** Incorrect time display in user calendars
- **Mitigation:** Rigorous timezone testing, clear time display in UI

### Privacy Concerns
- **Risk:** Sensitive information in calendar events
- **Mitigation:** Limit exposed data, customer consent for contact sharing

### Calendar Compatibility
- **Risk:** ICS not working in specific calendar applications
- **Mitigation:** Test across major platforms, fallback options

## Telemetry

### Key Metrics
- Export button click rates
- Successful calendar imports by platform
- User retention after calendar integration
- Support tickets related to calendar issues

### Analytics Events
- `calendar_export_clicked`
- `ics_file_downloaded`
- `calendar_import_success` (if detectable)
- `calendar_export_error`

### Platform Tracking
- Google Calendar success rate
- Apple Calendar success rate
- Outlook success rate
- Other calendar apps usage

## Rollout Plan

### Phase 1 (MVP)
- Single ICS file generation
- Basic booking information
- Manual download/import process
- Europe/Zurich timezone support

### Phase 2
- Calendar feed URLs for automatic updates
- Enhanced event descriptions
- Cancellation/update propagation
- Multiple export formats

### Phase 3
- Two-way sync exploration
- Availability checking integration
- Advanced scheduling features
- Calendar-based notifications

## Open Questions

1. **Update Propagation:** How should calendar events be updated when bookings change?
2. **Cancellation Handling:** Should cancelled bookings send calendar cancellation events?
3. **Feed URLs:** What's the security model for calendar feed URLs?
4. **Event Duration:** Should we include buffer time before/after appointments?
5. **Recurring Exports:** Should handymen be able to set up automatic calendar syncing?
6. **Privacy Controls:** What booking information should be optional in calendar events?

## Dependencies

- Booking management system
- User authentication
- Timezone handling utilities
- File download/sharing capabilities

## Success Criteria

- >80% successful calendar imports across major platforms
- <2% support tickets related to calendar functionality
- >40% adoption rate for calendar export features
- Zero timezone-related booking confusion incidents
- Positive user feedback on calendar integration convenience

## Testing Requirements

### Platform Compatibility
- Google Calendar (web, mobile)
- Apple Calendar (macOS, iOS)
- Microsoft Outlook (web, desktop, mobile)
- Other popular calendar applications

### Timezone Testing
- Daylight saving time transitions
- Cross-timezone booking scenarios
- Calendar app timezone interpretation

### Edge Cases
- Very long booking descriptions
- Special characters in event data
- Multiple bookings on same day
- Cancelled/rescheduled bookings
