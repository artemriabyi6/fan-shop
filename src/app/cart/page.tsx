'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-gray-900 mb-4">Кошик порожній</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-base sm:text-lg">
              Додайте товари до кошика, щоб продовжити покупки
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Перейти до магазину
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-white py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
          {/* Заголовок */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900">Кошик</h1>
              <div className="text-sm sm:text-base text-gray-500">
                {state.items.length} товар{state.items.length > 1 ? 'и' : ''}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* Список товарів */}
            <div className="space-y-4 sm:space-y-6">
              {state.items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
                >
                  {/* Зображення та основна інформація */}
                  <div className="flex items-center gap-4 sm:flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-200">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          В
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${item.slug}`}>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {item.selectedSize && `Розмір: ${item.selectedSize}`}
                        {item.selectedSize && item.selectedColor && ' • '}
                        {item.selectedColor && `Колір: ${item.selectedColor}`}
                      </p>
                      <p className="text-lg sm:text-xl font-semibold text-gray-900 mt-2">
                        {item.price} ₴
                      </p>
                    </div>
                  </div>

                  {/* Кількість, загальна ціна та кнопка видалення */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    {/* Кількість */}
                    <div className="flex items-center border border-gray-300 rounded-xl bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-x border-gray-300 text-sm sm:text-base font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    {/* Загальна ціна за товар */}
                    <div className="text-right min-w-20">
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">
                        {item.price * item.quantity} ₴
                      </p>
                    </div>

                    {/* Кнопка видалення */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-110"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Підсумок та кнопки */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              {/* Загальна сума */}
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <span className="text-xl sm:text-2xl font-light text-gray-900">Загальна сума:</span>
                <span className="text-2xl sm:text-3xl font-light text-gray-900">{state.total} ₴</span>
              </div>

              {/* Кнопки дій */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="order-2 sm:order-1 flex-1 border-2 border-gray-300 text-gray-700 py-3 sm:py-4 px-6 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  Очистити кошик
                </button>
                <Link
                  href="/checkout"
                  className="order-1 sm:order-2 flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 sm:py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Оформити замовлення
                </Link>
              </div>

              {/* Додаткова навігація */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Продовжити покупки
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}