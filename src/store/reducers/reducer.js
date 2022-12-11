import * as actionTypes from '../actions/actionTypes'
import { setCartTotalValue } from 'helpers/functions'

const initialState = {
   wishlistState: [],
   cartListState: [],
   totalCartValue: 0
}

const reducer = ((state = initialState, action) => {
   switch(action.type) {
      case actionTypes.WISHLIST:
         return {
            ...state,
            wishlistState: action.value
         }
      case actionTypes.CARTLIST:
         return {
            ...state,
            cartListState: action.value,
            totalCartValue: setCartTotalValue(action.value)
         }
      case actionTypes.UPDATE_FINAL_VALUE:
         return {
            ...state,
            totalCartValue: action.value
         }
      default:
         return state
   }
})

export default reducer