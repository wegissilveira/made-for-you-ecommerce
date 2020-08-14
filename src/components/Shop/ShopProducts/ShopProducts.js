import React from 'react'

import Products from '../../Shared/Products'
import Filter from '../Filter/Filter'
import BestDeal from '../BestDeal/BestDeal'

const shopProducts = props => {

    return (
        <div>
            <h1 className="text-center mb-5 mt-5">SHOP</h1>
            <Filter />
            <Products />
            <BestDeal />
        </div>
    )
}

export default shopProducts