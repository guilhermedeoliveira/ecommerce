import { CartItem as CartItemType } from "../types"
import {
  CartContainer,
  CartItem,
  CartItemImage,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemQuantity,
  QuantityButton,
  RemoveButton,
  CartTotal,
  EmptyCart,
} from "./Cart.styled"

interface CartProps {
  items: CartItemType[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
}

export default function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <CartContainer>
        <h2>Shopping Cart</h2>
        <EmptyCart>
          <p>Your cart is empty</p>
        </EmptyCart>
      </CartContainer>
    )
  }

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {items.map((item) => (
        <CartItem key={item.product.id}>
          <CartItemImage src={item.product.image} alt={item.product.name} />
          <CartItemInfo>
            <CartItemName>{item.product.name}</CartItemName>
            <CartItemPrice>${item.product.price.toFixed(2)}</CartItemPrice>
          </CartItemInfo>
          <CartItemQuantity>
            <QuantityButton
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
            >
              -
            </QuantityButton>
            <span>{item.quantity}</span>
            <QuantityButton
              onClick={() =>
                onUpdateQuantity(item.product.id, item.quantity + 1)
              }
            >
              +
            </QuantityButton>
          </CartItemQuantity>
          <RemoveButton onClick={() => onRemoveItem(item.product.id)}>
            Remove
          </RemoveButton>
        </CartItem>
      ))}
      <CartTotal>
        <h2>Total: ${total.toFixed(2)}</h2>
      </CartTotal>
    </CartContainer>
  )
}
