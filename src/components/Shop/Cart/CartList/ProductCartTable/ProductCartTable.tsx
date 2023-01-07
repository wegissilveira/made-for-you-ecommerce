import classes from './ProductCartTable.module.scss'

import { connect } from 'react-redux'

import { InitialState, ProductCartType } from 'common/types'

import ProductCart from 'components/Shop/Cart/ProductCart/ProductCart'


type Props = {
   cart: ProductCartType[]
}

const ProductCartTable = (props: Props) => {
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

const mapStateToProps = (state: InitialState) => {
   return {
      cart: state.cartListState
   }
}

export default connect(mapStateToProps)(ProductCartTable)