import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const featuredProducts = products.filter(product => product.featured)
  const allProducts = products

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}