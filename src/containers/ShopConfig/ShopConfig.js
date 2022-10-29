import React, { Component } from 'react'

import Filter from 'components/Shop/Filter/Filter'
import BestDealSession from 'components/Shop/BestDealSession/BestDealSession'

import products from 'Data/productsData'


class ShopConfig extends Component {

   render() {
      return (
         <div>
            <h1>SHOP</h1>
            <Filter products={products} />
            <BestDealSession products={products} />
         </div>
      )
   }
}

export default ShopConfig