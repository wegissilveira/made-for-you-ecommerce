import React, { useState, useEffect } from 'react'

import classes from './ProductCard.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductPageModal from 'components/Shop/ProductModal/ProductModal'
import * as actionTypes from 'store/actions/actionTypes'
import wishlistDataFn from 'Data/wishlistData';
import cartListDataFn from 'Data/cartData';
import ProductCardFooter from './ProductCardFooter/ProductCardFooter';


const ProductCard = props => {
   const [showProduct, setShowProduct] = useState(false)
   const [prodExistsCart, setProdExistsCart] = useState(false)

   const {
      wish,
      cart,
      product,
      index,
      onWishlistState,
      onCartListState
   } = props

   const wishlistHandler = id => {

      let list = [...wish]
      if (list.includes(id)) {
         list = list.filter(item => item !== id)
      } else {
         list.push(id)
      }

      localStorage.setItem('wishlist', JSON.stringify(list))

      onWishlistState()
   }

   const cartHandler = arg => {
      let cartList = [...cart]
      let cartItemsList = []

      let count = 0
      cartList.forEach(item => {
         if (item._id === product._id) count++
         cartItemsList.push(item._id)
      })

      if (arg === 'load') {
         if (cartItemsList.includes(product._id)) {
            setProdExistsCart(true)
         } else {
            setProdExistsCart(false)
         }
      }

      if (arg !== 'load') {
         if (count === 0) {
            let productCart = {}

            productCart._id = product._id
            productCart.qtde = 1
            productCart.color = product.colors[0]
            productCart.size = '100x100'

            cartList.push(productCart)
            setProdExistsCart(true)

         } else {

            cartList = cartList.filter(item => item._id !== product._id)
            setProdExistsCart(false)
         }

         localStorage.setItem('cartList', JSON.stringify(cartList))
         onCartListState()
      }
   }

   const openModalHandler = i => {
      setShowProduct(!showProduct)
      document.body.style.overflow = "hidden"
   }

   const closeModalCallback = () => {
      setShowProduct(!showProduct)
      document.body.style.overflow = "visible"
   }

   const wish_icon = wish.includes(product._id) ? 'fas' : 'far'
   const bag_icon_color = prodExistsCart ? classes.Wishlist_icon_bag_selected : classes.Wishlist_icon_bag

   useEffect(() => {
      cartHandler('load')

   }, [cart])


   return (
      <>
         <div className={classes.ProductCard_container}>
            <FontAwesomeIcon
               onClick={() => wishlistHandler(product._id)}
               icon={[wish_icon, 'heart']} size="2x"
               className={classes.Wishlist_icon_heart}
            />
            <Link to={"/shop/product/" + product._id} >
               <div className={classes.Products_img_container}>
                  <img
                     src={product.img}
                     alt="Produto"
                  />
               </div>
            </Link>
            <ProductCardFooter 
               productId={product._id}
               productName={product.name}
               productPrice={product.price}
               productIndex={index}
               iconBgColor={bag_icon_color}
               cartHandlerCB={cartHandler}
               openModalHandlerCB={i => openModalHandler(i)}
            />
         </div>
         {/* PASSAR MODAL PRO PORTAL EM OUTRA ETAPA DO REFATORAMENTO */}
         <ProductPageModal
            showProduct={showProduct}
            setShowProduct={closeModalCallback}
            product={product}
            wishlist={wish}
            imgs={product.imgsDemo}
            name={product.name}
            setProductOnCart={(arg) => setProdExistsCart(arg)}
         />
      </>
   )
}

const mapStateToProps = state => {
   return {
      wish: state.wishlistState,
      cart: state.cartListState
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onWishlistState: () => dispatch({ type: actionTypes.WISHLIST, value: wishlistDataFn() }),
      onCartListState: () => dispatch({ type: actionTypes.CARTLIST, value: cartListDataFn() })
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)