import { useReducer, useMemo, useEffect } from "react"

import productReducer from "./productReducer"
import {
   setColor,
   setSize,
   setQty,
   setUpdate
} from './action-creators'

import {
   UpdateProductValuesContext,
   ProductDataContext
} from './ProductContext'

import { initialValue } from "../helpers/values"

import { connect } from 'react-redux'
import useProduct from 'hooks/useProduct'

import { Cart } from "common/types"


// type Props = {
//    cart: Cart
// }

// const ProductProvider = (props: Props) => {
const ProductProvider = (props) => {
   const {
      cart
   } = props

   const [productReducerState, dispatch] = useReducer(productReducer, initialValue)

   const product = useProduct()

   const updateCurrentProduct = useMemo(() => {
      const updateColor = (color, update) => dispatch(setColor(color, update))
      const updateSize = (size, update) => dispatch(setSize(size, update))
      const updateQty = (qty, update) => dispatch(setQty(qty, update))
      const finishUpdate = () => dispatch(setUpdate())

      return { 
         updateColor, 
         updateSize, 
         updateQty,
         finishUpdate
      }
   }, [])

   useEffect(() => {
      let productCartArr = [...cart]
      productCartArr.forEach(prod => {
         if (prod._id === product._id) {
            dispatch(setColor(prod.color, false))
            dispatch(setSize(prod.size, false))
            dispatch(setQty(prod.qtde, false))
         }
      })
   }, [product])

   return (
      <UpdateProductValuesContext.Provider value={updateCurrentProduct}>
         <ProductDataContext.Provider value={productReducerState}>
            {props.children}
         </ProductDataContext.Provider>
      </UpdateProductValuesContext.Provider>
   )
}

const mapStateToProps = state => {
   return {
      cart: state.cartListState
   }
}

export default connect(mapStateToProps)(ProductProvider)