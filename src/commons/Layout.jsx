import { Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

import FooterBar from './FooterBar'

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <header>
        <h1 className={styles.title}>Grip Movie</h1>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <FooterBar />
      </footer>
    </div>
  )
}
