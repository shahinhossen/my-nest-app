# NestJS Simple Auth & User Management

A **beginner‑friendly learning project** built with **NestJS** to understand core backend concepts such as:

* Modules
* Controllers
* Services
* Dependency Injection
* DTO
* Password hashing with bcrypt
* In‑memory (local) database logic

This project is intentionally **simple and clean**, designed for learning—not production.

---

## 🎯 Project Goal

The goal of this project is to:

* Learn **NestJS fundamentals** step‑by‑step
* Understand **request flow** (Controller → Service)
* Practice **clean architecture habits** early
* Build confidence before moving to databases (Prisma / MongoDB)

---

## 🧠 What You Will Learn

* How NestJS modules work
* How controllers handle HTTP requests
* How services contain business logic
* How to share services between modules
* How to hash and compare passwords securely
* How to handle errors with proper HTTP status codes

---

## 🏗️ Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
│
├── user/
│   ├── dto/
│   │   └── updateUser.dto.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
│
├── app.module.ts
├── app.controller.ts
├── app.service.ts
└── main.ts
```

---

## 🔐 Features

### Authentication

* Register a new user
* Password hashing using **bcrypt**
* Prevent duplicate email registration

### User Management (In‑Memory)

* Create user
* Find user by email
* Update user information
* Delete user

> ⚠️ Data is stored in memory. Restarting the server resets all users.

---

## 📦 Tech Stack

* **NestJS** – Backend framework
* **TypeScript** – Type safety
* **bcrypt** – Password hashing
* **pnpm** – Package manager

---

## 📥 Installation

```bash
pnpm install
```

---

## ▶️ Running the Project

```bash
pnpm run start:dev
```

Server will start at:

```
http://localhost:3000
```

---

## 📮 API Endpoints

### Register User

```
POST /auth/register
```

**Request Body**

```json
{
  "name": "Shahin Rana",
  "email": "shahin@gmail.com",
  "password": "Test1234"
}
```

**Success Response**

```json
{
  "message": "User Created!"
}
```

---

## 🧪 Error Handling

The project uses **NestJS built‑in exceptions**:

* `BadRequestException` → Invalid input
* `ConflictException` → Duplicate email
* `NotFoundException` → User not found
* `UnauthorizedException` → Login failure

This keeps responses **consistent and clean**.

---

## 🔑 Password Security

* Passwords are **never stored in plain text**
* `bcrypt.hash()` is used during registration
* `bcrypt.compare()` is used during login

---

## 🚧 Limitations (By Design)

* No database (in‑memory only)
* No JWT / session handling
* No roles or permissions
* No Body data validation

These will be added in later learning stages.

---

## 🛣️ Next Learning Steps

After completing this project, you can extend it with:

* JWT authentication
* Refresh tokens
* Prisma / MongoDB integration
* Role‑based access control
* Global response interceptor
* Production‑ready folder structure

---

## 🧠 Learning Philosophy

> **First understand the flow, then add complexity.**

This project focuses on **clarity over completeness**.

---

## 👤 Author

Built by **Md. Shahin Hossen** as a NestJS learning project to explore backend fundamentals step-by-step.

### Thankyou

