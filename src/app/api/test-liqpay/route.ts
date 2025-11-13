import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    publicKey: process.env.LIQPAY_PUBLIC_KEY || 'NOT_FOUND',
    privateKey: process.env.LIQPAY_PRIVATE_KEY ? 'SET' : 'NOT_FOUND',
    sandbox: process.env.LIQPAY_SANDBOX,
    appUrl: process.env.NEXT_PUBLIC_APP_URL
  })
}