# E-Commerce Fullstack Project

A simple fullstack e-commerce application built with React, TypeScript, Express, and Node.js.

## Project Structure

```
ecommerce/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── config/            # Database configurations
│   │   │   ├── postgres.ts    # PostgreSQL connection
│   │   │   └── mongodb.ts     # MongoDB connection
│   │   ├── databases/         # Database initialization
│   │   │   ├── postgres/      # PostgreSQL init scripts
│   │   │   └── mongodb/       # MongoDB init scripts
│   │   ├── routes/            # API routes
│   │   ├── types/             # TypeScript interfaces
│   │   ├── data/              # Mock data
│   │   └── index.ts           # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── types/             # TypeScript interfaces
│   │   ├── styles/            # CSS files
│   │   ├── App.tsx            # Main App component
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml         # Docker services configuration
├── .env.example               # Environment variables template
└── package.json               # Root scripts
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
- Docker and Docker Compose (for database setup)

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
# Copy the environment template
cp .env.example .env
```

3. Start the databases with Docker Compose:

```bash
# Start PostgreSQL and MongoDB
npm run docker:up
```

This will start both databases in containers. The databases will automatically initialize with the schemas defined in:

- `backend/src/databases/postgres/init.sql`
- `backend/src/databases/mongodb/init.js`

## Running the Application

### 1. Start Databases

Make sure Docker is running, then start the databases:

```bash
npm run docker:up
```

You can verify the databases are running with:

```bash
npm run docker:ps
```

### 2. Development Mode (Recommended)

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

**Note:** When running the backend, it will automatically connect to:

- PostgreSQL on `postgres:5432` (when in Docker) or `localhost:5432` (when running locally)
- MongoDB on `mongodb:27017` (when in Docker) or `localhost:27017` (when running locally)

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

### Docker Commands

- `npm run docker:up` - Start PostgreSQL and MongoDB containers
- `npm run docker:down` - Stop all database containers
- `npm run docker:logs` - View logs from all database containers
- `npm run docker:logs:postgres` - View PostgreSQL logs only
- `npm run docker:logs:mongodb` - View MongoDB logs only
- `npm run docker:restart` - Restart all database containers
- `npm run docker:ps` - Show status of all containers
- `npm run docker:clean` - Stop containers and remove all volumes (⚠️ deletes data)
- `npm run docker:build` - Build and start containers

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
- PostgreSQL (via `pg`)
- MongoDB (via `mongodb`)
- CORS
- dotenv

### Databases

- **PostgreSQL 15** - Relational database for structured data (products, orders, etc.)
- **MongoDB 7** - Document database for flexible data (user sessions, logs, etc.)
- **Docker Compose** - Container orchestration for local development

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

## Database Configuration

The project uses Docker Compose to run PostgreSQL and MongoDB locally. Both databases are configured in `docker-compose.yml` and connect via a shared network.

### PostgreSQL

- Default connection: `postgres:5432` (when using Docker) or `localhost:5432` (local)
- Database: `ecommerce_db`
- Initial schema: Defined in `backend/src/databases/postgres/init.sql`

### MongoDB

- Default connection: `mongodb:27017` (when using Docker) or `localhost:27017` (local)
- Database: `ecommerce_db`
- Initial setup: Defined in `backend/src/databases/mongodb/init.js`

### Adding More Databases

To add additional databases, simply add them to `docker-compose.yml` following the same pattern, and create corresponding configuration files in `backend/src/config/`.

## Next Steps for Enhancement

- Add user authentication
- Expand database schemas and collections
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
