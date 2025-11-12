import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔄 Fetching products from database...')
    
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`✅ Found ${products.length} products`)
    
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ Products fetch error:', error)
    return NextResponse.json(
      { error: 'Помилка при отриманні товарів' },
      { status: 500 }
    )
  }
}