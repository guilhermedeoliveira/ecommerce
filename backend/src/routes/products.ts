import { Router, Request, Response } from "express"
import { products } from "../data/products"
import pool from "../config/postgres"
import redis from "../config/redis"

const router = Router()

// Get all products
router.get("/", (req: Request, res: Response) => {
  res.json(products)
})

// Get featured products (10 most accessed)
router.get("/featured", async (req: Request, res: Response) => {
  const CACHE_KEY = "featured_products"
  const CACHE_TTL = 3600 // 1 hour in seconds

  try {
    // Check Redis cache first
    const cachedProducts = await redis.get(CACHE_KEY)
    
    if (cachedProducts) {
      console.log("Cache hit: Returning featured products from Redis")
      return res.json(JSON.parse(cachedProducts))
    }

    // Cache miss: Query PostgreSQL
    console.log("Cache miss: Fetching featured products from PostgreSQL")
    const result = await pool.query(
      `SELECT 
        id,
        name,
        description,
        price,
        image_url as image,
        category,
        stock,
        access_count
      FROM products 
      ORDER BY access_count DESC 
      LIMIT 10`
    )

    const featuredProducts = result.rows.map((row) => ({
      id: row.id.toString(),
      name: row.name,
      description: row.description,
      price: parseFloat(row.price),
      image: row.image,
      category: row.category || "",
      stock: row.stock || 0,
    }))

    // Save to Redis cache
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(featuredProducts))
    console.log("Featured products cached in Redis")

    res.json(featuredProducts)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    res.status(500).json({ message: "Error fetching featured products" })
  }
})

// Get product by id
router.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

// Get products by category
router.get("/category/:category", (req: Request, res: Response) => {
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === req.params.category.toLowerCase(),
  )
  res.json(categoryProducts)
})

export default router
