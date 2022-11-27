import { useReducer, useMemo } from "react"

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


const ProductProvider = props => {
   const [productReducerState, dispatch] = useReducer(productReducer, initialValue)

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

   return (
      <UpdateProductValuesContext.Provider value={updateCurrentProduct}>
         <ProductDataContext.Provider value={productReducerState}>
            {props.children}
         </ProductDataContext.Provider>
      </UpdateProductValuesContext.Provider>
   )
}

export default ProductProvider