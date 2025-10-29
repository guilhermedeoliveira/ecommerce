import { Product } from '../types';
import {
  Card,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductFooter,
  ProductPrice,
  AddToCartButton
} from './ProductCard.styled';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card>
      <ProductImage
        src={product.image}
        alt={product.name}
      />
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
          <AddToCartButton
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </AddToCartButton>
        </ProductFooter>
      </ProductInfo>
    </Card>
  );
}
