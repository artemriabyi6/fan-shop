import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import Image from "next/image";
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

  console.log("🔄 Оновлення сторінки...", new Date().toISOString());
  console.log("📦 Featured продукти:", featuredProducts.length);

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
            ФК <span className="text-yellow-300">Вікторія</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Офіційний фан-шоп. Отримайте автентичну продукцію вашого улюбленого
            клубу!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors shadow-lg"
            >
              Перейти до товарів
            </Link>
          </div>
        </div>
      </section>

      {/* Переваги */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Чому обирають нас?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Офіційна продукція
              </h3>
              <p className="text-gray-600">
                Сертифікована продукція з логотипом клубу
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Швидка доставка
              </h3>
              <p className="text-gray-600">
                Доставка по всій Україні за 1-3 дні
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Підтримка клубу
              </h3>
              <p className="text-gray-600">
                Частина прибутку йде на розвиток клубу
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
     {/* Featured Products */}
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

    {featuredProducts.length > 0 ? (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* ... решта коду ... */}
      </>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Наразі немає популярних товарів</p>
        {/* ... решта коду ... */}
      </div>
    )}
  </div>
</section>

      {/* Категорії */}

      {/* CTA секція */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Стань частиною команди!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Підтримуй ФК Вікторія не лише на стадіоні, але й у повсякденному
            житті
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

      

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ФК Вікторія</h3>
              <p className="text-gray-400">
                Офіційний фан-шоп вашого улюбленого клубу
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Магазин</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/products" className="hover:text-white">
                    Всі товари
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=jersey"
                    className="hover:text-white"
                  >
                    Форми
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=accessories"
                    className="hover:text-white"
                  >
                    Аксесуари
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Допомога</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Повернення
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакти</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: shop@fk-viktoria.com</li>
                <li>Телефон: +380 99 123 4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ФК Вікторія. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
