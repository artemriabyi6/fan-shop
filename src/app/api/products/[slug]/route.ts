import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise <{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    console.log('Fetching product with slug:', slug)

    const product = await prisma.product.findUnique({
      where: {
        slug: slug
      }
    })

    console.log('Found product:', product)

    if (!product) {
      return NextResponse.json(
        { error: 'Товар не знайдено' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Помилка при отриманні товару' },
      { status: 500 }
    )
  }
}