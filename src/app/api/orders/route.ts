import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { items, total, customerInfo } = await request.json()

    // Створюємо замовлення в базі даних
    const order = await prisma.order.create({
      data: {
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      order 
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Помилка при створенні замовлення' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { error: 'Помилка при отриманні замовлень' },
      { status: 500 }
    )
  }
}