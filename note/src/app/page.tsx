import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src='https://academy.dream-coding.com/_next/image?url=https%3A%2F%2Fd2lmphbmp3ptuw.cloudfront.net%2Fugc%2F12347%2Favatars%2F2022_11_24_10_59_09_ca84f235fe.png&w=1920&q=75'
        width={600}
        height={600}
        alt='profile'
      ></Image>
    </main>
  )
}
