import React from 'react'
import classes from './MinorSlider.module.css'

import { Link } from 'react-router-dom'

const MinorSlider = (props) => {
   const  {
      sliderProducts,
      minorSlideImg
   } = props

   return (
      <div className={classes.MinorSlider_container}>
         {sliderProducts.map((item, i) => {
            return (
               <div
                  key={`${item}-${i}`}
                  className={classes.MinorSlider_subContainer}
                  style={{
                     backgroundColor: item.slide[1],
                     display: i === minorSlideImg ? 'block' : 'none'
                  }}
               >
                  <img
                     src={item.img}
                     alt={"img-1"}
                  />
                  <div>
                     <Link to={'/shop/product/' + item._id} >
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                     </Link>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default MinorSlider