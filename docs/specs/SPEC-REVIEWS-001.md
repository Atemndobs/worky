# SPEC-REVIEWS-001 — Reviews & Ratings

**Version:** 0.1  
**Date:** 2025-08-30  
**Status:** Draft

## Overview

Post-completion rating and comment system to power handyman ranking and customer decision-making through transparent feedback.

## Goals

- One review per completed booking
- Surface aggregate ratings on handyman profiles
- Build trust through transparent feedback
- Improve service quality through feedback loops

## Non-Goals

- Public threaded debates or discussions
- Anonymous reviews
- Review editing after submission (phase 1)
- Cross-platform review imports

## User Stories

**As a customer, I want to:**
- Rate my completed booking experience (1-5 stars)
- Leave a comment about the service quality
- View other customers' reviews before booking
- Access my review history

**As a handyman, I want to:**
- View my average rating and total review count
- Read customer comments to improve service
- See recent reviews on my profile
- Understand areas for improvement

**As a potential customer, I want to:**
- See handyman ratings before booking
- Read recent reviews to gauge quality
- Filter handymen by rating thresholds

## Data & Access

### Data Model
- **Review:** Tied to specific booking, reviewer, and handyman
- **Rating:** 1-5 star scale (integer)
- **Comment:** Optional text feedback
- **Visibility:** Public read access (or role-based per policy revision)

### Database Schema
```sql
-- reviews table
reviews (
  id uuid PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id) UNIQUE, -- one review per booking
  customer_id uuid REFERENCES users(id),
  handyman_id uuid REFERENCES users(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- aggregated ratings view
CREATE VIEW handyman_ratings AS
SELECT 
  handyman_id,
  AVG(rating)::numeric(3,2) as average_rating,
  COUNT(*) as total_reviews,
  COUNT(*) FILTER (WHERE created_at > now() - interval '30 days') as recent_reviews
FROM reviews
GROUP BY handyman_id;
```

### RLS Policies
- Reviews: Public read access for completed bookings
- Insert: Only by booking customer when status = 'completed'
- Update/Delete: Restricted (no edits in phase 1)

## UX

### Review Submission
- **Trigger:** Automatic prompt after booking completion
- **Entry:** Booking History → "Leave Review" button
- **Interface:** Star rating + optional comment field
- **Validation:** Require rating, comment optional

### Review Display
- **Handyman Profile:** Average rating, total count, recent comments
- **Booking History:** Customer's submitted reviews
- **Search Results:** Rating badges on handyman cards

### Review Completion Flow
1. Booking status changes to 'completed'
2. Customer receives completion notification with review prompt
3. Customer taps "Rate Experience"
4. Submit rating + comment
5. Review appears on handyman profile

## Technical Implementation

### Eligibility Checks
- Booking must be in 'completed' status
- Customer must be the original booker
- One review per booking (database constraint)
- No review editing (phase 1)

### Aggregation Logic
- Real-time average calculation via database views
- Cache aggregates for performance
- Update handyman profiles on new reviews

### Data Integrity
- Foreign key constraints prevent orphaned reviews
- Check constraints ensure valid rating range
- Unique constraint prevents duplicate reviews per booking

## Risks

### Review Manipulation
- **Risk:** Fake reviews or rating inflation
- **Mitigation:** Require completed booking, monitor patterns

### Disputes & Edits
- **Risk:** Customers wanting to change reviews
- **Mitigation:** Clear policy, potential edit window in phase 2

### Sensitive Information
- **Risk:** PII or inappropriate content in comments
- **Mitigation:** Content guidelines, moderation tools (phase 3)

### Rating Bias
- **Risk:** Only extreme experiences get reviewed
- **Mitigation:** Proactive completion prompts, incentives

## Telemetry

### Key Metrics
- Review completion rate (target: >60% of completed bookings)
- Average rating distribution across platform
- Review impact on booking conversion rates
- Time between completion and review submission

### Analytics Events
- `review_prompt_shown`
- `review_started`
- `review_submitted`
- `review_viewed_on_profile`

## Rollout Plan

### Phase 1 (MVP)
- 1-5 star ratings with comments
- Basic profile aggregation
- Completion prompts
- Public visibility

### Phase 2
- Review edit window (24-48 hours)
- Enhanced profile displays
- Review filtering and sorting

### Phase 3
- Handyman response to reviews
- Advanced moderation tools
- Review helpfulness voting

### Phase 4
- Review analytics dashboard
- Automated quality insights
- Review-based recommendations

## Open Questions

1. **Edit Window:** Should customers be able to edit reviews within a time limit?
2. **Moderation Standards:** What content guidelines should apply to review comments?
3. **Response System:** Should handymen be able to respond to reviews?
4. **Incentives:** Should there be rewards for leaving reviews?
5. **Minimum Threshold:** Should handymen need X reviews before ratings are shown?
6. **Anonymous Option:** Any scenarios where anonymous reviews make sense?

## Dependencies

- Booking completion workflow
- User authentication system
- Handyman profile displays
- Notification system for prompts

## Success Criteria

- >60% review completion rate for finished bookings
- Average platform rating between 4.0-4.5 stars
- <5% disputed or problematic reviews
- Measurable correlation between ratings and booking rates
- Zero data integrity issues or unauthorized reviews
