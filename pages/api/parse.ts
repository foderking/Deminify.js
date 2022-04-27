// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { refactor } from "shift-refactor"
import beautify from "js-beautify"
import { renameSmallVariables } from './lib/deobfuscators'

const defaultText = "var a=['\x74\x61\x72\x67\x65\x74','\x67\x72\x65\x65\x74','\x6c\x6f\x67','\x48\x65\x6c\x6c\x6f\x20','\x73\x65\x74\x54\x61\x72\x67\x65\x74','\x77\x6f\x72\x6c\x64','\x72\x65\x61\x64\x65\x72'];var b=function(c,d){c=c-0x0;var e=a[c];return e;};(function(){class c{constructor(d){this[b('0x0')]=d;}[b('0x1')](){console[b('0x2')](b('0x3')+this[b('0x0')]);}[b('0x4')](e){this[b('0x0')]=e;}}const f=new c(b('0x5'));f[b('0x1')]();f[b('0x4')](b('0x6'));f[b('0x1')]();}());"

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
  // if (req.method!=="POST") return res.status(405).json({ error:true, data: "Only POST request allowed"})
  switch(req.method)
  {
    case "POST":
      try {
        const body = JSON.parse(req.body) as reqData
        const script = refactor(body.text)
        const beautifyOptions = {
          indent_size: body.tabSize
        }
        // deofuscation functions
        body.renameVars ? renameSmallVariables(script) : null

        return res.status(200).json({
          error: false,
          data : beautify(script.print(), beautifyOptions)
        })
      }
      catch (err) {
        return res.status(500).json({
          error: true,
          data: String(err)
        })
      }

    case "GET":
      return res.status(200).json({
        error: false,
        data: defaultText
      })

    default:
      return res.status(405).json({
        error: true,
        data: "Only POST request allowed"
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