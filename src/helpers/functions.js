export const mountProducts = (productsArg, filtersObj, currentFilterValue, currentFilter, isFilterOn) => {
   let {
      tag,
      category
   } = filtersObj

   if (currentFilter === 'tag') tag = currentFilterValue
   if (currentFilter === 'category') category = currentFilterValue

   const currentProducts = isFilterOn ? mountFilters(productsArg, filtersObj) : [...productsArg]
   let products = []
   
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

export const mountFilters = (productsArg, filtersObj, currentFilterValue, currentFilter, isFilterTagOn) => {
   let {
      priceRange,
      color,
      offer,
      order
   } = filtersObj

   if (currentFilter === 'priceRange') priceRange = currentFilterValue
   if (currentFilter === 'color') color = currentFilterValue
   if (currentFilter === 'offer') offer = currentFilterValue
   if (currentFilter === 'order') order = currentFilterValue

   const currentProducts = [...productsArg]
   let products

   if (priceRange) {
      products = currentProducts.filter(product => 
         parseFloat(product.price) >= priceRange.minValue && parseFloat(product.price) <= priceRange.maxValue
      )
   }

   if (color.currentColor && color.currentColor !== '') {
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
      return mountProducts(products, filtersObj)
   } else {
      return products
   }
} 

export const verifyCheckout = () => {
   const isCheckout = window.location.search.match('productId') ? false : true
   return isCheckout
}

export const formatUrlName = (str, id) => {
   const url = `/product/${str.replaceAll(/\W+/g, '-')}/?productId=${id}`
   return url
}

export const setCartTotalValue = (cart) => {
   const buildQtyArr = () => {
      const arrQty = []      
      cart.map((item) => {
         const productsQty = {}
         productsQty.qty = item.qtde
         productsQty.id = item._id
         arrQty.push(productsQty)
      })

      return calculateTotalValue(arrQty)
   }

   const calculateTotalValue = (prodQty) => {
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