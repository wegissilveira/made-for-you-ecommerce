import { useState } from 'react'
import classes from './MinorSliderHeader.module.css'

import ProgressBar from '../../../Shared/UI/ProgressBar/ProgressBar'
import { MinorSliderData } from 'Data/minorSliderData'

import MinorSlider from './MinorSlider/MinorSlider'


const MinorSliderHeader = () => {
   const [minorSlideImg, setMinorSlideImg] = useState(0)

   const changeSlideHandler = (index: number | string) => {
      let sliderToShow
      if (typeof index !== 'string') {
         sliderToShow = index
      } else {
         if (minorSlideImg < MinorSliderData.length - 1) {
            sliderToShow = minorSlideImg + 1
         } else {
            sliderToShow = 0
         }
      }
      setMinorSlideImg(sliderToShow)
   }

   return (
      <div className={classes.Header_block_1}>
         <ProgressBar
            bars={MinorSliderData.length} // => Qtde de barras
            timer={5000} // => Tempo do loop
            changeDot={changeSlideHandler} // => Função que controla a passagem automática de slides
            auto={true} // => Determina se a passagem de slides e barras será automática
            direction={'column'} // => Orientação dos pontos, horizontal ou vertical
            height={150} // => Altura que o bloco de pontos ocupará
         />         
         <MinorSlider 
            sliderProducts={MinorSliderData} 
            minorSlideImg={minorSlideImg} 
         />
      </div>
   )
}

export default MinorSliderHeader