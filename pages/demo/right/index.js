import * as styles from './index.module.scss'

import M_1 from './1.js'
import M_2 from './2.js'
import M_3 from './3.js'
import M_4 from './4.js'

export default function Page (props) {
  return (
    <div className={styles['right']}>
      <M_1 />
      <M_2 />
      <M_3 />
      <M_4 />
    </div>
  )
}
