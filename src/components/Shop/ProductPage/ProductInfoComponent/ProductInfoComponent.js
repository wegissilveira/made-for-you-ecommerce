import React, { useState, useEffect, useRef } from 'react'

import classes from './ProductInfoComponent.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

import cartListDataFn from '../../../../Data/cartData.js'
import wishlistDataFn from '../../../../Data/wishlistData'

import ProductsQtde from '../../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
import ColorSelect from '../../../Shared/UI/ColorSelect/ColorSelect'
import * as actionTypes from '../../../../store/actions/actionTypes'


const ProductInfoComponent = props => {
   const {
      cart,
      product,
      wish,
      modal,
      onWishlistState,
      onCartListState
   } = props

   const [isProductInBag, setProdExists] = useState(() => {
      let productCartArr = [...cart]
      let prod = 0

      productCartArr.map(item =>
         item._id === product._id ? prod++ : null
      )

      return prod
   })
   const [productColor, setProductColor] = useState('')
   const [productQtde, setQtde] = useState(undefined)
   const [productSize, setSize] = useState('100x100')
   const [productUpdated, setProductUpdated] = useState(false)

   const selectRef = useRef()


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

   let product_cart_details = {}
   for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === product._id) {
         product_cart_details = {
            ...product,
            ...cart[i]
         }
      }
   }

   useEffect(() => {
      const selectArray = Array.from(selectRef.current.children)
      selectArray.forEach((select, i) => {
         if (select.value === product_cart_details.size) {
            selectRef.current.children[i].selected = true
         } else {
            selectRef.current.children[i].selected = false
         }
      })
   }, [product_cart_details.size])

   useEffect(() => {
      let productCartArr = [...cart]
      productCartArr.forEach(prod => {
         if (prod._id === product._id) {
            setProductColor(prod.color)
            setQtde(prod.qtde)
            setSize(prod.size)
         }
      })
   }, [])


   const heart_Icon = wish.includes(product._id) ? 'fas' : 'far'

   let bag_button_color
   let bag_button_text
   if (productUpdated === true && isProductInBag === 1) {
      bag_button_color = classes.Bag_button_orange
      bag_button_text = 'UPDATE BAG'
   } else {
      bag_button_color = isProductInBag === 0 ? classes.Bag_button_green : classes.Bag_button_red
      bag_button_text = isProductInBag === 0 ? 'ADD TO BAG' : 'REMOVE FROM BAG'
   }

   // Estes dois blocos definem se alguns elementos serão visíveis ou não, além de outros pontos css
   // A verificação aqui é se o componente está sendo utilizando no modal de produtos
   // Caso seja no modal as especificações abaixo serão aplicadas inline
   // Caso contrário (PDP) as especificações do arquivo css serão mantidas
   // VERIFICAR SE ESTA É A MELHOR MANEIRA DE SE FAZER ISSO. É INTERESSANTE, MAS SOA UM POUCO COM GAMBIARRA
   let modalStyle = {
      specificDisplay: null,
      containerMargin: null,
      wishWidth: null,
      colorWidth: null,
   }

   if (modal) {
      modalStyle.specificDisplay = 'none'
      modalStyle.containerMargin = '0'
      modalStyle.wishWidth = '90%'
      modalStyle.colorWidth = '50%'
   }


   return (
      <div
         className={classes.ProductInfo_container}
         style={{ marginLeft: modalStyle.containerMargin }}
      >
         {/* Estas primeiras linhas (181-193) são vários pontos muito pequenos. Analisar a melhor maneira de estruturar isso para ser inserido em um único componente */}
         <div style={{ display: modalStyle.specificDisplay }}>
            <p>123456</p>
            <p>exemplo</p>
         </div>
         <h1>{product.name}</h1>
         <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
         <div className={classes.Product_price_container}>
            <h3>$ {product.price}</h3>
            <div>
               <FontAwesomeIcon icon="check" />
               <p>Available</p>
            </div>
         </div>
         {/* Estes blocos são sku selectors, um para tamanho e outro para cores. Extrair isso em um componente e dividir os selectors em um componente para cada tipo de sku */}
         <div className={classes.Product_details_container}>
            <div>
               <p>Size</p>
               <select ref={selectRef} onChange={e => setSizeHandler(e.target.value)}>
                  <option value="100x100">100x100 cm</option>
                  <option value="200x200">200x200 cm</option>
                  <option value="300x300">300x300 cm</option>
               </select>
            </div>
            <div
               className={classes.ProductPage_colors}
               style={{ width: modalStyle.colorWidth }}
            >
               <p>Color</p>
               <ColorSelect
                  selectedColor={product_cart_details.color}
                  colors={product.colors}
                  selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
               />
            </div>
         </div>
         {/* Este bloco também será extraído. Decidir se será um único componente ou se será subdivido  */}
         <div
            className={classes.Product_wishlist_container}
            style={{ width: modalStyle.wishWidth }}
         >
            <ProductsQtde
               startQtde={product_cart_details.qtde}
               changeQtdeCallBack={qtde => setQtdeHandler(qtde)}
               max={8}
            />
            <ProductQtdeMobile
               changeQtdeCallBack={qtde => setQtdeHandler(qtde)}
               startQtde={productQtde !== undefined ? productQtde : product_cart_details.qtde}
               initialValue={true}
               id={product._id}
            />
            <button
               onClick={() => productCartHandler()}
               type="button"
               className={bag_button_color}
            > {bag_button_text}
            </button>

            <FontAwesomeIcon
               onClick={() => wishlistHandler(product._id)}
               className={classes.Wishlist_icon_alt}
               icon={[heart_Icon, 'heart']} size="2x"
            />
         </div>
         <div className={classes.Product_category_container}>
            <p>Category: <span>{product.category}</span></p>
            <p>Tags: <span>{product.tag}</span></p>
         </div>
         {/* Esse bloco de especificações se tornará um componente separado */}
         <div
            className={classes.Product_specifications_container}
            style={{ display: modalStyle.specificDisplay }}
         >
            <div>
               <div>
                  <h6>DETAILS</h6>
                  <h6>SPECIFICATIONS</h6>
               </div>
               <div>
                  <div>
                     <p>Material:</p>
                     <p>Care:</p>
                     <p>Size:</p>
                  </div>
                  <div>
                     <p> Polyester</p>
                     <p> 30 degree wash</p>
                     <p> 100x100 cm</p>
                  </div>
               </div>
            </div>
            <div>
               <FontAwesomeIcon icon="share-alt" />
               <p>Share</p>
            </div>
         </div>
      </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoComponent)