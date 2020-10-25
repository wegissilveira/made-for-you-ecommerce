import wishlistDataFn from '../../Data/wishlistData'
import cartListDataFn from '../../Data/cartData'

const initialState = {
    wishlistState: wishlistDataFn(),
    cartListState: cartListDataFn()
}

const reducer = ((state = initialState, action) => {

    if (action.type === 'WISHLIST') {
        return {
            ...state,
            wishlistState: action.value
        }
    }

    if (action.type === 'CARTLIST') {
        return {
            ...state,
            cartListState: action.value
        }
    }

    return state
}) 


export default reducer