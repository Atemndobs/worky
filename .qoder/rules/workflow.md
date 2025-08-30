---
type: apply_manually
---

# Development Workflow and Commands

## Available Scripts

Start development server:
```
npm start
```

Run on specific platforms:
```
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # Web browser
```

Code quality:
```
npm run lint         # ESLint checking
npx expo doctor      # Project health check
```

Dependencies:
```
npx expo install --check  # Update to compatible versions
```

Testing:
```
npm test             # Run test suite
npm test -- --coverage   # Run tests with coverage
```

Project commands:
```
npx expo start --clear   # Clear cache and restart
npm run reset-project    # Reset project (removes example code)
npx expo install --fix   # Check for updates
```

## Development Process

1. Always read the relevant documentation before starting:
   - `/README.md`
   - `/IMPLEMENTATION_SUMMARY.md`
   - `/docs/*`
   - `/database/schema.sql`

2. When making changes:
   - Provide complete files with paths
   - Use minimal diffs when editing
   - Follow existing code patterns

3. For SQL changes:
   - Put migration in `/database/0NN_description.sql`
   - Update `/docs/SCHEMA.md` if schema changes

4. For new features:
   - Add tests in `__tests__/`
   - Follow TypeScript strict mode
   - Use ESLint configuration
   - Update documentation as needed