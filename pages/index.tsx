import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
// import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import RightSideBar from './components/Sidebar'
import beautify from "js-beautify"
import Loading from './components/Loading'
import Spinner from './components/Spinner'

const Editor = dynamic(
  () => import('./components/Editor'),
  { 
    loading: () => Loading({className: styles.left}),
    ssr: false 
  }
)

const Home: NextPage = () => {
  const [code, setCode] = useState("")
  const [tab, setTab]   = useState("4")
  const [current_theme, setTheme] = useState("monokai")
  const [rename_vars, setRenameVars] = useState(false)

  function deminify(e){
    setCode(beautify(code, beautifyOptions))
  }

  function change(code: string) {
    setCode(code)
  } 

  function handleChange(e, set){
    set(e.target.value)
  }

  const tabOptions = ["4", "2"]
  const themeOptions = ["monokai","twilight","terminal"]
  const beautifyOptions = {
    indent_size: tab
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Deobfuskate</title>
        <meta name="description" content="Deminify and deobfuscate javascript source files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
      </header>

      <main className={styles.main}>
        <Spinner />
        <Editor
          onChange={change}
          code={code} 
          className={styles.left}
          tabsize={tab}
          theme={current_theme}
        />
        <RightSideBar
          className={styles.right}
          click={deminify}
          options={tabOptions}
          handleChange={(e) => handleChange(e, setTab)}
          theme_options={themeOptions}
          themeChange={(e) => handleChange(e, setTheme)}
          checkName={"rename short variables"}
          checkValue={rename_vars}
          checkOnchange={(e) => setRenameVars(!rename_vars)}
        />
      </main>
    </div>
  )
}

export default Home