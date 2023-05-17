import Link from 'next/link'
import styles from './layout.module.css'
import { Metadata } from 'next'

type Props = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: '멋진 제품 사이트 | 전체 제품 확인',
  description: '멋진 제품을 확인해 보세요',
}

export default function ProductLayout({ children }: Props) {
  return (
    <>
      <nav className={styles.nav}>
        <Link href='/products/man'>남성옷</Link>
        <Link href='/products/woman'>여성옷</Link>
      </nav>
      <section>{children}</section>
    </>
  )
}
