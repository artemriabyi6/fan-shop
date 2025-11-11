'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface CartDropdownProps {
  onClose: () => void
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { state, removeItem, updateQuantity } = useCart()

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Кошик</h3>
        
        {state.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Кошик порожній</p>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto space-y-3">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        В
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.selectedSize && `Розмір: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' • '}
                      {item.selectedColor && `Колір: ${item.selectedColor}`}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{item.price * item.quantity} ₴</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Всього:</span>
                <span className="text-lg font-bold text-gray-900">{state.total} ₴</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  href="/cart"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={onClose}
                >
                  Перейти до кошика
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full border border-blue-600 text-blue-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  onClick={onClose}
                >
                  Оформити замовлення
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}