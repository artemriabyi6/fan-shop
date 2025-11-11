import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/product'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()
  const featuredProducts = products.filter(product => product.featured)

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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Хітові товари</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Всі товари */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Всі товари</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Товари не знайдено</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}