import React, { useState, useEffect } from 'react'
import './Wishlist.module.css'

import { connect } from 'react-redux'
import * as actionTypes from 'store/actions/actionTypes'

import productsData from 'Data/productsData'
import wishlistDataFn from 'Data/wishlistData'

import Products from '../../Shared/Products/Products'


const Wishlist = (props) => {
   const {
      wish
   } = props

   const [wishlistProducts, setWishlistProducts] = useState([])

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

const mapStateToProps = state => {
   return {
      wish: state.wishlistState
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onWishlistState: () => dispatch({ type: actionTypes.WISHLIST, value: wishlistDataFn() })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)