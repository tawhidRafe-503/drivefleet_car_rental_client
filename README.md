# 🚗 DriveFleet - Car Rental Platform

**DriveFleet** is a modern, full-stack Car Rental Platform designed to provide a seamless vehicle booking experience for users and fleet owners. Built with **Next.js 16 (App Router)** and **Express.js**, it features real-time search and filtering, secure authentication via **BetterAuth** (Email/Password & Google OAuth 2.0), JWT-protected backend API routes, and full CRUD management for rental vehicles and bookings.

---

## 🌟 Features

### 🔑 Authentication & Security
- **BetterAuth Integration**: Secure Email/Password registration & login with client/server session management.
- **Google OAuth 2.0**: Single-click social authentication via Google Sign-In.
- **BetterAuth JWT Verification**: Automatic JWT token generation (`/api/auth/jwt`) with `Authorization: Bearer <token>` middleware verification on Express backend endpoints.

### 🚗 Vehicle Catalog & Searching
- **Dynamic Fleet Browsing**: Explore available cars with high-resolution image galleries and daily rental rates.
- **Search & Category Filtering**: Filter vehicles by type (*Sedan, SUV, Luxury, Electric, Convertible, Hatchback*) or location and name search query.
- **Car Details View**: Comprehensive vehicle details page with specifications, features, owner information, and rental pricing.

### 📅 Car Booking System
- **Interactive Booking Modal**: Select rental options including self-drive or driver options (+$25/day), special notes, and instant confirmation.
- **My Bookings Dashboard**: View all user bookings, monitor status (*Confirmed, Pending, Cancelled*), update details, or cancel bookings.

### 🚘 User Fleet Management
- **Add New Vehicle**: Fleet owners can list new cars with details, image URLs, pickup location, daily price, and specifications (`/add-car`).
- **My Cars Management**: Owner dashboard to view listed vehicles (`/my-cars`), update car information (`/my-cars/update/[id]`), or remove listings.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [HeroUI](https://heroui.com/)
- **Icons & Notifications**: `react-icons`, `react-hot-toast`
- **HTTP & State**: Custom fetch wrappers with `getBetterAuthHeaders()`, React Context API

### **Authentication & Security**
- **Auth Engine**: [BetterAuth](https://www.better-auth.com/) (`better-auth`, `@better-auth/mongo-adapter`)
- **Token Signing**: `jsonwebtoken` (JWT creation & verification)
- **Providers**: Email/Password Credential Provider & Google OAuth 2.0 Provider

### **Backend & Database**
- **Server**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (MongoDB Native Driver & `@better-auth/mongo-adapter`)
- **Middleware**: Custom CORS, Express JSON parser, and `verifyBetterAuthToken` JWT authentication guard

---

## 🚀 Getting Started

Follow these steps to run **DriveFleet** locally on your machine.

### 📋 Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB Database**: Local MongoDB server or MongoDB Atlas cluster connection string.

---

### 📥 1. Environment Setup

#### **Frontend (`drivefleet_frontend/.env.local`)**
Create a `.env.local` file in `drivefleet_frontend/` with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_shared_jwt_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

#### **Backend (`drivefleet_backend/.env`)**
Create a `.env` file in `drivefleet_backend/` with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=Drivefleet_Car_Platform
BETTER_AUTH_SECRET=your_shared_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

---

### 💻 2. Installation & Running

#### **Run Backend Server (`drivefleet_backend`)**
```bash
cd drivefleet_backend
npm install
node index.js
```
*The Express backend will start running at `http://localhost:5000`.*

#### **Run Frontend Application (`drivefleet_frontend`)**
```bash
cd drivefleet_frontend
npm install
npm run dev
```
*Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 🏗️ Production Build & Verification

To verify code quality and build for production:

```bash
# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📜 API Route Endpoints Summary

| Method | Endpoint | Protection | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cars` | Public | Fetch all available vehicles (supports `search` & `type` query filters) |
| `GET` | `/cars/:id` | Public | Retrieve single car details by ID |
| `POST` | `/cars` | **JWT Protected** | Add a new vehicle listing |
| `GET` | `/cars/my-cars` | **JWT Protected** | Retrieve vehicles added by current user |
| `PATCH` | `/cars/:id` | **JWT Protected** | Update vehicle details by ID |
| `DELETE` | `/cars/:id` | **JWT Protected** | Remove vehicle listing by ID |
| `POST` | `/bookings` | **JWT Protected** | Create a new car booking entry |
| `GET` | `/bookings/my-bookings`| **JWT Protected** | Retrieve user's bookings |
| `PATCH` | `/bookings/:id` | **JWT Protected** | Update booking details |
| `DELETE` | `/bookings/:id` | **JWT Protected** | Cancel booking |

---

## 📄 License
This project is open-source and available under the **MIT License**.
