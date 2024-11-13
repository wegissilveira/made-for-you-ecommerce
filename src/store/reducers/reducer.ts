import { ActionTypesGlobal } from 'store/actions/actionTypes'
import { setCartTotalValue } from 'helpers/functions'
import { InitialState, GlobaAction } from 'common/types'

const initialState: InitialState = {
   wishlistState: [],
   cartListState: [],
   totalCartValue: 0,
   catalog: []
}

const reducer = ((state = initialState, action: GlobaAction): InitialState => {
   switch(action.type) {
      case ActionTypesGlobal.WISHLIST:
         return {
            ...state,
            wishlistState: action.wishlist
         }
      case ActionTypesGlobal.CARTLIST:         
         return {
            ...state,
            cartListState: action.cartList,
            totalCartValue: setCartTotalValue(action.cartList)
         }
      case ActionTypesGlobal.UPDATE_FINAL_VALUE:
         return {
            ...state,
            totalCartValue: action.totalCartValue
         }
      case ActionTypesGlobal.LOAD_CATALOG:
         return {
            ...state,
            catalog: action.catalog
         }
      default:
         return state
   }
})

export default reducer