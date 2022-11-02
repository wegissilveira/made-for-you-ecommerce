import React from "react"
import classes from './BestDealSlider.module.css'

import { Link } from 'react-router-dom'

const BestDealSlider = props => {
   const {
      sliderTitle,
      products,
      bestDealRef,
      translateSlider
   } = props

   return (
      <>
         <h1>{sliderTitle}</h1>
         <div
            className={classes.Products_container}
            ref={bestDealRef}
            style={translateSlider}
         >
            {
               products.map((product, i) => {
                  let bestDealElement
                  if (product.deal) {
                     bestDealElement =
                        <div
                           key={i}
                           className={classes.Products_subContainer}
                        >
                           <div>
                              <Link to={"/shop/product/" + product._id}>
                                 <div className={classes.Deal_image} >
                                    <img src={product.img} alt="img-deal" />
                                 </div>
                                 <div className={classes.Products_description}>
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                 </div>
                              </Link>
                           </div>
                        </div>
                  }

                  return bestDealElement
               })
            }

         </div>
      </>
   )
}

export default BestDealSlider