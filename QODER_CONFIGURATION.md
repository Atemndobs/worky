# Qoder Configuration for Worky Project

## Summary

This patch adds Qoder configuration files to the Worky project, enabling AI-assisted development with the Qoder IDE. The configuration includes rules that guide the AI assistant's behavior according to the project's technology choices, architecture, and development practices.

## Changes Included

1. Created `.qoder/rules/` directory with the following rule files:
   - `worky.md` - Always applied rules for the Worky project
   - `database.md` - Database schema and RLS policies guidance
   - `testing.md` - Testing guidelines and examples
   - `structure.md` - File structure and navigation guidance
   - `workflow.md` - Development workflow and commands
   - `typescript.md` - TypeScript and coding standards

2. Created `.qoder/README.md` with documentation on how to use Qoder with this project

## Purpose

These configuration files allow developers using Qoder to:
- Follow project-specific guidelines automatically
- Maintain consistency with existing code patterns
- Adhere to security requirements (RLS policies)
- Use appropriate technology choices (TypeScript, React Native, Expo, Supabase)
- Follow proper testing practices
- Maintain the correct project structure

## How to Apply

To apply this patch:
```bash
git apply qoder-configuration.patch
```

Or to check what the patch would do before applying:
```bash
git apply --stat qoder-configuration.patch
git apply --check qoder-configuration.patch
```