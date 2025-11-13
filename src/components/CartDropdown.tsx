'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface CartDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { state, removeItem, updateQuantity } = useCart()

  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="p-4">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light text-gray-900">Кошик</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-500 mb-2">Кошик порожній</p>
            <p className="text-gray-400 text-sm">Додайте товари з магазину</p>
          </div>
        ) : (
          <>
            {/* Список товарів */}
            <div className="max-h-64 overflow-y-auto space-y-3 pr-2 -mr-2">
              {state.items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  className="flex items-center space-x-3 bg-gray-50/50 rounded-lg p-3 group hover:bg-gray-100/50 transition-colors"
                >
                  {/* Зображення товару */}
                  <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        В
                      </div>
                    )}
                  </div>
                  
                  {/* Інформація про товар */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.selectedSize && `Розмір: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' • '}
                      {item.selectedColor && `Колір: ${item.selectedColor}`}
                    </p>
                    
                    {/* Кількість та ціна */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-sm w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50 hover:border-gray-400 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">{item.price * item.quantity} ₴</p>
                    </div>
                  </div>
                  
                  {/* Кнопка видалення */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Підсумок та кнопки */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {/* Загальна сума */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-base font-light text-gray-700">Загальна сума:</span>
                <span className="text-xl font-light text-gray-900">{state.total} ₴</span>
              </div>
              
              {/* Кнопки дій */}
              <div className="space-y-3">
                <Link
                  href="/cart"
                  className="block w-full bg-linear-to-r from-blue-600 to-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  onClick={onClose}
                >
                  Перейти до кошика
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full border-2 border-blue-600 text-blue-600 text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300"
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