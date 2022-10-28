import React, { useState } from 'react'

import classes from './ProductModalSlider.module.css'

import ProgressBar from 'components/Shared/UI/ProgressBar/ProgressBar'
import ProductModalImages from './ProductModalImages/ProductModalImages'


const ProductModalSlider = props => {
   const [imgSlide, setImgSlide] = useState(0)
   const [translateValue, setTranslateValue] = useState(0)

   const {
      product,
      imgs
   } = props

   // ANALISAR SE ESTE BLOCO FICA AQUI, SE SE TORNA UMA STATE OU TALVEZ ATÉ MESMO UM REDUCER
   const translateSlider = {
      transform: `translateX(${translateValue}%)`,
      transition: '.8s ease-in-out',
      overflow: 'unset'
   }

   const changeSlide = arg => {
      if (arg === 'previous') {
         if (imgSlide > 0) {
            setImgSlide(imgSlide - 1)
            setTranslateValue(translateValue + 100)
         } else {
            setImgSlide(imgs.length - 1)
            setTranslateValue((imgs.length - 1) * -100)
         }

      } else if (arg === 'next') {
         if (imgSlide < imgs.length - 1) {
            setImgSlide(imgSlide + 1)
            setTranslateValue(translateValue - 100)
         } else {
            setImgSlide(0)
            setTranslateValue(0)
         }

      } else if (typeof arg === 'number') {
         setImgSlide(arg)
         setTranslateValue(arg * -100)
      }
   }
      

   return (
      <div className={classes.Product_modal_slider}>
         <ProductModalImages 
            productImgs={product.imgsDemo} 
            translateSlider={translateSlider} 
         />
         <ProgressBar
            bars={product.imgsDemo.length}
            auto={true}
            timer={5000}
            changeDot={changeSlide}
         />
      </div>
   )
}

export default ProductModalSlider