import React from 'react'
import classes from './ProductCartTable.module.scss'

import ProductCart from 'components/Shop/Cart/ProductCart/ProductCart'


const ProductCartTable = props => {
   const {
      productsCartDetails,
      setQtdeHandlerCB,
      removeProductCartHandlerCB
   } = props

   return (
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
   )
}

export default ProductCartTable