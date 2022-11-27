import React, { useState, useEffect, useReducer, useMemo } from "react"

import classes from './ProductInfoBody.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'
import * as actionTypes from 'store/actions/actionTypes'

import cartListDataFn from 'Data/cartData.js'
import wishlistDataFn from 'Data/wishlistData'

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'
import ProductsQty from "components/Shared/UI/ProductsQty/ProductsQty"
import ProductQtyMobile from 'components/Shared/UI/ProductQtyMobile/ProductQtyMobile'
import SKUSizeSelector from "./SKUSizeSelector/SKUSizeSelector"


const initialValue = {
   productColor: '',
   productQty: 1,
   productSize: '100x100'
}

const productReducer = (state, action) => {
   switch(action.type) {
      case 'updateColor':
         return {
            ...state,
            productColor: action.productColor
         }
      case 'updateSize':
         return {
            ...state,
            productSize: action.size
         }
      case 'updateQty':
         return {
            ...state,
            productQty: action.qty
         }
   }
}

const ProductInfoBody = props => {
   const {
      product,
      cart,
      wish,
      onWishlistState,
      onCartListState
   } = props   

   const [productCart, setProductCart] = useState({})
   const [isProductInBag, setProdExists] = useState(0) // => state é utilizada para atualizar as cores do botão de adicionar ao carrinho  
   const [wishIcon, setWishIcon] = useState('fas')
   const [productUpdated, setProductUpdated] = useState(false)
   const [bagButton, setBagButton] = useState({
      color: 'Bag_button_green',
      text: 'ADD TO BAG'
   })

   const [productReducerState, dispatch] = useReducer(productReducer, initialValue)

   const updateCurrentProduct = useMemo(() => {
      const updateColor = (color) => {
         dispatch({type: 'updateColor', productColor: color})
         setProductUpdated(true)
      }

      const updateSize = (size) => {
         dispatch({type: 'updateSize', size: size})
         setProductUpdated(true)
      }

      const updateQty = (qty) => {
         dispatch({type: 'updateQty', qty: qty})
         setProductUpdated(true)
      }

      return { 
         updateColor, 
         updateSize, 
         updateQty
      }
   }, [])

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

   const productCartHandler = () => {
      let productCartArr = [...cart]

      let count = 0
      // Checa se o produto existe no carrinho
      productCartArr.forEach(item => {
         if (item._id === product._id) count++
      })

      // Adiciona produto no cart e atualiza o produto que já existe
      // count = 0 significa que o produto ainda não está no carrinho
      // productUpdate significa que ele está no carrinho, mas que teve seus valores atualizados
      if (count === 0 || productUpdated) {
         let productCart = {}

         productCart._id = product._id
         productCart.qtde = productReducerState.productQty
         productCart.color = productReducerState.productColor
         productCart.size = productReducerState.productSize

         // Se o item já existe no carrinho e está sofrendo atualização a sua versão antiga é removida do array do carrinho e a nova adicionada com o push que está logo abaixo
         if (productUpdated === true) {
            productCartArr = productCartArr.filter(item => item._id !== product._id)
         }        

         console.log('productCartArr: ', productCartArr);

         productCartArr.push(productCart)
         setProdExists(1)

      // Remove produto do carrinho
      } else {
         productCartArr = productCartArr.filter(item => item._id !== product._id)
         setProdExists(0)
      }
      
      setProductUpdated(false)
      localStorage.setItem('cartList', JSON.stringify(productCartArr))

      onCartListState()
   }

   useEffect(() => {
      let productCartDetails = {}
      cart.forEach(cartProd => {
         if (cartProd._id === product._id) {
            productCartDetails = {
               ...product,
               ...cartProd
            }
         }
      })
      setProductCart(productCartDetails)
   }, [product])
   
   useEffect(() => {
      let productCartArr = [...cart]
      productCartArr.forEach(prod => {
         if (prod._id === product._id) {
            dispatch({type: 'updateColor', productColor: prod.color})
            dispatch({type: 'updateSize', size: prod.size})
            dispatch({type: 'updateQty', qty: prod.qtde})
         }
      })
   }, [product])

   useEffect(() => {
      const productCartArr = [...cart]
      let prod = 0
      
      productCartArr.forEach(item =>
         item._id === product._id ? prod++ : null
      )

      setProdExists(prod)
   }, [product])

   useEffect(() => {
      let icon = 'fas'
      if (wish.includes(product._id)) icon = 'far'

      setWishIcon(icon)
   }, [wish])

   useEffect(() => {
      const obj = {}
      if (productUpdated === true && isProductInBag === 1) {
         obj.color = 'Bag_button_orange'
         obj.text = 'UPDATE BAG'
      } else {
         if (isProductInBag) {
            obj.color = 'Bag_button_red'
            obj.text = 'REMOVE FROM BAG'
         } else {
            obj.color = 'Bag_button_green'
            obj.text = 'ADD TO BAG'
         }
      }

      setBagButton(obj)
   }, [productUpdated, isProductInBag])
   
   return (
      <>
         <div className={classes.Product_details_container}>
            <SKUSizeSelector 
               productCartDetails={productCart} 
               setSizeHandlerCB={updateCurrentProduct.updateSize} 
            />
            <ColorSelect
               selectedColor={productReducerState.productColor}
               selectColorHandlerCallback={(color) => updateCurrentProduct.updateColor(color)}
               isFilter={false}
               title={'Color'}
               product={product}
            />
         </div>
         <div className={classes.Product_wishlist_container} >
            <ProductsQty
               productQty={productReducerState.productQty}
               changeQtyCallBack={qtde => updateCurrentProduct.updateQty(qtde)}
               max={8}
            />
            <ProductQtyMobile
               changeQtyCallBack={qtde => updateCurrentProduct.updateQty(qtde)}
               startQty={productReducerState.productQty}
               max={8}
            />
            <button
               onClick={() => productCartHandler()}
               type="button"
               className={classes[bagButton.color]}
               disabled={productReducerState.productColor === ''}
            > {bagButton.text}
            </button>

            <FontAwesomeIcon
               onClick={() => wishlistHandler(product._id)}
               className={classes.Wishlist_icon_alt}
               icon={[wishIcon, 'heart']} size="2x"
            />
         </div>
         <div className={classes.Product_category_container}>
            <p>Category: <span>{product.category}</span></p>
            <p>Tags: <span>{product.tag}</span></p>
         </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoBody)