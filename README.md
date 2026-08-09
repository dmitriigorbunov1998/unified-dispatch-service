# Unified Dispatch Service

![Unified Dispatch Service](https://img.shields.io/badge/React-TypeScript-blue)
![CI](https://github.com/dmitriigorbunov1998/unified-dispatch-service/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green)

## About

Unified Dispatch Service is an automation platform for processing requests.

The application helps automate routine operations:

- processing service requests;
- collecting request information;
- running browser automation scenarios;
- monitoring execution logs;
- tracking automation statistics.

## Features

### Automation

- Automated request processing
- Browser automation with Playwright
- Execution status tracking
- Real-time logs

### Dashboard

- Automation status
- Execution history
- Statistics overview
- District monitoring

### Application

- Responsive interface
- Dark / Light themes
- Internationalization support
- Global search
- Mobile navigation

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Effector
- Lucide React
- CSS Variables

### Backend

- Node.js
- Express
- REST API

### Testing

- Vitest
- React Testing Library
- Playwright
- MSW

### Development tools

- ESLint
- Prettier
- Husky
- GitHub Actions

## Architecture

The project follows a feature-based architecture:

```bash
src/
├── app/
│   ├── providers/
│   └── layout/
│
├── pages/
│
├── widgets/
│
├── features/
│
├── entities/
│
├── shared/
│
└── core/
```

## Installation

Clone repository:

```bash
git clone https://github.com/dmitriigorbunov1998/unified-dispatch-service.git

cd unified-dispatch-service
```

### Install dependencies:

```bash
npm install
```

## Development

### Run frontend and backend:

```bash
npm run dev
```

### Frontend

```bash
http://localhost:5173
```

### Backend

```bash
http://localhost:3001
```

## Environment variables

### Create `.env.local`:

```bash
EDS_LOGIN=
EDS_PASSWORD=
EDS_URL=
```

## Scripts

### Development:

```bash
npm run dev
```

### Build:

```bash
npm run build
```

### Lint:

```bash
npm run lint
```

### Tests:

```bash
npm run test:run
```

### E2E:

```bash
npm run test:e2e
```

### Coverage:

```bash
npm run test:coverage
```

## CI/CD

GitHub Actions automatically runs:

- ESLint
- Unit tests
- Build verification
- Deployment

### Contributing

See:
[SECURITY.md](./SECURITY.md)

### License

MIT License
