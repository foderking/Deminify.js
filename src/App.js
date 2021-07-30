import React from 'react'
import beaut from 'js-beautify'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const App = () =>
{
  const [code, setCode] = React.useState('')

  function deMinify(e)
  {
    e.preventDefault()

    const b_code  = beaut(code)
    setCode(b_code)
    console.log(b_code)
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Deminifier.js</h1>

      <div className='py-5'>
        <AceEditor
          placeholder="Paste code here!"
          mode="javascript"
          theme="monokai"
          name="blah2"
          width='100%'
          onLoad={data => console.log(data)}
          onChange={(code) => setCode(code)}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          }}/>
            
      </div>
      <button onClick={deMinify} type="button" className="btn btn-success">Deminify</button>
    </div>
  )
}


export default App