export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number | null  // Змінити з undefined на null
  image: string | null
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItemInput {
  id: string
  quantity: number
  price: number
  selectedSize: string
  selectedColor: string
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
}

export interface CreateOrderRequest {
  items: OrderItemInput[]
  total: number
  customerInfo: CustomerInfo
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}