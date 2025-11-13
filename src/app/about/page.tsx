import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Олександр Петренко",
      role: "Головний тренер",
      image: "/images/team/coach.jpg",
      description: "Досвід роботи: 15+ років"
    },
    {
      name: "Марія Коваль",
      role: "Менеджер магазину",
      image: "/images/team/manager.jpg",
      description: "Працює з нами з 2018 року"
    },
    {
      name: "Іван Сидоренко",
      role: "Логіст",
      image: "/images/team/logistic.jpg",
      description: "Забезпечує швидку доставку"
    },
    {
      name: "Анна Мельник",
      role: "Клієнтська підтримка",
      image: "/images/team/support.jpg",
      description: "Допомагає з вибором товарів"
    }
  ]

  const achievements = [
    { number: "2010", label: "Рік заснування клубу" },
    { number: "25+", label: "Турнірних перемог" },
    { number: "5000+", label: "Задоволених вболівальників" },
    { number: "100+", label: "Унікальних товарів" }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-white">
      {/* Hero секція */}
      <section className="relative py-16 lg:py-24 bg-linear-to-br from-slate-900 via-gray-900 to-blue-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Про ФК Вікторія
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-blue-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Наша історія, цінності та команда, що об&apos;єднує тисячі вболівальників
            </p>
          </div>
        </div>
      </section>

      {/* Історія клубу */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                Наша історія
              </h2>
              <div className="w-20 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 rounded-full"></div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  ФК &quot;Вікторія&quot; було засновано у 2010 році з мрією створити сильну футбольну команду, 
                  яка би об&apos;єднувала талантливих гравців та відданих вболівальників.
                </p>
                <p>
                  За роки існування ми пройшли шлях від аматорської ліги до професійних змагань, 
                  завоювавши повагу серед футбольної спільноти України.
                </p>
                <p>
                  Наш фан-шоп було створено у відповідь на численні запити вболівальників, 
                  які хотіли носити якісну офіційну продукцію з символікою улюбленої команди.
                </p>
              </div>

              {/* Досягнення */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100">
                    <div className="text-2xl md:text-3xl font-light text-gray-900 mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-gray-600">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
            
            </div>
          </div>
        </div>
      </section>

      {/* Цінності */}
   

      {/* Команда */}
    

      {/* CTA секція */}
      <section className="py-16 lg:py-20 bg-linear-to-br from-slate-900 via-gray-900 to-blue-900/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Приєднуйся до нашої спільноти
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Стань частиною великої родини вболівальників ФК Вікторія
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Перейти до магазину
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-medium hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
            >
              Зв&apos;язатися з нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}