import { NextApiRequest, NextApiResponse } from 'next'

// nextjs 12버전에서는 여기 코드가 서버에서 동작함.
// 여기서 데이터를 받아서 처리하고, 결과를 클라이언트에게 전달함. (SSR도 가능해짐)

type Data = {
  name: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
