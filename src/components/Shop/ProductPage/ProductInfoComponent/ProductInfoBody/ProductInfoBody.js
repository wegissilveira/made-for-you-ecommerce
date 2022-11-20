import React, { useState, useEffect, useRef } from "react"

import classes from './ProductInfoBody.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'
import ProductsQtde from 'components/Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from 'components/Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
import SKUSizeSelector from "./SKUSizeSelector/SKUSizeSelector"


const ProductInfoBody = props => {
   const {
      product,
      cart,
      wish,
      onWishlistStateCB,
      onCartListStateCB
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

      onWishlistStateCB()
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

      onCartListStateCB()
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
      const selectArray = Array.from(selectRef.current.children)
      selectArray.forEach((select, i) => {
         if (select.value === productCartDetails.size) {
            selectRef.current.children[i].selected = true
         } else {
            selectRef.current.children[i].selected = false
         }
      })
   }, [productCartDetails.size])

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
         {/* Estes blocos são sku selectors, um para tamanho e outro para cores. Extrair isso em um componente e dividir os selectors em um componente para cada tipo de sku */}
         <div className={classes.Product_details_container}>
            <SKUSizeSelector selectRef={selectRef} setSizeHandlerCB={setSizeHandler} />
            <ColorSelect
               selectedColor={productCartDetails.color}
               colors={product.colors}
               selectColorHandlerCallback={(color) => selectColorHandler(color)}
               isFilter={false}
               title={'Color'}
            />
         </div>
         <div
            className={classes.Product_wishlist_container}
         >
            <ProductsQtde
               startQtde={productCartDetails.qtde}
               changeQtdeCallBack={qtde => setQtdeHandler(qtde)}
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

export default ProductInfoBody