// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// interface OrderItem {
//   id: string
//   productId: string
//   quantity: number
//   selectedSize?: string
//   selectedColor?: string
//   price: number
// }

// interface OrderRequest {
//   items: OrderItem[]
//   total: number
//   customerInfo: {
//     firstName: string
//     lastName: string
//     email: string
//     phone: string
//     address: string
//     city: string
//     postalCode: string
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { items, total }: OrderRequest = await request.json()

//     // Створюємо замовлення в базі даних
//     const order = await prisma.order.create({
//       data: {
//         total,
//         items: {
//           create: items.map((item) => ({
//             productId: item.id,
//             quantity: item.quantity,
//             selectedSize: item.selectedSize,
//             selectedColor: item.selectedColor,
//             price: item.price
//           }))
//         }
//       },
//       include: {
//         items: {
//           include: {
//             product: true
//           }
//         }
//       }
//     })

//     return NextResponse.json({ 
//       success: true, 
//       orderId: order.id,
//       order 
//     })
//   } catch (error) {
//     console.error('Order creation error:', error)
//     return NextResponse.json(
//       { success: false, error: 'Помилка при створенні замовлення' },
//       { status: 500 }
//     )
//   }
// }

// export async function GET() {
//   try {
//     const orders = await prisma.order.findMany({
//       include: {
//         items: {
//           include: {
//             product: true
//           }
//         }
//       },
//       orderBy: {
//         createdAt: 'desc'
//       }
//     })

//     return NextResponse.json(orders)
//   } catch (error) {
//     console.error('Orders fetch error:', error)
//     return NextResponse.json(
//       { error: 'Помилка при отриманні замовлень' },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Orders API is disabled' })
}

export async function POST() {
  return NextResponse.json({ message: 'Orders API is disabled' }, { status: 503 })
}