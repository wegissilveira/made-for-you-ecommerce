export const mountProducts = (productsArg, tag, category, isFilterOn, filtersObj) => {
   // const currentProducts = [...productsArg]
   console.log('isFilterOn: ', isFilterOn);
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

   console.log('PRODUCTS HELPER: ', products);

   return products
}

// Após ajustar isso vai faltar unir as duas funções que estão aqui
// A etapa agora é aplicar ambos os filtros em conjunto. 
// A ideia é passar o objeto state inteiro ao invés de parâmetros isolados, mas é preciso buscar uma maneira de passar o parâmetro atual dos filtros atualizados, no objeto inteiro ele está sempre 'um passo atrás',
// Exemplo, quando for 'setColor' passar o vaor atualizado de color
// export const mountFilters = (productsArg, valueRange, productColor, offer, order, isFilterTagOn) => {
export const mountFilters = (productsArg, filtersObj) => {

   const {
      priceRange,
      color,
      offer,
      order
   } = filtersObj

   // console.log('COLOR: ', color);

   const currentProducts = [...productsArg]
   let products
   // console.log('currentProducts: ', currentProducts);
   // console.log('valueRange: ', valueRange);
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
   console.log('PRODUCTS HELPER FILTER: ', products);
   return products

   if(sendBackForMounting) return products
      
   if (isFilterTagOn) {
      mountProducts(products)
   } else {
      return products
   }
} 