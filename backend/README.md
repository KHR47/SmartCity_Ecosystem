# Smart City Ecosystem API

NestJS backend for the Smart City Ecosystem platform.

## Main Responsibilities

- Authentication, JWT sessions, and role-based access
- Civic report management, assignment, comments, and status history
- Water, gas, and electricity meter/service APIs
- Parking lots, slots, bookings, vehicles, and violations
- Transport routes, schedules, fares, bookings, and feedback
- Location data for divisions, districts, thanas, and upazilas
- Notifications, uploads, and live WebSocket report updates

## Commands

```bash
npm run start:dev
npm run build
npm run test
npm run test:e2e
```

## Seed And Maintenance Scripts

```bash
npm run seed:demo
npm run seed:parking
npm run db:list-districts
npm run db:list-divisions
npm run db:inspect-duplicate-districts
npm run db:merge-duplicate-districts
npm run db:merge-renamed-districts
npm run db:merge-duplicate-divisions
```

Database maintenance scripts are kept in `scripts/database/`.
