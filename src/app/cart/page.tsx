'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Кошик порожній</h1>
            <p className="text-gray-600 mb-8">Додайте товари до кошика, щоб продовжити покупки</p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Перейти до магазину
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Кошик</h1>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center space-x-4 border-b border-gray-100 pb-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        В
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.selectedSize && `Розмір: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' • '}
                      {item.selectedColor && `Колір: ${item.selectedColor}`}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">{item.price} ₴</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-lg font-bold text-gray-900 min-w-20 text-right">
                      {item.price * item.quantity} ₴
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-900">Загальна сума:</span>
                <span className="text-2xl font-bold text-gray-900">{state.total} ₴</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={clearCart}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Очистити кошик
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Оформити замовлення
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}