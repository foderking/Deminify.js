import dynamic from 'next/dynamic';
import React from 'react';
import Loading from './Loading';
import s from "../../styles/Home.module.css"

// dynamically import module only in client
const AceEditor = dynamic(
	async () => {
		const ace = await import("react-ace")
		require("ace-builds/src-noconflict/mode-javascript")
		require("ace-builds/src-noconflict/theme-monokai")
		require("ace-builds/src-noconflict/theme-terminal")
		require("ace-builds/src-noconflict/theme-twilight")
		require("ace-builds/src-noconflict/ext-language_tools")
		return ace
	},
	{
		loading: () => Loading({className: s.left}),
		ssr: false
	}
)

export default function Editor({ onChange, code, className, tabsize, theme})  {

    return (
		<>
        <AceEditor
         placeholder="Paste code here!"
          mode="javascript"
          theme={theme}
          name="blah2"
		  height='100%'
          width='100%'
		  className={className}
          onLoad={data => console.log(data)}
          onChange={onChange}
          fontSize={16}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
		  wrapEnabled={true}
          value={code}
          setOptions={{
			enableBasicAutocompletion: false,
			enableLiveAutocompletion: false,
			enableSnippets: false,
			showLineNumbers: true,
			tabSize: tabsize,
			useWorker: false,
		}}/>
	  </>
    );
}

