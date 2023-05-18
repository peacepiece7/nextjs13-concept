import Link from 'next/link'
import './globals.css'
import styles from './layout.module.css'
import { Open_Sans } from 'next/font/google'
import { Nanum_Gothic } from 'next/font/google'

import { Metadata } from 'next'

const gothic = Nanum_Gothic({
  weight: '700',
  subsets: ['latin'],
})
const sans = Open_Sans({ subsets: ['latin'] })

// 자식도 재사용 됨
export const metadata: Metadata = {
  title: '멋진 제품 사이트',
  description: '멋진 제품을 판매하는 사이트입니다.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={sans.className}>
      <body>
        <header className={styles.header}>
          <h1 className={gothic.className}>
            <Link href='/'>Demo Note</Link>
          </h1>
          <nav className={styles.nav}>
            <Link href='/products'>products</Link>
            <Link href='/about'>about</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
