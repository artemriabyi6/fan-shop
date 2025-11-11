'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Product, CartItem } from '@/types/product'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
      )

      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return { items: updatedItems, total, itemCount }
      } else {
        const updatedItems = [...state.items, action.payload]
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        
        return { items: updatedItems, total, itemCount }
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => 
        !(item.id === action.payload && 
          item.selectedSize === state.items.find(i => i.id === action.payload)?.selectedSize &&
          item.selectedColor === state.items.find(i => i.id === action.payload)?.selectedColor)
      )
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return { items: updatedItems, total, itemCount }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      )
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      
      return { items: updatedItems, total, itemCount }
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}