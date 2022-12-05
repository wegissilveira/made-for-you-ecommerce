import React from 'react'
import classes from './MainSlider.module.css'

import { Link } from 'react-router-dom'

import { MainSliderData } from 'Data/mainSliderData'

const MainSlider = (props) => {
   const {
      translateValue,
      sliderRef
   } = props

   return (
      <div
         className={classes.MainSlider_subContainer}
         style={{transform: `translate(${translateValue}%)`}}
         ref={sliderRef}
      >
         {MainSliderData.map((img, i) =>
            <div key={i + img} className={'image-' + i}>
               <img
                  src={img.img}
                  alt={img.alt}
               />
               <div>
                  <Link to={'/shop/' + img.cat}>
                     <p>{img.linkText[0]}</p>
                     <p>{img.linkText[1]}</p>
                  </Link>
               </div>
            </div>
         )}
      </div>
   )
}

export default MainSlider