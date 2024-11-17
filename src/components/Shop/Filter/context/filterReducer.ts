import { mountProducts, mountFilters } from 'helpers/functions'
import { initialFilter } from '../helpers/values'
import { ActionTypeFilter } from './actionTypes'
import { FilterType, 
   FilterAction, 
   FilterValues
} from 'common/types'

const filterReducer = (state: FilterType = initialFilter, action: FilterAction): FilterType => {
   switch (action.type) {
      case ActionTypeFilter.SET_INIT_FILTER:
         return {
            ...state,
            productsState: action.catalog,
            catalog: action.catalog
         }
      case ActionTypeFilter.SET_TAG:
         return {
            ...state,
            tag: action.tag,
            productsState: mountProducts(
               state.catalog,
               state,
               {
                  currentFilterValue: action.tag,
                  type: FilterValues.TAG
               },
               state.isFilterOn
            ),
            isFilterTagOn: true
         }
      case ActionTypeFilter.SET_CATEGORY:
         return {
            ...state,
            category: action.category,
            productsState: mountProducts(
               state.catalog,
               state, 
               {
                  currentFilterValue: action.category,
                  type: FilterValues.CATEGORY
               },
               state.isFilterOn
            ),
            isFilterTagOn: true
         }
      case ActionTypeFilter.SET_COLOR:
         return {
            ...state,
            color: action.color,
            productsState: mountFilters(
               state.catalog,
               state, 
               {
                  currentFilterValue: action.color,
                  type: FilterValues.COLOR
               },
               state.isFilterTagOn
            ),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_OFFER:
         return {
            ...state,
            offer: action.offer,
            productsState: mountFilters(
               state.catalog,
               state,
               {
                  currentFilterValue: action.offer,
                  type: FilterValues.OFFER
               },
               state.isFilterTagOn
            ),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_ORDER:
         return {
            ...state,
            order: action.order,
            productsState: mountFilters(
               state.catalog,
               state, 
               {
                  currentFilterValue: action.order,
                  type: FilterValues.ORDER
               },
               state.isFilterTagOn
            ),
            isFilterOn: true
         }
      case ActionTypeFilter.SET_PRICE:
         return {
            ...state,
            priceRange: action.priceRange,
            productsState: mountFilters(
               state.catalog,
               state, 
               {
                  currentFilterValue: action.priceRange,
                  type: FilterValues.PRICE_RANGE
               },
               state.isFilterTagOn
            ),
            isFilterOn: true
         }
      case ActionTypeFilter.RESET_FILTER:
         return {
            ...initialFilter,
            productsState: state.catalog
         }
      default:
         return state
   }
}

export default filterReducer