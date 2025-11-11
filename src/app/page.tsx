export default function Home() {
  return (
    <div className="bg-linear-to-br from-blue-50 to-white">
      {/* Hero секція */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            ФК <span className="text-blue-600">Вікторія</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Офіційний фан-шоп. Отримайте автентичну продукцію вашого улюбленого клубу!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Перейти до товарів
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Нова колекція
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Популярні товари
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Тут будуть картки товарів */}
            <div className="text-center text-gray-500">
              Товари зʼявляться скоро...
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}