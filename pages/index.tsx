import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import RightSideBar from './components/Sidebar'
import Loading from './components/Loading'
import Spinner from './components/Spinner'
import { reqData } from './api/parse'

const Editor = dynamic( () => import('./components/Editor'),
  { 
    loading: () => Loading({className: styles.left}),
    ssr: false 
  }
)

const Home: NextPage = () => {
  const [code, setCode] = useState("")
  const [tab, setTab]   = useState("4")
  const [current_theme, setTheme] = useState("monokai")
  const [rename_vars, setRenameVars] = useState(true)
  const [spin, setSpin] = useState(false)

  useEffect( () => {
    fetch("/api/parse", {
      method: "GET",
    }).then(
        data => data.json()
      )
      .then(
        data => setCode(data.data)
      )
      .catch (
        err => console.log("error", err)
      )
      .finally(
        () => setSpin(false)
      )
 
  }, [])

  function deminify(e){
    e.preventDefault()
    const request: reqData = {
      renameVars: rename_vars,
      text: code,
      tabSize: Number(tab)
    }
    // setCode("")
    setSpin(true)

    fetch("/api/parse", {
      method: "POST",
      body: JSON.stringify(request)
    }).then(
        data => data.json()
      )
      .then(
        data => setCode(data.data)
      )
      .catch (
        err => console.log("error", err)
      )
      .finally(
        () => setSpin(false)
      )
  }

  function change(code: string) {
    setCode(code)
  } 

  function handleChange(e, set){
    set(e.target.value)
  }

  const tabOptions = ["4", "2"]
  const themeOptions = ["monokai","twilight","terminal"]
  // console.log("asdfasfsd")  

  return (
    <div className={styles.container}>
      <Head>
        <title>Deobfuskate</title>
        <meta name="description" content="Deminify and deobfuscate javascript source files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Image src="/logo.svg"
          width="40px"
          height="40px"
          alt="logo"
        />
      </header>

      <main className={styles.main}>
        { spin && <Spinner /> }
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
          checkName={"Rename Variables"}
          checkValue={rename_vars}
          checkOnchange={(e) => setRenameVars(!rename_vars)}
        />
      </main>
    </div>
  )
}

export default Home