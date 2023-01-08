import { mountProducts, mountFilters } from 'helpers/functions'
import { initialFilter } from '../helpers/values'
import productsData from 'Data/productsData'
import { ActionType } from './actionTypes'
import { FilterType, Action } from 'common/types'


const filterReducer = (state: FilterType = initialFilter, action: Action): FilterType => {
   switch (action.type) {
      case ActionType.SET_TAG:
         return {
            ...state,
            tag: action.tag,
            productsState: mountProducts(productsData, state, action.tag, 'tag', state.isFilterOn),
            isFilterTagOn: true
         }
      case ActionType.SET_CATEGORY:
         return {
            ...state,
            category: action.category,
            productsState: mountProducts(productsData, state, action.category, 'category', state.isFilterOn),
            isFilterTagOn: true
         }
      case ActionType.SET_COLOR:
         return {
            ...state,
            color: action.color,
            productsState: mountFilters(productsData, state, action.color, 'color', state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionType.SET_OFFER:
         return {
            ...state,
            offer: action.offer,
            productsState: mountFilters(productsData, state, action.offer, 'offer', state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionType.SET_ORDER:
         return {
            ...state,
            order: action.order,
            productsState: mountFilters(productsData, state, action.order, 'order', state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionType.SET_PRICE:
         return {
            ...state,
            priceRange: action.priceRange,
            productsState: mountFilters(productsData, state, action.priceRange, 'priceRange', state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionType.RESET_FILTER:
         return {
            ...initialFilter
         }
      default:
         return state
   }
}

export default filterReducer