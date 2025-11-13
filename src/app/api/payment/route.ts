import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

function generateLiqPaySignature(data: string, privateKey: string): string {
  // Правильний спосіб: privateKey + data + privateKey, потім SHA1
  const signatureString = privateKey + data + privateKey
  return crypto.createHash('sha1').update(signatureString).digest('base64')
}

export async function POST(request: Request) {
  try {
    console.log('🔄 Payment API called')
    
    const body = await request.json()
    console.log('📦 Request body:', body)

    const { orderId, amount, productName, customerEmail } = body

    if (!process.env.LIQPAY_PUBLIC_KEY || !process.env.LIQPAY_PRIVATE_KEY) {
      console.error('❌ LiqPay keys missing')
      return NextResponse.json(
        { error: 'LiqPay keys not configured' },
        { status: 500 }
      )
    }

    // Створюємо платіж в LiqPay
    const paymentData = {
      public_key: process.env.LIQPAY_PUBLIC_KEY,
      version: '3',
      action: 'pay',
      amount: amount,
      currency: 'UAH',
      description: `Оплата замовлення #${orderId}`,
      order_id: orderId,
      result_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success?orderId=${orderId}`,
      server_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
      customer: customerEmail,
      product_name: productName,
      sandbox: process.env.LIQPAY_SANDBOX === '1' ? 1 : 0
    }

    console.log('📦 Payment data before encoding:', paymentData)

    const base64Data = Buffer.from(JSON.stringify(paymentData)).toString('base64')
    const signature = generateLiqPaySignature(base64Data, process.env.LIQPAY_PRIVATE_KEY)

    console.log('🔐 Generated:', {
      dataLength: base64Data.length,
      signatureLength: signature.length,
      dataSample: base64Data.substring(0, 50) + '...',
      signatureSample: signature.substring(0, 20) + '...'
    })

    // Перевірка підпису (для дебагу)
    const verifySignature = generateLiqPaySignature(base64Data, process.env.LIQPAY_PRIVATE_KEY)
    console.log('✅ Signature verification:', signature === verifySignature)

    return NextResponse.json({
      success: true,
      paymentData: {
        data: base64Data,
        signature: signature
      },
      publicKey: process.env.LIQPAY_PUBLIC_KEY
    })

  } catch (error) {
    console.error('❌ Payment API error:', error)
    return NextResponse.json(
      { error: 'Помилка при створенні платежу' },
      { status: 500 }
    )
  }
}