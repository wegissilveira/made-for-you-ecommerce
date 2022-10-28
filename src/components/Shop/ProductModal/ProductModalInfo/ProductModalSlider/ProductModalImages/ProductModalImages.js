import React from 'react'

import classes from './ProductModalImages.module.css'


const ProductModalImages = props => {
   const {
      productImgs,
      translateSlider
   } = props

   return (
      <div
         className={classes.Main_img_slider}
         style={translateSlider}
      >
         {productImgs.map((slide, i) =>
            <img
               key={i}
               src={slide}
               alt="img-1"
            />
         )}
      </div>
   )
}

export default ProductModalImages