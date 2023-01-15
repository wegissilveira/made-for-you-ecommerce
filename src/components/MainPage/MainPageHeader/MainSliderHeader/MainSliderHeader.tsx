import React, { useState, useEffect, useRef } from 'react'
import classes from './MainSliderHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { SliderDirection } from 'common/types'

import MainSlider from './MainSlider/MainSlider'
import MainSliderArrows from './MainSliderArrows/MainSliderArrows'


const MainSliderHeader = () => {
   const [translateValue, setTranslateValue] = useState(0)
   const [clickEnabled, setClickEnabled] = useState(true)

   const sliderRef = useRef() as React.MutableRefObject<HTMLDivElement>

   const mainSliderHandler = (action: SliderDirection) => {
      setClickEnabled(false)

      const sliderEl = sliderRef.current
      const flexStyle = window.getComputedStyle(sliderEl)
      const justifyContent = flexStyle.getPropertyValue('justify-content')

      if (action === 'next') {
         setTranslateValue(-100)
         if (justifyContent === 'flex-end') {
            sliderEl.prepend(sliderEl.lastElementChild!)
            sliderEl.style.justifyContent = 'flex-start'
         }

      } else {
         if (justifyContent === 'flex-start') {
            sliderEl.appendChild(sliderEl.firstElementChild!)
            sliderEl.style.justifyContent = 'flex-end'
         }
         setTranslateValue(100)
      }

      setTimeout(() => {         
         if (action === 'next') {
            sliderEl.appendChild(sliderEl.firstElementChild!)
         } else {
            sliderEl.prepend(sliderEl.lastElementChild!)
         }

         sliderEl.style.transition = 'none'
         setTranslateValue(0)

         if (sliderRef.current) {
            setTimeout(() => {
               sliderRef.current.style.transition = '0.8s'
               setClickEnabled(true)
            }, 30)
         }
      }, 800)
   }

   useEffect(() => {
      const interval = setTimeout(() => {
         mainSliderHandler('next')
      }, 5000)
      return () => clearTimeout(interval)
   })

   return (
      <div className={classes.Header_block_2}>
         <div className={classes.MainSlider_container}>
            <MainSlider 
               translateValue={translateValue} 
               ref={sliderRef}
            />
            <MainSliderArrows 
               clickEnabled={clickEnabled}
               mainSliderHandlerCB={mainSliderHandler} 
            />
         </div>
         <div className={classes.Icons_container}>
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            <FontAwesomeIcon icon={['fab', 'instagram']} />
            <FontAwesomeIcon icon={['fab', 'vk']} />
            <FontAwesomeIcon icon={['fab', 'twitter']} />
         </div>
      </div>
   )
}

export default MainSliderHeader