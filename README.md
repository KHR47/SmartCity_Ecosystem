# 🌆 Smart City Ecosystem

> A modern full-stack civic management platform for smarter urban living.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![NestJS](https://img.shields.io/badge/NestJS-Backend-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-green)
![TypeScript](https://img.shields.io/badge/TypeScript-FullStack-blue)

---

## 🚀 Project Overview

Smart City Ecosystem is a role-based civic management platform designed to improve urban services through real-time technologies, intelligent monitoring, and efficient communication between citizens and authorities.

The platform combines:

- 🛡️ Issue & Crime Reporting
- 🚗 Smart Parking Management
- 🚌 Public Transport & Transit Tracking
- ⚡ Civic Utility Monitoring
- 📡 Real-Time WebSocket Communication
- 📊 Analytics & Dashboard System

Built with **Next.js 15**, **NestJS**, **PostgreSQL**, and **Socket.IO**, the system delivers a scalable and responsive smart city infrastructure.

---

# ✨ Key Features

## 🛡️ Issue & Crime Management
- Submit civic or crime reports
- Upload evidence (Images / PDFs)
- Anonymous crime reporting
- Real-time authority notifications
- Track report status live
- Officer assignment workflow
- Status history & audit logs

---

## 🚗 Smart Parking Ecosystem
- Live parking slot availability
- Slot reservation & booking
- Parking violation management
- Attendant validation system
- Real-time parking updates

---

## 🚌 Transport & Transit System
- Live GPS vehicle tracking
- Route & schedule management
- Dynamic fare system
- Public transport map interface

---

## ⚡ Civic Utility Monitoring
- Water supply monitoring
- Electricity grid status
- LPG inventory management
- Utility analytics dashboard

---

# 👥 User Roles

| Role | Responsibilities |
|------|------------------|
| 👤 Citizen | Report issues, track reports, book parking |
| 👮 Field Officer | Investigate & resolve reports |
| 🏛️ Authority | Assign officers & manage reports |
| 🛠️ Admin | System management & analytics |
| 🚘 Driver | Push live GPS updates |
| 🅿️ Attendant | Validate parking bookings |
| ⚙️ Operator | Manage transport system |

---

# 🧰 Tech Stack

## Frontend
- Next.js 15 (App Router)
- React
- Tailwind CSS
- Framer Motion
- Axios
- React Leaflet

## Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Socket.IO
- Multer
- Nodemailer

---

# 📡 Real-Time Features

Using **Socket.IO WebSockets**:

- 🔔 New report alerts
- 🚨 Priority escalation notifications
- 📍 Live GPS tracking
- 📊 Real-time dashboard updates
- 🅿️ Parking slot live availability

---

# 🔐 Authentication & Security

- JWT Authentication
- Role-Based Access Control (RBAC)
- Password hashing with bcrypt
- Validation using class-validator
- Secure file upload validation

---

# 📂 Project Structure

```bash
smart-city-ecosystem/
│
├── frontend/       # Next.js Frontend
├── backend/        # NestJS Backend
│
├── uploads/        # Uploaded evidence files
├── docs/
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-city-ecosystem.git
cd smart-city-ecosystem
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=
JWT_SECRET=
SMTP_USER=
SMTP_PASS=
```

Run backend:

```bash
npm run start:dev
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🗄️ Database

- PostgreSQL
- TypeORM ORM
- Entity Relationships
- Soft Deletes
- Audit Trails

---

# 📄 Core Modules

- Authentication
- Reports
- Categories
- Zones
- Parking
- Transport
- Utilities
- Mail Service
- WebSocket Gateway

---

# 📊 Admin Dashboard

Includes:

- Reports analytics
- SLA breach tracking
- Parking occupancy
- Transport monitoring
- Real-time activity updates

---

# 📷 Evidence Upload

Supported file types:
- JPG
- PNG
- PDF

Maximum size:
- 5 MB

---

# 📬 Email Notifications

Automatic emails for:
- Report submission
- Assignment
- Status updates
- Critical alerts
- Resolution completion

---

# 🌍 API Documentation

Swagger API available at:

```bash
/api
```

---

# 🧪 Testing

Implemented using:
- Jest
- Unit Testing
- API Testing
- WebSocket Event Testing

---

# 🎯 Future Improvements

- AI-powered incident prediction
- Smart IoT sensor integration
- Mobile application
- Cloud storage integration
- Payment gateway support

---

# 🤝 Contributors

- Khalid
- Team Members

---

# 📜 License

This project is developed for academic and educational purposes.

---

# 🌟 Smart City Vision

> “Building safer, smarter, and more connected cities through technology.”
