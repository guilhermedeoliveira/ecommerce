export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
}

export interface User {
  id: string
  name: string
  age: number
  address: string
  occupation: string
}

export interface CartItem {
  product: Product
  quantity: number
}
