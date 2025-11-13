import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'
import { prisma } from '@/lib/prisma'

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Фан-шоп ФК Вікторія
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Офіційна продукція вашого улюбленого клубу. Підтримуйте команду стильно!
          </p>
          
       
        </div>

        {/* Хітові товари */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Хітові товари</h2>
             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Всі товари */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Всі товари</h2>
            <div className="text-sm text-gray-500">
              {products.length} товарів
            </div>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Товари не знайдено</p>
              <p className="text-gray-400 text-sm mt-2">Спробуйте оновити сторінку або перевірити підключення до бази даних</p>
            </div>
          )}
        </section>

        {/* Категорії */}
     
      </div>
    </div>
  )
}