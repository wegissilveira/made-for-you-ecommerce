import React from 'react'
import classes from './ProductModalImages.module.scss'


const ProductModalImages = props => {
   const {
      productImgs,
      translateValue
   } = props

   return (
      <div
         className={classes.Main_img_slider}
         style={{transform: `translateX(${translateValue}%)`}}
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