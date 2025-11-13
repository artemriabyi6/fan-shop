'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const hasImage = product.image && product.image.trim() !== ''

  // Мокові додаткові зображення
  const productImages = [
    product.image,
    product.image,
    product.image,
  ].filter((image): image is string => image !== null)

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity,
      selectedSize,
      selectedColor
    })
    
    // Можна додати сповіщення про успішне додавання
    alert('Товар додано до кошика!')
  }

  const srcImage = productImages[selectedImage] || '/images/placeholder.jpg'

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-white py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 p-4 sm:p-6 lg:p-8">
            {/* Галерея зображень */}
            <div className="space-y-4">
              {/* Велике зображення */}
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                {hasImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={srcImage}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-50 to-gray-100">
                    <div className="text-center p-6">
                      <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                        В
                      </div>
                      <span className="text-gray-500 text-lg font-light">{product.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Мініатюри */}
              {hasImage && productImages.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-blue-600 shadow-md scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${product.name} - зображення ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 33vw, 16vw"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Інформація про товар */}
            <div className="space-y-6 lg:space-y-8">
              {/* Заголовок та опис */}
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Ціна та статус */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-light text-gray-900">
                    {product.price} ₴
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 line-through font-light">
                        {product.originalPrice} ₴
                      </span>
                      <span className="bg-linear-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        -{Math.round((1 - product.price / product.originalPrice!) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Статус наявності */}
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
                  product.inStock 
                    ? 'bg-green-100/80 text-green-800 border border-green-200' 
                    : 'bg-red-100/80 text-red-800 border border-red-200'
                }`}>
                  {product.inStock ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      В наявності
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Немає в наявності
                    </span>
                  )}
                </div>
              </div>

              {/* Розміри */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-light text-gray-900 text-lg">Розмір:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-3 border-2 rounded-xl transition-all duration-300 font-light ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-105'
                            : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50'
                        } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setSelectedSize(size)}
                        disabled={!product.inStock}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Кольори */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-light text-gray-900 text-lg">Колір:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-3 border-2 rounded-xl transition-all duration-300 font-light ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg scale-105'
                            : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/50'
                        } ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        disabled={!product.inStock}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Кількість та кнопка додавання */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                {/* Кількість */}
                <div className={`flex items-center border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm ${
                  !product.inStock ? 'opacity-50' : ''
                }`}>
                  <button
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-3 border-x border-gray-200 min-w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-30 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>

                {/* Кнопка додавання в кошик */}
                <button
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-base lg:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    product.inStock
                      ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300'
                  }`}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Додати в кошик
                    </>
                  ) : (
                    'Немає в наявності'
                  )}
                </button>
              </div>

              {/* Додаткова інформація */}
              <div className="border-t border-gray-200 pt-6 lg:pt-8">
                <h3 className="font-light text-gray-900 text-lg mb-4">Деталі товару:</h3>
                <ul className="text-gray-600 space-y-3 text-base">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Категорія: <strong className="font-medium text-gray-900">{getCategoryName(product.category)}</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Офіційна продукція ФК Вікторія</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Гарантія якості</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Доставка по всій Україні</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Повернення протягом 14 днів</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCategoryName(category: string): string {
  const categories: { [key: string]: string } = {
    jersey: 'Форма',
    scarf: 'Шарфи',
    accessory: 'Аксесуари',
    other: 'Інше'
  }
  return categories[category] || category
}