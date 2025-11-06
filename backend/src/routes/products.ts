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
router.get("/:id", async (req: Request, res: Response) => {
  try {
    // Query PostgreSQL for the product
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Increment access_count
    await pool.query(
      "UPDATE products SET access_count = access_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = $1",
      [req.params.id]
    )

    // Invalidate Redis cache so featured products refresh with new access counts
    await redis.del("featured_products")

    // Format and return the product
    const product = result.rows[0]
    res.json({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      image: product.image_url,
      category: product.category || "",
      stock: product.stock || 0,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ message: "Error fetching product" })
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
