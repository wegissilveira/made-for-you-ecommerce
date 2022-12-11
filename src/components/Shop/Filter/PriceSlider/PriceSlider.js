import React, { 
   useContext, 
   useEffect, 
   useState, 
   useRef
} from 'react'

import classes from './PriceSlider.module.css'

import { FilterDataContext } from '../context/FilterContext'

import { UpdateProductsListContext } from "../context/FilterContext"

import { initial_min_value, initial_max_value } from '../helpers/values'


const initial_position = 0 // => Valor inicial do thumb esquerdo ***

const PriceSlider = () => {
   const [slider_width, setSliderWidth] = useState(0)
   const [min_value, setMinValue] = useState(initial_min_value)
   const [max_value, setMaxValue] = useState(initial_max_value)
   const [mobile_thumb1_position, setValueMobileThumb1] = React.useState(0)
   const [mobile_thumb2_position, setValueMobileThumb2] = React.useState(0)

   const sliderRef = useRef() // => Div que engloba o slider
   const thumb_1_Ref = useRef()
   const thumb_2_Ref = useRef()
   const price_thumb_1_Ref = useRef()
   const price_thumb_2_Ref = useRef()

   const { updatePrice } = useContext(UpdateProductsListContext)
   const {isFilterOn, isFilterTagOn} = useContext(FilterDataContext)


   const beginSliding = e => {
      // slider.target.onpointermove = slide
      e.target.onpointermove = slide
      // slider.ontouchmove = slide
      // slider.target.setPointerCapture(e.pointerId)
      e.target.setPointerCapture(e.pointerId)
   }

   const stopSliding = e => {
      // slider.onpointermove = null
      e.target.onpointermove = null
      // slider.releasePointerCapture(e.pointerId)
      e.target.releasePointerCapture(e.pointerId)
   }

   const slide = e => {
      const thumb_id = e.target.id
      let priceThumb = thumb_id === 'left-thumb' ? price_thumb_1_Ref : price_thumb_2_Ref

      let rect = sliderRef.current.getBoundingClientRect()
      let current_position = e.clientX - rect.left

      if (thumb_id === 'right-thumb') {
         let maxValue

         current_position = current_position - sliderRef.current.offsetWidth

         if (current_position >= initial_position) {
            current_position = initial_position
         }

         if (current_position <= mobile_thumb1_position - (slider_width - 25)) {
            current_position = mobile_thumb1_position - (slider_width - 25)
         }

         if (current_position > -1) {
            maxValue = initial_max_value
         } else {
            maxValue = (current_position + slider_width) * (initial_max_value / slider_width)
         }

         const priceRange = {
            minValue: min_value,
            maxValue: maxValue
         }

         updatePrice(priceRange)
         setMaxValue(maxValue)
         setValueMobileThumb2(current_position)
      }

      if (thumb_id === 'left-thumb') {
         let minValue
         if (current_position <= initial_position) {
            current_position = initial_position
         }

         if (current_position >= mobile_thumb2_position + (slider_width - 25)) {
            current_position = mobile_thumb2_position + (slider_width - 25)
         }

         if (current_position - initial_position < 1) {
            minValue = initial_min_value
         } else {
            minValue = (current_position - initial_position) * (initial_max_value / slider_width)            
         }

         const priceRange = {
            minValue: minValue,
            maxValue: max_value
         }

         updatePrice(priceRange)
         setMinValue(minValue)
         setValueMobileThumb1(current_position)
      }

      // slider.style.transform = `translate(${current_position}px)`
      e.target.style.transform = `translate(${current_position}px)`
      // slider_price.style.transform = `translate(${current_position}px)`
      priceThumb.current.style.transform = `translate(${current_position}px)`
   }

   const resetPriceSlider = () => {
      thumb_1_Ref.current.style.transform = `translate(0px)`
      thumb_2_Ref.current.style.transform = `translate(0px)`
      price_thumb_1_Ref.current.style.transform = `translate(0px)`
      price_thumb_2_Ref.current.style.transform = `translate(0px)`

      setMinValue(initial_min_value)
      setMaxValue(initial_max_value)
   }

   useEffect(() => {
      setSliderWidth(sliderRef.current.offsetWidth)
   }, [])

   useEffect(() => {      
      if (!isFilterOn && !isFilterTagOn) {
         resetPriceSlider()
      }

   }, [isFilterOn, isFilterTagOn])


   return (
      <div className={classes.Price_slider_container}>
         <h6>PRICE FILTER</h6>
         <div 
            className={classes.Price_slider_subContainer}
            ref={sliderRef}
         >
            <div>
               <span
                  id="left-thumb"
                  ref={thumb_1_Ref}
                  onPointerDown={e => beginSliding(e)}
                  onPointerUp={e => stopSliding(e)}
               ></span>
               <span
                  id="right-thumb"
                  ref={thumb_2_Ref}
                  onPointerDown={e => beginSliding(e)}
                  onPointerUp={e => stopSliding(e)}
               ></span>
               <p ref={price_thumb_1_Ref}> {Math.floor(min_value)} </p>
               <p ref={price_thumb_2_Ref}> {Math.floor(max_value)} </p>
            </div>
         </div>
      </div>
   )
}

export default PriceSlider