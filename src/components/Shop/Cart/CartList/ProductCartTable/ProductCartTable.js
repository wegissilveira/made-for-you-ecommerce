import React from 'react'
import classes from './ProductCartTable.module.scss'

import { connect } from 'react-redux'

import ProductCart from 'components/Shop/Cart/ProductCart/ProductCart'


const ProductCartTable = props => {
   const {
      cart
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
               cart.map((product, i) => {
                  return <ProductCart
                     key={product+'-'+i}
                     product={product}
                  />
               })
            }
         </tbody>
      </table>
   )
}

const mapStateToProps = state => {
   return {
      cart: state.cartListState
   }
}

export default connect(mapStateToProps)(ProductCartTable)