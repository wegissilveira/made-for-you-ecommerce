import productsData from 'Data/productsData'

export const initial_min_value = 5 // => Valor inicial do preço mínimo
export const initial_max_value = 1290 // => Valor inicial do preço máximo

export const initialFilter = {
   productsState: productsData,
   tag: 'all-products',
   category: 'all',
   color:  {
      currentColor: '',
      lastSelectedColor: ''
   },
   offer: [],
   order: 'default',
   priceRange: {
      minValue: initial_min_value,
      maxValue: initial_max_value
   },
   isFilterOn: false,
   isFilterTagOn: false
}