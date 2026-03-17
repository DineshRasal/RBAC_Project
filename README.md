# RBAC - Full Stack Authentication & Role-Based Access Control

A full-stack web application with JWT-based authentication and role-based access control built with Spring Boot and React.

---

## Tech Stack

**Backend**
- Java 17, Spring Boot 3.2
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL
- MapStruct + Lombok
- Swagger / OpenAPI

**Frontend**
- React + TypeScript + Vite
- React Router, React Query, React Hook Form
- Axios
- TailwindCSS

---

## Project Structure

```
RBAC/
├── backend/                        → Spring Boot monolithic backend
│   └── src/main/java/com/rbac/
│       ├── config/                 → Security, Swagger, Exception Handler
│       ├── controller/             → Auth + Content REST controllers
│       ├── dto/                    → Request & Response DTOs
│       ├── entity/                 → User entity + Role enum
│       ├── mapper/                 → MapStruct mapper
│       ├── repository/             → JPA repository
│       ├── security/               → JWT filter + JWT utils
│       └── service/                → Auth business logic
│
└── frontend/                       → React + TypeScript frontend
    └── src/
        ├── api/                    → Axios instance + API calls
        ├── components/             → ProtectedRoute
        ├── hooks/                  → useAuth (session management)
        ├── pages/                  → Login, Register, Dashboard
        └── types/                  → TypeScript interfaces
```

---

## Prerequisites

Make sure you have the following installed:

- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rbac.git
cd rbac
```

### 2. MySQL Database Setup

Open MySQL and run:

```sql
CREATE DATABASE rbacdb;
```

> The tables will be auto-created by Hibernate when the backend starts.

### 3. Configure Backend

Open `backend/src/main/resources/application.properties` and update your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rbacdb?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password   ← change this
```

### 4. Run the Backend

```bash
cd backend
mvn clean spring-boot:run
```

Backend runs on → http://localhost:8080

### 5. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on → http://localhost:5173

---

## API Endpoints

### Auth

| Method | URL | Auth Required | Body |
|--------|-----|---------------|------|
| POST | `/api/auth/register` | No | `{ "name": "John", "email": "john@test.com", "password": "123456", "role": "USER" }` |
| POST | `/api/auth/login` | No | `{ "email": "john@test.com", "password": "123456" }` |

### Content

| Method | URL | Auth Required | Role |
|--------|-----|---------------|------|
| GET | `/api/public` | No | Anyone |
| GET | `/api/user` | Yes (Bearer) | USER or ADMIN |
| GET | `/api/admin` | Yes (Bearer) | ADMIN only |

---

## Role Access Matrix

| Role  | /api/public | /api/user | /api/admin |
|-------|-------------|-----------|------------|
| None  | ✅ | ❌ | ❌ |
| USER  | ✅ | ✅ | ❌ |
| ADMIN | ✅ | ✅ | ✅ |

---

## Swagger UI

```
http://localhost:8080/swagger-ui.html
```

**How to authorize in Swagger:**
1. Call `POST /api/auth/login` → copy the `token`
2. Click the **Authorize 🔒** button
3. Enter `Bearer <your_token>`
4. Now hit any protected endpoint

---

## Screenshots

### Register Page
![Register Page](screenshots/register.png)

### Login Page
![Login Page](screenshots/login.png)

### Dashboard - USER Role
![User Dashboard](screenshots/dashboard-user.png)

### Dashboard - ADMIN Role
![Admin Dashboard](screenshots/dashboard-admin.png)

### Swagger UI
![Swagger](screenshots/swagger.png)

---

## How JWT Works in This App

1. User logs in → backend validates credentials → returns JWT token
2. Frontend stores token in `localStorage`
3. Every API request automatically attaches `Authorization: Bearer <token>` via Axios interceptor
4. Backend JWT filter validates the token on each request
5. Spring Security checks the role and allows/denies access

---

## How to Use with Postman

1. Register a user:
```json
POST http://localhost:8080/api/auth/register
{
  "name": "John",
  "email": "john@test.com",
  "password": "123456",
  "role": "USER"
}
```

2. Login to get token:
```json
POST http://localhost:8080/api/auth/login
{
  "email": "john@test.com",
  "password": "123456"
}
```

3. Copy `token` from response → go to **Authorization tab** → select **Bearer Token** → paste token

4. Hit protected endpoints:
```
GET http://localhost:8080/api/user
GET http://localhost:8080/api/admin
```
