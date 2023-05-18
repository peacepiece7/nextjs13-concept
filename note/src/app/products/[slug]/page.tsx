import NotFoundPage from '@/app/not-found'
import { getProduct, getProducts } from '@/service/products'
import Image from 'next/image'

type Params = {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: Params) {
  return {
    title: `${params.slug} | 제품 상세`,
    description: `${params.slug} 제품 상세 설명`,
  }
}

export default async function ProductItemsPage({ params: { slug } }: Params) {
  const product = await getProduct(slug)

  if (!product) {
    NotFoundPage()
    return
  }

  return (
    <div>
      <h1>{product.name} 제품 설명 페이지</h1>
      <Image src={product.image} width={400} height={400} alt='product'></Image>
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.id }))
}
