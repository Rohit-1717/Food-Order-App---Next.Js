# ⚡ 6-Day Execution Plan — Food Ordering Platform (Next.js 14 + Tailwind CSS)

This document outlines the plan, folder structure, timeline, risks, and daily goals to build a full-stack Food Ordering Platform using **Next.js 14**. The goal is to complete development in **5 days**, with **Day 6** reserved for testing, polish, and deployment.

---

## ✅ Assumptions

- Framework: **Next.js 14** (App Router) with **Tailwind CSS 3.4**
- State Management: **Zustand**
- Backend: **JSON-RPC 2.0** APIs (`/app/api/rpc/route.ts`)
- Real-time: **Native WebSocket**
- Database: **PostgreSQL 15** (via Docker)
- Deployment: **Vercel** on Day 6
- Testing Tools: **Vitest**, **React Testing Library**
- CI/CD: **GitHub Actions** (optional)
- No Firebase, Supabase, or any BaaS for realtime or data

---

## 🗂 Project Folder Structure

- `app/` – App Router pages and layouts
  - `app/api/rpc/` – JSON-RPC API route handler
  - `app/layout.tsx` – Shared layout (e.g., Navbar/Footer)
  - `app/page.tsx` – Home page
- `components/` – Reusable UI components
  - Example: `Navbar.tsx`, `CartItem.tsx`, `OrderCard.tsx`
- `lib/` – Client utilities
  - `rpcClient.ts` – JSON-RPC API caller
  - `websocketClient.ts` – WebSocket connection & handlers
- `styles/` – Tailwind base + custom styles
- `public/` – Static assets like images, icons
- `prisma/` or `drizzle/` – SQL migrations and DB schema
- `.env.example` – Environment variable template
- `Dockerfile` – App Docker container
- `docker-compose.yml` – Local setup for app + PostgreSQL
- `README.md` – Project overview and usage guide
- `PLAN.md` – Project planning document (this file)

---

## 📆 6-Day Timeline

| Day | Objective |
|-----|-----------|
| Day 0 | Kickoff: Create `PLAN.md`, initialize project & repo |
| Day 1 | Project scaffold: Tailwind, layout, routing, dummy menu |
| Day 2 | Cart system, localStorage, Checkout form with validation |
| Day 3 | Backend: JSON-RPC APIs + PostgreSQL schema & seed data |
| Day 4 | WebSocket setup, Kitchen dashboard, live order updates |
| Day 5 | Finalize order flow, analytics widget, payment simulation |
| Day 6 | Testing, Docker, documentation, optional CI/CD & deployment |

---

## 📌 Core Deliverables

- **Frontend**:
  - Menu display with category grid
  - Add/remove Cart with persistence
  - Checkout form and live order tracker
  - Kitchen Dashboard UI
  - Analytics widget

- **Backend**:
  - JSON-RPC API endpoints:
    - `getMenu`, `placeOrder`, `getOrderStatus`, `acceptOrder`, `updateOrderStatus`, `confirmPayment`
  - PostgreSQL integration with schema
  - WebSocket gateway for live order events

- **Real-time**:
  - WebSocket events:
    - `order_created`, `order_updated`, `analytics_update`

- **DevOps**:
  - Docker setup for local and production
  - `.env.example`, health checks
  - GitHub Actions (optional)

- **Documentation & Testing**:
  - `README.md`, `ARCHITECTURE.md`
  - Sample Postman collection or cURL
  - Tests for backend and frontend flows

---

## ⚠️ Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| WebSocket instability | High | Build and test minimal WS stub early |
| JSON-RPC error handling | Medium | Follow strict schema from Day 3 |
| Deployment errors | Medium | Start Docker config by Day 5 |
| Time crunch | High | Focus on core user flows first |
| Test coverage gap | Low | Cover only critical flows on Day 6 |

---

## ✅ Day 0 Tasks

- [x] Create `PLAN.md` file with structure and goals
- [x] Finalize tech stack, folders, architecture plan
- [x] Create public GitHub repository
- [x] Initialize Next.js project using the command:

  `npx create-next-app@latest food-ordering-app --app --ts --tailwind --eslint --src-dir --import-alias "@/*"`

- [x] Set up folders: `app/`, `components/`, `lib/`, `styles/`
- [x] Push initial project to GitHub
- [ ] Start base layout: `layout.tsx`, `Navbar.tsx`

---

## ⏭️ Day 1 – Preview

- Build responsive layout with Tailwind
- Setup routing: `/menu`, `/checkout`, `/track`, `/kitchen`
- Load dummy static menu items from JSON
- Design category-based menu grid UI
