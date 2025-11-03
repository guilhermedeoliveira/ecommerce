import { createSlice, PayloadAction } from "@reduxjs/toolkit" 
import { Product } from "types"

export interface ProductState {
  products: Product[]
}

const mockedProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    image: "https://via.placeholder.com/300x300?text=Headphones",
    category: "Electronics",
    stock: 50,
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor",
    price: 199.99,
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    category: "Electronics",
    stock: 30,
  },
  {
    id: "3",
    name: "Laptop Backpack",
    description: "Durable backpack with padded laptop compartment",
    price: 49.99,
    image: "https://via.placeholder.com/300x300?text=Backpack",
    category: "Accessories",
    stock: 100,
  },
  {
    id: "4",
    name: "USB-C Cable",
    description: "Fast charging USB-C cable, 6ft length",
    price: 14.99,
    image: "https://via.placeholder.com/300x300?text=USB+Cable",
    category: "Accessories",
    stock: 200,
  },
  {
    id: "5",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 29.99,
    image: "https://via.placeholder.com/300x300?text=Mouse",
    category: "Electronics",
    stock: 75,
  },
  {
    id: "6",
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches",
    price: 89.99,
    image: "https://via.placeholder.com/300x300?text=Keyboard",
    category: "Electronics",
    stock: 40,
  },
]

const initialState: ProductState = {
  products: mockedProducts,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    updateProductStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const product = state.products.find(p => p.id === action.payload.id)
      if (product) {
        product.stock = action.payload.stock
      }
    },
  },
})

export const { addProduct, removeProduct, updateProduct, updateProductStock } = productSlice.actions
export default productSlice.reducer