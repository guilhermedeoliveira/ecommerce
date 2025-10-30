import { render, screen } from "@testing-library/react"
import Cart from "../Cart"
import { CartItem } from "../../types"

describe("Cart", () => {
  const mockProduct = {
    id: "1",
    name: "Test Product",
    description: "Test Description",
    price: 29.99,
    image: "test-image.jpg",
    category: "Test Category",
    stock: 10,
  }

  const mockItems: CartItem[] = [
    {
      product: mockProduct,
      quantity: 2,
    },
  ]

  const mockOnUpdateQuantity = vi.fn()
  const mockOnRemoveItem = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("Should render `Shopping Cart` text", () => {
    render(
      <Cart
        items={[]}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
  })

  it("Should render empty cart message when cart is empty", () => {
    render(
      <Cart
        items={[]}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument()
  })

  it("Should render cart items when cart has items", () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("$29.99")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
  })

  it("Should calculate and display total correctly", () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    // Total should be 29.99 * 2 = 59.98
    expect(screen.getByText("Total: $59.98")).toBeInTheDocument()
  })
})
