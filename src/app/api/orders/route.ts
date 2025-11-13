import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CreateOrderRequest, OrderItemInput } from '@/types/product'

export async function POST(request: Request) {
  try {
    const { items, total, customerInfo }: CreateOrderRequest = await request.json()

    console.log('Received order data:', { items, total, customerInfo })

    // Валідація даних
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Немає товарів у замовленні' },
        { status: 400 }
      )
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Некоректна сума замовлення' },
        { status: 400 }
      )
    }

    // Створюємо замовлення тільки з доступними полями
    const orderData = {
      total: parseFloat(total.toString()),
      status: 'PENDING' as const,
      items: {
        create: items.map((item: OrderItemInput) => ({
          productId: item.id,
          quantity: parseInt(item.quantity.toString()),
          price: parseFloat(item.price.toString()),
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }))
      }
    }

    console.log('Creating order with data:', orderData)

    const order = await prisma.order.create({
      data: orderData,
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    console.log('Order created successfully:', order)

    return NextResponse.json({ 
      success: true, 
      order 
    })
  } catch (error: unknown) {
    console.error('Order creation error details:', error)
    
    let errorMessage = 'Помилка при створенні замовлення'
    if (error instanceof Error) {
      errorMessage = `Помилка при створенні замовлення: ${error.message}`
    }
    
    return NextResponse.json(
      { error: errorMessage },
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
      orderBy: { createdAt: 'desc' }
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