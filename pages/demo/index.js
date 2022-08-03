import Header from './header'
import styles from './index.module.scss'

import Left from './left'
import Main from './main'
import Right from './right'
export default function Government () {
  // useFixScreenSize()

  return (
    <div id='big-screen-container' className={styles['big-screen-container']}>
      <Header></Header>
      <div className={styles.bottom}>
        <Left />
        <Main />
        <Right />
      </div>
    </div>
  )
}
