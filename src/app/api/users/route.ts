import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    const user = await prisma.user.create({
      data: { email, name }
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}