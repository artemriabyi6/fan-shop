'use client'

import { useState } from 'react'
import { Product } from '@/types/product'
import Image from 'next/image'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const hasImage = product.image && product.image.trim() !== ''

  // Мокові додаткові зображення (в реальному додатку вони будуть з API)
  const productImages = [
    product.image,
    product.image, // Дублюємо для демо
    product.image, // Дублюємо для демо
  ]

  const handleAddToCart = () => {
    // Тут буде логіка додавання в кошик
    console.log('Додано в кошик:', {
      product,
      selectedSize,
      selectedColor,
      quantity
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Галерея зображень */}
            <div className="space-y-4">
              {/* Велике зображення */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {hasImage ? (
                  <Image
                    src={productImages[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                        В
                      </div>
                      <span className="text-gray-500 text-lg">{product.name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Мініатюри */}
              {hasImage && productImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-blue-600' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - зображення ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Інформація про товар */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              {/* Ціна */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  {product.price} ₴
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {product.originalPrice} ₴
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Знижка {Math.round((1 - product.price / product.originalPrice!) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Статус наявності */}
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? '✓ В наявності' : '✗ Немає в наявності'}
              </div>

              {/* Розміри */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Розмір:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-4 py-3 border-2 rounded-lg transition-all ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-50'
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
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-lg">Колір:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-4 py-3 border-2 rounded-lg transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-50'
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
              <div className="flex items-center space-x-4 pt-4">
                <div className={`flex items-center border-2 border-gray-300 rounded-lg ${
                  !product.inStock ? 'opacity-50' : ''
                }`}>
                  <button
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                  >
                    -
                  </button>
                  <span className="px-4 py-3 border-x border-gray-300 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-3 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    +
                  </button>
                </div>

                <button
                  className={`flex-1 py-3 px-6 rounded-lg font-medium text-lg transition-all ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? 'Додати в кошик' : 'Немає в наявності'}
                </button>
              </div>

              {/* Додаткова інформація */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4 text-lg">Деталі товару:</h3>
                <ul className="text-gray-600 space-y-2 text-base">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Категорія: <strong className="ml-1">{getCategoryName(product.category)}</strong>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Офіційна продукція ФК Вікторія
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Гарантія якості
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Доставка по всій Україні
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    Повернення протягом 14 днів
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