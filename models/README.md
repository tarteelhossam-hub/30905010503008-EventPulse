# 30905010503008-EventPulse API — Event Management Platform Backend

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-4.x-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.x-black?style=for-the-badge&logo=socketdotio)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-brightgreen?style=for-the-badge&logo=swagger)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

### GitHub Repository Link:https://github.com/tarteelhossam-hub/30905010503008-EventPulse
### Deployed API Link (Vercel):https://30905010503008-event-pulse-git-main-tarteel-hossam.vercel.app
### Health Check Status:https://30905010503008-event-pulse-git-main-tarteel-hossam.vercel.app/health

**EventPulse** is a robust, production-grade Backend RESTful API & Real-Time Server for an Event Management Platform. Built with **Node.js**, **Express.js**, **MongoDB**, and **Socket.io**, it features authentication & authorization, event management with advanced query features, dynamic capacity handling, real-time announcements, comprehensive validation, central error handling, automated testing, and interactive API documentation.

---

## Features & Architecture Highlights

-  **MVC Architecture:** Structured separation into `models/`, `controllers/`, `routes/`, `middleware/`, `utils/`, and `config/`.
-  **Authentication & RBAC:** Secure password hashing via `bcrypt`, JWT token authorization, and role-based access control (`admin` vs `attendee`).
-  **Advanced Query Engine:** Support for filtering (category, city, date range), sorting (date, popularity), pagination (`page`, `limit`), and text search across titles & descriptions.
-  **Event Registrations & Capacity:** Strict capacity tracking, duplicate registration prevention, and user registration management.
-  **Real-Time Announcements:** WebSockets powered by **Socket.io** using room-based broadcasting (`event_[ID]`) with persistent message history stored in MongoDB.
-  **Validation & Error Handling:** Input validation using `express-validator` (returning 422 for invalid requests) and centralized error handling with custom `AppError` and `asyncHandler` utilities.
-  **Automated Testing:** Unit tests for utilities and integration tests for Events API using **Jest** & **Supertest**.
-  **Interactive API Docs & Monitoring:** Swagger UI documentation hosted on `/api-docs` and a server health check on `/health`.

---

## Tech Stack & Dependencies

### Core Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ORM
- **Real-Time:** Socket.io

### Required Packages (Installed)

```json
"dependencies": {
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.19.2",
  "express-validator": "^7.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.4.1",
  "socket.io": "^4.7.5",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1"
},
"devDependencies": {
  "jest": "^29.7.0",
  "supertest": "^7.0.0"
}
```
## Local Installation & Setup Guide
- Follow these steps to set up and run the project locally on your machine:
## 1. Clone the Repository
```
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/<StudentID>-EventPulse.git
cd <StudentID>-EventPulse
```
## 2. Install Dependencies
```
npm install
```
## 3. Environment Configuration
- Create a .env file in the root directory and add the following environment variables (refer to .env.example):
```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eventpulse?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```
## 4. Seed the Database
- Populate your database with default categories (Music, Tech, Sports), sample events, and an Admin user:
```
npm run seed
```
## 5. Run the Application
- Development Mode:
```
npm run dev
```
- Production Mode:
```
npm start
```
## 6. Run Automated Tests
```
npm test
```
# Versioning & Release
- This project follows strict Git Workflow standards:

Conventional Commits: feat:, fix:, docs:, test:, refactor:.

Release Tag: v1.0.0
```
git tag -a v1.0.0 -m "Release v1.0.0 - Complete EventPulse API"
git push origin v1.0.0
```
## Developed with ❤️ as part of Level 4 Semester 2 Final Project.