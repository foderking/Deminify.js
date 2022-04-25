// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { refactor } from "shift-refactor"
import { renameSmallVariables } from './lib/deobfuscators'

type Data = string

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const inp = refactor(req.body)
  renameSmallVariables(inp)
  
  res.status(200).json(inp.print())
}
