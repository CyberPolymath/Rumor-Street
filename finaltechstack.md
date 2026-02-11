# RumorStreet - Final Tech Stack (2026)

## 📋 Overview
This is the **FINAL, PRODUCTION-READY tech stack** for RumorStreet - a dynamic, immersive stock market simulation game with advanced animations, real-time multiplayer features, and a relaxing user experience.

---

## 🎮 FRONTEND (Client-Side)

### Core Framework
- **Next.js 14** (App Router) - React meta-framework for production
- **React 18+** - UI library with latest hooks
- **TypeScript** - Type-safe development (STRONGLY RECOMMENDED)
- **Node.js 18+ LTS** - JavaScript runtime

### 🎨 Styling & Layout
- **TailwindCSS 3.4+** - Utility-first CSS framework for rapid development
- **CSS Modules** - Scoped component styles
- **PostCSS** - CSS transformation
- **Autoprefixer** - Browser compatibility

### 🎬 Animations (Critical for Game Experience)
- **Framer Motion 11+** - React motion library for smooth animations
  - Page transitions
  - Component animations
  - Interactive UI elements
  - Gesture animations
  
- **GSAP 3.12+** (GreenSock Animation Platform) - Advanced animation library
  - DOM animations
  - Canvas animations
  - Timeline animations
  - Performance-critical animations
  
- **THREE.js 14+ OR Babylon.js 5+** - 3D Graphics Library
  - 3D background effects on welcome page
  - Dynamic 3D scene rendering
  - Particle effects
  - Camera controls
  - **CHOICE: THREE.js (recommended for games, more community support)**

- **Lottie 4+** - Lightweight animation library
  - Pre-made animation files (JSON)
  - Smaller bundle size
  - Easy integration
  - Use for: loading animations, icons, small effects

### 🔊 Audio/Sound System (Critical for Relaxation Game)
- **Howler.js 2.2+** - Audio library
  - Background music management
  - Sound effects system
  - Volume control
  - Playlist management
  - Spatial audio support
  
- **Web Audio API** - Native browser audio
  - Real-time sound effect generation
  - Audio analysis
  - EQ and effects

### 📊 Data Visualization
- **Recharts 2.10+** - React components for charts
  - Stock price line charts
  - Candle charts
  - Portfolio distribution (pie/bar)
  - Real-time chart updates
  - Responsive charts
  
- **Chart.js 4+** (Alternative/Backup)
  - More customization options
  - Lightweight alternative

### 🎛️ State Management & Data
- **Zustand 4.4+** - Lightweight state management
  - Global game state (user, portfolio, prices)
  - UI state (modals, notifications)
  - Middleware support
  - TypeScript support
  
- **React Query (TanStack Query) 5+** - Server state management
  - Data fetching & caching
  - Background updates
  - Synchronization
  - Offline support

### 🔗 Real-Time Communication (Mandatory for Multiplayer)
- **Socket.io Client 4.7+** - WebSocket library
  - Live price updates
  - Multiplayer game synchronization
  - Real-time notifications
  - Chat/AI responses
  - Leaderboard updates
  
- **Axios 1.6+** - HTTP client
  - REST API calls
  - Interceptors
  - Request/response transformations

### 🎯 UI & Forms
- **React Hook Form 7+** - Efficient form library
  - Login/signup forms
  - Investment forms
  - Settings forms
  - Minimal re-renders
  
- **Zod 3.22+** - TypeScript-first validation
  - Form validation
  - API response validation
  - Type safety

### 📱 UI Components & Icons
- **Lucide React 0.563+** - Icon library
- **Headless UI** (Optional) - Accessible component library
- **Radix UI** (Optional) - Unstyled, accessible components

### 🎯 Utilities & Helpers
- **Lodash 4.17+** - Utility library
- **classnames** - Conditional CSS classes
- **date-fns 2.30+** - Date manipulation
- **numeral.js** - Number formatting
- **uuid** - Unique ID generation

### 📦 Performance & Optimization
- **Next Image** - Automatic image optimization
- **Dynamic Imports** - Code splitting
- **Compression** - Bundle size reduction
- **Vercel Analytics** - Performance monitoring

### 📚 Development Tools
- **ESLint 9+** - Code quality
- **Prettier 3+** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit linting

