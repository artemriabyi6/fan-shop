'use client'

import { useState } from 'react'

interface PaymentButtonProps {
  orderId: string
  amount: number
  productName: string
  customerEmail: string
  onSuccess?: () => void
  className?: string
}

export default function PaymentButton({ 
  orderId, 
  amount, 
  productName, 
  customerEmail,
  onSuccess,
  className = "w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount,
          productName,
          customerEmail
        })
      })

      const data = await response.json()

      if (data.success) {
        console.log('✅ Payment data received:', data)
        
        // Створюємо форму для LiqPay з ВСІМА обов'язковими полями
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = 'https://www.liqpay.ua/api/3/checkout'
        form.style.display = 'none'
        
        // Додаємо public_key
        const publicKeyInput = document.createElement('input')
        publicKeyInput.type = 'hidden'
        publicKeyInput.name = 'public_key'
        publicKeyInput.value = data.publicKey
        form.appendChild(publicKeyInput)
        
        // Додаємо data
        const dataInput = document.createElement('input')
        dataInput.type = 'hidden'
        dataInput.name = 'data'
        dataInput.value = data.paymentData.data
        form.appendChild(dataInput)
        
        // Додаємо signature
        const signatureInput = document.createElement('input')
        signatureInput.type = 'hidden'
        signatureInput.name = 'signature'
        signatureInput.value = data.paymentData.signature
        form.appendChild(signatureInput)
        
        document.body.appendChild(form)
        console.log('🔄 Submitting LiqPay form...')
        form.submit()
        
      } else {
        console.error('❌ Payment error:', data.error)
        alert('Помилка при створенні платежу: ' + data.error)
      }
    } catch (error) {
      console.error('❌ Payment request error:', error)
      alert('Сталася помилка при спробі оплати')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Обробка...' : `Оплатити ${amount} грн`}
    </button>
  )
}