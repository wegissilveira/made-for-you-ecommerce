import React from "react"
import classes from './CartList.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import CartHeader from 'components/Shop/Cart/CartHeader/CartHeader'
import ProductCart from 'components/Shop/Cart/ProductCart/ProductCart';
import CartForm from 'components/Shop/Cart/CartForm/CartForm'


const CartList = props => {
   const {
      productsCartDetails,
      setQtdeHandlerCB,
      removeProductCartHandlerCB,
      finalPrice
   } = props


   return (
      <div className={classes.Cart_container}>
         {/* <CartHeader /> */}
         <table className={classes['Cart-table']}>
            <thead>
               <tr>
                  <th>PRODUCT</th>
                  <th>DISCOUNT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
         {
            productsCartDetails.map((product, i) => {
               return <ProductCart
                  key={i}
                  product={product}
                  prodIndex={i}
                  setQtdeCallback={setQtdeHandlerCB}
                  removeProductCallback={id => removeProductCartHandlerCB(id)}
               />
            })
         }
                  </tbody>
      </table>

         <div className={classes.Cart_keepBuy_button}>
            <Link to="/shop/">
               <p className={classes.Cart_dark_button}>
                  <FontAwesomeIcon icon="long-arrow-alt-left" />
                  <span>KEEP BUYING</span>
               </p>
            </Link>
         </div>

         <CartForm finalPrice={finalPrice} />
      </div>
   )
}

export default CartList