---

## 🖥️ BACKEND (Server-Side)

### Core Runtime
- **Node.js 18+ LTS** - JavaScript server runtime
- **Express.js 4.18+** - Web framework
- **TypeScript** - Type-safe backend

### 🔗 Real-Time Communication (Mandatory)
- **Socket.io Server 4.7+** - Real-time, bidirectional communication
  - Live stock price updates
  - Multiplayer game rooms
  - Tournament coordination
  - AI opponent interactions
  - Notification system
  - Leaderboard live updates

### 🗄️ Databases (Critical Migration from Firebase)
- **PostgreSQL 15+** - Relational database
  - User accounts & profiles
  - Portfolio data
  - Investment history
  - Leaderboard rankings
  - Tournament data
  - Company metrics
  - News/rumors storage
  
- **Redis 7+** - In-memory cache & session store
  - Real-time price caching
  - Session management
  - Leaderboard caching
  - Rate limiting
  - Pub/Sub for real-time updates
  - Game state synchronization

### 🔐 Authentication & Security
- **Firebase Admin SDK** - Keep existing Google OAuth
- **JWT (jsonwebtoken)** - Token-based authentication
- **Bcrypt 5+** - Password hashing
- **CORS 2.8+** - Cross-origin security
- **Express Rate Limiter** - DDoS protection
- **Helmet 7+** - Security headers
- **Dotenv 16+** - Environment variables
- **Crypto** - Data encryption

### 🌐 API Tools
- **Axios 1.6+** - HTTP client for external APIs
- **Node-fetch** - Fetch API for Node.js
- **Express Middleware** - Custom middleware

### 📊 Data Processing & AI
- **Bull/BullMQ** - Job queue for background tasks
  - Leaderboard calculations (every 3 weeks)
  - Price updates
  - Reward distributions
  - Email notifications
  
- **Cron** - Scheduled tasks
  - Daily reward distribution
  - Weekly leaderboard resets
  - Price data updates
  
- **TensorFlow.js or Python Flask** - AI/ML for AI opponent
  - Stock analysis
  - Prediction models
  - Game difficulty scaling

### 📡 Data Sources & APIs
- **Alpha Vantage API** - Historical stock data
  - Historical prices
  - Technical indicators
  
- **NewsAPI / Newsapi.org** - Historical news
  - News from 2022-2024
  - News aggregation
  
- **Your Custom Dataset** - Seeded rumors & news
  - Custom story-based news
  - Game-specific rumors

### 🛠️ Database ORM/Query Builder
- **Prisma 5+** (RECOMMENDED) - Next-gen ORM
  - Type-safe database access
  - Auto-migrations
  - Excellent TypeScript support
  - Query building
  
- **TypeORM 0.3+** (Alternative) - Decorator-based ORM
- **Sequelize 6+** (Alternative) - Traditional ORM

### 📝 Validation & Serialization
- **Zod 3.22+** - Schema validation
- **Joi 17+** - Data validation
- **Class-validator** - Decorator-based validation

### 📚 Logging & Monitoring
- **Winston 3+** - Logging library
- **Morgan 1.10+** - HTTP request logger
- **Sentry** - Error tracking
- **LogRocket** - Session replay & monitoring

### 🔧 Utilities
- **Lodash** - Utility functions
- **moment.js or date-fns** - Date handling
- **uuid** - Unique IDs

---

## 📊 DATABASE SCHEMA (PostgreSQL)

### Tables Required
```
Users:
├─ id (UUID)
├─ email (unique)
├─ username (unique)
├─ password_hash
├─ display_name
├─ firebase_uid
├─ wallet_balance
├─ total_balance
├─ created_at
├─ updated_at

Portfolios:
├─ id (UUID)
├─ user_id (FK)
├─ company_id (FK)
├─ shares_owned
├─ average_buy_price
├─ current_value
├─ total_invested
├─ profit_loss
├─ created_at
├─ updated_at

Transactions:
├─ id (UUID)
├─ user_id (FK)
├─ company_id (FK)
├─ transaction_type (buy/sell)
├─ shares
├─ price_at_transaction
├─ total_amount
├─ timestamp

Companies:
├─ id (UUID)
├─ name
├─ ticker
├─ sector
├─ current_price
├─ market_cap
├─ description

Rumors:
├─ id (UUID)
├─ company_id (FK)
├─ title
├─ content
├─ sentiment (positive/negative/neutral)
├─ reliability_score
├─ created_at
├─ is_real (boolean)

Leaderboard:
├─ id (UUID)
├─ user_id (FK)
├─ rank
├─ total_portfolio_value
├─ profit_loss
├─ period (3 weeks)
├─ reward_amount
├─ created_at

GameSessions:
├─ id (UUID)
├─ user1_id (FK)
├─ user2_id (FK)
├─ game_type (trading/investing/metric)
├─ status (active/completed)
├─ winner_id (FK)
├─ prize_amount
├─ created_at
├─ ended_at
```

