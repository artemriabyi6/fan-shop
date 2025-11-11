import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import ProductDetails from '@/components/ProductDetails'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)

  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  
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