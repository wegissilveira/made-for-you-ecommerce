import { Component } from 'react'

import FilterContext from 'components/Shop/Filter/context/FilterProvider'

import Filter from 'components/Shop/Filter/Filter'
import BestDealSession from 'components/Shop/BestDealSection/BestDealSection'

import products from 'Data/productsData'


class ShopConfig extends Component {
   render() {
      return (
         <div>
            <h1>SHOP</h1>
            <FilterContext>
               <Filter products={products} />
            </FilterContext>            
            <BestDealSession products={products} />
         </div>
      )
   }
}

export default ShopConfig