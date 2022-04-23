import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default function Editor({ onChange, code, className })  {

    return (
        <AceEditor
         placeholder="Paste code here!"
          mode="javascript"
          theme="monokai"
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
          value={code}
          setOptions={{
			enableBasicAutocompletion: false,
			enableLiveAutocompletion: false,
			enableSnippets: false,
			showLineNumbers: true,
			tabSize: 3,
		}}/>
    );
}