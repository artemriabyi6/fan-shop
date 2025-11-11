'use client'

import { Product } from '@/types/product'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const hasImage = product.image && product.image.trim() !== ''

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
      !product.inStock ? 'opacity-70' : ''
    }`}>
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {hasImage ? (
            
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            // Показуємо заглушку тільки якщо немає зображення
            <div className={`w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 ${
              !product.inStock ? 'filter blur-sm' : ''
            }`}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  В
                </div>
                <span className="text-gray-500 text-sm">{product.name}</span>
              </div>
            </div>
          )}
          
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                Немає в наявності
              </span>
            </div>
          )}
          
          {product.featured && product.inStock && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Хіт
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className={`font-semibold hover:text-blue-600 transition-colors mb-2 ${
            !product.inStock ? 'text-gray-500' : 'text-gray-900'
          }`}>
            {product.name}
          </h3>
        </Link>
        
        <p className={`text-sm mb-3 line-clamp-2 ${
          !product.inStock ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${
              !product.inStock ? 'text-gray-500' : 'text-gray-900'
            }`}>
              {product.price} ₴
            </span>
            {hasDiscount && (
              <span className={`text-sm line-through ${
                !product.inStock ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {product.originalPrice} ₴
              </span>
            )}
          </div>
          
          {hasDiscount && product.inStock && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
              -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
            </span>
          )}
        </div>

        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
        </button>
      </div>
    </div>
  )
}