# SSG

generateStaticParams 함수로 미리 정적 경로를 생성할 수 있다.

컴포넌트에서 props.params를 통해 접근할 수 있다.

# route

- pages.tsx
  유니크한 route UI
- route.tsx
  server-side API의 엔드포인트 루트 https://nextjs.org/docs/app/building-your-application/routing/router-handlers
- layout.tsx
  상태 공유 UI 공통 컴포넌트 (Header, NavBar, SideBar ... )

  products/page.tsx,

  products/layout.tsx,

  /products/[slug]/page.tsx

  => 이런 식으로 하위 요소를 감싸는 wrapper componenet를 만들 수 있음

- template.tsx
  새로운 컴포넌트 인스턴스 layout과 같지만 상태 공유 X
- loading.tsx
- error.tsx
- global-error.tsx
- not-found.tsx
  메핑되는 경로가 없다면 app/not-found.tsx컴포넌트를 렌더링

- rest-routes

app/[...slug]/page.tsx => /shop/a => {slug : ["a"]}

app/[...slug]/page.tsx => /shop/a/b => {slug : ["a", "b"]}

- optional-routes

app/[[...slug]]/page.tsx => /shop => {}

app/[[...slug]]/page.tsx => /shop/a => {slug : ["a"]}

그 외

- parallel routes

대쉬보드처럼 경로가 병렬일 경우 https://nextjs.org/docs/app/building-your-application/routing/parallel-routes

- intercepting routes

이미지 미리보기처럼 경로를 가로채서 처리할 경우 https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes

- middleware

https://nextjs.org/docs/app/building-your-application/routing/middleware

- internationalization

국제화 https://nextjs.org/docs/app/building-your-application/routing/internationalization

# Image Generation

https://nextjs.org/docs/app/building-your-application/optimizing/metadata

## Dynamic Image Generation

good to know

- Edge Function으로 동작함
- 최대 번들 사이즈 500kb까지만 가능(assets모두 합쳐서)
- CSS flex, subset css만 허용 (grid x)
- ttf, otf, woff 폰트 포멧만 지원

```js
// Dynamic Image Generation
// og, twitter card 등 사용
// Route Handler로 빼두면 edge에서 동작함.. (개쩐다..)

import { ImageResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello world!
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
```

# Metadata

https://nextjs.org/docs/app/building-your-application/optimizing/metadata

static/dynamic metadata의 generateMetadata는 Server Compoenent에서만 동작합니다.

## Static Metadata

```js
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function Page() {
  return '...'
}
```

## Dynamic Metadata

```js
import type { Metadata } from 'next'

// fetch response는 캐싱되어 두 함수(getProduct, generateMetadata)는 재사용됩니다.
// 'fetch' api를 사용하지 않으면 `cache`를 사용할 수 있습니다.
// https://beta.nextjs.org/docs/data-fetching/caching
async function getProduct(id) {
  const res = await fetch(`https://.../api/products/${id}`)
  return res.json()
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id)
  return { title: product.title }
}

export default async function Page({ params }) {
  const product = await getProduct(params.id)
  // ...
}
```

Good to Know

- fetch request시 generateMetadata, generateStaticParamss는 automatically deduplication합니다
  fetch를 사용하지 않으면 cache를 사용할 수 있습니다.
- streaming UI 을 클라이언트에 제공하기 전 서버는 generateMetadata의 응답이 완료될때까지 기다립니다.

## JSON-LD

JSON-LD는 SEO가 이해할 수 있는 컨텐츠 구조 포맷입니다.

https://nextjs.org/docs/app/building-your-application/optimizing/metadata

! metadata 삽입시 참고하기

## generateMetadata

https://nextjs.org/docs/app/api-reference/functions/generate-metadata

generateMetadat는 복잡하지만 절차적입니다.
위 docs를 참고해서 메타데이터를 설정합니다. (미작성)

# prefetch

image, Link는 prefetch가 이루어짐 (대부분 목적을 가지고 사이트에 방문하기 떄문에)
다음 페이지를 미리 prefetch해둠으로 UX를 향상시킵니다.
용량이 클 경우 비활성화 가능합니다

https://nextjs.org/docs/app/api-reference/components/link#prefetch

# Server Component

## Server Component

요청이 올때 마다 서버에서 실행되는 컴포넌트입니다.

Node.js API를 사용가능!
but Brower API를 사용할 수 없어요
상태관리를 할 수 없어요!
클라리언트 요청시 html만 제공됩니다.

```js
import fs from 'fs' // 서버 컴포넌트는 Node.js API사용가능!