### Redis Cache Keys
```
- prices:{company_id} → Current price
- portfolio:{user_id} → User's holdings
- leaderboard:top100 → Top 100 users
- game_session:{session_id} → Active game data
- user_session:{user_id} → User online status
```

---

## 🎯 Real-Time Architecture (Socket.io)

### Namespaces
```
/game
├─ Event: price-update → Live stock prices
├─ Event: rumor-feed → New rumors published
├─ Event: portfolio-change → User portfolio updates
└─ Event: notification → User notifications

/multiplayer
├─ Event: game-room-created
├─ Event: player-joined
├─ Event: game-state-update
├─ Event: player-action (buy/sell)
└─ Event: game-ended

/leaderboard
├─ Event: rank-updated
├─ Event: top-100-updated
└─ Event: reward-distributed

/ai-chat
├─ Event: ai-message
├─ Event: user-message
└─ Event: chat-ended

/notifications
├─ Event: reward-notification
├─ Event: leaderboard-reset
└─ Event: system-alert
```

---

## 🎨 Asset Management

### Image Storage
- **Cloudinary or AWS S3** - Cloud image storage
  - Background images (high quality)
  - Company logos
  - User avatars
  - Optimized delivery

### Audio Storage
- **AWS S3 or Cloudinary** - Cloud audio storage
  - Background music (MP3/WAV)
  - Sound effects
  - Voice narration

### 3D Models & Assets
- **THREE.js scenes** - Store 3D models in JSON format
- **GLTF/GLB format** - 3D model standard
- **Particle systems** - Lottie animations

---

## 🔐 Authentication Flow

```
1. User logs in with Google OAuth (Firebase) OR Email/Password
2. Backend validates & creates JWT token
3. Token stored in secure HTTP-only cookie
4. PostgreSQL user record created/updated
5. Redis session created
6. Socket.io connection authenticated
7. Real-time data synced
```

---

## 🚀 Deployment & Infrastructure

### Frontend
- **Vercel** - Next.js hosting (RECOMMENDED)
  - Automatic deployments from Git
  - CDN for global distribution
  - API routes support
  - Bundle optimization
  - Analytics included

### Backend
- **Railway.app** or **Render.com** (RECOMMENDED for complete stack)
  - Node.js/Express hosting
  - PostgreSQL database included
  - Redis addon available
  - Auto-scaling
  - Environment variables management
  
- **Alternative: Hetzner Cloud** - More control, lower cost
  - VPS for Node.js
  - Managed PostgreSQL
  - Managed Redis

### Database & Cache
- **Railway PostgreSQL** or **Managed PostgreSQL**
  - Automated backups
  - SSL connections
  - Performance monitoring
  
- **Railway Redis** or **Upstash Redis**
  - In-memory cache
  - Global replication
  - Monitoring

### CDN & Storage
- **Cloudflare** - CDN for fast content delivery
  - Image optimization
  - DDoS protection
  - Analytics
  
- **AWS S3 or Cloudinary** - Asset hosting
  - Images
  - Audio files
  - Backups

### Domain & SSL
- **Cloudflare / Let's Encrypt** - SSL certificates
- **Custom domain provider** - Domain registration

---

## 📦 Dependencies Summary

### Frontend Package Count: ~45-50 packages
### Backend Package Count: ~40-45 packages
### Total: ~85-95 packages (optimized, production-ready)

---

## ⚡ Performance Targets

