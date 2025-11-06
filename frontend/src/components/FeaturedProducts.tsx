import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import { Product } from "../../../types"
import {
  FeaturedSection,
  SectionTitle,
  ProductsGrid,
  Loading,
  ErrorMessage,
} from "./FeaturedProducts.styled"

interface FeaturedProductsProps {
  onAddToCart: (product: Product) => void
}

export default function FeaturedProducts({
  onAddToCart,
}: FeaturedProductsProps) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/products/featured")
      if (!response.ok) {
        throw new Error("Failed to fetch featured products")
      }
      const data = await response.json()
      setFeaturedProducts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching featured products:", error)
      setError("Failed to load featured products")
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <FeaturedSection>
        <SectionTitle>Featured Products</SectionTitle>
        <Loading>Loading featured products...</Loading>
      </FeaturedSection>
    )
  }

  if (error) {
    return (
      <FeaturedSection>
        <SectionTitle>Featured Products</SectionTitle>
        <ErrorMessage>{error}</ErrorMessage>
      </FeaturedSection>
    )
  }

  if (featuredProducts.length === 0) {
    return (
      <FeaturedSection>
        <SectionTitle>Featured Products</SectionTitle>
        <ErrorMessage>No featured products available</ErrorMessage>
      </FeaturedSection>
    )
  }

  return (
    <FeaturedSection>
      <SectionTitle>Featured Products</SectionTitle>
      <ProductsGrid>
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </ProductsGrid>
    </FeaturedSection>
  )
}

