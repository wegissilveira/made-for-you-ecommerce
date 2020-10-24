import wishlistStateFn from '../Data/wishlistData'

const initialState = {
    wishlistState: wishlistStateFn()
}

const reducer = ((state = initialState, action) => {

    if (action.type === 'WISHLIST') {
        return {
            wishlistState: action.value
        }
    }

    return state
}) 


export default reducer