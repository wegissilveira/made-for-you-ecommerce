import React from 'react'

import Products from '../../Shared/Products/Products'
import Filter from '../Filter/Filter'
import BestDeal from '../BestDeal/BestDeal'
import products from '../../../productsData'

const ShopProducts = props => {

    let [tag, setTag] = React.useState('all')

    return (
        <div>
            <h1 className="text-center mb-5 mt-5">SHOP</h1>
            <Filter />
            {/* <Products 
                products={products} 
                pageLimit={12} 
                tag={tag}
            /> */}
            {/* <BestDeal products={products} /> */}
        </div>
    )
}

export default ShopProducts