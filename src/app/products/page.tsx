import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  const featuredProducts = products.filter(product => product.featured)

  console.log('📦 Products page - all products:', products.length)
  console.log('⭐ Products page - featured:', featuredProducts.length)

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
              Фан-шоп
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Офіційна продукція вашого улюбленого клубу.{' '}
            <span className="font-medium bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Підтримуйте команду стильно!
            </span>
          </p>

        
        </div>

        {/* Хітові товари */}
        {featuredProducts.length > 0 && (
          <section className="mb-20 relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-50/30 to-purple-50/30 rounded-3xl -m-6"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                    Хітові товари
                  </h2>
                  <p className="text-gray-600 max-w-2xl">
                    Найпопулярніша продукція серед наших вболівальників
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Всі товари */}
        <section className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
                Вся продукція
              </h2>
              <p className="text-gray-600">
                Повний каталог офіційної продукції ФК Вікторія
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-700 font-medium">
                <span className="text-gray-900 font-semibold">{products.length}</span> товарів
              </div>
            </div>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Товари не знайдено</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Спробуйте оновити сторінку або перевірити підключення до бази даних
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Повернутись на головну
              </Link>
            </div>
          )}
        </section>

        {/* CTA секція */}
        <section className="mt-20 text-center">
          <div className="bg-linear-to-br from-slate-900 to-gray-900 rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Не знайшли потрібний товар?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Зв&apos;яжіться з нами - ми допоможемо підібрати розмір або повідомимо про нові надходження
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Зв&apos;язатися з нами
              </Link>
              <Link
                href="/about"
                className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-gray-500 hover:bg-gray-800/50 transition-colors"
              >
                Про клуб
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}