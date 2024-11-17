import { useState, useEffect } from 'react'
import './Wishlist.module.scss'

import { connect } from 'react-redux'

import { ProductType, InitialState, PropsCatalog } from 'common/types'

import Products from '../../Shared/Products/Products'

type Props = {
   wish: string[]
} & PropsCatalog

const Wishlist = (props: Props) => {
   const {
      wish,
      catalog
   } = props

   const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>([])

   useEffect(() => {
      const allProducts = [...catalog]
      const products = allProducts.filter(product => wish.includes(product._id))
      setWishlistProducts(products)
   }, [])
   

   return (
      <div>
         <h1>WISHLIST</h1>
         <Products productsProps={wishlistProducts} />
      </div>
   )
}

const mapStateToProps = (state: InitialState) => {
   return {
      wish: state.wishlistState,
      catalog: state.catalog
   }
}

export default connect(mapStateToProps)(Wishlist)