import { mountProducts, mountFilters } from 'helpers/functions'
import { initialFilter } from '../helpers/values'
import productsData from 'Data/productsData'
import { ActionTypeFilter } from './actionTypes'
import { FilterType, 
   FilterAction, 
   FilterValues, 
   FilterTag, 
   FilterCat, 
   FilterColor, 
   FilterOrder, 
   FilterOffer, 
   FilterPrice 
} from 'common/types'


const filterReducer = (state: FilterType = initialFilter, action: FilterAction): FilterType => {
   switch (action.type) {
      case ActionTypeFilter.SET_TAG:
         const filterTag: FilterTag = {
            currentFilterValue: action.tag,
            type: FilterValues.TAG
         }
         
         return {
            ...state,
            tag: action.tag,
            productsState: mountProducts(
               productsData, // => productsArg
               state, // => filtersObj
               filterTag,
               state.isFilterOn // => isFilterOn
            ),
            isFilterTagOn: true
         }
      case ActionTypeFilter.SET_CATEGORY:
         const filterCat: FilterCat = {
            currentFilterValue: action.category,
            type: FilterValues.CATEGORY
         }

         return {
            ...state,
            category: action.category,
            productsState: mountProducts(productsData, state, filterCat, state.isFilterOn),
            isFilterTagOn: true
         }
      case ActionTypeFilter.SET_COLOR:
         const filterColor: FilterColor = {
            currentFilterValue: action.color,
            type: FilterValues.COLOR
         }
         return {
            ...state,
            color: action.color,
            productsState: mountFilters(productsData, state, filterColor, state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_OFFER:
         const filterOffer: FilterOffer = {
            currentFilterValue: action.offer,
            type: FilterValues.OFFER
         }
         return {
            ...state,
            offer: action.offer,
            productsState: mountFilters(productsData, state, filterOffer, state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_ORDER:
         const filterOrder: FilterOrder = {
            currentFilterValue: action.order,
            type: FilterValues.ORDER
         }
         return {
            ...state,
            order: action.order,
            productsState: mountFilters(productsData, state, filterOrder, state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_PRICE:
         const filterPrice: FilterPrice = {
            currentFilterValue: action.priceRange,
            type: FilterValues.PRICE_RANGE
         }
         return {
            ...state,
            priceRange: action.priceRange,
            productsState: mountFilters(productsData, state, filterPrice, state.isFilterTagOn),
            isFilterOn: true
         }
      case ActionTypeFilter.RESET_FILTER:
         return {
            ...initialFilter
         }
      default:
         return state
   }
}

export default filterReducer