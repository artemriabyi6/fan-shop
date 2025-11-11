export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  category: 'jersey' | 'scarf' | 'accessory' | 'other'
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured: boolean
  slug: string
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}