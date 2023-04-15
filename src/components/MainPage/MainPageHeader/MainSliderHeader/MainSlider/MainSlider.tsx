import { ForwardedRef, forwardRef } from 'react'

import classes from './MainSlider.module.scss'

import { Link } from 'react-router-dom'

import { MainSliderData } from 'Data/mainSliderData'


type Props = {
   translateValue: number
}

const MainSlider = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
   const {
      translateValue
   } = props

   return (
      <div
         className={classes.MainSlider_subContainer}
         style={{transform: `translate(${translateValue}%)`}}
         ref={ref}
      >
         {MainSliderData.map((img, i) =>
            <div key={`${i}-${img}`} className={'image-' + i}>
               <img
                  src={img.img}
                  alt={img.alt}
               />
               <div>
                  <Link to={`${process.env.PUBLIC_URL}/shop/` + img.cat}>
                     <p>{img.linkText[0]}</p>
                     <p>{img.linkText[1]}</p>
                  </Link>
               </div>
            </div>
         )}
      </div>
   )
})

export default MainSlider