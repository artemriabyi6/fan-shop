import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import { prisma } from '@/lib/prisma'

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug }
    })
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      select: { slug: true }
    })
    return products
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
  
  return products.map((product) => ({
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