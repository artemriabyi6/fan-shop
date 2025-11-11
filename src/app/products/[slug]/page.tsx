import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products/${slug}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      return []
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map((product: any) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata(props: ProductPageProps) {
  const params = await props.params
  const product = await getProduct(params.slug)
  
  if (!product) {
    return {
      title: 'Товар не знайдено'
    }
  }

  return {
    title: `${product.name} | ФК Вікторія`,
    description: product.description,
  }
}