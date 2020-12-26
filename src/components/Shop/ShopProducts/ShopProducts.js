import React from 'react'

import Filter from '../Filter/Filter'
import BestDeal from '../BestDeal/BestDeal'
import products from '../../../Data/productsData'

import './ShopProducts.module.css'

const ShopProducts = props => {

    return (
        <div>
            <h1>SHOP</h1>
            <Filter 
                products={products}
            />
            <BestDeal products={products} />
        </div>
    )
}

export default ShopProducts