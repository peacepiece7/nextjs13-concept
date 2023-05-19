import { getProducts } from '@/service/products'
import Link from 'next/link'
import MeowArticle from '../../components/meow'
import productImage from '../../../public/image.jpeg'
import Image from 'next/image'

// revalidate: 3초마다 패아자룰 다시 생성
// export const revalidate = 3
export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <>
      <h1>ProductsPage ver6</h1>
      <Image src={productImage} alt='products' width={600} height={600} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <MeowArticle />
    </>
  )
}
