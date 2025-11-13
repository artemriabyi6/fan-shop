import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { prisma } from "@/lib/prisma";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
        inStock: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero секція */}
      <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-gray-100 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-slate-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            {/* Декоративний елемент */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-1 bg-linear-to-r from-transparent via-gray-400 to-transparent"></div>
            </div>

            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-gray-900">
              ВІКТОРІЯ
            </h1>
            
            <div className="w-24 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 mx-auto"></div>

            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Фан-шоп <span className="font-medium bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">чемпіонів</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="/products"
                className="group relative bg-linear-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-lg font-medium hover:from-gray-800 hover:to-gray-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center gap-2">
                  Перейти до магазину
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link
                href="/about"
                className="group border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  Дізнатися більше
                  <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Переваги */}
      <section className="relative py-20 bg-linear-to-br from-white via-gray-50 to-blue-50/30">
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.04]"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-white to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Чому обирають нас?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ми створюємо найкращий досвід для наших вболівальників
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Офіційна продукція",
                description: "Сертифікована продукція з логотипом клубу"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: "Швидка доставка",
                description: "Доставка по всій Україні за 1-3 дні"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Підтримка клубу",
                description: "Частина прибутку йде на розвиток клубу"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-500 hover:scale-105"
              >
                <div className="w-16 h-16 bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-20 bg-linear-to-br from-gray-50 via-white to-slate-100">
        <div className="absolute inset-0 bg-stripe-pattern opacity-[0.02]"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-gray-50 to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Популярні товари
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Найпопулярніша продукція серед наших вболівальників
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product: Product) => (
                <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Наразі немає популярних товарів</p>
            </div>
          )}

          {/* Статистика */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Задоволених клієнтів" },
              { number: "1000+", label: "Проданих товарів" },
              { number: "24/7", label: "Підтримка" },
              { number: "1-3", label: "Дні доставки" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секція */}
      <section className="relative py-24 bg-linear-to-br from-slate-900 via-gray-900 to-blue-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Стань частиною{' '}
            <span className="font-medium bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              команди
            </span>
          </h2>
          
          <div className="w-20 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>

          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Підтримуй ФК Вікторія не лише на стадіоні, але й у повсякденному житті. 
            Носи кольори команди з гордістю!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="group bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                Почати покупки
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
            </Link>
            
            <Link
              href="/about"
              className="group border border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-medium hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                Дізнатися про клуб
                <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">ФК Вікторія</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Офіційний фан-шоп вашого улюбленого клубу. 
                Разом до перемоги!
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Магазин</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/products" className="hover:text-white transition-colors duration-300">
                    Всі товари
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=jersey" className="hover:text-white transition-colors duration-300">
                    Форми
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=accessories" className="hover:text-white transition-colors duration-300">
                    Аксесуари
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Допомога</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/shipping" className="hover:text-white transition-colors duration-300">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white transition-colors duration-300">
                    Повернення
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors duration-300">
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Контакти</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  shop@fk-viktoria.com
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +380 99 123 4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ФК Вікторія. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;