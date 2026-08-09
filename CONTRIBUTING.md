# Contributing to Unified Dispatch Service

Thank you for your interest in contributing to Unified Dispatch Service.

This document describes the development workflow, coding standards, and contribution guidelines.

---

## Development setup

### Clone repository

```bash
git clone https://github.com/dmitriigorbunov1998/unified-dispatch-service.git

cd unified-dispatch-service
```

## Install dependencies

```bash
npm install
```

## Run development environment

```bash
npm run dev
```

The command starts:

- Frontend development server
- Backend development server

---

## Branch naming

### Use descriptive branch names:

```bash
feature/
bugfix/
refactor/
docs/
chore/
test/
```

### Examples:

```bash
feature/add-authentication

bugfix/fix-routing

refactor/update-header

docs/update-readme
```

## Commit convention

### This project follows Conventional Commits.

### Available prefixes:

```bash
feat:
fix:
docs:
refactor:
test:
chore:
perf:
```

### Examples:

```bash
feat: add automation logs

fix: resolve mobile header issue

refactor: update dashboard structure

test: add dashboard integration tests

docs: update installation guide
```

## Before creating Pull Request

### Make sure all checks pass:

```bash
npm run lint

npm run test:run

npm run build
```

## Pull Requests

A Pull Request should contain:

- Description of changes
- Reason for the change
- Testing instructions
- Screenshots for UI changes
- Possible breaking changes

### Example:

```bash
## Description

Added global search dropdown for navigation.

## Testing

- npm run lint
- npm run test:run
- npm run build

## Screenshots

Before:
...

After:
...
```

## Code style

The project uses:

- TypeScript
- React
- ESLint
- Prettier
- Feature-based architecture

Please keep code:

- readable;
- typed;
- consistent with existing patterns;
- covered by tests where applicable.

## Project structure

### Main application structure:

```bash
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
├── shared/
└── core/
```

Follow the existing architecture when adding new functionality.

## Reporting issues

Before creating an issue:

- Check existing issues.
- Make sure the problem is reproducible.
- Provide enough information to investigate.

For bugs use the Bug Report template.

For new ideas use the Feature Request template.

---

Thank you for helping improve Unified Dispatch Service.
