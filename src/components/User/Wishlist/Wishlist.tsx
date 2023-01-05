import { useState, useEffect } from 'react'
import './Wishlist.module.css'

import { connect } from 'react-redux'

import productsData from 'Data/productsData'

import { ProductType, InitialState } from 'common/types'

import Products from '../../Shared/Products/Products'


type Props = {
   wish: string[]
}

const Wishlist = (props: Props) => {
   const {
      wish
   } = props

   const [wishlistProducts, setWishlistProducts] = useState<ProductType[]>()

   useEffect(() => {
      const allProducts = [...productsData]
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
      wish: state.wishlistState
   }
}

export default connect(mapStateToProps)(Wishlist)