---
type: model_decision
description: When writing tests or running test commands
---

# Testing Guidelines

## Test Structure
- Add tests next to features under `__tests__/`
- Prefer RTL (React Testing Library) for components
- Use pure TypeScript tests for services
- Follow examples in existing tests under `__tests__/`

## Test Commands
- Run tests with: `npm test`
- Run tests with coverage: `npm test -- --coverage`

## Unit Testing
- Services should have unit tests (auction, notifications, payment stubs)
- Test pure functions without side effects
- Mock external dependencies appropriately

## Component Testing
- Test auth screens, slot form, booking button disabled/enabled states
- Use RTL for realistic user interaction testing
- Test both positive and negative scenarios

## Integration Testing
- Test "two users race to book" scenario to verify auction trigger
- Test time remaining logic for auctions
- Test real-time updates for slots and bookings

## Test Examples

Component test example:
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { BookingButton } from '../components/BookingButton';

describe('BookingButton', () => {
  it('disables button when slot is booked', () => {
    render(<BookingButton isBooked={true} onPress={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

Service test example:
```typescript
import { auctionService } from '../lib/auction-service';

describe('auctionService', () => {
  it('calculates correct bid increment', () => {
    const result = auctionService.calculateBidIncrement(100);
    expect(result).toBe(110); // 10% increment
  });
});
```