// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { refactor } from "shift-refactor"
import beautify from "js-beautify"
import { renameSmallVariables } from './lib/deobfuscators'

export interface reqData {
  text: string,
  renameVars: boolean,
  tabSize: number
}

export interface resData {
  error: boolean,
  data : string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<resData>
) {
  if (req.method!=="POST") return res.status(405).json({ error:true, data: "Only POST request allowed"})

  try {
    const body = JSON.parse(req.body) as reqData
    const script = refactor(body.text)
    const beautifyOptions = {
      indent_size: body.tabSize
    }
    // deofuscation functions
    body.renameVars ? renameSmallVariables(script) : null

    res.status(200).json({
      error: false,
      data : beautify(script.print(), beautifyOptions)
    })
  }
  catch (err) {
    res.status(500).json({
      error: true,
      data: String(err)
    })
  }
}

// limit size of  request to 4mb
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    }
  }
}