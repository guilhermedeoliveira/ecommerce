import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  it("Should remove the entry when clicking on Remove button", async () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const button = screen.getByText("Remove")
    await userEvent.click(button)

    expect(mockOnRemoveItem).toBeCalled()
  })

  it("Should increment quantity when clicking + button", async () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const incrementButton = screen.getByText("+")
    await userEvent.click(incrementButton)

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith("1", 3)
  })

  it("Should decrement quantity when clicking - button", async () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const decrementButton = screen.getByText("-")
    await userEvent.click(decrementButton)

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith("1", 1)
  })

  it("Should disable - button when quantity is 1", () => {
    const singleItem: CartItem[] = [
      {
        product: mockProduct,
        quantity: 1,
      },
    ]

    render(
      <Cart
        items={singleItem}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const decrementButton = screen.getByText("-")
    expect(decrementButton).toBeDisabled()
  })

  it("Should call onRemoveItem with correct product ID", async () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const button = screen.getByText("Remove")
    await userEvent.click(button)

    expect(mockOnRemoveItem).toHaveBeenCalledWith("1")
  })

  it("Should render multiple cart items correctly", async () => {
    const multipleItems: CartItem[] = [
      {
        product: mockProduct,
        quantity: 2,
      },
      {
        product: {
          ...mockProduct,
          id: "2",
          name: "Another Product",
          price: 19.99,
        },
        quantity: 3,
      },
    ]

    render(
      <Cart
        items={multipleItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("Another Product")).toBeInTheDocument()
    expect(screen.getByText("$29.99")).toBeInTheDocument()
    expect(screen.getByText("$19.99")).toBeInTheDocument()
    // Total: (29.99 * 2) + (19.99 * 3) = 59.98 + 59.97 = 119.95
    expect(screen.getByText("Total: $119.95")).toBeInTheDocument()

    // Test clicking on the second button
    const [, button] = screen.getAllByText("Remove")
    await userEvent.click(button)

    expect(mockOnRemoveItem).toHaveBeenCalledWith("2")
  })

  it("Should render product image with correct src and alt", () => {
    render(
      <Cart
        items={mockItems}
        onUpdateQuantity={mockOnUpdateQuantity}
        onRemoveItem={mockOnRemoveItem}
      />
    )

    const image = screen.getByAltText("Test Product")
    expect(image).toHaveAttribute("src", "test-image.jpg")
  })
})
