import {useEffect, useState} from 'react'
import classes from './ProgressBar.module.css'

import { SliderDirection } from 'common/types'


type Props = {
   diameter?: number
   bars: number
   timer?: number
   auto?: boolean
   direction?: 'column' | 'row'
   height?: number
   clickable?: boolean
   changeDot: (index: number | SliderDirection) => void
}

const strokeWidth = 3
let interval: number
const ProgressBar = (props: Props) => {
   const {
      diameter = 30,
      bars,
      timer = 5000,
      auto = false,
      direction = 'row',
      height = 'auto',
      clickable = true,
      changeDot
   } = props

   const [percentage, setPercentage] = useState(0)
   const [barIndex, setBarIndex] = useState(0) // => Ponto ativo inicialmente

   const barsArray = Array(bars).fill(1) // => Quantidade de círculos que serão criadas

   const changeSlideHandler = (index: number) => {
      setPercentage(0) // Reseta a posição do círculo
      setBarIndex(index) // Coloca a barra no ponto clicado
      changeDot(index) // Passa o slide do componente parent para acompanhar o ponto que recebe a barra
      clearTimeout(interval) // Limpa o tempo de 'setTimeout' para que este 0 juntamente com 'percentage'
   }
   
   useEffect(() => {
      let mounted = true
      if (auto) {
         interval = window.setTimeout(() => {
            if (mounted) {
               percentage < 100 ? setPercentage(percentage + 1) : setPercentage(0)
            }
            if (percentage === 100) {
               barIndex < barsArray.length - 1 ? setBarIndex(barIndex + 1) : setBarIndex(0)
               changeDot('next')
            }
         }, timer / 100)
      } else {
         setPercentage(100)
      }
      
      return () => {
         mounted = false
      }
   })

   const radius = (diameter - strokeWidth) / 2
   const viewBox = `0 0 ${diameter} ${diameter}`
   const dashArray = radius * Math.PI * 2
   const dashOffset = dashArray - dashArray * percentage / 100

   const barStyle = {
      flexDirection: direction,
      height: height + 'px'
   } as const

   return (
      <div
         className={classes.ProgressBar_container}
         style={barStyle}
      >
         {barsArray.map((bar, i) => {
            return <svg
               key={bar + '-' + i}
               width={diameter}
               height={diameter}
               viewBox={viewBox}
               style={{ cursor: clickable === false ? 'default' : 'pointer' }}
               onClick={clickable === false ? undefined : () => changeSlideHandler(i)}
            >
               {i === barIndex ?
                  <circle
                     className={classes.Circle_progress}
                     cx={diameter / 2}
                     cy={diameter / 2}
                     r={radius}
                     strokeWidth={`${strokeWidth}px`}
                     transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
                     style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                     }}
                  />
                  : null}
               <circle
                  className={classes.Circle_center}
                  cx="50%"
                  cy="50%"
                  r="3"
               />

            </svg>
         })}
      </div>
   );
}

export default ProgressBar