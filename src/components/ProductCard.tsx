'use client'

import { Product } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const hasImage = product.image && product.image.trim() !== ''

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity: 1,
      selectedSize: product.sizes?.[0] || '',
      selectedColor: product.colors?.[0] || ''
    })
  }

  const imageSrc = product.image || '/images/placeholder.jpg'

  return (
    <div className={`flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
      !product.inStock ? 'opacity-70 grayscale' : 'hover:border-gray-200'
    }`}>
      <Link href={`/products/${product.slug}`} className="flex-shrink-0">
        <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
          {hasImage ? (
            <div className="relative w-full h-full">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-linear-to-br from-slate-50 to-gray-100 ${
              !product.inStock ? 'filter blur-[1px]' : ''
            }`}>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2 shadow-sm">
                  В
                </div>
                <span className="text-gray-500 text-xs font-medium">{product.name}</span>
              </div>
            </div>
          )}
          
          {/* Бейджі */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {!product.inStock && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
                Немає в наявності
              </span>
            )}
            
            {product.featured && product.inStock && (
              <span className="bg-linear-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
                Хіт продажів
              </span>
            )}
          </div>

          {hasDiscount && product.inStock && (
            <div className="absolute top-3 right-3">
              <span className="bg-linear-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
                -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Контент картки з фіксованою висотою */}
      <div className="flex flex-col flex-1 p-4">
        {/* Заголовок */}
        <Link href={`/products/${product.slug}`} className="flex-shrink-0 mb-2">
          <h3 className={`font-semibold text-sm sm:text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 ${
            !product.inStock ? 'text-gray-500' : 'text-gray-900'
          }`}>
            {product.name}
          </h3>
        </Link>
        
        {/* Опис з фіксованою висотою */}
        <div className="flex-1 min-h-[3rem] mb-4">
          <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
            !product.inStock ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {product.description}
          </p>
        </div>

        {/* Ціна та кнопка - завжди внизу */}
        <div className="flex flex-col space-y-3 mt-auto">
          {/* Цінова інформація */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`text-base sm:text-lg font-bold ${
                !product.inStock ? 'text-gray-500' : 'text-gray-900'
              }`}>
                {product.price} ₴
              </span>
              {hasDiscount && (
                <span className={`text-xs sm:text-sm line-through ${
                  !product.inStock ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {product.originalPrice} ₴
                </span>
              )}
            </div>
          </div>

          {/* Кнопка додавання в кошик */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ${
              product.inStock
                ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transform hover:scale-105 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Додати в кошик
              </span>
            ) : (
              'Немає в наявності'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}