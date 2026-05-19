# Project Structure

This file explains the purpose of the major folders and important files in the Smart City Ecosystem project.

## Root

```text
smart-city-ecosystem/
├── backend/              NestJS API application
├── frontend/             Next.js web application
├── README.md             Project overview and main commands
├── PROJECT_STRUCTURE.md  Folder and naming guide
└── SYSTEM_DESIGN.md      Architecture and system design notes
```

## Backend

```text
backend/
├── src/                  API source code
├── scripts/              Manual database maintenance scripts
├── test/                 End-to-end tests
├── uploads/              Uploaded user/report documents
├── package.json          Backend commands and dependencies
├── nest-cli.json         NestJS CLI configuration
├── tsconfig.json         TypeScript configuration
└── tsconfig.build.json   Production build TypeScript configuration
```

### Backend Source Modules

```text
backend/src/
├── auth/                 Login, registration, JWT, role guards
├── categories/           Report/service category APIs
├── common/               Shared enums, request types, and cross-module types
├── documents/            Uploaded document metadata and file handling
├── electricity/          Electricity meter and outage APIs
├── gas/                  Gas meter and leak APIs
├── gateway/              WebSocket gateway for live report updates
├── locations/            Bangladesh division, district, thana, and upazila APIs
├── notifications/        User notification APIs
├── parking/              Parking lots, slots, bookings, vehicles, violations
├── reports/              Civic issue reports, comments, assignment, status history
├── transport/            Transport routes, bookings, schedules, fares
├── users/                User profile and account management
├── water/                Water meters, leaks, billing, usage
├── zones/                City zone management
├── app.module.ts         Root NestJS module
├── app.controller.ts     Root API controller
├── app.service.ts        Root API service
├── main.ts               API bootstrap file
├── seed.ts               Demo data seed script
└── seed-parking.ts       Parking demo data seed script
```

### Backend Scripts

```text
backend/scripts/database/
├── inspect-duplicate-districts.ts  Find duplicate district names
├── list-districts.ts               Print districts from the database
├── list-divisions.ts               Print divisions from the database
├── merge-duplicate-districts.ts    Merge repeated district records
├── merge-renamed-districts.ts      Merge old/new district spelling records
└── merge-duplicate-divisions.ts    Merge duplicate division records
```

Run these scripts from `backend/` with the matching npm command, for example:

```bash
npm run db:list-districts
```

## Frontend

```text
frontend/
├── src/                  Web application source code
├── public/               Static assets served by Next.js
├── scripts/              Manual frontend/API helper scripts
├── package.json          Frontend commands and dependencies
├── next.config.ts        Next.js configuration
├── tsconfig.json         TypeScript configuration
├── postcss.config.mjs    PostCSS/Tailwind configuration
└── eslint.config.mjs     ESLint configuration
```

### Frontend Source

```text
frontend/src/
├── app/                  Next.js App Router pages and layouts
├── components/           Shared React components
├── context/              React context providers
├── hooks/                Shared React hooks
├── lib/                  API clients, auth helpers, and shared utilities
└── types/                Shared TypeScript types
```

### Frontend Route Groups

```text
frontend/src/app/
├── admin/                Admin dashboards and management pages
├── attendant/            Parking attendant pages
├── authority/            Utility authority dashboards
├── driver/               Driver dashboard and validation pages
├── electricity/          Citizen electricity pages
├── gas/                  Citizen gas pages
├── officer/              Officer report handling pages
├── operator/             Transport/parking operator pages
├── parking/              Citizen parking pages
├── reports/              Civic report list, create, edit, and detail pages
├── transport/            Citizen transport routes, tickets, alerts, feedback
├── water/                Citizen water pages
└── utilities/            Utility service entry point
```

### Frontend Components

```text
frontend/src/components/
├── layout/               Navbar, providers, theme toggle, notifications
├── map/                  Transparency map and heatmap layers
├── reports/              Report-specific map and status UI
└── ui/                   Reusable UI primitives
```

### Frontend Scripts

```text
frontend/scripts/
└── seed-parking-lots.js  Seeds parking lots through the backend API
```

Run it from `frontend/`:

```bash
npm run seed:parking-lots
```

## File Naming Guide

- `page.tsx` and `layout.tsx` are Next.js framework files. Their parent folder names define URL paths.
- `[id]` and `[lotId]` are dynamic Next.js route parameters.
- `*.controller.ts` files receive HTTP requests in NestJS.
- `*.service.ts` files hold business logic.
- `*.module.ts` files register NestJS modules.
- `dto/` folders contain request/response validation shapes.
- `entities/` folders contain TypeORM database models.
- `scripts/` folders contain manual maintenance or seed commands.
