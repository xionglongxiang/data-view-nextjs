import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Loading from './loading'

function MyApp ({ Component, pageProps }) {
  console.log('pageProps')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    refresh()
    function refresh () {
      const wh = window.innerHeight
      const ww = window.innerWidth

      const designHeight = 1443
      const designWidth = 2561

      console.log(ww, wh)
      console.log(designWidth, designHeight)
      console.log(ww / designWidth, wh / designHeight)

      const scaleH = wh / designHeight
      const scaleW = ww / designWidth

      const scale = Math.min(scaleH, scaleW).toFixed(6)

      console.log('scale', scale)
      // document.getElementById('__next').style.zoom = scale

      document.getElementById('__next').style.transform = `scale(${scale})`
      document.getElementById('__next').style.transformOrigin = `50% 50%`

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    window.addEventListener('resize', refresh)
    return () => {
      window.removeEventListener('resize', refresh)
    }
  }, [])

  return loading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp
