const productReducer = (state, action) => {
   switch(action.type) {
      case 'updateColor':
         return {
            ...state,
            productColor: action.color,
            productUpdated: action.update
         }
      case 'updateSize':
         return {
            ...state,
            productSize: action.size,
            productUpdated: action.update
         }
      case 'updateQty':
         return {
            ...state,
            productQty: action.qty,
            productUpdated: action.update
         }
      case 'finishUpdate':
         return {
            ...state,
            productUpdated: false
         }
      default:
         return state
   }
}

export default productReducer