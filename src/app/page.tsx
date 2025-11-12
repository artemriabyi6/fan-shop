import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import Image from 'next/image'

async function getFeaturedProducts(): Promise<Product[]> {


  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/products`, {
      next: { 
        revalidate: 3600 // Кешувати на 1 годину замість 0
      }
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    
    const products = await res.json()
    return products.filter((product: Product) => product.featured)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

const staticFeaturedProducts = [
  {
    id: '1',
    name: 'Домашня форма сезону 2024',
    description: 'Офіційна домашня форма ФК Вікторія. Синя з білими акцентами.',
    price: 1499,
    slug: 'home-jersey-2024'
  },
  {
    id: '2', 
    name: 'Гостьова форма сезону 2024',
    description: 'Офіційна гостьова форма ФК Вікторія. Біла з синіми акцентами.',
    price: 1499,
    slug: 'away-jersey-2024'
  },
  {
    id: '3',
    name: 'Футбольний м\'яч',
    description: 'Офіційний м\'яч для тренувань та матчів.',
    price: 899,
    slug: 'team-ball'
  }
]

export default async function Home() {
  let featuredProducts: Product[] = []
  
  try {
    featuredProducts = await getFeaturedProducts()
  } catch (error) {
    console.log('Using static featured products due to fetch error')
    // Використовуємо статичні дані як запасний варіант
    featuredProducts = staticFeaturedProducts as Product[]
  }

  return (
    <div className="bg-linear-to-br from-blue-50 to-white min-h-screen">
      {/* Hero секція */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Емблема клубу */}
          <div className="flex items-center justify-center mx-auto mb-6">
            <Image 
              src="/images/logo.png" 
              alt="ФК Вікторія" 
              className="w-35 h-35 object-contain"
              width={112}
              height={112}
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ФК <span className="">Вікторія</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Офіційний фан-шоп. Отримайте автентичну продукцію вашого улюбленого клубу!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors shadow-lg"
            >
              Перейти до товарів
            </Link>
          </div>
        </div>
      </section>

      {/* Переваги */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Офіційна продукція</h3>
              <p className="text-gray-600">Сертифікована продукція з логотипом клубу</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Швидка доставка</h3>
              <p className="text-gray-600">Доставка по всій Україні за 1-3 дні</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Підтримка клубу</h3>
              <p className="text-gray-600">Частина прибутку йде на розвиток клубу</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Популярні товари
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Найпопулярніша продукція серед наших вболівальників
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Дивитися всі товари
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA секція */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Стань частиною команди!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Підтримуй ФК Вікторія не лише на стадіоні, але й у повсякденному житті
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Почати покупки
            </Link>
            <Link 
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Дізнатися про клуб
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}