import { useState, useEffect } from 'react'

import classes from './ProductCard.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux';

import { ProductCartType, ProductType, InitialState } from 'common/types'

import { formatUrlName } from 'helpers/functions'

import ProductPageModal from 'components/Shop/ProductModal/ProductPageModal'
import { ActionTypesGlobal } from 'store/actions/actionTypes'
import { cartListDataFn, wishlistDataFn } from "services"
import ProductCardFooter from './ProductCardFooter/ProductCardFooter'


type Props = {
   wish: string[]
   cart: ProductCartType[]
   product: ProductType
   index: number
   onWishlistState: () => void
   onCartListState: () => void
}

const ProductCard = (props: Props) => {
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

   const history = useHistory()

   const wishlistHandler = (id: string) => {
      let list = [...wish]
      if (list.includes(id)) {
         list = list.filter(item => item !== id)
      } else {
         list.push(id)
      }

      localStorage.setItem('wishlist', JSON.stringify(list))
      onWishlistState()
   }

   const cartHandler = (action?: 'load') => {
      let cartList = [...cart]
      let cartItemsList: string[] = []
      let count = 0
      cartList.forEach(item => {
         if (item._id === product._id) count++
         cartItemsList.push(item._id)
      })

      if (action === 'load') {
         if (cartItemsList.includes(product._id)) {
            setProdExistsCart(true)
         } else {
            setProdExistsCart(false)
         }
      }

      if (action !== 'load') {
         if (count === 0) {
            let productCart = {} as ProductCartType

            productCart._id = product._id
            productCart.qtde = 1
            productCart.color = product.colors[0]
            productCart.size = '100x100'
            productCart.price = product.price
            productCart.prodName = product.name
            productCart.prodImg = product.imgsDemo[0]

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

   const openModalHandler = () => {
      setShowProduct(!showProduct)
      document.body.style.overflow = "hidden"
      history.push("?productId=" + product._id)
   }

   const closeModalCallback = () => {
      setShowProduct(!showProduct)
      document.body.style.overflow = "visible"
      history.replace({search: ''})
   }

   const wish_icon = wish.includes(product._id) ? 'fas' : 'far'
   const bag_icon_color: string = prodExistsCart ? classes.Wishlist_icon_bag_selected : classes.Wishlist_icon_bag

   useEffect(() => {
      cartHandler('load')
   }, [cart, product])


   return (
      <>
         <div className={classes.ProductCard_container}>
            <FontAwesomeIcon
               onClick={() => wishlistHandler(product._id)}
               icon={[wish_icon, 'heart']} size="2x"
               className={classes.Wishlist_icon_heart}
            />
            <Link to={formatUrlName(product.name, product._id)}>
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
               openModalHandlerCB={openModalHandler}
            />
         </div>
         <ProductPageModal
            showProduct={showProduct}
            setShowProduct={closeModalCallback}
            product={product}
            imgs={product.imgsDemo}
         />
      </>
   )
}

const mapStateToProps = (state: InitialState) => {
   return {
      wish: state.wishlistState,
      cart: state.cartListState
   }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      onWishlistState: () => dispatch({ type: ActionTypesGlobal.WISHLIST, value: wishlistDataFn() }),
      onCartListState: () => dispatch({ type: ActionTypesGlobal.CARTLIST, value: cartListDataFn() })
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)