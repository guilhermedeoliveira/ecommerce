import { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { Product, CartItem } from './types';
import { GlobalStyles } from './styles/GlobalStyles';
import {
  AppContainer,
  Header,
  HeaderContent,
  HeaderTitle,
  CartBadge,
  Container,
  ProductsGrid,
  Loading
} from './styles/App.styled';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HeaderContent>
            <HeaderTitle>E-Commerce Store</HeaderTitle>
            <CartBadge onClick={() => setShowCart(!showCart)}>
              Cart ({totalItems})
            </CartBadge>
          </HeaderContent>
        </Header>

        <Container>
          {loading ? (
            <Loading>Loading products...</Loading>
          ) : showCart ? (
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
            />
          ) : (
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </ProductsGrid>
          )}
        </Container>
      </AppContainer>
    </>
  );
}

export default App;
