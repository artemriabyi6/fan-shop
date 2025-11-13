import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
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
    console.log('Starting database seed...')

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
            description: 'Офіційна домашня форма ФК Вікторія. Синя з білими акцентами.',
            image: '/images/products/home-jersey.jpg',
            category: 'jersey',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Синя', 'Біла'],
            inStock: true,
            featured: true,
            slug: 'home-jersey-2024',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          },
          {
            id: '2',
            name: 'Гостьова форма сезону 2024',
            price: 1499,
            originalPrice: null,
            description: 'Офіційна гостьова форма ФК Вікторія. Біла з синіми акцентами.',
            image: '/images/products/away-jersey.jpg',
            category: 'jersey',
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['Біла', 'Синя'],
            inStock: true,
            featured: true,
            slug: 'away-jersey-2024',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          },
          {
            id: '3',
            name: 'Шарф ФК Вікторія',
            price: 399,
            originalPrice: 499,
            description: 'Теплий шарф з кольорами та символікою клубу.',
            image: '/images/products/scarf.jpg',
            category: 'accessories',
            sizes: ['Універсальний'],
            colors: ['Синя', 'Біла', 'Червона'],
            inStock: true,
            featured: false,
            slug: 'team-scarf',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          },
          {
            id: '4',
            name: 'Кепка ФК Вікторія',
            price: 299,
            originalPrice: null,
            description: 'Стильна кепка з логотипом клубу.',
            image: '/images/products/cap.jpg',
            category: 'accessories',
            sizes: ['Універсальний'],
            colors: ['Синя', 'Чорна'],
            inStock: true,
            featured: false,
            slug: 'team-cap',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          },
          {
            id: '5',
            name: 'Бутылка для води',
            price: 199,
            originalPrice: null,
            description: 'Бутылка для води з логотипом клубу.',
            image: '/images/products/water-bottle.jpg',
            category: 'accessories',
            sizes: ['0.5л', '0.75л'],
            colors: ['Синя', 'Біла'],
            inStock: false,
            featured: false,
            slug: 'water-bottle',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          },
          {
            id: '6',
            name: 'Мяч ФК Вікторія',
            price: 899,
            originalPrice: 999,
            description: 'Офіційний мяч для тренувань та матчів.',
            image: '/images/products/ball.jpg',
            category: 'equipment',
            sizes: ['Розмір 5'],
            colors: ['Білий', 'Синій'],
            inStock: true,
            featured: true,
            slug: 'team-ball',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          }
        ]
      })

      const newCount = await prisma.product.count()
      return NextResponse.json({ 
        success: true, 
        message: `Базу даних заповнено! Додано ${newCount} товарів.`,
        products: [
          'Домашня форма сезону 2024',
          'Гостьова форма сезону 2024', 
          'Шарф ФК Вікторія',
          'Кепка ФК Вікторія',
          'Бутылка для води',
          'Мяч ФК Вікторія'
        ]
      })
    } else {
      // Якщо база вже має дані, можна їх оновити або залишити як є
      const products = await prisma.product.findMany({
        select: { name: true, featured: true }
      })
      
      return NextResponse.json({ 
        success: true, 
        message: `База даних вже містить ${productCount} товарів.`,
        existingProducts: products
      })
    }

  } catch (error: any) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Помилка при заповненні бази даних',
      details: error.message 
    }, { status: 500 })
  }
}