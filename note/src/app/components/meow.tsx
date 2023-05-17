'use client'
import { useEffect, useState } from 'react'
import styles from './meowArticle.module.css'

export default function MeowArticle() {
  // useState의 default value는 페이지 소스에 포함됨!! (CSR)
  const [text, setText] = useState('데이터 중비 중...')

  useEffect(() => {
    // 따로 캐싱 옵션 or revalidate이 없으 이미 생성된 html파일을 클라이언트에 제공하기 떄문에 캐싱 옵션을 설정해줘야 합니다.
    // 하이드레이션 이전 데이터의 페이지소스 => 패치로 새로운 데이터를 가져오기 때문에
    // 렌덤한 결과를 주는 api같은 경우 페이지 소스와 클라이언트의 결과가 다를 수 있습니다.
    /**
     * option {
     *  next : {revalidate : 10} => 10초마다 ISR로 페치합니다.
     * }
     * option {
     *  next : {revalidate : 0} => 요청이 올 떄 마다 ISR로 페치합니다. 즉 SSR로 동작합니다.
     * }
     */
    fetch('https://meowfacts.herokuapp.com/', {
      // next: { revalidate: 0 },
      // default : cache : "force-cache" simular getStaticProps(SSG)
      cache: 'no-store', // simular getStaicProps(SSR) with the 'revaildate: 0' option
    })
      .then((res) => res.json())
      .then((data) => setText(data.data[0]))
  }, [])

  return <article className={styles.article}>{text}</article>
}
