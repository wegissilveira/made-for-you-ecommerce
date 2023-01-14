import { 
   useContext, 
   useEffect, 
   useState, 
   useRef
} from 'react'

import classes from './PriceSlider.module.css'

import { FilterDataContext } from '../context/FilterContext'

import { UpdateFilterListContext } from "../context/FilterContext"

import { initial_min_value, initial_max_value } from '../helpers/values'


type Props = {
   setGalleryHeightCB: () => void
}

const initial_position = 0 // => Valor inicial do thumb esquerdo ***

const PriceSlider = (props: Props) => {
   const {
      setGalleryHeightCB
   } = props

   const [slider_width, setSliderWidth] = useState(0)
   const [min_value, setMinValue] = useState(initial_min_value)
   const [max_value, setMaxValue] = useState(initial_max_value)
   const [mobile_thumb1_position, setValueMobileThumb1] = useState(0)
   const [mobile_thumb2_position, setValueMobileThumb2] = useState(0)

   const sliderRef = useRef<HTMLDivElement>(null) // => Div que engloba o slider
   const thumb_1_Ref = useRef<HTMLSpanElement>(null)
   const thumb_2_Ref = useRef<HTMLSpanElement>(null)
   const price_thumb_1_Ref = useRef<HTMLParagraphElement>(null)
   const price_thumb_2_Ref = useRef<HTMLParagraphElement>(null)

   const { updatePrice } = useContext(UpdateFilterListContext)
   const {isFilterOn, isFilterTagOn} = useContext(FilterDataContext)


   const beginSliding = (e: React.PointerEvent<HTMLSpanElement>) => {
      const spanEl = e.target as HTMLSpanElement
      // slider.target.onpointermove = slide
      spanEl.onpointermove = slide
      // slider.ontouchmove = slide
      // slider.target.setPointerCapture(e.pointerId)
      spanEl.setPointerCapture(e.pointerId)
   }

   const stopSliding = (e: React.PointerEvent<HTMLSpanElement>) => {
      const spanEl = e.target as HTMLSpanElement
      // slider.onpointermove = null
      spanEl.onpointermove = null
      // slider.releasePointerCapture(e.pointerId)
      spanEl.releasePointerCapture(e.pointerId)
   }

   const slide = (e: PointerEvent) => {
      const sliderContainer = sliderRef.current
      const spanEl = e.target as HTMLSpanElement

      const thumb_id = spanEl.id
      let priceThumb = thumb_id === 'left-thumb' ? price_thumb_1_Ref : price_thumb_2_Ref

      if (sliderContainer) {
         let rect = sliderContainer.getBoundingClientRect()
         let current_position = e.clientX - rect.left
   
         if (thumb_id === 'right-thumb') {
            let maxValue
   
            current_position = current_position - sliderContainer.offsetWidth
   
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
            setGalleryHeightCB()
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
            setGalleryHeightCB()
         }
   
         // slider.style.transform = `translate(${current_position}px)`
         spanEl.style.transform = `translate(${current_position}px)`
         // slider_price.style.transform = `translate(${current_position}px)`
         if (priceThumb.current) priceThumb.current.style.transform = `translate(${current_position}px)`
      }
   }

   const resetPriceSlider = () => {
      if (thumb_1_Ref.current && thumb_2_Ref.current && price_thumb_1_Ref.current && price_thumb_2_Ref.current) {
         thumb_1_Ref.current.style.transform = `translate(0px)`
         thumb_2_Ref.current.style.transform = `translate(0px)`
         price_thumb_1_Ref.current.style.transform = `translate(0px)`
         price_thumb_2_Ref.current.style.transform = `translate(0px)`
      }

      setMinValue(initial_min_value)
      setMaxValue(initial_max_value)
   }

   useEffect(() => {
      if (sliderRef.current) setSliderWidth(sliderRef.current.offsetWidth)
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