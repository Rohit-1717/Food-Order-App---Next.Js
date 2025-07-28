# 🍽️ Food Ordering Platform — Full Stack Project (Next.js 14 + Tailwind CSS)

A production-grade full-stack Food Ordering Web Platform where customers can browse a menu, place mock orders, and track order status in real-time, while kitchen staff receives live updates and manages order workflows.

---

## 🚀 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS 3.4**
- **Zustand** for state management
- **WebSocket** client for real-time updates

### Backend
- **JSON-RPC 2.0** over HTTP via `app/api/rpc/route.ts`
- **PostgreSQL 15** (via Docker)
- **WebSocket Server** (custom handler or Node microservice)

### DevOps & Deployment
- **Docker** & `docker-compose`
- **GitHub Actions** (optional)
- **Vercel**  (for deployment)
- `.env.example` for environment variables

---

## ✨ Features

- 🧾 Browse menu by category in a responsive layout
- 🛒 Add/Remove items from cart (persistent via localStorage)
- 🧍 Checkout form with customer details
- 📡 Order tracking with real-time WebSocket updates
- 👨‍🍳 Kitchen Dashboard with live order status changes
- 📊 Analytics widget showing revenue & order stats
- 🔐 Follows production-grade architecture and folder standards

---

## 📂 Folder Structure

- `app/` – App Router pages and API routes
  - `app/api/rpc/` – JSON-RPC API handler
- `components/` – Reusable UI components
- `lib/` – WebSocket client, rpcClient, DB helpers
- `styles/` – Tailwind base + global styles
- `public/` – Static files (images/icons)
- `prisma/` or `drizzle/` – DB schema & migration files
- `.env.example` – Sample env configuration
- `Dockerfile` – Container setup
- `docker-compose.yml` – Local dev with Postgres
- `README.md` – Project documentation
- `PLAN.md` – Timeline and dev plan

---

## 📆 Project Timeline

This project was completed in **6 days**:  
- 5 Days → Development  
- 1 Day → Testing, polish, and deployment

Refer to [`PLAN.md`](./PLAN.md) for detailed timeline and goals.

---

## 🧪 Testing

- **Backend:** Vitest unit tests for RPC handlers
- **Frontend:** React Testing Library for core user flows
- Sample Postman collection or cURL commands provided in `/docs/`

---

## 🐳 Running Locally with Docker

1. Clone the repository:

```bash
git clone https://github.com/your-username/food-ordering-app.git
cd food-ordering-app
