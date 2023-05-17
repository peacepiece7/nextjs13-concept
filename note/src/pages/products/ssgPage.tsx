import NotFoundPage from '@/app/not-found'
import { getProduct, getProducts } from '@/service/products'

type Params = {
  params: {
    slug: string
  }
}

// CSR에서 실행이 됨
export default async function SSGProductsPage({ params: { slug } }: Params) {
  const product = await getProduct(slug)

  if (!product) {
    NotFoundPage()
    return
  }

  return (
    <div>
      <h1>{product.name} 제품 설명 페이지</h1>
    </div>
  )
}

export async function generateStaticParams() {
  // 서버에서 실행이 됨
  // fs같은 서버 사이드 기능도 수행 가능
  const products = await getProducts()
  return products.map((product) => ({ slug: product.id }))
}
