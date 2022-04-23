import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
// import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import RightSideBar from './components/Sidebar'
import beautify from "js-beautify"
import Loading from './components/Loading'

const Editor = dynamic(
  () => import('./components/Editor'),
  { 
    loading: () => Loading({className: styles.left}),
    ssr: false 
  }
)

const Home: NextPage = () => {
  function deminify(e){
    setCode(beautify(code))
  }

  function change(code: string) {
    setCode(code)
  } 

  const [code, setCode] = useState("")

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
        <Editor
          onChange={change}
          code={code} 
          className={styles.left}
        />
        <RightSideBar
          className={styles.right}
          click={deminify}
        />
      </main>
    </div>
  )
}

export default Home