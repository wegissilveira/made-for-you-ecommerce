import React, { useState, useEffect, useReducer, useMemo } from "react"

import classes from './ProductInfoBody.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'
import * as actionTypes from 'store/actions/actionTypes'

import cartListDataFn from 'Data/cartData.js'
import wishlistDataFn from 'Data/wishlistData'

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'
import ProductsQtde from 'components/Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from 'components/Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
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

   const [isProductInBag, setProdExists] = useState(0)   
   const [productUpdated, setProductUpdated] = useState(false)
   const [productColor, setProductColor] = useState('')
   const [productQtde, setQtde] = useState(1)
   const [productSize, setSize] = useState('100x100')   

   // A IDEIA AQUI É ENCONTRAR UMA MANEIRA DE NÃO RENDERIZAR ESTE COMPONENTE A CADA UPDATE DE CADA ITEM
   // EU QUERO FAZER O RERENDER SOMENTE QUANDO O BOTÃO DE ADICIONAR AO CARRINHO FOR CLICADO
   // APARENTEMENTE É POSSÍVEL COLOCAR CONDIÇÕES DE RERENDER EM COMPONENTES DE CLASSE COM O SHOULDCOMPONENTUPDATE
   // SEGUNDO ESTE POST É POSSÍVEL FAZER ALGO SEMELHANTE EM COMPONENTES DE FUNÇÃO USANDO REACT.MEMO + ARESTATESEQUAL
   // => https://forum.freecodecamp.org/t/react-shouldcomponentupdate-example-with-functional-components/426246
   const [productReducerState, dispatch] = useReducer(productReducer, initialValue)

   const updateCurrentProduct = useMemo(() => {
      const updateColor = (color) => {
         dispatch({type: 'updateColor', productColor: color})
      }

      const updateSize = (size) => {
         dispatch({type: 'updateSize', size: size})
      }

      const updateQty = (qty) => {
         dispatch({type: 'updateQty', qty: qty})
      }

      return { 
         updateColor, 
         updateSize, 
         updateQty
      }
   }, [])

   console.log('productReducerState: ', productReducerState);
 
   const selectColorHandler = color => {
      setProductColor(color)
      setProductUpdated(true)
   }

   const setQtdeHandler = value => {
      setQtde(value)
      setProductUpdated(true)
   }

   const setSizeHandler = size => {
      setSize(size)
      setProductUpdated(true)
   }

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
      productCartArr.forEach(item => {
         if (item._id === product._id) count++
      })


      if (count === 0 || productUpdated) {
         let productCart = {}

         productCart._id = product._id
         productCart.qtde = productQtde
         productCart.color = productColor
         productCart.size = productSize

         if (productUpdated === true) {
            productCartArr = productCartArr.filter(item => item._id !== product._id)
         }

         productCartArr.push(productCart)
         setProdExists(1)

      } else {
         productCartArr = productCartArr.filter(item => item._id !== product._id)
         setProdExists(0)
      }

      setProductUpdated(false)
      localStorage.setItem('cartList', JSON.stringify(productCartArr))

      onCartListState()
   }

   let productCartDetails = {}
   for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === product._id) {
         productCartDetails = {
            ...product,
            ...cart[i]
         }
      }
   }

   useEffect(() => {
      let productCartArr = [...cart]
      productCartArr.forEach(prod => {
         if (prod._id === product._id) {
            setProductColor(prod.color)
            setQtde(prod.qtde)
            setSize(prod.size)
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

   const heartIcon = wish.includes(product._id) ? 'fas' : 'far'

   let bagButtonColor
   let bagButtonText
   if (productUpdated === true && isProductInBag === 1) {
      bagButtonColor = classes.Bag_button_orange
      bagButtonText = 'UPDATE BAG'
   } else {
      bagButtonColor = isProductInBag === 0 ? classes.Bag_button_green : classes.Bag_button_red
      bagButtonText = isProductInBag === 0 ? 'ADD TO BAG' : 'REMOVE FROM BAG'
   }

   return (
      <>
         <div className={classes.Product_details_container}>
            <SKUSizeSelector 
               productCartDetails={productCartDetails} 
               // setSizeHandlerCB={setSizeHandler} 
               setSizeHandlerCB={updateCurrentProduct.updateSize} 
            />
            <ColorSelect
               // selectedColor={productCartDetails.color}
               selectedColor={productColor}
               // colors={product.colors}
               // colors={['blue', 'green', 'purple']}
               // selectColorHandlerCallback={(color) => selectColorHandler(color)}
               selectColorHandlerCallback={(color) => updateCurrentProduct.updateColor(color)}
               isFilter={false}
               title={'Color'}
               product={product}
            />
         </div>
         <div className={classes.Product_wishlist_container} >
            <ProductsQtde
               startQtde={productCartDetails.qtde}
               // changeQtdeCallBack={qtde => setQtdeHandler(qtde)}
               changeQtdeCallBack={qtde => updateCurrentProduct.updateQty(qtde)}
               max={8}
            />
            <ProductQtdeMobile
               changeQtdeCallBack={qtde => setQtdeHandler(qtde)}
               startQtde={productQtde !== undefined ? productQtde : productCartDetails.qtde}
               initialValue={true}
               id={product._id}
            />
            <button
               onClick={() => productCartHandler()}
               type="button"
               className={bagButtonColor}
               disabled={productColor === ''}
            > {bagButtonText}
            </button>

            <FontAwesomeIcon
               onClick={() => wishlistHandler(product._id)}
               className={classes.Wishlist_icon_alt}
               icon={[heartIcon, 'heart']} size="2x"
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