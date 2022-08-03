import { useEffect } from 'react'

export default function useFixScreenSize () {
  useEffect(() => {
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
      document.getElementById('__next').style.transform = `scale(${scale})`
      document.getElementById('__next').style.transformOrigin = `50% center`
    }
    window.addEventListener('resize', refresh)
    return () => {
      window.removeEventListener('resize', refresh)
    }
  }, [])
}
