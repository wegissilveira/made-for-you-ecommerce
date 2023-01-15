import { useState, useEffect, useRef } from 'react'
import classes from './BestDealSection.module.css'

import { ProductType } from 'common/types'

import BestDealSlider from './BestDealSlider/BestDealSlider'
import ProgressBar from 'components/Shared/UI/ProgressBar/ProgressBar'


type Props = {
   products: ProductType[]
}

const BestDealSection = (props: Props) => {
   const {
      products
   } = props

   const [translateValue, setTranslateValue] = useState(0)

   const productsBestDeal = products.filter(product => product.deal)

   const translateSlider = {
      transform: `translateX(${translateValue}%)`
   }

   const bestDealRef = useRef<HTMLDivElement>(null)

   const screen_width = window.screen.width
   let circle_diameter

   if (screen_width <= 360) {
      circle_diameter = 30
   } else if (screen_width <= 480) {
      circle_diameter = 40
   } else if (screen_width <= 768) {
      circle_diameter = 50
   } else if (screen_width <= 1200) {
      circle_diameter = 40
   } else if (screen_width > 1200) {
      circle_diameter = 30
   }

   const changeSlide = () => {
      const bestDealEl = bestDealRef.current
      if (bestDealEl) {
         let newTransValue = ((bestDealEl.children[0] as HTMLDivElement).offsetWidth / bestDealEl.offsetWidth) * 100
         setTranslateValue(-newTransValue)
   
         setTimeout(() => {
            bestDealEl.appendChild(bestDealEl.firstElementChild!)
   
            bestDealEl.style.transition = 'none'
            setTranslateValue(0)
         }, 2000)
      }
   }

   useEffect(() => {
      if (bestDealRef.current) {
         setTimeout(() => {
            if (bestDealRef.current) bestDealRef.current.style.transition = '2s'
         }, 30)
      }
   }, [translateValue])


   return (
      <div className={classes.Session_container}>
         <BestDealSlider 
            sliderTitle={'BEST DEAL'}
            products={productsBestDeal}
            ref={bestDealRef}
            translateSlider={translateSlider}
         />
         <ProgressBar
            bars={productsBestDeal.length}
            diameter={circle_diameter}
            auto={true}
            changeDot={changeSlide}
            clickable={false}
         />
      </div>
   )
}

export default BestDealSection