| Metric | Target | Tools |
|--------|--------|-------|
| Initial Page Load | < 2 seconds | Next.js, Vercel, TailwindCSS |
| Time to Interactive | < 3 seconds | Code splitting, Dynamic imports |
| Largest Contentful Paint | < 2.5s | Image optimization, Prioritized loading |
| Animation Frame Rate | 60 FPS | GSAP, Framer Motion optimization |
| Stock Price Update Latency | < 500ms | Socket.io, Redis |
| Database Query Time | < 200ms | PostgreSQL indexes, Redis cache |
| Bundle Size | < 150KB (gzipped) | Tree-shaking, Code splitting |

---

## 🔄 Development Workflow

### Local Development Stack
```
Frontend: Next.js dev server (port 3000)
Backend: Express dev server (port 3001)
Database: PostgreSQL (localhost:5432)
Cache: Redis (localhost:6379)
Real-time: Socket.io (ws://localhost:3001)
```

### Commands
```bash
# Frontend
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # Prettier format

# Backend
npm run dev          # Start Express with nodemon
npm run build        # Production build
npm run migrate      # Prisma migrations
npm run seed         # Seed database
```

---

## 📋 Project Structure

```
RumorStreet-NextGen/
│
├── frontend/                    # Next.js 14 app
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (game)/
│   │   ├── (profile)/
│   │   └── (tournament)/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
├── backend/                     # Express.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── sockets/
│   │   ├── models/ (or schema/)
│   │   ├── utils/
│   │   ├── config/
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
│
├── shared/                      # Shared types/interfaces
│   └── types.ts
│
├── .env.example
├── docker-compose.yml           # Local development
└── finaltechstack.md           # This file
```

---

## 🎯 Migration Timeline (From Current to Final Stack)

### Week 1-2: Setup
- Initialize Next.js 14 + TypeScript project
- Setup TailwindCSS
- Configure Express backend
- Setup PostgreSQL + Redis locally
- Initialize Git repository

### Week 3-4: Core Architecture
- Zustand store setup
- Socket.io real-time infrastructure
- Database schema & Prisma models
- Authentication system
- API endpoints

### Week 5-6: Frontend Features
- Page layouts with Framer Motion
- Howler.js audio integration
- Recharts stock visualization
- Form validation with React Hook Form

### Week 7-8: Backend Logic
- Game logic (buy/sell, portfolio)
- Leaderboard calculations
- Real-time price updates
- AI opponent system

### Week 9-10: Polish & Deploy
- Performance optimization
- THREE.js welcome page
- GSAP animations
- Testing
- Deployment to Vercel + Railway

---

## ✅ Checklist Before Starting

- [ ] Node.js 18+ installed
- [ ] GitHub account for version control
- [ ] Vercel account for frontend deployment
- [ ] Railway/Render account for backend
- [ ] Firebase project for OAuth setup
- [ ] Cloud storage account (Cloudinary/S3)
- [ ] PostgreSQL client installed
- [ ] Redis installed locally (or Docker)
- [ ] API keys: Alpha Vantage, NewsAPI

---

## 🎓 Learning Resources

- **Next.js 14**: https://nextjs.org/docs
- **GSAP**: https://greensock.com/docs/
- **Framer Motion**: https://www.framer.com/motion/
- **Howler.js**: https://howlerjs.com/
- **Socket.io**: https://socket.io/docs/
- **Zustand**: https://github.com/pmndrs/zustand
- **Prisma**: https://www.prisma.io/docs/
- **THREE.js**: https://threejs.org/docs/
- **TailwindCSS**: https://tailwindcss.com/docs

---

## 📞 Summary

This is a **PRODUCTION-READY, ENTERPRISE-GRADE tech stack** designed specifically for RumorStreet's requirements:

✅ Highly dynamic animations (Framer Motion + GSAP + THREE.js)
✅ Immersive audio (Howler.js)
✅ Zero-loading feel (Next.js + Vercel)
✅ Real-time multiplayer (Socket.io + Redis)
✅ Scalable infrastructure (PostgreSQL + Redis + Node.js)
✅ Type-safe development (TypeScript)
✅ Beautiful UI (TailwindCSS + Lucide)
✅ Professional deployment (Vercel + Railway)

**Status**: Ready to build! 🚀

---

**Document Created**: February 11, 2026
**Last Updated**: February 11, 2026
**Status**: FINAL & APPROVED ✅
