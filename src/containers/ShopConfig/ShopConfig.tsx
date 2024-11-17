import { Component } from 'react'
import { connect } from 'react-redux'
import { InitialState, PropsCatalog } from 'common/types'

import FilterContext from 'components/Shop/Filter/context/FilterProvider'
import Filter from 'components/Shop/Filter/Filter'
import BestDealSession from 'components/Shop/BestDealSection/BestDealSection'

class ShopConfig extends Component<PropsCatalog> {
   render() {
      const { catalog } = this.props

      return (
         <div>
            <h1>SHOP</h1>
            <FilterContext>
               <Filter />
            </FilterContext>            
            <BestDealSession products={catalog} />
         </div>
      )
   }
}

const mapStateToProps = (state: InitialState) => {
   return {
      catalog: state.catalog
   }
}

export default connect(mapStateToProps)(ShopConfig)