# CasaPerks — Resident Rewards Dashboard

A full-stack take-home project built for CasaPerks.

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Express + TypeScript + Zod

## Security Features

1. **JWT Authentication** — Login returns a signed JWT (24h expiry). All protected routes verify the token via middleware.
2. **Rate Limiting** — Three tiers: auth endpoints (10 req/15min), API endpoints (60 req/min), redemption endpoint (5 req/min) using `express-rate-limit`.
3. **Input Validation** — All request bodies validated with Zod schemas before processing. Invalid input returns a 400 with a descriptive error.

## Setup & Run

### Prerequisites
- Node.js 18+
- npm

### Install all dependencies
```bash
npm run install:all
```

### Start both servers with a single command
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Demo Credentials

```
Email:    alex@casaperks.com
Password: demo123
```

## Project Structure

```
casaperks-demo/
├── backend/
│   └── src/
│       ├── data/         # Mock data (residents, transactions, gift cards)
│       ├── middleware/   # JWT auth + rate limiters
│       ├── routes/       # auth, residents, giftcards
│       └── index.ts      # Express server
├── frontend/
│   └── src/
│       ├── hooks/        # Auth context
│       ├── pages/        # LoginPage, DashboardPage
│       ├── api.ts        # API service layer
│       └── App.tsx
└── package.json          # Root: runs both with `npm run dev`
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/residents/me` | ✅ | Get resident profile |
| GET | `/api/residents/me/transactions` | ✅ | Get transaction history |
| GET | `/api/giftcards` | ✅ | List available gift cards |
| POST | `/api/giftcards/redeem` | ✅ | Redeem a gift card |

## AI Workflow

Built with Claude (claude-sonnet-4-6). Used for:
- Scaffolding the Express + TypeScript backend structure
- Designing the JWT middleware and Zod validation patterns
- Frontend component architecture and Tailwind styling
- Security considerations (rate limiting tiers, input sanitization)

Reviewed and adjusted: route logic, mock data realism, balance deduction flow, and error handling edge cases.
