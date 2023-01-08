import { ProductAction, ProductPageType } from "common/types"
import { ActionTypesProduct } from "./actionTypes"

const productReducer = (state: ProductPageType, action: ProductAction): ProductPageType => {
   switch(action.type) {
      case ActionTypesProduct.UPDATE_COLOR:
         return {
            ...state,
            productColor: action.productColor,
            productUpdated: action.productUpdate
         }
      case ActionTypesProduct.UPDATE_SIZE:
         return {
            ...state,
            productSize: action.productSize,
            productUpdated: action.productUpdate
         }
      case ActionTypesProduct.UPDATE_QTY:
         return {
            ...state,
            productQty: action.productQty,
            productUpdated: action.productUpdate
         }
      case ActionTypesProduct.FINISH_UPDATE:
         return {
            ...state,
            productUpdated: false
         }
      default:
         return state
   }
}

export default productReducer