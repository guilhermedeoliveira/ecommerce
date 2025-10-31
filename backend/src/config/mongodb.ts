import dotenv from "dotenv"
import { MongoClient, Db } from "mongodb"

dotenv.config()

const uri = process.env.MONGO_URI || 
  `mongodb://${process.env.MONGO_USER || 'admin'}:${process.env.MONGO_PASSWORD || 'admin123'}@${process.env.MONGO_HOST || 'mongodb'}:${process.env.MONGO_PORT || '27017'}/${process.env.MONGO_DB || 'ecommerce_db'}?authSource=admin`

let client: MongoClient | null = null
let db: Db | null = null

export async function connectMongoDB(): Promise<Db> {
  if (db) {
    return db
  }

  try {
    client = new MongoClient(uri)
    await client.connect()
    db = client.db(process.env.MONGO_DB || 'ecommerce_db')
    console.log('Connected to MongoDB database')
    return db
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (client) {
    await client.close()
    client = null
    db = null
    console.log('Disconnected from MongoDB')
  }
}

export function getMongoDB(): Db {
  if (!db) {
    throw new Error('MongoDB not connected. Call connectMongoDB() first.')
  }
  return db
}

export default {
  connect: connectMongoDB,
  disconnect: disconnectMongoDB,
  getDB: getMongoDB,
}

