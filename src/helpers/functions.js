export const mountProducts = (productsArg, tag, category) => {
   const currentProducts = [...productsArg]
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

   // console.log('PRODUCTS HELPER: ', products);

   return products
}

// Há alguns problemas aqui.
// QUando misturei cor e oferta o produto da state no Filter veio vazio
// Após ajustar isso vai faltar unir as duas funções que estão aqui
export const mountFilters = (productsArg, valueRange, productColor, offer, order) => {
   const currentProducts = [...productsArg]
   let products

   if (valueRange) {
      products = currentProducts.filter(product =>
         parseFloat(product.price) >= valueRange[0] && parseFloat(product.price) <= valueRange[1]
      )
   }

   if (productColor && productColor !== '') {
      products = products.filter(product =>
         product.colors.includes(productColor)
      )
   }

   if (offer && offer.length > 0) {
      products = products.filter(product =>
         offer.includes(product.offer))
   }

   if (order) {
      if (order === 'low-high') {
         products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      } else if (order === 'high-low') {
         products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      } else if (order === 'alphabetical') {
         products.sort((a, b) => a.name.localeCompare(
            b.name,
            undefined,
            { numeric: true, sensitivity: 'base' }
         ))
      }
   }

   return products
} 