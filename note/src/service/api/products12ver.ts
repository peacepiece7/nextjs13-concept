// * 예전 버전 전용
// "GET" https://localhost:3000/api/products12ver

import { Product, getProducts } from '@/service/products'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  if (req.method === 'GET') {
    const products = await getProducts()
    return res.status(200).json(products)
  }
  res.status(200)
}
