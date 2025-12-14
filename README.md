# Sweet Shop Management System

A full-stack **Sweet Shop Management System** that supports **role-based access control**, secure inventory management, and purchasing workflows.  
The application is designed to simulate a real-world e-commerce setup with **customers (users)** and **vendors (admins)** operating under controlled permissions.

---

## Project Overview

This application allows users to:
- Browse available sweets
- Search sweets by name or category
- Purchase sweets (inventory-aware)

Admins (vendors) can:
- Add new sweets
- Update price and quantity
- Restock inventory
- Delete sweets

The backend enforces **JWT-based authentication and authorization**, ensuring that **admin-only actions cannot be performed by regular users**, even if frontend controls are bypassed.

---

## Key Design Decisions

- **Role-Based Access Control (RBAC)** using JWT
- Roles supported:
  - `USER` – customer access
  - `ADMIN` – vendor/inventory access
- Users register as `USER` by default
- Admin roles are **not self-assignable** to prevent misuse
- Backend is the **single source of truth** for authorization
- Designed with a future **SUPER_ADMIN** role in mind (intentionally out of scope)

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (Authentication & Authorization)
- bcrypt (Password hashing)

### Frontend
- React (Vite)
- TypeScript
- CSS (custom styling, no UI libraries)

---

## Authentication & Authorization Flow

1. Users register as `USER` by default
2. On login:
   - Backend verifies credentials
   - JWT is issued containing `userId`, `email`, and `role`
3. JWT is sent with every protected request
4. Backend middleware:
   - Verifies JWT
   - Enforces role-based access (admin-only routes)

> Frontend conditionally renders UI for better user experience,  
> but **all security enforcement happens on the backend**.


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`

### Sweets (Protected)
- `GET /api/sweets`
- `GET /api/sweets/search`
- `POST /api/sweets/:id/purchase`

### Admin-Only
- `POST /api/sweets`
- `PUT /api/sweets/:id`
- `DELETE /api/sweets/:id`
- `POST /api/sweets/:id/restock`

---## Setup & Run Locally

### Clone the Repository
```bash
git clone <your-repository-url>
cd sweet-shop

```
### Backend Setup
```bash
cd backend
npm install
```
### create an env
``` bash
PORT= 
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```


### Run backend
``` bash
npm run dev
```
### Frontend Setup
``` bash
cd frontend
npm install
npm run dev
```
### Testing
 - Unit and integration tests are written for backend services and routes

- Test suite verifies:

- Authentication

- Authorization

- Inventory updates

- Error handling

run tests (using jest)
```bash
npm test
```
### My Ai Usage
AI Tools Used:

- ChatGPT (OpenAI)
####  How I Used AI

I used ChatGPT as a development assistant, not as an auto-code generator.

Specifically, I used it for:

- Architectural discussions

    - Designing role-based access control (USER / ADMIN)

    - Deciding whether to embed roles inside JWT

    - Discussing real-world vendor onboarding patterns (e.g., Zomato)

- Code refinement and validation

    - Reviewing JWT authentication middleware

    - Improving TypeScript typings for JWT payloads

    - Verifying secure route protection

- Debugging support

    - Diagnosing authorization issues

    - Understanding case-sensitivity issues in imports

    - Validating role enforcement logic

- Documentation guidance

    - Structuring this README

    - Framing explanations clearly for evaluators

    - Writing professional justifications for design trade-offs

### Reflection on AI Usage

AI significantly improved my workflow by:

    - Speeding up architectural validation

    - Helping reason through security implications

    - Acting as a second reviewer for design decisions

I consciously avoided:

    - Blindly copying code

    - Using AI-generated solutions without understanding them

    - Letting AI make architectural decisions without critical evaluation

I treated AI as a collaborative tool, similar to consulting documentation or a senior engineer.

### Conclusion

This project demonstrates:

- Secure backend development

- Thoughtful role-based authorization

- Clean separation of concerns

- Real-world inspired system design