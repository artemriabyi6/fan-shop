'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import CartDropdown from './CartDropdown'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { state } = useCart()
  const router = useRouter()

  // Ефект для відстеження скролу
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Ефект для закриття меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMenuOpen(false)
      }
      if (!target.closest('.cart-dropdown') && !target.closest('.cart-button')) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Ефект для блокування скролу при відкритому меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  // Функція для обробки кліку по кошику
  const handleCartClick = () => {
    if (window.innerWidth < 1024) {
      // На мобільних пристроях переходимо на сторінку кошика
      router.push('/cart')
    } else {
      // На десктопі показуємо дропдаун
      setIsCartOpen(!isCartOpen)
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Логотип та назва */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image 
                  src="/images/logo.png" 
                  alt="ФК Вікторія" 
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 40px, 48px"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-light text-gray-900">ФК Вікторія</h1>
                <p className="text-xs lg:text-sm text-gray-600 font-light">Фан-шоп</p>
              </div>
            </Link>
          </div>

          {/* Навігація для десктопу */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Головна" },
              { href: "/products", label: "Магазин" },
              { href: "/about", label: "Про клуб" },
              { href: "/contact", label: "Контакти" }
            ].map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="text-gray-700 hover:text-blue-600 font-light transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Іконки дій */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Кошик з дропдауном */}
            <div className="relative cart-dropdown">
              <button 
                className="cart-button p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110 relative"
                onClick={handleCartClick}
              >
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-medium shadow-sm">
                    {state.itemCount > 99 ? '99+' : state.itemCount}
                  </span>
                )}
              </button>
              
              {/* Показуємо дропдаун тільки на десктопі */}
              {typeof window !== 'undefined' && window.innerWidth >= 1024 && (
                <CartDropdown 
                  isOpen={isCartOpen} 
                  onClose={() => setIsCartOpen(false)} 
                />
              )}
            </div>

            {/* Профіль */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Мобільне меню */}
            <button 
              className="lg:hidden mobile-menu-button p-2 text-gray-600 hover:text-blue-600 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute left-0 top-1 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : ''
                }`}></span>
                <span className={`absolute left-0 top-2 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute left-0 top-3 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Мобільне меню */}
        <div className={`lg:hidden mobile-menu fixed inset-0 bg-white/95 backdrop-blur-lg z-40 transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}>
          {/* Хрестик для закриття */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-3 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col p-6 space-y-6 h-full pt-20">
            <nav className="flex flex-col space-y-2">
              {[
                { href: "/", label: "Головна", icon: "🏠" },
                { href: "/products", label: "Магазин", icon: "🛍️" },
                { href: "/about", label: "Про клуб", icon: "⚽" },
                { href: "/contact", label: "Контакти", icon: "📞" }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center space-x-4 text-lg font-light text-gray-700 hover:text-blue-600 py-4 px-4 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Додаткова інформація в мобільному меню */}
            <div className="mt-auto pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+380 99 123 4567</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>shop@fk-viktoria.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay для мобільного меню */}
        <div 
          className={`lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-500 ${
            isMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  )
}