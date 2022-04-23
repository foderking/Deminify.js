// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { substituteArrayLiterals } from "../lib/deobfuscators"
import { refactor } from "shift-refactor"

type Data = string

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const inp = refactor(req.body)
  substituteArrayLiterals(inp)
  
  res.status(200).json(inp.print())
}
