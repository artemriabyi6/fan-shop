'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Тут буде логіка відправки форми
    console.log('Form submitted:', formData)
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Адреса",
      content: "м. Київ, вул. Спортивна, 15",
      description: "Головний офіс"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Телефон",
      content: "+380 99 123 4567",
      description: "Щодня 9:00 - 20:00"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      content: "shop@fk-viktoria.com",
      description: "Відповідаємо протягом 24 годин"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Графік роботи",
      content: "Пн-Нд: 9:00 - 20:00",
      description: "Без вихідних"
    }
  ]

  const faqItems = [
    {
      question: "Як оформити замовлення?",
      answer: "Виберіть товар, додайте його в кошик та перейдіть до оформлення замовлення."
    },
    {
      question: "Які способи доставки доступні?",
      answer: "Доставка кур'єром по Києву, відділеннями Нової Пошти по всій Україні."
    },
    {
      question: "Чи можна повернути товар?",
      answer: "Так, протягом 14 днів з моменту отримання замовлення."
    },
    {
      question: "Як зв'язатися з підтримкою?",
      answer: "Зателефонуйте за номером +380 99 123 4567 або напишіть на shop@fk-viktoria.com"
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/20 to-white">
      {/* Hero секція */}
      <section className="relative py-16 lg:py-24 bg-linear-to-br from-slate-900 via-gray-900 to-blue-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight">
              Контакти
            </h1>
            <div className="w-24 h-1 bg-linear-to-r from-blue-400 to-purple-400 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ми завжди раді допомогти та відповісти на ваші запитання
            </p>
          </div>
        </div>
      </section>

      {/* Контактна інформація */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className="group text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-900 font-medium mb-1">
                  {item.content}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Форма зворотного зв'язку */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                  Напишіть нам
                </h2>
                <div className="w-20 h-0.5 bg-linear-to-r from-blue-400 to-purple-400 rounded-full mb-6"></div>
                <p className="text-gray-600 leading-relaxed">
                  Маєте запитання чи пропозиції? Заповніть форму нижче, 
                  і ми обов&apos;язково зв&apos;яжемося з вами найближчим часом.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ім&apos;я *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="Ваше ім'я"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Тема повідомлення
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Оберіть тему</option>
                    <option value="order">Питання щодо замовлення</option>
                    <option value="product">Інформація про товар</option>
                    <option value="delivery">Доставка та оплата</option>
                    <option value="return">Повернення товару</option>
                    <option value="other">Інше</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Повідомлення *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                    placeholder="Ваше повідомлення..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Надіслати повідомлення
                </button>
              </form>
            </div>

            {/* FAQ та додаткова інформація */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-6">
                  Часті запитання
                </h3>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div 
                      key={index}
                      className="bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 hover:border-blue-200 transition-all duration-300"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {item.question}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="font-medium text-gray-900 mb-3">
                  Швидка допомога
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Потрібна термінова консультація? Зателефонуйте нам прямо зараз!
                </p>
                <Link
                  href="tel:+380991234567"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Зателефонувати
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секція */}
      <section className="py-16 lg:py-20 bg-linear-to-br from-slate-900 via-gray-900 to-blue-900/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Готові робити покупки?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Знайдіть ідеальну продукцію для підтримки вашої улюбленої команди
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Перейти до магазину
            </Link>
            <Link
              href="/about"
              className="border border-gray-600 text-gray-300 px-8 py-4 rounded-xl font-medium hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
            >
              Дізнатися більше
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}