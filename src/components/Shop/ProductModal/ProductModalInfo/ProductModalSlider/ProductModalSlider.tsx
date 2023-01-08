import { useState } from 'react'
import classes from './ProductModalSlider.module.scss'

import { ProductType, SliderDirection } from 'common/types'

import ProgressBar from 'components/Shared/UI/ProgressBar/ProgressBar'
import ProductModalImages from './ProductModalImages/ProductModalImages'


type Props = {
   imgs: string[]
   product: ProductType
}

const ProductModalSlider = (props: Props) => {
   const [imgSlide, setImgSlide] = useState(0)
   const [translateValue, setTranslateValue] = useState(0)

   const {
      product,
      imgs
   } = props

   const changeSlide = (arg: SliderDirection | number) => {
      let newImgSlide = imgSlide
      let newTranslateValue = translateValue
      if (arg === 'previous') {
         if (imgSlide > 0) {
            newImgSlide = imgSlide - 1
            newTranslateValue = translateValue + 100
         } else {
            newImgSlide = imgs.length - 1
            newTranslateValue = (imgs.length - 1) * -100
         }
      } 
      
      if (arg === 'next') {
         if (imgSlide < imgs.length - 1) {
            newImgSlide = imgSlide + 1
            newTranslateValue = translateValue - 100
         } else {
            newImgSlide = 0
            newTranslateValue = 0
         }
      }
      
      if (typeof arg === 'number') {
         newImgSlide = arg
         newTranslateValue = arg * -100
      }

      setImgSlide(newImgSlide)
      setTranslateValue(newTranslateValue)
   }
      

   return (
      <div className={classes.Product_modal_slider}>
         <ProductModalImages 
            productImgs={product.imgsDemo} 
            translateValue={translateValue} 
         />
         <ProgressBar
            bars={product.imgsDemo.length}
            auto={true}
            changeDot={changeSlide}
         />
      </div>
   )
}

export default ProductModalSlider