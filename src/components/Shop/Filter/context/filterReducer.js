import { mountProducts, mountFilters } from 'helpers/functions'
import { initialFilter } from '../helpers/values'
import productsData from 'Data/productsData'

const filterReducer = (state, action) => {
   switch (action.type) {
      case 'setTag':
         return {
            ...state,
            tag: action.tag,
            productsState: mountProducts(productsData, state, action.tag, 'tag', state.isFilterOn),
            isFilterTagOn: true
         }
      case 'setCategory':
         return {
            ...state,
            category: action.category,
            productsState: mountProducts(productsData, state, action.category, 'category', state.isFilterOn),
            isFilterTagOn: true
         }
      case 'setColor':
         return {
            ...state,
            color: action.color,
            productsState: mountFilters(productsData, state, action.color, 'color', state.isFilterTagOn),
            isFilterOn: true
         }
      case 'setOffer':
         return {
            ...state,
            offer: action.offer,
            productsState: mountFilters(productsData, state, action.offer, 'offer', state.isFilterTagOn),
            isFilterOn: true
         }
      case 'setOrder':
         return {
            ...state,
            order: action.order,
            productsState: mountFilters(productsData, state, action.order, 'order', state.isFilterTagOn),
            isFilterOn: true
         }
      case 'setPrice':
         return {
            ...state,
            priceRange: action.priceRange,
            productsState: mountFilters(productsData, state, action.priceRange, 'priceRange', state.isFilterTagOn),
            isFilterOn: true
         }
      case 'resetFilter':
         return {
            ...initialFilter
         }
      default:
         return state
   }
}

export default filterReducer