export default function HomePage() {
  console.log('이 로그는 서버에서만 보입니다.')
  return <div></div>
}
```

## Client Component

클라이언트 컴포넌트는 선언을 따로 해줘야 합니다.

```js
'use client' // 이걸 선언해야 Client Component입니다.
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
```

# ISR

마지막 렌더링 시간을 지정한 revalidate priod를 클라이언트에 보내고

클라이언트에서 재요청시 revalidate priod가 지냈다면 다시 랜더링해서 보여줍니다. (3초 마다 다시 랜더링이 아닙니다.)

.next/server/app을 참고해서 언제 정적파일이 생성되는지를 보면 좋을 것 같습니다.

ISR은 사용자가 반복 요청시 캐시된 데이터를 보내주는 용도이고, 실시간이 중요하지 않은 경우에 사용합니다.

예를 들어서

블로그라면 SSG가 좋을 것 같고

인스타그램 처럼 상호작용이 많다면 SSR

특정 시간마다 바뀌는 타임 특가 광고라면 ISR이 좋을 것 같습니다. (ISR은 쓸일이 별로 없을 것 같습니다..)

**ISR은 SSR을 효율적으로 쓰기위한 대체제지 SSG의 대체제가 아님다!**

정적 파일을 유지하면서 다시 빌드하는 방법은 pre-build를 생각해봅시다. (관련 옵션이 있을 수도)

```js
export const revalidate = 3
```

# CSR

nextjs 진심 개쩌는 점이 CSR도 정적인 데이터는 페이지 소스에 포함이 되도록 할 수 있습니다..

```js
'use client'

export default function MeowArticle(){
  const [text, setText] = useState('데이터 로딩 중...') // useState에 들어가는 인자는 페이지 소스에 포함됨!

  useEffect(() => {
    fetch("https://...", {next : {cache : "no-store"}})
    .then((res) => res.json())
    .then((data) => setText(data.data[0]))
  },[])

  reutrn <div>{text}</div>
}
```

# routing

## loading

https://nextjs.org/docs/app/api-reference/file-conventions/loading
https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

loading.tsx를 사용하는 것은 react suspense boundery와 같습니다.

SSR일 경우 loading.tsx는 의미가 있지만, SSG일 경우는 의미가 없습니다.
왜냐하면 SSR일 경우 보통 api요청을 외부로 보내는데 이를 받아올 떄 까지 loading을 보여줍니다.
근데 SSG라면 완성된 페이지를 서버에서 보내기때문에 loading을 보여줄 필요가 없습니다.

## error

error.tsx를 사용하는 것은 react error boundery와 같습니다.
에러 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

### global-error

최상위 에러로 활성 상태일 때 root layout.js를 대체합니다.

# image

Static한 이미지는 자동으로 최적화 합니다.

만약 외부 경로를 사용할 경우 nextjs.config에 아래와같이 도메인을 추가해주고
width, hegiht를 지정해야합니다.

```js
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        host: 'images.unsplash.com',
      },
    ],
  },
```

이미지 사이즈가 고정되어 있기 때문에 layout shift가 발생하지 않습니다.

이미지 로딩의 우선순위를 지정하고 싶으면 priority 속성을 사용할 수 있습니다.

```js
<Image src={clothesImage} alt='Clothes' priority />
```

# Font

https://nextjs.org/docs/app/building-your-application/optimizing/fonts

variable font란
이텔릭, 볼드 등 어려 종류의 폰트가 포함된 폰트입니다.

프로젝트 최상위 경로에서 font를 선언해주는 것이 좋습니다.

# redirect

nextjs.config.js에서 설정 가능합니다.

source : string

- 타겟이되는 주소입니다.

destination : string

- redirect 되는 목적지니다.

permanent : boolean

- true시 redirect status 308을(permanent redirect) 반환하고, false시 redirect 307 (temporary redirect)을 반환합니다.
- true시 페이지가 영구 이동 되었을음 크롤러에게 알리고, 검색 엔진은 해당 주소를 캐싱합니다.

```js
const nextConfiguration = {
  async redirect() {
    return [
      {
        source: '/products/delected_forever',
        destination: '/products',
        permanent: true,
      },
    ]
  },
}
```

# rewrite

경로를 덮어 씌웁니다.

기존의 복잡한 URL구조가 있다면 짧은 경로로 변경하고, 프로젝트의 구조를 숨길 수 있습니다.

source : string

- 클라이언트에 표시되는 주소입니다.
- 클라이언트가 요청한 주소이기도 합니다.

destination : string

- 클라이언트가 보게되는 내용이 있는 주소입니다.
- source 속성의 경로로 클라이언트가 접속하면 이 주소의 내용이 나타납니다.

```js
const nextConfiguration = {
  async rewrite() {
    return [
      {
        source: '/taeuk',
        destination: '/about/me/name/taeuk',
      },
      {
        source: 'items/:slug',
        destination: '/products/:slug',
      },
    ]
  },
}
```
