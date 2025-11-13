'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number | null
  description: string
  image: string | null
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  slug: string
  createdAt: string
  updatedAt: string
}

interface Order {
  id: string
  total: number
  status: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  paymentStatus?: string
  paymentId?: string
  items: Array<{
    product: Product
    quantity: number
    price: number
    selectedSize: string
    selectedColor: string
  }>
  createdAt: string
}

interface Stats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  featuredProducts: number
  outOfStock: number
  pendingOrders: number
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders')
        ])
        
        const productsData = await productsRes.json()
        const ordersData = await ordersRes.json()
        
        setProducts(productsData)
        setOrders(ordersData)
        
        // Розраховуємо статистику
        const statsData: Stats = {
          totalProducts: productsData.length,
          totalOrders: ordersData.length,
          totalRevenue: ordersData.reduce((sum: number, order: Order) => sum + order.total, 0),
          featuredProducts: productsData.filter((p: Product) => p.featured).length,
          outOfStock: productsData.filter((p: Product) => !p.inStock).length,
          pendingOrders: ordersData.filter((o: Order) => o.status === 'PENDING').length
        }
        
        setStats(statsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Завантаження адмін-панелі...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Адмін-панель</h1>
        
        {/* Статистика */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
              <div className="text-sm text-gray-600">Товарів</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600">Замовлень</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalRevenue} грн</div>
              <div className="text-sm text-gray-600">Доход</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.featuredProducts}</div>
              <div className="text-sm text-gray-600">Хітові</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
              <div className="text-sm text-gray-600">Немає в наявності</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</div>
              <div className="text-sm text-gray-600">Очікують оплати</div>
            </div>
          </div>
        )}

        {/* Таби */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Товари ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Замовлення ({orders.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'products' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Фото</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Назва</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ціна</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категорія</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Розміри</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4">
                          {product.image && (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.slug}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>{product.price} грн</div>
                          {product.originalPrice && (
                            <div className="text-xs text-gray-500 line-through">
                              {product.originalPrice} грн
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? 'В наявності' : 'Немає'}
                            </span>
                            {product.featured && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Хіт
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.sizes.join(', ')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-lg">Замовлення #{order.id.slice(-8)}</p>
                        <div className="text-sm text-gray-600 mt-1">
                          {order.customerName && <div>Клієнт: {order.customerName}</div>}
                          {order.customerEmail && <div>Email: {order.customerEmail}</div>}
                          {order.customerPhone && <div>Телефон: {order.customerPhone}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{order.total} грн</p>
                        <div className="space-y-1 mt-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'PAID' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                          {order.paymentStatus && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {order.paymentStatus}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Товари:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-3">
                              {item.product.image && (
                                <img 
                                  src={item.product.image} 
                                  alt={item.product.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              )}
                              <div>
                                <div className="font-medium">{item.product.name}</div>
                                <div className="text-gray-500 text-xs">
                                  {item.selectedSize} • {item.selectedColor} × {item.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div>{item.price * item.quantity} грн</div>
                              <div className="text-xs text-gray-500">{item.price} грн/шт</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 text-xs text-gray-500">
                      Створено: {new Date(order.createdAt).toLocaleString()}
                      {order.paymentId && ` • Payment ID: ${order.paymentId}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}