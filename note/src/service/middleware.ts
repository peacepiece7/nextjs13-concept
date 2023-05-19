import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  console.log('미들웨어 실행 중')
  if (request.nextUrl.pathname.startsWith('/products/1004')) {
    return NextResponse.redirect(new URL('/products/1004', request.url))
  }
}

export const config = {
  // regex지원
  // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  matcher: ['/products/:1004*'],
}
