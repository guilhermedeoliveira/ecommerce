import express, { Application, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"

import pool from "./config/postgres"
import { connectMongoDB } from "./config/mongodb"
import redis from "./config/redis"
import productsRouter from "./routes/products"

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Welcome to E-Commerce API" })
})

app.use("/api/products", productsRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Test DB connections
const testConnections = async () => {
  // Test PostgreSQL connection
  try {
    const result = await pool.query("SELECT NOW()")
    console.log("PostgreSQL connection successful: ", {
      result: result.rows[0],
    })
  } catch (error) {
    console.error("PostgreSQL connection error:", { error })
  }

  // Test MongoDB connection
  try {
    await connectMongoDB()
    console.log("MongoDB connection successful")
  } catch (error) {
    console.error("MongoDB connection error:", { error })
  }

  // Test Redis connection
  try {
    await redis.ping()
    console.log("Redis connection successful")
  } catch (error) {
    console.error("Redis connection error:", { error })
  }
}

testConnections()
