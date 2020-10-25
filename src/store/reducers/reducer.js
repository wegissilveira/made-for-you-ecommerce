import wishlistDataFn from '../../Data/wishlistData'
import cartListDataFn from '../../Data/cartData'

import * as actionTypes from '../actions/actionTypes'

const initialState = {
    wishlistState: wishlistDataFn(),
    cartListState: cartListDataFn()
}

const reducer = ((state = initialState, action) => {

    if (action.type === actionTypes.WISHLIST) {
        return {
            ...state,
            wishlistState: action.value
        }
    }

    if (action.type === actionTypes.CARTLIST) {
        return {
            ...state,
            cartListState: action.value
        }
    }

    return state
}) 


export default reducer