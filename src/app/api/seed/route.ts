import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Очищаємо старі дані
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()

    // Додаємо тестові товари
    const products = await prisma.product.createMany({
      data: [
        {
    id: '1',
    name: 'Домашня форма сезону 2024',
    price: 1499,
    originalPrice: 1799,
    description: 'Офіційна домашня форма ФК Вікторія сезону 2024. Виготовлена з високоякісних матеріалів для максимального комфорту.',
    image: '/images/products/home-kit.jpg',
    category: 'jersey',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Синя', 'Біла'],
    inStock: true,
    featured: true,
    slug: 'home-jersey-2024'
  },
  {
    id: '2',
    name: 'Гостьова форма сезону 2024',
    price: 1499,
    description: 'Офіційна гостьова форма ФК Вікторія. Біла з синіми акцентами.',
    image: '/images/products/away-cit.jpg',
    category: 'jersey',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Біла', 'Синя'],
    inStock: true,
    featured: true,
    slug: 'away-jersey-2024'
  },
  {
    id: '3',
    name: 'Шарф ФК Вікторія',
    price: 399,
    description: 'Теплий шарф з кольорами клубу. Ідеально підходить для підтримки команди на стадіоні в холодну погоду.',
    image: '/images/products/scarf.jpg',
    category: 'scarf',
    sizes: ['Універсальний'],
    colors: ['Синій-білий'],
    inStock: true,
    featured: false,
    slug: 'team-scarf'
  },
  {
    id: '4',
    name: 'Кепка з логотипом',
    price: 599,
    description: 'Стильна кепка з вишитим логотипом ФК Вікторія. Захищає від сонця та демонструє вашу підтримку.',
    image: '/images/products/cap.jpg',
    category: 'accessory',
    sizes: ['Універсальний'],
    colors: ['Синя', 'Чорна'],
    inStock: true,
    featured: false,
    slug: 'logo-cap'
  },
  {
    id: '5',
    name: 'Бутылка для води',
    price: 299,
    description: 'Тримак для води з логотипом клубу. Ідеальний аксесуар для тренувань та матчів.',
    image: '/images/products/bottle.jpg',
    category: 'accessory',
    sizes: ['0.5л', '0.75л'],
    colors: ['Синя', 'Біла'],
    inStock: true,
    featured: false,
    slug: 'water-bottle'
  },
  {
    id: '6',
    name: 'Мяч ФК Вікторія',
    price: 1299,
    description: 'Офіційний мяч ФК Вікторія. Використовується для тренувань та матчів.',
    image: '/images/products/ball.jpg',
    category: 'accessory',
    sizes: ['Розмір 5'],
    colors: ['Білий-синій'],
    inStock: false,
    featured: false,
    slug: 'team-ball'
  }
      ]
    })

    return NextResponse.json({ 
      success: true, 
      message: `Додано ${products.count} товарів` 
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Помилка' }, { status: 500 })
  }
}