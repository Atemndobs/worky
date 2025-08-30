# Worky - Qoder Configuration

This project is configured for use with [Qoder](https://qoder.com/), an agentic coding platform designed for real software development.

## Qoder Rules

The project includes several Qoder rules in the [.qoder/rules](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules) directory that guide the AI assistant's behavior:

1. **[worky.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/worky.md)** - Always applied rules for the Worky project
2. **[database.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/database.md)** - Database schema and RLS policies guidance
3. **[testing.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/testing.md)** - Testing guidelines and examples
4. **[structure.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/structure.md)** - File structure and navigation guidance
5. **[workflow.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/workflow.md)** - Development workflow and commands
6. **[typescript.md](file:///Users/atem/sites/jnabusiness_solutions/worky/.qoder/rules/typescript.md)** - TypeScript and coding standards

## Using Qoder with Worky

1. Open this project in Qoder IDE
2. The rules will automatically guide the AI assistant's behavior
3. For specific guidance, you can manually apply rules using the `@rule` syntax in chat

## Key Features

- **Always Apply Rules**: Core project guidelines are always active
- **Model Decision Rules**: Applied automatically when relevant (database, testing, structure, TypeScript)
- **Manual Rules**: Development workflow commands available on demand

## Getting Started

1. Install dependencies: `npm install`
2. Set up Supabase as described in README.md
3. Start development: `npm start`

The Qoder configuration ensures that the AI assistant will follow project-specific guidelines for technology choices, code structure, security requirements, and development practices.