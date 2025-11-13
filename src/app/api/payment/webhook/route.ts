import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function verifyLiqPaySignature(data: string, signature: string, privateKey: string): boolean {
  const calculatedSignature = Buffer.from(
    privateKey + data + privateKey
  ).toString('base64')
  return calculatedSignature === signature
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const data = formData.get('data') as string
    const signature = formData.get('signature') as string

    if (!process.env.LIQPAY_PRIVATE_KEY) {
      return NextResponse.json({ error: 'LiqPay not configured' }, { status: 500 })
    }

    // Перевіряємо сигнатуру
    if (!verifyLiqPaySignature(data, signature, process.env.LIQPAY_PRIVATE_KEY)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString())
    
    // Оновлюємо статус замовлення
    const updateData: any = {
      status: decodedData.status === 'success' ? 'PAID' : 'FAILED',
      paymentStatus: decodedData.status
    }

    if (decodedData.payment_id) {
      updateData.paymentId = decodedData.payment_id.toString()
    }

    await prisma.order.update({
      where: { id: decodedData.order_id },
      data: updateData
    })

    console.log('Payment webhook received:', decodedData)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}