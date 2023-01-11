import { 
   ProductType, 
   ProductCartType,
   Tag, 
   Category, 
   Order,
   Offer,
   ColorValues,
   Color,
   PriceRange,
   FilterType, 
   FilterBase 
} from 'common/types'

type FilterTypePartialProducts = Partial<FilterType> & {
   tag: Tag
   category: Category
}

type FilterTypePartialFilter = Partial<FilterType> & {
   priceRange: PriceRange
   color: ColorValues
   offer: Offer[]
   order: Order
}

type ProductQty = {
   qty: number
   id: string
}

export const mountProducts = (
   productsArg: ProductType[], 
   filtersObj: FilterTypePartialProducts, 
   filter?: FilterBase,
   isFilterOn?: boolean
): ProductType[] => {

   let {
      tag,
      category
   } = filtersObj

   if (filter) {
      if (filter.type === 'tag') tag = filter.currentFilterValue
      if (filter.type === 'category') category = filter.currentFilterValue
   }

   const currentProducts = isFilterOn ? mountFilters(productsArg, filtersObj as FilterTypePartialFilter) : [...productsArg]
   let products: ProductType[] = []
   
   switch(true) {
      case (tag === 'all-products' && category === 'all') :
         products = currentProducts
         break
      case (tag === 'all-products' && category !== 'all') :
         products = currentProducts.filter(item => item.category === category)
         break
      case (tag !== 'all-products' && category === 'all') :
         products = currentProducts.filter(item => item.tag === tag)
         break
      case (tag !== 'all-products' && category !== 'all') :
         products = currentProducts.filter(item => item.tag === tag)
         products = products.filter(item => item.category === category)
         break
      default:
   }
   
   return products
}

export const mountFilters = (
   productsArg: ProductType[], 
   filtersObj: FilterTypePartialFilter, 
   filter?: FilterBase,
   isFilterTagOn?: boolean
): ProductType[] => {

   let {
      priceRange,
      color,
      offer,
      order
   } = filtersObj

   if (filter) {
      if (filter.type === 'priceRange') priceRange = filter.currentFilterValue
      if (filter.type === 'color') color = filter.currentFilterValue
      if (filter.type === 'offer') offer = filter.currentFilterValue
      if (filter.type === 'order') order = filter.currentFilterValue
   }

   const currentProducts = [...productsArg]
   let products: ProductType[] = []

   if (priceRange) {
      products = currentProducts.filter(product => 
         parseFloat(product.price) >= priceRange.minValue && parseFloat(product.price) <= priceRange.maxValue
      )
   }

   if (color.currentColor && color.currentColor !== '' as Color) {
      products = products.filter(product =>
         product.colors.includes(color.currentColor)
      )
   }

   if (offer && offer.length > 0) {
      products = products.filter(product =>
         offer.includes(product.offer))
   }

   switch(order) {
      case 'low-high':
         products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
         break
      case 'high-low':
         products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
         break
      case 'alphabetical':
         products.sort((a, b) => a.name.localeCompare(
            b.name,
            undefined,
            { numeric: true, sensitivity: 'base' }
         ))
         break
      default:
         break
   }

   if (isFilterTagOn) {
      return mountProducts(products, filtersObj as FilterTypePartialProducts)
   } else {
      return products
   }
} 

export const verifyCheckout = () => {
   const isCheckout = window.location.search.match('productId') ? false : true
   return isCheckout
}

export const formatUrlName = (str: string, id: string) => {
   const url = `/product/${str.replaceAll(/\W+/g, '-')}/?productId=${id}`
   return url
}

export const setCartTotalValue = (cart: ProductCartType[]) => {
   const buildQtyArr = () => {
      const arrQty: ProductQty[] = []          
      cart.forEach((item) => {
         const productsQty = {} as ProductQty
         productsQty.qty = item.qtde
         productsQty.id = item._id
         arrQty.push(productsQty)
      })

      return calculateTotalValue(arrQty)
   }

   const calculateTotalValue = (prodQty: ProductQty[]) => {
      let fullPrice = 0

      cart.forEach(prod => {
         prodQty.forEach(p => {
            if (p.id === prod._id) {
               fullPrice = fullPrice + (Number(p.qty) * parseFloat(prod.price))
            } 
         })
      })

      return fullPrice
   }

   return buildQtyArr()
}