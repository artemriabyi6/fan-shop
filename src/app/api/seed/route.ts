import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Спочатку спробуємо створити таблиці, якщо їх немає
    try {
      await prisma.$executeRaw`SELECT 1 FROM "Product" LIMIT 1`
    } catch (error) {
      return NextResponse.json({ 
        success: false,
        error: 'Таблиці не існують',
        instructions: 'Виконайте POST запит для створення таблиць та заповнення даних'
      }, { status: 400 })
    }

    const productCount = await prisma.product.count()
    
    return NextResponse.json({ 
      success: true,
      productCount,
      message: `В базі даних ${productCount} товарів`,
      instructions: productCount === 0 ? 'Виконайте POST запит для заповнення бази даних' : 'База даних готова'
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: 'Помилка при отриманні інформації',
      details: error.message 
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    console.log('Starting database setup...')

    // Спочатку створюємо таблиці
    console.log('Pushing database schema...')
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "Product" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL NOT NULL,
        "originalPrice" DECIMAL,
        description TEXT NOT NULL,
        image TEXT,
        category TEXT NOT NULL,
        sizes TEXT[] NOT NULL,
        colors TEXT[] NOT NULL,
        "inStock" BOOLEAN NOT NULL DEFAULT true,
        featured BOOLEAN NOT NULL DEFAULT false,
        slug TEXT UNIQUE NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Database schema created successfully')

    // Перевіряємо чи база пуста
    const productCount = await prisma.product.count()
    console.log(`Current product count: ${productCount}`)

    if (productCount === 0) {
      console.log('Seeding database with products...')
      
      await prisma.product.createMany({
        data: [
          {
            id: '1',
            name: 'Домашня форма сезону 2024',
            price: 1499,
            originalPrice: 1799,
            description: 'Офіційна домашня форма ФК Вікторія сезону 2024.',
            image: '/images/products/home-jersey.jpg',
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
            description: 'Офіційна гостьова форма ФК Вікторія.',
            image: '/images/products/away-jersey.jpg',
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
            description: 'Теплий шарф з кольорами клубу.',
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
            name: 'Кепка ФК Вікторія',
            price: 299,
            description: 'Стильна кепка з логотипом клубу.',
            image: '/images/products/cap.jpg',
            category: 'accessories',
            sizes: ['Універсальний'],
            colors: ['Синя', 'Чорна'],
            inStock: true,
            featured: false,
            slug: 'team-cap'
          },
          {
            id: '5',
            name: 'Бутылка для води',
            price: 199,
            description: 'Бутылка для води з логотипом клубу.',
            image: '/images/products/water-bottle.jpg',
            category: 'accessories',
            sizes: ['0.5л', '0.75л'],
            colors: ['Синя', 'Біла'],
            inStock: false,
            featured: false,
            slug: 'water-bottle'
          },
          {
            id: '6',
            name: 'М\'яч ФК Вікторія',
            price: 899,
            originalPrice: 999,
            description: 'Офіційний м\'яч для тренувань та матчів.',
            image: '/images/products/ball.jpg',
            category: 'equipment',
            sizes: ['Розмір 5'],
            colors: ['Білий', 'Синій'],
            inStock: true,
            featured: true,
            slug: 'team-ball'
          }
        ]
      })

      const newCount = await prisma.product.count()
      return NextResponse.json({ 
        success: true, 
        message: `Базу даних створено та заповнено! Додано ${newCount} товарів.` 
      })
    } else {
      return NextResponse.json({ 
        success: true, 
        message: `База даних вже містить ${productCount} товарів.` 
      })
    }

  } catch (error: any) {
    console.error('Database setup error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Помилка при налаштуванні бази даних',
      details: error.message 
    }, { status: 500 })
  }
}