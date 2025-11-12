import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const productCount = await prisma.product.count()
    
    return NextResponse.json({ 
      success: true,
      productCount,
      message: `В базі даних ${productCount} товарів`,
      instructions: 'Виконайте POST запит для заповнення бази даних'
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
            description: 'Офіційна домашня форма ФК Вікторія сезону 2024.',
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
            description: 'Офіційна гостьова форма ФК Вікторія.',
            image: '/images/products/away-kit.jpg',
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
          }
        ]
      })

      const newCount = await prisma.product.count()
      return NextResponse.json({ 
        success: true, 
        message: `Базу даних заповнено! Додано ${newCount} товарів.` 
      })
    } else {
      return NextResponse.json({ 
        success: true, 
        message: `База даних вже містить ${productCount} товарів. Seed не потрібен.` 
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