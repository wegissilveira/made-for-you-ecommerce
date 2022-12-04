import React from 'react'
import classes from './MainPageDiscounts.module.scss'


const mainPageDiscounts = () => {
   return (
      <div className={classes.Discounts_container}>
         <div className={classes['Discounts-one']}>
            <h1>DISCOUNTS <br></br> AND SALES</h1>
            <h1>DISCOUNTS AND SALES</h1>            
            <p>
               Follow our promotions and discounts. We constantly update them so you can buy your
               favorite home products at the best prices. And every monday a random discount on
               certain products. Hurry up to buy at an attractive price.
            </p>
         </div>
         <img 
            className={classes['Discounts-three']}
            src={require('../../../assets/images/Discounts/quadro-3.png')} 
            alt="discount-img" 
         />
         <img 
            className={classes['Discounts-two']}
            src={require('../../../assets/images/Discounts/quadro-2.png')} 
            alt="discount-img" 
         />
         <div className={classes['Discounts-four']}>
            <h3>NEWSLETTER</h3>
            <p>
               Stay updated on all that's new noteworthy. Join our list
               and get 15% off your first purchase!
            </p>
            <input type="text" placeholder="Email Address" />
         </div>
      </div>
   )
}

export default mainPageDiscounts