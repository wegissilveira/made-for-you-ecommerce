import React from 'react'

import classes from './MinorSliderHeader.module.css'

import ProgressBar from '../../../Shared/UI/ProgressBar/ProgressBar'
import productsData from '../../../../Data/productsData'
import MinorSlider from './MinorSlider/MinorSlider'


const MinorSliderHeader = props => {
   const [minorSlideImg, setMinorSlideImg] = React.useState(0)
   const [sliderProducts, setSliderProducts] = React.useState([])

   const changeSlideHandler = (index) => {
      if (typeof index !== 'string') {
         setMinorSlideImg(index)
      } else {
         if (minorSlideImg < sliderProducts.length - 1) {
            setMinorSlideImg(minorSlideImg + 1)
         } else {
            setMinorSlideImg(0)
         }
      }
   }

   const changeSlideCallbackHandler = index => {
      changeSlideHandler(index)
   }

   React.useEffect(() => {
      let sliderProducts = productsData.filter(prod => prod.slide !== undefined)
      setSliderProducts(sliderProducts)
   }, [])

   // ProgressBar será avaliado separadamente por se tratar de um componente compartilhado. O mesmo ocorrerá com todos os componentes compartilhados.
   return (
      <div className={classes.Header_block_1}>
         <ProgressBar
            bars={sliderProducts.length} // => Qtde de barras
            timer={5000} // => Tempo do loop
            changeDot={changeSlideCallbackHandler} // => Função que controla a passagem automática de slides
            auto={true} // => Determina se a passagem de slides e barras será automática
            direction={'column'} // => Orientação dos pontos, horizontal ou vertical
            height={150} // => Altura que o bloco de pontos ocupará
         />         
         <MinorSlider sliderProducts={sliderProducts} minorSlideImg={minorSlideImg} />
      </div>
   )
}

export default MinorSliderHeader