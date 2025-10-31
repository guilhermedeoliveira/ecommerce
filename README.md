# E-Commerce Fullstack Project

A simple fullstack e-commerce application built with React, TypeScript, Express, and Node.js.

## Project Structure

```
ecommerce/
├── backend/           # Express API server
│   ├── src/
│   │   ├── routes/    # API routes
│   │   ├── types/     # TypeScript interfaces
│   │   ├── data/      # Mock data
│   │   └── index.ts   # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/          # React application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── types/      # TypeScript interfaces
│   │   ├── styles/     # CSS files
│   │   ├── App.tsx     # Main App component
│   │   └── main.tsx    # Entry point
│   ├── package.json
│   └── vite.config.ts
└── package.json       # Root scripts
```

## Features

- Product listing with images, descriptions, and prices
- Shopping cart functionality
- Add/remove items from cart
- Update item quantities
- Real-time cart total calculation
- Responsive design
- TypeScript for type safety
- RESTful API architecture

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Install dependencies for all projects:

```bash
npm run install:all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. Set up environment variables:

```bash
# In the backend directory, create a .env file
cd backend
cp .env.example .env
```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend (runs on http://localhost:4000)
npm run dev:backend

# Terminal 2 - Frontend (runs on http://localhost:3000)
npm run dev:frontend
```

### Production Mode

Build and start both:

```bash
npm run build
npm start
```

## Available Scripts

### Root Level

- `npm run install:all` - Install all dependencies
- `npm run dev` - Run both backend and frontend in development mode
- `npm run dev:backend` - Run only backend in development mode
- `npm run dev:frontend` - Run only frontend in development mode
- `npm run build` - Build both backend and frontend
- `npm run start` - Start both backend and frontend in production mode

### Backend (cd backend)

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

### Frontend (cd frontend)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

- `GET /api` - API welcome message
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

## Tech Stack

### Backend

- Node.js
- Express
- TypeScript
- CORS
- dotenv

### Frontend

- React 18
- TypeScript
- Vite
- CSS3

## Features

This project demonstrates:

- Full-stack TypeScript development
- RESTful API design
- React hooks (useState, useEffect)
- Component-based architecture
- State management
- HTTP requests with fetch API
- Responsive CSS design
- npm scripts organization
- Monorepo structure

## Next Steps for Enhancement

- Add user authentication
- Implement persistent storage (database)
- Add product search and filtering
- Implement checkout process
- Add payment integration
- Create order history
- Add product reviews
- Implement pagination
- Add loading states and error handling
- Unit and integration tests

## License

MIT
